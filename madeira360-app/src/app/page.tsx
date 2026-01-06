'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'de'

  useEffect(() => {
    // Delay to ensure GTM loads before redirect
    // GTM needs time to initialize and send page view
    const timer = setTimeout(() => {
      router.push(`/${defaultLocale}`)
    }, 500)
    return () => clearTimeout(timer)
  }, [router, defaultLocale])

  return null
}
