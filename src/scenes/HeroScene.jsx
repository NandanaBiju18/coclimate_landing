import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import ParticleField from '../three/ParticleField';
import TerrainMesh from '../three/TerrainMesh';
import GrowingTree from '../three/GrowingTree';

/**
 * Hero Scene: Theme-aware 3D canvas rendering clean fog and terrain in both Light and Dark modes.
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
  const terrainProgress = Math.max(0, (progress - 0.2) / 0.8);
  const treeProgress = Math.max(0, (progress - 0.35) / 0.65);

  const heroTrees = [
    { pos: [0, 0.4, -1], scale: 1.1, delay: 0 },
    { pos: [-2.8, 0.1, -2], scale: 0.8, delay: 0.1 },
    { pos: [2.8, 0.2, -1.2], scale: 0.85, delay: 0.15 },
    { pos: [-1.4, -0.1, 1], scale: 0.6, delay: 0.2 },
    { pos: [3.8, -0.2, 0.5], scale: 0.7, delay: 0.25 },
    { pos: [-4.2, -0.4, -1], scale: 0.75, delay: 0.3 },
  ];

  const fogColor = isLight ? '#FBF6EB' : '#0E1712';
  const terrainColor1 = isLight ? '#4ade80' : '#061c10';
  const terrainColor2 = isLight ? '#15803d' : '#123a22';

  return (
    <Canvas
      camera={{ position: [0, 5, 13], fov: isMobile ? 60 : 50 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={isLight ? 0.8 : 0.4} />
        <directionalLight position={[5, 8, 5]} intensity={isLight ? 1.2 : 0.8} color={isLight ? '#22c55e' : '#a7f3d0'} />
        <directionalLight position={[-4, 4, -4]} intensity={0.25} color={isLight ? '#15803d' : '#065f46'} />
        <pointLight position={[0, 4, 0]} intensity={isLight ? 0.8 : 0.5} color="#34d399" distance={12} />
        <fog attach="fog" args={[fogColor, 10, 36]} />

        <ParticleField progress={particleProgress} isMobile={isMobile} isLight={isLight} />
        
        {terrainProgress > 0 && (
          <TerrainMesh progress={terrainProgress} color1={terrainColor1} color2={terrainColor2} />
        )}

        {treeProgress > 0 && heroTrees.map((t, i) => {
          const tp = Math.max(0, Math.min(1, (treeProgress - t.delay) / (1 - t.delay)));
          return (
            <GrowingTree
              key={i}
              progress={tp}
              position={t.pos}
              scale={t.scale}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
}
