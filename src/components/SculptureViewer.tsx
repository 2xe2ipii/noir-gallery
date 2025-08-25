import React, { useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Mesh, BufferGeometry } from 'three';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

interface SculptureViewerProps {
  modelUrl: string;
  isRotating: boolean;
  onRotateToggle: () => void;
}

interface ModelProps {
  url: string;
  autoRotate?: boolean;
}
import type {} from '../types/global';

interface ModelProps {
  url: string;
  autoRotate?: boolean;
}

function Model({ url, autoRotate = false }: ModelProps) {
  const meshRef = useRef<Mesh>(null);
  const geometry = useLoader(STLLoader, url) as BufferGeometry;

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#D4AF37"
        roughness={0.5}
        metalness={0.8}
        envMapIntensity={1}
      />
    </mesh>
  );
}

interface SculptureViewerProps {
  modelUrl: string;
  isRotating: boolean;
  onRotateToggle: () => void;
}

export const SculptureViewer: React.FC<SculptureViewerProps> = ({
  modelUrl,
  isRotating,
  onRotateToggle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '600px',
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <Stage
          environment="city"
          intensity={0.5}
          adjustCamera={false}
          shadows={{ type: 'contact', color: '#d4af37', opacity: 0.2 }}
        >
          <Model url={modelUrl} autoRotate={isRotating} />
        </Stage>
        <OrbitControls
          makeDefault
          autoRotate={isRotating}
          autoRotateSpeed={2}
          enableZoom={true}
          enablePan={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
        <PerspectiveCamera makeDefault fov={50} position={[0, 0, 4]} />
      </Canvas>

      {/* Controls Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem'
        }}
      >
        <motion.button
          onClick={onRotateToggle}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            color: '#D4AF37',
            fontFamily: 'var(--font-deco)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRotating ? 'PAUSE ROTATION' : 'ROTATE'}
        </motion.button>
      </motion.div>

      {/* Instructions Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          color: 'rgba(212, 175, 55, 0.6)',
          fontFamily: 'var(--font-noir)',
          fontSize: '0.875rem'
        }}
      >
        <motion.p style={{ margin: '0.25rem 0' }}>Click and drag to rotate</motion.p>
        <motion.p style={{ margin: '0.25rem 0' }}>Scroll to zoom</motion.p>
        <motion.p style={{ margin: '0.25rem 0' }}>Right-click and drag to pan</motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SculptureViewer;
