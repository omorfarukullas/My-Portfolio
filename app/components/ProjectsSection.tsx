'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectModal from './ProjectModal';
import { TealBadge, DarkSquareBadge } from './WisprPrimitives';

export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  status: 'Completed' | 'In Progress';
  category: 'Web / Full Stack' | 'Research & AI' | 'IoT & Embedded' | 'Tools';
  github?: string;
  live?: string;
  image: string;
  rotate?: number;
}

const projectsData: Project[] = [
  {
    id: 0,
    title: 'MediSheba BD',
    tagline: 'Smart Healthcare & Live Queue Platform',
    description: 'Smart healthcare and live queue management, enabling real-time queue tracking for patients, doctors, and hospitals.',
    longDescription:
      'A comprehensive smart healthcare platform addressing patient wait times in Bangladesh. Implements live queue tracking, appointment scheduling, hospital bed availability dashboards, and digital prescription tracking.',
    techStack: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Express'],
    features: [
      'Real-time live queue progression tracker',
      'Doctor appointment scheduling & token system',
      'Hospital resource & bed availability monitoring',
      'Prescription and patient visit history records',
    ],
    status: 'Completed',
    category: 'Web / Full Stack',
    github: 'https://github.com/omorfarukullas',
    image: '🩺',
  },
  {
    id: 1,
    title: 'KaajerBazar',
    tagline: 'AI-Assisted Student Micro-Project Marketplace',
    description: 'Micro-project marketplace for Bangladeshi students with AI-assisted bid matching and milestone tracking.',
    longDescription:
      'Built to empower university students with freelance and micro-gig opportunities. Integrates Claude AI to analyze client job postings and match them with relevant student skills, optimizing proposal quality and project delivery.',
    techStack: ['Next.js', 'Tailwind CSS', 'Claude API', 'Supabase', 'TypeScript'],
    features: [
      'AI-assisted bid suggestions using Claude API',
      'Real-time student and client communication',
      'Milestone escrow and task completion workflow',
      'Student verified portfolio showcase',
    ],
    status: 'Completed',
    category: 'Web / Full Stack',
    github: 'https://github.com/omorfarukullas',
    image: '🛍️',
  },
  {
    id: 2,
    title: 'HelioSense',
    tagline: 'Smart Solar Panel Monitoring on ESP32',
    description: 'Real-time smart solar panel monitoring system measuring voltage, current, power output, and panel efficiency.',
    longDescription:
      'An IoT hardware prototype combining ESP32 microcontrollers with current and voltage sensors to stream telemetry data. Analyzes energy output fluctuations caused by dust, shading, and temperature changes.',
    techStack: ['ESP32', 'C++', 'Sensors', 'IoT', 'FreeRTOS'],
    features: [
      'Real-time voltage and current telemetry acquisition',
      'Fault detection algorithm for dust and obstruction',
      'Low-power sensor polling and Wi-Fi streaming',
      'Web-based live diagnostics dashboard',
    ],
    status: 'In Progress',
    category: 'IoT & Embedded',
    github: 'https://github.com/omorfarukullas',
    image: '☀️',
  },
  {
    id: 3,
    title: 'Bangla Propaganda Detection',
    tagline: 'Low-Resource Disinformation Research',
    description: 'Investigating whether coordinated propaganda campaigns can be detected in low-resource Bangla online media.',
    longDescription:
      'Academic research project exploring the landscape of coordinated disinformation and synthetic propaganda in Bangla. Developing dedicated datasets from social and online news sources and evaluating state-of-the-art transformer models.',
    techStack: ['Python', 'NLP', 'PyTorch', 'Transformers', 'Dataset Construction'],
    features: [
      'Online media scraping and curation pipeline',
      'Annotation guidelines for propaganda techniques in Bangla',
      'Benchmark evaluations on BanglaBERT and multilingual LLMs',
      'Network-level coordination analysis',
    ],
    status: 'In Progress',
    category: 'Research & AI',
    github: 'https://github.com/omorfarukullas',
    image: '🔎',
  },
  {
    id: 4,
    title: 'Local Flood Management System',
    tagline: 'Environmental Monitoring & Early Flood Warning',
    description: 'Real-time environmental monitoring & early flood-warning prototype utilizing ultrasonic and water sensors.',
    longDescription:
      'Designed to provide early warnings for monsoon flood risks in localized communities. Measures water level velocity and rate-of-rise to trigger automated alerts before water levels reach critical thresholds.',
    techStack: ['ESP32', 'C++', 'Ultrasonic Sensors', 'Embedded Systems'],
    features: [
      'Water level and water speed continuous sampling',
      'Threshold-based siren and notification triggers',
      'Robust outdoor sensor packaging',
      'Battery-backed emergency power management',
    ],
    status: 'Completed',
    category: 'IoT & Embedded',
    github: 'https://github.com/omorfarukullas',
    image: '🌊',
  },
  {
    id: 5,
    title: 'JavaFX Resume Generator',
    tagline: 'Desktop Resume Builder with OOP Principles',
    description: 'Desktop resume builder demonstrating OOP design principles, clean architecture, and dynamic PDF export.',
    longDescription:
      'A desktop GUI application developed in Java and JavaFX. Showcases solid Object-Oriented Design principles (encapsulation, polymorphism, design patterns) with an intuitive preview and export system.',
    techStack: ['Java', 'JavaFX', 'OOP', 'PDFBox'],
    features: [
      'Interactive form with real-time CV preview',
      'Multiple professional resume layout templates',
      'Data persistence and template saving',
      'Vector PDF generation engine',
    ],
    status: 'Completed',
    category: 'Tools',
    github: 'https://github.com/omorfarukullas',
    image: '📄',
  },
];

