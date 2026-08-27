import Link from 'next/link';
import { getAllPostsAsync, getFeaturedPostAsync } from '@/lib/mdx';
import BlogCard from './BlogCard';
import FeaturedPost from './FeaturedPost';
import { StickyTag } from './HandDrawn';

export default async function BlogPreview() {
    const allPosts = await getAllPostsAsync();
    if (allPosts.length === 0) return null;

    const featuredPost = await getFeaturedPostAsync();
    // Filter out featured post from the small cards below to avoid immediate duplicate
    const recentPosts = featuredPost
        ? allPosts.filter((p) => p.slug !== featuredPost.slug).slice(0, 3)
        : allPosts.slice(0, 3);

    return (
        <section id="blog" className="section" style={{ borderTop: '3px solid #2d2d2d' }}>
            <div className="container">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div>
                        <StickyTag color="blue" rotate={-1} style={{ marginBottom: '0.5rem' }}>
                            📝 Field Notes &amp; Thoughts
                        </StickyTag>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 700,
                            fontFamily: 'Kalam, cursive',
                            color: '#2d2d2d',
                            margin: '0.25rem 0 0 0',
                        }}>
                            Recent Writing &amp; Research
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="btn-sketch"
                        style={{ fontSize: '1.05rem', padding: '0.45rem 1.25rem' }}
                    >
                        View All Posts ({allPosts.length}) →
                    </Link>
                </div>

                {/* Top Featured Post on Home Page */}
                {featuredPost && (
                    <FeaturedPost post={featuredPost} />
                )}

                {/* Recent Articles Grid */}
                {recentPosts.length > 0 && (
                    <div>
                        {featuredPost && (
                            <h3 style={{
                                fontFamily: 'Kalam, cursive',
                                fontSize: '1.45rem',
                                fontWeight: 700,
                                color: '#2d2d2d',
                                marginBottom: '1.25rem',
                            }}>
                                📚 More Recent Notes
                            </h3>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {recentPosts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
