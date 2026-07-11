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
    <section className="bg-paper px-4 py-8 md:px-8 md:py-16">
      <SectionReveal
        variant="scale-in"
        className="mx-auto max-w-3xl rounded-sm border border-ink/15 px-6 py-14 text-center sm:px-12 md:py-16"
      >
        <span className="eyebrow">Newsletter</span>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-medium leading-[1.08] text-ink sm:text-4xl md:text-5xl">
          Únete a la lista y recibe las <span className="outline-type">últimas novedades</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink/60 md:text-base">
          Mis nuevos lanzamientos, conciertos y novedades, directo a tu correo.
        </p>

        {sent ? (
          <p
            className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 font-sans text-sm font-semibold text-ink"
            role="status"
          >
            ¡Gracias! Te avisaré de las novedades.
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
