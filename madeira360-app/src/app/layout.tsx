import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Script from 'next/script'
import { Open_Sans, Fraunces } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: '400',
})

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600'],
})

function baseUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return raw.replace(/\/$/, '')
}

export const metadata: Metadata = {
  title: {
    default: 'Madeira360',
    template: '%s | Madeira360',
  },
  description: 'Madeira travel tips and local offers. Plan your Madeira trip with confidence. Get practical tips, weather insights and tour recommendations (DE/EN)',
  metadataBase: new URL(baseUrl()),
  keywords: ['Madeira', 'travel', 'tourism', 'Portugal', 'trip planning', 'tours', 'Reiseplanung', 'Madeira Reisen'],
  authors: [{ name: 'Madeira360' }],
  creator: 'Madeira360',
  publisher: 'Madeira360',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: 'en_US',
    siteName: 'Madeira360',
    title: 'Madeira360 - Personal Trip Planning for Madeira',
    description: 'Plan your Madeira trip with confidence. Get practical tips, weather insights and tour recommendations.',
    images: [
      {
        url: `${baseUrl()}/images/hero-madeira.webp`,
        width: 1200,
        height: 630,
        alt: 'Madeira360 - Madeira Travel Planning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madeira360 - Personal Trip Planning for Madeira',
    description: 'Plan your Madeira trip with confidence. Get practical tips, weather insights and tour recommendations.',
    images: [`${baseUrl()}/images/hero-madeira.webp`],
  },
  icons: {
    icon: '/images/logo-madeira360.svg',
    shortcut: '/images/logo-madeira360.svg',
    apple: '/images/logo-madeira360.svg',
  },
  alternates: {
    canonical: baseUrl(),
    languages: {
      de: `${baseUrl()}/de`,
      en: `${baseUrl()}/en`,
    },
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
        className={`${openSans.variable} ${fraunces.variable} antialiased`}
      >
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KMZTJCS4');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KMZTJCS4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* GetYourGuide Analytics */}
        <script
          async
          defer
          src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
          data-gyg-partner-id="VC3RVAM"
        />
        {children}
      </body>
    </html>
  )
}
