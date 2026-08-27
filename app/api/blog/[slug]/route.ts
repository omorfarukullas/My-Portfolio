import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { getPostBySlug } from '@/lib/mdx';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    try {
        if (isSupabaseConfigured()) {
            const supabase = getSupabaseClient();
            if (supabase) {
                const { data: post, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (!error && post) {
                    const { data: attachments } = await supabase
                        .from('attachments')
                        .select('*')
                        .eq('post_slug', slug);

                    const { data: comments } = await supabase
                        .from('comments')
                        .select('*')
                        .eq('post_slug', slug)
                        .eq('approved', true)
                        .order('created_at', { ascending: true });

                    return NextResponse.json({
                        post,
                        attachments: attachments || [],
                        comments: comments || [],
                    });
                }
            }
        }

        const localPost = getPostBySlug(slug);
        if (!localPost) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ post: localPost, attachments: [], comments: [] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    try {
        // Enforce Admin Auth
        const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
        const isAdmin = token ? await verifyAdminToken(token) : false;

        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, content, tags, published, featured_image_url, attachments } = body;

        const tagArray = Array.isArray(tags) ? tags : tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin();
            if (supabase) {
                const { data, error } = await supabase
                    .from('posts')
                    .update({
                        title,
                        description,
                        content,
                        tags: tagArray,
                        published: published ?? true,
                        featured_image_url: featured_image_url || null,
                        read_time: Math.ceil(content.split(/\s+/).length / 200),
                        updated_at: new Date().toISOString(),
                    })
                    .eq('slug', slug)
                    .select()
                    .single();

                if (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }

                // Update attachments if provided
                if (Array.isArray(attachments)) {
                    await supabase.from('attachments').delete().eq('post_slug', slug);
                    if (attachments.length > 0) {
                        const rows = attachments.map((att: any) => ({
                            post_slug: slug,
                            file_url: att.file_url,
                            file_name: att.file_name,
                            file_type: att.file_type || '',
                            file_size: att.file_size || '',
                        }));
                        await supabase.from('attachments').insert(rows);
                    }
                }

                return NextResponse.json({ success: true, post: data });
            }
        }

        // Local filesystem update if exists
        const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);
        if (fs.existsSync(filePath)) {
            const fileContent = matter.stringify(content, {
                title,
                description,
                tags: tagArray,
                published: published ?? true,
                featured_image: featured_image_url || undefined,
            });
            fs.writeFileSync(filePath, fileContent, 'utf-8');
        }

        return NextResponse.json({ success: true, message: 'Post updated' });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    try {
        const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
        const isAdmin = token ? await verifyAdminToken(token) : false;

        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin();
            if (supabase) {
                await supabase.from('comments').delete().eq('post_slug', slug);
                await supabase.from('attachments').delete().eq('post_slug', slug);
                const { error } = await supabase.from('posts').delete().eq('slug', slug);

                if (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }
            }
        }

        // Also delete local file if exists
        const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return NextResponse.json({ success: true, message: 'Post deleted successfully' });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
