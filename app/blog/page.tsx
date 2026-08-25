import { getAllPosts, getAllTags } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogListClient from './BlogListClient';
import { StickyTag } from '@/app/components/HandDrawn';

export const metadata = generatePageMetadata({
    title: 'Field Notes & Blog',
    description: 'Articles on Low-Resource NLP, Full Stack Development, React, Next.js, and building real-world solutions.',
    canonical: 'https://omorfarukullas.vercel.app/blog',
});

export default function BlogPage() {
    const posts = getAllPosts();
    const allTags = getAllTags();

    return (
        <>
            <Header />
            <main style={{ paddingTop: '80px' }}>
                <div className="container section">
                    {/* Header */}
                    <div style={{ marginBottom: '3rem', maxWidth: '620px' }}>
                        <StickyTag color="yellow" rotate={-1} style={{ marginBottom: '0.65rem' }}>
                            📝 Field Notes &amp; Thoughts
                        </StickyTag>
                        <h1 style={{
                            fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            fontFamily: 'Kalam, cursive',
                            color: '#2d2d2d',
                            marginBottom: '0.75rem',
                        }}>
                            Writing &amp; Research Notes
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.25rem',
                            lineHeight: 1.5,
                            fontFamily: 'Patrick Hand, cursive',
                        }}>
                            Reflections on AI research, low-resource Bangla NLP, software engineering, and things learned along the way.
                        </p>
                    </div>

                    <BlogListClient posts={posts} allTags={allTags} />
                </div>
            </main>
            <Footer />
        </>
    );
}
