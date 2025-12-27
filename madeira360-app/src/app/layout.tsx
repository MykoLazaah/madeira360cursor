import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Crimson_Text, Montserrat } from 'next/font/google'
import './globals.css'

const crimsonText = Crimson_Text({
  variable: '--font-body',
  subsets: ['latin'],
  weight: '400',
})

const montserrat = Montserrat({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '600',
})

export const metadata: Metadata = {
  title: 'Madeira360',
  description: 'Madeira travel tips and local offers (DE/EN)',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  icons: {
    icon: '/images/logo-madeira360.svg',
    shortcut: '/images/logo-madeira360.svg',
    apple: '/images/logo-madeira360.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lang = headers().get('x-lang') ?? 'de'
  return (
    <html lang={lang}>
      <body
        className={`${crimsonText.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
