'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import { siteConfig } from '@/config/site';
import { RADIUS, TapeStrip, HandDrawnArrow, HandDrawnSparkle, StickyTag } from './HandDrawn';

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

/* Hand-Drawn Sketch Developer Illustration */
function HandDrawnDeveloperCard() {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                margin: '0 auto',
            }}
        >
            {/* Main Notebook Card */}
            <div
                style={{
                    position: 'relative',
                    background: '#ffffff',
                    border: '3px solid #2d2d2d',
                    borderRadius: RADIUS.wobblyMd,
                    padding: '2rem 1.75rem',
                    boxShadow: '8px 8px 0px 0px #2d2d2d',
                    transform: 'rotate(1.5deg)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotate(-0.5deg) scale(1.02)';
                    e.currentTarget.style.boxShadow = '12px 12px 0px 0px #2d2d2d';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotate(1.5deg)';
                    e.currentTarget.style.boxShadow = '8px 8px 0px 0px #2d2d2d';
                }}
            >
                <TapeStrip rotate={-2} />

                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #2d2d2d', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff4d4d', border: '1.5px solid #2d2d2d' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffb703', border: '1.5px solid #2d2d2d' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#55a630', border: '1.5px solid #2d2d2d' }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#2d2d2d', fontWeight: 600 }}>
                        sketchbook.dev
                    </span>
                </div>

                {/* Hand-drawn SVG Avatar / Scene */}
                <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative' }}>
                    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
                        {/* Desk surface */}
                        <path d="M20 170 C 90 168, 190 168, 260 170" stroke="#2d2d2d" strokeWidth="3.5" strokeLinecap="round" />
                        <path d="M35 174 L 25 195 M 245 174 L 255 195" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />

                        {/* Laptop */}
                        <rect x="75" y="100" width="130" height="70" rx="6" fill="#fff9c4" stroke="#2d2d2d" strokeWidth="3" />
                        <path d="M60 170 L 220 170 L 210 162 L 70 162 Z" fill="#e5e0d8" stroke="#2d2d2d" strokeWidth="3" />
                        {/* Code on screen */}
                        <path d="M90 120 L 140 120 M 90 132 L 175 132 M 90 144 L 130 144 M 90 156 L 160 156" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 1" />
                        {/* Apple/OFU Logo on laptop back or screen */}
                        <text x="180" y="122" fontFamily="Kalam, cursive" fontSize="12" fill="#ff4d4d" fontWeight="bold">&lt;OFU/&gt;</text>

                        {/* Coffee Mug with Steam */}
                        <rect x="225" y="140" width="22" height="28" rx="4" fill="#ffffff" stroke="#2d2d2d" strokeWidth="2.5" />
                        <path d="M247 146 C 255 146, 255 162, 247 162" stroke="#2d2d2d" strokeWidth="2.5" />
                        <path d="M232 135 C 230 128, 235 125, 233 118" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" />
                        <path d="M239 136 C 237 130, 242 126, 240 120" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" />

                        {/* Plant in pot */}
                        <path d="M35 152 L 40 170 L 54 170 L 59 152 Z" fill="#ffe0b2" stroke="#2d2d2d" strokeWidth="2.5" />
                        <path d="M47 152 C 40 135, 30 140, 36 130 C 44 140, 48 145, 47 152 Z" fill="#dcfce7" stroke="#2d2d2d" strokeWidth="2" />
                        <path d="M47 152 C 54 135, 64 140, 58 130 C 50 140, 46 145, 47 152 Z" fill="#dcfce7" stroke="#2d2d2d" strokeWidth="2" />

                        {/* Floating Speech / Idea Bubble */}
                        <path d="M185 45 C 185 30, 250 25, 255 45 C 260 65, 205 75, 195 62 L 180 72 L 188 56 Z" fill="#fff9c4" stroke="#2d2d2d" strokeWidth="2.5" />
                        <text x="202" y="48" fontFamily="Patrick Hand, cursive" fontSize="13" fill="#2d2d2d" fontWeight="bold">AI + NLP!</text>
                    </svg>
                </div>

                {/* Interactive Status Note */}
                <div
                    style={{
                        background: 'var(--bg-postit)',
                        border: '2px solid #2d2d2d',
                        borderRadius: RADIUS.wobblySm,
                        padding: '0.75rem 1rem',
                        boxShadow: '3px 3px 0px #2d2d2d',
                        fontFamily: 'Patrick Hand, cursive',
                        transform: 'rotate(-1deg)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>🔬</span>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#2d2d2d' }}>Currently Exploring:</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: '#4a4a4a', margin: 0, lineHeight: 1.4 }}>
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
                ✨ 100% Handcrafted
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
                paddingTop: '90px',
                paddingBottom: '3rem',
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
                        gap: '2.5rem',
                        alignItems: 'center',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                    }}
                >
                    {/* Left Column: Hand-drawn Bio & CTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                        {/* Top Post-It Greeting */}
                        <div style={{ marginBottom: '0.85rem' }}>
                            <StickyTag color="yellow" rotate={-2} style={{ fontSize: '1.1rem', padding: '0.3rem 0.95rem' }}>
                                👋 Hello World, I&apos;m
                            </StickyTag>
                        </div>

                        {/* Bold Handwritten Name */}
                        <h1
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                                fontWeight: 700,
                                lineHeight: 1.1,
                                marginBottom: '0.5rem',
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
                                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                                color: '#2d2d2d',
                                fontFamily: 'Patrick Hand, cursive',
                                marginBottom: '1.25rem',
                                minHeight: '2.2em',
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
                                padding: '1rem 1.25rem',
                                boxShadow: '4px 4px 0px #2d2d2d',
                                transform: 'rotate(-0.5deg)',
                                marginBottom: '2rem',
                                maxWidth: '520px',
                                width: '100%',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', borderBottom: '1px dashed #2d2d2d', paddingBottom: '0.35rem' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: 'var(--secondary-accent)', fontWeight: 700 }}>
                                    omor@ullas:~$ whoami
                                </span>
                            </div>
                            <p style={{ fontSize: '1.1rem', color: '#2d2d2d', margin: 0, lineHeight: 1.5 }}>
                                🎓 CSE undergraduate @ <strong>United International University</strong> (UIU), Bangladesh.<br />
                                🎯 <strong>Mission:</strong> Turn messy real-world data into systems that actually work.
                            </p>
                        </div>

                        {/* CTA Buttons Row with Hand-Drawn Arrow */}
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', position: 'relative' }}>
                            <Link href="/projects" className="btn-sketch">
                                📂 Explore Projects
                            </Link>
                            <Link href="/contact" className="btn-sketch-secondary">
                                ✍️ Let&apos;s Connect
                            </Link>
                            <a
                                href="/resume.pdf"
                                download
                                style={{
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    color: 'var(--secondary-accent)',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                    marginLeft: '0.25rem',
                                }}
                            >
                                📄 Download Resume
                            </a>

                            {/* Decorative Arrow */}
                            <div className="hidden md:block" style={{ position: 'absolute', right: '-65px', top: '-25px' }}>
                                <HandDrawnArrow direction="curved" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hand-Drawn Illustration Card */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <HandDrawnDeveloperCard />
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 960px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        padding-left: 0.5rem !important;
                        padding-right: 0.5rem !important;
                        text-align: center;
                    }
                    .hero-grid > div:first-child {
                        order: 2;
                        align-items: center !important;
                    }
                    .hero-grid > div:last-child {
                        order: 1;
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
