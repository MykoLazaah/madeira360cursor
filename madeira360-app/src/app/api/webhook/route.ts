import { NextResponse } from 'next/server'
import { insertLead } from '@/lib/supabaseClient'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true }, { status: 200 })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string | null
      email?: string
      lang?: string
      source?: string
      utm?: Record<string, unknown>
      payload?: Record<string, unknown>
    }

    if (!body?.email || !isValidEmail(body.email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    const row = await insertLead({
      name: body.name ?? null,
      email: body.email,
      lang: body.lang ?? null,
      source: body.source ?? 'website',
      utm: body.utm ?? null,
      payload: body.payload ?? null,
    })

    return NextResponse.json({ ok: true, id: row.id })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 },
    )
  }
}
