import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { isLocale } from '@/lib/i18n'
import { getOfferById } from '@/lib/supabaseClient'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { TourQuestionForm } from '@/components/TourQuestionForm'
import { TourFAQ } from '@/components/TourFAQ'

function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL
  if (!base) return path
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

// Mock data generator for when Supabase is not configured
function getMockTourData(id: string, lang: string) {
  const isOffer = id.startsWith('offer-')
  const isTour = id.startsWith('tour-')
  const num = isOffer ? parseInt(id.replace('offer-', '')) : isTour ? parseInt(id.replace('tour-', '')) : 1

  return {
    id,
    title: lang === 'de' ? `Angebot ${num}` : `Offer ${num}`,
    provider: 'Madeira360',
    price: num % 3 === 0 ? 49 : num % 3 === 1 ? 89 : 129,
    currency: 'EUR',
    url: '#',
    tags: ['Tour', 'Madeira'],
    region: 'Madeira, Portugal',
    meta: {
      description: lang === 'de' 
        ? `Erkunden Sie die Schönheit von Madeira mit diesem fantastischen Angebot ${num}.`
        : `Explore the beauty of Madeira with this fantastic offer ${num}.`,
      image: '/images/hero-madeira.webp',
      duration: lang === 'de' ? '4-6 Stunden' : '4-6 hours',
      type: lang === 'de' ? 'Gruppentour' : 'Group Tour',
      groupSize: lang === 'de' ? 'Kleine Gruppen' : 'Small groups',
      difficulty: lang === 'de' ? 'Mittel' : 'Medium',
      highlights: [
        lang === 'de' ? 'Fantastische Aussichten' : 'Fantastic views',
        lang === 'de' ? 'Lokaler Guide' : 'Local guide',
        lang === 'de' ? 'Flexible Abholung' : 'Flexible pickup',
      ],
      included: [
        lang === 'de' ? 'Transport' : 'Transportation',
        lang === 'de' ? 'Führung' : 'Guide',
        lang === 'de' ? 'Versicherung' : 'Insurance',
      ],
      excluded: [
        lang === 'de' ? 'Mahlzeiten' : 'Meals',
        lang === 'de' ? 'Persönliche Ausgaben' : 'Personal expenses',
      ],
    },
  }
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; id: string }
}): Promise<Metadata> {
  const { lang, id } = params
  if (!isLocale(lang)) return {}

  let tour = await getOfferById(id)
  if (!tour) {
    tour = getMockTourData(id, lang) as any
  }

  const canonical = absoluteUrl(`/${lang}/tour/${id}`)

  return {
    title: tour.title || 'Tour',
    description: tour.meta?.description || tour.title || 'Tour details',
    alternates: {
      canonical,
      languages: {
        de: absoluteUrl(`/de/tour/${id}`),
        en: absoluteUrl(`/en/tour/${id}`),
      },
    },
    openGraph: {
      type: 'website',
      title: tour.title || 'Tour',
      description: tour.meta?.description || tour.title || 'Tour details',
      url: canonical,
      locale: lang,
    },
  }
}

