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
        className="bg-white border-2 border-[hsl(230,30%,14%)] riso-shadow-ink group-hover:riso-shadow-pink group-hover:-translate-y-1 transition-all duration-150 flex flex-col justify-between h-full p-6 sm:p-7"
      >
        <div>
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-space text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[hsl(52,100%,55%)] border border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title in Archivo Black */}
          <h3
            className="text-[hsl(230,30%,14%)] font-archivo uppercase text-xl sm:text-2xl mb-2.5 group-hover:text-[hsl(212,100%,45%)] transition-colors leading-tight"
          >
            {post.title}
          </h3>

          {/* Excerpt in Space Mono */}
          <p className="font-space text-xs sm:text-sm text-[hsl(230,30%,20%)] leading-relaxed line-clamp-3 mb-6">
            {post.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-3 border-t-2 border-[hsl(230,30%,14%)] flex items-center justify-between font-space text-xs font-bold text-[hsl(230,12%,38%)]">
          <div className="flex items-center gap-2">
            <time dateTime={post.date}>{formatDateShort(post.date)}</time>
            <span>•</span>
            <span>{post.readTime} MIN READ</span>
          </div>
          <span className="font-bold text-[hsl(230,30%,14%)] group-hover:translate-x-1 group-hover:text-[hsl(330,100%,60%)] transition-all">
            READ →
          </span>
        </div>
      </article>
    </Link>
  );
}
