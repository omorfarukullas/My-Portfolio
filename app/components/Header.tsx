'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { RADIUS } from './HandDrawn';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [pathname]);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <>
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: scrolled ? 'rgba(253, 251, 247, 0.96)' : 'var(--bg-base)',
                backgroundImage: 'radial-gradient(#d8d1c5 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
                borderBottom: '3px solid #2d2d2d',
                boxShadow: scrolled ? '0 4px 0px 0px #2d2d2d' : '0 2px 0px 0px #2d2d2d',
                transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

                    {/* Hand-Drawn Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px',
                            background: 'var(--bg-postit)',
                            border: '2px solid #2d2d2d',
                            borderRadius: RADIUS.wobblySm,
                            padding: '0.2rem 0.75rem',
                            boxShadow: '2px 2px 0px #2d2d2d',
                            transform: 'rotate(-2deg)',
                            transition: 'transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(1deg) scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg)'}
                        >
                            <span style={{
                                fontFamily: 'Kalam, cursive',
                                fontWeight: 700,
                                fontSize: '1.4rem',
                                color: '#2d2d2d',
                                lineHeight: 1,
                            }}>
                                &lt;/
                                <span style={{ color: 'var(--accent)' }}>OFU</span>
                                &gt;
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {siteConfig.nav.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    style={{
                                        fontFamily: 'Patrick Hand, cursive',
                                        fontSize: '1.25rem',
                                        fontWeight: active ? 700 : 500,
                                        color: active ? 'var(--accent)' : '#2d2d2d',
                                        textDecoration: 'none',
                                        padding: '0.3rem 0.6rem',
                                        position: 'relative',
                                        transition: 'color 0.15s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#2d2d2d';
                                    }}
                                >
                                    {item.label}
                                    {active && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                bottom: '0px',
                                                left: '10%',
                                                right: '10%',
                                                height: '3px',
                                                backgroundColor: 'var(--accent)',
                                                borderRadius: '2px',
                                                transform: 'rotate(-1deg)',
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link
                            href="/contact"
                            className="hidden-mobile btn-sketch"
                            style={{
                                padding: '0.45rem 1.35rem',
                                fontSize: '1.1rem',
                            }}
                        >
                            Let&apos;s Talk! ✍️
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            className="show-mobile"
                            style={{
                                display: 'none',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '42px',
                                height: '42px',
                                background: '#ffffff',
                                border: '2.5px solid #2d2d2d',
                                borderRadius: RADIUS.wobblySm,
                                boxShadow: '2px 2px 0px #2d2d2d',
                                cursor: 'pointer',
                                color: '#2d2d2d',
                                flexShrink: 0,
                            }}
                        >
                            {menuOpen ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                    <path d="M3 12h18M3 6h18M3 18h18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 40,
                                background: 'rgba(45, 45, 45, 0.4)',
                                backdropFilter: 'blur(2px)',
                            }}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: '280px',
                                zIndex: 45,
                                background: '#fdfbf7',
                                backgroundImage: 'radial-gradient(#d8d1c5 1.5px, transparent 1.5px)',
                                backgroundSize: '24px 24px',
                                borderLeft: '3px solid #2d2d2d',
                                boxShadow: '-4px 0px 0px #2d2d2d',
                                padding: '5.5rem 1.5rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                            }}
                        >
                            <div style={{
                                fontFamily: 'Kalam, cursive',
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                borderBottom: '2px dashed #2d2d2d',
                                paddingBottom: '0.5rem',
                                marginBottom: '0.5rem',
                            }}>
                                Notebook Index
                            </div>
                            {siteConfig.nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        padding: '0.6rem 1rem',
                                        borderRadius: RADIUS.wobblySm,
                                        fontFamily: 'Patrick Hand, cursive',
                                        fontSize: '1.3rem',
                                        fontWeight: 600,
                                        color: isActive(item.href) ? 'var(--accent)' : '#2d2d2d',
                                        background: isActive(item.href) ? 'var(--bg-postit)' : '#ffffff',
                                        border: '2px solid #2d2d2d',
                                        boxShadow: '2px 2px 0px #2d2d2d',
                                        textDecoration: 'none',
                                        display: 'block',
                                        transform: isActive(item.href) ? 'rotate(-1deg)' : 'none',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div style={{ marginTop: 'auto' }}>
                                <Link
                                    href="/contact"
                                    onClick={() => setMenuOpen(false)}
                                    className="btn-primary"
                                    style={{ width: '100%', textAlign: 'center' }}
                                >
                                    Let&apos;s Talk! ✍️
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                @media (min-width: 769px) { .hidden-mobile{display:flex!important} .show-mobile{display:none!important} }
                @media (max-width: 768px)  { .hidden-mobile{display:none!important} .show-mobile{display:flex!important} }
            `}</style>
        </>
    );
}
