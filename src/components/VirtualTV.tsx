import React, { useState } from 'react';

const graphicArts = [
  '/assets/images/graphic_arts/VA_1_Nighthaws_Hopper.jpg',
  '/assets/images/graphic_arts/VA_2_The Maltese Falcon_WarnerBros.jpg',
  '/assets/images/graphic_arts/VA_3_Self-Portrait with Cigarette_EdwardMunch.jpg',
  '/assets/images/graphic_arts/VA_4_Noir City Poster Series_Various.jpg',
  '/assets/images/graphic_arts/VA_5_SinCity_FrankMiller.jpg',
];

const plasticArts = [
  '/assets/images/plastic_arts/PA1_TheThinker_AugusteRodin.jpg',
  '/assets/images/plastic_arts/PA2_MetropolisArchiModels_FritzLang.jpg',
  '/assets/images/plastic_arts/PA3_TheShade_AugusteRodin.jpg',
  '/assets/images/plastic_arts/PA4_AngelOfGrief_WilliamWetmore.jpg',
  '/assets/images/plastic_arts/PA5_ManWithATrenchCoat_GeorgeSegal.jpg',
];

const performingArts = [
  'https://www.youtube.com/embed/ScMzIvxBSi4',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/3JZ_D3ELwOQ',
];

const categories = [
  { key: 'graphic', label: 'Graphic Arts' },
  { key: 'plastic', label: 'Plastic Arts' },
  { key: 'performing', label: 'Performing Arts' },
];

const logoUrl = '/vite.svg'; // Replace with your logo if needed

const VirtualTV: React.FC = () => {
  const [selected, setSelected] = useState<string>('graphic');

  let content;
  if (selected === 'graphic') {
    content = (
      <div className="grid grid-cols-2 gap-4 p-4">
        {graphicArts.map((src, i) => (
          <img key={i} src={src} alt="Graphic Art" className="rounded-lg shadow-lg object-cover w-full h-48" />
        ))}
      </div>
    );
  } else if (selected === 'plastic') {
    content = (
      <div className="grid grid-cols-2 gap-4 p-4">
        {plasticArts.map((src, i) => (
          <img key={i} src={src} alt="Plastic Art" className="rounded-lg shadow-lg object-cover w-full h-48" />
        ))}
      </div>
    );
  } else if (selected === 'performing') {
    content = (
      <div className="flex flex-col items-center gap-6 p-4">
        {performingArts.map((url, i) => (
          <div key={i} className="w-full flex justify-center">
            <iframe width="420" height="236" src={url} title="Performing Art Video" frameBorder="0" allowFullScreen></iframe>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Old-school TV frame */}
      <div className="relative bg-noir-black border-8 border-noir-amber rounded-3xl shadow-2xl w-[600px] h-[400px] flex flex-col items-center justify-center mb-8">
        {/* Power On Logo */}
        <img src={logoUrl} alt="Logo" className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24" />
        {/* TV screen */}
        <div className="absolute inset-0 m-8 bg-noir-charcoal rounded-2xl flex flex-col items-center justify-center">
          <div className="flex gap-4 mb-4">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`px-4 py-2 rounded-lg font-bold text-lg transition-all duration-200 ${selected === cat.key ? 'bg-noir-amber text-noir-black' : 'bg-noir-black text-noir-amber border border-noir-amber'}`}
                onClick={() => setSelected(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="overflow-y-auto w-full h-[220px]">{content}</div>
        </div>
        {/* TV knobs and details */}
        <div className="absolute bottom-4 left-8 w-8 h-8 bg-noir-amber rounded-full shadow-inner border-2 border-noir-black"></div>
        <div className="absolute bottom-4 right-8 w-8 h-8 bg-noir-amber rounded-full shadow-inner border-2 border-noir-black"></div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-noir-amber rounded-b-xl"></div>
      </div>
    </div>
  );
};

export default VirtualTV;
