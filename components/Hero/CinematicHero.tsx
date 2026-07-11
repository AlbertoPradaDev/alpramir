'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'
import { gsap } from '@/lib/gsap'

/**
 * Cinematic scroll hero — a 200vh section with a sticky black stage.
 * The piano loop (grayscale, under the spotlight) slowly zooms while the
 * caption fades as you scroll. GPU-only transforms (scale/opacity) → no jank.
 *
 * The video files don't exist yet. Flip VIDEO_READY to true once you drop
 * the four compressed files into /public (see paths below). Until then the
 * existing stills render as the poster and still get the scroll zoom.
 */
const VIDEO_READY = false

// Posters are pre-desaturated (baked grayscale) so the scrub scales a plain
// bitmap — a cheap GPU texture upscale, no runtime filter layer to re-raster.
// Generate the videos already grayscale too (see WaveSpeed plan).
const MEDIA = {
  desktop: {
    poster: '/hero-desktop-bw.webp',
    webm: '/hero-desktop.webm',
    mp4: '/hero-desktop.mp4',
  },
  mobile: {
    poster: '/hero-mobile-bw.webp',
    webm: '/hero-mobile.webm',
    mp4: '/hero-mobile.mp4',
  },
} as const

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)

  // Scroll-scrubbed zoom + caption fade, scoped & auto-reverted on unmount.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          // Promote the media layer only while the hero is active; release after.
          onToggle: (self) => {
            if (mediaRef.current)
              mediaRef.current.style.willChange = self.isActive ? 'transform' : 'auto'
          },
        },
      })
      tl.to(mediaRef.current, { scale: 1.12, ease: 'none' }, 0)
      tl.to(
        captionRef.current,
        { yPercent: -12, opacity: 0, ease: 'none' },
        0.15,
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[200vh] w-full bg-ink"
    >
      {/* Sticky black stage: one screen tall, pinned across the 200vh scroll. */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden text-paper">
        {/* Media layer — this is what the scroll zooms. GSAP adds/removes the
            will-change hint around the scrub, so the promoted layer is released
            when the hero leaves the viewport. Desktop/mobile toggled by CSS
            (no JS remount) — assets are pre-desaturated, so no runtime filter. */}
        <div ref={mediaRef} className="absolute inset-0">
          {VIDEO_READY ? (
            <>
              <video
                className="hidden h-full w-full object-cover object-center md:block"
                poster={MEDIA.desktop.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={MEDIA.desktop.webm} type="video/webm" />
                <source src={MEDIA.desktop.mp4} type="video/mp4" />
              </video>
              <video
                className="h-full w-full object-cover object-center md:hidden"
                poster={MEDIA.mobile.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={MEDIA.mobile.webm} type="video/webm" />
                <source src={MEDIA.mobile.mp4} type="video/mp4" />
              </video>
            </>
          ) : (
            <>
              <Image
                src={MEDIA.desktop.poster}
                alt="Alpramir"
                fill
                priority
                sizes="100vw"
                className="hidden object-cover object-center md:block"
              />
              <Image
                src={MEDIA.mobile.poster}
                alt="Alpramir"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center md:hidden"
              />
            </>
          )}
        </div>

        {/* Dark scrim: keeps the stage feel and the white caption legible. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 42%, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.92) 72%)',
          }}
        />

        {/* Caption. */}
        <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
          <div ref={captionRef} style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
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
              <Button
                href={SITE.social.spotify}
                variant="primary"
                external
                className="!bg-paper !text-ink hover:!bg-paper/85"
              >
                Escuchar en Spotify
              </Button>
              <Button
                href="#biografia"
                variant="outline"
                className="!border-paper/40 !text-paper hover:!bg-paper hover:!text-ink"
              >
                Conoce mi historia
              </Button>
            </div>
          </div>
        </div>

        {/* The darkness — a radial hole (the spotlight) reveals the stage. */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, transparent 82%, rgba(10,10,10,0.97) 110%)',
          }}
        />
      </div>
    </section>
  )
}
