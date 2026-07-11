import Image from 'next/image'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'

// Black theatrical stage: a radial spotlight (a transparent hole) reveals the caption.
export default function SpotlightHero() {
  return (
    <section
      id="inicio"
      className="relative h-[100dvh] w-full overflow-hidden bg-ink text-paper"
    >
      {/* Responsive background photo, revealed by the spotlight. */}
      <Image
        src="/hero-mobile.webp"
        alt="Alpramir"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center grayscale md:hidden"
      />
      <Image
        src="/hero-desktop.webp"
        alt="Alpramir"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center grayscale md:block"
      />

      {/* Dark scrim: keeps the stage feel and the white caption legible over the photo. */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 120% at 50% 42%, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.92) 72%)' }}
      />

      <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
        <div style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
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
              Conoce mi historia
            </Button>
          </div>
        </div>
      </div>

      {/* The darkness — a radial hole (the spotlight) reveals the hero. */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, transparent 82%, rgba(10,10,10,0.97) 110%)',
        }}
      />
      
    </section>
  )
}
