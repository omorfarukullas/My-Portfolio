import { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo';
import { getAllPostsAsync } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = seoConfig.siteUrl;

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/research`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    let postRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = await getAllPostsAsync();
        postRoutes = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.date ? new Date(post.date) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));
    } catch (e) {
        console.error('Error fetching blog posts for sitemap:', e);
    }

    return [...staticRoutes, ...postRoutes];
}
