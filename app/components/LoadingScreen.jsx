"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaveformPill } from './WisprPrimitives';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if visited before
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (hasVisited) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('hasVisitedPortfolio', 'true');
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        onClick={() => {
          setIsVisible(false);
          localStorage.setItem('hasVisitedPortfolio', 'true');
          onComplete?.();
        }}
        className="fixed inset-0 z-[999] bg-[#ffffeb] text-[#1a1a1a] flex flex-col items-center justify-center p-6 cursor-pointer select-none"
        style={{ fontFamily: 'var(--font-figtree)' }}
      >
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          {/* Waveform accent */}
          <WaveformPill />

          {/* Wordmark in EB Garamond 400 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1
              className="text-4xl sm:text-5xl text-[#1a1a1a] tracking-tight"
              style={{ fontFamily: 'var(--font-eb-garamond)', fontWeight: 400 }}
            >
              Omor Faruk Ullas
            </h1>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#8a8a80] mt-2">
              Research &amp; Systems Architecture
            </p>
          </motion.div>

          {/* Minimal Editorial Progress Rail */}
          <div className="w-48 h-1 bg-[#e4e4d0] rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-[#1a1a1a] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <span className="text-xs text-[#8a8a80]">
            Click anywhere to enter
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
