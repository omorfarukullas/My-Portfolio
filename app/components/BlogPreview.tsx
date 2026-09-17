import Link from 'next/link';
import { getAllPostsAsync, getFeaturedPostAsync } from '@/lib/mdx';
import BlogCard from './BlogCard';
import FeaturedPost from './FeaturedPost';
import { MisregisteredHeading, RisoTape } from './WisprPrimitives';

export default async function BlogPreview() {
  const allPosts = await getAllPostsAsync();
  if (allPosts.length === 0) return null;

  const featuredPost = await getFeaturedPostAsync();
  const recentPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug).slice(0, 3)
    : allPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-[hsl(44,45%,92%)]">
      <div className="container mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start gap-4 max-w-2xl">
            <RisoTape rotate={-1}>
              DISPATCHES // RESEARCH LOG
            </RisoTape>
            
            <MisregisteredHeading
              as="h2"
              ghostColor="pink"
              offset={3}
              className="text-3xl sm:text-5xl lg:text-6xl font-archivo uppercase tracking-tight text-[hsl(230,30%,14%)] leading-[0.95]"
            >
              Writing from the Laboratory.
            </MisregisteredHeading>

            <p className="font-space text-sm sm:text-base text-[hsl(230,12%,38%)] max-w-xl leading-relaxed">
              Dispatches exploring low-resource Bangla NLP, dataset engineering, distributed systems, and modern software craft.
            </p>
          </div>

          <Link href="/blog" className="btn-riso-outline whitespace-nowrap w-fit text-xs">
            All Notes ({allPosts.length}) →
          </Link>
        </div>

        {/* Featured Post — High-Impact Card */}
        {featuredPost && <FeaturedPost post={featuredPost} />}

        {/* Recent Articles Grid */}
        {recentPosts.length > 0 && (
          <div>
            {featuredPost && (
              <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-[hsl(230,30%,14%)]">
                <span className="font-space text-xs uppercase font-bold tracking-widest text-[hsl(230,12%,38%)]">
                  // RECENT DISPATCHES
                </span>
                <span className="font-space text-xs font-bold text-[hsl(212,100%,45%)]">
                  CATALOG 2026
                </span>
              </div>
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
