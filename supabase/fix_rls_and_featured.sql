-- ==============================================================================
-- Supabase SQL Fix: Add 'featured' column + RLS + Permissions
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Add the missing 'featured' column to the posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- 2. Create an index for fast lookups of featured posts
CREATE INDEX IF NOT EXISTS idx_posts_featured ON public.posts (featured);

-- 3. Ensure Table Permissions are granted to public/anon roles
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT SELECT ON public.comments TO anon, authenticated;
GRANT SELECT ON public.attachments TO anon, authenticated;

-- 4. Enable Row Level Security (RLS) and grant public read access to published posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access for published posts" ON public.posts;
CREATE POLICY "Allow public read access for published posts"
    ON public.posts FOR SELECT
    USING (published = true);

-- 5. Set your latest post as the featured post
UPDATE public.posts
SET featured = true
WHERE slug = 'low-resource-language-ocr-a-challenge-beyond-text-recognition';

-- 6. Un-feature any other posts so only one is featured
UPDATE public.posts
SET featured = false
WHERE slug <> 'low-resource-language-ocr-a-challenge-beyond-text-recognition';

-- 7. Verification Query (shows all posts and their featured status)
SELECT slug, title, published, featured, created_at
FROM public.posts
ORDER BY created_at DESC;
