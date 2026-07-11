import Button from '@/components/ui/Button'
import SectionReveal from '@/components/ui/SectionReveal'
import { SITE } from '@/lib/site'

const YT_ID = 'Cs0WW_g7A6U'

export default function LatestSong() {
  return (
    <section className="bg-paper px-4 py-8 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <div>
          <span className="eyebrow">Último lanzamiento</span>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
            Mi <span className="outline-type">última canción</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
            Composiciones originales y versiones reinterpretadas con las que busco
            conectar contigo. Dale al play y déjate llevar.
          </p>
          <div className="mt-8">
            <Button href={SITE.social.youtube} variant="primary" external>
              Ver más en YouTube
            </Button>
          </div>
        </div>

        <SectionReveal
          variant="mask-slide"
          className="relative aspect-video w-full overflow-hidden rounded-sm border border-line-invert bg-ink"
        >
          <iframe
            title="Última canción de Alpramir en YouTube"
            src={`https://www.youtube-nocookie.com/embed/${YT_ID}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </SectionReveal>
      </div>
    </section>
  )
}
