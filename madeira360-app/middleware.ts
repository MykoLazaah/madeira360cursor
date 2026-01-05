import { NextResponse, type NextRequest } from 'next/server'

const LOCALES = new Set(['de', 'en'])
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'de'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip Next internals and API
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon')) {
    return NextResponse.next()
  }

  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, req.url))
  }

  const first = pathname.split('/')[1]
  const locale = LOCALES.has(first) ? first : DEFAULT_LOCALE

  // If path has no locale prefix, redirect to default-locale prefixed path
  if (!LOCALES.has(first)) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, req.url))
  }

  // Forward locale to server components (e.g. <html lang>)
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-lang', locale)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!.*\\..*).*)'],
}
