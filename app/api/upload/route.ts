import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        // Enforce Admin Authentication
        const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
        const isAdmin = token ? await verifyAdminToken(token) : false;

        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const postSlug = (formData.get('postSlug') as string) || 'general';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // File size validation (15MB limit)
        const maxBytes = 15 * 1024 * 1024;
        if (file.size > maxBytes) {
            return NextResponse.json({ error: 'File exceeds 15MB limit' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const timestamp = Date.now();
        const storedFileName = `${timestamp}-${cleanName}`;
        const storagePath = `${postSlug}/${storedFileName}`;

        // Strategy 1: Supabase Storage if configured
        if (isSupabaseConfigured()) {
            const supabase = getSupabaseAdmin();
            if (supabase) {
                const { error } = await supabase.storage
                    .from('blog-assets')
                    .upload(storagePath, buffer, {
                        contentType: file.type || 'application/octet-stream',
                        upsert: true,
                    });

                if (error) {
                    console.error('Supabase upload error:', error);
                    return NextResponse.json({ error: error.message }, { status: 500 });
                }

                const { data: publicUrlData } = supabase.storage
                    .from('blog-assets')
                    .getPublicUrl(storagePath);

                return NextResponse.json({
                    success: true,
                    url: publicUrlData.publicUrl,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: `${(file.size / 1024).toFixed(1)} KB`,
                });
            }
        }

        // Strategy 2: Local fallback (public/uploads/) for offline dev
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', postSlug);
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const localFilePath = path.join(uploadsDir, storedFileName);
        fs.writeFileSync(localFilePath, buffer);

        const localUrl = `/uploads/${postSlug}/${storedFileName}`;

        return NextResponse.json({
            success: true,
            url: localUrl,
            fileName: file.name,
            fileType: file.type,
            fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        });
    } catch (err: any) {
        console.error('Upload error:', err);
        return NextResponse.json({ error: err.message || 'File upload failed' }, { status: 500 });
    }
}