export default async function TourDetail({ params }: { params: { lang: string; id: string } }) {
  const { lang, id } = params
  if (!isLocale(lang)) notFound()

  let tour = await getOfferById(id)
  // Use mock data if Supabase is not configured or tour not found
  if (!tour) {
    tour = getMockTourData(id, lang) as any
  }

  const tourTitle = tour.title || (lang === 'de' ? 'Tour' : 'Tour')
  const tourDescription = tour.meta?.description || tour.title || ''
  const tourPrice = tour.price ? `${tour.currency || 'EUR'} ${tour.price}` : null
  const tourTags = tour.tags || []
  const tourRegion = tour.region || 'Madeira, Portugal'
  const tourImage = tour.meta?.image || '/images/hero-madeira.webp'

  return (
    <>
      {/* Hero section with breadcrumbs */}
      <section
        className="relative table w-full items-center py-10 bg-top bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/images/hero-madeira.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white font-heading mb-10">
              {tourTitle}
            </h3>
            <div className="text-center z-10 mb-10">
              <ul className="tracking-[0.5px] mb-0 inline-block">
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
                  <Link href={`/${lang}`}>Madeira360</Link>
                </li>
                <li className="inline-block text-base text-white/50 mx-0.5">›</li>
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
                  <Link href={`/${lang}/offers`}>{lang === 'de' ? 'Angebote' : 'Offers'}</Link>
                </li>
                <li className="inline-block text-base text-white/50 mx-0.5">›</li>
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">
                  {lang === 'de' ? 'Tour Details' : 'Tour Details'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
            {/* Main content */}
            <div className="lg:col-span-8 md:col-span-7">
              {/* Tour image gallery */}
              <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 mb-6">
                <img src={tourImage} alt={tourTitle} className="w-full h-[400px] object-cover" />
              </div>

              {/* Tour description */}
              <Card className="p-6 mb-6">
                <h4 className="text-2xl font-semibold font-heading mb-4">{tourTitle}</h4>
                {tourDescription && <p className="text-slate-400 mb-4">{tourDescription}</p>}

                {/* Tags */}
                {tourTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tourTags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                )}
              </Card>

              {/* Tour details */}
              <Card className="p-6 mb-6">
                <h5 className="text-lg font-semibold font-heading mb-4">
                  {lang === 'de' ? 'Tour Details' : 'Tour Details'}
                </h5>
                <div className="grid md:grid-cols-2 gap-4">
                  {tour.meta?.duration && (
                    <div className="flex items-center text-slate-400">
                      <span className="font-medium mr-2">{lang === 'de' ? 'Duration:' : 'Duration:'}</span>
                      <span>{tour.meta.duration}</span>
                    </div>
                  )}
                  {tour.meta?.type && (
                    <div className="flex items-center text-slate-400">
                      <span className="font-medium mr-2">{lang === 'de' ? 'Type:' : 'Type:'}</span>
                      <span>{tour.meta.type}</span>
                    </div>
                  )}
                  {tour.meta?.groupSize && (
                    <div className="flex items-center text-slate-400">
                      <span className="font-medium mr-2">{lang === 'de' ? 'Group Size:' : 'Group Size:'}</span>
                      <span>{tour.meta.groupSize}</span>
                    </div>
                  )}
                  {tour.meta?.difficulty && (
                    <div className="flex items-center text-slate-400">
                      <span className="font-medium mr-2">{lang === 'de' ? 'Difficulty:' : 'Difficulty:'}</span>
                      <span>{tour.meta.difficulty}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Tour Description */}
              <Card className="p-6 mb-6">
                <h5 className="text-lg font-semibold font-heading mb-4">
                  {lang === 'de' ? 'Tour Description' : 'Tour Description'}
                </h5>
                <div className="prose prose-zinc max-w-none dark:prose-invert text-slate-400">
                  {tour.meta?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: tour.meta.content }} />
                  ) : (
                    <p>
                      {tourDescription || 
                        (lang === 'de' 
                          ? 'Erkunden Sie die Schönheit von Madeira mit diesem fantastischen Tour-Erlebnis. Entdecken Sie atemberaubende Landschaften, lokale Kultur und unvergessliche Momente.'
                          : 'Explore the beauty of Madeira with this fantastic tour experience. Discover stunning landscapes, local culture, and unforgettable moments.')}
                    </p>
                  )}
                </div>
              </Card>

              {/* FAQ Section */}
              {tour.meta?.faq && Array.isArray(tour.meta.faq) && tour.meta.faq.length > 0 ? (
                <TourFAQ
                  lang={lang}
                  faqItems={tour.meta.faq.map((item: { question: string; answer: string }) => ({
                    question: item.question,
                    answer: item.answer,
                  }))}
                />
              ) : (
                <TourFAQ
                  lang={lang}
                  faqItems={[
                    {
                      question: lang === 'de' ? 'Was ist im Preis enthalten?' : 'What is included in the price?',
                      answer: lang === 'de' 
                        ? 'Der Preis beinhaltet Transport, Führung und Versicherung.'
                        : 'The price includes transportation, guide, and insurance.',
                    },
                    {
                      question: lang === 'de' ? 'Wie lange dauert die Tour?' : 'How long does the tour take?',
                      answer: tour.meta?.duration || (lang === 'de' ? 'Die Tour dauert etwa 4-6 Stunden.' : 'The tour takes approximately 4-6 hours.'),
                    },
                    {
                      question: lang === 'de' ? 'Kann ich die Tour stornieren?' : 'Can I cancel the tour?',
                      answer: lang === 'de' 
                        ? 'Ja, Sie können die Tour bis zu 24 Stunden vor Beginn kostenlos stornieren.'
                        : 'Yes, you can cancel the tour free of charge up to 24 hours before the start.',
                    },
                  ]}
                />
              )}

              {/* Ask a Question Form */}
              <TourQuestionForm lang={lang} tourId={id} tourTitle={tourTitle} />

            </div>

            {/* Sidebar - Booking card */}
            <div className="lg:col-span-4 md:col-span-5">
              <div className="sticky top-20">
                <Card className="p-6 shadow dark:shadow-gray-700">
                  <h5 className="text-lg font-semibold font-heading mb-4">
                    {lang === 'de' ? 'Buchung' : 'Booking'}
                  </h5>

                  {tourPrice && (
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-primary mb-2">{tourPrice}</div>
                      <p className="text-sm text-slate-400">{lang === 'de' ? 'pro Person' : 'per person'}</p>
                    </div>
                  )}

                  {tour.url && (
                    <a
                      href={tour.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-[var(--radius-base)] px-4 py-2 text-sm font-medium transition-colors w-full mb-4 bg-primary text-primary-foreground hover:opacity-90"
                    >
                      {lang === 'de' ? 'Jetzt buchen' : 'Book Now'}
                    </a>
                  )}

                  <div className="border-t border-slate-100 dark:border-gray-800 pt-4 mt-4">
                    <div className="space-y-3 text-sm text-slate-400">
                      {tour.provider && (
                        <div>
                          <span className="font-medium">{lang === 'de' ? 'Anbieter:' : 'Provider:'}</span>{' '}
                          <span>{tour.provider}</span>
                        </div>
                      )}
                      {tourRegion && (
                        <div>
                          <span className="font-medium">{lang === 'de' ? 'Region:' : 'Region:'}</span>{' '}
                          <span>{tourRegion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

