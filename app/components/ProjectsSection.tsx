'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectModal from './ProjectModal';
import { RADIUS, TapeStrip, StickyTag } from './HandDrawn';

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
    rotate: number;
}

const projectsData: Project[] = [
    {
        id: 0,
        title: 'MediSheba BD',
        tagline: 'Smart Healthcare & Live Queue Platform',
        description: 'Smart healthcare & live queue management, enabling real-time queue tracking for patients, doctors, and hospitals.',
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
        rotate: -1,
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
        rotate: 1,
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
        rotate: -1.5,
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
        rotate: 0.8,
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
        rotate: 1.2,
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
        rotate: -0.8,
    },
];

const categories = ['All', 'Web / Full Stack', 'Research & AI', 'IoT & Embedded', 'Tools'];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    const isCompleted = project.status === 'Completed';

    return (
        <div
            onClick={onClick}
            style={{
                position: 'relative',
                cursor: 'pointer',
                background: '#ffffff',
                border: '2.5px solid #2d2d2d',
                borderRadius: RADIUS.wobbly,
                padding: '2rem 1.75rem',
                boxShadow: '5px 5px 0px 0px #2d2d2d',
                transform: `rotate(${project.rotate}deg)`,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) rotate(0deg)';
                e.currentTarget.style.boxShadow = '9px 9px 0px 0px #2d2d2d';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${project.rotate}deg)`;
                e.currentTarget.style.boxShadow = '5px 5px 0px 0px #2d2d2d';
            }}
        >
            <TapeStrip rotate={project.rotate > 0 ? -1 : 1} />

            {/* Top Row: Emoji Icon + Status Pill */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', marginTop: '0.25rem' }}>
                <div style={{
                    fontSize: '2.2rem',
                    background: 'var(--bg-elevated)',
                    border: '2px solid #2d2d2d',
                    borderRadius: RADIUS.wobblySm,
                    width: '54px',
                    height: '54px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '2px 2px 0px #2d2d2d',
                }}>
                    {project.image}
                </div>
                <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.65rem',
                    borderRadius: RADIUS.wobblySm,
                    fontSize: '0.85rem',
                    fontFamily: 'Patrick Hand, cursive',
                    fontWeight: 700,
                    background: isCompleted ? 'var(--bg-postit-green)' : 'var(--bg-postit-orange)',
                    color: '#2d2d2d',
                    border: '1.5px solid #2d2d2d',
                    boxShadow: '2px 2px 0px #2d2d2d',
                    transform: isCompleted ? 'rotate(1deg)' : 'rotate(-1deg)',
                }}>
                    {isCompleted ? '✅ Completed' : '⚡ In Progress'}
                </span>
            </div>

            {/* Title & Tagline */}
            <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                fontFamily: 'Kalam, cursive',
                color: '#2d2d2d',
                marginBottom: '0.25rem',
                lineHeight: 1.2,
            }}>
                {project.title}
            </h3>

            <p style={{
                fontSize: '1rem',
                color: 'var(--secondary-accent)',
                fontWeight: 600,
                marginBottom: '0.75rem',
                fontFamily: 'Patrick Hand, cursive',
            }}>
                {project.tagline}
            </p>

            {/* Description */}
            <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '1.25rem',
                flexGrow: 1,
                fontFamily: 'Patrick Hand, cursive',
            }}>
                {project.description}
            </p>

            {/* Tech Stack Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                {project.techStack.map((tech) => (
                    <span key={tech} style={{
                        padding: '0.15rem 0.55rem',
                        borderRadius: RADIUS.wobblySm,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        background: 'var(--bg-elevated)',
                        border: '1.5px solid #2d2d2d',
                        color: '#2d2d2d',
                        fontFamily: 'Patrick Hand, cursive',
                    }}>
                        {tech}
                    </span>
                ))}
            </div>

            {/* Bottom Action Prompt */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--accent)',
                fontFamily: 'Patrick Hand, cursive',
                borderTop: '1.5px dashed #2d2d2d',
                paddingTop: '0.65rem',
            }}>
                <span>🔍 Click to inspect sketch</span>
                <span>→</span>
            </div>
        </div>
    );
}

export default function ProjectsSection() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const filtered = selectedCategory === 'All'
        ? projectsData
        : projectsData.filter((p) => p.category === selectedCategory);

    return (
        <section id="projects" className="section" style={{ borderTop: '3px solid #2d2d2d', padding: '5rem 0' }}>
            <div className="container" style={{ maxWidth: '1150px' }}>

                {/* Section Header */}
                <div ref={headerRef} style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <StickyTag color="yellow" rotate={-1} style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                        🗂️ Featured Projects &amp; Research
                    </StickyTag>
                    <h2 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        fontFamily: 'Kalam, cursive',
                        marginBottom: '0.75rem',
                        color: '#2d2d2d',
                    }}>
                        Things I&apos;ve Built &amp; Explored
                    </h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        maxWidth: '620px',
                        margin: '0 auto',
                        fontSize: '1.25rem',
                        lineHeight: 1.5,
                        fontFamily: 'Patrick Hand, cursive',
                    }}>
                        From healthcare platforms and low-resource Bangla NLP to IoT solar trackers and desktop tools.
                    </p>
                </div>

                {/* Hand-Drawn Category Filter Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0.65rem',
                    }}>
                        {categories.map((cat, idx) => {
                            const isSelected = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        padding: '0.4rem 1.1rem',
                                        borderRadius: RADIUS.wobblySm,
                                        fontSize: '1.05rem',
                                        fontFamily: 'Patrick Hand, cursive',
                                        fontWeight: 700,
                                        border: '2px solid #2d2d2d',
                                        cursor: 'pointer',
                                        boxShadow: isSelected ? '1px 1px 0px #2d2d2d' : '3px 3px 0px #2d2d2d',
                                        transform: isSelected
                                            ? 'translate(2px, 2px)'
                                            : idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
                                        background: isSelected ? 'var(--accent)' : '#ffffff',
                                        color: isSelected ? '#ffffff' : '#2d2d2d',
                                        transition: 'all 0.1s ease',
                                    }}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Projects Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2.5rem',
                }}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                            >
                                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Hand-Drawn Project Modal */}
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}
