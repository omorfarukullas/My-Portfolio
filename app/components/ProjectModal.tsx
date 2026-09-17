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
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[hsl(44,45%,92%)] border-3 border-[hsl(230,30%,14%)] riso-shadow-pink w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-9 flex flex-col gap-6 text-[hsl(230,30%,14%)] outline-none"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-[hsl(230,30%,14%)] pb-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-space text-xs uppercase font-bold px-2.5 py-0.5 bg-[hsl(52,100%,55%)] border border-[hsl(230,30%,14%)]">
                    {project.category}
                  </span>
                  {project.status === 'Completed' ? (
                    <span className="font-space text-xs uppercase font-bold px-2.5 py-0.5 bg-white border border-[hsl(230,30%,14%)]">
                      COMPLETED
                    </span>
                  ) : (
                    <span className="font-space text-xs uppercase font-bold px-2.5 py-0.5 bg-[hsl(330,100%,60%)] border border-[hsl(230,30%,14%)] animate-pulse">
                      IN PROGRESS
                    </span>
                  )}
                </div>

                <h2
                  id="modal-project-title"
                  className="text-2xl sm:text-3xl font-archivo uppercase text-[hsl(230,30%,14%)] leading-tight mt-1"
                >
                  {project.title}
                </h2>
                <p className="font-space text-xs sm:text-sm font-bold text-[hsl(212,100%,45%)] uppercase tracking-wider">
                  {project.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-10 h-10 border-2 border-[hsl(230,30%,14%)] bg-[hsl(330,100%,60%)] text-[hsl(230,30%,14%)] hover:bg-[hsl(52,100%,55%)] flex items-center justify-center font-bold text-lg font-space transition-colors shrink-0 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Long Narrative Description */}
            <div>
              <span className="font-space text-xs uppercase font-bold tracking-widest text-[hsl(230,12%,38%)] block mb-2">
                // SYSTEM ARCHITECTURE &amp; SCOPE
              </span>
              <p className="font-space text-sm sm:text-base text-[hsl(230,30%,20%)] leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="bg-white border-2 border-[hsl(230,30%,14%)] riso-shadow-ink-sm p-5">
              <span className="font-space text-xs uppercase font-bold tracking-widest text-[hsl(230,30%,14%)] block mb-3 pb-2 border-b-2 border-[hsl(230,30%,14%)]">
                SPECIFICATION HIGHLIGHTS
              </span>
              <ul className="flex flex-col gap-2.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-space text-xs sm:text-sm text-[hsl(230,30%,20%)]">
                    <span className="text-[hsl(212,100%,45%)] font-bold">★</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <span className="font-space text-xs uppercase font-bold tracking-widest text-[hsl(230,12%,38%)] block mb-2">
                // TECH STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-space text-xs font-bold uppercase px-2.5 py-1 bg-white border border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t-2 border-[hsl(230,30%,14%)] mt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-riso-pink text-xs"
                >
                  View Code on GitHub →
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="btn-riso-outline text-xs"
              >
                Close Spec
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
