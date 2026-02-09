'use client'

import { useEffect, useState } from 'react'

type GetYourGuideWidgetProps = {
  tourIds?: string
  localeCode?: 'de-DE' | 'en-US'
  numberOfItems?: number
}

export function GetYourGuideWidget({ 
  tourIds = '534444,497584,456215',
  localeCode = 'de-DE',
  numberOfItems = 3
}: GetYourGuideWidgetProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div style={{ minHeight: '400px' }}>
        {/* Placeholder to prevent layout shift during hydration */}
      </div>
    )
  }

  return (
    <div
      data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
      data-gyg-locale-code={localeCode}
      data-gyg-widget="activities"
      data-gyg-number-of-items={numberOfItems}
      data-gyg-partner-id="VC3RVAM"
      data-gyg-tour-ids={tourIds}
    >
      <span>
        Powered by{' '}
        <a target="_blank" rel="sponsored" href="https://www.getyourguide.com/madeira-l67/">
          GetYourGuide
        </a>
      </span>
    </div>
  )
}

export default GetYourGuideWidget


