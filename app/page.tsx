import Hero from '@/components/Hero/Hero'
import Bio from '@/components/Bio/Bio'
import Music from '@/components/Music/Music'
import LatestSong from '@/components/LatestSong/LatestSong'
import Gallery from '@/components/Gallery/Gallery'
import Newsletter from '@/components/Newsletter/Newsletter'
import Footer from '@/components/Footer/Footer'
import KineticMarquee from '@/components/animations/KineticMarquee/KineticMarquee'

const MARQUEE = ['Pop', 'Balada latina', 'Música de autor', 'Amor', 'Fe', 'El día a día']

export default function Home() {
  return (
    <main>
      <Hero />
      <KineticMarquee items={MARQUEE} />
      <Bio />
      <Music />
      <LatestSong />
      <Gallery />
      <Newsletter />
      <Footer />
    </main>
  )
}
