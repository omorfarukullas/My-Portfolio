'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { RADIUS, TapeStrip, StickyTag } from './HandDrawn';

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulated sending
        setTimeout(() => {
            setStatus('sent');
            setForm({ name: '', email: '', message: '' });
        }, 1000);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.75rem 1rem',
        background: '#ffffff',
        border: '2.5px solid #2d2d2d',
        borderRadius: RADIUS.wobblySm,
        color: '#2d2d2d',
        fontSize: '1.15rem',
        fontFamily: 'Patrick Hand, cursive',
        outline: 'none',
        boxShadow: '3px 3px 0px #2d2d2d',
        transition: 'all 0.15s ease',
    };

    return (
        <section id="contact" className="section" style={{ borderTop: '3px solid #2d2d2d', padding: '5rem 0' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    alignItems: 'start',
                }}>
                    {/* Left Column: Hand-Drawn Post-It Info */}
                    <div
                        style={{
                            position: 'relative',
                            background: '#ffffff',
                            border: '3px solid #2d2d2d',
                            borderRadius: RADIUS.wobbly,
                            padding: '2.5rem 2rem',
                            boxShadow: '6px 6px 0px 0px #2d2d2d',
                            transform: 'rotate(-1deg)',
                        }}
                    >
                        <TapeStrip rotate={-2} />

                        <StickyTag color="yellow" rotate={-1} style={{ marginBottom: '0.75rem' }}>
                            📬 Get In Touch
                        </StickyTag>

                        <h2 style={{
                            fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
                            fontWeight: 700,
                            fontFamily: 'Kalam, cursive',
                            color: '#2d2d2d',
                            marginBottom: '0.75rem',
                            lineHeight: 1.15,
                        }}>
                            Let&apos;s Build Together
                        </h2>

                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.2rem',
                            lineHeight: 1.6,
                            marginBottom: '1.75rem',
                            fontFamily: 'Patrick Hand, cursive',
                        }}>
                            Whether you want to discuss low-resource NLP research, collaborate on a project, or just talk tech over a virtual coffee — drop me a note!
                        </p>

                        {/* Social Links List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {[
                                {
                                    label: 'Email: omorfarukullas@gmail.com',
                                    href: `mailto:${siteConfig.social.email}`,
                                    icon: '✉️',
                                },
                                {
                                    label: 'GitHub: @omorfarukullas',
                                    href: siteConfig.social.github,
                                    icon: '💻',
                                },
                                {
                                    label: 'LinkedIn: /in/omorfarukullas',
                                    href: siteConfig.social.linkedin,
                                    icon: '💼',
                                },
                            ].map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.65rem',
                                        padding: '0.5rem 0.85rem',
                                        background: 'var(--bg-elevated)',
                                        border: '1.5px solid #2d2d2d',
                                        borderRadius: RADIUS.wobblySm,
                                        boxShadow: '2px 2px 0px #2d2d2d',
                                        color: '#2d2d2d',
                                        textDecoration: 'none',
                                        fontSize: '1.1rem',
                                        fontFamily: 'Patrick Hand, cursive',
                                        fontWeight: 600,
                                        transition: 'transform 0.15s ease, background 0.15s ease, color 0.15s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px) rotate(0.5deg)';
                                        e.currentTarget.style.background = 'var(--bg-postit)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.background = 'var(--bg-elevated)';
                                    }}
                                >
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Hand-Drawn Contact Form */}
                    <div
                        style={{
                            position: 'relative',
                            background: 'var(--bg-postit)',
                            border: '3px solid #2d2d2d',
                            borderRadius: RADIUS.wobblyMd,
                            padding: '2.5rem 2rem',
                            boxShadow: '6px 6px 0px 0px #2d2d2d',
                            transform: 'rotate(1deg)',
                        }}
                    >
                        <TapeStrip rotate={1.5} />

                        {status === 'sent' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: 'center',
                                    padding: '2rem 1rem',
                                    background: '#ffffff',
                                    border: '2px solid #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    boxShadow: '3px 3px 0px #2d2d2d',
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
                                <h3 style={{
                                    fontFamily: 'Kalam, cursive',
                                    fontSize: '1.65rem',
                                    fontWeight: 700,
                                    marginBottom: '0.5rem',
                                    color: '#2d2d2d',
                                }}>
                                    Note Received!
                                </h3>
                                <p style={{
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontSize: '1.15rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.5,
                                    marginBottom: '1.25rem',
                                }}>
                                    Thank you for reaching out! I&apos;ll check my notebook and get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="btn-sketch"
                                    style={{ fontSize: '1rem', padding: '0.4rem 1.25rem' }}
                                >
                                    Send another note ✍️
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        style={{
                                            display: 'block',
                                            fontSize: '1.15rem',
                                            fontWeight: 700,
                                            fontFamily: 'Patrick Hand, cursive',
                                            color: '#2d2d2d',
                                            marginBottom: '0.35rem',
                                        }}
                                    >
                                        Your Name:
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="e.g. Alex"
                                        value={form.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--secondary-accent)';
                                            e.target.style.boxShadow = '3px 3px 0px var(--secondary-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#2d2d2d';
                                            e.target.style.boxShadow = '3px 3px 0px #2d2d2d';
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        style={{
                                            display: 'block',
                                            fontSize: '1.15rem',
                                            fontWeight: 700,
                                            fontFamily: 'Patrick Hand, cursive',
                                            color: '#2d2d2d',
                                            marginBottom: '0.35rem',
                                        }}
                                    >
                                        Your Email:
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--secondary-accent)';
                                            e.target.style.boxShadow = '3px 3px 0px var(--secondary-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#2d2d2d';
                                            e.target.style.boxShadow = '3px 3px 0px #2d2d2d';
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        style={{
                                            display: 'block',
                                            fontSize: '1.15rem',
                                            fontWeight: 700,
                                            fontFamily: 'Patrick Hand, cursive',
                                            color: '#2d2d2d',
                                            marginBottom: '0.35rem',
                                        }}
                                    >
                                        Message or Idea:
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Write your thoughts here..."
                                        value={form.message}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--secondary-accent)';
                                            e.target.style.boxShadow = '3px 3px 0px var(--secondary-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#2d2d2d';
                                            e.target.style.boxShadow = '3px 3px 0px #2d2d2d';
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="btn-primary"
                                    style={{
                                        marginTop: '0.5rem',
                                        justifyContent: 'center',
                                        width: '100%',
                                        opacity: status === 'sending' ? 0.7 : 1,
                                    }}
                                >
                                    {status === 'sending' ? 'Posting note… ✍️' : 'Send Message 🚀'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
