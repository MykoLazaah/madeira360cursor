import Link from 'next/link'
import { cn } from '@/lib/cn'

export function CTA({
  title,
  description,
  href,
  buttonText,
}: {
  title: string
  description?: string
  href: string
  buttonText: string
}) {
  return (
    <div className="my-10 rounded-2xl border border-border bg-card p-6">
      <div className="text-lg font-semibold">{title}</div>
      {description ? <div className="mt-2 text-muted-foreground">{description}</div> : null}
      <div className="mt-4">
        <Link className={cn('inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground')} href={href}>
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default CTA
