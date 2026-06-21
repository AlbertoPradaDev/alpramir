'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@/lib/useMediaQuery'

const PHOTOS = [
  { src: '/img-1.jpeg', alt: 'En un evento al aire libre' },
  { src: '/img-2.jpeg', alt: 'En el estudio' },
  { src: '/img-3.jpeg', alt: 'Produciendo música' },
]

export default function HorizontalGallery() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section id="fotos" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 md:px-16 md:pt-36">
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

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const clamp = (v: number) => Math.min(1, Math.max(0, v))
    const update = () => {
      const total = wrap.offsetHeight - window.innerHeight
      const p = clamp(-wrap.getBoundingClientRect().top / total)
      const max = track.scrollWidth - window.innerWidth
      track.style.transform = `translateX(${-p * max}px)`
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative mt-12 h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={trackRef} className="flex gap-[3vw] px-[5vw] will-change-transform">
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              className="group relative h-[68vh] w-[58vw] flex-none overflow-hidden rounded-sm border border-line"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="58vw"
                className="object-cover grayscale transition-[filter] duration-700 ease-cinema group-hover:grayscale-0"
              />
              <figcaption className="absolute bottom-4 left-4 font-display text-lg text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                0{i + 1} · {p.alt}
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
