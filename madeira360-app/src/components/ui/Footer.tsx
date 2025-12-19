import Link from 'next/link'
import { type Locale } from '@/lib/i18n'

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Madeira360</div>
        <div className="flex gap-4">
          <Link href={`/${lang}/privacy`} className="hover:text-foreground">
            Privacy
          </Link>
          <Link href={`/${lang}/terms`} className="hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
