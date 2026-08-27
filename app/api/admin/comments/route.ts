import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// GET all comments for admin review
export async function GET(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isAdmin = token ? await verifyAdminToken(token) : false;

    if (!isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin();
            if (supabase) {
                const { data, error } = await supabase
                    .from('comments')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }

                return NextResponse.json({ comments: data || [] });
            }
        }

        return NextResponse.json({ comments: [] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// PATCH: Approve / Unapprove a comment
export async function PATCH(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isAdmin = token ? await verifyAdminToken(token) : false;

    if (!isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, approved } = body;

        if (!id) {
            return NextResponse.json({ error: 'Comment ID required' }, { status: 400 });
        }

        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin();
            if (supabase) {
                const { data, error } = await supabase
                    .from('comments')
                    .update({ approved: Boolean(approved) })
                    .eq('id', id)
                    .select()
                    .single();

                if (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }

                return NextResponse.json({ success: true, comment: data });
            }
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// DELETE: Remove comment
export async function DELETE(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isAdmin = token ? await verifyAdminToken(token) : false;

    if (!isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Comment ID required' }, { status: 400 });
        }

        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin();
            if (supabase) {
                const { error } = await supabase.from('comments').delete().eq('id', id);
                if (error) {
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }
            }
        }

        return NextResponse.json({ success: true, message: 'Comment deleted' });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
