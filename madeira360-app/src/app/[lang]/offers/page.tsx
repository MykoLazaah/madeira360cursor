import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'

const PAGE_SIZE = 10

export default function OffersPage({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams: { page?: string }
}) {
  const lang = params.lang
  if (!isLocale(lang)) notFound()

  const page = Math.max(1, Number(searchParams.page ?? '1') || 1)

  const offers = Array.from({ length: 22 }).map((_, i) => ({
    id: `offer-${i + 1}`,
    title: lang === 'de' ? `Angebot ${i + 1}` : `Offer ${i + 1}`,
    place: lang === 'de' ? 'Madeira, Portugal' : 'Madeira, Portugal',
    amount: i % 3 === 0 ? '€49' : i % 3 === 1 ? '€89' : '€129',
    tagText: i % 4 === 0 ? (lang === 'de' ? 'Top' : 'Top') : undefined,
    image: '/images/hero-madeira.webp',
  }))

  const totalPages = Math.max(1, Math.ceil(offers.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const slice = offers.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  return (
    <>
      <section
        className="relative table w-full items-center py-36 bg-top bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/images/hero-madeira.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white font-heading">
              {lang === 'de' ? 'Angebote' : 'Offers'}
            </h3>
          </div>
        </div>
        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href={`/${lang}`}>Madeira360</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5">›</li>
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">
              {lang === 'de' ? 'Angebote' : 'Offers'}
            </li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
            {/* Left sidebar (copied structure from template; map removed per TZ) */}
            <div className="lg:col-span-4 md:col-span-5">
              <div className="p-4 rounded-md shadow dark:shadow-gray-700 sticky top-20">
                <div>
                  <h5 className="text-lg font-medium font-heading">{lang === 'de' ? 'Filter' : 'Filters'}</h5>
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-medium">{lang === 'de' ? 'Preis' : 'Price Filter'}</h5>
                  <div className="mt-3">
                    <span className="flex justify-between pb-2">
                      <span className="text-slate-400">€0</span>
                      <span className="text-slate-400">€300</span>
                    </span>
                    <input className="w-full" type="range" min={0} max={300} defaultValue={60} />
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-medium">{lang === 'de' ? 'Bewertungen' : 'Reviews'}</h5>
                  <div className="mt-3 space-y-2">
                    {['5', '4', '3'].map((stars) => (
                      <div key={stars} className="flex items-center mb-0">
                        <input
                          className="size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 checked:appearance-auto focus:ring-0 me-2"
                          type="checkbox"
                          id={`${stars}star`}
                        />
                        <label className="text-slate-400" htmlFor={`${stars}star`}>
                          {stars}★+
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-medium">{lang === 'de' ? 'Typ' : 'Type'}</h5>
                  <div className="mt-3 space-y-2">
                    {[
                      lang === 'de' ? 'Transfer' : 'Transfer',
                      lang === 'de' ? 'Tour' : 'Tour',
                      lang === 'de' ? 'Aktivität' : 'Activity',
                    ].map((t) => (
                      <div key={t} className="flex items-center mb-0">
                        <input
                          className="size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 checked:appearance-auto focus:ring-0 me-2"
                          type="checkbox"
                          id={`type-${t}`}
                        />
                        <label className="text-slate-400" htmlFor={`type-${t}`}>
                          {t}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map block removed intentionally */}
              </div>
            </div>

            {/* Offers list */}
            <div className="lg:col-span-8 md:col-span-7">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                {slice.map((o) => (
                  <div key={o.id} className="group rounded-md shadow dark:shadow-gray-700">
                    <div className="relative overflow-hidden rounded-t-md shadow dark:shadow-gray-700 mx-3 mt-3 bg-white dark:bg-slate-900">
                      <img src={o.image} className="w-full h-52 object-cover scale-125 group-hover:scale-100 duration-500" alt="" />
                      {o.tagText ? (
                        <div className="absolute top-0 start-0 p-4">
                          <span className="bg-primary text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">{o.tagText}</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="p-4">
                      <p className="flex items-center text-slate-400 font-medium mb-2">{o.place}</p>
                      <Link
                        href={`/${lang}/tour/${o.id}`}
                        className="text-lg font-medium hover:text-primary duration-500 ease-in-out font-heading"
                      >
                        {o.title}
                      </Link>

                      <div className="mt-4 pt-4 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
                        <h5 className="text-lg font-medium text-primary">{o.amount}</h5>
                        <Link href={`/${lang}/tour/${o.id}`} className="text-slate-400 hover:text-primary">
                          {lang === 'de' ? 'Mehr' : 'Explore Now'} <span className="ms-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
                <div className="md:col-span-12 text-center">
                  <nav aria-label="Page navigation">
                    <ul className="inline-flex items-center -space-x-px">
                      <li>
                        <Link
                          href={`/${lang}/offers?page=${Math.max(1, clampedPage - 1)}`}
                          aria-disabled={clampedPage <= 1}
                          className={
                            'size-[40px] inline-flex justify-center items-center bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 ' +
                            (clampedPage <= 1
                              ? 'pointer-events-none text-slate-400/50 rounded-s-3xl'
                              : 'text-slate-400 rounded-s-3xl hover:text-white hover:border-primary hover:bg-primary')
                          }
                        >
                          ‹
                        </Link>
                      </li>

                      {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => {
                        const p = i + 1
                        const active = p === clampedPage
                        return (
                          <li key={p}>
                            <Link
                              href={`/${lang}/offers?page=${p}`}
                              aria-current={active ? 'page' : undefined}
                              className={
                                active
                                  ? 'z-10 size-[40px] inline-flex justify-center items-center text-white bg-primary border border-primary'
                                  : 'size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-primary hover:bg-primary'
                              }
                            >
                              {p}
                            </Link>
                          </li>
                        )
                      })}

                      <li>
                        <Link
                          href={`/${lang}/offers?page=${Math.min(totalPages, clampedPage + 1)}`}
                          aria-disabled={clampedPage >= totalPages}
                          className={
                            'size-[40px] inline-flex justify-center items-center bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 ' +
                            (clampedPage >= totalPages
                              ? 'pointer-events-none text-slate-400/50 rounded-e-3xl'
                              : 'text-slate-400 rounded-e-3xl hover:text-white hover:border-primary hover:bg-primary')
                          }
                        >
                          ›
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

