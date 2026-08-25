'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './ProjectsSection';
import { RADIUS, TapeStrip, StickyTag } from './HandDrawn';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!project) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        modalRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-project-title"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        background: 'rgba(45, 45, 45, 0.55)',
                        backdropFilter: 'blur(3px)',
                    }}
                >
                    <motion.div
                        ref={modalRef}
                        tabIndex={-1}
                        initial={{ scale: 0.92, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            background: '#ffffff',
                            backgroundImage: 'radial-gradient(#d8d1c5 1.2px, transparent 1.2px)',
                            backgroundSize: '20px 20px',
                            border: '3px solid #2d2d2d',
                            borderRadius: RADIUS.wobbly,
                            width: '100%',
                            maxWidth: '680px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            outline: 'none',
                            boxShadow: '10px 10px 0px 0px #2d2d2d',
                            padding: '2.5rem 2rem',
                            transform: 'rotate(-0.5deg)',
                        }}
                    >
                        <TapeStrip rotate={-1.5} />

                        {/* Modal Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            borderBottom: '2px dashed #2d2d2d',
                            paddingBottom: '1.25rem',
                            marginBottom: '1.5rem',
                            gap: '1rem',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    fontSize: '2.8rem',
                                    background: 'var(--bg-postit)',
                                    border: '2px solid #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    width: '64px',
                                    height: '64px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '3px 3px 0px #2d2d2d',
                                    flexShrink: 0,
                                }}>
                                    {project.image}
                                </div>
                                <div>
                                    <h2
                                        id="modal-project-title"
                                        style={{
                                            fontSize: '1.75rem',
                                            fontWeight: 700,
                                            fontFamily: 'Kalam, cursive',
                                            color: '#2d2d2d',
                                            margin: 0,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {project.title}
                                    </h2>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: 'var(--secondary-accent)',
                                        fontFamily: 'Patrick Hand, cursive',
                                        fontWeight: 600,
                                        margin: '0.25rem 0 0 0',
                                    }}>
                                        {project.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                aria-label="Close modal"
                                style={{
                                    flexShrink: 0,
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#ffffff',
                                    border: '2px solid #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    boxShadow: '2px 2px 0px #2d2d2d',
                                    color: '#2d2d2d',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    transition: 'all 0.1s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--accent)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.color = '#2d2d2d';
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Status Badge */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <StickyTag color={project.status === 'Completed' ? 'green' : 'orange'} rotate={1}>
                                {project.status === 'Completed' ? '✅ Status: Completed' : '⚡ Status: Active Research / In Progress'}
                            </StickyTag>
                        </div>

                        {/* Long Description */}
                        <p style={{
                            fontSize: '1.2rem',
                            lineHeight: 1.6,
                            color: '#333333',
                            marginBottom: '1.75rem',
                            fontFamily: 'Patrick Hand, cursive',
                        }}>
                            {project.longDescription}
                        </p>

                        {/* Key Features */}
                        <div style={{
                            background: 'var(--bg-postit)',
                            border: '2px solid #2d2d2d',
                            borderRadius: RADIUS.wobblySm,
                            padding: '1.25rem 1.5rem',
                            boxShadow: '3px 3px 0px #2d2d2d',
                            marginBottom: '1.75rem',
                            transform: 'rotate(-0.5deg)',
                        }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                fontFamily: 'Kalam, cursive',
                                color: '#2d2d2d',
                                marginBottom: '0.75rem',
                            }}>
                                📌 Key Features &amp; Capabilities
                            </h3>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                            }}>
                                {project.features.map((f, i) => (
                                    <li key={i} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.5rem',
                                        fontSize: '1.1rem',
                                        fontFamily: 'Patrick Hand, cursive',
                                        color: '#2d2d2d',
                                    }}>
                                        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>✓</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack Pills */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                fontFamily: 'Kalam, cursive',
                                color: '#2d2d2d',
                                marginBottom: '0.65rem',
                            }}>
                                🛠️ Technologies Used
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            background: '#ffffff',
                                            border: '1.5px solid #2d2d2d',
                                            borderRadius: RADIUS.wobblySm,
                                            boxShadow: '2px 2px 0px #2d2d2d',
                                            fontSize: '0.95rem',
                                            fontFamily: 'Patrick Hand, cursive',
                                            fontWeight: 600,
                                            color: '#2d2d2d',
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderTop: '2px dashed #2d2d2d', paddingTop: '1.25rem' }}>
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-sketch"
                                    style={{ fontSize: '1.1rem', padding: '0.5rem 1.5rem' }}
                                >
                                    💻 View on GitHub
                                </a>
                            )}
                            <button
                                onClick={onClose}
                                className="btn-sketch-secondary"
                                style={{ fontSize: '1.1rem', padding: '0.5rem 1.5rem' }}
                            >
                                Close Sketch
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
