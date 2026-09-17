'use client';

import { useState } from 'react';
import { TealBadge } from './WisprPrimitives';

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
      setMessage('Your note was submitted successfully and is awaiting moderation.');
      setName('');
      setEmail('');
      setContent('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="card-cream mt-8"
      style={{ fontFamily: 'var(--font-figtree)' }}
    >
      <div className="mb-6 flex flex-col gap-2">
        <TealBadge>Discourse &amp; Perspectives</TealBadge>
        <h3
          className="text-2xl sm:text-3xl text-[#1a1a1a]"
          style={{ fontFamily: 'var(--font-eb-garamond)' }}
        >
          Join the conversation
        </h3>
        <p className="text-sm text-[#8a8a80]">
          Contributions, inquiries, and technical feedback are welcomed.
        </p>
      </div>

      {status === 'success' && (
        <div className="bg-[#034f46] text-[#ffffeb] rounded-xl p-4 text-sm font-medium mb-6">
          ✓ {message}
        </div>
      )}

      {status === 'error' && (
        <div className="bg-[#fee2e2] text-[#b91c1c] border border-[#dc2626] rounded-xl p-4 text-sm font-medium mb-6">
          ✕ {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-semibold tracking-wider text-[#8a8a80] mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="input-wispr"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold tracking-wider text-[#8a8a80] mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="input-wispr"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold tracking-wider text-[#8a8a80] mb-2">
            Comment *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your perspective..."
            required
            rows={4}
            className="input-wispr resize-y min-h-[100px]"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit Comment →'}
          </button>
        </div>
      </form>
    </div>
  );
}
