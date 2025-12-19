-- Madeira360 (Supabase) schema
-- Run this in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  title text,
  provider text,
  partner_id text,
  price numeric,
  currency text,
  url text,
  meta jsonb,
  tags text[],
  region text,
  created_at timestamp with time zone default now()
);

create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid references offers(id),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referer text,
  ip text,
  user_agent text,
  created_at timestamp with time zone default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  lang text,
  source text,
  utm jsonb,
  payload jsonb,
  created_at timestamp with time zone default now()
);
