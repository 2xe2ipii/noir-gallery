import { HTMLMotionProps } from 'framer-motion';
import type { Artwork } from '../data/artworks';


declare module 'framer-motion' {
  export interface HTMLMotionProps<T> extends React.HTMLAttributes<T> {
    initial?: any;
    animate?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
  }
}

export interface ArtworkCardProps {
  artwork: Artwork;
  category: 'graphics' | 'plastic' | 'performing';
  isActive: boolean;
}

export interface GraphicsDisplayProps {
  artwork: Artwork;
  isActive: boolean;
}

export interface PlasticDisplayProps {
  artwork: Artwork;
  isActive: boolean;
  isRotating: boolean;
  onRotateToggle: () => void;
}
export interface PerformingDisplayProps {
  artwork: Artwork;
  isActive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}
