'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MisregisteredHeading, DuotoneCard, RisoTape } from './WisprPrimitives';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center pt-16 pb-20 bg-[hsl(44,45%,92%)] text-[hsl(230,30%,14%)]"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Loud Risograph Display Typography */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Top Tape Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <RisoTape rotate={-1.5}>
                ★ AI / ML &amp; NLP RESEARCHER
              </RisoTape>
              <span className="font-space text-xs font-bold uppercase tracking-wider text-[hsl(230,12%,38%)]">
                UIU • DHAKA, BANGLADESH
              </span>
            </div>

            {/* Giant Misregistered Display Headline */}
            <div className="flex flex-col">
              <span className="font-space text-xs sm:text-sm font-bold uppercase tracking-widest text-[hsl(212,100%,45%)] mb-2">
                // PORTFOLIO SPECIFICATION 2026
              </span>
              <MisregisteredHeading
                as="h1"
                ghostColor="pink"
                offset={4}
                className="text-4xl sm:text-6xl lg:text-7xl font-archivo tracking-tight leading-[0.92] uppercase text-[hsl(230,30%,14%)]"
              >
                Engineering Clarity from Messy Data.
              </MisregisteredHeading>
            </div>

            {/* Subtitle in Space Mono / Clean type */}
            <p className="font-space text-base sm:text-lg text-[hsl(230,30%,18%)] max-w-xl leading-relaxed">
              I am <strong className="text-[hsl(230,30%,14%)] bg-[hsl(52,100%,55%)] px-1">Omor Faruk Ullas</strong> — undergraduate researcher at United International University, investigating low-resource language processing and architecting durable, production software systems.
            </p>

            {/* Tactile Riso Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="/OmorFaruckUllas.pdf"
                download="OmorFaruckUllas_Resume.pdf"
                className="btn-riso-pink text-xs sm:text-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>

              <Link href="/projects" className="btn-riso-outline text-xs sm:text-sm">
                View Selected Works →
              </Link>
            </div>

            {/* Tactile Stats Plate */}
            <div className="w-full max-w-xl mt-4 p-5 bg-white border-2 border-[hsl(230,30%,14%)] riso-shadow-ink-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="font-space font-bold text-3xl sm:text-4xl text-[hsl(212,100%,45%)]">
                  3+
                </span>
                <span className="font-space text-[11px] font-bold uppercase tracking-wider text-[hsl(230,12%,38%)]">
                  Years Research
                </span>
              </div>
              <div className="w-[2px] h-10 bg-[hsl(230,30%,14%)] hidden sm:block" />
              <div className="flex flex-col">
                <span className="font-space font-bold text-3xl sm:text-4xl text-[hsl(330,100%,60%)]">
                  10+
                </span>
                <span className="font-space text-[11px] font-bold uppercase tracking-wider text-[hsl(230,12%,38%)]">
                  Systems Shipped
                </span>
              </div>
              <div className="w-[2px] h-10 bg-[hsl(230,30%,14%)] hidden sm:block" />
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl sm:text-3xl text-[hsl(230,30%,14%)]">
                  BANGLA
                </span>
                <span className="font-space text-[11px] font-bold uppercase tracking-wider text-[hsl(230,12%,38%)]">
                  Low-Resource NLP
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Tactile Duotone Portrait Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Corner Masking Tape */}
              <div className="absolute -top-3 -right-2 z-20">
                <RisoTape rotate={3}>
                  EDITION // 001
                </RisoTape>
              </div>

              <div className="absolute -top-3 -left-2 z-20">
                <RisoTape rotate={-3}>
                  OFU // RESEARCH
                </RisoTape>
              </div>

              {/* Duotone Card Frame */}
              <DuotoneCard className="aspect-[4/4.8] w-full">
                <Image
                  src="/Omor.png"
                  alt="Omor Faruk Ullas"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                  className="object-cover object-top"
                />
              </DuotoneCard>

              {/* Physical Print Label Strip beneath Portrait */}
              <div className="mt-3 bg-[hsl(52,100%,55%)] border-2 border-[hsl(230,30%,14%)] riso-shadow-ink-sm p-3.5 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="font-space text-[10px] uppercase font-bold tracking-widest text-[hsl(230,30%,14%)]">
                    CURRENT DISPATCH
                  </span>
                  <span className="font-space text-xs font-bold text-[hsl(230,30%,14%)] uppercase line-clamp-1">
                    Bangla NLP &amp; Low-Resource Pipelines
                  </span>
                </div>
                <div className="w-3.5 h-3.5 bg-[hsl(330,100%,60%)] border border-[hsl(230,30%,14%)] shrink-0 animate-pulse" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
