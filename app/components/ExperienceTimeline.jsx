"use client";

import { motion } from 'framer-motion';
import { DarkChamber, MisregisteredHeading, RisoTape } from './WisprPrimitives';

const timelineData = [
  {
    id: 1,
    step: '01',
    type: 'Academic Milestone',
    title: 'United International University (UIU)',
    subtitle: 'B.Sc. in Computer Science & Engineering',
    date: '2022 — PRESENT',
    status: 'IN PROGRESS',
    description:
      'Focusing on algorithm design, low-resource natural language processing, machine learning theory, and distributed architectures.',
    tech: ['Data Structures', 'AI / ML', 'NLP', 'Software Engineering'],
  },
  {
    id: 2,
    step: '02',
    type: 'Full Stack Engineering',
    title: 'MediSheba BD',
    subtitle: 'Lead Software Developer',
    date: '2024 — PRESENT',
    status: 'ACTIVE PRODUCTION',
    description:
      'Engineered a real-time live queue management platform for healthcare providers and patients in Bangladesh to eliminate clinical queue latency.',
    tech: ['TypeScript', 'React', 'Node.js', 'MySQL', 'Express'],
  },
  {
    id: 3,
    step: '03',
    type: 'Applied AI & Marketplace',
    title: 'KaajerBazar Platform',
    subtitle: 'Architect & Full Stack Developer',
    date: '2024',
    status: 'SHIPPED PROTOTYPE',
    description:
      'Architected an AI-assisted freelance task marketplace connecting university students with localized micro-gigs, leveraging Claude AI for intelligent bid synthesis.',
    tech: ['Next.js', 'Claude API', 'Supabase', 'TypeScript'],
  },
  {
    id: 4,
    step: '04',
    type: 'IoT Telemetry Prototype',
    title: 'HelioSense Solar Monitoring',
    subtitle: 'Embedded Hardware Developer',
    date: '2024',
    status: 'HARDWARE PROTOTYPE',
    description:
      'Designed and deployed an ESP32 micro-controller sensor array collecting real-time voltage, current, and solar degradation telemetry over Wi-Fi.',
    tech: ['ESP32', 'C++', 'FreeRTOS', 'Telemetry Sensors'],
  },
];

export default function ExperienceTimeline() {
  return (
    <DarkChamber id="experience">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 mb-14 max-w-3xl">
        <RisoTape rotate={-1}>
          CHRONOLOGY // CAREER &amp; ACADEMIA
        </RisoTape>
        <MisregisteredHeading
          as="h2"
          ghostColor="yellow"
          offset={3}
          className="text-3xl sm:text-5xl lg:text-6xl font-archivo uppercase tracking-tight text-[#f2eee3] leading-[0.95]"
        >
          Timeline of Craft &amp; Progression.
        </MisregisteredHeading>
        <p className="font-space text-base sm:text-lg text-[#f2eee3]/80 leading-relaxed max-w-2xl">
          A continuous record of academic rigor, applied research initiatives, and production software builds.
        </p>
      </div>

      {/* Vertical Timeline Rail */}
      <div className="relative pl-8 sm:pl-14 border-l-2 border-white/20 ml-2 sm:ml-6 flex flex-col gap-10">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.25, delay: index * 0.08 }}
            className="relative"
          >
            {/* Step Counter Marker Node */}
            <div className="absolute -left-[45px] sm:-left-[71px] top-4 w-8 h-8 sm:w-10 sm:h-10 bg-[hsl(52,100%,55%)] border-2 border-[hsl(230,30%,14%)] flex items-center justify-center font-space font-bold text-xs sm:text-sm text-[hsl(230,30%,14%)] riso-shadow-ink-sm z-10">
              {item.step}
            </div>

            {/* Content Chamber Card */}
            <div className="bg-white text-[hsl(230,30%,14%)] border-2 border-[hsl(230,30%,14%)] riso-shadow-ink-sm p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[hsl(230,30%,14%)]">
                <div className="flex items-center gap-2">
                  <span className="font-space text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[hsl(330,100%,60%)] text-[hsl(230,30%,14%)] border border-[hsl(230,30%,14%)]">
                    {item.type}
                  </span>
                  <span className="font-space text-[10px] uppercase font-bold px-2 py-0.5 bg-[hsl(44,45%,92%)] border border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)]">
                    {item.status}
                  </span>
                </div>
                <span className="font-space text-xs font-bold text-[hsl(212,100%,45%)]">
                  {item.date}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-archivo uppercase text-[hsl(230,30%,14%)] mb-1 leading-tight">
                  {item.title}
                </h3>
                <p className="font-space text-xs sm:text-sm font-bold text-[hsl(230,12%,38%)]">
                  {item.subtitle}
                </p>
              </div>

              <p className="font-space text-xs sm:text-sm text-[hsl(230,30%,20%)] leading-relaxed max-w-2xl">
                {item.description}
              </p>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-[hsl(230,30%,14%)]">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="font-space text-[10px] font-bold uppercase px-2 py-0.5 bg-[hsl(44,45%,92%)] border border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DarkChamber>
  );
}
