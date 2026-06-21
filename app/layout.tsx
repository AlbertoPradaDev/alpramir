import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import StaggeredNav from '@/components/Nav/StaggeredNav'

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

export const metadata: Metadata = {
  title: 'Alpramir — Cantautor y productor musical',
  description:
    'Alpramir, cantautor y productor musical en España. Pop y baladas latinas sobre el amor, la fe y el día a día, con melodías cercanas y letras cargadas de sentimiento.',
  openGraph: {
    title: 'Alpramir — Cantautor y productor musical',
    description: 'Pop y baladas latinas sobre el amor, la fe y el día a día.',
    type: 'website',
    locale: 'es_ES',
  },
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
        <StaggeredNav />
        {children}
      </body>
    </html>
  )
}
