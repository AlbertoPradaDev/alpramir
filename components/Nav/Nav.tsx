'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { NAV_LINKS, SITE } from '@/lib/site'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return
    const ctx = gsap.context(() => {
      gsap.to(drawer, { xPercent: open ? 0 : 100, duration: 0.5, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-cinema ${
        scrolled ? 'bg-primary/70 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-4 sm:px-8 md:h-20 lg:px-16">
        <Link href="#inicio" aria-label="Alpramir — inicio" className="relative block h-8 w-28 md:h-9 md:w-32">
          <Image src="/logo.png" alt="Alpramir" fill sizes="128px" className="object-contain object-left" priority />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-heading text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-text/85 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={SITE.social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[rgba(230,196,119,0.35)] px-4 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent transition-all hover:bg-[rgba(200,160,74,0.1)]"
          >
            <SpotifyIcon /> Spotify
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`block h-0.5 w-6 bg-text transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-text transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-text transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={drawerRef}
        className="fixed right-0 top-0 z-50 flex h-[100dvh] w-3/4 max-w-xs translate-x-full flex-col gap-2 border-l border-line bg-primary p-8 pt-24 md:hidden"
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="flex min-h-[44px] items-center font-display text-2xl tracking-wide text-text"
          >
            {l.label}
          </Link>
        ))}
        <a
          href={SITE.social.spotify}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-accent px-6 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#1a1206]"
        >
          <SpotifyIcon /> Escuchar
        </a>
      </div>
    </header>
  )
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.213c3.809-.871 7.077-.496 9.712 1.114a.623.623 0 01.207.856zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 11-.452-1.493c3.632-1.102 8.147-.568 11.232 1.329a.78.78 0 01.257 1.073zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 11-.542-1.79c3.532-1.072 9.404-.865 13.115 1.337a.935.935 0 11-.956 1.609z" />
    </svg>
  )
}
