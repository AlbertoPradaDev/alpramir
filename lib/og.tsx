import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

// Shared 1200×630 black-and-white share card, used by both the Open Graph and
// Twitter image routes. Uses the ImageResponse default font for build safety.
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_ALT = `${SITE.name} — ${SITE.role}`

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 28,
            bottom: 28,
            left: 28,
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 8,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {`${SITE.role} · ${SITE.location}`.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 168,
            fontWeight: 700,
            lineHeight: 1,
            marginTop: 26,
            letterSpacing: -2,
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: 'rgba(255,255,255,0.72)',
            marginTop: 30,
            maxWidth: 880,
            textAlign: 'center',
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
