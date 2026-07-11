'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/lib/useMediaQuery'

/**
 * Theme reveal — adapted from Shelf "Discipline reveal" (id 38) to Alpramir's
 * editorial black-and-white brand. A row of line-art thumbnails; activating one
 * grows its tile and reveals the theme in giant Fraunces type, letters clip-
 * revealing (sliding up) from the centre outward. Idle shows "CANTO".
 *
 * Desktop = hover to reveal. Mobile (coarse pointer) = tap to reveal/toggle.
 * Pure CSS transitions (transform/opacity only) — no animation library.
 */

type Motif = 'heart' | 'cross' | 'rings' | 'star' | 'note'

const THEMES: { label: string; motif: Motif }[] = [
  { label: 'Amor', motif: 'heart' },
  { label: 'Fe', motif: 'cross' },
  { label: 'Amistad', motif: 'rings' },
  { label: 'Pop', motif: 'star' },
  { label: 'Balada latina', motif: 'note' },
]

const DEFAULT_NAME = 'CANTO'

/** Minimal line-art sigils on a 100x100 viewBox. */
const MOTIF_PATHS: Record<Motif, React.ReactNode> = {
  heart: <path d="M50 78 C20 58 22 30 40 30 C48 30 50 38 50 42 C50 38 52 30 60 30 C78 30 80 58 50 78 Z" />,
  cross: <path d="M50 20 L50 82 M32 40 L68 40" />,
  rings: (
    <>
      <circle cx="40" cy="50" r="20" />
      <circle cx="60" cy="50" r="20" />
    </>
  ),
  star: <path d="M50 18 L58 42 L83 42 L63 57 L70 81 L50 66 L30 81 L37 57 L17 42 L42 42 Z" />,
  note: (
    <>
      <circle cx="38" cy="72" r="10" />
      <path d="M48 72 L48 24 L72 32 L72 44" />
    </>
  ),
}

function Sigil({ motif }: { motif: Motif }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-1/2"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {MOTIF_PATHS[motif]}
    </svg>
  )
}

/** One stacked name whose letters clip-reveal (slide up) from the center outward. */
function RevealName({
  text,
  shown,
  outlined,
  reduce,
}: {
  text: string
  shown: boolean
  outlined?: boolean
  reduce: boolean
}) {
  const chars = Array.from(text)
  const center = (chars.length - 1) / 2
  return (
    <h2
      className={`absolute inset-0 flex items-center justify-center whitespace-nowrap uppercase leading-none ${
        outlined ? 'outline-type' : 'text-ink'
      }`}
      style={{ letterSpacing: '-0.01em' }}
      aria-hidden={!shown}
    >
      {chars.map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ height: '1.12em' }}>
          <span
            className="inline-block"
            style={{
              transform: shown ? 'translateY(0%)' : 'translateY(130%)',
              opacity: shown ? 1 : 0,
              transition: reduce
                ? 'none'
                : `transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease`,
              transitionDelay: reduce || !shown ? '0s' : `${Math.abs(i - center) * 0.03}s`,
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </h2>
  )
}

export default function ThemeReveal() {
  const [active, setActive] = useState<number | null>(null)
  const isTouch = useMediaQuery('(hover: none)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')

  // Desktop: hover/focus reveals. Mobile: tap toggles.
  const hoverProps = (i: number) =>
    isTouch
      ? {}
      : {
          onMouseEnter: () => setActive(i),
          onMouseLeave: () => setActive(null),
          onFocus: () => setActive(i),
          onBlur: () => setActive(null),
        }

  const onClick = (i: number) => {
    if (isTouch) setActive((prev) => (prev === i ? null : i))
  }

  return (
    <section
      id="temas"
      aria-label="Lo que canto: amor, fe, amistad, pop y balada latina"
      className="mx-auto w-full max-w-7xl bg-paper px-5 py-48 sm:px-8"
    >
      <p className="eyebrow mb-10 text-center">Lo que canto</p>

      {/* Giant name stage */}
      <div
        className="relative mx-auto select-none text-center font-display font-medium"
        style={{ fontSize: 'clamp(2.2rem, 12vw, 10rem)', height: '1.12em' }}
      >
        <RevealName text={DEFAULT_NAME} shown={active === null} outlined reduce={reduce} />
        {THEMES.map((t, i) => (
          <RevealName key={t.label} text={t.label} shown={active === i} reduce={reduce} />
        ))}
      </div>

      {/* Thumbnail row */}
      <div className="mt-14 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
        {THEMES.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => onClick(i)}
            {...hoverProps(i)}
            aria-pressed={active === i}
            className="group flex flex-col items-center gap-3 outline-none"
          >
            <span
              className="grid place-items-center rounded-lg border border-ink/15 bg-paper text-ink/70 transition-[transform,border-color,color] duration-500 ease-cinema group-hover:border-ink/40 group-hover:text-ink"
              style={{
                width: 84,
                height: 84,
                transform: active === i ? 'scale(1.38)' : 'scale(1)',
                borderColor: active === i ? 'rgba(10,10,10,0.4)' : undefined,
                color: active === i ? 'var(--color-ink)' : undefined,
              }}
            >
              <Sigil motif={t.motif} />
            </span>
            <span
              className="text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink"
              style={{ color: active === i ? 'var(--color-ink)' : undefined }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
