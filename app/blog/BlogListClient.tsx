'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '@/app/components/BlogCard';
import { BlogPostMeta } from '@/lib/mdx';
import { RADIUS } from '@/app/components/HandDrawn';

interface BlogListClientProps {
    posts: BlogPostMeta[];
    allTags: string[];
}

const POSTS_PER_PAGE = 6;

export default function BlogListClient({ posts, allTags }: BlogListClientProps) {
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

    const filtered = useMemo(() => {
        return posts.filter((p) => {
            const matchesQuery =
                !query ||
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase());
            const matchesTag = !activeTag || p.tags.includes(activeTag);
            return matchesQuery && matchesTag;
        });
    }, [posts, query, activeTag]);

    const visible = filtered.slice(0, visibleCount);

    return (
        <>
            {/* Search + Filter Row */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <input
                    type="search"
                    placeholder="🔍 Search sketches and field notes…"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setVisibleCount(POSTS_PER_PAGE); }}
                    style={{
                        width: '100%',
                        maxWidth: '460px',
                        padding: '0.75rem 1.1rem',
                        background: '#ffffff',
                        border: '2.5px solid #2d2d2d',
                        borderRadius: RADIUS.wobblySm,
                        color: '#2d2d2d',
                        fontSize: '1.15rem',
                        fontFamily: 'Patrick Hand, cursive',
                        outline: 'none',
                        boxShadow: '3px 3px 0px #2d2d2d',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--secondary-accent)';
                        e.target.style.boxShadow = '3px 3px 0px var(--secondary-accent)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#2d2d2d';
                        e.target.style.boxShadow = '3px 3px 0px #2d2d2d';
                    }}
                />

                {/* Filter Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <button
                        onClick={() => { setActiveTag(''); setVisibleCount(POSTS_PER_PAGE); }}
                        style={{
                            padding: '0.3rem 0.95rem',
                            borderRadius: RADIUS.wobblySm,
                            fontSize: '1rem',
                            fontFamily: 'Patrick Hand, cursive',
                            fontWeight: 700,
                            border: '2px solid #2d2d2d',
                            cursor: 'pointer',
                            transition: 'all 0.1s ease',
                            background: !activeTag ? 'var(--accent)' : '#ffffff',
                            color: !activeTag ? '#ffffff' : '#2d2d2d',
                            boxShadow: !activeTag ? '1px 1px 0px #2d2d2d' : '2px 2px 0px #2d2d2d',
                            transform: !activeTag ? 'translate(1px, 1px)' : 'rotate(-1deg)',
                        }}
                    >
                        All Articles
                    </button>
                    {allTags.map((tag, idx) => {
                        const isSelected = activeTag === tag;
                        return (
                            <button
                                key={tag}
                                onClick={() => { setActiveTag(isSelected ? '' : tag); setVisibleCount(POSTS_PER_PAGE); }}
                                style={{
                                    padding: '0.3rem 0.95rem',
                                    borderRadius: RADIUS.wobblySm,
                                    fontSize: '1rem',
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontWeight: 600,
                                    border: '2px solid #2d2d2d',
                                    cursor: 'pointer',
                                    transition: 'all 0.1s ease',
                                    background: isSelected ? 'var(--accent)' : 'var(--bg-elevated)',
                                    color: isSelected ? '#ffffff' : '#2d2d2d',
                                    boxShadow: isSelected ? '1px 1px 0px #2d2d2d' : '2px 2px 0px #2d2d2d',
                                    transform: isSelected ? 'translate(1px, 1px)' : idx % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)',
                                }}
                            >
                                #{tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Results count */}
            {(query || activeTag) && (
                <p style={{ fontSize: '1.05rem', fontFamily: 'Patrick Hand, cursive', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Found <strong>{filtered.length}</strong> {filtered.length === 1 ? 'sketch note' : 'sketch notes'}
                </p>
            )}

            {/* Grid */}
            {visible.length > 0 ? (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                        {visible.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: i * 0.05 }}
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More */}
                    {visibleCount < filtered.length && (
                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={() => setVisibleCount((v) => v + POSTS_PER_PAGE)}
                                className="btn-sketch"
                            >
                                📜 Turn page ({filtered.length - visibleCount} more notes)
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 1rem',
                    background: '#ffffff',
                    border: '2px dashed #2d2d2d',
                    borderRadius: RADIUS.wobbly,
                }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontFamily: 'Patrick Hand, cursive' }}>
                        No notebook entries match that search query.
                    </p>
                    <button
                        onClick={() => { setQuery(''); setActiveTag(''); }}
                        className="btn-sketch"
                        style={{ marginTop: '1rem', fontSize: '1.05rem' }}
                    >
                        Clear filters ✍️
                    </button>
                </div>
            )}
        </>
    );
}
