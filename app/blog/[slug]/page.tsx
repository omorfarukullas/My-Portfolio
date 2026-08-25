import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getAllPosts, getPostBySlug, getRelatedPosts, getAdjacentPosts } from '@/lib/mdx';
import { generatePageMetadata, generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogCard from '@/app/components/BlogCard';
import Link from 'next/link';
import { RADIUS, TapeStrip, StickyTag } from '@/app/components/HandDrawn';

interface Params { slug: string }

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);
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
    const post = getPostBySlug(resolvedParams.slug);
    if (!post) notFound();

    const related = getRelatedPosts(post.slug, post.tags);
    const { prev, next } = getAdjacentPosts(post.slug);

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

            <main style={{ paddingTop: '80px' }}>
                <article>
                    {/* Post Header */}
                    <div style={{ borderBottom: '3px solid #2d2d2d', paddingBottom: '2.5rem', marginBottom: '2.5rem' }}>
                        <div className="container" style={{ paddingTop: '3rem', maxWidth: '820px' }}>
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" style={{
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'center',
                                fontSize: '1.05rem',
                                fontFamily: 'Patrick Hand, cursive',
                                color: 'var(--text-muted)',
                                marginBottom: '1.5rem',
                            }}>
                                <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
                                <span>/</span>
                                <Link href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Notebook</Link>
                                <span>/</span>
                                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{post.title}</span>
                            </nav>

                            {/* Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
                                {post.tags.map((tag) => (
                                    <Link key={tag} href={`/blog?tag=${tag}`}>
                                        <StickyTag color="yellow" rotate={-1}>
                                            #{tag}
                                        </StickyTag>
                                    </Link>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 style={{
                                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                                fontWeight: 700,
                                fontFamily: 'Kalam, cursive',
                                color: '#2d2d2d',
                                lineHeight: 1.15,
                                marginBottom: '1rem',
                            }}>
                                {post.title}
                            </h1>

                            <p style={{
                                fontSize: '1.3rem',
                                color: 'var(--text-secondary)',
                                fontFamily: 'Patrick Hand, cursive',
                                lineHeight: 1.5,
                                marginBottom: '1.75rem',
                            }}>
                                {post.description}
                            </p>

                            {/* Meta */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem',
                                alignItems: 'center',
                                fontSize: '1.05rem',
                                fontFamily: 'Patrick Hand, cursive',
                                color: 'var(--text-secondary)',
                                borderTop: '2px dashed #2d2d2d',
                                paddingTop: '1rem',
                            }}>
                                <span style={{ fontWeight: 700, color: '#2d2d2d' }}>✍️ {post.author}</span>
                                <span>·</span>
                                <time dateTime={post.date}>📅 {formatDate(post.date)}</time>
                                <span>·</span>
                                <span>⏱️ {post.readTime} min read</span>

                                {/* Share button */}
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${seoConfig.siteUrl}/blog/${post.slug}`)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        aria-label="Share on Twitter"
                                        style={{
                                            padding: '0.2rem 0.65rem',
                                            background: '#ffffff',
                                            border: '1.5px solid #2d2d2d',
                                            borderRadius: RADIUS.wobblySm,
                                            boxShadow: '1px 1px 0px #2d2d2d',
                                            fontSize: '0.95rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Share on X
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Post Content Notebook Canvas */}
                    <div className="container" style={{ maxWidth: '820px', paddingBottom: '4rem' }}>
                        <div
                            style={{
                                position: 'relative',
                                background: '#ffffff',
                                border: '3px solid #2d2d2d',
                                borderRadius: RADIUS.wobbly,
                                padding: '3rem 2.5rem',
                                boxShadow: '6px 6px 0px 0px #2d2d2d',
                                marginBottom: '3rem',
                            }}
                        >
                            <TapeStrip rotate={-1} />

                            <div className="prose">
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

                        {/* Prev / Next Navigation Cards */}
                        {(prev || next) && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                gap: '1.5rem',
                                marginTop: '2rem',
                            }}>
                                {prev ? (
                                    <Link href={`/blog/${prev.slug}`} style={{ textDecoration: 'none' }}>
                                        <div
                                            style={{
                                                background: '#ffffff',
                                                border: '2px solid #2d2d2d',
                                                borderRadius: RADIUS.wobblySm,
                                                padding: '1.25rem',
                                                boxShadow: '3px 3px 0px #2d2d2d',
                                                transition: 'transform 0.15s ease',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                                        >
                                            <p style={{ fontSize: '0.95rem', fontFamily: 'Patrick Hand, cursive', color: 'var(--text-muted)', margin: 0 }}>← Previous note</p>
                                            <p style={{ fontSize: '1.15rem', fontFamily: 'Kalam, cursive', fontWeight: 700, color: '#2d2d2d', margin: '0.35rem 0 0 0' }}>{prev.title}</p>
                                        </div>
                                    </Link>
                                ) : <div />}

                                {next ? (
                                    <Link href={`/blog/${next.slug}`} style={{ textDecoration: 'none' }}>
                                        <div
                                            style={{
                                                background: '#ffffff',
                                                border: '2px solid #2d2d2d',
                                                borderRadius: RADIUS.wobblySm,
                                                padding: '1.25rem',
                                                boxShadow: '3px 3px 0px #2d2d2d',
                                                textAlign: 'right',
                                                transition: 'transform 0.15s ease',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                                        >
                                            <p style={{ fontSize: '0.95rem', fontFamily: 'Patrick Hand, cursive', color: 'var(--text-muted)', margin: 0 }}>Next note →</p>
                                            <p style={{ fontSize: '1.15rem', fontFamily: 'Kalam, cursive', fontWeight: 700, color: '#2d2d2d', margin: '0.35rem 0 0 0' }}>{next.title}</p>
                                        </div>
                                    </Link>
                                ) : <div />}
                            </div>
                        )}

                        {/* Related Posts */}
                        {related.length > 0 && (
                            <div style={{ marginTop: '3.5rem' }}>
                                <h2 style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 700,
                                    fontFamily: 'Kalam, cursive',
                                    color: '#2d2d2d',
                                    marginBottom: '1.5rem',
                                    textDecoration: 'underline wavy var(--accent)',
                                    textUnderlineOffset: '4px',
                                }}>
                                    Related Field Notes
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
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
