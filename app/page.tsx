import CinematicHero from '@/components/Hero/CinematicHero'
import ThemeReveal from '@/components/Themes/ThemeReveal'
import Bio from '@/components/Bio/Bio'
import Music from '@/components/Music/Music'
import LatestSong from '@/components/LatestSong/LatestSong'
import DraggableGallery from '@/components/Gallery/DraggableGallery'
import Newsletter from '@/components/Newsletter/Newsletter'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <main>
      <CinematicHero />
      <ThemeReveal />
      <Bio />
      <Music />
      <LatestSong />
      <DraggableGallery />
      <Newsletter />
      <Footer />
    </main>
  )
}
