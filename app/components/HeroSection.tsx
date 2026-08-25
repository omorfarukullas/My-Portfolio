'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiGithub, SiKaggle } from 'react-icons/si';
import { siteConfig } from '@/config/site';
import { RADIUS, TapeStrip, HandDrawnArrow, StickyTag } from './HandDrawn';

/* Animated Typing Text */
function TypingText({ words }: { words: string[] }) {
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIdx];
        const delay = deleting ? 50 : charIdx === current.length ? 1500 : 70;
        const timer = setTimeout(() => {
            if (!deleting && charIdx < current.length) setCharIdx((c) => c + 1);
            else if (!deleting && charIdx === current.length) setDeleting(true);
            else if (deleting && charIdx > 0) setCharIdx((c) => c - 1);
            else { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); }
        }, delay);
        return () => clearTimeout(timer);
    }, [charIdx, deleting, wordIdx, words]);

    return (
        <span style={{ color: 'var(--secondary-accent)', fontWeight: 700 }}>
            {words[wordIdx].slice(0, charIdx)}
            <span
                style={{
                    borderRight: '3px solid var(--accent)',
                    marginLeft: '2px',
                    display: 'inline-block',
                    animation: 'cursor-blink 0.75s step-end infinite',
                    height: '1.1em',
                    verticalAlign: 'text-bottom',
                }}
            />
        </span>
    );
}

/* Hand-Drawn Polaroid Photo Card with Real Picture */
function HandDrawnPhotoCard() {
    return (
        <div
            className="polaroid-wrapper"
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                margin: '0 auto',
            }}
        >
            {/* Main Polaroid Frame */}
            <div
                style={{
                    position: 'relative',
                    background: '#ffffff',
                    border: '3px solid #2d2d2d',
                    borderRadius: RADIUS.wobblyMd,
                    padding: '1.15rem 1.15rem 1.35rem 1.15rem',
                    boxShadow: '6px 6px 0px 0px #2d2d2d',
                    transform: 'rotate(1.5deg)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotate(-0.5deg) scale(1.02)';
                    e.currentTarget.style.boxShadow = '10px 10px 0px 0px #2d2d2d';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotate(1.5deg)';
                    e.currentTarget.style.boxShadow = '6px 6px 0px 0px #2d2d2d';
                }}
            >
                <TapeStrip rotate={-2} />

                {/* Card Header Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #2d2d2d', paddingBottom: '0.45rem', marginBottom: '0.85rem', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff4d4d', border: '1.5px solid #2d2d2d' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffb703', border: '1.5px solid #2d2d2d' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#55a630', border: '1.5px solid #2d2d2d' }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#2d2d2d', fontWeight: 600 }}>
                        polaroid_01.png
                    </span>
                </div>

                {/* Photo Container */}
                <div
                    className="polaroid-photo-frame"
                    style={{
                        position: 'relative',
                        width: '100%',
                        borderRadius: RADIUS.wobblySm,
                        border: '2.5px solid #2d2d2d',
                        overflow: 'hidden',
                        background: '#f4efe6',
                        marginBottom: '0.85rem',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
                    }}
                >
                    <Image
                        src="/Omor.png"
                        alt="Omor Faruk Ullas"
                        fill
                        priority
                        sizes="(max-width: 768px) 280px, 360px"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center top',
                        }}
                    />
                </div>

                {/* Handwritten Photo Caption */}
                <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
                    <p style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: '#2d2d2d',
                        margin: '0 0 0.1rem 0',
                        lineHeight: 1.1,
                    }}>
                        Omor Faruk Ullas ✍️
                    </p>
                    <p style={{
                        fontFamily: 'Patrick Hand, cursive',
                        fontSize: '1rem',
                        color: 'var(--text-muted)',
                        margin: 0,
                    }}>
                        📍 Dhaka, Bangladesh · 🎓 UIU CSE
                    </p>
                </div>

                {/* Status Note on Polaroid Bottom */}
                <div
                    style={{
                        background: 'var(--bg-postit)',
                        border: '2px solid #2d2d2d',
                        borderRadius: RADIUS.wobblySm,
                        padding: '0.55rem 0.75rem',
                        boxShadow: '2px 2px 0px #2d2d2d',
                        fontFamily: 'Patrick Hand, cursive',
                        transform: 'rotate(-1deg)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.15rem' }}>
                        <span style={{ fontSize: '0.95rem' }}>🔬</span>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2d2d2d' }}>Currently Exploring:</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#4a4a4a', margin: 0, lineHeight: 1.35 }}>
                        Coordinated propaganda detection in low-resource Bangla NLP.
                    </p>
                </div>
            </div>

            {/* Bouncing Hand-Drawn Badge */}
            <div
                className="animate-bounce-gentle hidden md:block"
                style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-25px',
                    background: 'var(--bg-postit-green)',
                    border: '2px solid #2d2d2d',
                    borderRadius: RADIUS.wobblySm,
                    padding: '0.4rem 0.85rem',
                    boxShadow: '3px 3px 0px #2d2d2d',
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '1rem',
                    fontWeight: 700,
                    transform: 'rotate(8deg)',
                    zIndex: 10,
                }}
            >
                🧠 AI / ML &amp; NLP
            </div>

            {/* Floating ESP32 / IoT Badge */}
            <div
                className="hidden md:block"
                style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: '-20px',
                    background: '#ffffff',
                    border: '2px solid #2d2d2d',
                    borderRadius: RADIUS.wobblySm,
                    padding: '0.35rem 0.75rem',
                    boxShadow: '3px 3px 0px #2d2d2d',
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    transform: 'rotate(-6deg)',
                    zIndex: 10,
                }}
            >
                ☀️ HelioSense IoT
            </div>
        </div>
    );
}

