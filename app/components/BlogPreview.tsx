import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import BlogCard from './BlogCard';
import { StickyTag } from './HandDrawn';

export default function BlogPreview() {
    const posts = getAllPosts().slice(0, 3);

    if (posts.length === 0) return null;

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
                            Recent Writing
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="btn-sketch"
                        style={{ fontSize: '1.05rem', padding: '0.45rem 1.25rem' }}
                    >
                        View All Posts →
                    </Link>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
