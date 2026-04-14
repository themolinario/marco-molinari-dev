import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const coreSkills = [
    'React', 'React Native', 'TypeScript', 'Next.js', 'Expo',
]

const skills = [
    'JavaScript', 'HTML & CSS', 'React Hooks', 'Node.js',
    'Zustand', 'Redux', 'AWS (EC2, S3, Lambda)',
    'Git', 'Docker', 'Agile / Scrum', 'Linux', 'Jira', 'Vue.js',
]

const education = [
    {
        degree: "Master's — Computer Engineering",
        field: 'Cybersecurity & Cloud Computing',
        institution: 'Politecnico di Bari',
        date: 'Apr 2023 — Oct 2025',
    },
    {
        degree: "Bachelor's — Computer & Automation Engineering",
        field: '',
        institution: 'Politecnico di Bari',
        date: 'Sep 2019 — Apr 2023',
    },
]

const certifications = [
    { name: 'Claude 101',                          url: 'https://verify.skilljar.com/c/n4beupk4a2jy' },
    { name: 'AI Fluency: Framework & Foundations', url: 'https://verify.skilljar.com/c/799twt35a93v' },
    { name: 'Introduction to Claude Code',         url: 'https://verify.skilljar.com/c/g44nyyqyrmb3' },
    { name: 'Claude Code in Action',               url: 'https://verify.skilljar.com/c/ptjmnq588g7f' },
    { name: 'Introduction to Subagents',           url: 'https://verify.skilljar.com/c/82a6rnhhwfqm' },
    { name: 'Introduction to Agent Skills',        url: 'https://verify.skilljar.com/c/vrzzvaeknk6i' },
    { name: 'Introduction to Model Context Protocol', url: 'https://verify.skilljar.com/c/mmom7amn93t8' },
]

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export function About() {
    return (
        <section id="about" className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-center mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <motion.div variants={container} initial="hidden" animate="show" className="mb-14">
                <motion.p variants={fadeUp} className="section-label mb-3" style={{ color: 'var(--color-text-tertiary)' }}>Info & Skills</motion.p>
                <motion.h2 variants={fadeUp} className="text-3xl font-semibold sm:text-4xl" style={{ color: 'var(--color-text-primary)' }}>
                    About & Education
                </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.1 }}
                    className="card p-7 rounded-xl"
                >
                    <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Core Expertise</h3>
                    <p className="text-xs mb-4" style={{ color: 'var(--color-text-tertiary)' }}>Primary stack — what I architect and lead</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {coreSkills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded px-3 py-1.5 text-xs font-semibold"
                                style={{
                                    backgroundColor: 'var(--color-accent-dim)',
                                    border: '1px solid var(--color-accent-border)',
                                    color: 'var(--color-accent)',
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <p className="text-xs mb-4" style={{ color: 'var(--color-text-tertiary)' }}>Additional toolkit</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded px-3 py-1.5 text-xs font-medium cursor-default"
                                style={{
                                    backgroundColor: 'var(--color-bg-primary)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <p className="mt-7 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Specialized in React Native architecture and enterprise-grade frontend systems.
                        Currently completing a Master's in Cybersecurity & Cloud Computing.
                    </p>
                </motion.div>

                {/* Education & Languages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.18 }}
                    className="card p-7 rounded-xl flex flex-col justify-between"
                >
                    <div>
                        <h3 className="mb-5 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Education</h3>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <div key={idx} className="relative pl-5 border-l" style={{ borderColor: 'var(--color-border)' }}>
                                    <div
                                        className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full"
                                        style={{
                                            backgroundColor: idx === 0 ? 'var(--color-accent-dim)' : 'var(--color-bg-elevated)',
                                            border: `1.5px solid ${idx === 0 ? 'var(--color-accent-border)' : 'var(--color-border-strong)'}`,
                                        }}
                                    />
                                    <span className="block text-xs mb-1" style={{ color: 'var(--color-text-tertiary)' }}>{edu.date}</span>
                                    <h4 className="text-sm font-medium leading-snug" style={{ color: 'var(--color-text-primary)' }}>{edu.degree}</h4>
                                    {edu.field && (
                                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-accent)' }}>{edu.field}</p>
                                    )}
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 pt-7" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                        <h3 className="mb-4 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Languages</h3>
                        <div className="flex gap-8">
                            {[['IT', 'Native'], ['EN', 'B2 / C1'], ['DE', 'B1']].map(([lang, level]) => (
                                <div key={lang}>
                                    <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{lang}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{level}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Certifications — full width */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: 0.26 }}
                className="card p-7 rounded-xl"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Certifications</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>Issued by Anthropic Academy · click to verify</p>
                    </div>
                    <img
                        src="/images/anthropic-logo.svg"
                        alt="Anthropic"
                        className="h-4 opacity-40"
                        style={{ filter: 'invert(1)' }}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {certifications.map((cert) => (
                        <a
                            key={cert.url}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-3 rounded-lg px-4 py-3.5 !no-underline transition-all hover:scale-[1.01]"
                            style={{
                                backgroundColor: 'var(--color-bg-primary)',
                                border: '1px solid var(--color-border-strong)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent-border)')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border-strong)')}
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                {/* Certificate badge dot */}
                                <span className="h-1.5 w-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: 'var(--color-accent)' }} />
                                <span className="text-xs font-medium leading-snug"
                                    style={{ color: 'var(--color-text-secondary)' }}>
                                    {cert.name}
                                </span>
                            </div>
                            <ExternalLink size={12} className="shrink-0 transition-colors"
                                style={{ color: 'var(--color-text-tertiary)' }} />
                        </a>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
