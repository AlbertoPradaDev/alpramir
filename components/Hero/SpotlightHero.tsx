'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'

// Black theatrical stage: on first load the darkness lifts as a radial spotlight
// (a transparent hole driven by --r) grows to reveal the caption.
export default function SpotlightHero() {
  const darkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = darkRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { '--r': 82 })
      return
    }
    const tween = gsap.fromTo(
      el,
      { '--r': 0 },
      { '--r': 82, duration: 1.7, ease: 'power2.inOut', delay: 0.15 },
    )
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section
      id="inicio"
      className="relative h-[100dvh] w-full overflow-hidden bg-ink text-paper"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 120% at 50% 42%, #1a1a1a 0%, #0a0a0a 60%)' }}
      />

      <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
        <div>
          <p className="eyebrow !text-paper/60">
            {SITE.role} · {SITE.location}
          </p>
          <h1 className="mt-5 font-display text-[18vw] font-medium leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
            {SITE.name}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-paper/75 md:text-base">
            {SITE.tagline}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={SITE.social.spotify} variant="primary" external className="!bg-paper !text-ink hover:!bg-paper/85">
              Escuchar en Spotify
            </Button>
            <Button href="#biografia" variant="outline" className="!border-paper/40 !text-paper hover:!bg-paper hover:!text-ink">
              Conoce su historia
            </Button>
          </div>
        </div>
      </div>

      {/* The darkness — a radial hole (the spotlight) grows via --r to reveal the hero. */}
      <div
        ref={darkRef}
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          // @ts-expect-error CSS custom property
          '--r': 0,
          background:
            'radial-gradient(circle at 50% 42%, transparent calc(var(--r, 0) * 1%), rgba(10,10,10,0.97) calc(var(--r, 0) * 1% + 28%))',
        }}
      />

      <span className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-[0.66rem] uppercase tracking-[0.25em] text-paper/45">
        Desliza para descubrir
      </span>
    </section>
  )
}
