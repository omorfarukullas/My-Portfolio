'use client';

import Link from 'next/link';
import { BlogPostMeta } from '@/lib/mdx';
import { formatDateShort } from '@/lib/utils';
import { DarkSquareBadge } from './WisprPrimitives';

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full no-underline group">
      <article
        className="card-cream flex flex-col justify-between h-full transition-transform"
        style={{ fontFamily: 'var(--font-figtree)' }}
      >
        <div>
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <DarkSquareBadge key={tag} variant="cream">
                  #{tag}
                </DarkSquareBadge>
              ))}
            </div>
          )}

          {/* Title in EB Garamond 400 */}
          <h3
            className="text-[#1a1a1a] text-2xl sm:text-3xl mb-3 group-hover:text-[#034f46] transition-colors"
            style={{
              fontFamily: 'var(--font-eb-garamond)',
              lineHeight: 1.1,
              letterSpacing: '-0.96px',
              fontWeight: 400,
            }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#222222] text-base leading-relaxed line-clamp-3 mb-6">
            {post.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-4 border-t border-[#e4e4d0] flex items-center justify-between text-sm text-[#8a8a80]">
          <div className="flex items-center gap-2">
            <time dateTime={post.date}>{formatDateShort(post.date)}</time>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
          <span className="font-semibold text-[#1a1a1a] group-hover:translate-x-1 transition-transform">
            Read →
          </span>
        </div>
      </article>
    </Link>
  );
}
