import { NextResponse } from 'next/server'
import { getOffers } from '@/lib/supabaseClient'

export async function GET() {
  try {
    const offers = await getOffers()
    return NextResponse.json({ ok: true, offers })
  } catch {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
