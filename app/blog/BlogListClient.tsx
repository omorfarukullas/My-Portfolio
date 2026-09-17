'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from '@/app/components/BlogCard';
import { BlogPostMeta } from '@/lib/mdx';

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
    <div style={{ fontFamily: 'var(--font-figtree)' }}>
      {/* Search and Tag Selector Controls */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="max-w-md">
          <input
            type="search"
            placeholder="Search publications and notes..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(POSTS_PER_PAGE);
            }}
            className="input-wispr"
          />
        </div>

        {/* Tag Pills Row */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTag('');
              setVisibleCount(POSTS_PER_PAGE);
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border-2 transition-colors ${
              !activeTag
                ? 'bg-[#1a1a1a] text-[#ffffeb] border-[#1a1a1a]'
                : 'bg-[#ffffeb] text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#e4e4d0]'
            }`}
          >
            All Topics
          </button>
          {allTags.map((tag) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setActiveTag(isSelected ? '' : tag);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border-2 transition-colors ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-[#ffffeb] border-[#1a1a1a]'
                    : 'bg-[#ffffeb] text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#e4e4d0]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Feedback */}
      {(query || activeTag) && (
        <p className="text-sm text-[#8a8a80] mb-8">
          Showing <strong>{filtered.length}</strong> matching {filtered.length === 1 ? 'publication' : 'publications'}
        </p>
      )}

      {/* Publications Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="card-cream p-12 text-center text-[#8a8a80]">
          <p className="text-lg">No entries match your search query or tag criteria.</p>
        </div>
      )}

      {/* Pagination Load More */}
      {visibleCount < filtered.length && (
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
            className="btn-secondary"
          >
            Load Older Entries ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
