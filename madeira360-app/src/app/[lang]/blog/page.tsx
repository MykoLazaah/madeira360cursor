import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const PAGE_SIZE = 10

export default function BlogIndex({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams: { page?: string }
}) {
  const lang = params.lang
  if (!isLocale(lang)) notFound()

  const page = Math.max(1, Number(searchParams.page ?? '1') || 1)

  const posts = allBlogs
    .filter((p) => p.lang === lang)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)

  const slice = posts.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">
            {lang === 'de' ? 'Tipps, Routen und Angebote rund um Madeira.' : 'Tips, routes, and offers for Madeira.'}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {slice.map((post) => (
          <Link key={post._id} href={post.url} className="block">
            <Card className="p-6 hover:shadow-sm">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{new Date(post.date).toLocaleDateString(lang)}</span>
                <span>•</span>
                <span>{post.readingTime} min</span>
                {post.category ? (
                  <>
                    <span>•</span>
                    <Badge>{post.category}</Badge>
                  </>
                ) : null}
              </div>
              <div className="mt-2 text-xl font-semibold">{post.title}</div>
              <div className="mt-2 text-muted-foreground">{post.description}</div>
              {post.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 5).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              ) : null}
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between text-sm">
        <Link
          href={`/${lang}/blog?page=${Math.max(1, clampedPage - 1)}`}
          aria-disabled={clampedPage <= 1}
          className={clampedPage <= 1 ? 'pointer-events-none text-muted-foreground' : 'hover:underline'}
        >
          {lang === 'de' ? 'Zurück' : 'Previous'}
        </Link>
        <div className="text-muted-foreground">
          {clampedPage} / {totalPages}
        </div>
        <Link
          href={`/${lang}/blog?page=${Math.min(totalPages, clampedPage + 1)}`}
          aria-disabled={clampedPage >= totalPages}
          className={clampedPage >= totalPages ? 'pointer-events-none text-muted-foreground' : 'hover:underline'}
        >
          {lang === 'de' ? 'Weiter' : 'Next'}
        </Link>
      </div>
    </div>
  )
}
