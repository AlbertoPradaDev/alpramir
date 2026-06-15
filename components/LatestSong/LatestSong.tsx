'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'

const YT_ID = 'Cs0WW_g7A6U'

export default function LatestSong() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-song-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
      })
      gsap.from('[data-song-frame]', {
        clipPath: 'inset(0 0 0 100%)',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-secondary px-5 py-20 sm:px-8 md:px-16 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <div>
          <span data-song-reveal className="eyebrow">
            Último lanzamiento
          </span>
          <h2
            data-song-reveal
            className="mt-4 font-display text-4xl leading-[1.05] text-text sm:text-5xl md:text-6xl"
          >
            Su <span className="text-gold-gradient">última canción</span>
          </h2>
          <p
            data-song-reveal
            className="mt-6 max-w-md text-base leading-relaxed text-text/75 md:text-lg"
          >
            Composiciones originales y versiones reinterpretadas que buscan conectar
            con quien escucha. Dale al play y déjate llevar.
          </p>
          <div data-song-reveal className="mt-8">
            <Button href={SITE.social.youtube} variant="primary" external>
              Ver más en YouTube
            </Button>
          </div>
        </div>

        <div
          data-song-frame
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-line shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
        >
          <iframe
            title="Última canción de Alpramir en YouTube"
            src={`https://www.youtube-nocookie.com/embed/${YT_ID}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
