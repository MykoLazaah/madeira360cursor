import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { NewsletterForm } from '@/components/NewsletterForm'

type Props = {
  lang: Locale
}

export function SiteFooter({ lang }: Props) {
  return (
    <footer className="m360-footer bg-slate-900 dark:bg-slate-800 relative text-gray-200 dark:text-gray-200">
      <div className="container relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="py-[60px] px-0">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                <div className="lg:col-span-4 md:col-span-12">
                  <Link href={`/${lang}`} className="inline-block focus:outline-none">
                    <Image
                      src="/images/logo-madeira360.svg"
                      alt="Madeira360"
                      width={200}
                      height={50}
                      className="h-10 w-auto max-w-[200px]"
                    />
                  </Link>
                  <p className="mt-6 text-gray-300">
                    {lang === 'de' ? (
                      <>
                        <Link href={`/${lang}`} className="text-white hover:underline">
                          Madeira360.online
                        </Link>{' '}
                        ist eine Reiseplattform über Madeira mit Guides, Tipps und ausgewählten Erlebnissen für Reisende und Entdecker.
                      </>
                    ) : (
                      <>
                        <Link href={`/${lang}`} className="text-white hover:underline">
                          Madeira360.online
                        </Link>{' '}
                        is a travel platform about Madeira, offering guides, tips, and curated experiences for travelers and explorers.
                      </>
                    )}
                  </p>
                </div>

                <div className="lg:col-span-4 md:col-span-6">
                  <div className="lg:ms-8">
                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                      {lang === 'de' ? 'Links' : 'Links'}
                    </h5>
                    <ul className="list-none mt-6 space-y-2">
                      <li>
                        <Link href={`/${lang}/blog`} className="text-gray-300 hover:text-white duration-500 ease-in-out">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/offers`} className="text-gray-300 hover:text-white duration-500 ease-in-out">
                          Offers
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/privacy`} className="text-gray-300 hover:text-white duration-500 ease-in-out">
                          Privacy
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${lang}/terms`} className="text-gray-300 hover:text-white duration-500 ease-in-out">
                          Terms
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-4 md:col-span-6">
                  <div className="lg:ms-8">
                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                      {lang === 'de' ? 'Newsletter' : 'Newsletter'}
                    </h5>
                    <p className="mt-6 text-gray-300 text-sm mb-4">
                      {lang === 'de'
                        ? 'Seltene Mails. Nur das, was zählt.'
                        : 'Occasional emails. Only what matters.'}
                    </p>
                    <div className="text-left">
                      <NewsletterForm lang={lang} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[30px] px-0 border-t border-slate-800">
        <div className="container relative text-center">
          <div className="grid grid-cols-1">
            <div className="text-center">
              <p className="mb-0">
                © {new Date().getFullYear()}{' '}
                <Link href={`/${lang}`} className="text-white hover:underline">
                  Madeira360.online
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

