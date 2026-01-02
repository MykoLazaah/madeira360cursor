'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { captureUtmFromUrl, getStoredUtm, type UTM } from '@/lib/utm'
import { cn } from '@/lib/cn'

export function TripPlanningForm({
  lang,
}: {
  lang: 'de' | 'en'
}) {
  const [email, setEmail] = useState('')
  const [travelDate1, setTravelDate1] = useState('')
  const [travelDate2, setTravelDate2] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isInterestsOpen, setIsInterestsOpen] = useState(false)
  const [utm, setUtm] = useState<UTM>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const interestsDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    captureUtmFromUrl()
    setUtm(getStoredUtm())
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (interestsDropdownRef.current && !interestsDropdownRef.current.contains(event.target as Node)) {
        setIsInterestsOpen(false)
      }
    }

    if (isInterestsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isInterestsOpen])

  const copy = useMemo(() => {
    if (lang === 'de') {
      return {
        tagline: 'Persönliche Reiseplanung',
        heading: 'Plane deine Madeira-Reise mit Sicherheit',
        description: 'Erhalte praktische Tipps, Wetterinfos und Tour-Empfehlungen passend zu deinen Reisedaten.',
        emailLabel: 'E-Mail-Adresse',
        emailPlaceholder: 'du@email.de',
        emailHelper: '',
        travelDate1Label: 'Geplanter Reisebeginn',
        travelDate1Placeholder: 'Ankunftsdatum',
        travelDate2Label: 'Geplantes Reiseende',
        travelDate2Placeholder: 'Abreisedatum',
        travelDatesHelper: 'Optional — hilft uns, Wettertipps und saisonale Empfehlungen zu teilen.',
        travelDatesFormat: 'Format: TT.MM.JJJJ',
        interestsLabel: 'Deine Interessen',
        interestsPlaceholder: 'Wähle deine Interessen (eine oder mehr)',
        interestsHelper: '',
        interests: [
          'Natur & Wanderungen',
          'Strände & Entspannung',
          'Panoramastrecken & Roadtrips',
          'Essen & Wein',
          'Aktiv & Abenteuer',
          'Familienfreundlich',
        ],
        submit: 'Reise planen',
        success: 'Danke! Wir senden dir bald personalisierte Tipps und Empfehlungen per E-Mail.',
        error: 'Etwas ist schiefgelaufen. Bitte versuche es später erneut.',
      }
    }
    return {
      tagline: 'Personal trip planning',
      heading: 'Plan your Madeira trip with confidence',
      description: 'Get practical tips, weather insights and tour ideas tailored to your travel plans.',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@email.com',
      emailHelper: '',
      travelDate1Label: 'Start date (approx.)',
      travelDate1Placeholder: 'Arrival date',
      travelDate2Label: 'End date (approx.)',
      travelDate2Placeholder: 'Departure date',
      travelDatesHelper: 'Optional — helps us share weather tips and seasonal recommendations.',
      travelDatesFormat: 'Format: MM/DD/YYYY',
      interestsLabel: 'Your interests',
      interestsPlaceholder: "Select what you're interested in",
      interestsHelper: '',
      interests: [
        'Nature & hikes',
        'Beaches & relax',
        'Scenic road trips',
        'Food & wine',
        'Active & adventure',
        'Family-friendly',
      ],
      submit: 'Start planning',
      success: "Thanks! We'll send you personalised tips and recommendations by email soon.",
      error: 'Something went wrong. Please try again in a moment.',
    }
  }, [lang])

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      // Format interests as comma-separated string
      const interestsString = selectedInterests.length > 0 ? selectedInterests.join(', ') : ''

      const res = await fetch('/api/trip-planning', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          travel_date_1: travelDate1 || null,
          travel_date_2: travelDate2 || null,
          interests: interestsString || null,
          locale: lang,
          utm,
        }),
      })

      if (!res.ok) throw new Error('bad_status')
      setStatus('success')
      // Reset form on success
      setEmail('')
      setTravelDate1('')
      setTravelDate2('')
      setSelectedInterests([])
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
          {copy.emailLabel}
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.emailPlaceholder}
          required
          autoComplete="email"
          className="w-full"
        />
        {copy.emailHelper && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{copy.emailHelper}</p>}
      </div>

      {/* Travel dates fields */}
      <div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="travel_date_1" className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
              {copy.travelDate1Label}
            </label>
            <Input
              id="travel_date_1"
              type="date"
              value={travelDate1}
              onChange={(e) => setTravelDate1(e.target.value)}
              placeholder={copy.travelDate1Placeholder}
              autoComplete="off"
              className="w-full"
              lang={lang}
            />
          </div>
          <div>
            <label htmlFor="travel_date_2" className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
              {copy.travelDate2Label}
            </label>
            <Input
              id="travel_date_2"
              type="date"
              value={travelDate2}
              onChange={(e) => setTravelDate2(e.target.value)}
              placeholder={copy.travelDate2Placeholder}
              autoComplete="off"
              className="w-full"
              min={travelDate1 || undefined}
              lang={lang}
            />
          </div>
        </div>
        <div className="mt-1">
          {copy.travelDatesFormat && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{copy.travelDatesFormat}</p>
          )}
          {copy.travelDatesHelper && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{copy.travelDatesHelper}</p>
          )}
        </div>
      </div>

      {/* Interests field */}
      <div ref={interestsDropdownRef} className="relative">
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
          {copy.interestsLabel}
        </label>
        <button
          type="button"
          onClick={() => setIsInterestsOpen(!isInterestsOpen)}
          className={cn(
            'h-10 w-full rounded-[var(--radius-base)] border border-border bg-background px-3 text-left text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'flex items-center justify-between',
            'text-slate-900 dark:text-slate-200',
            selectedInterests.length === 0 && 'text-muted-foreground'
          )}
        >
          <span className={selectedInterests.length === 0 ? 'text-muted-foreground' : ''}>
            {selectedInterests.length === 0
              ? copy.interestsPlaceholder
              : selectedInterests.length === 1
              ? selectedInterests[0]
              : `${selectedInterests.length} ${lang === 'de' ? 'ausgewählt' : 'selected'}`}
          </span>
          <svg
            className={cn(
              'h-4 w-4 transition-transform',
              isInterestsOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isInterestsOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-[var(--radius-base)] border border-border bg-background shadow-lg max-h-60 overflow-auto">
            <div className="p-1">
              {copy.interests.map((interest) => (
                <label
                  key={interest}
                  className={cn(
                    'flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors',
                    selectedInterests.includes(interest) && 'bg-slate-100 dark:bg-slate-800'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedInterests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {copy.interestsHelper && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{copy.interestsHelper}</p>}
      </div>

      {/* Submit button and status */}
      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? (lang === 'de' ? 'Wird gesendet...' : 'Sending...') : copy.submit}
        </Button>
        {status === 'success' && (
          <p className="text-sm text-green-600 dark:text-green-400">{copy.success}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400">{copy.error}</p>
        )}
      </div>

      {/* Hidden UTM field for debugging */}
      <input type="hidden" name="utm_source" value={utm.utm_source ?? ''} readOnly />
    </form>
  )
}

