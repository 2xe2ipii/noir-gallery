import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Info, RotateCcw } from 'lucide-react';  
import { getArtworksByCategory, Artwork } from '../data/artworks';
import ArtworkCard from './ArtworkCard';

interface ChannelPageProps {
  category: 'graphics' | 'plastic' | 'performing';
  onExit: () => void;
  selectedArtwork: Artwork | null;
  onArtworkSelect: (artwork: Artwork | null) => void;
}

const categoryConfig = {
  graphics: {
    title: 'GRAPHIC ARTS',
    subtitle: 'Paintings & Visual Masterpieces',
    bgClass: 'bg-gradient-to-b from-noir-black via-noir-charcoal/30 to-noir-black',
    spotlightColor: 'rgba(212, 175, 55, 0.2)'
  },
  plastic: {
    title: 'PLASTIC ARTS', 
    subtitle: 'Sculptures & Three-Dimensional Forms',
    bgClass: 'bg-gradient-to-b from-noir-black via-blue-900/10 to-noir-black',
    spotlightColor: 'rgba(100, 150, 200, 0.2)'
  },
  performing: {
    title: 'PERFORMING ARTS',
    subtitle: 'Theater, Dance & Musical Performances', 
    bgClass: 'bg-gradient-to-b from-noir-black via-red-900/10 to-noir-black',
    spotlightColor: 'rgba(200, 100, 100, 0.2)'
  }
};

const ChannelPage: React.FC<ChannelPageProps> = ({ 
  category, 
  onExit, 
  onArtworkSelect 
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  const [curtainOpen, setCurtainOpen] = useState(false);

  const config = categoryConfig[category];

  useEffect(() => {
    console.log(`Loading ${category} channel`);
    const categoryArtworks = getArtworksByCategory(category);
    setArtworks(categoryArtworks);
    setCurrentIndex(0);
    
    // Special effect for performing arts - curtain animation
    if (category === 'performing') {
      setTimeout(() => setCurtainOpen(true), 1000);
    }

    // Spotlight movement effect
    const interval = setInterval(() => {
      setSpotlightPosition({
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [category]);

  useEffect(() => {
    if (artworks.length > 0) {
      onArtworkSelect(artworks[currentIndex]);
    }
  }, [currentIndex, artworks, onArtworkSelect]);

  const handlePrevious = () => {
    console.log('Previous artwork');
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const handleNext = () => {
    console.log('Next artwork');
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onExit();
  };

  if (artworks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-noir-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-noir-amber font-deco text-xl">Loading artworks...</p>
        </div>
      </div>
    );
  }

  const currentArtwork = artworks[currentIndex];

  return (
    <div 
      className={`min-h-screen relative ${config.bgClass} overflow-hidden`}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Noir background for graphics channel */}
      {category === 'graphics' && (
        <div 
          className="absolute inset-0 bg-center opacity-40"
          style={{ 
            backgroundImage: 'url(/assets/images/graphic_arts/ga_bg.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat'
          }}
        />
      )}

      {/* Background effects */}
      <div className="absolute inset-0 film-grain"></div>
      
      {/* Dynamic spotlight */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${spotlightPosition.x}% ${spotlightPosition.y}%, ${config.spotlightColor} 0%, transparent 60%)`
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Performing arts curtain */}
      {category === 'performing' && (
        <PerformingArtsCurtain isOpen={curtainOpen} />
      )}

      {/* Exit sign */}
      <motion.button
        onClick={onExit}
        className="absolute top-6 left-6 z-50 btn-noir px-6 py-3 rounded-lg font-deco text-noir-amber flex items-center gap-2 group animate-pulse-glow"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        EXIT
      </motion.button>

      {/* Gallery header */}
      <motion.div
        className="absolute top-6 right-6 z-40 text-right"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-3xl font-deco text-noir-amber text-shadow-noir">{config.title}</h1>
        <p className="text-noir-gray font-noir">{config.subtitle}</p>
        <p className="text-sm text-noir-gray mt-1">
          {currentIndex + 1} / {artworks.length}
        </p>
      </motion.div>

      {/* Main content area */}
      <div className="flex items-center justify-center min-h-screen py-20">
        <div className="relative w-full px-16">
          
          {/* Navigation arrows */}
          <button
            onClick={handlePrevious}
            className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 btn-noir p-8 rounded-full group hover:bg-noir-amber/10"
            disabled={artworks.length <= 1}
          >
            <ChevronLeft className="w-12 h-12 text-noir-amber group-hover:-translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 btn-noir p-8 rounded-full group hover:bg-noir-amber/10"
            disabled={artworks.length <= 1}
          >
            <ChevronRight className="w-12 h-12 text-noir-amber group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Artwork display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArtwork.id}
              className="flex flex-col lg:flex-row items-center justify-center gap-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <ArtworkCard 
                artwork={currentArtwork} 
                category={category}
                isActive={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex items-center space-x-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`btn-noir px-4 py-2 rounded-lg font-deco flex items-center gap-2 ${showInfo ? 'bg-noir-amber/20' : ''}`}
        >
          <Info className="w-4 h-4" />
          INFO
        </button>

        {category === 'plastic' && (
          <button
            className="btn-noir px-4 py-2 rounded-lg font-deco flex items-center gap-2"
            onClick={() => console.log('Rotate sculpture')}
          >
            <RotateCcw className="w-4 h-4" />
            ROTATE
          </button>
        )}

        {/* Artwork dots indicator */}
        <div className="flex space-x-2">
          {artworks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-noir-amber shadow-lg' 
                  : 'bg-noir-gray/40 hover:bg-noir-gray'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Info panel overlay */}
      <AnimatePresence>
        {showInfo && currentArtwork && (
          <motion.div
            className="absolute inset-0 bg-noir-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              className="bg-noir-charcoal/90 border-2 border-noir-amber/60 rounded-lg p-8 max-w-2xl mx-4 backdrop-blur-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-deco text-noir-amber mb-2">{currentArtwork.title}</h3>
              <p className="text-xl text-noir-silver font-noir mb-1">by {currentArtwork.artist}</p>
              <p className="text-lg text-noir-gray mb-6">{currentArtwork.year}</p>
              <p className="text-noir-white font-noir leading-relaxed">{currentArtwork.description}</p>
              
              <button
                onClick={() => setShowInfo(false)}
                className="mt-6 btn-noir px-6 py-2 rounded-lg font-deco text-noir-amber"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PerformingArtsCurtainProps {
  isOpen: boolean;
}

const PerformingArtsCurtain: React.FC<PerformingArtsCurtainProps> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <>
          {/* Left curtain */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full curtain z-30"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          
          {/* Right curtain */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full curtain z-30"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          
          {/* Curtain rod */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-noir-amber via-yellow-600 to-noir-amber z-40 shadow-lg"></div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChannelPage;