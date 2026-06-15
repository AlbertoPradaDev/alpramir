'use client'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from '@/lib/gsap'

export default function Newsletter() {
  const rootRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-news-reveal]', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
  }

  return (
    <section
      ref={rootRef}
      className="relative bg-primary px-5 py-20 sm:px-8 md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-line bg-secondary px-6 py-12 text-center shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)] sm:px-12 md:py-16">
        <span data-news-reveal className="eyebrow">
          Newsletter
        </span>
        <h2
          data-news-reveal
          className="mx-auto mt-4 max-w-xl font-display text-3xl leading-[1.1] text-text sm:text-4xl md:text-5xl"
        >
          Únete a la lista y recibe las <span className="text-gold-gradient">últimas novedades</span>
        </h2>
        <p data-news-reveal className="mx-auto mt-4 max-w-md text-sm text-text/65 md:text-base">
          Nuevos lanzamientos, conciertos y noticias de Alpramir, directo a tu correo.
        </p>

        {sent ? (
          <p
            className="mx-auto mt-8 inline-flex items-center gap-2 rounded-lg border border-line bg-[rgba(200,160,74,0.1)] px-5 py-3 font-heading text-sm font-semibold text-accent"
            role="status"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            ¡Gracias! Te avisaremos de las novedades.
          </p>
        ) : (
          <form
            data-news-reveal
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="news-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="news-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="min-h-[48px] flex-1 rounded-lg border border-line bg-primary px-5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#1a1206] transition-all duration-300 ease-cinema hover:bg-gold-bright"
            >
              Suscribirse
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
