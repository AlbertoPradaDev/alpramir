import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline'
type Size = 'sm' | 'md'

const SIZES: Record<Size, string> = {
  sm: 'text-xs px-5 min-h-[44px]',
  md: 'text-sm px-7 min-h-[48px] md:min-h-[52px]',
}

// Explicit color on every variant: dark text on gold, warm-white on outline.
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-[#1a1206] hover:bg-gold-bright active:bg-gold-deep shadow-[0_8px_32px_-8px_rgba(200,160,74,0.5)] hover:shadow-[0_8px_32px_-4px_rgba(200,160,74,0.7)]',
  outline:
    'border border-[rgba(230,196,119,0.45)] text-text hover:border-accent hover:bg-[rgba(200,160,74,0.08)] active:bg-[rgba(200,160,74,0.14)]',
}

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  external?: boolean
  className?: string
}

export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-cinema select-none'
  const cls = `${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
