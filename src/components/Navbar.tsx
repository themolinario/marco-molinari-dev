import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

export function Navbar({ activeTab = 'Home', setActiveTab }: { activeTab?: string, setActiveTab?: (tab: string) => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = ['Home', 'Projects', 'Experience', 'Blog', 'About', 'Contact']

    const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
        e.preventDefault()
        if (setActiveTab) setActiveTab(tab)
        setIsMenuOpen(false)
    }

    const goHome = () => {
        if (setActiveTab) setActiveTab('Home')
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-12 border-b"
                style={{ backgroundColor: 'var(--color-bg-primary)', borderColor: 'var(--color-border)' }}>

                <button
                    onClick={goHome}
                    className="font-medium text-sm tracking-tight cursor-pointer bg-transparent border-none outline-none p-0 transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    Marco Molinari
                </button>

                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-7">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={(e) => handleTabClick(e, item)}
                            className={`nav-link ${activeTab === item ? 'is-active' : ''}`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Desktop theme toggle */}
                <div className="hidden md:flex items-center">
                    <ThemeToggle />
                </div>

                {/* Mobile: theme toggle + hamburger */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center w-8 h-8 rounded transition-colors cursor-pointer outline-none"
                        style={{
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-secondary)',
                        }}
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 z-50 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                        className="fixed top-0 right-0 bottom-0 w-[260px] border-l z-[60] md:hidden flex flex-col pt-16 px-6"
                        style={{ backgroundColor: 'var(--color-bg-primary)', borderColor: 'var(--color-border)' }}
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded transition-colors outline-none cursor-pointer"
                            style={{
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-secondary)',
                            }}
                            aria-label="Close Menu"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => handleTabClick(e, item)}
                                    className="py-2.5 px-3 rounded-md text-sm font-medium transition-colors"
                                    style={activeTab === item
                                        ? { color: 'var(--color-accent)', backgroundColor: 'var(--color-accent-dim)' }
                                        : { color: 'var(--color-text-secondary)' }
                                    }
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
