import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import ParticleField from '../three/ParticleField';

/**
 * Hero Scene: Particle field morphing on clean canvas (no 3D green terrain mesh).
 */
export default function HeroScene({ progress = 0, isMobile = false }) {
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

  const particleProgress = Math.min(1, progress * 2);
  const fogColor = isLight ? '#FBF8F3' : '#0B120E';

  return (
    <Canvas
      camera={{ position: [0, 5, 13], fov: isMobile ? 60 : 50 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={isLight ? 0.8 : 0.4} />
        <directionalLight position={[5, 8, 5]} intensity={isLight ? 1.2 : 0.8} color={isLight ? '#237A55' : '#3EB380'} />
        <directionalLight position={[-4, 4, -4]} intensity={0.25} color={isLight ? '#1B5C40' : '#142B20'} />
        <fog attach="fog" args={[fogColor, 12, 38]} />

        <ParticleField progress={particleProgress} isMobile={isMobile} isLight={isLight} />
      </Suspense>
    </Canvas>
  );
}
