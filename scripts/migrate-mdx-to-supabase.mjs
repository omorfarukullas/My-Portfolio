import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load .env.local if present
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

async function migrate() {
    console.log('🚀 Starting MDX migration to Supabase...');

    if (!fs.existsSync(BLOGS_DIR)) {
        console.log('⚠️ No content/blogs directory found.');
        return;
    }

    const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.mdx'));
    console.log(`📁 Found ${files.length} MDX files to process.`);

    for (const filename of files) {
        const slug = filename.replace(/\.mdx$/, '');
        const filePath = path.join(BLOGS_DIR, filename);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);

        const postRecord = {
            slug: data.slug || slug,
            title: data.title || 'Untitled Post',
            description: data.description || '',
            content,
            tags: Array.isArray(data.tags) ? data.tags : [],
            featured_image_url: data.featured_image || null,
            published: data.published !== false,
            read_time: Math.ceil(content.split(/\s+/).length / 200),
            created_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('posts')
            .upsert(postRecord, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Error migrating ${slug}:`, error.message);
        } else {
            console.log(`✅ Successfully migrated: ${postRecord.title} (/blog/${slug})`);
        }
    }

    console.log('\n🎉 Migration complete!');
}

migrate();
