import { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { ArrowRight, Circle } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
}

const metrics = [
    { to: 4, suffix: '+', label: 'years experience' },
    { to: 6, suffix: '+', label: 'production apps' },
    { to: 3, suffix: '',  label: 'enterprise clients' },
]

const clients = ['Eni Plenitude', 'A2A', 'MASAF', 'Strategy In Action', 'Cybersecurity S.r.l']

function CountUp({ to, suffix = '', delay = 0, started = false }: {
    to: number; suffix?: string; delay?: number; started?: boolean
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!started) return
        const controls = animate(0, to, {
            duration: 1.4,
            delay,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setValue(Math.round(v)),
        })
        return () => controls.stop()
    }, [started, to, delay])

    return (
        <div ref={ref} className="text-2xl sm:text-3xl font-bold font-sans mb-0.5 tabular-nums"
            style={{ color: 'var(--color-accent)' }}>
            {value}{suffix}
        </div>
    )
}

export function Hero({ onNavigate }: { onNavigate?: (tab: string) => void }) {
    const [countStarted, setCountStarted] = useState(false)

    return (
        <section className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-10 sm:px-6 sm:py-12">
            <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">

                {/* ── Text column ── */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                    {/* Avatar — mobile only */}
                    <motion.div variants={fadeUp} className="mb-7 lg:hidden">
                        <div className="relative inline-block">
                            <div className="absolute -inset-4 rounded-3xl"
                                style={{ background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.15) 0%, transparent 70%)' }} />
                            <div className="absolute -inset-[2px] rounded-2xl"
                                style={{ background: 'linear-gradient(135deg, var(--color-accent-border) 0%, transparent 50%, var(--color-accent-border) 100%)' }} />
                            <img
                                src="/images/marco.jpg"
                                alt="Marco Molinari"
                                className="relative rounded-2xl object-cover object-top"
                                style={{ width: '160px', height: '200px', border: '2px solid var(--color-bg-primary)' }}
                            />
                        </div>
                    </motion.div>

                    {/* Availability badge */}
                    <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
                        style={{ borderColor: 'var(--color-accent-border)', backgroundColor: 'var(--color-accent-dim)' }}>
                        <Circle size={7} className="fill-current" style={{ color: 'var(--color-accent)' }} />
                        <span className="text-xs font-medium" style={{ color: 'var(--color-accent)', letterSpacing: '0.04em' }}>
                            Available for new projects
                        </span>
                    </motion.div>

                    {/* Display title */}
                    <motion.h1
                        variants={fadeUp}
                        className="display-title mb-4 font-semibold"
                        style={{
                            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                            lineHeight: 'var(--line-height-tight)',
                            letterSpacing: 'var(--letter-spacing-tight)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        Marco Molinari
                    </motion.h1>

                    {/* Value proposition */}
                    <motion.p
                        variants={fadeUp}
                        className="mb-8 leading-relaxed"
                        style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                            maxWidth: '42ch',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}
                    >
                        Frontend & Mobile Architect. I help companies build scalable React
                        and React Native products — from architecture to production.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 w-full sm:w-auto">
                        <a
                            href="#experience"
                            onClick={(e) => { e.preventDefault(); onNavigate?.('Experience') }}
                            className="flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold !no-underline transition-opacity hover:opacity-85"
                            style={{ backgroundColor: 'var(--color-bg-inverse)', color: 'var(--color-text-inverse)' }}
                        >
                            See My Work
                            <ArrowRight size={15} />
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); onNavigate?.('Contact') }}
                            className="flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold !no-underline transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)]"
                            style={{
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            Get in touch
                        </a>
                    </motion.div>

                    {/* Metrics */}
                    <motion.div
                        variants={fadeUp}
                        className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 mb-7 pb-7 w-full"
                        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                        onAnimationComplete={() => setCountStarted(true)}
                    >
                        {metrics.map(({ to, suffix, label }, i) => (
                            <div key={label} className="text-center lg:text-left">
                                <CountUp to={to} suffix={suffix} delay={i * 0.1} started={countStarted} />
                                <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Trust strip */}
                    <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start gap-2.5 w-full">
                        <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Worked with
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 w-full">
                            {clients.map((name, i) => (
                                <span key={name} className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                    {name}{i < clients.length - 1 && (
                                        <span className="ml-4 opacity-20" style={{ color: 'var(--color-text-tertiary)' }}>·</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* ── Photo — desktop only ── */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    animate="show"
                    className="hidden lg:flex justify-center items-center"
                >
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.12) 0%, transparent 70%)' }} />
                        <div className="absolute -inset-[2px] rounded-3xl"
                            style={{ background: 'linear-gradient(135deg, var(--color-accent-border) 0%, transparent 50%, var(--color-accent-border) 100%)' }} />
                        <img
                            src="/images/marco.jpg"
                            alt="Marco Molinari"
                            className="relative rounded-3xl object-cover object-top"
                            style={{ width: '280px', height: '340px' }}
                        />
                        <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                            style={{
                                backgroundColor: 'var(--color-bg-elevated)',
                                border: '1px solid var(--color-accent-border)',
                                color: 'var(--color-accent)',
                            }}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                            Available
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
