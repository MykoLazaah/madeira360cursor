import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allBlogs } from 'contentlayer/generated'
import { isLocale } from '@/lib/i18n'
import { Callout } from '@/components/mdx/Callout'
import { CTA } from '@/components/mdx/CTA'
import { TourCard } from '@/components/mdx/TourCard'

export function generateStaticParams() {
  return allBlogs.map((post) => ({ lang: post.lang, slug: post.slug }))
}

function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL
  if (!base) return path
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const { lang, slug } = params
  if (!isLocale(lang)) return {}

  const post = allBlogs.find((p) => p.lang === lang && p.slug === slug)
  if (!post) return {}

  const canonical = absoluteUrl(post.url)

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
      languages: {
        de: absoluteUrl(`/de/blog/${slug}`),
        en: absoluteUrl(`/en/blog/${slug}`),
      },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: canonical,
      images: post.cover ? [{ url: absoluteUrl(post.cover) }] : undefined,
      locale: lang,
    },
  }
}

export default function BlogPost({ params }: { params: { lang: string; slug: string } }) {
  const { lang, slug } = params
  if (!isLocale(lang)) notFound()

  const post = allBlogs.find((p) => p.lang === lang && p.slug === slug)
  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    inLanguage: lang,
    datePublished: post.date,
    mainEntityOfPage: absoluteUrl(post.url),
    image: post.cover ? absoluteUrl(post.cover) : undefined,
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-8">
        <div className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString(lang)}</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
      </header>

      <div className="prose prose-zinc max-w-none dark:prose-invert">
        <MDXContent components={{ Callout, CTA, TourCard }} />
      </div>
    </article>
  )
}
