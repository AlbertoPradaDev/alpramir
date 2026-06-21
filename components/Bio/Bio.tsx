import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionReveal from '@/components/ui/SectionReveal'
import { SITE } from '@/lib/site'
import portadaImg from '@/public/portada.webp'

const THEMES = ['El amor', 'La fe', 'La amistad', 'El día a día']

export default function Bio() {
  return (
    <section id="biografia" className="bg-paper px-5 py-24 sm:px-8 md:px-16 md:py-36">
      <SectionReveal
        variant="clip-wipe"
        className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[5fr_6fr] md:gap-16"
      >
        <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line">
          <Image
            src={portadaImg}
            alt="Alpramir, cantautor y productor musical"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-cinema group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
        </div>

        <div>
          <span className="eyebrow">Biografía</span>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
            Melodías cercanas,
            <br />
            <span className="outline-type">letras con sentimiento</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
            {SITE.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {THEMES.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/25 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/80"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-9">
            <Button href="#musica" variant="outline">
              Escuchar mi música
            </Button>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