const categories = ['All', 'Web / Full Stack', 'Research & AI', 'IoT & Embedded', 'Tools'] as const;

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const isCompleted = project.status === 'Completed';

  return (
    <div
      onClick={onClick}
      className="card-cream flex flex-col justify-between cursor-pointer h-full group"
      style={{ fontFamily: 'var(--font-figtree)' }}
    >
      <div>
        {/* Card Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <DarkSquareBadge variant="dark">{project.category}</DarkSquareBadge>
          {isCompleted ? (
            <TealBadge>Completed</TealBadge>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-[#ffa946]/20 text-[#1a1a1a] border border-[#ffa946]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffa946]" />
              In Progress
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3
          className="text-[#1a1a1a] mb-2 text-2xl sm:text-3xl group-hover:text-[#034f46] transition-colors"
          style={{ fontFamily: 'var(--font-eb-garamond)', letterSpacing: '-0.8px' }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm font-medium text-[#8a8a80] mb-4">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-[#222222] text-base leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <DarkSquareBadge key={tech} variant="cream">
              {tech}
            </DarkSquareBadge>
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t border-[#e4e4d0] flex items-center justify-between text-sm font-semibold text-[#1a1a1a]">
          <span>Inspect Architecture</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="cream-section" style={{ fontFamily: 'var(--font-figtree)' }}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 mb-12 max-w-2xl">
          <TealBadge>Selected Engineering</TealBadge>
          <h2
            className="text-[#1a1a1a]"
            style={{
              fontFamily: 'var(--font-eb-garamond)',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              lineHeight: 0.95,
              letterSpacing: '-1.92px',
              fontWeight: 400,
            }}
          >
            Functional systems built for reality.
          </h2>
          <p className="text-[#8a8a80] text-lg sm:text-xl">
            From healthcare microservices and low-resource NLP pipelines to embedded solar telemetry.
          </p>
        </div>

        {/* Platform Selector Filter Row */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-[#e4e4d0]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-colors ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-[#ffffeb] border-[#1a1a1a]'
                    : 'bg-[#ffffeb] text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#e4e4d0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
