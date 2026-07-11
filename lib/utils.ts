import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Real Tailwind-aware class merger (like Shelf's). Resolves conflicting utilities
// so a passed `absolute` overrides the base card's `relative`, etc. — without it,
// concatenation leaves both classes and CSS source order decides (bug source).
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
