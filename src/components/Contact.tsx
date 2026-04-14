import { motion } from 'framer-motion'
import { Mail, Linkedin, ArrowRight } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export function Contact() {
    return (
        <section id="contact" className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-center mx-auto max-w-3xl px-4 py-16 sm:px-6 text-center">
            <motion.div variants={container} initial="hidden" animate="show" className="mb-12">
                <motion.p variants={fadeUp} className="section-label mb-3" style={{ color: 'var(--color-text-tertiary)' }}>Get in touch</motion.p>
                <motion.h2 variants={fadeUp} className="text-3xl font-semibold sm:text-4xl mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    Let's build something together
                </motion.h2>
                <motion.p variants={fadeUp} className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    I work with companies that need a frontend or mobile architect who can own the entire product lifecycle — from architecture decisions to production.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: 0.2 }}
                className="card p-8 md:p-12 rounded-xl"
                style={{ borderColor: 'var(--color-accent-border)' }}
            >
                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8"
                    style={{
                        backgroundColor: 'var(--color-accent-dim)',
                        border: '1px solid var(--color-accent-border)',
                    }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>Available for new projects</span>
                </div>

                <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                    Whether it's a new product, scaling an existing one, or a mobile app from zero — reach out and let's talk.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href="mailto:themolinario@gmail.com"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold !no-underline transition-opacity hover:opacity-85"
                        style={{ backgroundColor: 'var(--color-bg-inverse)', color: 'var(--color-text-inverse)' }}
                    >
                        <Mail size={14} />
                        Send an email
                        <ArrowRight size={13} />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/marco-molinari-1a048a166/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold !no-underline transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]"
                        style={{
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        <Linkedin size={14} />
                        LinkedIn
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
