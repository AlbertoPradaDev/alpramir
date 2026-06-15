import Image from 'next/image'
import Link from 'next/link'
import { SITE, NAV_LINKS } from '@/lib/site'
import {
  SpotifyIcon,
  YouTubeIcon,
  DeezerIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/components/ui/icons'

const SOCIALS = [
  { name: 'Spotify', href: SITE.social.spotify, Icon: SpotifyIcon },
  { name: 'YouTube', href: SITE.social.youtube, Icon: YouTubeIcon },
  { name: 'Deezer', href: SITE.social.deezer, Icon: DeezerIcon },
  { name: 'Instagram', href: SITE.social.instagram, Icon: InstagramIcon },
  { name: 'TikTok', href: SITE.social.tiktok, Icon: TikTokIcon },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-secondary px-5 pt-16 pb-10 sm:px-8 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative h-16 w-48">
              <Image
                src="/logo.png"
                alt="Alpramir"
                fill
                sizes="192px"
                className="object-contain object-center md:object-left"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text/60">
              {SITE.role} en {SITE.location}. {SITE.tagline}.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col items-center gap-3 md:items-start">
            <span className="eyebrow mb-1">Navegación</span>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-heading text-sm font-semibold text-text/75 transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <span className="eyebrow mb-1">Síguele</span>
            <div className="flex flex-wrap justify-center gap-3">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-text/70 transition-all duration-300 ease-cinema hover:border-accent hover:text-accent hover:bg-[rgba(200,160,74,0.08)]"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-rule mt-12 opacity-40" />
        <p className="mt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
