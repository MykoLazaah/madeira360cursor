import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allBlogs } from 'contentlayer/generated'
import { isLocale } from '@/lib/i18n'
import { Callout } from '@/components/mdx/Callout'
import { CTA } from '@/components/mdx/CTA'
import { TourCard } from '@/components/mdx/TourCard'
import Link from 'next/link'

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Blog post header (copied structure from template, content is dynamic; no map, no comments) */}
      <section
        className="relative table w-full items-center py-36 bg-top bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/images/hero-madeira.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white font-heading">{post.title}</h3>
            <ul className="list-none mt-6">
              <li className="inline-block text-white/50 mx-5">
                <span className="text-white block">{lang === 'de' ? 'Autor:' : 'Author :'}</span>
                <span className="block">Madeira360</span>
              </li>
              <li className="inline-block text-white/50 mx-5">
                <span className="text-white block">{lang === 'de' ? 'Datum:' : 'Date :'}</span>
                <span className="block">{new Date(post.date).toLocaleDateString(lang)}</span>
              </li>
              <li className="inline-block text-white/50 mx-5">
                <span className="text-white block">{lang === 'de' ? 'Dauer:' : 'Time :'}</span>
                <span className="block">{post.readingTime} Min Read</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href={`/${lang}`}>Madeira360</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5">›</li>
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href={`/${lang}/blog`}>Blog</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5">›</li>
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">
              {lang === 'de' ? 'Artikel' : 'Post'}
            </li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
            <div className="lg:col-span-8 md:col-span-7">
              <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                <img src={post.cover ?? '/images/hero-madeira.webp'} alt="" className="w-full h-[420px] object-cover" />
                <div className="p-6">
                  <p className="text-slate-400 mb-5">{post.description}</p>
                  <div className="prose prose-zinc max-w-none dark:prose-invert">
                    <MDXContent components={{ Callout, CTA, TourCard }} />
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 md:col-span-5">
              <div className="sticky top-20">
                <h5 className="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center font-heading">
                  {lang === 'de' ? 'Autor' : 'Author'}
                </h5>
                <div className="text-center mt-8 p-6 rounded-md shadow dark:shadow-gray-800">
                  <div className="mx-auto size-20 rounded-full bg-accent/30 flex items-center justify-center text-slate-900 dark:text-white font-heading">
                    M
                  </div>
                  <h5 className="mt-4 font-semibold font-heading">Madeira360</h5>
                  <p className="text-slate-400 mt-2">
                    {lang === 'de'
                      ? 'Platzhaltertext: kurze Autorenbeschreibung.'
                      : 'Placeholder: short author description.'}
                  </p>
                  <div className="mt-4">
                    <Link href={`/${lang}/blog`} className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md w-full">
                      {lang === 'de' ? 'Zur Übersicht' : 'Back to blog'}
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
