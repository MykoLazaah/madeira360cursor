'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type Locale } from '@/lib/i18n'

type Props = {
  lang: Locale
}

export function LanguageSwitcher({ lang }: Props) {
  const pathname = usePathname()
  const [paths, setPaths] = useState<{ de: string; en: string } | null>(null)

  useEffect(() => {
    // Extract blog slug if on a blog post page
    const blogPostMatch = pathname.match(/\/(de|en)\/blog\/(.+)$/)
    const currentSlug = blogPostMatch ? blogPostMatch[2] : null

    // For blog posts, fetch related paths from API
    if (currentSlug) {
      Promise.all([
        lang !== 'de'
          ? fetch(`/api/related-blog?slug=${encodeURIComponent(currentSlug)}&lang=${lang}&targetLang=de&pathname=${encodeURIComponent(pathname)}`).then((res) => res.json()).then((data) => data.path).catch(() => '/de/blog')
          : Promise.resolve(pathname),
        lang !== 'en'
          ? fetch(`/api/related-blog?slug=${encodeURIComponent(currentSlug)}&lang=${lang}&targetLang=en&pathname=${encodeURIComponent(pathname)}`).then((res) => res.json()).then((data) => data.path).catch(() => '/en/blog')
          : Promise.resolve(pathname),
      ]).then(([dePath, enPath]) => {
        setPaths({ de: dePath, en: enPath })
      })
    } else {
      // For non-blog pages, calculate paths immediately
      const segments = pathname.split('/').filter(Boolean)
      const getLocalizedPath = (newLang: Locale): string => {
        if (segments[0] === lang) {
          const pathWithoutLang = segments.slice(1).join('/')
          return pathWithoutLang ? `/${newLang}/${pathWithoutLang}` : `/${newLang}`
        }
        return `/${newLang}${pathname}`
      }
      setPaths({ de: getLocalizedPath('de'), en: getLocalizedPath('en') })
    }
  }, [pathname, lang])

  // Calculate fallback paths for initial render
  const getLocalizedPath = (newLang: Locale): string => {
    // Use cached paths if available
    if (paths) {
      return paths[newLang]
    }

    // Fallback calculation
    const segments = pathname.split('/').filter(Boolean)
    if (segments[0] === lang) {
      const pathWithoutLang = segments.slice(1).join('/')
      return pathWithoutLang ? `/${newLang}/${pathWithoutLang}` : `/${newLang}`
    }
    return `/${newLang}${pathname}`
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={getLocalizedPath('de')}
        className={lang === 'de' ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}
      >
        DE
      </Link>
      <span className="text-muted-foreground">/</span>
      <Link
        href={getLocalizedPath('en')}
        className={lang === 'en' ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}
      >
        EN
      </Link>
    </div>
  )
}

