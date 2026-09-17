'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './ProjectsSection';
import { TealBadge, DarkSquareBadge } from './WisprPrimitives';

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a1a]/70 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-[36px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 flex flex-col gap-6 text-[#1a1a1a] outline-none"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#e4e4d0] pb-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <DarkSquareBadge variant="dark">{project.category}</DarkSquareBadge>
                  {project.status === 'Completed' ? (
                    <TealBadge>Completed</TealBadge>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-[#ffa946]/20 text-[#1a1a1a] border border-[#ffa946]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffa946]" />
                      In Progress
                    </span>
                  )}
                </div>

                <h2
                  id="modal-project-title"
                  className="text-3xl sm:text-4xl text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-eb-garamond)', letterSpacing: '-1px' }}
                >
                  {project.title}
                </h2>
                <p className="text-sm font-medium text-[#8a8a80]">
                  {project.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-10 h-10 rounded-full border-2 border-[#1a1a1a] bg-[#ffffeb] text-[#1a1a1a] hover:bg-[#e4e4d0] flex items-center justify-center font-bold text-lg transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Long Narrative Description */}
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-[#8a8a80] block mb-2">
                Overview &amp; Architecture
              </span>
              <p className="text-base sm:text-lg text-[#222222] leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="bg-[#e4e4d0]/50 border border-[#1a1a1a]/20 rounded-2xl p-6">
              <span className="text-xs uppercase font-semibold tracking-widest text-[#1a1a1a] block mb-3">
                Key Technical Highlights
              </span>
              <ul className="flex flex-col gap-2.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#222222]">
                    <span className="text-[#034f46] font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-[#8a8a80] block mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <DarkSquareBadge key={tech} variant="cream">
                    {tech}
                  </DarkSquareBadge>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[#e4e4d0] mt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  View Code on GitHub →
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
