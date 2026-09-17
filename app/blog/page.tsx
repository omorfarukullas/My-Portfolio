import { getAllPostsAsync, getAllTagsAsync, getFeaturedPostAsync } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogListClient from './BlogListClient';
import FeaturedPost from '@/app/components/FeaturedPost';
import { TealBadge } from '@/app/components/WisprPrimitives';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = generatePageMetadata({
  title: 'Field Notes & Research Blog',
  description: 'Technical writing on low-resource NLP, systems architecture, and engineering reflections.',
  canonical: 'https://omorfarukullas.vercel.app/blog',
});

export default async function BlogPage() {
  const posts = await getAllPostsAsync();
  const allTags = await getAllTagsAsync();
  const featuredPost = await getFeaturedPostAsync();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-[#ffffeb] min-h-screen text-[#1a1a1a]" style={{ fontFamily: 'var(--font-figtree)' }}>
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col items-start gap-4 mb-16 max-w-2xl">
            <TealBadge>Research Index &amp; Notebook</TealBadge>
            <h1
              className="text-[#1a1a1a]"
              style={{
                fontFamily: 'var(--font-eb-garamond)',
                fontSize: 'clamp(42px, 6vw, 76px)',
                lineHeight: 0.95,
                letterSpacing: '-2px',
                fontWeight: 400,
              }}
            >
              Writing &amp; Field Notes.
            </h1>
            <p className="text-lg sm:text-xl text-[#8a8a80]">
              Reflections on low-resource language processing, machine learning system deployment, and pragmatic engineering lessons.
            </p>
          </div>

          {/* Top Featured Post */}
          {featuredPost && <FeaturedPost post={featuredPost} />}

          {/* All Posts Grid with Tag Filtering */}
          <div className="mt-8">
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#e4e4d0]">
              <h2
                className="text-2xl sm:text-3xl text-[#1a1a1a]"
                style={{ fontFamily: 'var(--font-eb-garamond)' }}
              >
                All Publications
              </h2>
              <span className="text-sm font-medium text-[#8a8a80]">
                {posts.length} entries recorded
              </span>
            </div>

            <BlogListClient posts={posts} allTags={allTags} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
