import { useEffect, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Opening title sequence.
 * Seven acts, ~4.6s total, then the curtain splits vertically to reveal the site.
 * Shown once per session on `/`. Respects prefers-reduced-motion.
 */

const ease = [0.22, 1, 0.36, 1] as const
const easeCurtain = [0.76, 0, 0.24, 1] as const

const NAME = 'MARCO MOLINARI'
const KICKER = 'Frontend · Architect · 2026'

const CORNER = 26 // px — size of the L-brackets around the photo
const CORNER_INSET = 14 // px — how far outside the photo they sit

const EXIT_AT = 3200 // ms — start curtain split
const DONE_AT = 4600 // ms — unmount intro

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
    const reduced = useReducedMotion()
    const [isExiting, setIsExiting] = useState(false)

    const finish = useCallback(() => {
        setIsExiting(true)
        window.setTimeout(onComplete, 1400)
    }, [onComplete])

    useEffect(() => {
        if (reduced) {
            onComplete()
            return
        }
        const t1 = window.setTimeout(() => setIsExiting(true), EXIT_AT)
        const t2 = window.setTimeout(onComplete, DONE_AT)
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Enter') finish()
        }
        window.addEventListener('keydown', onKey)
        return () => {
            window.clearTimeout(t1)
            window.clearTimeout(t2)
            window.removeEventListener('keydown', onKey)
        }
    }, [reduced, onComplete, finish])

    if (reduced) return null

    return (
        <div
            className="fixed inset-0 z-[100] pointer-events-none"
            role="presentation"
            aria-hidden="true"
        >
            {/* ── Curtain — top half ── */}
            <motion.div
                className="absolute inset-x-0 top-0"
                style={{ height: '50%', backgroundColor: 'var(--color-bg-primary)' }}
                initial={{ y: 0 }}
                animate={{ y: isExiting ? '-101%' : 0 }}
                transition={{ duration: 1.2, ease: easeCurtain, delay: isExiting ? 0.3 : 0 }}
            />
            {/* ── Curtain — bottom half ── */}
            <motion.div
                className="absolute inset-x-0 bottom-0"
                style={{ height: '50%', backgroundColor: 'var(--color-bg-primary)' }}
                initial={{ y: 0 }}
                animate={{ y: isExiting ? '101%' : 0 }}
                transition={{ duration: 1.2, ease: easeCurtain, delay: isExiting ? 0.3 : 0 }}
            />

            {/* ── Split seam — a thin amber line along the center that flashes on separation ── */}
            <motion.div
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
                style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--color-accent) 50%, transparent)',
                    filter: 'blur(0.5px)',
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={
                    isExiting
                        ? { opacity: [0, 1, 0], scaleX: 1, transition: { duration: 1.2, times: [0, 0.25, 1], ease } }
                        : { opacity: 0, scaleX: 0 }
                }
            />

            {/* ── Ambient vignette ── */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,169,110,0.14) 0%, transparent 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 0 : 1 }}
                transition={{ duration: 1.0, ease, delay: isExiting ? 0 : 0.1 }}
            />

            {/* ── Center stage ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                {/* Photo block with brackets */}
                <motion.div
                    className="relative"
                    style={{ width: 'clamp(220px, 26vw, 300px)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isExiting
                            ? { opacity: 0, scale: 1.15, y: -8, filter: 'blur(6px)' }
                            : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                    }
                    transition={{
                        duration: isExiting ? 0.7 : 0.9,
                        ease,
                        delay: isExiting ? 0 : 0.2,
                    }}
                >
                    {/* Corner brackets — animate in from the inside out */}
                    <CornerBrackets />

                    {/* Photo with clip-path wipe reveal */}
                    <div
                        className="relative overflow-hidden"
                        style={{ aspectRatio: '4 / 5', borderRadius: '4px' }}
                    >
                        <motion.img
                            src="/images/marco.jpg"
                            alt=""
                            className="h-full w-full object-cover object-top"
                            draggable={false}
                            initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 }}
                            animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                            transition={{ duration: 1.3, ease, delay: 0.85 }}
                        />

                        {/* Subtle grain / warm wash on top of the photo */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(180deg, rgba(200,169,110,0.08) 0%, transparent 40%, rgba(12,12,12,0.35) 100%)',
                                mixBlendMode: 'overlay',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.0, delay: 1.1, ease }}
                        />

                        {/* Vertical amber scan line sweeping across */}
                        <motion.div
                            className="absolute top-0 bottom-0"
                            style={{
                                width: '1px',
                                background: 'var(--color-accent)',
                                boxShadow:
                                    '0 0 18px 2px var(--color-accent), 0 0 36px 4px rgba(200,169,110,0.5)',
                            }}
                            initial={{ left: '-4%', opacity: 0 }}
                            animate={{ left: '104%', opacity: [0, 1, 1, 0] }}
                            transition={{
                                duration: 1.1,
                                ease,
                                delay: 1.25,
                                times: [0, 0.15, 0.85, 1],
                            }}
                        />
                    </div>
                </motion.div>

                {/* Title — per-character blur-rise stagger */}
                <div
                    className="mt-10 flex overflow-hidden"
                    style={{ paddingBlock: '0.2em' }}
                >
                    {NAME.split('').map((ch, i) => (
                        <motion.span
                            key={`${ch}-${i}`}
                            className="display-title"
                            style={{
                                fontSize: 'clamp(1.4rem, 3.8vw, 2.6rem)',
                                fontWeight: 500,
                                letterSpacing: '0.18em',
                                color: 'var(--color-text-primary)',
                                display: 'inline-block',
                                whiteSpace: 'pre',
                            }}
                            initial={{ y: '115%', opacity: 0, filter: 'blur(10px)' }}
                            animate={
                                isExiting
                                    ? {
                                        y: '-115%',
                                        opacity: 0,
                                        filter: 'blur(6px)',
                                        transition: {
                                            duration: 0.55,
                                            ease: easeCurtain,
                                            delay: i * 0.02,
                                        },
                                    }
                                    : {
                                        y: '0%',
                                        opacity: 1,
                                        filter: 'blur(0px)',
                                        transition: {
                                            duration: 0.85,
                                            ease,
                                            delay: 1.7 + i * 0.045,
                                        },
                                    }
                            }
                        >
                            {ch}
                        </motion.span>
                    ))}
                </div>

                {/* Kicker — amber line · text · amber line */}
                <motion.div
                    className="mt-5 flex items-center gap-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                        isExiting
                            ? { opacity: 0, y: -4, transition: { duration: 0.4, ease } }
                            : { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 2.6 } }
                    }
                >
                    <motion.span
                        className="block"
                        style={{ height: '1px', backgroundColor: 'var(--color-accent)', transformOrigin: 'right' }}
                        initial={{ scaleX: 0, width: '2.5rem' }}
                        animate={isExiting ? { scaleX: 0 } : { scaleX: 1 }}
                        transition={{ duration: 0.6, ease, delay: isExiting ? 0 : 2.75 }}
                    />
                    <span
                        className="section-label"
                        style={{
                            color: 'var(--color-accent)',
                            letterSpacing: '0.28em',
                            fontSize: '0.7rem',
                        }}
                    >
                        {KICKER}
                    </span>
                    <motion.span
                        className="block"
                        style={{ height: '1px', backgroundColor: 'var(--color-accent)', transformOrigin: 'left' }}
                        initial={{ scaleX: 0, width: '2.5rem' }}
                        animate={isExiting ? { scaleX: 0 } : { scaleX: 1 }}
                        transition={{ duration: 0.6, ease, delay: isExiting ? 0 : 2.75 }}
                    />
                </motion.div>
            </div>

            {/* Skip button */}
            <button
                type="button"
                onClick={finish}
                className="absolute top-6 right-6 pointer-events-auto cursor-pointer bg-transparent border-none outline-none uppercase transition-opacity"
                style={{
                    color: 'var(--color-text-tertiary)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.24em',
                    padding: '6px 10px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-tertiary)')}
            >
                Skip →
            </button>
        </div>
    )
}

