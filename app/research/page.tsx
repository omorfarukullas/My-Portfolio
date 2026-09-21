import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import { RADIUS, TapeStrip, StickyTag } from '@/app/components/HandDrawn';

export const metadata = generatePageMetadata({
    title: 'Research — Omor Faruck Ullas | Low-Resource Bangla NLP & AI',
    description: 'Undergraduate AI/ML research by Omor Faruck Ullas at United International University (UIU), Dhaka: Coordinated propaganda detection in low-resource Bangla, transformer architectures, and dataset construction.',
    canonical: `${seoConfig.siteUrl}/research`,
});

const researchProjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchProject',
    name: 'Coordinated Propaganda Detection in Low-Resource Bangla',
    description: 'An ongoing undergraduate research initiative investigating automated detection of coordinated propaganda campaigns across digital online media in the low-resource Bangla language context.',
    url: `${seoConfig.siteUrl}/research`,
    funder: {
        '@type': 'EducationalOrganization',
        name: 'United International University',
        alternateName: 'UIU',
        sameAs: 'https://www.uiu.ac.bd/',
    },
    member: {
        '@type': 'Person',
        name: seoConfig.author.name,
        alternateName: seoConfig.alternateName,
        url: seoConfig.siteUrl,
        jobTitle: 'Undergraduate Researcher',
        affiliation: {
            '@type': 'EducationalOrganization',
            name: 'United International University',
            sameAs: 'https://www.uiu.ac.bd/',
        },
    },
    keywords: [
        'Bangla NLP',
        'Coordinated Propaganda Detection',
        'Low-Resource Languages',
        'Transformer Models',
        'Computational Social Science',
        'Dataset Construction',
    ],
};

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: seoConfig.siteUrl },
    { name: 'Research', url: `${seoConfig.siteUrl}/research` },
]);

