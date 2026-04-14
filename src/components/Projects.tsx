import { motion } from 'framer-motion'
import { Github, ExternalLink, Smartphone } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const projects = [
    {
        name: 'SwipeSpark',
        tagline: 'iOS & Android app',
        description: 'A React Native app built from idea to production — architecture, UI, and store deployment, solo.',
        tags: ['React Native', 'Expo', 'TypeScript', 'iOS', 'Android'],
        appStore: 'https://apps.apple.com/it/app/swipespark/id6760660199',
        playStore: 'https://play.google.com/store/apps/details?id=com.themolinario.swipespark',
        accent: true,
    },
]

export function Projects() {
    return (
        <section id="projects" className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-center mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <motion.div variants={container} initial="hidden" animate="show" className="mb-14">
                <motion.p variants={fadeUp} className="section-label mb-3" style={{ color: 'var(--color-text-tertiary)' }}>Portfolio</motion.p>
                <motion.h2 variants={fadeUp} className="text-3xl font-semibold sm:text-4xl" style={{ color: 'var(--color-text-primary)' }}>
                    Projects
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-3 text-sm max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
                    Selected work. More on GitHub — architectures, open source, and experiments.
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Featured project: SwipeSpark */}
                {projects.map((project) => (
                    <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease, delay: 0.15 }}
                        className="card p-7 rounded-xl flex flex-col h-full"
                        style={project.accent ? {
                            borderColor: 'var(--color-accent-border)',
                        } : {}}
                    >
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                                style={{
                                    backgroundColor: 'var(--color-accent-dim)',
                                    border: '1px solid var(--color-accent-border)',
                                }}>
                                <Smartphone size={20} style={{ color: 'var(--color-accent)' }} />
                            </div>
                            <span className="text-xs mt-1 px-2 py-1 rounded-full font-medium"
                                style={{
                                    backgroundColor: 'var(--color-accent-dim)',
                                    color: 'var(--color-accent)',
                                    border: '1px solid var(--color-accent-border)',
                                }}>
                                Live on stores
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>{project.name}</h3>
                        <p className="text-xs mb-3" style={{ color: 'var(--color-accent)' }}>{project.tagline}</p>
                        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--color-text-secondary)' }}>{project.description}</p>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tags.map((tag) => (
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

                        <div className="flex flex-wrap gap-2">
                            <a
                                href={project.appStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium !no-underline transition-opacity hover:opacity-85"
                                style={{ backgroundColor: 'var(--color-bg-inverse)', color: 'var(--color-text-inverse)' }}
                            >
                                <ExternalLink size={13} />
                                App Store
                            </a>
                            <a
                                href={project.playStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium !no-underline transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]"
                                style={{
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                <ExternalLink size={13} />
                                Play Store
                            </a>
                        </div>
                    </motion.div>
                ))}

                {/* GitHub CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.25 }}
                    className="card p-7 rounded-xl flex flex-col items-start h-full"
                >
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl mb-4 shrink-0"
                        style={{
                            backgroundColor: 'var(--color-bg-elevated)',
                            border: '1px solid var(--color-border-strong)',
                        }}>
                        <Github size={20} style={{ color: 'var(--color-text-secondary)' }} />
                    </div>

                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Open Source</h3>
                    <p className="text-xs mb-3" style={{ color: 'var(--color-text-tertiary)' }}>github.com/themolinario</p>
                    <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                        React Native architectures, UI experiments, and side projects — built in public.
                    </p>

                    <a
                        href="https://github.com/themolinario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium !no-underline transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]"
                        style={{
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        <Github size={13} />
                        View GitHub Profile
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
