'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

const KEY = 'madeira360_cookie_consent_v1'

export function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(KEY)
      if (!v) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          We use essential cookies/localStorage for basic functionality and UTM attribution.
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(KEY, 'accepted')
              } catch {}
              setOpen(false)
            }}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}
