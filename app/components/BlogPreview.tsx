import Link from 'next/link';
import { getAllPostsAsync, getFeaturedPostAsync } from '@/lib/mdx';
import BlogCard from './BlogCard';
import FeaturedPost from './FeaturedPost';
import { TealBadge } from './WisprPrimitives';

export default async function BlogPreview() {
  const allPosts = await getAllPostsAsync();
  if (allPosts.length === 0) return null;

  const featuredPost = await getFeaturedPostAsync();
  const recentPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug).slice(0, 3)
    : allPosts.slice(0, 3);

  return (
    <section id="blog" className="cream-section" style={{ fontFamily: 'var(--font-figtree)' }}>
      <div className="container mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start gap-4 max-w-2xl">
            <TealBadge>Dispatches &amp; Field Notes</TealBadge>
            <h2
              className="text-[#1a1a1a]"
              style={{
                fontFamily: 'var(--font-eb-garamond)',
                fontSize: 'clamp(36px, 5.5vw, 64px)',
                lineHeight: 0.95,
                letterSpacing: '-1.92px',
                fontWeight: 400,
              }}
            >
              Writing from the laboratory.
            </h2>
            <p className="text-[#8a8a80] text-lg sm:text-xl">
              Research explorations into low-resource Bangla NLP, distributed systems, and modern software craft.
            </p>
          </div>

          <Link href="/blog" className="btn-secondary whitespace-nowrap w-fit">
            All Notes ({allPosts.length}) →
          </Link>
        </div>

        {/* Featured Post — Lavender Accent Card */}
        {featuredPost && <FeaturedPost post={featuredPost} />}

        {/* Recent Articles Grid */}
        {recentPosts.length > 0 && (
          <div>
            {featuredPost && (
              <h3
                className="text-2xl sm:text-3xl text-[#1a1a1a] mb-8 pb-3 border-b border-[#e4e4d0]"
                style={{ fontFamily: 'var(--font-eb-garamond)' }}
              >
                More Recent Entries
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
