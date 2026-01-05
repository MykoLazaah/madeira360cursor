import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function getSupabaseAnon(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return createClient(url, key)
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function getOffers() {
  const supabase = getSupabaseAnon()
  const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getOfferById(id: string) {
  try {
    const supabase = getSupabaseAnon()
    const { data, error } = await supabase.from('offers').select('*').eq('id', id).maybeSingle()
    if (error) throw error
    return data
  } catch (error) {
    // If Supabase is not configured, return null to allow fallback to mock data
    if (error instanceof Error && error.message.includes('Missing NEXT_PUBLIC_SUPABASE')) {
      return null
    }
    throw error
  }
}

export async function insertClick(input: {
  offer_id?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  referer?: string | null
  ip?: string | null
  user_agent?: string | null
}) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('clicks').insert([input]).select('id').single()
  if (error) throw error
  return data
}

export async function insertLead(input: {
  name?: string | null
  email: string
  lang?: string | null
  source?: string | null
  utm?: Record<string, unknown> | null
  payload?: Record<string, unknown> | null
}) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: input.name ?? null,
        email: input.email,
        lang: input.lang ?? null,
        source: input.source ?? null,
        utm: input.utm ?? null,
        payload: input.payload ?? null,
      },
    ])
    .select('id')
    .single()
  if (error) throw error
  return data
}
