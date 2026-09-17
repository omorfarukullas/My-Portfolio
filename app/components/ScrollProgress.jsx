"use client";

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setScrollProgress(Math.min(progress, 100));
      setIsVisible(scrollTop > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[110] h-[3px] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-[#e4e4d0]/40" />
      <motion.div
        className="h-full bg-[#1a1a1a] origin-left"
        style={{
          width: useTransform(smoothProgress, (value) => `${value}%`),
        }}
      />
    </motion.div>
  );
}
