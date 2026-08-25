'use client';

import Link from 'next/link';
import { BlogPostMeta } from '@/lib/mdx';
import { formatDateShort } from '@/lib/utils';
import { RADIUS, TapeStrip } from './HandDrawn';

interface BlogCardProps {
    post: BlogPostMeta;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', display: 'block', height: '100%' }}
        >
            <article
                style={{
                    position: 'relative',
                    background: '#ffffff',
                    border: '2.5px solid #2d2d2d',
                    borderRadius: RADIUS.wobbly,
                    padding: featured ? '2.25rem 2rem' : '1.75rem 1.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    boxShadow: '4px 4px 0px 0px #2d2d2d',
                    transform: 'rotate(-0.5deg)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) rotate(0.5deg)';
                    e.currentTarget.style.boxShadow = '8px 8px 0px 0px #2d2d2d';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotate(-0.5deg)';
                    e.currentTarget.style.boxShadow = '4px 4px 0px 0px #2d2d2d';
                }}
            >
                <TapeStrip rotate={-1.5} />

                {/* Tags Row */}
                {post.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: '0.85rem',
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontWeight: 600,
                                    background: 'var(--bg-postit)',
                                    border: '1.5px solid #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    padding: '0.15rem 0.55rem',
                                    color: '#2d2d2d',
                                    boxShadow: '1px 1px 0px #2d2d2d',
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h3 style={{
                    fontSize: featured ? '1.45rem' : '1.25rem',
                    fontWeight: 700,
                    fontFamily: 'Kalam, cursive',
                    lineHeight: 1.25,
                    color: '#2d2d2d',
                    margin: '0.25rem 0 0 0',
                }}>
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{
                    fontSize: '1.05rem',
                    fontFamily: 'Patrick Hand, cursive',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: 0,
                }}>
                    {post.description}
                </p>

                {/* Meta row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.95rem',
                    fontFamily: 'Patrick Hand, cursive',
                    color: 'var(--text-muted)',
                    paddingTop: '0.65rem',
                    borderTop: '1.5px dashed #2d2d2d',
                }}>
                    <time dateTime={post.date}>{formatDateShort(post.date)}</time>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                    <span style={{
                        marginLeft: 'auto',
                        color: 'var(--accent)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                    }}>
                        Read post →
                    </span>
                </div>
            </article>
        </Link>
    );
}
