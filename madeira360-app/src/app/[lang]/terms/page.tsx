import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'

export default function TermsPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound()

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Terms</h1>
      <p className="mt-4 text-muted-foreground">This is a stub. Add your terms here.</p>
    </div>
  )
}
