'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'

const PHOTOS = [
  { src: '/img-1.jpeg', alt: 'Evento musical al aire libre', span: 'md:col-span-5 md:row-span-2 aspect-[4/5]', sizes: '(max-width: 768px) 100vw, 42vw' },
  { src: '/img-2.jpeg', alt: 'Alpramir en el estudio', span: 'md:col-span-7 aspect-[16/9]', sizes: '(max-width: 768px) 100vw, 58vw' },
  { src: '/img-3.jpeg', alt: 'Produciendo musica activamente', span: 'md:col-span-7 aspect-[16/10]', sizes: '(max-width: 768px) 100vw, 58vw' },
]

export default function Gallery() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-gallery-item]', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="fotos"
      ref={rootRef}
      className="relative bg-primary px-5 py-20 sm:px-8 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">Fotos</span>
          <h2 className="mt-4 font-display font-bold text-4xl leading-[1.05] text-text sm:text-5xl md:text-6xl">
            Detrás de la <span className="text-gold-gradient">música</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {PHOTOS.map((p) => (
            <figure
              key={p.src}
              data-gallery-item
              className={`group relative overflow-hidden rounded-lg border border-line ${p.span}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={p.sizes}
                className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-105"
              />
              <figcaption className="media-pill absolute bottom-3 left-3 rounded-md px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-text/80">
                {p.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
