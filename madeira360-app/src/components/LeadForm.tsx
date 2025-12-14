'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { captureUtmFromUrl, getStoredUtm, type UTM } from '@/lib/utm'

export function LeadForm({
  lang,
  source,
}: {
  lang: 'de' | 'en'
  source: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [utm, setUtm] = useState<UTM>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Capture once on mount
    captureUtmFromUrl()
    setUtm(getStoredUtm())
  }, [])

  const copy = useMemo(() => {
    if (lang === 'de') {
      return {
        name: 'Name (optional)',
        email: 'Email',
        submit: 'Anmelden',
        success: 'Danke! Bitte prüfe deine Email.',
        error: 'Ups — bitte später nochmal versuchen.',
      }
    }
    return {
      name: 'Name (optional)',
      email: 'Email',
      submit: 'Subscribe',
      success: 'Thanks! Please check your email.',
      error: 'Oops — please try again later.',
    }
  }, [lang])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name || null,
          email,
          lang,
          source,
          utm,
          payload: { page: window.location.pathname },
        }),
      })

      if (!res.ok) throw new Error('bad_status')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-2 md:grid-cols-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={copy.name} autoComplete="name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={copy.email} type="email" required autoComplete="email" />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === 'loading'}>
          {copy.submit}
        </Button>
        {status === 'success' && <span className="text-sm text-muted-foreground">{copy.success}</span>}
        {status === 'error' && <span className="text-sm text-red-600">{copy.error}</span>}
      </div>
      {/* keep utm in DOM for debugging */}
      <input type="hidden" name="utm_source" value={utm.utm_source ?? ''} readOnly />
    </form>
  )
}
