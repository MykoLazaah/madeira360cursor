import { NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string
      email?: string
      question?: string
      tourId?: string
      tourTitle?: string
    }

    if (!body?.email || !isValidEmail(body.email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    if (!body?.question || body.question.trim().length === 0) {
      return NextResponse.json({ ok: false, error: 'question_required' }, { status: 400 })
    }

    // Send email to mykola.zagoruyko@gmail.com
    // For production, you should use a service like Resend, SendGrid, or Nodemailer
    // This is a placeholder that logs the data
    const emailData = {
      to: 'mykola.zagoruyko@gmail.com',
      subject: `Tour Question: ${body.tourTitle || 'Tour Inquiry'}`,
      text: `
New question about tour:

Tour: ${body.tourTitle || 'N/A'} (ID: ${body.tourId || 'N/A'})
Name: ${body.name || 'Not provided'}
Email: ${body.email}
Question: ${body.question}

---
Sent from Madeira360 website
      `.trim(),
      html: `
        <h2>New Tour Question</h2>
        <p><strong>Tour:</strong> ${body.tourTitle || 'N/A'} (ID: ${body.tourId || 'N/A'})</p>
        <p><strong>Name:</strong> ${body.name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Question:</strong></p>
        <p>${body.question.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from Madeira360 website</em></p>
      `,
    }

    // TODO: Replace with actual email sending service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@madeira360.com',
    //   to: 'mykola.zagoruyko@gmail.com',
    //   subject: emailData.subject,
    //   html: emailData.html,
    // })

    // For now, log the email data (in production, replace with actual email sending)
    console.log('Tour question email:', JSON.stringify(emailData, null, 2))

    return NextResponse.json({ ok: true, message: 'Question sent successfully' })
  } catch (error) {
    console.error('Error sending tour question:', error)
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 },
    )
  }
}









