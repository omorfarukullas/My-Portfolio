import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { estimateReadTime } from './utils';
import { getSupabaseClient, isSupabaseConfigured } from './supabase';

export interface AttachmentMeta {
    id?: string;
    file_url: string;
    file_name: string;
    file_type?: string;
    file_size?: string;
}

export interface CommentMeta {
    id: string;
    author_name: string;
    author_email?: string;
    content: string;
    created_at: string;
    approved?: boolean;
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    featured_image?: string;
    featured?: boolean;
    published: boolean;
    seo_title?: string;
    seo_description?: string;
    readTime: number;
    content: string;
    attachments?: AttachmentMeta[];
    comments?: CommentMeta[];
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> { }

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

function ensureBlogsDir() {
    if (!fs.existsSync(BLOGS_DIR)) {
        fs.mkdirSync(BLOGS_DIR, { recursive: true });
    }
}

// Synchronous local file reader
export function getAllPosts(): BlogPostMeta[] {
    ensureBlogsDir();

    const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.mdx'));

    const posts = files
        .map((filename) => {
            const slug = filename.replace(/\.mdx$/, '');
            const filePath = path.join(BLOGS_DIR, filename);
            const raw = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(raw);

            return {
                slug: data.slug || slug,
                title: data.title || 'Untitled',
                description: data.description || '',
                date: data.date || new Date().toISOString(),
                author: data.author || 'Omor Faruk Ullas',
                tags: Array.isArray(data.tags) ? data.tags : [],
                featured_image: data.featured_image || null,
                featured: Boolean(data.featured),
                published: data.published !== false,
                seo_title: data.seo_title,
                seo_description: data.seo_description,
                readTime: estimateReadTime(content),
            } as BlogPostMeta;
        })
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

// Asynchronous reader prioritizing Supabase with local MDX fallback
export async function getAllPostsAsync(): Promise<BlogPostMeta[]> {
    if (isSupabaseConfigured()) {
        try {
            const supabase = getSupabaseClient();
            if (supabase) {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });

                if (!error && data && data.length > 0) {
                    return data.map((p) => ({
                        slug: p.slug,
                        title: p.title,
                        description: p.description || '',
                        date: p.created_at || new Date().toISOString(),
                        author: 'Omor Faruk Ullas',
                        tags: Array.isArray(p.tags) ? p.tags : [],
                        featured_image: p.featured_image_url || null,
                        featured: Boolean(p.featured),
                        published: p.published,
                        readTime: p.read_time || estimateReadTime(p.content || ''),
                    }));
                }
            }
        } catch (err) {
            console.error('Supabase fetch error, falling back to local files:', err);
        }
    }

    return getAllPosts();
}

export async function getFeaturedPostAsync(): Promise<BlogPostMeta | null> {
    const posts = await getAllPostsAsync();
    // Return explicitly featured post or first post as fallback
    const explicitlyFeatured = posts.find((p) => p.featured);
    return explicitlyFeatured || posts[0] || null;
}

export function getPostBySlug(slug: string): BlogPost | null {
    ensureBlogsDir();

    const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
        slug: data.slug || slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Omor Faruk Ullas',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured_image: data.featured_image || null,
        featured: Boolean(data.featured),
        published: data.published !== false,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        readTime: estimateReadTime(content),
        content,
        attachments: [],
        comments: [],
    };
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
    if (isSupabaseConfigured()) {
        try {
            const supabase = getSupabaseClient();
            if (supabase) {
                const { data: post, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (!error && post) {
                    const [attRes, comRes] = await Promise.all([
                        supabase.from('attachments').select('*').eq('post_slug', slug),
                        supabase.from('comments').select('*').eq('post_slug', slug).eq('approved', true).order('created_at', { ascending: true }),
                    ]);

                    return {
                        slug: post.slug,
                        title: post.title,
                        description: post.description || '',
                        date: post.created_at || new Date().toISOString(),
                        author: 'Omor Faruk Ullas',
                        tags: Array.isArray(post.tags) ? post.tags : [],
                        featured_image: post.featured_image_url || null,
                        featured: Boolean(post.featured),
                        published: post.published,
                        readTime: post.read_time || estimateReadTime(post.content || ''),
                        content: post.content,
                        attachments: attRes.data || [],
                        comments: comRes.data || [],
                    };
                }
            }
        } catch (err) {
            console.error('Supabase getPost error:', err);
        }
    }

    return getPostBySlug(slug);
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): BlogPostMeta[] {
    const allPosts = getAllPosts();
    return allPosts
        .filter((p) => p.slug !== slug && p.tags.some((t) => tags.includes(t)))
        .slice(0, limit);
}

export function getAdjacentPosts(slug: string): {
    prev: BlogPostMeta | null;
    next: BlogPostMeta | null;
} {
    const allPosts = getAllPosts();
    const index = allPosts.findIndex((p) => p.slug === slug);
    return {
        prev: index < allPosts.length - 1 ? allPosts[index + 1] : null,
        next: index > 0 ? allPosts[index - 1] : null,
    };
}

export function getAllTags(): string[] {
    const allPosts = getAllPosts();
    const tagSet = new Set<string>();
    allPosts.forEach((post) => post.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
}

export function generateRssFeed(posts: BlogPostMeta[], siteUrl: string): string {
    const items = posts
        .map(
            (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author>${post.author}</author>
      ${post.tags.map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`
        )
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Omor Faruk Ullas — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles on Full Stack Development, React, Node.js, and building real-world solutions.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}
