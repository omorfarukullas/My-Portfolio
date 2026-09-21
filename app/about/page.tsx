import { generatePageMetadata, generateWebPageSchema, generateProfilePageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AboutSection from '@/app/components/AboutSection';
import { StickyTag } from '@/app/components/HandDrawn';

export const metadata = generatePageMetadata({
    title: 'About Omor Faruck Ullas — CSE Student & AI/ML Researcher | UIU',
    description: 'Biographical overview of Omor Faruck Ullas (also known as Omor Faruk Ullas), a Computer Science & Engineering student at United International University (UIU), Dhaka, researching AI/ML, low-resource Bangla NLP, and software systems.',
    canonical: `${seoConfig.siteUrl}/about`,
});

const webPageSchema = generateWebPageSchema(
    'About Omor Faruck Ullas — CSE Student & AI/ML Researcher',
    'Biographical background, academic focus, and technical skillset of Omor Faruck Ullas (Omor Faruk Ullas), CSE undergraduate at United International University (UIU), Dhaka, Bangladesh.',
    `${seoConfig.siteUrl}/about`,
);

const profilePageSchema = generateProfilePageSchema(`${seoConfig.siteUrl}/about`);

export default function AboutPage() {
    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
            <main style={{ paddingTop: '80px' }}>
                <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '0.5rem', maxWidth: '840px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <StickyTag color="yellow" rotate={-1} style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                            📖 Academic &amp; Personal Profile
                        </StickyTag>
                        <h1 style={{
                            fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
                            fontWeight: 700,
                            color: '#2d2d2d',
                            fontFamily: 'Kalam, cursive',
                            lineHeight: 1.15,
                            marginBottom: '0.75rem',
                        }}>
                            About Omor Faruck Ullas
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            fontFamily: 'Patrick Hand, cursive',
                            lineHeight: 1.5,
                            margin: '0 auto 1.5rem auto',
                            maxWidth: '720px',
                        }}>
                            Also known as <strong>Omor Faruk Ullas</strong> — Computer Science &amp; Engineering undergraduate at{' '}
                            <strong>United International University (UIU)</strong> in Dhaka, Bangladesh, researching AI/ML, low-resource Bangla NLP, and full-stack software engineering.
                        </p>
                    </div>
                </div>
                <AboutSection />
            </main>
            <Footer />
        </>
    );
}

