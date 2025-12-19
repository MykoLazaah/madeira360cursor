import type { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'

function baseUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return raw.replace(/\/$/, '')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/de`, lastModified: new Date() },
    { url: `${base}/en`, lastModified: new Date() },
    { url: `${base}/de/blog`, lastModified: new Date() },
    { url: `${base}/en/blog`, lastModified: new Date() },
    { url: `${base}/de/privacy`, lastModified: new Date() },
    { url: `${base}/en/privacy`, lastModified: new Date() },
    { url: `${base}/de/terms`, lastModified: new Date() },
    { url: `${base}/en/terms`, lastModified: new Date() },
  ]

  const posts: MetadataRoute.Sitemap = allBlogs.map((p) => ({
    url: `${base}${p.url}`,
    lastModified: new Date(p.date),
  }))

  return [...staticRoutes, ...posts]
}
