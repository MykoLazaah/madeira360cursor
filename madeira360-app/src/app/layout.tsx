import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
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
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
