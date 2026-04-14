import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { ArrowRight } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export function Blog() {
    const postsByDate = Array.from(
        new Map(
            [...allBlogs]
                .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf())
                .map((post) => [post.slug, post]),
        ).values(),
    )
    const visiblePosts = postsByDate.slice(0, 3)

    return (
        <section id="blog" className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-start mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <motion.div variants={container} initial="hidden" animate="show" className="mb-14">
                <motion.p variants={fadeUp} className="section-label mb-3" style={{ color: 'var(--color-text-tertiary)' }}>Writing</motion.p>
                <motion.h2 variants={fadeUp} className="text-3xl font-semibold sm:text-4xl" style={{ color: 'var(--color-text-primary)' }}>
                    Blog
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-3 text-sm max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
                    Thoughts, experiments, and deep dives into technology, AI, and modern web development.
                </motion.p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {visiblePosts.length > 0 ? visiblePosts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease }}
                        className="h-full"
                    >
                        <Link
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="block h-full no-underline"
                        >
                            <div className="card h-full flex flex-col p-6 rounded-xl overflow-hidden group">
                                {post.heroImage ? (
                                    <div className="w-full h-44 mb-5 overflow-hidden rounded-lg shrink-0"
                                        style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
                                        <img
                                            src={post.heroImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
                                        />
                                    </div>
                                ) : (
                                    /* Placeholder so cards without image keep same height */
                                    <div className="w-full h-44 mb-5 rounded-lg shrink-0 flex items-center justify-center"
                                        style={{
                                            backgroundColor: 'var(--color-bg-elevated)',
                                            border: '1px solid var(--color-border)',
                                        }}>
                                        <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Post</span>
                                    </div>
                                )}

                                <p className="text-xs mb-2 font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
                                    {new Date(post.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>

                                <h3 className="text-sm font-semibold mb-2 line-clamp-2 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                                    {post.title}
                                </h3>

                                <p className="text-xs mb-5 line-clamp-3 flex-grow leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                    {post.description}
                                </p>

                                <div className="mt-auto flex items-center gap-1 text-xs font-medium transition-colors"
                                    style={{ color: 'var(--color-accent)' }}>
                                    Read
                                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )) : (
                    <div className="col-span-full py-16 text-center text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                        No articles published yet. Check back soon.
                    </div>
                )}
            </div>
        </section>
    )
}
