# Alpramir — Editorial Mono Redesign

Date: 2026-06-21
Status: Approved (design phase)

## Goal

Redesign the entire single-page Alpramir site (Spanish cantautor & producer) from its
current dark gold/cinema theme into a **black-and-white editorial** style that matches the
"shelf" animation library's design language (Fraunces serif + Inter, outline-type headlines,
uppercase tracked eyebrows, generous whitespace), but in mainly black & white — no third
accent colour.

The page wears a deliberate **black → white → black** arc: a dark theatrical hero opens with
a spotlight reveal, the body is bright white editorial, and the footer returns to black to
bookend it.

All content (Spanish copy) and external links stay exactly as they are today in
`lib/site.ts`. This is a visual/interaction redesign, not a content rewrite.

## Stack (unchanged)

Next.js 16.2.9 (App Router) · React 19 · Tailwind v4 (`@theme` tokens in `globals.css`) ·
GSAP 3.15 with ScrollTrigger (already a dependency). `next/font` for typography.

Per `AGENTS.md`: this Next.js may differ from training data — consult
`node_modules/next/dist/docs/` before writing framework-level code, and heed deprecation
notices.

## Design system

### Palette (replaces the gold/cinema tokens in `globals.css`)

| Token | Value | Role |
|-------|-------|------|
| `--color-paper` | `#ffffff` | page background |
| `--color-ink` | `#0a0a0a` | text, hairlines, black sections |
| `--color-muted` | `#6b6b6b` | secondary text |
| `--color-line` | `rgba(10,10,10,0.12)` | hairline borders on white |
| `--color-line-invert` | `rgba(255,255,255,0.18)` | hairline borders on black |

No accent colour. The only "colour" on the page is the black of the hero stage, the embed
panels, and the footer. On black sections, text is `paper` and borders use `line-invert`.

### Typography

- `--font-display` → **Fraunces** (serif), added via `next/font/google`.
- `--font-sans` / body / labels → **Inter** (already present).
- Helpers ported from shelf into `globals.css`:
  - `.outline-type` — `color: transparent; -webkit-text-stroke: ~1.25px var(--color-ink); paint-order: stroke fill;` (on black sections, stroke is `paper`).
  - `.eyebrow` — uppercase, `letter-spacing: 0.28em`, ~0.72rem, `--color-muted`.

### Motion principles

- GSAP + ScrollTrigger drive scroll reveals and scrubs (cross-browser, already standardised).
- The sticky-words highlight band is **pure CSS** (viewport-fixed gradient clipped to text),
  ported from shelf's original — no JS for the highlight motion itself.
- **Reduced motion** (`prefers-reduced-motion: reduce`): every effect degrades to its final
  static state — spotlight fully open, words fully lit, sections visible, gallery scrollable
  natively. No element is ever left invisible.
- **Clean editorial:** no custom cursor, no magnetic links, no hover-glow. Remove
  `components/ui/Cursor.tsx` (and its mount in `layout.tsx`) and the `SpotlightGrid`
  hover-glow. Whitespace and type carry the page.

## Components

### Removed / retired
- `components/ui/Cursor.tsx` and its usage in `app/layout.tsx`.
- `components/animations/KineticMarquee/KineticMarquee.tsx` (replaced by sticky-words act).
- `components/animations/SpotlightGrid/SpotlightGrid.tsx` (hover-glow dropped); the Música
  platform list is rebuilt as a plain editorial list.

### New / rewritten
- `StaggeredNav` (replaces `Nav`)
- `SpotlightHero` (replaces `Hero` + `HeroText`)
- `StickyWords` (new — sits where the marquee was)
- `SectionReveal` (new shared wrapper — owns the designed-varied transitions)
- `HorizontalGallery` (replaces `Gallery`; desktop horizontal, mobile reveal-on-scroll)
- Restyled: `Bio`, `Music`, `LatestSong`, `Newsletter`, `Footer`, `ui/Button`.

## Page flow (black → white → black)

