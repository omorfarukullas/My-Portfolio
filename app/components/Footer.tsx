'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { RADIUS } from './HandDrawn';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            position: 'relative',
            marginTop: '6rem',
            borderTop: '3px solid #2d2d2d',
            background: '#f4efe6',
            backgroundImage: 'radial-gradient(#d5cfc4 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
            padding: '4rem 0 2.5rem 0',
            overflow: 'hidden',
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2.5rem',
                justifyContent: 'space-between',
            }}>
                {/* Brand & Hand-drawn Bio */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', width: 'fit-content' }}>
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
                        }}>
                            <span style={{
                                fontFamily: 'Kalam, cursive',
                                fontWeight: 700,
                                fontSize: '1.4rem',
                                color: '#2d2d2d',
                            }}>
                                &lt;/
                                <span style={{ color: 'var(--accent)' }}>OFU</span>
                                &gt;
                            </span>
                        </div>
                    </Link>
                    <p style={{
                        fontSize: '1.05rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        maxWidth: '320px',
                    }}>
                        Turning messy real-world data into systems that actually work. Researching low-resource NLP and building full-stack software.
                    </p>
                </div>

                {/* Navigation Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#2d2d2d',
                        textDecoration: 'underline wavy var(--accent)',
                        textUnderlineOffset: '4px',
                    }}>
                        Quick Links
                    </span>
                    <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {siteConfig.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    fontSize: '1.15rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.15s, transform 0.15s',
                                    width: 'fit-content',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--accent)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                    e.currentTarget.style.transform = 'none';
                                }}
                            >
                                <span>✏️</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Social Connect Icons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <span style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#2d2d2d',
                        textDecoration: 'underline wavy var(--secondary-accent)',
                        textUnderlineOffset: '4px',
                    }}>
                        Connect & Say Hi
                    </span>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {[
                            { icon: <SiGithub size={18} />, href: siteConfig.social.github, label: 'GitHub' },
                            { icon: <SiLinkedin size={18} />, href: siteConfig.social.linkedin, label: 'LinkedIn' },
                            { icon: <SiX size={18} />, href: siteConfig.social.twitter, label: 'Twitter/X' },
                            { icon: <SiFacebook size={18} />, href: siteConfig.social.facebook, label: 'Facebook' },
                            { icon: <SiInstagram size={18} />, href: siteConfig.social.instagram, label: 'Instagram' },
                            { icon: <MdEmail size={20} />, href: `mailto:${siteConfig.social.email}`, label: 'Email' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: RADIUS.wobblySm,
                                    background: '#ffffff',
                                    color: '#2d2d2d',
                                    border: '2px solid #2d2d2d',
                                    boxShadow: '3px 3px 0px #2d2d2d',
                                    transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.background = 'var(--accent)';
                                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                                    e.currentTarget.style.boxShadow = '1px 1px 0px #2d2d2d';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#2d2d2d';
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = '3px 3px 0px #2d2d2d';
                                }}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Copyright & Status */}
            <div className="container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '2px dashed #2d2d2d',
            }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
                    © {year} Omor Faruk Ullas · Sketched with code & coffee ☕
                </p>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'var(--bg-postit-green)',
                    border: '2px solid #2d2d2d',
                    borderRadius: RADIUS.wobblySm,
                    padding: '0.2rem 0.75rem',
                    boxShadow: '2px 2px 0px #2d2d2d',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    transform: 'rotate(1deg)',
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: '#16a34a',
                        border: '1px solid #2d2d2d',
                    }}></span>
                    Available for research & collaborations
                </div>
            </div>
        </footer>
    );
}
