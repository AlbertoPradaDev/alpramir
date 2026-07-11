import { renderOgImage, OG_SIZE, OG_ALT } from '@/lib/og'

export const size = OG_SIZE
export const alt = OG_ALT
export const contentType = 'image/png'

export default function TwitterImage() {
  return renderOgImage()
}
