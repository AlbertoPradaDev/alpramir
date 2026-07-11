'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS, SITE } from '@/lib/site'
import { ScrollTrigger } from '@/lib/gsap'

const DRAWER_LINKS = [...NAV_LINKS, { label: 'Spotify', href: SITE.social.spotify }]

export default function StaggeredNav() {
  const [open, setOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)

  // Bar text is light over the black hero, dark once scrolled onto the white body.
  // Driven by a single ScrollTrigger (shared with the hero's batched ticker) that
  // toggles only at the crossing point — no per-event offsetHeight read, and
  // setState fires twice per full scroll instead of on every scroll event.
  useEffect(() => {
    const el = document.getElementById('inicio')
    if (!el) return
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'bottom-=80 top',
      end: 'max',
      // Active once scrolled past the hero → dark text on white. onToggle fires
      // on the initial evaluation too, so the load state is correct (incl. a
      // mid-page reload) without a synchronous setState in the effect body.
      onToggle: (self) => setOverHero(!self.isActive),
      invalidateOnRefresh: true,
    })
    return () => st.kill()
  }, [])

  // Lock body scroll + Esc-to-close while the drawer is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const barText = overHero && !open ? 'text-paper' : 'text-ink'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex h-16 items-center justify-between px-5 sm:px-8 md:h-20 md:px-12 lg:px-16">
        <Link
          href="#inicio"
          aria-label="Alpramir — inicio"
          className={`font-display text-xl font-medium tracking-tight transition-colors duration-300 md:text-2xl ${barText}`}
        >
          {SITE.name}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className={`font-sans text-[0.74rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${barText}`}
        >
          Menú
        </button>
      </nav>

      {/* Scrim */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-500 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        inert={!open}
        className={`fixed right-0 top-0 z-50 h-[100dvh] w-[min(420px,82vw)] bg-ink px-[8%] pt-[12vh] text-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute right-[8%] top-[6vh] text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
        >
          Cerrar
        </button>
        <ul className="flex flex-col gap-1">
          {DRAWER_LINKS.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                {...(l.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className={`block py-[0.18em] font-display text-3xl text-paper transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:text-4xl ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionDelay: open && !reduce ? `${0.22 + i * 0.08}s` : '0s' }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </header>
  )
}
