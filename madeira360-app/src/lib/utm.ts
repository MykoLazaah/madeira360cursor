export type UTM = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

const KEY = 'madeira360_utm'
const TTL_DAYS = 30

function nowMs() {
  return Date.now()
}

export function parseUtmFromSearchParams(params: URLSearchParams): UTM {
  const utm: UTM = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const) {
    const v = params.get(k)
    if (v) utm[k] = v
  }
  return utm
}

export function storeUtm(utm: UTM) {
  if (typeof window === 'undefined') return
  const hasAny = Object.values(utm).some(Boolean)
  if (!hasAny) return

  const payload = {
    utm,
    expiresAt: nowMs() + TTL_DAYS * 24 * 60 * 60 * 1000,
  }
  window.localStorage.setItem(KEY, JSON.stringify(payload))
}

export function getStoredUtm(): UTM {
  if (typeof window === 'undefined') return {}
  const raw = window.localStorage.getItem(KEY)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as { utm?: UTM; expiresAt?: number }
    if (!parsed?.utm || !parsed?.expiresAt) return {}
    if (parsed.expiresAt < nowMs()) {
      window.localStorage.removeItem(KEY)
      return {}
    }
    return parsed.utm
  } catch {
    return {}
  }
}

export function captureUtmFromUrl() {
  if (typeof window === 'undefined') return {}
  const url = new URL(window.location.href)
  const utm = parseUtmFromSearchParams(url.searchParams)
  storeUtm(utm)
  return utm
}
