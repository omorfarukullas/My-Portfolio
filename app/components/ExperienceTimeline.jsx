"use client";

import { motion } from 'framer-motion';
import { DarkChamber, TealBadge, PlatformBadge } from './WisprPrimitives';

const timelineData = [
  {
    id: 1,
    type: 'Academic Milestone',
    title: 'United International University (UIU)',
    subtitle: 'B.Sc. in Computer Science & Engineering',
    date: '2022 — Present',
    status: 'In Progress',
    description:
      'Focusing on algorithm design, low-resource natural language processing, machine learning theory, and distributed architectures.',
    tech: ['Data Structures', 'AI / ML', 'NLP', 'Software Engineering'],
  },
  {
    id: 2,
    type: 'Full Stack Engineering',
    title: 'MediSheba BD',
    subtitle: 'Lead Software Developer',
    date: '2024 — Present',
    status: 'In Active Development',
    description:
      'Engineered a real-time live queue management platform for healthcare providers and patients in Bangladesh to eliminate clinical queue latency.',
    tech: ['TypeScript', 'React', 'Node.js', 'MySQL', 'Express'],
  },
  {
    id: 3,
    type: 'Applied AI & Marketplace',
    title: 'KaajerBazar Platform',
    subtitle: 'Architect & Full Stack Developer',
    date: '2024',
    status: 'Shipped Prototype',
    description:
      'Architected an AI-assisted freelance task marketplace connecting university students with localized micro-gigs, leveraging Claude AI for intelligent bid synthesis.',
    tech: ['Next.js', 'Claude API', 'Supabase', 'TypeScript'],
  },
  {
    id: 4,
    type: 'IoT Telemetry Prototype',
    title: 'HelioSense Solar Monitoring',
    subtitle: 'Embedded Hardware Developer',
    date: '2024',
    status: 'Hardware Prototype',
    description:
      'Designed and deployed an ESP32 micro-controller sensor array collecting real-time voltage, current, and solar degradation telemetry over Wi-Fi.',
    tech: ['ESP32', 'C++', 'FreeRTOS', 'Telemetry Sensors'],
  },
];

export default function ExperienceTimeline() {
  return (
    <DarkChamber id="experience">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 mb-16 max-w-3xl">
        <TealBadge>Trajectory &amp; Milestones</TealBadge>
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
          Timeline of craft and progression.
        </h2>
        <p
          className="text-lg sm:text-xl text-[#8a8a80]"
          style={{ fontFamily: 'var(--font-figtree)', lineHeight: 1.35 }}
        >
          A continuous record of academic rigor, applied research initiatives, and production software builds.
        </p>
      </div>

      {/* Vertical Timeline Rail */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-white/20 ml-2 sm:ml-4 flex flex-col gap-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            {/* Timeline Node Pebble */}
            <div
              className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#ffffeb] border-4 border-[#1a1a1a]"
            />

            {/* Content Chamber Card */}
            <div className="bg-[#222222] border border-white/10 rounded-[32px] p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs uppercase font-semibold tracking-widest text-[#8a8a80]">
                    {item.type}
                  </span>
                  <span className="text-xs text-white/30">•</span>
                  <span className="text-xs text-[#f0d7ff] font-medium">
                    {item.status}
                  </span>
                </div>
                <span className="text-sm font-medium text-[#8a8a80]">
                  {item.date}
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl text-[#ffffeb] mb-1"
                  style={{ fontFamily: 'var(--font-eb-garamond)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-[#8a8a80]">
                  {item.subtitle}
                </p>
              </div>

              <p className="text-base text-[#ffffeb]/80 leading-relaxed max-w-2xl">
                {item.description}
              </p>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                {item.tech.map((t) => (
                  <PlatformBadge key={t}>
                    {t}
                  </PlatformBadge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DarkChamber>
  );
}
