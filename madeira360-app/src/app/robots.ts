import type { MetadataRoute } from 'next'

function baseUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return raw.replace(/\/$/, '')
}

export default function robots(): MetadataRoute.Robots {
  const base = baseUrl()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
