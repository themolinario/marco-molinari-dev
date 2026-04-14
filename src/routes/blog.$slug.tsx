import { createFileRoute, notFound } from '@tanstack/react-router'
import { MDXContent } from '@content-collections/mdx/react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useContext } from 'react'
import { TabContext } from './__root'
import { allBlogs } from 'content-collections'
import { SITE_URL } from '#/lib/site'
import { MdxCallout } from '#/components/MdxCallout'
import { MdxMetrics } from '#/components/MdxMetrics'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = Array.from(
      new Map(
        [...allBlogs]
          .sort(
            (a, b) =>
              new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf(),
          )
          .map((entry) => [entry.slug, entry]),
      ).values(),
    ).find((entry) => entry.slug === params.slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData, params }) => {
    const title = loaderData?.title ?? 'Post'
    const description = loaderData?.description ?? ''
    const image = loaderData?.heroImage ?? '/images/lagoon-1.svg'
    return {
      links: [{ rel: 'canonical', href: `${SITE_URL}/blog/${params.slug}` }],
      meta: [
        { title },
        { name: 'description', content: description },
        {
          property: 'og:image',
          content: image.startsWith('http') ? image : `${SITE_URL}${image}`,
        },
      ],
    }
  },
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()
  const { handleTabChange } = useContext(TabContext)

  return (
    <main className="relative w-full" style={{ color: 'var(--color-text-primary)' }}>
      <div className="relative z-10 mx-auto w-full min-h-[100dvh] pt-24 pb-16">
        <div className="page-wrap px-4 pb-12 max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            to="/"
            hash="blog"
            onClick={() => handleTabChange?.('Blog')}
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium no-underline transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>

          {/* Hero image */}
          {post.heroImage && (
            <img
              src={post.heroImage}
              alt=""
              className="mb-8 w-full rounded-2xl object-cover"
              style={{ height: '260px' }}
            />
          )}

          {/* Article header */}
          <div className="mb-10 pb-8" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            <p className="section-label mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              {new Date(post.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="display-title mb-4 font-semibold"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight: 'var(--line-height-tight)',
                letterSpacing: 'var(--letter-spacing-tight)',
                color: 'var(--color-text-primary)',
              }}>
              {post.title}
            </h1>
            {post.description && (
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {post.description}
              </p>
            )}
          </div>

          {/* Article body */}
          <div className="prose prose-slate max-w-none"
            style={{
              '--tw-prose-body': 'var(--color-text-secondary)',
              '--tw-prose-headings': 'var(--color-text-primary)',
              '--tw-prose-bold': 'var(--color-text-primary)',
              '--tw-prose-links': 'var(--color-accent)',
              '--tw-prose-code': 'var(--color-text-primary)',
              '--tw-prose-pre-bg': 'var(--color-bg-secondary)',
            } as React.CSSProperties}
          >
            {post.mdx ? (
              <MDXContent
                code={post.mdx}
                components={{ MdxCallout, MdxMetrics }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: post.html ?? '' }} />
            )}
          </div>

        </div>
      </div>
    </main>
  )
}
