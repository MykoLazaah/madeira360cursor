import { NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true }, { status: 200 })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string
      lang?: string
      utm?: Record<string, unknown>
      payload?: Record<string, unknown>
    }

    if (!body?.email || !isValidEmail(body.email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    const apiToken = process.env.MAILERLITE_API_TOKEN
    const groupId = process.env.MAILERLITE_GROUP_ID

    if (!apiToken) {
      console.error('MAILERLITE_API_TOKEN is not configured')
      return NextResponse.json(
        { ok: false, error: 'server_error' },
        { status: 500 },
      )
    }

    // Prepare subscriber data for MailerLite
    const subscriberData: {
      email: string
      status?: 'active' | 'unsubscribed' | 'bounced' | 'junk'
      groups?: string[]
      fields?: Record<string, unknown>
    } = {
      email: body.email,
      status: 'active',
    }

    // Add to group if specified
    if (groupId) {
      subscriberData.groups = [groupId]
    }

    // Add custom fields if needed (language, UTM params, etc.)
    const fields: Record<string, unknown> = {}
    if (body.lang) {
      fields.language = body.lang
    }
    if (body.utm && Object.keys(body.utm).length > 0) {
      Object.entries(body.utm).forEach(([key, value]) => {
        if (value) {
          fields[`utm_${key}`] = value
        }
      })
    }
    if (body.payload) {
      Object.entries(body.payload).forEach(([key, value]) => {
        if (value) {
          fields[key] = value
        }
      })
    }
    if (Object.keys(fields).length > 0) {
      subscriberData.fields = fields
    }

    // Send to MailerLite API
    const mailerLiteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    })

    if (!mailerLiteResponse.ok) {
      const errorText = await mailerLiteResponse.text()
      console.error('MailerLite API error:', mailerLiteResponse.status, errorText)
      
      // If subscriber already exists, that's okay
      if (mailerLiteResponse.status === 422) {
        // Try to update existing subscriber instead
        const updateResponse = await fetch(
          `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(body.email)}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${apiToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              status: 'active',
              ...(groupId && { groups: [groupId] }),
              ...(Object.keys(fields).length > 0 && { fields }),
            }),
          },
        )

        if (updateResponse.ok) {
          return NextResponse.json({ ok: true })
        }
      }

      return NextResponse.json(
        { ok: false, error: 'mailerlite_error' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 },
    )
  }
}

