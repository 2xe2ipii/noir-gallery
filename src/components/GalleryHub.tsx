import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  LogOut, 
  Palette, 
  Hammer, 
  Theater, 
  Power, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import '../styles/tv-effects.css';

interface GalleryHubProps {
  userName: string;
  onChannelSelect: (channel: 'graphics' | 'plastic' | 'performing') => void;
  onExit: () => void;
}

type Channel = {
  id: 'graphics' | 'plastic' | 'performing';
  name: string;
  icon: React.ReactNode;
  description: string;
  previewImage: string;
};

const channels: Channel[] = [
  {
    id: 'graphics',
    name: 'GRAPHIC ARTS',
    icon: <Palette className="w-8 h-8" />,
    description: 'Where shadows and light dance on canvas',
    previewImage: './assets/images/graphic_arts/VA_1_Nighthaws_Hopper.jpg'
  },
  {
    id: 'plastic',
    name: 'PLASTIC ARTS',
    icon: <Hammer className="w-8 h-8" />,
    description: 'Sculptures born from darkness and mystery',
    previewImage: './assets/images/plastic_arts/PA1_TheThinker_AugusteRodin.jpg'
  },
  {
    id: 'performing',
    name: 'PERFORMING ARTS',
    icon: <Theater className="w-8 h-8" />,
    description: 'Stories told in shadows and spotlights',
    previewImage: './assets/images/graphic_arts/VA_4_Noir City Poster Series_Various.jpg'
  }
];

