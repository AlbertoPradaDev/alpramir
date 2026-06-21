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
