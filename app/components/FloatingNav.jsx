"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSoundEffects';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('up');
    const [lastScrollY, setLastScrollY] = useState(0);
    const [particles, setParticles] = useState([]);
    const { playSound } = useSound();

    // Simplified particles for performance - static or minimal movement
    useEffect(() => {
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Track scroll direction
            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }
            setLastScrollY(currentScrollY);

            // Check if scrolled
            setIsScrolled(currentScrollY > 50);

            // Detect active section
            const sections = navItems.map(item => item.href.substring(1));

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleNavClick = (e, href) => {
        playSound('click');
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);

        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        setIsMenuOpen(false);
    };

    const navHeight = scrollDirection === 'down' && isScrolled ? 70 : 85;
    const navOpacity = scrollDirection === 'down' && isScrolled ? 0.92 : 0.97;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{
                    y: 0,
                    height: navHeight,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="fixed top-0 left-0 right-0 z-50"
                aria-label="Main Navigation"
            >
                {/* Complex layered glassmorphism background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Base glass layer */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/90 via-[#0f0a1a]/85 to-[#0a0a0f]/90"
                        style={{
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            opacity: navOpacity,
                        }}
                    />

                    {/* Holographic scan lines */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)',
                        }}
                    />

                    {/* Scanning line removed for performance */}

                    {/* Floating particles in nav - simplified for Performance Mode */}
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute w-1 h-1 rounded-full opacity-30"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                background: particle.id % 2 === 0 ? '#8b5cf6' : '#06b6d4',
                            }}
                        />
                    ))}
                </div>

                {/* Top holographic border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-60" />

                {/* Bottom complex border */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyber-purple/50 via-neon-cyan/50 to-cyber-purple/50" />
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-full border-l-2 border-cyber-purple/30" />
                <div className="absolute top-0 right-0 w-20 h-full border-r-2 border-neon-cyan/30" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    {/* Logo with advanced effects */}
                    <motion.a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        onMouseEnter={() => playSound('hover')}
                        className="relative text-xl sm:text-2xl font-bold font-[family-name:var(--font-orbitron)] group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Glow background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/20 to-neon-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Text with multiple effects */}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Omor Faruck Ullas
                            </span>
                            {/* Glowing underline on hover */}
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-purple to-neon-cyan opacity-0 group-hover:opacity-100"
                                style={{
                                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
                                }}
                            />
                        </span>

                        {/* Tech brackets */}
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-cyber-purple/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity">{'<'}</span>
                        <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-neon-cyan/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity">{'>'}</span>
                    </motion.a>

                    {/* Desktop Navigation with advanced styling */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => {
                            const isActive = activeSection === item.href.substring(1);

                            return (
                                <motion.div
                                    key={item.name}
                                    className="relative"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.18, delay: index * 0.02, ease: 'easeOut' }}
                                >
                                    <motion.a
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        onMouseEnter={() => playSound('hover')}
                                        className="relative px-4 py-2 group"
                                        whileHover={{ y: -3 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                    >
                                        {/* Holographic background on hover/active */}
                                        <motion.div
                                            className="absolute inset-0 rounded-lg overflow-hidden"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            animate={{ opacity: isActive ? 1 : 0 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 to-neon-cyan/20 backdrop-blur-sm" />
                                            <motion.div
                                                className="absolute inset-0"
                                                animate={{
                                                    background: [
                                                        'linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                                                        'linear-gradient(225deg, transparent, rgba(6, 182, 212, 0.1), transparent)',
                                                        'linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                                                    ],
                                                }}
                                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                            />
                                        </motion.div>

                                        {/* Corner accents */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-purple/0 group-hover:border-cyber-purple/50 transition-colors" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan/0 group-hover:border-neon-cyan/50 transition-colors" />

                                        {/* Text */}
                                        <span className={`relative text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'text-neon-cyan font-semibold'
                                            : 'text-foreground/70 group-hover:text-foreground'
                                            }`}>
                                            {item.name}

                                            {/* Glitch effect on active */}
                                            {isActive && (
                                                <motion.span
                                                    className="absolute inset-0 text-cyber-purple"
                                                    animate={{
                                                        x: [0, -1, 1, 0],
                                                        opacity: [0, 0.5, 0.5, 0],
                                                    }}
                                                    transition={{
                                                        duration: 0.18,
                                                        ease: 'easeOut',
                                                    }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </span>

                                        {/* Advanced underline */}
                                        <motion.div
                                            className="absolute -bottom-1 left-1/2 h-[2px] overflow-hidden"
                                            initial={{ width: 0, x: '-50%' }}
                                            animate={{
                                                width: isActive ? '80%' : 0,
                                            }}
                                            whileHover={{ width: '80%' }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple"
                                                animate={{
                                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                                }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                style={{
                                                    backgroundSize: '200% 100%',
                                                    boxShadow: isActive ? '0 0 10px rgba(6, 182, 212, 0.8)' : 'none',
                                                }}
                                            />
                                        </motion.div>

                                        {/* Active glow */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-lg"
                                                animate={{
                                                    boxShadow: [
                                                        '0 0 20px rgba(6, 182, 212, 0.2)',
                                                        '0 0 30px rgba(6, 182, 212, 0.4)',
                                                        '0 0 20px rgba(6, 182, 212, 0.2)',
                                                    ],
                                                }}
                                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                            />
                                        )}
                                    </motion.a>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Advanced Mobile Hamburger */}
                    <motion.button
                        onClick={() => {
                            playSound('click');
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="md:hidden relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle Menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {/* Holographic background */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyber-purple/10 to-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Animated lines */}
                        <motion.span
                            animate={{
                                rotate: isMenuOpen ? 45 : 0,
                                y: isMenuOpen ? 8 : 0,
                            }}
                            className="w-7 h-0.5 rounded-full bg-gradient-to-r from-cyber-purple to-neon-cyan relative"
                            style={{
                                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                            }}
                        />
                        <motion.span
                            animate={{
                                opacity: isMenuOpen ? 0 : 1,
                                scaleX: isMenuOpen ? 0 : 1,
                            }}
                            className="w-7 h-0.5 rounded-full bg-gradient-to-r from-cyber-purple to-neon-cyan relative"
                            style={{
                                boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                            }}
                        />
                        <motion.span
                            animate={{
                                rotate: isMenuOpen ? -45 : 0,
                                y: isMenuOpen ? -8 : 0,
                            }}
                            className="w-7 h-0.5 rounded-full bg-gradient-to-r from-cyber-purple to-neon-cyan relative"
                            style={{
                                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                            }}
                        />
                    </motion.button>
                </div>

                {/* CSS for gradient animation */}
                <style jsx>{`
                    @keyframes gradient {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                    .animate-gradient {
                        animation: gradient 2s ease infinite;
                    }
                `}</style>
            </motion.nav>

            {/* Advanced Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Enhanced Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-40 md:hidden"
                            style={{
                                backdropFilter: 'blur(10px)',
                                background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0.8))',
                            }}
                        />

                        {/* Menu Panel with advanced styling */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="fixed top-0 right-0 bottom-0 w-full z-50 md:hidden overflow-hidden"
                            id="mobile-menu"
                        >
                            {/* Complex background layers */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0a1a] to-[#0a0f1a]" />
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                            {/* Scan lines */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139, 92, 246, 0.05) 3px, rgba(139, 92, 246, 0.05) 6px)',
                                }}
                            />

                            {/* Animated gradient overlay */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    background: [
                                        'linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                                        'linear-gradient(180deg, transparent 50%, rgba(6, 182, 212, 0.1) 100%)',
                                        'linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Border effects */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-purple via-neon-cyan to-cyber-purple" />

                            <div className="relative flex flex-col items-start p-8 pt-24 space-y-6">
                                {navItems.map((item, index) => {
                                    const isActive = activeSection === item.href.substring(1);

                                    return (
                                        <motion.div
                                            key={item.name}
                                            className="relative w-full"
                                            initial={{ opacity: 0, x: 50, y: -10 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                y: 0
                                            }}
                                            transition={{
                                                delay: index * 0.1,
                                                type: 'spring',
                                                stiffness: 200,
                                                damping: 20
                                            }}
                                        >
                                            <motion.a
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                whileHover={{ x: 10, y: -3 }}
                                                className="relative block"
                                            >
                                                {/* Background glow on active */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="mobileActiveBackground"
                                                        className="absolute inset-0 -left-4 -right-4 bg-gradient-to-r from-cyber-purple/20 to-neon-cyan/20 rounded-lg"
                                                        style={{
                                                            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                                                        }}
                                                    />
                                                )}

                                                <span className={`relative text-lg font-medium transition-colors ${isActive
                                                    ? 'text-neon-cyan font-bold'
                                                    : 'text-foreground/70'
                                                    }`}>
                                                    {item.name}
                                                </span>

                                                {/* Active indicator */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="mobileActiveIndicator"
                                                        className="absolute -left-6 top-1/2 flex items-center gap-1"
                                                        initial={{ scale: 0, y: '-50%' }}
                                                        animate={{ scale: 1, y: '-50%' }}
                                                    >
                                                        <motion.div
                                                            className="w-3 h-3 rounded-full bg-neon-cyan"
                                                            animate={{
                                                                boxShadow: [
                                                                    '0 0 10px rgba(6, 182, 212, 0.8)',
                                                                    '0 0 20px rgba(6, 182, 212, 1)',
                                                                    '0 0 10px rgba(6, 182, 212, 0.8)',
                                                                ],
                                                            }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        />
                                                        <motion.div
                                                            className="w-1 h-1 rounded-full bg-cyber-purple"
                                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        />
                                                    </motion.div>
                                                )}

                                                {/* Tech decoration */}
                                                <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-cyber-purple/30 text-xs font-mono">
                                                    {`0${index + 1}`}
                                                </span>
                                            </motion.a>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
