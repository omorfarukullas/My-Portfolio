'use client';

import Link from 'next/link';
import {
    SiPython, SiCplusplus, SiOpenjdk, SiJavascript, SiTypescript,
    SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiTailwindcss,
    SiMysql, SiPostgresql, SiSupabase,
    SiPytorch, SiTensorflow, SiHuggingface,
    SiRaspberrypi, SiGit, SiGithub
} from 'react-icons/si';
import { RADIUS, TapeStrip, Thumbtack, StickyTag, HandDrawnDivider } from './HandDrawn';

const techStack = [
    {
        category: 'Languages',
        icon: '💻',
        color: 'yellow' as const,
        rotate: -1,
        skills: [
            { name: 'Python', icon: <SiPython /> },
            { name: 'C / C++', icon: <SiCplusplus /> },
            { name: 'Java', icon: <SiOpenjdk /> },
            { name: 'JavaScript', icon: <SiJavascript /> },
            { name: 'TypeScript', icon: <SiTypescript /> },
        ],
    },
    {
        category: 'AI / ML & NLP',
        icon: '🧠',
        color: 'coral' as const,
        rotate: 1,
        skills: [
            { name: 'PyTorch', icon: <SiPytorch /> },
            { name: 'TensorFlow', icon: <SiTensorflow /> },
            { name: 'Hugging Face', icon: <SiHuggingface /> },
            { name: 'Low-Resource NLP', icon: <span>🧬</span> },
            { name: 'Dataset Construction', icon: <span>📊</span> },
        ],
    },
    {
        category: 'Web & Backend',
        icon: '🌐',
        color: 'blue' as const,
        rotate: -0.5,
        skills: [
            { name: 'React', icon: <SiReact /> },
            { name: 'Next.js', icon: <SiNextdotjs /> },
            { name: 'Node.js', icon: <SiNodedotjs /> },
            { name: 'FastAPI', icon: <SiFastapi /> },
            { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        ],
    },
    {
        category: 'Data & Databases',
        icon: '🗄️',
        color: 'green' as const,
        rotate: 1.5,
        skills: [
            { name: 'MySQL', icon: <SiMysql /> },
            { name: 'PostgreSQL', icon: <SiPostgresql /> },
            { name: 'Supabase', icon: <SiSupabase /> },
        ],
    },
    {
        category: 'Embedded & IoT',
        icon: '⚡',
        color: 'orange' as const,
        rotate: -1.2,
        skills: [
            { name: 'ESP32 (C++)', icon: <span>📟</span> },
            { name: 'Raspberry Pi', icon: <SiRaspberrypi /> },
            { name: 'Sensors & Hardware', icon: <span>☀️</span> },
        ],
    },
    {
        category: 'Tools & Workflow',
        icon: '🛠️',
        color: 'yellow' as const,
        rotate: 0.8,
        skills: [
            { name: 'Git', icon: <SiGit /> },
            { name: 'GitHub', icon: <SiGithub /> },
            { name: 'Linux / Bash', icon: <span>🐧</span> },
        ],
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="section" style={{ borderTop: '3px solid #2d2d2d' }}>
            <div className="container">

                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <StickyTag color="yellow" rotate={-1.5} style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                        📖 About Me & Research
                    </StickyTag>
                    <h2 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        color: '#2d2d2d',
                        fontFamily: 'Kalam, cursive',
                        lineHeight: 1.15,
                        marginBottom: '0.75rem',
                    }}>
                        Researcher, Developer & Maker
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '620px',
                        margin: '0 auto',
                        fontFamily: 'Patrick Hand, cursive',
                    }}>
                        Turning messy real-world data into systems that actually work — across low-resource AI, full stack web apps, and embedded IoT.
                    </p>
                </div>

                {/* Top Grid: Bio Card + Research Spotlight */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '4rem',
                }}>
                    {/* Bio Notebook Card */}
                    <div
                        style={{
                            position: 'relative',
                            background: '#ffffff',
                            border: '3px solid #2d2d2d',
                            borderRadius: RADIUS.wobbly,
                            padding: '2.25rem 2rem',
                            boxShadow: '6px 6px 0px 0px #2d2d2d',
                            transform: 'rotate(-0.8deg)',
                        }}
                    >
                        <TapeStrip rotate={-1} />
                        <h3 style={{
                            fontFamily: 'Kalam, cursive',
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            color: '#2d2d2d',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}>
                            <span>🎓</span> Academic & Vision
                        </h3>
                        <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: '#333333', marginBottom: '1.25rem' }}>
                            I&apos;m a Computer Science & Engineering undergraduate at <strong>United International University (UIU)</strong> in Dhaka, Bangladesh.
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: '#333333', marginBottom: '1.25rem' }}>
                            My primary research and engineering focus centers on <strong>AI/ML</strong>, <strong>Natural Language Processing (NLP)</strong> with emphasis on <strong>Low-Resource Language Processing (Bangla)</strong>, and building robust end-to-end software systems.
                        </p>

                        <div style={{
                            background: 'var(--bg-postit)',
                            border: '2px dashed #2d2d2d',
                            borderRadius: RADIUS.wobblySm,
                            padding: '0.85rem 1.1rem',
                            fontFamily: 'Patrick Hand, cursive',
                            fontSize: '1.1rem',
                            color: '#2d2d2d',
                            transform: 'rotate(0.5deg)',
                        }}>
                            💡 <strong>Core philosophy:</strong> Real impact happens when sound research principles meet pragmatic software engineering.
                        </div>
                    </div>

                    {/* Research Spotlight Card (Speech Bubble Post-It) */}
                    <div
                        style={{
                            position: 'relative',
                            background: 'var(--bg-postit)',
                            border: '3px solid #2d2d2d',
                            borderRadius: RADIUS.wobblyMd,
                            padding: '2.25rem 2rem',
                            boxShadow: '6px 6px 0px 0px #2d2d2d',
                            transform: 'rotate(1.2deg)',
                        }}
                    >
                        <Thumbtack color="#ff4d4d" />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <StickyTag color="coral" rotate={-1}>
                                🧬 Research Spotlight
                            </StickyTag>
                            <span style={{
                                fontFamily: 'Patrick Hand, cursive',
                                fontSize: '0.95rem',
                                color: 'var(--accent)',
                                fontWeight: 700,
                            }}>
                                [In Progress]
                            </span>
                        </div>

                        <h3 style={{
                            fontFamily: 'Kalam, cursive',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '0.75rem',
                            color: '#2d2d2d',
                            lineHeight: 1.25,
                        }}>
                            Coordinated Propaganda Detection in Low-Resource Bangla
                        </h3>

                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#333333', marginBottom: '1rem' }}>
                            Investigating whether coordinated propaganda campaigns can be automatically detected in Bangla using digital online media data.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#333333', marginBottom: '1.25rem' }}>
                            Collaborating with a dedicated team to build an open Bangla propaganda dataset and evaluate transformer-based detection architectures across noisy, low-resource contexts.
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {['Bangla NLP', 'Dataset Construction', 'Transformer Models', 'Social Network Analysis'].map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        fontSize: '0.9rem',
                                        background: '#ffffff',
                                        border: '1.5px solid #2d2d2d',
                                        borderRadius: RADIUS.wobblySm,
                                        padding: '0.15rem 0.55rem',
                                        fontFamily: 'Patrick Hand, cursive',
                                        fontWeight: 600,
                                    }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Currently Building & Exploring Checklist */}
                <div
                    style={{
                        position: 'relative',
                        background: '#ffffff',
                        border: '3px solid #2d2d2d',
                        borderRadius: RADIUS.wobbly,
                        padding: '2.5rem 2rem',
                        boxShadow: '6px 6px 0px 0px #2d2d2d',
                        marginBottom: '4.5rem',
                    }}
                >
                    <TapeStrip rotate={-1.5} />
                    <h3 style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.85rem',
                        fontWeight: 700,
                        color: '#2d2d2d',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        textDecoration: 'underline wavy var(--accent)',
                        textUnderlineOffset: '6px',
                    }}>
                        🔭 Currently Building &amp; Exploring
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        {[
                            {
                                icon: '🔬',
                                title: 'Bangla Propaganda Research',
                                text: 'Constructing datasets and evaluating detection models for coordinated disinformation in low-resource Bangla.',
                            },
                            {
                                icon: '☀️',
                                title: 'HelioSense ESP32 IoT',
                                text: 'Real-time smart solar panel monitoring system with sensor telemetry and environmental tracking.',
                            },
                            {
                                icon: '🧠',
                                title: 'Applied NLP & AI Deep Dive',
                                text: 'Deepening focus on tokenizer optimization, embedding representations, and fine-tuning small LLMs.',
                            },
                            {
                                icon: '🤝',
                                title: 'Collaborative Projects',
                                text: 'Always excited to connect for research discussions, open source contributions, or applied software engineering.',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    background: 'var(--bg-elevated)',
                                    border: '2px solid #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    padding: '1.25rem',
                                    boxShadow: '3px 3px 0px #2d2d2d',
                                    transform: i % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)',
                                    transition: 'transform 0.15s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = i % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                    <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                                    <h4 style={{ fontFamily: 'Kalam, cursive', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                                        {item.title}
                                    </h4>
                                </div>
                                <p style={{ fontSize: '1.05rem', color: '#444444', margin: 0, lineHeight: 1.5 }}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <HandDrawnDivider />

                {/* Tech Stack Categories Grid */}
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <StickyTag color="green" rotate={1} style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                            🛠️ Toolkit &amp; Technologies
                        </StickyTag>
                        <h3 style={{
                            fontFamily: 'Kalam, cursive',
                            fontSize: '2.2rem',
                            fontWeight: 700,
                            color: '#2d2d2d',
                        }}>
                            Tools of the Craft
                        </h3>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                    }}>
                        {techStack.map((group) => (
                            <div
                                key={group.category}
                                style={{
                                    position: 'relative',
                                    background: '#ffffff',
                                    border: '2.5px solid #2d2d2d',
                                    borderRadius: RADIUS.wobbly,
                                    padding: '1.75rem 1.5rem',
                                    boxShadow: '4px 4px 0px 0px #2d2d2d',
                                    transform: `rotate(${group.rotate}deg)`,
                                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px) rotate(0deg)';
                                    e.currentTarget.style.boxShadow = '8px 8px 0px 0px #2d2d2d';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = `rotate(${group.rotate}deg)`;
                                    e.currentTarget.style.boxShadow = '4px 4px 0px 0px #2d2d2d';
                                }}
                            >
                                <Thumbtack color={group.color === 'coral' ? '#ff4d4d' : group.color === 'blue' ? '#2d5da1' : '#ffb703'} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1.25rem', borderBottom: '2px dashed #2d2d2d', paddingBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '1.35rem' }}>{group.icon}</span>
                                    <h4 style={{
                                        fontFamily: 'Kalam, cursive',
                                        fontSize: '1.35rem',
                                        fontWeight: 700,
                                        color: '#2d2d2d',
                                        margin: 0,
                                    }}>
                                        {group.category}
                                    </h4>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {group.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                padding: '0.35rem 0.75rem',
                                                background: 'var(--bg-elevated)',
                                                border: '1.5px solid #2d2d2d',
                                                borderRadius: RADIUS.wobblySm,
                                                boxShadow: '2px 2px 0px #2d2d2d',
                                                fontSize: '1rem',
                                                fontFamily: 'Patrick Hand, cursive',
                                                fontWeight: 600,
                                                color: '#2d2d2d',
                                            }}
                                        >
                                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>{skill.icon}</span>
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link href="/projects" className="btn-sketch" style={{ fontSize: '1.25rem', padding: '0.75rem 2.25rem' }}>
                        📂 View All Projects &amp; Demos →
                    </Link>
                </div>
            </div>
        </section>
    );
}
