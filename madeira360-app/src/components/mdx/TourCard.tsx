import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export function TourCard({
  title,
  price,
  currency = 'EUR',
  href,
  tags,
}: {
  title: string
  price?: number
  currency?: string
  href: string
  tags?: string[]
}) {
  return (
    <Link href={href} className="block no-underline">
      <Card className="my-6 p-5 hover:shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-semibold">{title}</div>
            {tags?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.slice(0, 4).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            ) : null}
          </div>
          {typeof price === 'number' ? (
            <div className="shrink-0 rounded-md bg-muted px-3 py-1 text-sm font-medium">
              {price} {currency}
            </div>
          ) : null}
        </div>
      </Card>
    </Link>
  )
}

export default TourCard
