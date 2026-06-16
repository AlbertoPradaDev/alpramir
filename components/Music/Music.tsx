'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { SpotlightGrid, SpotCard } from '@/components/animations/SpotlightGrid/SpotlightGrid'
import { SITE } from '@/lib/site'
import { SpotifyIcon, YouTubeIcon, YouTubeMusicIcon, DeezerIcon } from '@/components/ui/icons'

const PLATFORMS = [
  { name: 'Spotify', desc: 'Álbumes, sencillos y playlists oficiales.', href: SITE.social.spotify, Icon: SpotifyIcon },
  { name: 'YouTube', desc: 'Vídeos musicales y últimos lanzamientos.', href: SITE.social.youtube, Icon: YouTubeIcon },
  { name: 'YouTube Music', desc: 'Toda la discografía en streaming.', href: SITE.social.youtubeMusic, Icon: YouTubeMusicIcon },
  { name: 'Deezer', desc: 'Escucha en alta calidad donde quieras.', href: SITE.social.deezer, Icon: DeezerIcon },
]

export default function Music() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-music-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="musica"
      ref={rootRef}
      className="relative bg-primary px-5 py-20 sm:px-8 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span data-music-reveal className="eyebrow">
            Música
          </span>
          <h2
            data-music-reveal
            className="mt-4 font-display font-bold text-4xl leading-[1.05] text-text sm:text-5xl md:text-6xl"
          >
            Escúchale en tu <span className="text-gold-gradient">plataforma favorita</span>
          </h2>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[7fr_5fr]">
          {/* Spotify player */}
          <div
            data-music-reveal
            className="overflow-hidden rounded-xl border border-line bg-secondary p-2 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]"
          >
            <iframe
              title="Reproductor de Spotify de Alpramir"
              src={`https://open.spotify.com/embed/artist/${SITE.spotifyArtistId}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              style={{ minHeight: 420, borderRadius: 8 }}
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* Platform cards */}
          <div data-music-reveal>
            <SpotlightGrid className="h-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              {PLATFORMS.map(({ name, desc, href, Icon }) => (
                <SpotCard key={name} href={href}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-accent transition-transform duration-300 group-hover:scale-110">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-text">
                        {name}
                        <ArrowIcon />
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text/60">{desc}</p>
                    </div>
                  </div>
                </SpotCard>
              ))}
            </SpotlightGrid>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="text-accent opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H8M17 7v9" />
    </svg>
  )
}
