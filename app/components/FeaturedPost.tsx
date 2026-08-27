import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { RADIUS, TapeStrip, StickyTag } from './HandDrawn';

export default function FeaturedPost({ post }: { post: BlogPostMeta }) {
    if (!post) return null;

    return (
        <div style={{
            position: 'relative',
            background: 'var(--bg-card)',
            border: '3px solid #2d2d2d',
            borderRadius: RADIUS.wobbly,
            padding: '2.25rem 2rem',
            boxShadow: '6px 6px 0px #2d2d2d',
            marginBottom: '3.5rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}>
            <TapeStrip rotate={-1.5} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: post.featured_image ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
                gap: '2rem',
                alignItems: 'center',
            }}>
                {/* Optional Cover Image */}
                {post.featured_image && (
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '280px',
                            borderRadius: RADIUS.wobblySm,
                            border: '2.5px solid #2d2d2d',
                            overflow: 'hidden',
                            boxShadow: '4px 4px 0px #2d2d2d',
                            background: '#eae3d6',
                        }}>
                            <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </Link>
                )}

                {/* Content */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        <StickyTag color="coral" rotate={-1}>
                            ⭐ Top Featured Article
                        </StickyTag>
                        {post.tags.slice(0, 2).map((t) => (
                            <span
                                key={t}
                                style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    background: 'var(--bg-elevated)',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '6px',
                                    border: '1.5px solid #2d2d2d',
                                }}
                            >
                                #{t}
                            </span>
                        ))}
                    </div>

                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2 style={{
                            fontFamily: 'Kalam, cursive',
                            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            color: '#2d2d2d',
                            margin: '0.2rem 0 0.75rem 0',
                            transition: 'color 0.2s',
                        }}>
                            {post.title}
                        </h2>
                    </Link>

                    <p style={{
                        fontFamily: 'Patrick Hand, cursive',
                        fontSize: '1.2rem',
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem',
                    }}>
                        {post.description}
                    </p>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        borderTop: '2px dashed #2d2d2d',
                        paddingTop: '1rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '0.85rem',
                            fontFamily: 'Patrick Hand, cursive',
                            fontSize: '1.05rem',
                            color: 'var(--text-muted)',
                        }}>
                            <span>📅 {formatDate(post.date)}</span>
                            <span>·</span>
                            <span>⏱️ {post.readTime} min read</span>
                        </div>

                        <Link
                            href={`/blog/${post.slug}`}
                            className="btn-sketch"
                            style={{
                                padding: '0.45rem 1.35rem',
                                fontSize: '1.05rem',
                                textDecoration: 'none',
                            }}
                        >
                            Read Full Story 🚀
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
