'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { DarkChamber, MisregisteredHeading, RisoTape } from './WisprPrimitives';
import { SiLinkedin, SiGithub } from 'react-icons/si';
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

  const directEmail = siteConfig.social.email || 'omor.farukh16@gmail.com';

  return (
    <DarkChamber id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Direct Inquiries & Mailto CTA */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <RisoTape rotate={-1}>
            INQUIRY DISPATCH // SECTION 05
          </RisoTape>

          <MisregisteredHeading
            as="h2"
            ghostColor="pink"
            offset={3}
            className="text-3xl sm:text-5xl lg:text-6xl font-archivo uppercase tracking-tight text-[#f2eee3] leading-[0.95]"
          >
            Initiate a Dialogue.
          </MisregisteredHeading>

          <p className="font-space text-sm sm:text-base text-[#f2eee3]/80 leading-relaxed max-w-xl">
            Open to discussions around low-resource NLP research, dataset collaborations, software engineering roles, or consulting inquiries.
          </p>

          {/* Prominent Direct Email Plate */}
          <div className="bg-white border-2 border-[hsl(230,30%,14%)] riso-shadow-pink p-5 text-[hsl(230,30%,14%)] flex flex-col gap-3">
            <span className="font-space text-[10px] font-bold uppercase tracking-widest text-[hsl(230,12%,38%)]">
              // PREFERRED DIRECT CHANNEL
            </span>
            <a
              href={`mailto:${directEmail}`}
              className="btn-riso-pink text-xs sm:text-sm w-full sm:w-fit"
            >
              <MdEmail size={18} />
              <span>{directEmail}</span>
            </a>
          </div>

          {/* Social Profiles in Space Mono */}
          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-space text-xs sm:text-sm text-[#f2eee3] hover:text-[hsl(52,100%,55%)] transition-colors w-fit"
            >
              <span className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center">
                <SiLinkedin size={15} />
              </span>
              <span>linkedin.com/in/omorullas</span>
            </a>

            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-space text-xs sm:text-sm text-[#f2eee3] hover:text-[hsl(52,100%,55%)] transition-colors w-fit"
            >
              <span className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center">
                <SiGithub size={15} />
              </span>
              <span>github.com/omorfarukullas</span>
            </a>
          </div>

          <div className="pt-4 border-t-2 border-white/10">
            <span className="font-space text-[10px] uppercase font-bold tracking-widest text-[hsl(52,100%,55%)] block mb-1">
              TIMEZONE &amp; TURNAROUND
            </span>
            <p className="font-space text-xs text-[#f2eee3]/70">
              Dhaka, Bangladesh (GMT+6) • Typically responds within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Column: Tactile Form Plate */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-white border-3 border-[hsl(230,30%,14%)] riso-shadow-pink p-6 sm:p-8 text-[hsl(230,30%,14%)]">
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 bg-[hsl(52,100%,55%)] border-2 border-[hsl(230,30%,14%)] flex items-center justify-center text-[hsl(230,30%,14%)] font-bold text-xl riso-shadow-ink-sm">
                  ✓
                </div>
                <h3 className="text-2xl font-archivo uppercase text-[hsl(230,30%,14%)]">
                  Message Dispatched
                </h3>
                <p className="font-space text-xs sm:text-sm text-[hsl(230,30%,20%)] max-w-xs leading-relaxed">
                  Thank you for reaching out. Your transmission has been queued and I will reply promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-riso-outline text-xs mt-2"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[hsl(230,30%,14%)]">
                  <span className="font-space text-xs uppercase font-bold text-[hsl(230,30%,14%)]">
                    DISPATCH FORM // TRANSMIT
                  </span>
                  <span className="w-2 h-2 bg-[hsl(330,100%,60%)] border border-[hsl(230,30%,14%)]" />
                </div>

                <div>
                  <label htmlFor="contact-name" className="block font-space text-[10px] uppercase font-bold tracking-wider text-[hsl(230,12%,38%)] mb-1.5">
                    NAME / AFFILIATION
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full font-space text-xs sm:text-sm p-3 bg-[hsl(44,45%,92%)] border-2 border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-space text-[10px] uppercase font-bold tracking-wider text-[hsl(230,12%,38%)] mb-1.5">
                    RETURN EMAIL ADDRESS
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full font-space text-xs sm:text-sm p-3 bg-[hsl(44,45%,92%)] border-2 border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-space text-[10px] uppercase font-bold tracking-wider text-[hsl(230,12%,38%)] mb-1.5">
                    INQUIRY / RESEARCH PROPOSAL
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Outline your inquiry, dataset question, or collaboration..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full font-space text-xs sm:text-sm p-3 bg-[hsl(44,45%,92%)] border-2 border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)] focus:bg-white focus:outline-none resize-y min-h-[110px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-riso-pink w-full justify-center mt-2 cursor-pointer"
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
