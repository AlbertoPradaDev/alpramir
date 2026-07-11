'use client'
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card'

// "Detrás de la música" as a draggable photo pile (Shelf "Draggable cards").
// Every card is centered horizontally with `left-1/2` + a negative margin of half
// the card width (`-ml-36` mobile / `-ml-40` sm), which VERIFIABLY centers on the
// stage (the stage itself is centered with mx-auto). Mobile = a neat centered
// stack fanned only by rotation + vertical stagger (no room to spread on phones);
// on `sm+` the outer two spread symmetrically (`sm:-ml-72` left / `sm:-ml-8`
// right) around that same center, so the group is always centered on every width.
const PHOTOS = [
  { src: '/img-2.jpeg', alt: 'En el estudio', className: 'absolute left-1/2 -ml-36 top-12 rotate-[-7deg] sm:-ml-72 sm:top-20' },
  { src: '/img-3.jpeg', alt: 'Entrevista en la radio', className: 'absolute left-1/2 -ml-36 top-12 rotate-[7deg] sm:-ml-8 sm:top-20' },
  { src: '/img-1.jpeg', alt: 'En un evento al aire libre', className: 'absolute left-1/2 -ml-36 top-8 rotate-[1deg] sm:-ml-40 sm:top-12' },
]

export default function DraggableGallery() {
  return (
    <section id="fotos" className="bg-paper">
      <div className="mx-auto  px-4 py-8 md:px-8 md:py-16">
        <span className="eyebrow">Fotos</span>
        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
          Detrás de la <span className="outline-type">música</span>
        </h2>
        <p className="mt-4 text-sm text-ink/40">Arrastra las fotos para moverlas.</p>
      </div>

      <DraggableCardContainer className="relative overflow-hidden px-4 pb-8 md:pb-16">
        {/* Fixed-width stage, centered with mx-auto. w-72 cards (mobile) / w-80 (sm+). */}
        <div className="relative mx-auto h-[400px] w-full max-w-[600px] sm:h-[500px]">
          {PHOTOS.map((p) => (
            <DraggableCardBody key={p.src} className={p.className}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="pointer-events-none relative z-10 h-56 w-56 rounded-sm object-cover sm:h-64 sm:w-64"
              />
              <h3 className="mt-4 text-center font-display text-lg text-ink">{p.alt}</h3>
            </DraggableCardBody>
          ))}
        </div>
      </DraggableCardContainer>
    </section>
  )
}
