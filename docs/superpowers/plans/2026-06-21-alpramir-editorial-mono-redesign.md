# Alpramir Editorial-Mono Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Alpramir single page in a black-and-white editorial style (shelf-library language) with a spotlight-in hero, staggered-menu nav, sticky-words act, designed-varied section transitions, and a horizontal/reveal-on-scroll gallery.

**Architecture:** Keep the component-per-section pattern. Foundation first (design tokens, fonts, shared `Button` + `SectionReveal`), then the four effect components, then restyle the content sections, then swap `layout.tsx`/`page.tsx` and delete dead files, then verify. GSAP/ScrollTrigger (already a dependency) drives scroll reveals/scrubs; the sticky-words highlight band is pure CSS. The page runs a deliberate black → white → black arc.

**Tech Stack:** Next.js 16.2.9 (App Router) · React 19 · Tailwind v4 (`@theme` in `globals.css`) · GSAP 3.15 (ScrollTrigger) · `next/font` (Fraunces + Inter).

**Testing note:** This repo has no unit-test framework, and adding one for a visual redesign is out of scope (YAGNI). Each task is verified with `npm run lint` + `npx tsc --noEmit` (fast, must pass clean), and the final task verifies the whole page with `npm run build` plus a Claude Preview pass across breakpoints and reduced-motion. Reference for framework specifics: `node_modules/next/dist/docs/` (per `AGENTS.md`).

**Branch:** Work continues on `redesign/editorial-mono` (already created; spec already committed there).

---

## File Structure

**Created:**
- `components/Nav/StaggeredNav.tsx` — minimal bar + staggered drawer (primary nav, all breakpoints)
- `components/Hero/SpotlightHero.tsx` — black stage + spotlight-in reveal
- `components/StickyWords/StickyWords.tsx` — pinned lead-in + words lit on scroll (pure-CSS band)
- `components/ui/SectionReveal.tsx` — shared wrapper owning the per-section transitions
- `components/Gallery/HorizontalGallery.tsx` — desktop horizontal scroll, mobile reveal-on-scroll

**Modified:**
- `app/globals.css` — mono tokens, Fraunces var, `.outline-type` / `.eyebrow` / `.sticky-words`, drop gold helpers
- `app/layout.tsx` — add Fraunces, drop `<Cursor/>`, use `StaggeredNav`
- `app/page.tsx` — new section order, drop `KineticMarquee`
- `components/ui/Button.tsx` — mono variants
- `components/Bio/Bio.tsx`, `components/Music/Music.tsx`, `components/LatestSong/LatestSong.tsx`, `components/Newsletter/Newsletter.tsx`, `components/Footer/Footer.tsx` — B&W restyle via `SectionReveal`

**Deleted:**
- `components/ui/Cursor.tsx`
- `components/Hero/Hero.tsx`, `components/Hero/HeroText.tsx`
- `components/Nav/Nav.tsx`
- `components/Gallery/Gallery.tsx`
- `components/animations/KineticMarquee/KineticMarquee.tsx`
- `components/animations/SpotlightGrid/SpotlightGrid.tsx`

Unchanged: `lib/site.ts`, `lib/gsap.ts`, `lib/useMediaQuery.ts`, `components/ui/icons.tsx`.

---

## Task 1: Design tokens, fonts & global helpers

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css` entirely**

```css
@import "tailwindcss";

@theme {
  --color-paper: #ffffff;
  --color-ink: #0a0a0a;
  --color-muted: #6b6b6b;
  --color-line: rgba(10, 10, 10, 0.12);
  --color-line-invert: rgba(255, 255, 255, 0.18);

  --font-display: var(--font-fraunces);
  --font-sans: var(--font-inter);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
  color-scheme: light;
}

body {
  background-color: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background: var(--color-ink);
  color: var(--color-paper);
}

/* Uppercase tracked label */
.eyebrow {
  font-family: var(--font-sans), sans-serif;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: var(--color-muted);
}

/* Outlined display headline (stroke, no fill) */
.outline-type {
  color: transparent;
  -webkit-text-stroke: 1.25px var(--color-ink);
  paint-order: stroke fill;
}
.outline-type.on-dark {
  -webkit-text-stroke-color: var(--color-paper);
}

