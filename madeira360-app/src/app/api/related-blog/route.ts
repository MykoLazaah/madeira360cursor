import { NextRequest, NextResponse } from 'next/server'
import { findRelatedBlogPost } from '@/lib/blog-utils'
import { isLocale, type Locale } from '@/lib/i18n'

/**
 * API endpoint for finding related blog posts when switching languages.
 * 
 * NOTE: This is a temporary solution. The blog post matching logic (date + cover image)
 * may need to be refactored in the future if blog schema changes or if we need
 * more explicit translation linking.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const currentSlug = searchParams.get('slug')
  const currentLang = searchParams.get('lang')
  const targetLang = searchParams.get('targetLang')
  const pathname = searchParams.get('pathname')

  if (!currentSlug || !currentLang || !targetLang || !pathname) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  if (!isLocale(currentLang) || !isLocale(targetLang)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  // Check if this is a blog post page
  const blogPostMatch = pathname.match(/\/(de|en)\/blog\/(.+)$/)
  
  if (blogPostMatch && blogPostMatch[2] === currentSlug) {
    const relatedPath = findRelatedBlogPost(currentSlug, currentLang as Locale, targetLang as Locale)
    if (relatedPath) {
      return NextResponse.json({ path: relatedPath })
    }
    // If no related post found, fall back to blog index
    return NextResponse.json({ path: `/${targetLang}/blog` })
  }

  // For non-blog pages, do standard language switching
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === currentLang) {
    const pathWithoutLang = segments.slice(1).join('/')
    const newPath = pathWithoutLang ? `/${targetLang}/${pathWithoutLang}` : `/${targetLang}`
    return NextResponse.json({ path: newPath })
  }

  return NextResponse.json({ path: `/${targetLang}${pathname}` })
}

