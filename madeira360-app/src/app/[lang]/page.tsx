import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { isLocale } from '@/lib/i18n'
import { LeadForm } from '@/components/LeadForm'
import { Card } from '@/components/ui/Card'

export default function Landing({ params }: { params: { lang: string } }) {
  const lang = params.lang
  if (!isLocale(lang)) return null

  const latest = allBlogs
    .filter((p) => p.lang === lang)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">Madeira360</h1>
          <p className="text-muted-foreground text-lg">
            {lang === 'de'
              ? 'Dein Guide für Madeira: Tipps, Blog und lokale Angebote.'
              : 'Your Madeira guide: tips, blog, and local offers.'}
          </p>
          <div className="flex gap-3">
            <Link className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground" href={`/${lang}/blog`}>
              {lang === 'de' ? 'Zum Blog' : 'Go to blog'}
            </Link>
          </div>
        </div>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">{lang === 'de' ? 'Updates per Email' : 'Get updates by email'}</h2>
          <p className="text-muted-foreground mt-1">
            {lang === 'de' ? 'Kostenlos, jederzeit abbestellbar.' : 'Free, unsubscribe anytime.'}
          </p>
          <div className="mt-4">
            <LeadForm lang={lang} source="website" />
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{lang === 'de' ? 'Neueste Posts' : 'Latest posts'}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {latest.map((post) => (
            <Link key={post._id} href={post.url} className="block">
              <Card className="h-full p-5 hover:shadow-sm">
                <div className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString(lang)}</div>
                <div className="mt-2 font-semibold">{post.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{post.description}</div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
