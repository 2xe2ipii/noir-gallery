import { HTMLMotionProps } from "framer-motion";

declare module 'framer-motion' {
  interface AnimateProps {
    onClick?: () => void;
  }

  export interface MotionProps extends AnimateProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mesh': any;
      'meshStandardMaterial': any;
      'Canvas': any;
      'OrbitControls': any;
      'Stage': any;
      'PerspectiveCamera': any;
    }
  }
}
