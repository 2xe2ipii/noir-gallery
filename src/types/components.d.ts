import type { Artwork } from '../data/artworks';

export interface ArtworkCardProps {
  artwork: Artwork;
  category: 'graphics' | 'plastic' | 'performing';
  isActive: boolean;
}
// (Intentionally left blank. Use only default types.)

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
