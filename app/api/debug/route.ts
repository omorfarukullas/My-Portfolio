import { NextResponse } from 'next/server';
import { getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    const configured = isSupabaseConfigured();
    const results: Record<string, any> = {
        supabaseConfigured: configured,
        timestamp: new Date().toISOString(),
    };

    if (!configured) {
        return NextResponse.json({
            ...results,
            error: 'Supabase environment variables are missing.',
        }, { status: 500 });
    }

    // 1. Test Admin Client (Service Role)
    const admin = getSupabaseAdmin();
    if (admin) {
        const { data: adminPosts, error: adminErr } = await admin.from('posts').select('*');
        results.adminClient = {
            accessible: !adminErr,
            error: adminErr ? adminErr.message : null,
            totalPostsCount: adminPosts?.length ?? 0,
            publishedPostsCount: adminPosts?.filter((p) => p.published).length ?? 0,
        };

        // Check if 'featured' column exists
        const { data: featuredTest, error: featuredErr } = await admin.from('posts').select('featured').limit(1);
        results.featuredColumn = {
            exists: !featuredErr,
            error: featuredErr ? featuredErr.message : null,
        };

        if (adminPosts) {
            results.posts = adminPosts.map((p) => ({
                slug: p.slug,
                title: p.title,
                published: p.published,
                featured: p.featured ?? 'COLUMN_MISSING',
                created_at: p.created_at,
            }));
        }
    }

    // 2. Test Anon Client (Public visitor read)
    const anon = getSupabaseClient();
    if (anon) {
        const { data: anonPosts, error: anonErr } = await anon
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        results.anonClient = {
            accessible: !anonErr,
            error: anonErr ? anonErr.message : null,
            visiblePostsCount: anonPosts?.length ?? 0,
        };
    }

    return NextResponse.json(results, { status: 200 });
}
