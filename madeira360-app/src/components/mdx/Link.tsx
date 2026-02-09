import Link from 'next/link'
import { ComponentProps } from 'react'

/**
 * Custom link component for MDX that automatically opens external links in a new tab.
 * Internal links use Next.js Link, external links use regular <a> with target="_blank".
 */
export function CustomLink({ href, children, ...props }: ComponentProps<'a'>) {
  if (!href) {
    return <a {...props}>{children}</a>
  }

  // Check if it's an external link
  const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  // Internal links use Next.js Link
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export default CustomLink

