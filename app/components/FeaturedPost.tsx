import Link from 'next/link';
import { BlogPostMeta } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { RisoTape } from './WisprPrimitives';

export default function FeaturedPost({ post }: { post: BlogPostMeta }) {
  if (!post) return null;

  return (
    <div className="bg-white border-3 border-[hsl(230,30%,14%)] riso-shadow-pink p-6 sm:p-9 mb-14">
      <div
        className={`grid gap-8 items-center ${
          post.featured_image ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
        }`}
      >
        {/* Optional Cover Image */}
        {post.featured_image && (
          <div className="lg:col-span-5">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative w-full aspect-[16/10] overflow-hidden border-2 border-[hsl(230,30%,14%)] riso-shadow-ink-sm bg-white">
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
          <div className="flex items-center gap-2.5 flex-wrap">
            <RisoTape rotate={-1}>
              ★ FEATURED FIELD NOTE
            </RisoTape>
            {post.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="font-space text-[10px] font-bold uppercase px-2 py-0.5 bg-[hsl(52,100%,55%)] border border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)]"
              >
                #{t}
              </span>
            ))}
          </div>

          <Link href={`/blog/${post.slug}`} className="group">
            <h3 className="text-[hsl(230,30%,14%)] font-archivo uppercase text-2xl sm:text-3xl lg:text-4xl group-hover:text-[hsl(212,100%,45%)] transition-colors leading-tight">
              {post.title}
            </h3>
          </Link>

          <p className="font-space text-xs sm:text-sm text-[hsl(230,30%,20%)] leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-[hsl(230,30%,14%)] mt-2">
            <div className="flex items-center gap-2 text-xs font-space font-bold text-[hsl(230,12%,38%)]">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime} MIN READ</span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="btn-riso-pink text-xs"
            >
              Read Full Note →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
