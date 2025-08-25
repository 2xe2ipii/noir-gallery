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
    title: 'Nighthawks',
    artist: 'Edward Hopper',
    year: '1942',
    description: 'A late-night scene at a downtown diner, capturing the isolation and mystery of urban life.',
    category: 'graphics',
    imageUrl: './assets/images/graphic_arts/VA_1_Nighthaws_Hopper.jpg',
    type: 'image'
  },
  {
    id: 'graphics-2',
    title: 'The Maltese Falcon',
    artist: 'Warner Bros',
    year: '1941',
    description: 'Iconic film noir poster featuring Humphrey Bogart, capturing the essence of detective fiction.',
    category: 'graphics',
    imageUrl: './assets/images/graphic_arts/VA_2_The Maltese Falcon_WarnerBros.jpg',
    type: 'image'
  },
  {
    id: 'graphics-3',
    title: 'Self-Portrait with Cigarette',
    artist: 'Edward Munch',
    year: '1895',
    description: 'A haunting self-portrait emerging from shadows, reflecting the artist\'s inner turmoil.',
    category: 'graphics',
    imageUrl: './assets/images/graphic_arts/VA_3_Self-Portrait with Cigarette_EdwardMunch.jpg',
    type: 'image'
  },
  {
    id: 'graphics-4',
    title: 'Noir City Poster Series',
    artist: 'Various Artists',
    year: '1940-1950',
    description: 'A collection of classic film noir posters showcasing the genre\'s distinctive visual style.',
    category: 'graphics',
    imageUrl: './assets/images/graphic_arts/VA_4_Noir City Poster Series_Various.jpg',
    type: 'image'
  },
  {
    id: 'graphics-5',
    title: 'Sin City',
    artist: 'Frank Miller',
    year: '1991',
    description: 'Groundbreaking noir comic art featuring stark black and white contrasts with selective coloring.',
    category: 'graphics',
    imageUrl: './assets/images/graphic_arts/VA_5_SinCity_FrankMiller.jpg',
    type: 'image'
  },

  // Plastic Arts (Sculptures)
  {
    id: 'plastic-1',
    title: 'The Thinker',
    artist: 'Auguste Rodin',
    year: '1902',
    description: 'A brooding figure lost in contemplation, embodying philosophical reflection and inner turmoil.',
    category: 'plastic',
    imageUrl: './assets/images/plastic_arts/PA1_TheThinker_AugusteRodin.jpg',
    type: '3d'
  },
  {
    id: 'plastic-2',
    title: 'Metropolis Architectural Models',
    artist: 'Fritz Lang',
    year: '1927',
    description: 'The iconic architectural models from the groundbreaking film Metropolis, showcasing Art Deco noir style.',
    category: 'plastic',
    imageUrl: './assets/images/plastic_arts/PA2_MetropolisArchiModels_FritzLang.jpg',
    type: '3d'
  },
  {
    id: 'plastic-3',
    title: 'The Shade',
    artist: 'Auguste Rodin',
    year: '1880',
    description: 'A haunting figure representing the souls of the damned, originally part of The Gates of Hell. Experience this masterpiece in full 3D.',
    category: 'plastic',
    imageUrl: '/assets/images/plastic_arts/the_shade.stl',
    type: '3d'
  },

  // More Plastic Arts
  {
    id: 'plastic-4',
    title: 'Angel of Grief',
    artist: 'William Wetmore Story',
    year: '1894',
    description: 'A powerful expression of sorrow and mourning, depicting a weeping angel draped over an altar.',
    category: 'plastic',
    imageUrl: './assets/images/plastic_arts/PA4_AngelOfGrief_WilliamWetmore.jpg',
    type: '3d'
  },
  {
    id: 'plastic-5',
    title: 'Man with a Trench Coat',
    artist: 'George Segal',
    year: '1960',
    description: 'A life-size plaster figure embodying the mysterious noir detective archetype.',
    category: 'plastic',
    imageUrl: './assets/images/plastic_arts/PA5_ManWithATrenchCoat_GeorgeSegal.jpg',
    type: '3d'
  },

  // Performing Arts
  {
    id: 'performing-1',
    title: 'Double Indemnity',
    artist: 'Billy Wilder',
    year: '1944',
    description: 'A quintessential film noir about insurance fraud and murder, featuring masterful chiaroscuro lighting.',
    category: 'performing',
    imageUrl: './assets/images/graphic_arts/VA_2_The Maltese Falcon_WarnerBros.jpg',
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