| # | Section | id | Treatment | Reveal |
|---|---------|----|-----------|--------|
| — | Nav | — | Minimal fixed bar: `Alpramir` wordmark + `Menú` button → staggered drawer. Text colour inverts (light over the black hero, dark over white body). | — |
| 1 | Hero | `inicio` | **Black stage**, spotlight-in reveal on first load | spotlight grows |
| 2 | Sticky-words | — | White; pinned lead-in line + words lit one at a time, closing line | sticky scroll |
| 3 | Bio | `biografia` | White editorial: photo + text + theme tags | clip-wipe |
| 4 | Música | `musica` | Spotify embed on a **black panel** + platform list | fade-rise |
| 5 | Último lanzamiento | — | YouTube embed on a **black panel** + text | mask-slide |
| 6 | Fotos | `fotos` | Desktop = horizontal pinned gallery; mobile = reveal-on-scroll stack | horizontal / stagger |
| 7 | Newsletter | — | White editorial email capture | scale-in |
| 8 | Footer | — | **Black**, large `Alpramir` wordmark, nav, socials | — |

## Effect specs

### StaggeredNav (ported from shelf `navigation/staggered-menu`)
- Primary navigation on **both desktop and mobile** (per user request).
- Fixed bar, transparent over the hero. Left: `Alpramir` wordmark (Fraunces). Right: `Menú`
  text button.
- Bar text/link colour inverts: light (`paper`) while over the black hero, dark (`ink`)
  once scrolled onto the white body (scroll-position threshold like the current `Nav`).
- Click → black drawer slides in from the right (`min(420px, 82vw)`); a scrim covers the
  rest; links (`NAV_LINKS` + Spotify) cascade in with staggered transition-delays. Esc and
  scrim-click close. Body scroll locked while open.
- Reduced motion: drawer appears without slide, links without cascade.

### SpotlightHero (ported from shelf `hero/spotlight-in`)
- Full-viewport **black stage**: `radial-gradient(120% 120% at 50% 42%, #161616, #0a0a0a)`.
- Centred caption (lit, never animated itself): eyebrow `{role} · {location}`, `Alpramir`
  wordmark (Fraunces, large), short tagline, "Escuchar en Spotify" pill, scroll hint.
- A `.dark` overlay is a radial hole driven by a `--r` custom property; on first load a GSAP
  tween grows `--r` 0 → ~82 over ~1.7s (`power2.inOut`) — darkness lifts, spotlight reveals
  the caption. Runs once on mount (the "first charge").
- Works on mobile (same radial mechanic). Reduced motion: set `--r` to its final value
  immediately (no animation).
- No background photo — the stage is pure black. (Current hero JPG/WebP assets become unused;
  leave files in place, just stop referencing them.)

### StickyWords (ported from shelf `scroll/sticky-words`, Spanish copy)
- White section. Sticky lead-in line (Fraunces): `Alpramir canta sobre` pinned at the
  highlight band.
- Word column scrolls past, each word lit in **ink** as it crosses the band (others dimmed):
  `amor.` · `la fe.` · `la amistad.` · `el día a día.` · `el pop.` · `la balada latina.`
- Highlight band = pure-CSS viewport-fixed gradient clipped to text (`background-attachment:
  fixed`, `background-clip: text`), exactly as shelf's original. `--count` must match the
  number of words so the sticky offset math is right.
