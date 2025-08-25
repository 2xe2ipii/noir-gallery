import { ComponentType } from 'react';
import { motion } from 'framer-motion';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'motion.div': any;
      'motion.button': any;
      'motion.h2': any;
      'motion.p': any;
      div: any;
      p: any;
      h2: any;
      button: any;
      img: any;
    }
  }
}

export interface MotionDivProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

export const MotionDiv: ComponentType<MotionDivProps> = motion.div;
export const MotionButton: ComponentType<MotionDivProps> = motion.button;
