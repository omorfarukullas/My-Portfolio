import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getPostBySlugAsync, getRelatedPostsAsync, getAdjacentPostsAsync } from '@/lib/mdx';
import { generatePageMetadata, generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogCard from '@/app/components/BlogCard';
import PostAttachments from '@/app/components/PostAttachments';
import CommentForm from '@/app/components/CommentForm';
import CommentsList from '@/app/components/CommentsList';
import Link from 'next/link';
import { TealBadge, DarkSquareBadge } from '@/app/components/WisprPrimitives';

interface Params { slug: string }

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const post = await getPostBySlugAsync(resolvedParams.slug);
  if (!post) return {};
  return generatePageMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.description,
    ogImage: post.featured_image || undefined,
    canonical: `${seoConfig.siteUrl}/blog/${post.slug}`,
    type: 'article',
    publishedAt: post.date,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const post = await getPostBySlugAsync(resolvedParams.slug);
  if (!post) notFound();

  const [related, { prev, next }] = await Promise.all([
    getRelatedPostsAsync(post.slug, post.tags),
    getAdjacentPostsAsync(post.slug),
  ]);

  const blogSchema = generateBlogPostingSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: seoConfig.siteUrl },
    { name: 'Blog', url: `${seoConfig.siteUrl}/blog` },
    { name: post.title, url: `${seoConfig.siteUrl}/blog/${post.slug}` },
  ]);

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="pt-28 pb-20 bg-[#ffffeb] min-h-screen text-[#1a1a1a]" style={{ fontFamily: 'var(--font-figtree)' }}>
        <article>
          {/* Post Editorial Header */}
          <div className="border-b border-[#e4e4d0] pb-12 mb-12">
            <div className="container mx-auto max-w-[840px]">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#8a8a80] mb-6">
                <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-[#1a1a1a] transition-colors">Field Notes</Link>
                <span>/</span>
                <span className="text-[#1a1a1a] font-medium truncate max-w-[280px]">{post.title}</span>
              </nav>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <DarkSquareBadge variant="cream">#{tag}</DarkSquareBadge>
                  </Link>
                ))}
              </div>

              {/* Title in EB Garamond 400 */}
              <h1
                className="text-[#1a1a1a] mb-6"
                style={{
                  fontFamily: 'var(--font-eb-garamond)',
                  fontSize: 'clamp(36px, 5.5vw, 64px)',
                  lineHeight: 1.02,
                  letterSpacing: '-1.5px',
                  fontWeight: 400,
                }}
              >
                {post.title}
              </h1>

              <p className="text-xl text-[#8a8a80] leading-relaxed mb-8">
                {post.description}
              </p>

              {/* Author & Publication Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e4e4d0] text-sm text-[#8a8a80]">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#1a1a1a]">{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${seoConfig.siteUrl}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                  style={{ padding: '6px 14px' }}
                >
                  Share to X
                </a>
              </div>
            </div>
          </div>

          {/* Post Content Canvas */}
          <div className="container mx-auto max-w-[840px]">
            {/* Optional Featured Cover Photo */}
            {post.featured_image && (
              <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden border-2 border-[#1a1a1a] mb-10 bg-white">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Prose Body in Cream Card */}
            <div className="card-cream p-8 sm:p-12 mb-12">
              <div className="prose max-w-none">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                    },
                  }}
                />
              </div>
            </div>

            {/* Attached Media / PDFs */}
            {post.attachments && post.attachments.length > 0 && (
              <PostAttachments attachments={post.attachments} />
            )}

            {/* Adjacent Posts Navigation */}
            {(prev || next) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="block group no-underline">
                    <div className="card-cream p-6 h-full">
                      <span className="text-xs uppercase font-semibold text-[#8a8a80] block mb-1">
                        ← Previous Entry
                      </span>
                      <span className="font-serif text-lg text-[#1a1a1a] group-hover:text-[#034f46] transition-colors" style={{ fontFamily: 'var(--font-eb-garamond)' }}>
                        {prev.title}
                      </span>
                    </div>
                  </Link>
                ) : <div />}

                {next ? (
                  <Link href={`/blog/${next.slug}`} className="block group no-underline sm:text-right">
                    <div className="card-cream p-6 h-full">
                      <span className="text-xs uppercase font-semibold text-[#8a8a80] block mb-1">
                        Next Entry →
                      </span>
                      <span className="font-serif text-lg text-[#1a1a1a] group-hover:text-[#034f46] transition-colors" style={{ fontFamily: 'var(--font-eb-garamond)' }}>
                        {next.title}
                      </span>
                    </div>
                  </Link>
                ) : <div />}
              </div>
            )}

            {/* Visitor Discussion & Comments */}
            <div id="comments" className="mt-16 pt-10 border-t border-[#e4e4d0]">
              <div className="flex items-center gap-3 mb-6">
                <TealBadge>Discussion</TealBadge>
                <span className="text-sm text-[#8a8a80]">
                  ({post.comments?.length || 0} approved comments)
                </span>
              </div>

              <CommentForm postSlug={post.slug} />
              <CommentsList comments={post.comments || []} />
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mt-20 pt-10 border-t border-[#e4e4d0]">
                <h2
                  className="text-3xl text-[#1a1a1a] mb-8"
                  style={{ fontFamily: 'var(--font-eb-garamond)' }}
                >
                  Related Dispatches
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {related.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
