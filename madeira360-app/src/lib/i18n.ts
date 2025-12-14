export const LOCALES = ['de', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale) ?? 'de'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
