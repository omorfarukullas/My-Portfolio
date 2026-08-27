'use client';

import { useState } from 'react';
import { RADIUS, StickyTag } from './HandDrawn';

export default function CommentForm({ postSlug }: { postSlug: string }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        setStatus('submitting');
        setMessage('');

        try {
            const res = await fetch(`/api/blog/${postSlug}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author_name: name,
                    author_email: email,
                    content,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit comment');
            }

            setStatus('success');
            setMessage('🎉 Thank you! Your thought was received and submitted for author review.');
            setName('');
            setEmail('');
            setContent('');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div style={{
            background: 'var(--bg-elevated)',
            border: '2.5px solid #2d2d2d',
            borderRadius: RADIUS.wobbly,
            padding: '2rem 1.75rem',
            boxShadow: '4px 4px 0px #2d2d2d',
            marginTop: '2rem',
        }}>
            <div style={{ marginBottom: '1.25rem' }}>
                <StickyTag color="yellow" rotate={-1} style={{ marginBottom: '0.4rem' }}>
                    💬 Leave a Note or Question
                </StickyTag>
                <h3 style={{
                    fontFamily: 'Kalam, cursive',
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    color: '#2d2d2d',
                    margin: '0.25rem 0',
                }}>
                    Join the Discussion
                </h3>
                <p style={{
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                }}>
                    Have a question, feedback, or research idea? Drop a note below!
                </p>
            </div>

            {status === 'success' && (
                <div style={{
                    background: '#dcfce7',
                    border: '2px solid #16a34a',
                    borderRadius: RADIUS.wobblySm,
                    padding: '0.75rem 1rem',
                    color: '#15803d',
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                }}>
                    {message}
                </div>
            )}

            {status === 'error' && (
                <div style={{
                    background: '#fee2e2',
                    border: '2px solid #dc2626',
                    borderRadius: RADIUS.wobblySm,
                    padding: '0.75rem 1rem',
                    color: '#b91c1c',
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                }}>
                    ⚠️ {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontFamily: 'Patrick Hand, cursive', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                            Your Name <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ada Lovelace"
                            required
                            style={{
                                width: '100%',
                                padding: '0.6rem 0.85rem',
                                borderRadius: RADIUS.wobblySm,
                                border: '2px solid #2d2d2d',
                                background: '#ffffff',
                                fontFamily: 'Patrick Hand, cursive',
                                fontSize: '1.05rem',
                                outline: 'none',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontFamily: 'Patrick Hand, cursive', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                            Your Email (Optional, kept private)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ada@example.com"
                            style={{
                                width: '100%',
                                padding: '0.6rem 0.85rem',
                                borderRadius: RADIUS.wobblySm,
                                border: '2px solid #2d2d2d',
                                background: '#ffffff',
                                fontFamily: 'Patrick Hand, cursive',
                                fontSize: '1.05rem',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontFamily: 'Patrick Hand, cursive', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                        Your Message <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What do you think about this topic?"
                        required
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: RADIUS.wobblySm,
                            border: '2px solid #2d2d2d',
                            background: '#ffffff',
                            fontFamily: 'Patrick Hand, cursive',
                            fontSize: '1.1rem',
                            lineHeight: 1.5,
                            outline: 'none',
                            resize: 'vertical',
                        }}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-sketch"
                        style={{
                            padding: '0.55rem 1.5rem',
                            fontSize: '1.1rem',
                            cursor: status === 'submitting' ? 'wait' : 'pointer',
                        }}
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Post Comment ✍️'}
                    </button>
                </div>
            </form>
        </div>
    );
}
