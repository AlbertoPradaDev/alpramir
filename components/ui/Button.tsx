import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline'
type Size = 'sm' | 'md'

const SIZES: Record<Size, string> = {
  sm: 'text-xs px-5 min-h-[44px]',
  md: 'text-sm px-7 min-h-[48px] md:min-h-[52px]',
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-ink/85 active:bg-ink/75',
  outline:
    'border border-ink/40 text-ink hover:bg-ink hover:text-paper active:bg-ink/90',
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
    'inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ease-cinema select-none'
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
