import React from 'react';
import { motion } from 'framer-motion';
import type { Artwork } from '../data/artworks';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { ArtworkCardProps } from '../types/components';
import { SculptureViewer } from './SculptureViewer';

const ArtworkCard = ({ artwork, category, isActive }: ArtworkCardProps) => {
  const [isRotating, setIsRotating] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  console.log('Rendering artwork:', artwork.title, 'Category:', category);

  const handleRotateToggle = () => {
    setIsRotating(!isRotating);
    console.log('Sculpture rotation toggled:', !isRotating);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    console.log('Performance playback toggled:', !isPlaying);
  };

  const renderArtworkDisplay = () => {
    switch (category) {
      case 'graphics':
        return <GraphicsDisplay artwork={artwork} isActive={isActive} />;
      case 'plastic':
        return <PlasticDisplay artwork={artwork} isActive={isActive} isRotating={isRotating} onRotateToggle={handleRotateToggle} />;
      case 'performing':
        return <PerformingDisplay artwork={artwork} isActive={isActive} isPlaying={isPlaying} isMuted={isMuted} onPlayToggle={handlePlayToggle} onMuteToggle={() => setIsMuted(!isMuted)} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
      {renderArtworkDisplay()}
      
      {/* Artwork information panel */}
      <motion.div
        className="flex-1 max-w-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-noir-charcoal/60 backdrop-blur-lg border-2 border-noir-amber/40 rounded-lg p-8 text-shadow-noir">
          <motion.h2
            className="text-4xl font-deco text-noir-amber mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {artwork.title}
          </motion.h2>
          
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-2xl text-noir-silver font-noir mb-1">by {artwork.artist}</p>
            <p className="text-lg text-noir-gray">{artwork.year}</p>
          </motion.div>

          <motion.p
            className="text-noir-white font-noir leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {artwork.description}
          </motion.p>

          {/* Category-specific controls */}
          {category === 'plastic' && (
            <motion.button
              onClick={handleRotateToggle}
              className="mt-6 btn-noir px-6 py-3 rounded-lg font-deco text-noir-amber"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRotating ? 'STOP ROTATION' : 'ROTATE VIEW'}
            </motion.button>
          )}

          {category === 'performing' && (
            <motion.div
              className="mt-6 flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.button
                onClick={handlePlayToggle}
                className="btn-noir px-6 py-3 rounded-lg font-deco text-noir-amber flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </motion.button>
              
              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className="btn-noir px-4 py-3 rounded-lg text-noir-amber"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

interface GraphicsDisplayProps {
  artwork: Artwork;
  isActive: boolean;
}

const GraphicsDisplay = ({ artwork, isActive }: GraphicsDisplayProps) => {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Gallery wall */}
      <div className="relative bg-gradient-to-b from-noir-charcoal/20 to-noir-black/40 rounded-lg p-10 flex items-center justify-center">
        
        {/* Spotlight beam */}
        <motion.div
          className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-spotlight opacity-60 rounded-full blur-2xl"
          animate={isActive ? { 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Picture frame */}
        <motion.div
          className="relative bg-noir-charcoal rounded-lg border-[12px] border-noir-amber/80 shadow-2xl cursor-pointer group inline-block"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Artwork image - Using img tag to preserve aspect ratio */}
          <img 
            src={artwork.imageUrl}
            alt={`${artwork.title} by ${artwork.artist}`}
            className="max-w-[80vw] max-h-[70vh] w-auto h-auto object-contain filter sepia-[20%] contrast-125 brightness-95 transition-all duration-700 ease-in-out group-hover:sepia-0"
          />
          
          {/* Glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Frame inner shadow and shine */}
          <div className="absolute inset-0 shadow-inner border-2 border-noir-amber/30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Interaction hint */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="bg-noir-black/60 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-noir-amber font-deco text-lg">VIEW DETAILS</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Gallery lighting effect */}
        <div className="absolute -inset-4 bg-gradient-radial from-noir-amber/10 via-transparent to-transparent rounded-full -z-10"></div>
      </div>

      {/* Wall texture and ambient lighting */}
      <div className="absolute -inset-12 bg-gradient-to-b from-noir-charcoal/10 to-transparent rounded-lg -z-20">
        <div className="absolute inset-0 bg-gradient-radial from-noir-amber/5 via-transparent to-transparent mix-blend-overlay"></div>
      </div>
      
      {/* Dramatic side lighting */}
      <motion.div
        className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-24 h-96 bg-gradient-to-r from-noir-amber/10 to-transparent blur-2xl -z-10"
        animate={isActive ? {
          opacity: [0.3, 0.6, 0.3],
          rotate: [-5, 5, -5]
        } : {}}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </motion.div>
  );
};

interface PlasticDisplayProps {
  artwork: Artwork;
  isActive: boolean;
  isRotating: boolean;
  onRotateToggle: () => void;
}

const PlasticDisplay = ({ artwork, isActive, isRotating, onRotateToggle }: PlasticDisplayProps) => {
  // Check if the artwork has a 3D model
  const is3DModel = artwork.type === '3d' && artwork.imageUrl.endsWith('.stl');

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Display area with spotlight effect */}
      <div className="relative w-[900px] h-[700px] bg-gradient-to-b from-noir-charcoal/20 to-noir-black/40 p-8 rounded-lg">
        {/* Marble pedestal */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-24 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 rounded-lg shadow-2xl">
          <div className="absolute inset-2 bg-gradient-to-t from-gray-200 to-white rounded border-2 border-gray-300"></div>
          {/* Pedestal plaque */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-noir-amber rounded text-sm font-deco text-noir-black flex items-center justify-center">
            {artwork.artist}
          </div>
        </div>

        {/* Sculpture display */}
        <div className="absolute inset-8 bottom-24">
          {is3DModel ? (
            // 3D Model Viewer
            <div className="w-full h-full">
              <SculptureViewer
                modelUrl={artwork.imageUrl}
                isRotating={isRotating}
                onRotateToggle={onRotateToggle}
              />
            </div>
          ) : (
            // Image Display with rotation effect
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={isRotating ? { rotateY: 360 } : {}}
              transition={isRotating ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative max-w-full max-h-full">
                <img 
                  src={artwork.imageUrl}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  className="max-w-full max-h-[500px] w-auto h-auto object-contain filter grayscale contrast-125 shadow-2xl"
                  style={{ transform: 'perspective(1000px) rotateX(5deg)' }}
                />
                
                {/* Dramatic lighting effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-noir-amber/10 via-transparent to-noir-amber/5 mix-blend-overlay pointer-events-none"></div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Dramatic spotlight effect */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 opacity-30 pointer-events-none"
          animate={isActive ? {
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-full h-full bg-gradient-radial from-noir-amber/40 via-transparent to-transparent blur-2xl"></div>
        </motion.div>

        {/* Enhanced shadow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-6 bg-gradient-to-t from-noir-black/60 to-transparent rounded-full blur-lg"></div>
      </div>
    </motion.div>
  );
};

interface PerformingDisplayProps {
  artwork: Artwork;
  isActive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}

const PerformingDisplay = ({ 
  artwork, 
  isActive,
  isPlaying, 
  isMuted, 
  onPlayToggle,
  onMuteToggle
}: PerformingDisplayProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Stage frame */}
      <div className="relative w-96 h-72 bg-gradient-to-b from-red-900/30 to-noir-black rounded-lg border-4 border-noir-amber/60 shadow-2xl overflow-hidden">
        
        {/* Stage backdrop */}
        <div 
          className="w-full h-full bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${artwork.imageUrl})` }}
        />

        {/* Stage overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-black/60 via-transparent to-noir-black/40"></div>

        {/* Stage lights */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-noir-amber/40 to-transparent"
          animate={isPlaying ? { opacity: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Performance indicator */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 border-4 border-red-500/50"
            animate={{ borderColor: ['rgba(239, 68, 68, 0.5)', 'rgba(239, 68, 68, 0.8)', 'rgba(239, 68, 68, 0.5)'] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Audio visualization */}
        {isPlaying && !isMuted && (
          <div className="absolute bottom-4 left-4 right-4 flex items-end space-x-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-3 bg-noir-amber rounded-t opacity-60"
                animate={{ height: ['8px', '24px', '8px'] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}

        {/* Play/pause overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={onPlayToggle}
            className="bg-noir-black/70 backdrop-blur-sm rounded-full p-6 border-2 border-noir-amber/60"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 0.3 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {isPlaying ? 
              <Pause className="w-12 h-12 text-noir-amber" /> : 
              <Play className="w-12 h-12 text-noir-amber ml-1" />
            }
          </motion.button>
        </div>

        {/* Progress bar */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-noir-charcoal">
            <motion.div
              className="h-full bg-noir-amber"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 30, repeat: Infinity }}
            />
          </div>
        )}
      </div>

      {/* Theater ambience */}
      <div className="absolute -inset-8 bg-gradient-radial from-red-900/5 via-transparent to-transparent rounded-full -z-10"></div>
      
      {/* Stage shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-8 bg-noir-black/60 rounded-full blur-lg"></div>
    </motion.div>
  );
};

export default ArtworkCard;