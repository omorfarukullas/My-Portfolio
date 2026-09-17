'use client';

import Link from 'next/link';
import {
  SiPython, SiCplusplus, SiOpenjdk, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiTailwindcss,
  SiMysql, SiPostgresql, SiSupabase,
  SiPytorch, SiTensorflow, SiHuggingface,
  SiRaspberrypi, SiGit, SiGithub
} from 'react-icons/si';
import { TealBadge, PlatformBadge, DarkChamber } from './WisprPrimitives';

const techStack = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'C / C++', icon: <SiCplusplus /> },
      { name: 'Java', icon: <SiOpenjdk /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
    ],
  },
  {
    category: 'AI / ML & NLP',
    skills: [
      { name: 'PyTorch', icon: <SiPytorch /> },
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'Hugging Face', icon: <SiHuggingface /> },
      { name: 'Low-Resource NLP', icon: <span>🧬</span> },
      { name: 'Dataset Construction', icon: <span>📊</span> },
    ],
  },
  {
    category: 'Web & Backend',
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
  },
  {
    category: 'Databases & Cloud',
    skills: [
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Supabase', icon: <SiSupabase /> },
    ],
  },
  {
    category: 'Embedded & IoT',
    skills: [
      { name: 'ESP32 (C++)', icon: <span>📟</span> },
      { name: 'Raspberry Pi', icon: <SiRaspberrypi /> },
      { name: 'Sensors Telemetry', icon: <span>☀️</span> },
    ],
  },
  {
    category: 'Tools & Workflow',
    skills: [
      { name: 'Git & GitHub', icon: <SiGithub /> },
      { name: 'Linux / Bash', icon: <span>🐧</span> },
    ],
  },
];

export default function AboutSection() {
  return (
    <DarkChamber id="about">
      {/* Editorial Header */}
      <div className="flex flex-col items-start gap-4 mb-16 max-w-3xl">
        <TealBadge>Research &amp; Philosophy</TealBadge>
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
          Grounding intelligence in rigorous software architecture.
        </h2>
        <p
          className="text-lg sm:text-xl text-[#8a8a80]"
          style={{ fontFamily: 'var(--font-figtree)', lineHeight: 1.35 }}
        >
          Undergraduate researcher at United International University (UIU). Committed to closing the gap between academic low-resource NLP research and durable software systems.
        </p>
      </div>

      {/* Two Column Feature Chamber: Academic Bio + Research Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Academic Card */}
        <div
          className="lg:col-span-6 bg-[#222222] border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between"
          style={{ fontFamily: 'var(--font-figtree)' }}
        >
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8a8a80]">
              Academic Background
            </span>
            <h3
              className="text-2xl sm:text-3xl text-[#ffffeb]"
              style={{ fontFamily: 'var(--font-eb-garamond)' }}
            >
              United International University
            </h3>
            <p className="text-[#8a8a80] text-base sm:text-lg leading-relaxed">
              B.Sc. in Computer Science &amp; Engineering. My foundational work covers distributed systems, algorithm analysis, and statistical language modeling.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-sm text-[#ffffeb]/90 italic">
              &ldquo;Sound engineering is the substrate upon which reproducible machine learning thrives.&rdquo;
            </div>
          </div>
        </div>

        {/* Research Spotlight Card: Forest Ink Velvet Room Panel */}
        <div
          className="lg:col-span-6 bg-[#034f46] border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between text-[#ffffeb]"
          style={{ fontFamily: 'var(--font-figtree)' }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-widest text-[#ffffeb]/70">
                Active Research Focus
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-[#f0d7ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffa946] animate-pulse" />
                In Progress
              </span>
            </div>

            <h3
              className="text-2xl sm:text-3xl text-[#ffffeb]"
              style={{ fontFamily: 'var(--font-eb-garamond)' }}
            >
              Coordinated Propaganda Detection in Low-Resource Bangla
            </h3>
            <p className="text-[#ffffeb]/80 text-base sm:text-lg leading-relaxed">
              Constructing an open standardized dataset and testing lightweight transformer pipelines to identify coordinated narrative manipulation and digital disinformation in low-resource Bangla social media.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10">
            {['Bangla NLP', 'Dataset Engineering', 'Transformers', 'Graph Analysis'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-black/20 text-[#ffffeb]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Chamber Section */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8a8a80] block mb-1">
              Capabilities
            </span>
            <h3
              className="text-2xl sm:text-3xl text-[#ffffeb]"
              style={{ fontFamily: 'var(--font-eb-garamond)' }}
            >
              Technical Arsenal
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="bg-[#222222] border border-white/10 rounded-[28px] p-6 flex flex-col gap-4"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-[#8a8a80]">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <PlatformBadge key={skill.name} icon={skill.icon}>
                    {skill.name}
                  </PlatformBadge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions inside Chamber */}
      <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[#8a8a80] text-sm">
          Interested in academic collaboration or software development?
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-primary"
          >
            Start a Conversation →
          </Link>
          <a
            href="/OmorFaruckUllas.pdf"
            download="OmorFaruckUllas_Resume.pdf"
            className="btn-secondary-dark"
          >
            Download CV
          </a>
        </div>
      </div>
    </DarkChamber>
  );
}