- Closing panel (the dark panel that grows up in shelf's original) is **optional**; default
  is to simply hand off to the white Bio section. Keep it minimal — the band IS the effect.
- Reduced motion: words rendered in `ink` statically, no sticky pinning required to read.

### SectionReveal (new shared wrapper — the "designed-varied transitions")
- A client component wrapping a section's content; prop `variant` selects a GSAP
  ScrollTrigger reveal fired once when the section enters (`start: 'top ~72%'`).
- Variants (assigned per section, **fixed/consistent** every visit — not random):
  - `clip-wipe` — `clipPath: inset(0 0 100% 0)` → full (used by Bio).
  - `fade-rise` — `y: 40, opacity: 0` → settle, small stagger on children (Música).
  - `mask-slide` — `clipPath: inset(0 0 0 100%)` → full (Último lanzamiento).
  - `scale-in` — `scale: 0.94, opacity: 0` → full (Newsletter).
- Children opt into staggering via a `data-reveal` attribute the wrapper targets.
- Note: the user originally said "random transitions" but chose **designed-varied (fixed per
  section)** in brainstorming, so reveals are deterministic per section, never shuffled.
- Reduced motion: wrapper renders children in their final state immediately.

### HorizontalGallery (ported from shelf `sections/horizontal-gallery` + `reveal-on-scroll`)
- Heading block: `Fotos` eyebrow + `Detrás de la música` (Fraunces).
- **Desktop (`md+`):** tall wrapper pins the viewport; a horizontal track of photo slides
  translates sideways as you scroll (scroll-progress → `translateX`), GSAP/ScrollTrigger or a
  scroll listener like shelf's original. Photos: `/img-1..3.jpeg`.
- **Mobile:** the same photos as a vertical stack, each fading/rising in on scroll
  (IntersectionObserver, like shelf's `reveal-on-scroll`).
- Choose desktop-vs-mobile via the existing `lib/useMediaQuery.ts` (or CSS + matchMedia) so
  only one mechanic mounts at a time.
- Photos are **grayscale by default, full colour on hover** (`filter: grayscale(1)` →
  `grayscale(0)` transition). Same treatment on the Bio photo.
- Reduced motion: mobile stack static-visible; desktop falls back to a horizontally
  scrollable/stacked layout without scrub pinning.

### Restyled sections (B&W editorial)
- **Bio** — white; photo (grayscale→colour) left, text right; theme tags become outlined
  ink pills; `SectionReveal variant="clip-wipe"`.
- **Música** — heading on white; Spotify `iframe` embedded inside an intentional **black
  panel** (black bg, `line-invert` border); platform links rebuilt as a clean editorial list
  (name + short desc + arrow), no hover-glow; `variant="fade-rise"`.
- **Último lanzamiento** — YouTube `iframe` inside a **black panel**; text column on white;
  `variant="mask-slide"`.
- **Newsletter** — white editorial card, ink "Suscribirse" button, hairline input;
  `variant="scale-in"`. Keep the existing client-side "sent" state.
- **Footer** — **black** section: large `Alpramir` wordmark (Fraunces), `NAV_LINKS`, social
  icon buttons (outlined on black), copyright. Bookends the hero.
- **ui/Button** — recolour variants to mono: `primary` = ink bg + paper text; `outline` =
  ink hairline border + ink text, hover fills. Drop gold shadows.

## Logo decision

The current `public/logo.png` is a light/gold mark that disappears on white. The nav and
footer render `Alpramir` as **Fraunces text** instead. `logo.png` is left in place but
unreferenced. (If a true monochrome logo asset is provided later, it can swap into the
wordmark slots.)

## File-level change list

- `app/globals.css` — replace `@theme` tokens (mono palette), swap font vars to Fraunces +
  Inter, port `.outline-type` / `.eyebrow`, drop gold helpers (`.hero-title`,
  `.text-gold-gradient`, `.gold-rule`, `.media-pill`, `.hero-shadow`).
- `app/layout.tsx` — add Fraunces font, remove `<Cursor />`, swap `Nav` → `StaggeredNav`,
  update `<body>` background to paper. Keep metadata.
- `app/page.tsx` — new section order: `SpotlightHero` → `StickyWords` → `Bio` → `Music` →
  `LatestSong` → `HorizontalGallery` → `Newsletter` → `Footer` (drop `KineticMarquee`).
- New: `components/Nav/StaggeredNav.tsx`, `components/Hero/SpotlightHero.tsx`,
  `components/StickyWords/StickyWords.tsx`, `components/ui/SectionReveal.tsx`,
  `components/Gallery/HorizontalGallery.tsx`.
- Rewritten/restyled: `Bio`, `Music`, `LatestSong`, `Newsletter`, `Footer`, `ui/Button`.
- Removed: `ui/Cursor.tsx`, `animations/KineticMarquee/*`, `animations/SpotlightGrid/*`,
  old `Hero/Hero.tsx`, `Hero/HeroText.tsx`, `Nav/Nav.tsx`, `Gallery/Gallery.tsx`.

## Out of scope

- No new copy, no new photography, no logo redraw, no CMS/data changes.
- No new dependencies (GSAP already present; fonts via `next/font`).
- No analytics, i18n, or routing changes — still a single page.

## Success criteria

1. Page loads with the black spotlight hero; the spotlight reveal plays once on first load.
2. Staggered drawer nav works on desktop and mobile; bar text inverts over the white body.
3. Sticky-words act lights the Spanish theme words one at a time on scroll.
4. Each white section reveals with its assigned (consistent) transition.
5. Gallery is horizontal-scroll on desktop, reveal-on-scroll stack on mobile.
6. Footer is black and bookends the hero; nothing references the gold palette anymore.
7. `prefers-reduced-motion` users see a fully legible static page (no hidden elements).
8. `next build` and `eslint` pass.
