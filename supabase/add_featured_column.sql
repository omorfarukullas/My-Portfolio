-- ===================================================
-- Run this in Supabase SQL Editor to add Featured Post Support
-- ===================================================

-- 1. Add featured column if not exists
alter table public.posts add column if not exists featured boolean default false;
create index if not exists idx_posts_featured on public.posts (featured);

-- 2. Make sure RLS policy allows public SELECT of published posts
drop policy if exists "Allow public read access for published posts" on public.posts;
create policy "Allow public read access for published posts"
    on public.posts for select
    using (published = true);