/* Social Icon Component */
function SketchSocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: RADIUS.wobblySm,
                background: '#ffffff',
                border: '2px solid #2d2d2d',
                boxShadow: '2px 2px 0px #2d2d2d',
                color: '#2d2d2d',
                transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.transform = 'translate(1px, 1px)';
                e.currentTarget.style.boxShadow = '1px 1px 0px #2d2d2d';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = '#2d2d2d';
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '2px 2px 0px #2d2d2d';
            }}
        >
            {children}
        </a>
    );
}

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <section
            id="home"
            style={{
                minHeight: 'calc(100vh - 72px)',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                paddingTop: '80px',
                paddingBottom: '2.5rem',
                overflowX: 'clip',
            }}
        >
            {/* Left Floating Social Sidebar (Desktop) */}
            <div
                style={{
                    position: 'fixed',
                    left: '1.5rem',
                    bottom: 0,
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.65rem',
                    paddingBottom: '2rem',
                }}
                className="sidebar-hide"
            >
                <SketchSocialIcon href={siteConfig.social.github} label="GitHub">
                    <SiGithub size={18} />
                </SketchSocialIcon>
                <SketchSocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                    <SiLinkedin size={18} />
                </SketchSocialIcon>
                <SketchSocialIcon href={siteConfig.social.kaggle} label="Kaggle">
                    <SiKaggle size={18} />
                </SketchSocialIcon>
                <SketchSocialIcon href={siteConfig.social.twitter ?? 'https://twitter.com'} label="Twitter/X">
                    <SiX size={18} />
                </SketchSocialIcon>
                <SketchSocialIcon href={siteConfig.social.facebook ?? 'https://facebook.com'} label="Facebook">
                    <SiFacebook size={18} />
                </SketchSocialIcon>
                <SketchSocialIcon href={siteConfig.social.instagram ?? 'https://instagram.com'} label="Instagram">
                    <SiInstagram size={18} />
                </SketchSocialIcon>
                <div style={{ width: '2px', height: '60px', background: '#2d2d2d', marginTop: '4px' }} />
            </div>

            {/* Right Email Sidebar (Desktop) */}
            <div
                style={{
                    position: 'fixed',
                    right: '1.5rem',
                    bottom: 0,
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingBottom: '2rem',
                }}
                className="sidebar-hide"
            >
                <a
                    href={`mailto:${siteConfig.social.email}`}
                    style={{
                        writingMode: 'vertical-rl',
                        fontSize: '0.95rem',
                        letterSpacing: '0.08em',
                        color: '#2d2d2d',
                        textDecoration: 'none',
                        fontFamily: 'Patrick Hand, cursive',
                        fontWeight: 600,
                        transition: 'color 0.15s, transform 0.15s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--accent)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2d2d2d';
                        e.currentTarget.style.transform = 'none';
                    }}
                >
                    {siteConfig.social.email}
                </a>
                <div style={{ width: '2px', height: '60px', background: '#2d2d2d' }} />
            </div>

            {/* Main Hero Container */}
            <div className="container" style={{ width: '100%' }}>
                <div
                    className="hero-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1.15fr 0.85fr',
                        gap: '2rem',
                        alignItems: 'center',
                    }}
                >
                    {/* Left Column: Hand-drawn Bio & CTA */}
                    <div className="hero-text-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                        {/* Top Post-It Greeting */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <StickyTag color="yellow" rotate={-2} style={{ fontSize: '1.05rem', padding: '0.25rem 0.85rem' }}>
                                👋 Hello World, I&apos;m
                            </StickyTag>
                        </div>

                        {/* Bold Handwritten Name */}
                        <h1
                            style={{
                                fontSize: 'clamp(2.4rem, 6vw, 4.25rem)',
                                fontWeight: 700,
                                lineHeight: 1.1,
                                marginBottom: '0.45rem',
                                color: '#2d2d2d',
                                fontFamily: 'Kalam, cursive',
                            }}
                        >
                            Omor Faruk{' '}
                            <span style={{
                                color: 'var(--accent)',
                                textDecoration: 'underline wavy var(--accent)',
                                textUnderlineOffset: '6px',
                            }}>
                                Ullas
                            </span>
                        </h1>

                        {/* Dynamic Typing Title */}
                        <p
                            style={{
                                fontSize: 'clamp(1.15rem, 3vw, 1.55rem)',
                                color: '#2d2d2d',
                                fontFamily: 'Patrick Hand, cursive',
                                marginBottom: '1.15rem',
                                minHeight: '2em',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                flexWrap: 'wrap',
                            }}
                        >
                            <span>I build & explore:</span>{' '}
                            {mounted && (
                                <TypingText
                                    words={[
                                        'AI & NLP Systems',
                                        'Low-Resource Bangla NLP',
                                        'Full Stack Web Apps',
                                        'Smart IoT Hardware',
                                        'Real-World Solutions',
                                    ]}
                                />
                            )}
                        </p>

                        {/* Terminal-inspired handwritten whoami note */}
                        <div
                            style={{
                                position: 'relative',
                                background: '#ffffff',
                                border: '2.5px solid #2d2d2d',
                                borderRadius: RADIUS.wobblySm,
                                padding: '0.85rem 1.1rem',
                                boxShadow: '4px 4px 0px #2d2d2d',
                                transform: 'rotate(-0.5deg)',
                                marginBottom: '1.75rem',
                                maxWidth: '520px',
                                width: '100%',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', borderBottom: '1px dashed #2d2d2d', paddingBottom: '0.3rem' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: 'var(--secondary-accent)', fontWeight: 700 }}>
                                    omor@ullas:~$ whoami
                                </span>
                            </div>
                            <p style={{ fontSize: '1.05rem', color: '#2d2d2d', margin: 0, lineHeight: 1.45 }}>
                                🎓 CSE undergraduate @ <strong>United International University</strong> (UIU), Bangladesh.<br />
                                🎯 <strong>Mission:</strong> Turn messy real-world data into systems that actually work.
                            </p>
                        </div>

                        {/* CTA Buttons Row */}
                        <div className="hero-cta-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', position: 'relative', width: '100%' }}>
                            <Link href="/projects" className="btn-sketch" style={{ padding: '0.6rem 1.5rem', fontSize: '1.1rem' }}>
                                📂 Explore Projects
                            </Link>
                            <Link href="/contact" className="btn-sketch-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '1.1rem' }}>
                                ✍️ Let&apos;s Connect
                            </Link>
                            <a
                                href="/resume.pdf"
                                download
                                style={{
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: 'var(--secondary-accent)',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                    marginLeft: '0.25rem',
                                }}
                            >
                                📄 Resume
                            </a>

                            {/* Decorative Arrow */}
                            <div className="hidden md:block" style={{ position: 'absolute', right: '-65px', top: '-25px' }}>
                                <HandDrawnArrow direction="curved" />
                            </div>
                        </div>

                        {/* Mobile Social Links Row (Only visible on small screens) */}
                        <div className="mobile-social-bar" style={{ display: 'none', gap: '0.6rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                            <SketchSocialIcon href={siteConfig.social.github} label="GitHub">
                                <SiGithub size={18} />
                            </SketchSocialIcon>
                            <SketchSocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                                <SiLinkedin size={18} />
                            </SketchSocialIcon>
                            <SketchSocialIcon href={siteConfig.social.kaggle} label="Kaggle">
                                <SiKaggle size={18} />
                            </SketchSocialIcon>
                            <SketchSocialIcon href={siteConfig.social.twitter} label="Twitter/X">
                                <SiX size={18} />
                            </SketchSocialIcon>
                            <SketchSocialIcon href={siteConfig.social.facebook} label="Facebook">
                                <SiFacebook size={18} />
                            </SketchSocialIcon>
                            <SketchSocialIcon href={siteConfig.social.instagram} label="Instagram">
                                <SiInstagram size={18} />
                            </SketchSocialIcon>
                        </div>
                    </div>

                    {/* Right Column: Hand-Drawn Polaroid Photo Card */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <HandDrawnPhotoCard />
                    </div>
                </div>
            </div>

            <style>{`
                .polaroid-photo-frame {
                    height: 310px;
                }
                @media (max-width: 960px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        padding-left: 0.25rem !important;
                        padding-right: 0.25rem !important;
                        gap: 2rem !important;
                    }
                    .hero-grid > div:first-child {
                        order: 2;
                    }
                    .hero-grid > div:last-child {
                        order: 1;
                    }
                    .hero-text-col {
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .hero-cta-row {
                        justify-content: center !important;
                    }
                    .mobile-social-bar {
                        display: flex !important;
                    }
                    .polaroid-wrapper {
                        max-width: 310px !important;
                    }
                    .polaroid-photo-frame {
                        height: 250px !important;
                    }
                }
                @media (min-width: 901px) {
                    .sidebar-hide { display: flex !important; }
                }
                @media (max-width: 900px) {
                    .sidebar-hide { display: none !important; }
                }
            `}</style>
        </section>
    );
}
