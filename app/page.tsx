import SpotlightHero from '@/components/Hero/SpotlightHero'
import StickyWords from '@/components/StickyWords/StickyWords'
import Bio from '@/components/Bio/Bio'
import Music from '@/components/Music/Music'
import LatestSong from '@/components/LatestSong/LatestSong'
import HorizontalGallery from '@/components/Gallery/HorizontalGallery'
import Newsletter from '@/components/Newsletter/Newsletter'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <main>
      <SpotlightHero />
      <StickyWords />
      <Bio />
      <Music />
      <LatestSong />
      <HorizontalGallery />
      <Newsletter />
      <Footer />
    </main>
  )
}
