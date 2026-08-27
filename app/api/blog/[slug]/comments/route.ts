import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

// GET: Fetch approved comments for a post
export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    try {
        if (isSupabaseConfigured()) {
            const supabase = getSupabaseClient();
            if (supabase) {
                const { data, error } = await supabase
                    .from('comments')
                    .select('id, author_name, content, created_at')
                    .eq('post_slug', slug)
                    .eq('approved', true)
                    .order('created_at', { ascending: true });

                if (!error && data) {
                    return NextResponse.json({ comments: data });
                }
            }
        }

        return NextResponse.json({ comments: [] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST: Public visitor submits a comment
export async function POST(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    try {
        const body = await req.json();
        const { author_name, author_email, content } = body;

        if (!author_name || !content || author_name.trim().length === 0 || content.trim().length === 0) {
            return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
        }

        // Basic anti-spam length check
        if (author_name.length > 50 || content.length > 2000) {
            return NextResponse.json({ error: 'Comment exceeds character limit.' }, { status: 400 });
        }

        // Clean & sanitize inputs
        const cleanName = author_name.trim().slice(0, 50);
        const cleanEmail = (author_email || '').trim().slice(0, 100);
        const cleanContent = content.trim().slice(0, 2000);

        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin() || getSupabaseClient();
            if (supabase) {
                const { data, error } = await supabase
                    .from('comments')
                    .insert({
                        post_slug: slug,
                        author_name: cleanName,
                        author_email: cleanEmail,
                        content: cleanContent,
                        approved: false, // Sent to moderation queue
                    })
                    .select()
                    .single();

                if (error) {
                    console.error('Comment insert error:', error);
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }

                return NextResponse.json({
                    success: true,
                    message: 'Thank you! Your comment has been submitted for moderation.',
                    comment: data,
                }, { status: 201 });
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Comment recorded (offline mode).',
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Failed to submit comment' }, { status: 500 });
    }
}
