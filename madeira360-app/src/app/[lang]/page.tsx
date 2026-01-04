import { allBlogs } from 'contentlayer/generated'
import { isLocale } from '@/lib/i18n'
import Link from 'next/link'
import { TripPlanningForm } from '@/components/TripPlanningForm'

export default function Landing({ params }: { params: { lang: string } }) {
  const lang = params.lang
  if (!isLocale(lang)) return null

  const latestPosts = allBlogs
    .filter((p) => p.lang === lang)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 3)

  const tours = Array.from({ length: 8 }).map((_, i) => ({
    id: `tour-${i + 1}`,
    title: lang === 'de' ? `Tour Paket ${i + 1}` : `Tour Package ${i + 1}`,
    location: lang === 'de' ? 'Madeira, Portugal' : 'Madeira, Portugal',
    image: '/images/hero-madeira.webp',
    price: i % 2 === 0 ? '$99' : '$129',
    tag: i % 3 === 0 ? (lang === 'de' ? 'Neu' : 'New') : undefined,
  }))

  return (
    <>
      {/* Hero (copied structure from template, content is placeholder) */}
      <section
        className="relative py-36  bg-cover jarallax"
        data-jarallax
        data-speed="0.5"
        style={{ backgroundImage: "url('/images/hero-madeira.webp')", backgroundPosition: 'top' }}
      >
        <div className="absolute inset-0 bg-slate-900/40" />

        <div className="container relative">
          <div className="grid lg:grid-cols-12 md:grid-cols-2 mt-10 items-center gap-6">
            <div className="lg:col-span-7">
              <h5 className="text-3xl text-white font-heading">
                {lang === 'de' ? 'Persönliche Reiseplanung' : 'Personal trip planning'}
              </h5>
              <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5 font-heading">
                {lang === 'de' ? 'Plane deine Madeira-Reise mit Sicherheit' : 'Plan your Madeira trip with confidence'}
              </h4>
              <p className="text-white/70 text-xl max-w-xl">
                {lang === 'de'
                  ? 'Erhalte praktische Tipps, Wetterinfos und Tour-Empfehlungen passend zu deinen Reisedaten.'
                  : 'Get practical tips, weather insights and tour ideas tailored to your travel plans.'}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-800 p-6 z-10 relative">
                <TripPlanningForm lang={lang as 'de' | 'en'} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour packages */}
      <section className="relative md:py-24 py-16">
        <div className="container relative md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold font-heading">
              {lang === 'de' ? 'Tour Pakete' : 'Tour Packages'}
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              {lang === 'de'
                ? 'Entdecken Sie Madeira: Touren auf Deutsch'
                : 'Discover Madeira: Tours in English'}
            </p>
          </div>

          {/* Tour cards - Hidden for both DE and EN */}
          <div className="hidden">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
              {tours.map((t) => (
                <div key={t.id} className="group rounded-md shadow dark:shadow-gray-700">
                  <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 mx-2 mt-2 bg-white dark:bg-slate-900">
                    <img src={t.image} className="w-full h-48 object-cover scale-125 group-hover:scale-100 duration-500" alt="" />
                    {t.tag ? (
                      <div className="absolute top-0 start-0 p-4">
                        <span className="bg-primary text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
                          {t.tag}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="p-4">
                    <Link href={`/${lang}/tour/${t.id}`} className="text-lg font-medium hover:text-primary duration-500 ease-in-out font-heading">
                      {t.title}
                    </Link>
                    <p className="text-slate-400 mt-1">{t.location}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-slate-900 dark:text-white font-semibold">{t.price}</span>
                      <Link href={`/${lang}/tour/${t.id}`} className="hover:text-primary inline-flex items-center">
                        {lang === 'de' ? 'Details' : 'Details'}
                        <span className="ms-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GetYourGuide Widget - For DE */}
          {lang === 'de' && (
            <div className="mt-6">
              <div
                data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
                data-gyg-locale-code="de-DE"
                data-gyg-widget="activities"
                data-gyg-number-of-items="3"
                data-gyg-partner-id="VC3RVAM"
                data-gyg-tour-ids="59626,225105,70346"
              >
                <span>
                  Powered by{' '}
                  <a target="_blank" rel="sponsored" href="https://www.getyourguide.com/madeira-l67/">
                    GetYourGuide
                  </a>
                </span>
              </div>
            </div>
          )}

          {/* GetYourGuide Widget - For EN */}
          {lang === 'en' && (
            <div className="mt-6">
              <div
                data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
                data-gyg-locale-code="en-US"
                data-gyg-widget="activities"
                data-gyg-number-of-items="3"
                data-gyg-partner-id="VC3RVAM"
                data-gyg-tour-ids="426409,225105,456215"
              >
                <span>
                  Powered by{' '}
                  <a target="_blank" rel="sponsored" href="https://www.getyourguide.com/madeira-l67/">
                    GetYourGuide
                  </a>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* List of articles */}
      <section className="relative md:py-24 py-16 pt-0">
        <div className="container relative">
          <div className="grid grid-cols-1 pb-6 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold font-heading">
              {lang === 'de' ? 'Artikel' : 'Articles'}
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              {lang === 'de'
                ? 'Platzhaltertext: neueste Beiträge aus dem Blog.'
                : 'Placeholder: latest posts from the blog.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
            {latestPosts.map((post) => (
              <div key={post._id} className="group relative overflow-hidden">
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                  <img
                    src={post.cover ?? '/images/hero-madeira.webp'}
                    className="w-full h-56 object-cover group-hover:scale-110 group-hover:rotate-3 duration-500"
                    alt=""
                  />
                  <div className="absolute top-0 start-0 p-4 opacity-0 group-hover:opacity-100 duration-500">
                    <span className="bg-primary text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
                      {post.category ?? (lang === 'de' ? 'Blog' : 'Blog')}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href={post.url} className="text-lg font-medium hover:text-primary duration-500 ease-in-out font-heading">
                    {post.title}
                  </Link>
                  <p className="text-slate-400 mt-2">{post.description}</p>

                  <div className="mt-3">
                    <Link href={post.url} className="hover:text-primary inline-flex items-center">
                      {lang === 'de' ? 'Mehr lesen' : 'Read More'} <span className="ms-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${lang}/blog`}
              className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-secondary text-white rounded-md"
            >
              {lang === 'de' ? 'Alle Artikel' : 'All articles'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
