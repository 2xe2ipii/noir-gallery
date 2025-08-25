/// <reference types="react" />
/// <reference types="framer-motion" />

declare module 'react' {
  export * from 'react';
  export interface ReactElement {
    type: any;
    props: any;
    key: any;
  }
}

declare global {
  namespace React {
    interface Attributes {
      className?: string;
    }
  }
}

declare module 'framer-motion' {
  export interface HTMLMotionProps<T> extends React.HTMLAttributes<T> {
    className?: string;
    [key: string]: any;
  }
}
