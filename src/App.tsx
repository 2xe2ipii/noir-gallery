import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from './components/WelcomePage';
import GalleryHub from './components/GalleryHub';
import ChannelPage from './components/ChannelPage';
import { Artwork } from './data/artworks';

type Page = 'welcome' | 'hub' | 'graphics' | 'plastic' | 'performing';

interface AppState {
  currentPage: Page;
  userName: string;
  isTransitioning: boolean;
  selectedArtwork: Artwork | null;
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'welcome',
    userName: '',
    isTransitioning: false,
    selectedArtwork: null
  });

  const handlePageTransition = (page: Page, data?: any) => {
    console.log(`Transitioning to page: ${page}`, data);
    setAppState(prev => ({ ...prev, isTransitioning: true }));
    
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        currentPage: page,
        isTransitioning: false,
        ...(data && { userName: data.userName })
      }));
    }, 1000);
  };

  const handleArtworkSelect = (artwork: Artwork | null) => {
    console.log('Selected artwork:', artwork);
    setAppState(prev => ({ ...prev, selectedArtwork: artwork }));
  };

  const renderCurrentPage = () => {
    switch (appState.currentPage) {
      case 'welcome':
        return (
          <WelcomePage
            onEnterGallery={(userName) => handlePageTransition('hub', { userName })}
          />
        );
      case 'hub':
        return (
          <GalleryHub
            userName={appState.userName}
            onChannelSelect={(channel) => handlePageTransition(channel)}
            onExit={() => handlePageTransition('welcome')}
          />
        );
      case 'graphics':
      case 'plastic':
      case 'performing':
        return (
          <ChannelPage
            category={appState.currentPage}
            onExit={() => handlePageTransition('hub')}
            selectedArtwork={appState.selectedArtwork}
            onArtworkSelect={handleArtworkSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-noir-black relative overflow-hidden film-grain">
      <AnimatePresence mode="wait">
        {appState.isTransitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-noir-black z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-noir-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <motion.p 
                className="text-noir-amber font-deco text-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading...
              </motion.p>
            </div>
          </motion.div>
        )}
        
        {!appState.isTransitioning && (
          <motion.div
            key={appState.currentPage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full"
          >
            {renderCurrentPage()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;