/* One easing curve for interactive transitions */
.ease-cinema {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Sticky-words act (pure-CSS highlight band, ported from shelf) ───── */
.sticky-words {
  --start: 50vh;
  --space: 40vh;
  --count: 6;
  --dim: color-mix(in oklch, var(--color-ink), transparent 84%);
  --accent: var(--color-ink);
  background: var(--color-paper);
}
.sticky-words .head {
  font-family: var(--font-display), Georgia, serif;
  font-size: clamp(2.2rem, 7vw, 4.6rem);
  font-weight: 600;
  line-height: 1.2;
  position: sticky;
  top: calc((var(--count) - 1) * -1lh);
  display: flex;
  align-items: start;
  width: 100%;
  margin-bottom: var(--space);
}
.sticky-words .row {
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: center;
  padding-top: calc(var(--start) - 0.5lh);
  gap: 0.4ch;
}
.sticky-words .lead {
  position: sticky;
  top: calc(var(--start) - 0.5lh);
  margin: 0;
  font-weight: 600;
  white-space: nowrap;
}
.sticky-words ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sticky-words li {
  font-weight: 600;
  white-space: nowrap;
  background: linear-gradient(
    180deg,
    var(--dim) 0 calc(var(--start) - 0.5lh),
    var(--accent) calc(var(--start) - 0.55lh) calc(var(--start) + 0.55lh),
    var(--dim) calc(var(--start) + 0.5lh)
  );
  background-attachment: fixed;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .sticky-words li { background: none; color: var(--color-ink); }
}
@media (hover: none) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Add Fraunces in `app/layout.tsx`**

Replace the font imports/usage. Add Fraunces alongside Inter and expose `--font-fraunces`:

```tsx
import { Fraunces, Inter } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
```

Update the `<html>` className to include both variables: `className={`${fraunces.variable} ${inter.variable} antialiased`}`. Leave `<Cursor/>` / `<Nav/>` as they are for now (swapped in Task 4). Keep all existing `metadata`.

- [ ] **Step 3: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. (Existing gold components still build; their now-undefined utility classes like `text-accent` simply stop applying — that is expected and fixed as each component is rewritten.)

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: mono design tokens, Fraunces font, editorial helpers

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Mono `Button`

**Files:**
- Modify: `components/ui/Button.tsx`

- [ ] **Step 1: Replace the `VARIANTS` map and base classes**

Keep the `ButtonProps` interface, `SIZES`, and the `external`/`Link` branching exactly as-is. Replace only the styling:

```tsx
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-ink/85 active:bg-ink/75',
  outline:
    'border border-ink/40 text-ink hover:bg-ink hover:text-paper active:bg-ink/90',
}
```

And change the `base` constant to drop the rounded-xl/gold feel for an editorial pill:

```tsx
const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ease-cinema select-none'
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: mono Button variants

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: `SectionReveal` shared wrapper (designed-varied transitions)

**Files:**
- Create: `components/ui/SectionReveal.tsx`

- [ ] **Step 1: Create `components/ui/SectionReveal.tsx`**

```tsx
'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

export type RevealVariant = 'clip-wipe' | 'fade-rise' | 'mask-slide' | 'scale-in'

interface SectionRevealProps {
  variant: RevealVariant
  children: ReactNode
  className?: string
}

// Shared reveal wrapper. Each section is assigned a fixed variant (never random),
// so the page always looks intentional. Children that should stagger in the
// `fade-rise` variant opt in with a `data-reveal` attribute.
export default function SectionReveal({
  variant,
  children,
  className = '',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const trigger = { trigger: el, start: 'top 75%', once: true }
      if (variant === 'clip-wipe') {
        gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.out', scrollTrigger: trigger })
      } else if (variant === 'mask-slide') {
        gsap.from(el, { clipPath: 'inset(0 0 0 100%)', duration: 1.1, ease: 'power3.out', scrollTrigger: trigger })
      } else if (variant === 'scale-in') {
        gsap.from(el, { scale: 0.94, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: trigger })
      } else {
        const targets = el.querySelectorAll('[data-reveal]')
        gsap.from(targets.length ? targets : el, {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: trigger,
        })
      }
    }, el)
    return () => ctx.revert()
  }, [variant])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/SectionReveal.tsx
