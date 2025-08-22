export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  category: 'graphics' | 'plastic' | 'performing';
  imageUrl: string;
  type: 'image' | 'video' | '3d';
}

export const artworks: Artwork[] = [
  // Graphics Arts
  {
    id: 'graphics-1',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    year: '1931',
    description: 'A surrealist masterpiece featuring melting clocks in a dreamlike landscape, challenging our perception of time and reality.',
    category: 'graphics',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    type: 'image'
  },
  {
    id: 'graphics-2',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: '1889',
    description: 'An iconic post-impressionist painting depicting a swirling night sky over a quiet town, painted during van Gogh\'s stay at an asylum.',
    category: 'graphics',
    imageUrl: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop',
    type: 'image'
  },
  {
    id: 'graphics-3',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: '1665',
    description: 'A mysterious portrait of a girl wearing an exotic dress and a large pearl earring, known as the "Mona Lisa of the North".',
    category: 'graphics',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    type: 'image'
  },
  {
    id: 'graphics-4',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    year: '1831',
    description: 'A famous Japanese woodblock print depicting a giant wave threatening boats near Mount Fuji, representing the power of nature.',
    category: 'graphics',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc90?w=800&h=600&fit=crop',
    type: 'image'
  },

  // Plastic Arts (Sculptures)
  {
    id: 'plastic-1',
    title: 'David',
    artist: 'Michelangelo',
    year: '1504',
    description: 'A Renaissance masterpiece depicting the biblical hero David before his battle with Goliath, symbolizing strength and youthful beauty.',
    category: 'plastic',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc91?w=800&h=600&fit=crop',
    type: '3d'
  },
  {
    id: 'plastic-2',
    title: 'The Thinker',
    artist: 'Auguste Rodin',
    year: '1902',
    description: 'A bronze sculpture depicting a man in deep contemplation, originally part of a larger work called "The Gates of Hell".',
    category: 'plastic',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc92?w=800&h=600&fit=crop',
    type: '3d'
  },
  {
    id: 'plastic-3',
    title: 'Venus de Milo',
    artist: 'Alexandros of Antioch',
    year: '130-100 BCE',
    description: 'An ancient Greek sculpture believed to depict Aphrodite, the goddess of love and beauty, renowned for its graceful form.',
    category: 'plastic',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc93?w=800&h=600&fit=crop',
    type: '3d'
  },

  // Performing Arts
  {
    id: 'performing-1',
    title: 'Swan Lake',
    artist: 'Pyotr Ilyich Tchaikovsky',
    year: '1876',
    description: 'A ballet in four acts featuring the story of Odette, a princess transformed into a swan by an evil sorcerer\'s curse.',
    category: 'performing',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc94?w=800&h=600&fit=crop',
    type: 'video'
  },
  {
    id: 'performing-2',
    title: 'The Phantom of the Opera',
    artist: 'Andrew Lloyd Webber',
    year: '1986',
    description: 'A musical about a mysterious phantom who lives beneath the Paris Opera House and falls in love with a young soprano.',
    category: 'performing',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc95?w=800&h=600&fit=crop',
    type: 'video'
  },
  {
    id: 'performing-3',
    title: 'Romeo and Juliet',
    artist: 'William Shakespeare',
    year: '1597',
    description: 'A tragic play about two young star-crossed lovers whose deaths ultimately unite their feuding families.',
    category: 'performing',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    type: 'video'
  }
];

export const getArtworksByCategory = (category: 'graphics' | 'plastic' | 'performing') => {
  return artworks.filter(artwork => artwork.category === category);
};