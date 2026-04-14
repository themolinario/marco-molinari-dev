import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const experiences = [
    {
        role: 'Software Engineer',
        company: 'Strategy In Action',
        location: 'Bari (London-based), Italy',
        date: 'Jan 2025 — Present',
        current: true,
        highlights: ['React', 'TypeScript', 'Vue.js'],
        description: [
            'Developing a business strategy consulting product with React and TypeScript.',
            'Building web applications with Vue.js, ensuring responsive and maintainable design.',
            'Delivering high-quality frontend features on schedule in an international environment.',
        ],
    },
    {
        role: 'Frontend & Mobile Architect',
        company: 'Cybersecurity S.r.l',
        location: 'Bari, Italy',
        date: 'Apr 2023 — Jan 2025',
        current: false,
        highlights: ['React Native', 'Next.js', 'Expo'],
        clients: ['A2A', 'Eni Plenitude', 'MASAF'],
        description: [
            'Advanced from Frontend Developer to Frontend/Mobile Architect, leading design and implementation of React Native and Expo applications.',
            'Coordinated frontend development for enterprise clients — A2A, Eni Plenitude, MASAF — managing teams of 2–3 developers and delivering production-ready solutions.',
            'Designed scalable architectures using Next.js, React Native Expo, Axios, Zustand, and Redux.',
            'Created a custom charting library in React Native, replacing FusionCharts in a major production system.',
            'Mentored colleagues and conducted internal training on React, React Native, and modern JavaScript practices.',
        ],
    },
    {
        role: 'Frontend & React Native Developer',
        company: 'Honeyside',
        location: 'Bari, Italy',
        date: 'Jul 2022 — Mar 2023',
        current: false,
        highlights: ['React Native', 'JavaScript'],
        description: [
            'Contributed to frontend development of mobile applications for iOS and Android.',
            'Built reusable UI components in React Native, ensuring cross-platform consistency.',
            'First professional experience with modern frontend development in JavaScript-based frameworks.',
        ],
    },
]

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export function Experience() {
    return (
        <section id="experience" className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-center mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <motion.div variants={container} initial="hidden" animate="show" className="mb-14">
                <motion.p variants={fadeUp} className="section-label mb-3" style={{ color: 'var(--color-text-tertiary)' }}>Career</motion.p>
                <motion.h2 variants={fadeUp} className="text-3xl font-semibold sm:text-4xl" style={{ color: 'var(--color-text-primary)' }}>
                    Professional Experience
                </motion.h2>
            </motion.div>

            <div className="relative border-l ml-0 md:ml-2 space-y-8" style={{ borderColor: 'var(--color-border)' }}>
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + idx * 0.1, ease }}
                        className="relative pl-7 md:pl-10"
                    >
                        {/* Timeline dot — amber for current, dim for past */}
                        <div
                            className="absolute -left-[5px] top-[22px] h-2.5 w-2.5 rounded-full"
                            style={{
                                backgroundColor: exp.current ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                                border: `1.5px solid ${exp.current ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
                                boxShadow: exp.current ? '0 0 8px rgba(200, 169, 110, 0.4)' : 'none',
                            }}
                        />

                        <div className="card p-6 sm:p-7 rounded-xl">
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>{exp.role}</h3>
                                        {exp.current && (
                                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                style={{
                                                    backgroundColor: 'var(--color-accent-dim)',
                                                    color: 'var(--color-accent)',
                                                    border: '1px solid var(--color-accent-border)',
                                                }}>
                                                Now
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                        {exp.company}
                                        <span style={{ color: 'var(--color-text-tertiary)' }}> · {exp.location}</span>
                                    </p>
                                </div>
                                <span className="text-xs shrink-0 mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{exp.date}</span>
                            </div>

                            {/* Client names — key credibility signal highlighted in amber */}
                            {exp.clients && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Clients:</span>
                                    {exp.clients.map((client) => (
                                        <span key={client} className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
                                            {client}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <ul className="space-y-2.5 mb-5">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                        <span className="mr-2.5 mt-[9px] h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-border-strong)' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {exp.highlights.map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-0.5 rounded"
                                        style={{
                                            backgroundColor: 'var(--color-bg-primary)',
                                            border: '1px solid var(--color-border)',
                                            color: 'var(--color-text-tertiary)',
                                        }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
