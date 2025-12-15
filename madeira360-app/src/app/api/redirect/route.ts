import { insertClick } from '@/lib/supabaseClient'

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 60

const bucket = new Map<string, { count: number; resetAt: number }>()

function rateLimit(key: string) {
  const now = Date.now()
  const current = bucket.get(key)
  if (!current || current.resetAt <= now) {
    bucket.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true as const }
  }

  if (current.count >= MAX_PER_WINDOW) return { ok: false as const, retryAfterMs: current.resetAt - now }

  current.count += 1
  return { ok: true as const }
}

function safeUrl(raw: string) {
  try {
    const u = new URL(raw)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return u.toString()
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const offerUrl = url.searchParams.get('url')
  const offerId = url.searchParams.get('offer_id')

  const target = offerUrl ? safeUrl(offerUrl) : null
  if (!target) {
    return new Response('Missing or invalid url', { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const ua = req.headers.get('user-agent')
  const referer = req.headers.get('referer')

  const key = ip ?? ua ?? 'anon'
  const limited = rateLimit(key)
  if (!limited.ok) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'retry-after': String(Math.ceil((limited.retryAfterMs ?? 0) / 1000)),
      },
    })
  }

  const utm_source = url.searchParams.get('utm_source')
  const utm_medium = url.searchParams.get('utm_medium')
  const utm_campaign = url.searchParams.get('utm_campaign')

  try {
    await insertClick({
      offer_id: offerId,
      utm_source,
      utm_medium,
      utm_campaign,
      referer,
      ip,
      user_agent: ua,
    })
  } catch {
    // Logging failures should not block redirect
  }

  return Response.redirect(target, 307)
}
