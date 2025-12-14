import { redirect } from 'next/navigation'

export default function Home() {
  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'de'
  redirect(`/${defaultLocale}`)
}
