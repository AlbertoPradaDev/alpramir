'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'
import portadaImg from '@/public/portada.jpeg'

const THEMES = ['El amor', 'La fe', 'La amistad', 'El día a día']

export default function Bio() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-bio-photo]', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
      })
      gsap.from('[data-bio-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="biografia"
      ref={rootRef}
      className="relative bg-primary px-5 py-20 sm:px-8 md:px-16 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[5fr_6fr] md:gap-16">
        {/* Photo */}
        <div
          data-bio-photo
          className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] md:aspect-[4/5]"
        >
          <Image
            src={portadaImg}
            alt="Alpramir, cantautor y productor musical"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-top"
          />
        </div>

        {/* Text */}
        <div>
          <span data-bio-reveal className="eyebrow">
            Biografía
          </span>
          <h2
            data-bio-reveal
            className="mt-4 font-display text-4xl leading-[1.05] text-text sm:text-5xl md:text-6xl"
          >
            Melodías cercanas,
            <br />
            <span className="text-gold-gradient">letras con sentimiento</span>
          </h2>
          <p
            data-bio-reveal
            className="mt-7 max-w-xl text-base leading-relaxed text-text/75 md:text-lg"
          >
            {SITE.bio}
          </p>

          <div data-bio-reveal className="mt-8 flex flex-wrap gap-2.5">
            {THEMES.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-secondary px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-accent"
              >
                {t}
              </span>
            ))}
          </div>

          <div data-bio-reveal className="mt-9">
            <Button href="#musica" variant="outline">
              Escuchar su música
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
