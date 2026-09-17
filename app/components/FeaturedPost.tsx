import Link from 'next/link';
import { BlogPostMeta } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { TealBadge, DarkSquareBadge } from './WisprPrimitives';

export default function FeaturedPost({ post }: { post: BlogPostMeta }) {
  if (!post) return null;

  return (
    <div
      className="card-lavender mb-16"
      style={{ fontFamily: 'var(--font-figtree)' }}
    >
      <div
        className={`grid gap-8 items-center ${
          post.featured_image ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
        }`}
      >
        {/* Optional Cover Image */}
        {post.featured_image && (
          <div className="lg:col-span-5">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#1a1a1a] bg-white">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        )}

        {/* Content */}
        <div className={post.featured_image ? 'lg:col-span-7 flex flex-col gap-4' : 'flex flex-col gap-4'}>
          <div className="flex items-center gap-3 flex-wrap">
            <TealBadge>Featured Field Note</TealBadge>
            {post.tags.slice(0, 2).map((t) => (
              <DarkSquareBadge key={t} variant="dark">
                #{t}
              </DarkSquareBadge>
            ))}
          </div>

          <Link href={`/blog/${post.slug}`} className="group">
            <h3
              className="text-[#1a1a1a] text-2xl sm:text-4xl group-hover:text-[#034f46] transition-colors"
              style={{
                fontFamily: 'var(--font-eb-garamond)',
                lineHeight: 1.05,
                letterSpacing: '-1px',
                fontWeight: 400,
              }}
            >
              {post.title}
            </h3>
          </Link>

          <p className="text-[#222222] text-base sm:text-lg leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1a1a1a]/20 mt-2">
            <div className="flex items-center gap-3 text-sm text-[#8a8a80]">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="btn-secondary font-medium text-sm"
              style={{ padding: '10px 20px' }}
            >
              Read Full Note →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
