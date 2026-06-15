'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'

export default function HeroText() {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the whole <h1> (NOT per-character) — SplitText wraps each glyph
      // in its own transformed element, which breaks the background-clip:text
      // gradient and makes the letters invisible. Whole-element reveal keeps the
      // gradient fill intact.
      gsap.from(titleRef.current, {
        yPercent: 18,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
      })
      gsap.from('[data-hero-fade]', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.6,
      })
      // Gentle fade as the hero scrolls out
      gsap.to(rootRef.current, {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#inicio',
          start: 'top top',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center sm:px-8 md:items-start md:px-16 md:text-left"
    >
      <span
        data-hero-fade
        className="media-pill eyebrow mb-5 rounded-md px-4 py-1.5"
      >
        {SITE.role} · {SITE.location}
      </span>

      <h1
        ref={titleRef}
        className="hero-title font-display text-[19vw] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[9rem]"
        style={{ perspective: '600px' }}
      >
        {SITE.name}
      </h1>

      <p
        data-hero-fade
        className="media-pill mt-6 max-w-[20rem] rounded-lg px-4 py-2.5 font-heading text-sm font-semibold leading-relaxed text-text/90 sm:max-w-md md:text-base"
      >
        {SITE.tagline}
      </p>

      <div
        data-hero-fade
        className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
      >
        <Button href={SITE.social.spotify} variant="primary" external>
          Escuchar en Spotify
        </Button>
        <Button href="#biografia" variant="outline">
          Conoce su historia
        </Button>
      </div>

      <span
        data-hero-fade
        className="media-pill mt-10 hidden items-center gap-2 rounded-md px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-text/70 md:inline-flex"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        Desliza para descubrir
      </span>
    </div>
  )
}
