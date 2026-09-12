import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import ParticleField from '../three/ParticleField';

/**
 * Observation Scene: Clean canvas without 3D green terrain ground mesh.
 */
export default function ObservationScene({ progress = 0, isMobile = false }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const fogColor = isLight ? '#FBF8F3' : '#0B120E';

  return (
    <Canvas
      camera={{ position: [0, 4, 10], fov: isMobile ? 55 : 45 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={isLight ? 0.75 : 0.35} />
        <directionalLight position={[4, 8, 3]} intensity={isLight ? 1.1 : 0.7} color={isLight ? '#237A55' : '#3EB380'} />
        <fog attach="fog" args={[fogColor, 12, 38]} />

        <ParticleField progress={progress} isMobile={isMobile} isLight={isLight} />
      </Suspense>
    </Canvas>
  );
}