git commit -m "feat: SectionReveal wrapper for per-section transitions

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: `StaggeredNav` (replaces `Nav`)

**Files:**
- Create: `components/Nav/StaggeredNav.tsx`
- Modify: `app/layout.tsx`
- Delete: `components/Nav/Nav.tsx`, `components/ui/Cursor.tsx`

- [ ] **Step 1: Create `components/Nav/StaggeredNav.tsx`**

```tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS, SITE } from '@/lib/site'

const DRAWER_LINKS = [...NAV_LINKS, { label: 'Spotify', href: SITE.social.spotify }]

export default function StaggeredNav() {
  const [open, setOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)

  // Bar text is light over the black hero, dark once scrolled onto the white body.
  useEffect(() => {
    const onScroll = () => setOverHero(window.scrollY < window.innerHeight - 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
```

- [ ] **Step 2: Swap into `app/layout.tsx`**

Remove the `Cursor` import + `<Cursor />` element. Replace the `Nav` import with `StaggeredNav` and render `<StaggeredNav />` in its place.

```tsx
import StaggeredNav from '@/components/Nav/StaggeredNav'
// ...
<body>
  <StaggeredNav />
  {children}
</body>
```

- [ ] **Step 3: Delete the old files**

```bash
git rm components/Nav/Nav.tsx components/ui/Cursor.tsx
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors (no remaining references to `Nav` or `Cursor`).

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/Nav/StaggeredNav.tsx
git commit -m "feat: StaggeredNav drawer, drop custom cursor

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: `SpotlightHero` (replaces `Hero` + `HeroText`)

**Files:**
- Create: `components/Hero/SpotlightHero.tsx`
- Delete: `components/Hero/Hero.tsx`, `components/Hero/HeroText.tsx`

- [ ] **Step 1: Create `components/Hero/SpotlightHero.tsx`**

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'

// Black theatrical stage: on first load the darkness lifts as a radial spotlight
// (a transparent hole driven by --r) grows to reveal the caption.
export default function SpotlightHero() {
  const darkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = darkRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { '--r': 82 })
      return
    }
    const tween = gsap.fromTo(
      el,
      { '--r': 0 },
      { '--r': 82, duration: 1.7, ease: 'power2.inOut', delay: 0.15 },
    )
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section
      id="inicio"
      className="relative h-[100dvh] w-full overflow-hidden bg-ink text-paper"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 120% at 50% 42%, #1a1a1a 0%, #0a0a0a 60%)' }}
      />

      <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
        <div>
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
              Conoce su historia
            </Button>
          </div>
        </div>
      </div>

      {/* The darkness — a radial hole (the spotlight) grows via --r to reveal the hero. */}
      <div
        ref={darkRef}
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          // @ts-expect-error CSS custom property
          '--r': 0,
          background:
            'radial-gradient(circle at 50% 42%, transparent calc(var(--r, 0) * 1%), rgba(10,10,10,0.97) calc(var(--r, 0) * 1% + 28%))',
        }}
      />

      <span className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-[0.66rem] uppercase tracking-[0.25em] text-paper/45">
        Desliza para descubrir
      </span>
    </section>
  )
}
```

- [ ] **Step 2: Delete the old hero files**

```bash
git rm components/Hero/Hero.tsx components/Hero/HeroText.tsx
```

(Leave the `public/hero-*.{jpg,webp}` image files in place — simply unreferenced.)

- [ ] **Step 3: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. (`page.tsx` still imports the old `Hero` — that import is updated in Task 13; if running build now it would fail, so only run lint/tsc here. tsc will flag the missing `@/components/Hero/Hero` import — to keep this task green, update the `page.tsx` Hero import line now: change `import Hero from '@/components/Hero/Hero'` → `import SpotlightHero from '@/components/Hero/SpotlightHero'` and replace `<Hero />` with `<SpotlightHero />`. Full page reorder still happens in Task 13.)

- [ ] **Step 4: Commit**

```bash
git add components/Hero/SpotlightHero.tsx app/page.tsx
git commit -m "feat: SpotlightHero black stage with spotlight-in reveal

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: `StickyWords`

**Files:**
- Create: `components/StickyWords/StickyWords.tsx`

- [ ] **Step 1: Create `components/StickyWords/StickyWords.tsx`**

The highlight motion is pure CSS (classes live in `.sticky-words` from Task 1). This component only supplies markup + a small scroll-fade hint.

```tsx
'use client'

