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
      travel_date_1?: string | null
      travel_date_2?: string | null
      interests?: string | null
      locale?: string
      utm?: Record<string, unknown>
    }

    // Validate email
    if (!body?.email || !isValidEmail(body.email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    // Sanitize and validate input lengths to prevent abuse
    const email = body.email.trim().toLowerCase()
    if (email.length > 254) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    // Validate optional fields length
    if (body.travel_date_1 && body.travel_date_1.length > 50) {
      return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 })
    }
    if (body.travel_date_2 && body.travel_date_2.length > 50) {
      return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 })
    }
    if (body.interests && body.interests.length > 1000) {
      return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 })
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
    // IMPORTANT: Custom fields must be created in MailerLite dashboard first!
    // See MAILERLITE_SETUP.md for instructions
    // Field mapping:
    // - email → mailerlite.email (system field, always works)
    // - travel_date_1 → mailerlite.travel_date_1 (custom field, must exist in MailerLite)
    // - travel_date_2 → mailerlite.travel_date_2 (custom field, must exist in MailerLite)
    // - interests → mailerlite.interests (custom field, must exist in MailerLite)
    // - locale → mailerlite.locale (custom field, must exist in MailerLite)
    // - utm_* → mailerlite.utm_* (custom fields, must exist in MailerLite)
    const subscriberData: {
      email: string
      status?: 'active' | 'unsubscribed' | 'bounced' | 'junk'
      groups?: string[]
      fields?: Record<string, unknown>
    } = {
      email: email, // Use sanitized email
      status: 'active',
    }

    // Add to group if specified
    if (groupId) {
      subscriberData.groups = [groupId]
    }

    // Add custom fields according to MailerLite field mapping
    const fields: Record<string, unknown> = {}
    
    // travel_date_1: Date field, optional (arrival date)
    if (body.travel_date_1) {
      fields.travel_date_1 = body.travel_date_1
    }

    // travel_date_2: Date field, optional (departure date)
    if (body.travel_date_2) {
      fields.travel_date_2 = body.travel_date_2
    }

    // interests: Text field, comma-separated, optional
    if (body.interests) {
      fields.interests = body.interests
    }

    // Add locale if provided
    if (body.locale) {
      fields.locale = body.locale
    }

    // Add UTM params if provided
    if (body.utm && Object.keys(body.utm).length > 0) {
      Object.entries(body.utm).forEach(([key, value]) => {
        if (value) {
          fields[`utm_${key}`] = value
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
      // Log error details for debugging (in production, be more careful)
      const errorText = await mailerLiteResponse.text()
      console.error('MailerLite API error:', {
        status: mailerLiteResponse.status,
        statusText: mailerLiteResponse.statusText,
        error: errorText,
        // Log which fields we tried to send for debugging
        attemptedFields: Object.keys(fields),
      })
      
      // If subscriber already exists, try to update instead
      if (mailerLiteResponse.status === 422) {
        const updateResponse = await fetch(
          `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`,
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
    console.error('Trip planning form submission error:', error)
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 },
    )
  }
}


