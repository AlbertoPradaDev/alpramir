// Single source of truth for Alpramir's content & links (extracted from alpramir.com).
export const SITE = {
  name: 'Alpramir',
  // Canonical production domain (used for metadata, sitemap, robots, OG image).
  // Change this single value if the live domain differs.
  url: 'https://alpramir.com',
  role: 'Cantautor y productor musical',
  location: 'España',
  tagline: 'Pop y baladas latinas sobre el amor, la fe y el día a día',
  bio: 'Soy cantautor y productor musical, radicado en España. Mis canciones combinan influencias del pop, la balada latina y la música de autor, y exploran temas como el amor, la amistad, la fe y las experiencias del día a día. A través de composiciones originales y versiones reinterpretadas, busco conectar contigo con melodías cercanas y letras cargadas de sentimiento.',
  spotifyArtistId: '2xbT7Ezm2DEIG4FgFczsfF',
  social: {
    spotify: 'https://open.spotify.com/intl-es/artist/2xbT7Ezm2DEIG4FgFczsfF',
    youtube: 'https://www.youtube.com/@Alpramir/releases',
    youtubeMusic: 'https://music.youtube.com/search?q=alpramir',
    deezer: 'https://www.deezer.com/en/artist/88218562',
    instagram: 'https://www.instagram.com/alpramir/',
    tiktok: 'https://www.tiktok.com/@alpramir',
  },
} as const

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Biografía', href: '#biografia' },
  { label: 'Música', href: '#musica' },
  { label: 'Fotos', href: '#fotos' },
] as const
