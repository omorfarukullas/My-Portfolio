'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectModal from './ProjectModal';
import { MisregisteredHeading, RisoTape } from './WisprPrimitives';

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
      className="bg-white border-2 border-[hsl(230,30%,14%)] riso-shadow-ink hover:riso-shadow-pink hover:-translate-y-1 transition-all duration-150 flex flex-col justify-between cursor-pointer h-full p-6 sm:p-7 group"
    >
      <div>
        {/* Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-[hsl(230,30%,14%)]">
          <span className="font-space text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[hsl(52,100%,55%)] text-[hsl(230,30%,14%)] border border-[hsl(230,30%,14%)]">
            {project.category}
          </span>
          {isCompleted ? (
            <span className="font-space text-[10px] uppercase font-bold px-2 py-0.5 bg-[hsl(44,45%,92%)] text-[hsl(230,30%,14%)] border border-[hsl(230,30%,14%)]">
              COMPLETED
            </span>
          ) : (
            <span className="font-space text-[10px] uppercase font-bold px-2 py-0.5 bg-[hsl(330,100%,60%)] text-[hsl(230,30%,14%)] border border-[hsl(230,30%,14%)] animate-pulse">
              IN PROGRESS
            </span>
          )}
        </div>

        {/* Project Title in Archivo Black */}
        <h3 className="text-[hsl(230,30%,14%)] font-archivo uppercase text-xl sm:text-2xl mb-1.5 group-hover:text-[hsl(212,100%,45%)] transition-colors leading-tight">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="font-space text-xs font-bold text-[hsl(212,100%,45%)] mb-3 uppercase tracking-wider">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="font-space text-xs sm:text-sm text-[hsl(230,30%,20%)] leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-space text-[10px] font-bold uppercase px-2 py-0.5 bg-[hsl(44,45%,92%)] border border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-3 border-t-2 border-[hsl(230,30%,14%)] flex items-center justify-between font-space text-xs font-bold uppercase tracking-wider text-[hsl(230,30%,14%)]">
          <span>INSPECT BLUEPRINT</span>
          <span className="group-hover:translate-x-1 transition-transform text-[hsl(330,100%,60%)] font-bold text-base">→</span>
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
    <section id="projects" className="py-20 bg-[hsl(44,45%,92%)]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 mb-12 max-w-3xl">
          <RisoTape rotate={-1}>
            SELECTED WORKS // CATALOG
          </RisoTape>
          <MisregisteredHeading
            as="h2"
            ghostColor="blue"
            offset={3}
            className="text-3xl sm:text-5xl lg:text-6xl font-archivo uppercase tracking-tight text-[hsl(230,30%,14%)] leading-[0.95]"
          >
            Functional Systems Built for Reality.
          </MisregisteredHeading>
          <p className="font-space text-sm sm:text-base text-[hsl(230,12%,38%)] max-w-2xl leading-relaxed">
            Spanning low-resource NLP pipelines and healthcare platforms to embedded telemetry arrays and software tools.
          </p>
        </div>

        {/* Platform Selector Filter Row */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b-2 border-[hsl(230,30%,14%)]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-space text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[hsl(212,100%,45%)] text-white border-[hsl(230,30%,14%)] riso-shadow-ink-sm'
                    : 'bg-white text-[hsl(230,30%,14%)] border-[hsl(230,30%,14%)] hover:bg-[hsl(52,100%,55%)]'
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
                transition={{ duration: 0.15 }}
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
