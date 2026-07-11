import Link from 'next/link'
import { SITE, NAV_LINKS } from '@/lib/site'
import { SpotifyIcon, YouTubeIcon, InstagramIcon, TikTokIcon } from '@/components/ui/icons'

const SOCIALS = [
  { name: 'Spotify', href: SITE.social.spotify, Icon: SpotifyIcon },
  { name: 'YouTube', href: SITE.social.youtube, Icon: YouTubeIcon },
  { name: 'Instagram', href: SITE.social.instagram, Icon: InstagramIcon },
  { name: 'TikTok', href: SITE.social.tiktok, Icon: TikTokIcon },
]

export default function Footer() {
  return (
    <footer className="bg-ink px-4 py-8 md:px-8 md:py-16 text-paper">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-display text-4xl font-medium tracking-tight md:text-5xl">
              {SITE.name}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Soy {SITE.role.toLowerCase()} en {SITE.location}. {SITE.tagline}.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow !text-paper/50">Navegación</span>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-sm font-semibold text-paper/75 transition-colors hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <span className="eyebrow !text-paper/50">Sígueme</span>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-invert text-paper/70 transition-colors duration-300 ease-cinema hover:border-paper hover:text-paper"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-line-invert" />
        <p className="mt-6 text-xs text-paper/45">
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
