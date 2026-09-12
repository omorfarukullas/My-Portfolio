import { getAllPostsAsync, generateRssFeed } from '@/lib/mdx';
import { seoConfig } from '@/config/seo';

export async function GET() {
    const posts = await getAllPostsAsync();
    const rss = generateRssFeed(posts, seoConfig.siteUrl);

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
