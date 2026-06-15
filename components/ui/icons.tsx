// Inline brand SVG icons — single source. currentColor so they inherit text color.
import type { SVGProps } from 'react'

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'currentColor' as const,
  'aria-hidden': true,
  ...props,
})

export function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.213c3.809-.871 7.077-.496 9.712 1.114a.623.623 0 01.207.856zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 11-.452-1.493c3.632-1.102 8.147-.568 11.232 1.329a.78.78 0 01.257 1.073zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 11-.542-1.79c3.532-1.072 9.404-.865 13.115 1.337a.935.935 0 11-.956 1.609z" />
    </svg>
  )
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3.02 3.02 0 002.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 002.12-2.14A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.57V8.43L15.82 12 9.6 15.57z" />
    </svg>
  )
}

export function YouTubeMusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18.4A8.4 8.4 0 1120.4 12 8.41 8.41 0 0112 20.4zM9.6 8.2v7.6l6.4-3.8-6.4-3.8z" />
    </svg>
  )
}

export function DeezerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M18.84 4.13h4.16v2.2h-4.16v-2.2zM18.84 7.6H23v2.2h-4.16V7.6zM18.84 11.07H23v2.2h-4.16v-2.2zM12.42 11.07h4.16v2.2h-4.16v-2.2zM18.84 14.53H23v2.2h-4.16v-2.2zM12.42 14.53h4.16v2.2h-4.16v-2.2zM6 14.53h4.16v2.2H6v-2.2zM18.84 18h4.16v2.2h-4.16V18zM12.42 18h4.16v2.2h-4.16V18zM6 18h4.16v2.2H6V18zM1 18h4.16v2.2H1V18z" />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base({ fill: 'none', ...props })} stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M16.6 5.82a4.28 4.28 0 01-1.06-2.82h-3.2v12.6a2.59 2.59 0 11-2.59-2.59c.27 0 .53.04.78.12V9.85a5.78 5.78 0 00-.78-.05A5.78 5.78 0 1015.5 15.6V9.42a7.43 7.43 0 004.34 1.39V7.6a4.28 4.28 0 01-3.24-1.78z" />
    </svg>
  )
}
