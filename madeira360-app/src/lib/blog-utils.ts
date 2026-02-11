import { allBlogs } from 'contentlayer/generated'
import { type Locale } from './i18n'

export function findRelatedBlogPost(currentSlug: string, currentLang: Locale, targetLang: Locale): string | null {
  const currentPost = allBlogs.find((p) => p.lang === currentLang && p.slug === currentSlug)
  
  if (!currentPost) return null

  // 1) Prefer matching by a simple heuristic on slug: if slugs are the same except
  // for language-specific wording, many posts in this project still share a
  // very similar slug pattern across locales. Try exact slug match first.
  let relatedPost = allBlogs.find((p) => p.lang === targetLang && p.slug === currentPost.slug)

  // 2) Fallback: match by date + cover image (legacy behaviour)
  if (!relatedPost) {
    relatedPost = allBlogs.find(
      (p) =>
        p.lang === targetLang &&
        p.date === currentPost.date &&
        p.cover === currentPost.cover
    )
  }
  
  if (relatedPost) {
    return `/${targetLang}/blog/${relatedPost.slug}`
  }
  
  // If no exact match found, return null to fall back to blog index
  return null
}

