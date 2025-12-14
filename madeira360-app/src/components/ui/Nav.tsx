import Link from 'next/link'
import { type Locale } from '@/lib/i18n'

export function Nav({ lang }: { lang: Locale }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href={`/${lang}`} className="font-semibold tracking-tight">
          Madeira360
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href={`/${lang}/blog`} className="text-muted-foreground hover:text-foreground">
            Blog
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/de${lang === 'de' ? '' : ''}`} className={lang === 'de' ? 'font-semibold' : 'text-muted-foreground'}>
              DE
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/en${lang === 'en' ? '' : ''}`} className={lang === 'en' ? 'font-semibold' : 'text-muted-foreground'}>
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