export default function ResearchPage() {
    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchProjectSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <main style={{ paddingTop: '80px' }}>
                <div className="container section">

                    {/* Page Header */}
                    <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
                        <StickyTag color="yellow" rotate={-1} style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                            🔬 Research &amp; Academic Exploration
                        </StickyTag>
                        <h1 style={{
                            fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
                            fontWeight: 700,
                            color: '#2d2d2d',
                            fontFamily: 'Kalam, cursive',
                            lineHeight: 1.15,
                            marginBottom: '1rem',
                        }}>
                            Investigating Low-Resource AI &amp; Bangla NLP
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            fontFamily: 'Patrick Hand, cursive',
                            lineHeight: 1.6,
                            margin: 0,
                        }}>
                            Research conducted by <strong>Omor Faruck Ullas</strong> (also known as <strong>Omor Faruk Ullas</strong>) at the Department of Computer Science &amp; Engineering,{' '}
                            <strong>United International University (UIU)</strong>, Dhaka, Bangladesh.
                        </p>
                    </div>

                    {/* Primary Research Project Spotlight */}
                    <div style={{
                        position: 'relative',
                        background: '#ffffff',
                        border: '3px solid #2d2d2d',
                        borderRadius: RADIUS.wobbly,
                        padding: '2.5rem 2rem',
                        boxShadow: '6px 6px 0px #2d2d2d',
                        marginBottom: '3.5rem',
                    }}>
                        <TapeStrip rotate={-1} />

                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <span style={{
                                background: 'var(--bg-postit-orange)',
                                border: '2px solid #2d2d2d',
                                borderRadius: RADIUS.wobblySm,
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                fontFamily: 'Patrick Hand, cursive',
                            }}>
                                🔄 Status: Active Research (In Progress)
                            </span>
                            <span style={{
                                background: 'var(--bg-postit-blue)',
                                border: '2px solid #2d2d2d',
                                borderRadius: RADIUS.wobblySm,
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                fontFamily: 'Patrick Hand, cursive',
                            }}>
                                🏛️ Host: United International University (UIU)
                            </span>
                        </div>

                        <h2 style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                            fontWeight: 700,
                            color: '#2d2d2d',
                            fontFamily: 'Kalam, cursive',
                            lineHeight: 1.2,
                            marginBottom: '1rem',
                        }}>
                            Coordinated Propaganda Detection in Low-Resource Bangla Digital Media
                        </h2>

                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.65,
                            marginBottom: '1.25rem',
                        }}>
                            Digital misinformation and politically motivated coordinated campaigns pose severe democratic challenges in the Global South. While high-resource languages like English benefit from extensive annotated datasets and established detection baselines, low-resource languages such as Bangla lack robust benchmark datasets, standardized annotation schemas, and contextual evaluations.
                        </p>

                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.65,
                            marginBottom: '1.75rem',
                        }}>
                            Together with my collaborative research team at UIU, this work aims to bridge that critical gap by curating an authentic dataset of coordinated Bangla messaging, establishing multi-layered annotation guidelines, and benchmarking specialized transformer representations against adversarial and noisy text.
                        </p>

                        {/* Research Dimensions Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '1.5rem',
                            marginTop: '2rem',
                            paddingTop: '1.75rem',
                            borderTop: '2px dashed #2d2d2d',
                        }}>
                            <div style={{
                                background: 'var(--bg-elevated)',
                                border: '2px solid #2d2d2d',
                                borderRadius: RADIUS.wobblySm,
                                padding: '1.25rem',
                                boxShadow: '2px 2px 0px #2d2d2d',
                            }}>
                                <h3 style={{
                                    fontFamily: 'Kalam, cursive',
                                    fontSize: '1.35rem',
                                    fontWeight: 700,
                                    color: '#2d2d2d',
                                    marginBottom: '0.5rem',
                                }}>
                                    📊 1. Dataset Construction
                                </h3>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                    Systematic gathering and curation of authentic digital communication streams in Bangla, filtering spam and establishing multi-annotator agreement baselines.
                                </p>
                            </div>

                            <div style={{
                                background: 'var(--bg-elevated)',
                                border: '2px solid #2d2d2d',
                                borderRadius: RADIUS.wobblySm,
                                padding: '1.25rem',
                                boxShadow: '2px 2px 0px #2d2d2d',
                            }}>
                                <h3 style={{
                                    fontFamily: 'Kalam, cursive',
                                    fontSize: '1.35rem',
                                    fontWeight: 700,
                                    color: '#2d2d2d',
                                    marginBottom: '0.5rem',
                                }}>
                                    🧠 2. Transformer Architectures
                                </h3>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                    Evaluating pretrained language models (BanglaBERT, multilingual BERT, RoBERTa) fine-tuned for sequence classification under domain shifts and noisy input.
                                </p>
                            </div>

                            <div style={{
                                background: 'var(--bg-elevated)',
                                border: '2px solid #2d2d2d',
                                borderRadius: RADIUS.wobblySm,
                                padding: '1.25rem',
                                boxShadow: '2px 2px 0px #2d2d2d',
                            }}>
                                <h3 style={{
                                    fontFamily: 'Kalam, cursive',
                                    fontSize: '1.35rem',
                                    fontWeight: 700,
                                    color: '#2d2d2d',
                                    marginBottom: '0.5rem',
                                }}>
                                    🕸️ 3. Coordination Analysis
                                </h3>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                    Analyzing temporal synchronicity and cross-account semantic repetition to identify coordinated behavior beyond isolated linguistic features.
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem' }}>
                            {[
                                'Bangla NLP',
                                'Coordinated Disinformation',
                                'Low-Resource AI',
                                'Dataset Engineering',
                                'Transformers',
                                'United International University',
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        fontFamily: 'Patrick Hand, cursive',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        background: '#ffffff',
                                        border: '1.5px solid #2d2d2d',
                                        borderRadius: RADIUS.wobblySm,
                                        padding: '0.2rem 0.65rem',
                                    }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Broader Research Interests */}
                    <div style={{ marginBottom: '3.5rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                            fontWeight: 700,
                            fontFamily: 'Kalam, cursive',
                            color: '#2d2d2d',
                            marginBottom: '1.5rem',
                        }}>
                            💡 Broader Research Interests
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1.5rem',
                        }}>
                            <div style={{
                                background: '#ffffff',
                                border: '2.5px solid #2d2d2d',
                                borderRadius: RADIUS.wobbly,
                                padding: '1.75rem',
                                boxShadow: '4px 4px 0px #2d2d2d',
                            }}>
                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🇧🇩</span>
                                <h3 style={{ fontFamily: 'Kalam, cursive', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                    Low-Resource Language Processing
                                </h3>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                    Developing effective parameter-efficient fine-tuning, cross-lingual transfer, and synthetic augmentation methods specifically suited for low-resource Indic and South Asian scripts.
                                </p>
                            </div>

                            <div style={{
                                background: '#ffffff',
                                border: '2.5px solid #2d2d2d',
                                borderRadius: RADIUS.wobbly,
                                padding: '1.75rem',
                                boxShadow: '4px 4px 0px #2d2d2d',
                            }}>
                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🛡️</span>
                                <h3 style={{ fontFamily: 'Kalam, cursive', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                    Content Integrity &amp; Computational Propaganda
                                </h3>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                    Studying algorithmic methods to detect astroturfing, synthetic narrative amplification, and coordinated inauthentic behavior across social and digital platforms.
                                </p>
                            </div>

                            <div style={{
                                background: '#ffffff',
                                border: '2.5px solid #2d2d2d',
                                borderRadius: RADIUS.wobbly,
                                padding: '1.75rem',
                                boxShadow: '4px 4px 0px #2d2d2d',
                            }}>
                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>⚡</span>
                                <h3 style={{ fontFamily: 'Kalam, cursive', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                    Applied ML &amp; Edge Systems
                                </h3>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                    Deploying machine learning models in resource-constrained environments — from full-stack web applications to embedded microcontrollers and IoT sensors.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Collaboration CTA */}
                    <div style={{
                        background: 'var(--bg-postit)',
                        border: '3px solid #2d2d2d',
                        borderRadius: RADIUS.wobbly,
                        padding: '2.5rem 2rem',
                        boxShadow: '5px 5px 0px #2d2d2d',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '1rem',
                    }}>
                        <h2 style={{
                            fontFamily: 'Kalam, cursive',
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#2d2d2d',
                            margin: 0,
                        }}>
                            Interested in Academic Collaboration or Discussion?
                        </h2>
                        <p style={{
                            fontFamily: 'Patrick Hand, cursive',
                            fontSize: '1.25rem',
                            color: '#333333',
                            maxWidth: '640px',
                            margin: 0,
                            lineHeight: 1.5,
                        }}>
                            I am always eager to connect with researchers, lab mentors, and fellow students working on NLP, computational social science, and low-resource AI.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
                            <Link
                                href="/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'var(--accent)',
                                    color: '#ffffff',
                                    border: '2.5px solid #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    boxShadow: '3px 3px 0px #2d2d2d',
                                    fontWeight: 700,
                                    fontSize: '1.15rem',
                                    fontFamily: 'Patrick Hand, cursive',
                                    textDecoration: 'none',
                                }}
                            >
                                ✉️ Get in Touch
                            </Link>
                            <Link
                                href="/blog"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    background: '#ffffff',
                                    color: '#2d2d2d',
                                    border: '2.5px solid #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    boxShadow: '3px 3px 0px #2d2d2d',
                                    fontWeight: 700,
                                    fontSize: '1.15rem',
                                    fontFamily: 'Patrick Hand, cursive',
                                    textDecoration: 'none',
                                }}
                            >
                                📝 Read Research Notes &amp; Blog
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
