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
