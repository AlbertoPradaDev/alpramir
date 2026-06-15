'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface KineticMarqueeProps {
  items: string[]
  speed?: number // base px/sec
  direction?: 'left' | 'right'
  className?: string
}

// Ported from cinematic-site-components/kinetic-marquee.html — scroll-velocity-reactive band.
export default function KineticMarquee({
  items,
  speed = 70,
  direction = 'left',
  className = '',
}: KineticMarqueeProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row = rowRef.current
    const content = contentRef.current
    if (!row || !content) return

    let velocity = 0
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity = Math.abs(self.getVelocity())
      },
    })

    const dir = direction === 'right' ? 1 : -1
    const contentWidth = content.offsetWidth
    let x = dir === -1 ? 0 : -contentWidth
    let raf = 0

    const animate = () => {
      const s = speed + velocity * 0.12
      x += dir * -1 * (s / 60)
      if (dir === -1 && x <= -contentWidth) x += contentWidth
      if (dir === 1 && x >= 0) x -= contentWidth
      row.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      st.kill()
    }
  }, [direction, speed])

  return (
    <div className={`overflow-hidden border-y border-line bg-secondary py-5 md:py-7 ${className}`}>
      <div ref={rowRef} className="flex w-max whitespace-nowrap will-change-transform">
        {/* content + clone for a seamless loop */}
        <div ref={contentRef} className="flex shrink-0">
          {items.map((it, i) => (
            <Item key={`a-${i}`} label={it} />
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {items.map((it, i) => (
            <Item key={`b-${i}`} label={it} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Item({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center px-6 font-display text-2xl text-text/85 sm:text-3xl md:px-10 md:text-5xl">
      {label}
      <span className="mx-6 inline-block h-2 w-2 rotate-45 bg-accent md:mx-10" />
    </span>
  )
}
