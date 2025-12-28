import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'

const PAGE_SIZE = 9

export default function BlogIndex({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams: { page?: string }
}) {
  const lang = params.lang
  if (!isLocale(lang)) notFound()

  const page = Math.max(1, Number(searchParams.page ?? '1') || 1)

  const posts = allBlogs
    .filter((p) => p.lang === lang)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)

  const slice = posts.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

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
              {lang === 'de' ? 'Blog / News' : 'Blogs / News'}
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
              Blog
            </li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {slice.map((post) => (
              <div key={post._id} className="group relative overflow-hidden">
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                  <img
                    src={post.cover ?? '/images/hero-madeira.webp'}
                    className="w-full h-56 object-cover group-hover:scale-110 group-hover:rotate-3 duration-500"
                    alt=""
                  />
                  <div className="absolute top-0 start-0 p-4 opacity-0 group-hover:opacity-100 duration-500">
                    <span className="bg-primary text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
                      {post.category ?? 'Blog'}
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

          <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
            <div className="md:col-span-12 text-center">
              <nav aria-label="Page navigation">
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <Link
                      href={`/${lang}/blog?page=${Math.max(1, clampedPage - 1)}`}
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
                          href={`/${lang}/blog?page=${p}`}
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
                      href={`/${lang}/blog?page=${Math.min(totalPages, clampedPage + 1)}`}
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
      </section>
    </>
  )
}
