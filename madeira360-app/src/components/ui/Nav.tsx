import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

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
          <LanguageSwitcher lang={lang} />
        </nav>
      </div>
    </header>
  )
}
