import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Callout({
  children,
  variant = 'info',
}: {
  children: ReactNode
  variant?: 'info' | 'warning' | 'success'
}) {
  return (
    <div
      className={cn(
        'my-6 rounded-xl border px-4 py-3 text-sm',
        variant === 'info' && 'border-primary/30 bg-primary/5',
        variant === 'warning' && 'border-amber-500/30 bg-amber-500/10',
        variant === 'success' && 'border-emerald-500/30 bg-emerald-500/10',
      )}
    >
      {children}
    </div>
  )
}

export default Callout
