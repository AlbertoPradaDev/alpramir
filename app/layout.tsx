import type { Metadata } from 'next'
import { Gloock, Raleway, Roboto } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav/Nav'
import Cursor from '@/components/ui/Cursor'

const gloock = Gloock({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gloock',
  display: 'swap',
})

const raleway = Raleway({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto',
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
      className={`${gloock.variable} ${raleway.variable} ${roboto.variable} antialiased`}
    >
      <body>
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  )
}
