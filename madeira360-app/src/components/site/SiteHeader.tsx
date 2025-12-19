import Link from 'next/link'
import { type Locale } from '@/lib/i18n'

type Props = {
  lang: Locale
}

export function SiteHeader({ lang }: Props) {
  return (
    <nav
      id="topnav"
      className="m360-topnav sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur"
    >
      <div className="container relative">
        <div className="flex items-center justify-between py-4">
          <Link href={`/${lang}`} className="text-lg font-semibold tracking-tight font-heading">
            Madeira360
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-primary">
              Home
            </Link>
            <Link href={`/${lang}/blog`} className="hover:text-primary">
              Blog
            </Link>
            <Link href={`/${lang}/offers`} className="hover:text-primary">
              Offers
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/de"
                className={lang === 'de' ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}
              >
                DE
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href="/en"
                className={lang === 'en' ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}
              >
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
