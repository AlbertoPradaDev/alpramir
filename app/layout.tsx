import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import StaggeredNav from '@/components/Nav/StaggeredNav'
import { SITE } from '@/lib/site'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const TITLE = 'Alpramir — Cantautor y productor musical'
const DESCRIPTION =
  'Soy Alpramir, cantautor y productor musical en España. Pop y baladas latinas sobre el amor, la fe y el día a día. Escucha mi música en Spotify, YouTube y más.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: '%s · Alpramir',
  },
  description: DESCRIPTION,
  applicationName: 'Alpramir',
  authors: [{ name: 'Alpramir', url: SITE.url }],
  creator: 'Alpramir',
  publisher: 'Alpramir',
  category: 'music',
  keywords: [
    'Alpramir',
    'cantautor',
    'productor musical',
    'pop',
    'balada latina',
    'música de autor',
    'música en español',
    'cantante España',
    'amor',
    'fe',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE.url,
    siteName: 'Alpramir',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
}

// Schema.org structured data so search engines recognise Alpramir as a music
// entity and link the official profiles (knowledge-panel eligibility).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/portada.webp`,
  description: SITE.bio,
  genre: ['Pop', 'Balada latina', 'Música de autor'],
  foundingLocation: { '@type': 'Place', name: SITE.location },
  sameAs: [
    SITE.social.spotify,
    SITE.social.youtube,
    SITE.social.deezer,
    SITE.social.instagram,
    SITE.social.tiktok,
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StaggeredNav />
        {children}
      </body>
    </html>
  )
}
