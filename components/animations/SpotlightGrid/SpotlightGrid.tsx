'use client'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface SpotlightGridProps {
  children: ReactNode
  className?: string
}

// Ported from cinematic-site-components/spotlight-border.html — cursor-tracked glow across a grid.
export function SpotlightGrid({ children, className = '' }: SpotlightGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const onMove = (e: MouseEvent) => {
      const cards = grid.querySelectorAll<HTMLElement>('[data-spot-card]')
      cards.forEach((c) => {
        const r = c.getBoundingClientRect()
        c.style.setProperty('--mx', `${e.clientX - r.left}px`)
        c.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    grid.addEventListener('mousemove', onMove)
    return () => grid.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={gridRef}
      className={`grid gap-px overflow-hidden rounded-xl border border-line bg-[rgba(200,160,74,0.12)] ${className}`}
    >
      {children}
    </div>
  )
}

interface SpotCardProps {
  children: ReactNode
  href?: string
  className?: string
}

export function SpotCard({ children, href, className = '' }: SpotCardProps) {
  const base = `group relative overflow-hidden bg-secondary p-7 md:p-9 ${className}`
  const inner = (
    <>
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle 200px at var(--mx,50%) var(--my,50%), rgba(230,196,119,0.16), transparent)',
        }}
      />
      <span className="relative block">{children}</span>
    </>
  )
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-spot-card
        className={base}
      >
        {inner}
      </a>
    )
  }
  return (
    <div data-spot-card className={base}>
      {inner}
    </div>
  )
}
