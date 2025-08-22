import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, ChevronUp, ChevronDown, Monitor, LogOut, Palette, Hammer, Theater } from 'lucide-react';

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
    description: 'Paintings, drawings, and visual masterpieces',
    previewImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop'
  },
  {
    id: 'plastic',
    name: 'PLASTIC ARTS',
    icon: <Hammer className="w-8 h-8" />,
    description: 'Sculptures and three-dimensional art forms',
    previewImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop'
  },
  {
    id: 'performing',
    name: 'PERFORMING ARTS',
    icon: <Theater className="w-8 h-8" />,
    description: 'Ballet, opera, and theatrical performances',
    previewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  }
];

const GalleryHub: React.FC<GalleryHubProps> = ({ userName, onChannelSelect, onExit }) => {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [showStatic, setShowStatic] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      onExit();
    }
  };

  const handleChannelChange = (direction: 'up' | 'down') => {
    if (!isPowerOn) return;
    
    setIsTransitioning(true);
    setShowStatic(true);
    
    setTimeout(() => {
      if (direction === 'up') {
        setCurrentChannelIndex((prev) => (prev + 1) % channels.length);
      } else {
        setCurrentChannelIndex((prev) => (prev - 1 + channels.length) % channels.length);
      }
      setShowStatic(false);
      setIsTransitioning(false);
    }, 800);
    
    console.log(`Channel changed ${direction}, new index will be:`, 
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
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

      {/* Welcome message */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-deco text-noir-amber mb-2">Welcome back, {userName}</h1>
        <p className="text-noir-gray font-noir">Select a channel to begin your journey</p>
      </motion.div>

      {/* TV Container */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* TV Frame */}
        <div className="relative w-96 h-72 bg-gradient-to-b from-noir-charcoal to-noir-black rounded-lg shadow-2xl border-4 border-noir-gray p-4">
          {/* Screen */}
          <div className="relative w-full h-full bg-noir-black rounded border-2 border-noir-gray/50 overflow-hidden">
            
            {/* Screen Content */}
            <AnimatePresence mode="wait">
              {!isPowerOn ? (
                <motion.div
                  key="off"
                  className="w-full h-full bg-noir-black flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Monitor className="w-16 h-16 text-noir-gray/30" />
                </motion.div>
              ) : showStatic ? (
                <TVStatic key="static" />
              ) : (
                <ChannelPreview key="channel" channel={currentChannel} />
              )}
            </AnimatePresence>
            
            {/* Scan lines overlay */}
            {isPowerOn && <div className="absolute inset-0 tv-scan-lines pointer-events-none"></div>}
          </div>

          {/* TV brand */}
          <div className="absolute bottom-1 right-2 text-xs text-noir-amber font-deco">NOIR-VISION</div>
        </div>

        {/* TV Stand */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gradient-to-b from-noir-gray to-noir-charcoal rounded-b-lg"></div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-noir-charcoal rounded-full"></div>
      </motion.div>

      {/* TV Controls */}
      <TVControls
        isPowerOn={isPowerOn}
        onPowerToggle={handlePowerToggle}
        onChannelUp={() => handleChannelChange('up')}
        onChannelDown={() => handleChannelChange('down')}
        onSelectChannel={handleSelectChannel}
        currentChannel={currentChannel}
        isTransitioning={isTransitioning}
      />

      {/* Exit sign */}
      <motion.button
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
      </motion.button>
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
      {/* Static noise pattern */}
      <div className="absolute inset-0 tv-static opacity-80"></div>
      
      {/* Animated noise */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Sound wave visualization */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end space-x-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-white/60 rounded-t"
            animate={{ height: ['4px', '20px', '4px'] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1,
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
      className="w-full h-full relative"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${channel.previewImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir-black/80 via-transparent to-noir-black/60"></div>
      
      {/* Channel info */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="text-noir-amber">{channel.icon}</div>
          <h3 className="text-xl font-deco text-noir-white">{channel.name}</h3>
        </div>
        
        <div className="text-center">
          <motion.div
            className="text-6xl font-deco text-noir-amber mb-2 opacity-20"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {channel.name.split(' ')[0]}
          </motion.div>
          <p className="text-sm text-noir-gray font-noir">{channel.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface TVControlsProps {
  isPowerOn: boolean;
  onPowerToggle: () => void;
  onChannelUp: () => void;
  onChannelDown: () => void;
  onSelectChannel: () => void;
  currentChannel: Channel;
  isTransitioning: boolean;
}

const TVControls: React.FC<TVControlsProps> = ({
  isPowerOn,
  onPowerToggle,
  onChannelUp,
  onChannelDown,
  onSelectChannel,
  currentChannel,
  isTransitioning
}) => {
  return (
    <motion.div
      className="mt-8 flex flex-col items-center space-y-4 z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      {/* Power button */}
      <motion.button
        onClick={onPowerToggle}
        className={`btn-noir px-8 py-4 rounded-full font-deco text-lg flex items-center gap-3 ${
          isPowerOn ? 'bg-red-900/30 border-red-400' : ''
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Power className={`w-6 h-6 ${isPowerOn ? 'text-red-400' : 'text-noir-amber'}`} />
        {isPowerOn ? 'POWER OFF' : 'POWER ON'}
      </motion.button>

      {isPowerOn && (
        <motion.div
          className="flex items-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Channel controls */}
          <button
            onClick={onChannelDown}
            disabled={isTransitioning}
            className="btn-noir p-3 rounded-lg disabled:opacity-50"
          >
            <ChevronDown className="w-6 h-6 text-noir-amber" />
          </button>

          <div className="text-center min-w-[200px]">
            <p className="text-xs text-noir-gray font-noir mb-1">CHANNEL</p>
            <p className="text-lg font-deco text-noir-amber">{currentChannel.name}</p>
          </div>

          <button
            onClick={onChannelUp}
            disabled={isTransitioning}
            className="btn-noir p-3 rounded-lg disabled:opacity-50"
          >
            <ChevronUp className="w-6 h-6 text-noir-amber" />
          </button>
        </motion.div>
      )}

      {isPowerOn && (
        <motion.button
          onClick={onSelectChannel}
          disabled={isTransitioning}
          className="btn-noir px-8 py-3 rounded-lg font-deco text-lg text-noir-amber disabled:opacity-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SELECT CHANNEL
        </motion.button>
      )}
    </motion.div>
  );
};

export default GalleryHub;