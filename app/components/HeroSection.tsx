'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { LavenderUnderline, WaveformPill, TealBadge } from './WisprPrimitives';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 bg-[#ffffeb] text-[#1a1a1a]"
      style={{ fontFamily: 'var(--font-figtree)' }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Display Typography */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Editorial Category Pill */}
            <div className="flex items-center gap-3">
              <TealBadge icon={<span className="w-2 h-2 rounded-full bg-[#ffa946] animate-pulse" />}>
                AI / ML &amp; NLP Researcher
              </TealBadge>
              <span className="text-sm font-medium text-[#8a8a80]">
                UIU • Dhaka, Bangladesh
              </span>
            </div>

            {/* Display Headline: Two-tone Fog -> Vast Ink in EB Garamond 400 */}
            <h1
              className="text-[#1a1a1a]"
              style={{
                fontFamily: 'var(--font-eb-garamond)',
                fontSize: 'clamp(46px, 6.5vw, 92px)',
                lineHeight: 0.92,
                letterSpacing: '-2.4px',
                fontWeight: 400,
              }}
            >
              <span className="text-[#8a8a80] block">Engineering clarity</span>
              from messy{' '}
              <LavenderUnderline>real-world data.</LavenderUnderline>
            </h1>

            {/* Subtitle in Figtree 400 */}
            <p
              className="text-lg sm:text-xl text-[#222222] max-w-xl leading-snug"
              style={{ lineHeight: 1.35 }}
            >
              I am <strong>Omor Faruk Ullas</strong> — researching low-resource language processing and building production-grade software architectures that solve tangible problems.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="/OmorFaruckUllas.pdf"
                download="OmorFaruckUllas_Resume.pdf"
                className="btn-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>

              <Link href="/projects" className="btn-secondary">
                View Selected Works →
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-8 pt-6 border-t border-[#e4e4d0] w-full max-w-lg mt-2">
              <div>
                <div
                  className="text-3xl sm:text-4xl text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-eb-garamond)' }}
                >
                  3+
                </div>
                <div className="text-xs sm:text-sm text-[#8a8a80] font-medium">
                  Years of Research
                </div>
              </div>
              <div className="w-[1px] h-8 bg-[#e4e4d0]" />
              <div>
                <div
                  className="text-3xl sm:text-4xl text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-eb-garamond)' }}
                >
                  10+
                </div>
                <div className="text-xs sm:text-sm text-[#8a8a80] font-medium">
                  Systems Shipped
                </div>
              </div>
              <div className="w-[1px] h-8 bg-[#e4e4d0]" />
              <div>
                <div
                  className="text-3xl sm:text-4xl text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-eb-garamond)' }}
                >
                  Bangla
                </div>
                <div className="text-xs sm:text-sm text-[#8a8a80] font-medium">
                  Low-Resource NLP
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Flat Dark Device Illustration Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[400px] bg-[#1a1a1a] rounded-[40px] border-2 border-[#1a1a1a] p-6 text-[#ffffeb] flex flex-col gap-5"
            >
              {/* Header Bar inside flat mockup */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ffa946]" />
                  <span className="text-xs uppercase tracking-widest text-[#8a8a80]">
                    System State: Active
                  </span>
                </div>
                <span className="text-xs text-[#ffffeb]/60">Dhaka, BD</span>
              </div>

              {/* Center Portrait */}
              <div className="relative w-full aspect-[4/4.5] rounded-[28px] overflow-hidden border border-white/10 bg-[#222222]">
                <Image
                  src="/Omor.png"
                  alt="Omor Faruk Ullas"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Chat / Speech Bubble inside mockup */}
              <div className="bg-[#ffffeb] text-[#1a1a1a] rounded-2xl p-4 border border-[#1a1a1a] flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase font-semibold text-[#8a8a80]">
                    Current Focus
                  </div>
                  <div className="text-sm font-medium text-[#1a1a1a] line-clamp-1">
                    Bangla NLP &amp; Scalable AI Systems
                  </div>
                </div>
                <WaveformPill />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
