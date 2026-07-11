'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { gsap } from '@/lib/gsap'

const PHOTOS = [
  { src: '/img-1.jpeg', alt: 'En un evento al aire libre' },
  { src: '/img-2.jpeg', alt: 'En el estudio' },
  { src: '/img-3.jpeg', alt: 'Entrevista en la radio' },
]

export default function HorizontalGallery() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section id="fotos" className="bg-paper">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <span className="eyebrow">Fotos</span>
        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
          Detrás de la <span className="outline-type">música</span>
        </h2>
      </div>
      {isDesktop ? <DesktopTrack /> : <MobileStack />}
    </section>
  )
}

// Desktop: a tall wrapper pins the viewport while the track slides sideways with scroll.
function DesktopTrack() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Horizontal scroll driven by GSAP ScrollTrigger — one batched ticker shared
  // with the hero, geometry cached at refresh. No per-event getBoundingClientRect
  // and nothing runs while the section is outside its active range. Progress is
  // mapped across the CSS sticky's pinned travel (start top top → end bottom bottom),
  // so the track and the sticky stay in sync (card widths are fixed at 58vw, so
  // scrollWidth is stable and image loading can't stale the distance).
  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          // Promote the track only while the section is active; release otherwise.
          onToggle: (self) => {
            track.style.willChange = self.isActive ? 'transform' : 'auto'
          },
        },
      })
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="relative mt-12 h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={trackRef} className="flex gap-[3vw] px-[5vw]">
          {PHOTOS.map((p) => (
            <figure
              key={p.src}
              className="group relative h-[68vh] w-[58vw] flex-none overflow-hidden rounded-sm border border-line"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="58vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 font-display text-lg text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {p.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mobile: the same photos as a vertical stack, each fading/rising in on scroll.
function MobileStack() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = root.querySelectorAll<HTMLElement>('[data-reveal-item]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.2 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="mt-10 flex flex-col gap-5 px-5 pb-8 sm:px-8">
      {PHOTOS.map((p) => (
        <figure
          key={p.src}
          data-reveal-item
          className="relative aspect-[4/5] w-full translate-y-12 overflow-hidden rounded-sm border border-line opacity-0 transition-all duration-700 ease-cinema [&.in]:translate-y-0 [&.in]:opacity-100"
        >
          <Image src={p.src} alt={p.alt} fill sizes="100vw" className="object-cover" />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">
            {p.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
