import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DoorOpen, User } from 'lucide-react';

interface WelcomePageProps {
  onEnterGallery: (userName: string) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onEnterGallery }) => {
  const [userName, setUserName] = useState('');
  const [isDoorOpening, setIsDoorOpening] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Show form after initial animation
    const timer = setTimeout(() => setShowForm(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      console.log(`User ${userName} entering gallery`);
      setIsDoorOpening(true);
      
      // Play door opening sound (placeholder)
      console.log('Playing door creak sound...');
      
      setTimeout(() => {
        onEnterGallery(userName.trim());
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background ambience */}
      <div className="absolute inset-0 bg-gradient-noir"></div>
      
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-spotlight opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 30% 70%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Left side - Gallery Information */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8 relative z-10"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="max-w-lg text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-deco text-noir-amber mb-6 text-shadow-noir"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            NOIR
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-deco text-noir-silver mb-8 text-shadow-noir"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Art Gallery
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-noir-silver leading-relaxed mb-8 font-noir"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Step into a world where shadows dance with light, where every frame tells a story, 
            and where art transcends the boundaries of time and space.
          </motion.p>

          <motion.p 
            className="text-md text-noir-gray italic mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            "In the darkness of the gallery, every artwork becomes a spotlight of human expression."
          </motion.p>

          {/* Entry Form */}
          <AnimatedForm 
            showForm={showForm}
            userName={userName}
            setUserName={setUserName}
            handleSubmit={handleSubmit}
            isDoorOpening={isDoorOpening}
          />
        </div>
      </motion.div>

      {/* Right side - Door */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8 relative"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Door isDoorOpening={isDoorOpening} />
      </motion.div>
    </div>
  );
};

interface AnimatedFormProps {
  showForm: boolean;
  userName: string;
  setUserName: (name: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isDoorOpening: boolean;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({ 
  showForm, userName, setUserName, handleSubmit, isDoorOpening 
}) => {
  if (!showForm || isDoorOpening) return null;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-noir-amber w-5 h-5" />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name to begin..."
          className="w-full pl-12 pr-4 py-4 bg-noir-charcoal/80 border-2 border-noir-amber/40 rounded-lg text-noir-white font-noir text-lg placeholder-noir-gray focus:border-noir-amber focus:outline-none focus:ring-2 focus:ring-noir-amber/20 transition-all duration-300 backdrop-blur-sm"
          required
        />
      </div>

      <motion.button
        type="submit"
        className="w-full btn-noir py-4 px-8 rounded-lg font-deco text-xl text-noir-amber flex items-center justify-center gap-3 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!userName.trim()}
      >
        <DoorOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        Enter the Gallery
      </motion.button>
    </motion.form>
  );
};

interface DoorProps {
  isDoorOpening: boolean;
}

const Door: React.FC<DoorProps> = ({ isDoorOpening }) => {
  return (
    <div className="relative">
      <motion.div
        className="relative w-80 h-96 bg-gradient-to-b from-noir-charcoal to-noir-black border-4 border-noir-amber/60 rounded-t-lg shadow-2xl"
        animate={isDoorOpening ? { scaleX: 0, originX: 0 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* panel */}
        <div className="absolute inset-4 border-2 border-noir-amber/30 rounded"></div>
        <div className="absolute inset-8 border border-noir-amber/20 rounded"></div>
        
        {/* hawakan */}
        <motion.div
          className="absolute right-6 top-1/2 w-4 h-8 bg-noir-amber rounded-full shadow-lg"
          animate={isDoorOpening ? { rotate: -90 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Door hinges */}
        <div className="absolute left-2 top-8 w-3 h-6 bg-noir-amber rounded-sm"></div>
        <div className="absolute left-2 bottom-8 w-3 h-6 bg-noir-amber rounded-sm"></div>

        {/* Light seeping through */}
        {isDoorOpening && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-noir-amber/30 rounded-t-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        )}
      </motion.div>

      {/* Door frame */}
      <div className="absolute -inset-2 border-8 border-noir-charcoal rounded-t-xl -z-10"></div>
      
      {/* Floor */}
      <div className="absolute -bottom-4 -inset-x-8 h-8 bg-gradient-to-r from-noir-charcoal via-noir-gray to-noir-charcoal rounded-b-lg"></div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-noir-amber/10 to-transparent rounded-t-lg -z-20"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
};

export default WelcomePage;