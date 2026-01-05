'use client'

import { useEffect, useState } from 'react'

type GetYourGuideWidgetProps = {
  localeCode: 'en-US' | 'de-DE'
}

export function GetYourGuideWidget({ localeCode }: GetYourGuideWidgetProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div>
        {/* Placeholder to prevent layout shift during hydration */}
        <div style={{ minHeight: '400px' }} />
      </div>
    )
  }

  return (
    <div
      data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
      data-gyg-location-id="67"
      data-gyg-locale-code={localeCode}
      data-gyg-widget="activities"
      data-gyg-number-of-items="12"
      data-gyg-partner-id="VC3RVAM"
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

