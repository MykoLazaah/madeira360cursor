import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale, LOCALES } from '@/lib/i18n'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { CookieConsent } from '@/components/CookieConsent'

export const metadata: Metadata = {
  title: {
    default: 'Madeira360',
    template: '%s | Madeira360',
  },
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { lang: string }
}) {
  if (!isLocale(params.lang)) notFound()
  const lang = params.lang as Locale

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} />
      <CookieConsent />
    </div>
  )
}
