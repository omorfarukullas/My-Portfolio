import { getAllPostsAsync, getAllTagsAsync, getFeaturedPostAsync } from '@/lib/mdx';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogListClient from './BlogListClient';
import FeaturedPost from '@/app/components/FeaturedPost';
import { StickyTag } from '@/app/components/HandDrawn';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = generatePageMetadata({
    title: 'Field Notes & Research Blog — Omor Faruck Ullas',
    description: 'Articles and research reflections by Omor Faruck Ullas (Omor Faruk Ullas) on AI/ML, low-resource Bangla NLP, full-stack systems, and web architecture.',
    canonical: `${seoConfig.siteUrl}/blog`,
});

const blogPageSchema = generateWebPageSchema(
    'Field Notes & Research Blog — Omor Faruck Ullas',
    'Articles and research reflections by Omor Faruck Ullas on AI/ML, low-resource Bangla NLP, and full-stack software development.',
    `${seoConfig.siteUrl}/blog`,
);

export default async function BlogPage() {
    const posts = await getAllPostsAsync();
    const allTags = await getAllTagsAsync();
    const featuredPost = await getFeaturedPostAsync();

    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }} />
            <main style={{ paddingTop: '80px' }}>
                <div className="container section">
                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem', maxWidth: '620px' }}>
                        <StickyTag color="yellow" rotate={-1} style={{ marginBottom: '0.65rem' }}>
                            📝 Field Notes &amp; Thoughts
                        </StickyTag>
                        <h1 style={{
                            fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            fontFamily: 'Kalam, cursive',
                            color: '#2d2d2d',
                            marginBottom: '0.75rem',
                        }}>
                            Writing &amp; Research Notes
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.25rem',
                            lineHeight: 1.5,
                            fontFamily: 'Patrick Hand, cursive',
                        }}>
                            Reflections on AI research, low-resource Bangla NLP, software engineering, and things learned along the way.
                        </p>
                    </div>

                    {/* Top Featured Post */}
                    {featuredPost && (
                        <FeaturedPost post={featuredPost} />
                    )}

                    {/* All Posts Grid with Tag Filtering */}
                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <h2 style={{
                                fontFamily: 'Kalam, cursive',
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                color: '#2d2d2d',
                                margin: 0,
                            }}>
                                📚 All Articles
                            </h2>
                            <span style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                                ({posts.length} posts)
                            </span>
                        </div>
                        <BlogListClient posts={posts} allTags={allTags} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
