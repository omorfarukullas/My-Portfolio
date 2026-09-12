-- ===================================================
-- Supabase Schema for Portfolio Blog System
-- Run this in your Supabase SQL Editor (supabase.com)
-- ===================================================

-- MIGRATION FOR EXISTING DATABASES:
-- If your 'posts' table is already created, run this line to add the 'featured' column:
alter table public.posts add column if not exists featured boolean default false;
create index if not exists idx_posts_featured on public.posts (featured);

-- 1. Create Posts Table
create table if not exists public.posts (
    id uuid default gen_random_uuid() primary key,
    slug text unique not null,
    title text not null,
    description text default '',
    content text not null,
    tags text[] default '{}',
    featured_image_url text,
    featured boolean default false,
    published boolean default true,
    read_time integer default 3,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for fast lookup
create index if not exists idx_posts_slug on public.posts (slug);
create index if not exists idx_posts_published on public.posts (published);
create index if not exists idx_posts_featured on public.posts (featured);
create index if not exists idx_posts_created_at on public.posts (created_at desc);

-- 2. Create Comments Table
create table if not exists public.comments (
    id uuid default gen_random_uuid() primary key,
    post_slug text not null,
    author_name text not null,
    author_email text default '',
    content text not null,
    approved boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_comments_post_slug on public.comments (post_slug);
create index if not exists idx_comments_approved on public.comments (approved);
create index if not exists idx_comments_created_at on public.comments (created_at desc);

-- 3. Create Attachments Table
create table if not exists public.attachments (
    id uuid default gen_random_uuid() primary key,
    post_slug text not null,
    file_url text not null,
    file_name text not null,
    file_type text default '',
    file_size text default '',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_attachments_post_slug on public.attachments (post_slug);

-- ===================================================
-- Row Level Security (RLS) Policies
-- ===================================================

alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.attachments enable row level security;

-- Posts: Public can read published posts; Service role has full access
drop policy if exists "Allow public read access for published posts" on public.posts;
create policy "Allow public read access for published posts"
    on public.posts for select
    using (published = true);

-- Comments: Public can read approved comments
drop policy if exists "Allow public read for approved comments" on public.comments;
create policy "Allow public read for approved comments"
    on public.comments for select
    using (approved = true);

-- Comments: Public can insert comments (awaiting moderation)
drop policy if exists "Allow public to submit comments" on public.comments;
create policy "Allow public to submit comments"
    on public.comments for insert
    with check (true);

-- Attachments: Public can read attachments
drop policy if exists "Allow public read access for attachments" on public.attachments;
create policy "Allow public read access for attachments"
    on public.attachments for select
    using (true);

-- ===================================================
-- Storage Bucket Creation for Images and Documents
-- ===================================================
insert into storage.buckets (id, name, public)
values ('blog-assets', 'blog-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public Access to blog assets" on storage.objects;
create policy "Public Access to blog assets"
    on storage.objects for select
    using (bucket_id = 'blog-assets');

drop policy if exists "Allow uploads to blog assets" on storage.objects;
create policy "Allow uploads to blog assets"
    on storage.objects for insert
    with check (bucket_id = 'blog-assets');

drop policy if exists "Allow updates to blog assets" on storage.objects;
create policy "Allow updates to blog assets"
    on storage.objects for update
    using (bucket_id = 'blog-assets');

drop policy if exists "Allow deletes to blog assets" on storage.objects;
create policy "Allow deletes to blog assets"
    on storage.objects for delete
    using (bucket_id = 'blog-assets');