const GalleryHub: React.FC<GalleryHubProps> = ({ userName, onChannelSelect, onExit }) => {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [showStatic, setShowStatic] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio elements
  useEffect(() => {
    const bgMusic = new Audio('./assets/sounds/bg.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    const setupBackgroundMusic = async () => {
      try {
        // Start playing as soon as possible
        await bgMusic.play();
      } catch (error) {
        console.error('Error playing background music:', error);
      }
    };
    
    // Just control the volume based on sound enabled state
    bgMusic.volume = soundEnabled ? 0.3 : 0;
    
    setupBackgroundMusic();
    
    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, []); // Only run once on mount
  
  // Update volume when sound is toggled
  useEffect(() => {
    const audios = document.getElementsByTagName('audio');
    for (let audio of audios) {
      audio.volume = soundEnabled ? 0.3 : 0;
    }
  }, [soundEnabled]);

  useEffect(() => {
    console.log(`Gallery Hub loaded for user: ${userName}`);
  }, [userName]);

  const handlePowerToggle = () => {
    console.log('TV power toggled:', !isPowerOn);
    if (!isPowerOn) {
      setShowStatic(true);
      setTimeout(() => {
        setShowStatic(false);
        setIsPowerOn(true);
      }, 1500);
    } else {
      setIsPowerOn(false);
    }
  };

  const handleChannelChange = (direction: 'up' | 'down') => {
    if (!isPowerOn) return;

    setIsTransitioning(true);
    setShowStatic(true);

    setTimeout(() => {
      setCurrentChannelIndex((prev) =>
        direction === 'up'
          ? (prev + 1) % channels.length
          : (prev - 1 + channels.length) % channels.length
      );
      setShowStatic(false);
      setIsTransitioning(false);
    }, 800);

    console.log(
      `Channel changed ${direction}, new index will be:`,
      direction === 'up'
        ? (currentChannelIndex + 1) % channels.length
        : (currentChannelIndex - 1 + channels.length) % channels.length
    );
  };

  const handleSelectChannel = () => {
    if (!isPowerOn) return;
    console.log('Selecting channel:', channels[currentChannelIndex].id);
    onChannelSelect(channels[currentChannelIndex].id);
  };

  const currentChannel = channels[currentChannelIndex];

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background room */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-black via-noir-charcoal/20 to-noir-black"></div>

      {/* Ambient lighting */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 40% 60%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 60% 40%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* TV Container */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* TV Frame */}
        <div className="relative w-[90vw] max-w-[1400px] h-[85vh] max-h-[900px] bg-gradient-to-b from-noir-black via-noir-charcoal to-noir-black rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.85)] border-[16px] border-noir-amber/90 flex flex-col items-center justify-center mx-auto">
          {/* Screen */}
          <div className="relative w-full h-full bg-noir-black rounded-[2rem] border-[8px] border-noir-amber/60 shadow-inner overflow-hidden flex flex-col items-center justify-center">
            {/* Screen Content */}
            <AnimatePresence mode="wait">
              {!isPowerOn ? (
                <motion.div
                  key="off"
                  className="w-full h-full bg-noir-black flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="text-4xl font-deco text-noir-amber mb-4">Welcome back, {userName}</h1>
                  <p className="text-noir-gray font-noir">Press power to begin your journey</p>
                </motion.div>
              ) : showStatic ? (
                <TVStatic key="static" />
              ) : (
                <ChannelPreview key="channel" channel={currentChannel} />
              )}
            </AnimatePresence>

            {/* TV Controls at bottom */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20 bg-gradient-to-b from-transparent to-noir-black/80 px-8 py-4 rounded-full">
              <motion.button
                onClick={handlePowerToggle}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-noir-amber to-noir-charcoal flex items-center justify-center shadow-lg hover:shadow-inner transition-shadow disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Power className={`w-6 h-6 ${isPowerOn ? 'text-noir-amber' : 'text-noir-gray'}`} />
              </motion.button>
              
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-noir-amber to-noir-charcoal flex items-center justify-center shadow-lg hover:shadow-inner transition-shadow disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {soundEnabled ? (
                  <Volume2 className="w-6 h-6 text-noir-amber" />
                ) : (
                  <VolumeX className="w-6 h-6 text-noir-gray" />
                )}
              </motion.button>

              {isPowerOn && (
                <>
                  <motion.button
                    onClick={handleSelectChannel}
                    disabled={isTransitioning}
                    className="px-6 py-2 rounded-full bg-gradient-to-br from-noir-amber to-noir-charcoal text-noir-amber font-deco text-lg shadow-lg hover:shadow-inner transition-shadow disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ENTER
                  </motion.button>

                  <motion.button
                    onClick={() => handleChannelChange('up')}
                    disabled={isTransitioning}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-noir-amber to-noir-charcoal flex items-center justify-center shadow-lg hover:shadow-inner transition-shadow disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6 text-noir-amber" />
                  </motion.button>
                </>
              )}
            </div>

            {/* Scan lines overlay */}
            {isPowerOn && <div className="absolute inset-0 tv-scan-lines pointer-events-none opacity-30"></div>}
            
            {/* Noir vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)'
              }}
            ></div>
          </div>

          {/* TV brand */}
          <div className="absolute bottom-2 right-6 text-xs text-noir-amber font-deco drop-shadow-lg tracking-widest">
            NOIR-VISION
          </div>
        </div>
      </motion.div>

      {/* TV Controls */}
      <TVControls
        isPowerOn={isPowerOn}
        onChannelUp={() => handleChannelChange('up')}
        onChannelDown={() => handleChannelChange('down')}
        onSelectChannel={handleSelectChannel}
        currentChannel={currentChannel}
        isTransitioning={isTransitioning}
      />

      {/* Exit sign */}
      {/* <motion.button
        onClick={onExit}
        className="absolute top-8 right-8 btn-noir px-6 py-3 rounded-lg font-deco text-noir-amber flex items-center gap-2 group"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        EXIT
      </motion.button> */}
    </div>
  );
};

const TVStatic: React.FC = () => {
  return (
    <motion.div
      className="w-full h-full bg-noir-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 tv-static"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-40"></div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          x: ['-100%', '100%']
        }}
        transition={{
          opacity: { duration: 0.2, repeat: Infinity },
          x: { duration: 0.3, repeat: Infinity, ease: 'linear' }
        }}
      />

      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-1 sound-wave">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-white/60 rounded-t"
            animate={{ height: ['4px', '20px', '4px'] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface ChannelPreviewProps {
  channel: Channel;
}

const ChannelPreview: React.FC<ChannelPreviewProps> = ({ channel }) => {
  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Noir Background */}
      <div 
        className="absolute inset-0 bg-center"
        style={{ 
          backgroundImage: 'url(/assets/images/graphic_arts/ga_bg.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat',
          opacity: 0.8
        }}
      />
      
      {/* Dynamic Lighting */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Artwork Display */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <motion.div 
          className="relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            width: '95%',
            height: '90%'
          }}
        >
          {/* Artwork */}
          <div 
            className="w-full h-full bg-cover bg-center shadow-[0_0_150px_rgba(0,0,0,0.7)] border-[12px] border-noir-amber/40"
            style={{ 
              backgroundImage: `url(${channel.previewImage})`,
              boxShadow: '0 0 120px rgba(212, 175, 55, 0.2)'
            }}
          />
          
          {/* Spotlight Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-noir-black opacity-40"></div>
        </motion.div>
      </div>
      
      {/* Channel Info */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="bg-gradient-to-t from-noir-black via-noir-black/80 to-transparent px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-noir-amber bg-noir-black/50 p-4 rounded-full shadow-lg">
                {channel.icon}
              </div>
              <div>
                <h3 className="text-3xl font-deco text-noir-amber mb-2">{channel.name}</h3>
                <p className="text-lg text-noir-gray font-noir">{channel.description}</p>
              </div>
            </div>
            
            <motion.div
              className="text-8xl font-deco text-noir-amber/20"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {channel.name.split(' ')[0]}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TVControlsProps {
  isPowerOn: boolean;
  onChannelUp: () => void;
  onChannelDown: () => void;
  onSelectChannel: () => void;
  currentChannel: Channel;
  isTransitioning: boolean;
}

const TVControls: React.FC<TVControlsProps> = ({
  isPowerOn,
  onChannelUp,
  onChannelDown,
  onSelectChannel,
  currentChannel,
  isTransitioning
}) => {
  if (!isPowerOn) return null;
  return (
    <>
      {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={onChannelDown}
          disabled={isTransitioning}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-noir-amber to-noir-charcoal flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="w-6 h-6 text-noir-amber" />
        </motion.button>
      </div> */}

      {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={onChannelUp}
          disabled={isTransitioning}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-noir-amber to-noir-charcoal flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-6 h-6 text-noir-amber" />
        </motion.button>
      </div> */}

      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="text-center">
          <p className="text-xs text-noir-gray font-noir">CHANNEL</p>
          <p className="text-2xl font-deco text-noir-amber drop-shadow-lg">{currentChannel.name}</p>
        </div>

        <motion.button
          onClick={onSelectChannel}
          disabled={isTransitioning}
          className="btn-noir px-6 py-2 rounded-full font-deco text-lg text-noir-amber bg-gradient-to-br from-noir-amber to-noir-charcoal shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ENTER
        </motion.button>
      </div> */}
    </>
  );
};

export default GalleryHub;
