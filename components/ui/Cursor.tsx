'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    const SELECTOR = 'a, button, input, select, textarea, [data-cursor]'

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' })
    }
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(SELECTOR)) {
        gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.3 })
        gsap.to(dot, { scale: 0, duration: 0.3 })
      }
    }
    const onOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as Element | null)?.closest(SELECTOR)) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
        gsap.to(dot, { scale: 1, duration: 0.3 })
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="max-md:hidden fixed top-0 left-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent pointer-events-none"
      />
      <div
        ref={ringRef}
        className="max-md:hidden fixed top-0 left-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(230,196,119,0.6)] pointer-events-none"
      />
    </>
  )
}
