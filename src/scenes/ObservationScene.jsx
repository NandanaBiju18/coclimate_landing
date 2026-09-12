import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import TerrainMesh from '../three/TerrainMesh';
import GrowingTree from '../three/GrowingTree';

/**
 * Observation Scene: Theme-aware canvas with light/dark adaptive fog & terrain.
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

  const treeProgress = Math.min(1, progress * 1.5);

  const trees = [
    { pos: [0, 0.6, -1], scale: 1.2, delay: 0 },
    { pos: [-3, 0.2, -2], scale: 0.7, delay: 0.15 },
    { pos: [2.5, 0.3, -1.5], scale: 0.8, delay: 0.2 },
    { pos: [-1.5, 0.1, 1], scale: 0.5, delay: 0.3 },
    { pos: [3.5, -0.1, 0.5], scale: 0.6, delay: 0.25 },
  ];

  const fogColor = isLight ? '#FBF6EB' : '#0E1712';
  const terrainColor1 = isLight ? '#4ade80' : '#0a1a12';
  const terrainColor2 = isLight ? '#15803d' : '#1a3a28';

  return (
    <Canvas
      camera={{ position: [0, 4, 10], fov: isMobile ? 55 : 45 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={isLight ? 0.75 : 0.35} />
        <directionalLight position={[4, 8, 3]} intensity={isLight ? 1.1 : 0.7} color={isLight ? '#22c55e' : '#c8e6c0'} />
        <directionalLight position={[-2, 3, -4]} intensity={0.15} color="#245438" />
        <pointLight position={[0, 3, 0]} intensity={0.4} color="#7af0a0" distance={8} />
        <fog attach="fog" args={[fogColor, 12, 35]} />

        <TerrainMesh progress={1} color1={terrainColor1} color2={terrainColor2} />

        {trees.map((tree, i) => {
          const tp = Math.max(0, Math.min(1, (treeProgress - tree.delay) / (1 - tree.delay)));
          return (
            <GrowingTree
              key={i}
              progress={tp}
              position={tree.pos}
              scale={tree.scale}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
}
