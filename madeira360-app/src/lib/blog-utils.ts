import { allBlogs } from 'contentlayer/generated'
import { type Locale } from './i18n'

/**
 * Finds the corresponding blog post in a different language
 * by matching date and cover image.
 * 
 * NOTE: This is a temporary solution for linking blog posts between languages.
 * Currently uses date + cover image matching, which may not be reliable in all cases.
 * Consider adding an explicit "relatedPost" or "translationId" field to the blog schema
 * in the future for more robust cross-language linking.
 */
export function findRelatedBlogPost(currentSlug: string, currentLang: Locale, targetLang: Locale): string | null {
  const currentPost = allBlogs.find((p) => p.lang === currentLang && p.slug === currentSlug)
  
  if (!currentPost) return null
  
  // Try to find a post with the same date and cover image
  const relatedPost = allBlogs.find(
    (p) =>
      p.lang === targetLang &&
      p.date === currentPost.date &&
      p.cover === currentPost.cover
  )
  
  if (relatedPost) {
    return `/${targetLang}/blog/${relatedPost.slug}`
  }
  
  // If no exact match found, return null to fall back to blog index
  return null
}

