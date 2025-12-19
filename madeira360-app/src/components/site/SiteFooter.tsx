import Link from 'next/link'
import { type Locale } from '@/lib/i18n'

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
                  <Link href={`/${lang}`} className="text-[22px] focus:outline-none font-heading">
                    Madeira360
                  </Link>
                  <p className="mt-6 text-gray-300">
                    {lang === 'de'
                      ? 'Platzhaltertext: kurze Beschreibung des Projekts.'
                      : 'Placeholder: short description of the project.'}
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
                      {lang === 'de' ? 'Kontakt' : 'Contact'}
                    </h5>
                    <div className="mt-6 space-y-2 text-gray-300">
                      <div>contact@example.com</div>
                      <div>+000 000 000</div>
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
              <p className="mb-0">© {new Date().getFullYear()} Madeira360</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

