import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

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
          <Link href={`/${lang}`} className="flex items-center">
            <Image
              src="/images/logo-madeira360.svg"
              alt="Madeira360"
              width={200}
              height={50}
              priority
              className="h-10 w-auto"
            />
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

            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </div>
    </nav>
  )
}
