'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import HeroText from './HeroText'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow Ken-Burns zoom that continues as the hero scrolls away (parallax exit).
      gsap.fromTo(
        mediaRef.current,
        { scale: 1.04 },
        {
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-primary"
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {/* Mobile: portrait crop */}
        <Image
          src="/hero-mobile.jpg"
          alt="Guitarra acústica iluminada sobre fondo oscuro — Alpramir"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] md:hidden"
        />
        {/* Desktop: landscape crop */}
        <Image
          src="/hero-desktop.jpg"
          alt="Guitarra acústica iluminada junto a su estuche — Alpramir"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
      </div>

      {/* Flat mobile scrim for legibility — no gradient, no vignette */}
      <div className="pointer-events-none absolute inset-0 bg-primary/40 md:bg-transparent" />

      <div className="absolute inset-0 z-10 flex items-center">
        <HeroText />
      </div>
    </section>
  )
}
