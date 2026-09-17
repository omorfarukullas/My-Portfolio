'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { DarkChamber, TealBadge, PlatformBadge } from './WisprPrimitives';
import { SiLinkedin, SiGithub, SiX, SiKaggle } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulated transmission delay
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <DarkChamber id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Editorial Contact Information */}
        <div className="lg:col-span-6 flex flex-col gap-6" style={{ fontFamily: 'var(--font-figtree)' }}>
          <TealBadge>Direct Channels</TealBadge>

          <h2
            className="text-[#ffffeb]"
            style={{
              fontFamily: 'var(--font-eb-garamond)',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              lineHeight: 0.95,
              letterSpacing: '-1.92px',
              fontWeight: 400,
            }}
          >
            Initiate a dialogue.
          </h2>

          <p className="text-[#8a8a80] text-lg sm:text-xl leading-relaxed max-w-xl">
            Open to discussions around low-resource NLP research, dataset collaborations, software engineering roles, or consulting inquiries.
          </p>

          {/* Contact Direct Channels */}
          <div className="flex flex-col gap-3 pt-4">
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="flex items-center gap-3 text-base text-[#ffffeb] hover:text-[#f0d7ff] transition-colors w-fit"
            >
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">
                <MdEmail size={18} />
              </span>
              <span>{siteConfig.social.email}</span>
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-base text-[#ffffeb] hover:text-[#f0d7ff] transition-colors w-fit"
            >
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">
                <SiLinkedin size={16} />
              </span>
              <span>linkedin.com/in/omorullas</span>
            </a>

            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-base text-[#ffffeb] hover:text-[#f0d7ff] transition-colors w-fit"
            >
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">
                <SiGithub size={16} />
              </span>
              <span>github.com/omorfarukullas</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10">
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8a8a80] block mb-2">
              Timezone &amp; Response Time
            </span>
            <p className="text-sm text-[#ffffeb]/80">
              Dhaka (GMT+6) • Typically responds within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Column: Dark Velvet Form Card */}
        <div className="lg:col-span-6 w-full">
          <div
            className="bg-[#222222] border border-white/10 rounded-[32px] p-8 sm:p-10"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center gap-4"
              >
                <span className="w-12 h-12 rounded-full bg-[#034f46] flex items-center justify-center text-[#ffffeb] text-xl">
                  ✓
                </span>
                <h3
                  className="text-2xl sm:text-3xl text-[#ffffeb]"
                  style={{ fontFamily: 'var(--font-eb-garamond)' }}
                >
                  Message Dispatched
                </h3>
                <p className="text-sm text-[#8a8a80] max-w-xs leading-relaxed">
                  Thank you for reaching out. I have received your note and will reply promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-secondary-dark text-sm mt-4"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase font-semibold tracking-wider text-[#8a8a80] mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="input-wispr-dark"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase font-semibold tracking-wider text-[#8a8a80] mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="input-wispr-dark"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase font-semibold tracking-wider text-[#8a8a80] mb-2">
                    Inquiry / Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Brief outline of your project or research question..."
                    value={form.message}
                    onChange={handleChange}
                    className="input-wispr-dark resize-y min-h-[120px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full mt-2"
                >
                  {status === 'sending' ? 'Transmitting…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </DarkChamber>
  );
}
