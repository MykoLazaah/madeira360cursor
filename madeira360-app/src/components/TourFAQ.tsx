'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'

type FAQItem = {
  question: string
  answer: string
}

export function TourFAQ({
  lang,
  faqItems,
}: {
  lang: 'de' | 'en'
  faqItems: FAQItem[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Card className="p-6">
      <h5 className="text-lg font-semibold font-heading mb-4">
        {lang === 'de' ? 'FAQ' : 'FAQ'}
      </h5>
      <div className="space-y-2">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="border border-slate-200 dark:border-gray-800 rounded-md overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <h6 className="font-semibold text-slate-900 dark:text-white pr-4">
                  {item.question}
                </h6>
                <span
                  className={`flex-shrink-0 text-slate-400 text-xl transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 pt-0 text-slate-400 text-sm border-t border-slate-100 dark:border-gray-800">
                  {item.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