const WORDS = ['amor.', 'la fe.', 'la amistad.', 'el día a día.', 'el pop.', 'la balada latina.']

export default function StickyWords() {
  return (
    <section className="sticky-words" aria-label="Alpramir canta sobre el amor, la fe, la amistad, el día a día, el pop y la balada latina">
      <header className="head">
        <div className="row">
          <h2 className="lead">
            <span aria-hidden="true">Alpramir&nbsp;canta&nbsp;sobre&nbsp;</span>
            <span className="sr-only">Alpramir canta sobre el amor.</span>
          </h2>
          <ul aria-hidden="true">
            {WORDS.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </header>
    </section>
  )
}
```

Note: the `--count` in `.sticky-words` (Task 1) is `6` and must equal `WORDS.length`. If words are added/removed, update both.

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/StickyWords/StickyWords.tsx
git commit -m "feat: StickyWords scroll act (Spanish themes)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: Restyle `Bio` (clip-wipe)

**Files:**
- Modify: `components/Bio/Bio.tsx`

- [ ] **Step 1: Replace `components/Bio/Bio.tsx`**

```tsx
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
              Escuchar su música
            </Button>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Bio/Bio.tsx
git commit -m "feat: B&W Bio with clip-wipe reveal

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8: Restyle `Music` (black embed panel, fade-rise)

**Files:**
- Modify: `components/Music/Music.tsx`

- [ ] **Step 1: Replace `components/Music/Music.tsx`**

```tsx
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
            Escúchale en tu <span className="outline-type">plataforma favorita</span>
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
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Music/Music.tsx
git commit -m "feat: B&W Music with black embed panel + editorial list

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 9: Restyle `LatestSong` (black embed panel, mask-slide)

**Files:**
- Modify: `components/LatestSong/LatestSong.tsx`

- [ ] **Step 1: Replace `components/LatestSong/LatestSong.tsx`**

```tsx
import Button from '@/components/ui/Button'
import SectionReveal from '@/components/ui/SectionReveal'
import { SITE } from '@/lib/site'

const YT_ID = 'Cs0WW_g7A6U'

export default function LatestSong() {
  return (
    <section className="bg-paper px-5 py-24 sm:px-8 md:px-16 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <div>
          <span className="eyebrow">Último lanzamiento</span>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
            Su <span className="outline-type">última canción</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
            Composiciones originales y versiones reinterpretadas que buscan conectar
            con quien escucha. Dale al play y déjate llevar.
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
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/LatestSong/LatestSong.tsx
git commit -m "feat: B&W LatestSong with mask-slide reveal

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 10: `HorizontalGallery` (replaces `Gallery`)

**Files:**
- Create: `components/Gallery/HorizontalGallery.tsx`
- Delete: `components/Gallery/Gallery.tsx`

- [ ] **Step 1: Create `components/Gallery/HorizontalGallery.tsx`**

```tsx
'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@/lib/useMediaQuery'

const PHOTOS = [
  { src: '/img-1.jpeg', alt: 'Evento musical al aire libre' },
  { src: '/img-2.jpeg', alt: 'Alpramir en el estudio' },
  { src: '/img-3.jpeg', alt: 'Produciendo música activamente' },
]

export default function HorizontalGallery() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section id="fotos" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 md:px-16 md:pt-36">
        <span className="eyebrow">Fotos</span>
        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
          Detrás de la <span className="outline-type">música</span>
        </h2>
      </div>
      {isDesktop ? <DesktopTrack /> : <MobileStack />}
    </section>
  )
}

// Desktop: a tall wrapper pins the viewport while the track slides sideways with scroll.
function DesktopTrack() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const clamp = (v: number) => Math.min(1, Math.max(0, v))
    const update = () => {
      const total = wrap.offsetHeight - window.innerHeight
      const p = clamp(-wrap.getBoundingClientRect().top / total)
      const max = track.scrollWidth - window.innerWidth
      track.style.transform = `translateX(${-p * max}px)`
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative mt-12 h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={trackRef} className="flex gap-[3vw] px-[5vw] will-change-transform">
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              className="group relative h-[68vh] w-[58vw] flex-none overflow-hidden rounded-sm border border-line"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="58vw"
                className="object-cover grayscale transition-[filter] duration-700 ease-cinema group-hover:grayscale-0"
              />
              <figcaption className="absolute bottom-4 left-4 font-display text-lg text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                0{i + 1} · {p.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mobile: the same photos as a vertical stack, each fading/rising in on scroll.
function MobileStack() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = root.querySelectorAll<HTMLElement>('[data-reveal-item]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.2 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="mt-10 flex flex-col gap-5 px-5 pb-8 sm:px-8">
      {PHOTOS.map((p) => (
        <figure
          key={p.src}
          data-reveal-item
          className="relative aspect-[4/5] w-full translate-y-12 overflow-hidden rounded-sm border border-line opacity-0 transition-all duration-700 ease-cinema [&.in]:translate-y-0 [&.in]:opacity-100"
        >
          <Image src={p.src} alt={p.alt} fill sizes="100vw" className="object-cover" />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">
            {p.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Delete the old gallery**

```bash
git rm components/Gallery/Gallery.tsx
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Gallery/HorizontalGallery.tsx
git commit -m "feat: HorizontalGallery (desktop horizontal, mobile reveal)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 11: Restyle `Newsletter` (scale-in)

**Files:**
- Modify: `components/Newsletter/Newsletter.tsx`

- [ ] **Step 1: Replace `components/Newsletter/Newsletter.tsx`**

```tsx
'use client'
import { useState, type FormEvent } from 'react'
import SectionReveal from '@/components/ui/SectionReveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
  }

  return (
    <section className="bg-paper px-5 py-24 sm:px-8 md:px-16 md:py-28">
      <SectionReveal
        variant="scale-in"
        className="mx-auto max-w-3xl rounded-sm border border-ink/15 px-6 py-14 text-center sm:px-12 md:py-16"
      >
        <span className="eyebrow">Newsletter</span>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-medium leading-[1.08] text-ink sm:text-4xl md:text-5xl">
          Únete a la lista y recibe las <span className="outline-type">últimas novedades</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink/60 md:text-base">
          Nuevos lanzamientos, conciertos y noticias de Alpramir, directo a tu correo.
        </p>

        {sent ? (
          <p
            className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 font-sans text-sm font-semibold text-ink"
            role="status"
          >
            ¡Gracias! Te avisaremos de las novedades.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="news-email" className="sr-only">Correo electrónico</label>
            <input
              id="news-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="min-h-[48px] flex-1 rounded-full border border-ink/20 bg-paper px-5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-7 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-paper transition-colors duration-300 ease-cinema hover:bg-ink/85"
            >
              Suscribirse
            </button>
          </form>
        )}
      </SectionReveal>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Newsletter/Newsletter.tsx
git commit -m "feat: B&W Newsletter with scale-in reveal

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 12: Restyle `Footer` (black, wordmark)

**Files:**
- Modify: `components/Footer/Footer.tsx`

- [ ] **Step 1: Replace `components/Footer/Footer.tsx`**

```tsx
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
    <footer className="bg-ink px-5 pt-20 pb-10 text-paper sm:px-8 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-display text-4xl font-medium tracking-tight md:text-5xl">
              {SITE.name}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              {SITE.role} en {SITE.location}. {SITE.tagline}.
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
            <span className="eyebrow !text-paper/50">Síguele</span>
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
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Footer/Footer.tsx
git commit -m "feat: black Footer with Fraunces wordmark

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 13: Wire `page.tsx` & remove remaining dead files

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/animations/KineticMarquee/KineticMarquee.tsx`, `components/animations/SpotlightGrid/SpotlightGrid.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import SpotlightHero from '@/components/Hero/SpotlightHero'
import StickyWords from '@/components/StickyWords/StickyWords'
import Bio from '@/components/Bio/Bio'
import Music from '@/components/Music/Music'
import LatestSong from '@/components/LatestSong/LatestSong'
import HorizontalGallery from '@/components/Gallery/HorizontalGallery'
import Newsletter from '@/components/Newsletter/Newsletter'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <main>
      <SpotlightHero />
      <StickyWords />
      <Bio />
      <Music />
      <LatestSong />
      <HorizontalGallery />
      <Newsletter />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Delete the now-unused animation components**

```bash
git rm components/animations/KineticMarquee/KineticMarquee.tsx components/animations/SpotlightGrid/SpotlightGrid.tsx
```

- [ ] **Step 3: Confirm nothing references the deleted modules**

Run: `grep -rn "KineticMarquee\|SpotlightGrid\|SpotCard\|components/Nav/Nav\|Hero/Hero'\|Gallery/Gallery'\|ui/Cursor" app components`
Expected: no matches.

- [ ] **Step 4: Verify build**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: lint clean, types clean, `next build` succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire new editorial page order, drop dead animations

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 14: Full verification pass (browser)

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server via Claude Preview**

Use `preview_start` (Next dev). Confirm it boots without console errors.

- [ ] **Step 2: Hero / first-load spotlight**

`preview_snapshot` + `preview_screenshot` at the top of the page. Confirm: black stage, the spotlight reveal has run (caption visible), wordmark + both CTAs render in white, scroll hint present. Check `preview_console_logs` for errors.

- [ ] **Step 3: Staggered nav**

`preview_click` the `Menú` button → `preview_snapshot` confirms the drawer is open with all links (Inicio, Biografía, Música, Fotos, Spotify) visible; `preview_screenshot` shows the black drawer. Click a link / `Cerrar` and confirm it closes. Scroll down a viewport and confirm the bar text switches from light to dark (`preview_screenshot`).

- [ ] **Step 4: Sticky-words**

Scroll into the sticky-words section; `preview_screenshot` mid-section confirms one word is lit in black while the lead line stays pinned.

- [ ] **Step 5: Section transitions + gallery (desktop)**

Scroll through Bio → Música → LatestSong → Fotos → Newsletter, screenshotting each: confirm each reveals and the layout is correct, embeds sit on black panels, photos are grayscale (and colour on hover where testable). For Fotos confirm the track moves sideways while pinned.

- [ ] **Step 6: Mobile + gallery reveal**

`preview_resize` to 390×844. Reload. Confirm: hero readable, nav drawer works, Fotos renders as a vertical reveal-on-scroll stack (not horizontal), all sections stack cleanly. `preview_screenshot`.

- [ ] **Step 7: Reduced motion**

`preview_eval` to emulate reduced motion is not always available; instead confirm via code review that each effect has its reduced-motion branch (SpotlightHero sets `--r:82`; SectionReveal early-returns; StickyWords CSS lights words; gallery adds `.in`). If `preview` supports it, set `prefers-reduced-motion` and reload to confirm the page is fully legible with no hidden content.

- [ ] **Step 8: Stop the server**

`preview_stop`.

- [ ] **Step 9: Final commit (if any verification fixes were made)**

```bash
git add -A
git commit -m "fix: verification adjustments for editorial-mono redesign

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

If no fixes were needed, skip this commit.

---

## Self-Review (completed during planning)

- **Spec coverage:** spotlight hero (T5), staggered nav desktop+mobile (T4), sticky-words Spanish themes (T6), designed-varied transitions via SectionReveal — clip-wipe/fade-rise/mask-slide/scale-in mapped to Bio/Música/LatestSong/Newsletter (T3,7,8,9,11), horizontal gallery + mobile reveal (T10), black hero/embeds/footer arc (T5,8,9,12), grayscale→colour photos (T7,10), wordmark instead of logo (T4,T12), mono tokens + Fraunces + helpers (T1), Button mono (T2), reduced-motion branches everywhere (T1,3,5,10,14), drop cursor/marquee/spotlight-grid (T4,T13). All spec sections covered.
- **Placeholder scan:** no TBD/TODO; every code step shows full file or exact edit.
- **Type/name consistency:** tokens `paper/ink/muted/line/line-invert`; helper classes `.eyebrow/.outline-type/.sticky-words`; `SectionReveal` variants `clip-wipe|fade-rise|mask-slide|scale-in`; `data-reveal` opt-in used only by the `fade-rise` section (Música); `useMediaQuery` boolean matches `lib/useMediaQuery.ts`. Consistent across tasks.
```
