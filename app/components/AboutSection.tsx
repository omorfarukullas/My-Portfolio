'use client';

import Link from 'next/link';
import {
  SiPython, SiCplusplus, SiOpenjdk, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiTailwindcss,
  SiMysql, SiPostgresql, SiSupabase,
  SiPytorch, SiTensorflow, SiHuggingface,
  SiRaspberrypi, SiGit, SiGithub
} from 'react-icons/si';
import { MisregisteredHeading, RisoTape, DarkChamber } from './WisprPrimitives';

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
      {/* Editorial Header with Riso Misregistration */}
      <div className="flex flex-col items-start gap-4 mb-14 max-w-3xl">
        <RisoTape rotate={-1}>
          DOSSIER // RESEARCH &amp; PHILOSOPHY
        </RisoTape>
        
        <MisregisteredHeading
          as="h2"
          ghostColor="pink"
          offset={3}
          className="text-3xl sm:text-5xl lg:text-6xl font-archivo uppercase tracking-tight text-[#f2eee3] leading-[0.95]"
        >
          Grounding Intelligence in Rigorous Architecture.
        </MisregisteredHeading>

        <p className="font-space text-base sm:text-lg text-[#f2eee3]/80 leading-relaxed max-w-2xl">
          Undergraduate researcher at United International University (UIU). Dedicated to bridging the gap between theoretical low-resource NLP experiments and robust production software systems.
        </p>
      </div>

      {/* Two Column Feature Chamber: Academic Bio + Research Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Academic Card */}
        <div className="lg:col-span-6 bg-white border-2 border-[hsl(230,30%,14%)] riso-shadow-ink p-8 flex flex-col justify-between text-[hsl(230,30%,14%)]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[hsl(230,30%,14%)]">
              <span className="font-space text-xs uppercase font-bold tracking-widest text-[hsl(230,12%,38%)]">
                ACADEMIC SUBSTRATE
              </span>
              <span className="font-space text-xs font-bold bg-[hsl(52,100%,55%)] px-2 py-0.5 border border-[hsl(230,30%,14%)]">
                UIU • CSE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-archivo uppercase text-[hsl(230,30%,14%)]">
              United International University
            </h3>
            <p className="font-space text-sm sm:text-base text-[hsl(230,30%,20%)] leading-relaxed">
              B.Sc. in Computer Science &amp; Engineering. Core focus spans distributed systems, computational linguistics, algorithmic complexity, and statistical language modeling.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-[hsl(230,30%,14%)] bg-[hsl(44,45%,92%)] -mx-8 -mb-8 p-6">
            <div className="font-space text-xs sm:text-sm font-bold text-[hsl(230,30%,14%)]">
              &ldquo;Sound software engineering is the substrate upon which reproducible machine learning thrives.&rdquo;
            </div>
          </div>
        </div>

        {/* Research Spotlight Card: High-Impact Medium Blue Ink Card */}
        <div className="lg:col-span-6 bg-[hsl(212,100%,45%)] border-2 border-[hsl(230,30%,14%)] riso-shadow-pink p-8 flex flex-col justify-between text-white">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-white/20">
              <span className="font-space text-xs uppercase font-bold tracking-widest text-white/90">
                ACTIVE LAB FOCUS
              </span>
              <span className="font-space text-xs font-bold bg-[hsl(330,100%,60%)] text-[hsl(230,30%,14%)] px-2.5 py-0.5 border border-[hsl(230,30%,14%)] animate-pulse">
                IN PROGRESS
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-archivo uppercase text-white leading-tight">
              Coordinated Propaganda Detection in Low-Resource Bangla
            </h3>
            <p className="font-space text-sm sm:text-base text-white/90 leading-relaxed">
              Curating standardized open datasets and benchmarking lightweight transformer architectures to expose coordinated manipulation and synthetic narrative spread across Bangla digital media.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t-2 border-white/20">
            {['BANGLA NLP', 'DATASET CURATION', 'TRANSFORMERS', 'GRAPH ANALYSIS'].map((tag) => (
              <span
                key={tag}
                className="font-space text-xs font-bold px-3 py-1 bg-[hsl(230,30%,14%)] text-[hsl(44,45%,92%)] border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Tech Stack Arsenal Grid */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-white/10">
          <div>
            <span className="font-space text-xs uppercase font-bold tracking-widest text-[hsl(52,100%,55%)] block mb-1">
              // ARSENAL SPECIFICATIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-archivo uppercase text-[#f2eee3]">
              Technical Capabilities
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="bg-white border-2 border-[hsl(230,30%,14%)] riso-shadow-ink-sm p-6 flex flex-col gap-4 text-[hsl(230,30%,14%)]"
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-[hsl(230,30%,14%)]">
                <span className="font-space text-xs font-bold uppercase tracking-wider text-[hsl(230,30%,14%)]">
                  {group.category}
                </span>
                <span className="w-2 h-2 bg-[hsl(330,100%,60%)] border border-[hsl(230,30%,14%)]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-space font-bold uppercase bg-[hsl(44,45%,92%)] border-2 border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)] hover:bg-[hsl(52,100%,55%)] transition-colors cursor-default"
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions inside Chamber */}
      <div className="mt-14 pt-8 border-t-2 border-white/10 flex flex-wrap items-center justify-between gap-4">
        <span className="font-space text-xs sm:text-sm text-[#f2eee3]/70">
          Interested in academic collaboration, NLP research, or engineering roles?
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-riso-pink text-xs"
          >
            Start a Conversation →
          </Link>
          <a
            href="/OmorFaruckUllas.pdf"
            download="OmorFaruckUllas_Resume.pdf"
            className="btn-riso-outline text-xs text-white border-white hover:bg-white hover:text-[hsl(230,30%,14%)]"
          >
            Download CV
          </a>
        </div>
      </div>
    </DarkChamber>
  );
}
