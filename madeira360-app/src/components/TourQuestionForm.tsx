'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function TourQuestionForm({
  lang,
  tourId,
  tourTitle,
}: {
  lang: 'de' | 'en'
  tourId: string
  tourTitle: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [question, setQuestion] = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const copy = {
    title: lang === 'de' ? 'Frage stellen' : 'Ask a Question',
    nameLabel: lang === 'de' ? 'Name' : 'Name',
    emailLabel: lang === 'de' ? 'E-Mail' : 'Email',
    questionLabel: lang === 'de' ? 'Ihre Frage' : 'Your Question',
    submit: lang === 'de' ? 'Absenden' : 'Send',
    success: lang === 'de' ? 'Vielen Dank! Ihre Frage wurde gesendet.' : 'Thank you! Your question has been sent.',
    error: lang === 'de' ? 'Fehler. Bitte versuchen Sie es später erneut.' : 'Error. Please try again later.',
    emailInvalid: lang === 'de' ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' : 'Please enter a valid email address',
    questionRequired: lang === 'de' ? 'Bitte geben Sie Ihre Frage ein' : 'Please enter your question',
    sending: lang === 'de' ? 'Wird gesendet...' : 'Sending...',
  }

  function validateEmail(value: string) {
    if (!value) {
      setEmailError('')
      return false
    }
    if (!isValidEmail(value)) {
      setEmailError(copy.emailInvalid)
      return false
    }
    setEmailError('')
    return true
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    // Validate email
    if (!validateEmail(email)) {
      return
    }

    // Validate question
    if (!question.trim()) {
      setErrorMessage(copy.questionRequired)
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/tour-question', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name || undefined,
          email,
          question: question.trim(),
          tourId,
          tourTitle,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'server_error')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setQuestion('')
      setEmailError('')
    } catch (_error) {
      setStatus('error')
      setErrorMessage(copy.error)
    }
  }

  return (
    <Card className="p-6">
      <h5 className="text-lg font-semibold font-heading mb-4">{copy.title}</h5>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            {copy.nameLabel}
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.nameLabel}
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            {copy.emailLabel} <span className="text-red-500">*</span>
          </label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) {
                validateEmail(e.target.value)
              }
            }}
            onBlur={() => validateEmail(email)}
            type="email"
            placeholder={copy.emailLabel}
            required
            autoComplete="email"
            className={emailError ? 'border-red-500' : ''}
          />
          {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            {copy.questionLabel} <span className="text-red-500">*</span>
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={copy.questionLabel}
            required
            rows={5}
            className="w-full rounded-[var(--radius-base)] border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
          />
        </div>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {status === 'success' && <p className="text-sm text-green-600">{copy.success}</p>}

        <Button type="submit" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? copy.sending : copy.submit}
        </Button>
      </form>
    </Card>
  )
}

