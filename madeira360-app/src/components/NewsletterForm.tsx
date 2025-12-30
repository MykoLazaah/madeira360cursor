'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { captureUtmFromUrl, getStoredUtm, type UTM } from '@/lib/utm'

export function NewsletterForm({ lang }: { lang: 'de' | 'en' }) {
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
        email: 'deine email',
        submit: 'Updates erhalten',
        success: 'Danke! Bitte prüfe deine Email.',
        error: 'Ups — bitte später nochmal versuchen.',
      }
    }
    return {
      email: 'your email',
      submit: 'Subscribe',
      success: 'Thanks! Please check your email.',
      error: 'Oops — please try again later.',
    }
  }, [lang])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          lang,
          utm,
          payload: { page: window.location.pathname },
        }),
      })

      if (!res.ok) throw new Error('bad_status')
      setStatus('success')
      setEmail('') // Clear email on success
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={copy.email}
        type="email"
        required
        autoComplete="email"
        disabled={status === 'loading'}
        className="bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-slate-600"
      />
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="bg-primary hover:opacity-90 text-white w-full justify-center"
      >
        {copy.submit}
      </Button>
      {status === 'success' && (
        <div className="text-sm text-green-400">{copy.success}</div>
      )}
      {status === 'error' && (
        <div className="text-sm text-red-400">{copy.error}</div>
      )}
      {/* keep utm in DOM for debugging */}
      <input type="hidden" name="utm_source" value={utm.utm_source ?? ''} readOnly />
    </form>
  )
}

