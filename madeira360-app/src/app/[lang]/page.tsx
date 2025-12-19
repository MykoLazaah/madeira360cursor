import { allBlogs } from 'contentlayer/generated'
import { isLocale } from '@/lib/i18n'
import Link from 'next/link'

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
    image: '/images/hero-madeira.svg',
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
        style={{ backgroundImage: "url('/images/hero-madeira.svg')", backgroundPosition: 'top' }}
      >
        <div className="absolute inset-0 bg-slate-900/40" />

        <div className="container relative">
          <div className="grid lg:grid-cols-12 md:grid-cols-2 mt-10 items-center gap-6">
            <div className="lg:col-span-7">
              <h5 className="text-3xl text-white font-heading">
                {lang === 'de' ? 'Dein Madeira Guide' : 'Your Madeira Guide'}
              </h5>
              <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5 font-heading">
                {lang === 'de' ? (
                  <>
                    Wohin geht&apos;s
                    <br /> als Nächstes?
                  </>
                ) : (
                  <>
                    Where do you
                    <br /> want to go?
                  </>
                )}
              </h4>
              <p className="text-white/70 text-xl max-w-xl">
                {lang === 'de'
                  ? 'Platzhaltertext: Blog, Spots, Routen und Angebote.'
                  : 'Placeholder: blog posts, spots, routes, and offers.'}
              </p>

              <div className="mt-6">
                <Link
                  href={`/${lang}/offers`}
                  className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md"
                >
                  {lang === 'de' ? 'Angebote ansehen' : 'View packages'}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-800 p-6 z-10 relative lg:ms-10">
                <h4 className="mb-5 text-2xl font-semibold font-heading">
                  {lang === 'de' ? 'Suche (Platzhalter)' : 'Search (placeholder)'}
                </h4>
                <form>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="font-medium text-slate-900 dark:text-white">
                        {lang === 'de' ? 'Suche:' : 'Search:'}
                      </label>
                      <div className="relative mt-2">
                        <input
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder={lang === 'de' ? 'Suchbegriff' : 'Keyword'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-slate-900 dark:text-white">
                        {lang === 'de' ? 'Datum:' : 'Date:'}
                      </label>
                      <div className="relative mt-2">
                        <input
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder={lang === 'de' ? 'TT.MM.JJJJ' : 'MM/DD/YYYY'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-slate-900 dark:text-white">
                        {lang === 'de' ? 'Personen:' : 'No. of Person:'}
                      </label>
                      <div className="relative mt-2">
                        <select className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                          <option disabled defaultValue="">
                            {lang === 'de' ? 'Auswählen' : 'Select'}
                          </option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md w-full cursor-pointer"
                      >
                        {lang === 'de' ? 'Suchen' : 'Search'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden text-white dark:text-slate-900">
            <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Tour packages */}
      <section className="relative md:py-24 py-16">
        <div className="container relative md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold font-heading">
              {lang === 'de' ? 'Tour Pakete' : 'Tours Packages'}
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              {lang === 'de'
                ? 'Platzhaltertext: kurze Einleitung für die Tour-Kacheln.'
                : 'Placeholder: short intro for the tour tiles.'}
            </p>
          </div>

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
                  <Link href={`/${lang}/offers`} className="text-lg font-medium hover:text-primary duration-500 ease-in-out font-heading">
                    {t.title}
                  </Link>
                  <p className="text-slate-400 mt-1">{t.location}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-slate-900 dark:text-white font-semibold">{t.price}</span>
                    <Link href={`/${lang}/offers`} className="hover:text-primary inline-flex items-center">
                      {lang === 'de' ? 'Details' : 'Details'}
                      <span className="ms-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                    src={post.cover ?? '/images/hero-madeira.svg'}
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
                  <div className="flex mb-4">
                    <span className="flex items-center text-slate-400 text-sm">
                      {post.readingTime} min read
                    </span>
                    <span className="text-slate-400 text-sm ms-3">
                      {new Date(post.date).toLocaleDateString(lang)}
                    </span>
                  </div>

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
