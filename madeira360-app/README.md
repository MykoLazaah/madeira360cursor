## Madeira360

Production-ready Next.js (App Router) starter for a bilingual (DE/EN) MDX blog powered by Contentlayer, with Supabase for offers + click/lead logging.

### Tech stack

- **Next.js 14 (App Router)**
- **Contentlayer + MDX** (`/content/{lang}/blog/*.mdx`)
- **Supabase** (offers, clicks, leads)
- **Tailwind CSS** (token-based palette in `src/app/globals.css`)

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Environment variables

Copy `.env.example` to `.env.local` and fill:

- **NEXT_PUBLIC_SITE_URL**: e.g. `https://madeira360.com`
- **NEXT_PUBLIC_SUPABASE_URL**: Supabase project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: anon key
- **SUPABASE_SERVICE_ROLE_KEY**: service role key (server-only; required for inserts into `clicks`/`leads`)

### Routes

- **Landing**: `/{lang}` (e.g. `/de`, `/en`)
- **Blog index**: `/{lang}/blog`
- **Blog post**: `/{lang}/blog/{slug}`
- **SEO**: `/sitemap.xml`, `/robots.txt`

### Content (MDX)

Add posts here:

- `content/de/blog/*.mdx`
- `content/en/blog/*.mdx`

Frontmatter fields (minimal):

- `title` (string)
- `description` (string)
- `date` (ISO date)
- `lang` (`de` | `en`)
- `slug` (string)
- optional: `tags`, `category`, `cover`

MDX components available in posts:

- `<Callout />`
- `<CTA />`
- `<TourCard />`

### Supabase setup

1. Create a Supabase project (free tier is fine).
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Add env vars in `.env.local` and Vercel project settings.

**Note on RLS**: this starter uses **service role** for inserts from server routes. Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the client.

### Lead ingestion (Make.com)

#### Endpoint

- **POST** `/api/webhook`
- Body (example):

```json
{
  "name":"Max Mustermann",
  "email":"max@example.com",
  "lang":"de",
  "source":"website",
  "utm":{"utm_source":"pinterest","utm_campaign":"launch"},
  "payload":{"note":"optional"}
}
```

Returns:

```json
{ "ok": true, "id": "..." }
```

#### Make.com scenario (recommended)

1. Create a **Custom webhook** module (trigger).
2. Add **HTTP > Make a request** (POST) to `https://YOUR_DOMAIN/api/webhook`.
3. Map fields:
   - `name` → `body.name`
   - `email` → `body.email`
   - `lang` → `body.lang`
   - `utm_source/medium/campaign` → `body.utm.*`
4. Add **Google Sheets**: append row (timestamp, name, email, utm_source, utm_medium, utm_campaign, source).
5. Add **MailerLite**: add subscriber / send welcome email.
6. Optional: Telegram notify.

### Click logging + redirect

- **GET** `/api/redirect?offer_id=UUID&url=https%3A%2F%2Fexample.com&utm_source=...`
- Inserts into `clicks` (best-effort) and returns **307 redirect**.
- Includes basic in-memory rate limiting.

### Welcome email templates

**DE**

Subject: `Willkommen bei Madeira360 — Dein Guide für Madeira`

```
Hallo {{name}},

Willkommen bei Madeira360! Schön, dass du dabei bist. Hier ist dein kostenloser Guide...

[CTA]

Viele Grüße,
Das Madeira360 Team
```

**EN**

Subject: `Welcome to Madeira360 — your Madeira guide`

```
Hi {{name}},

Welcome to Madeira360! Great to have you. Here is your free guide...

[CTA]

Best,
The Madeira360 Team
```

### Deploy to Vercel

1. Import the repo into Vercel.
2. Set env vars from `.env.example` (especially Supabase keys).
3. Build command: `npm run build`.
4. Add your custom domain and set `NEXT_PUBLIC_SITE_URL` accordingly.

### Notes

- Contentlayer uses legacy peer dependencies in this setup. `npm run build` works (Contentlayer runs via the Next plugin). If you need manual generation, run `npm run contentlayer:build`.