/** Four L-shaped corner brackets that draw in around the photo. */
function CornerBrackets() {
    const base = {
        backgroundColor: 'var(--color-accent)',
    }
    const inset = -CORNER_INSET

    const commonDelay = 0.5

    return (
        <>
            {/* Top-left corner */}
            <motion.div
                aria-hidden
                className="absolute"
                style={{ top: inset, left: inset, width: CORNER, height: 1, ...base, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay }}
            />
            <motion.div
                aria-hidden
                className="absolute"
                style={{ top: inset, left: inset, width: 1, height: CORNER, ...base, transformOrigin: 'top' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay + 0.05 }}
            />

            {/* Top-right corner */}
            <motion.div
                aria-hidden
                className="absolute"
                style={{ top: inset, right: inset, width: CORNER, height: 1, ...base, transformOrigin: 'right' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay }}
            />
            <motion.div
                aria-hidden
                className="absolute"
                style={{ top: inset, right: inset, width: 1, height: CORNER, ...base, transformOrigin: 'top' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay + 0.05 }}
            />

            {/* Bottom-left corner */}
            <motion.div
                aria-hidden
                className="absolute"
                style={{ bottom: inset, left: inset, width: CORNER, height: 1, ...base, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay }}
            />
            <motion.div
                aria-hidden
                className="absolute"
                style={{ bottom: inset, left: inset, width: 1, height: CORNER, ...base, transformOrigin: 'bottom' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay + 0.05 }}
            />

            {/* Bottom-right corner */}
            <motion.div
                aria-hidden
                className="absolute"
                style={{ bottom: inset, right: inset, width: CORNER, height: 1, ...base, transformOrigin: 'right' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay }}
            />
            <motion.div
                aria-hidden
                className="absolute"
                style={{ bottom: inset, right: inset, width: 1, height: CORNER, ...base, transformOrigin: 'bottom' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease, delay: commonDelay + 0.05 }}
            />
        </>
    )
}
