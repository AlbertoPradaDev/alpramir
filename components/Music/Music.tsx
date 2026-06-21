import SectionReveal from '@/components/ui/SectionReveal'
import { SITE } from '@/lib/site'
import { SpotifyIcon, YouTubeIcon, YouTubeMusicIcon, DeezerIcon } from '@/components/ui/icons'

const PLATFORMS = [
  { name: 'Spotify', desc: 'Álbumes, sencillos y playlists oficiales.', href: SITE.social.spotify, Icon: SpotifyIcon },
  { name: 'YouTube', desc: 'Vídeos musicales y últimos lanzamientos.', href: SITE.social.youtube, Icon: YouTubeIcon },
  { name: 'YouTube Music', desc: 'Toda la discografía en streaming.', href: SITE.social.youtubeMusic, Icon: YouTubeMusicIcon },
  { name: 'Deezer', desc: 'Escucha en alta calidad donde quieras.', href: SITE.social.deezer, Icon: DeezerIcon },
]

export default function Music() {
  return (
    <section id="musica" className="bg-paper px-5 py-24 sm:px-8 md:px-16 md:py-36">
      <SectionReveal variant="fade-rise" className="mx-auto max-w-6xl">
        <div data-reveal className="max-w-2xl">
          <span className="eyebrow">Música</span>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
            Escúchame en tu <span className="outline-type">plataforma favorita</span>
          </h2>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[7fr_5fr]">
          <div data-reveal className="overflow-hidden rounded-sm border border-line-invert bg-ink p-2">
            <iframe
              title="Reproductor de Spotify de Alpramir"
              src={`https://open.spotify.com/embed/artist/${SITE.spotifyArtistId}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              style={{ minHeight: 420, borderRadius: 4 }}
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          <ul data-reveal className="flex flex-col divide-y divide-line border-y border-line">
            {PLATFORMS.map(({ name, desc, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5 transition-colors hover:bg-ink/[0.03]"
                >
                  <span className="text-ink"><Icon /></span>
                  <span className="flex-1">
                    <span className="block font-sans text-base font-semibold text-ink">{name}</span>
                    <span className="block text-sm text-ink/55">{desc}</span>
                  </span>
                  <span className="text-ink/40 transition-transform duration-300 ease-cinema group-hover:translate-x-1" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    </section>
  )
}
