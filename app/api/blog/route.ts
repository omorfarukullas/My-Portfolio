import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { getAllPosts } from '@/lib/mdx';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
        const isAdmin = token ? await verifyAdminToken(token) : false;

        if (isSupabaseConfigured()) {
            // If admin is requesting, use admin client with service role so all posts (drafts & published) are returned
            const supabase = isAdmin ? getSupabaseAdmin() : getSupabaseClient();
            if (supabase) {
                let query = supabase.from('posts').select('*');
                if (!isAdmin) {
                    query = query.eq('published', true);
                }
                const { data, error } = await query.order('created_at', { ascending: false });

                if (!error && data) {
                    return NextResponse.json({ posts: data });
                } else if (error) {
                    console.error('Supabase query error in /api/blog:', error);
                }
            }
        }

        // Fallback to local MDX
        const localPosts = getAllPosts();
        return NextResponse.json({ posts: localPosts });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Verify Admin
        const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
        const isAdmin = token ? await verifyAdminToken(token) : false;

        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, tags, published, content, featured_image_url, featured, attachments } = body;

        if (!title || !description || !content) {
            return NextResponse.json({ error: 'Title, description, and content are required.' }, { status: 400 });
        }

        const slug = body.slug ? generateSlug(body.slug) : generateSlug(title);
        const tagArray = Array.isArray(tags) ? tags : tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
        const isFeatured = Boolean(featured);

        // 1. If Supabase is configured, insert/upsert to database
        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin();
            if (supabase) {
                // If this post is marked as featured, try to un-feature other posts
                if (isFeatured) {
                    try {
                        await supabase.from('posts').update({ featured: false }).neq('slug', slug);
                    } catch {
                        // 'featured' column may not exist yet in Supabase
                    }
                }

                const postRecord: Record<string, any> = {
                    slug,
                    title,
                    description,
                    content,
                    tags: tagArray,
                    featured_image_url: featured_image_url || null,
                    published: published ?? true,
                    read_time: Math.ceil(content.split(/\s+/).length / 200),
                    updated_at: new Date().toISOString(),
                };

                let { data: postData, error: postError } = await supabase
                    .from('posts')
                    .upsert({ ...postRecord, featured: isFeatured }, { onConflict: 'slug' })
                    .select()
                    .single();

                // If Supabase schema lacks 'featured' column, retry without it gracefully
                if (postError && postError.message?.includes('featured')) {
                    const retry = await supabase
                        .from('posts')
                        .upsert(postRecord, { onConflict: 'slug' })
                        .select()
                        .single();
                    postData = retry.data;
                    postError = retry.error;
                }

                if (postError) {
                    console.error('Supabase post insert error:', postError);
                    return NextResponse.json({ error: postError.message }, { status: 500 });
                }

                // If attachments were provided, save them
                if (Array.isArray(attachments) && attachments.length > 0) {
                    await supabase.from('attachments').delete().eq('post_slug', slug);
                    const attachmentRows = attachments.map((att: any) => ({
                        post_slug: slug,
                        file_url: att.file_url,
                        file_name: att.file_name,
                        file_type: att.file_type || '',
                        file_size: att.file_size || '',
                    }));

                    await supabase.from('attachments').insert(attachmentRows);
                }

                return NextResponse.json({
                    success: true,
                    message: 'Post published successfully to Supabase!',
                    slug,
                    post: postData,
                }, { status: 201 });
            }
        }

        // 2. Local fallback if in development or Supabase not configured
        const blogsDir = path.join(process.cwd(), 'content', 'blogs');
        if (!fs.existsSync(blogsDir)) {
            fs.mkdirSync(blogsDir, { recursive: true });
        }

        const filePath = path.join(blogsDir, `${slug}.mdx`);
        const date = new Date().toISOString().split('T')[0];
        const fileContent = matter.stringify(content, {
            title,
            description,
            date,
            tags: tagArray,
            published: published ?? true,
            featured: isFeatured,
            featured_image: featured_image_url || undefined,
        });

        fs.writeFileSync(filePath, fileContent, 'utf-8');

        return NextResponse.json({
            success: true,
            message: 'Post saved locally as MDX file!',
            slug,
            path: `content/blogs/${slug}.mdx`,
        }, { status: 201 });
    } catch (err: any) {
        console.error('Blog creation error:', err);
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
