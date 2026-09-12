import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { simplex } from '../utils/noise';
import { PARTICLES } from '../utils/constants';

/**
 * Organic particle field that starts as scattered particles
 * and morphs to follow terrain shape as progress increases.
 */
export default function ParticleField({ progress = 0, isMobile = false, isLight = false }) {
  const pointsRef = useRef();
  const count = isMobile ? PARTICLES.COUNT_MOBILE : PARTICLES.COUNT;

  const { randomPositions, terrainPositions, sizes } = useMemo(() => {
    const spread = PARTICLES.SPREAD;
    const randomPos = new Float32Array(count * 3);
    const terrainPos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      randomPos[i * 3] = (Math.random() - 0.5) * spread * 2;
      randomPos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      randomPos[i * 3 + 2] = (Math.random() - 0.5) * spread * 2;

      const x = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      const h = simplex.fbm(x * 0.08, z * 0.08, 4, 2.0, 0.5) * 3.5;
      terrainPos[i * 3] = x;
      terrainPos[i * 3 + 1] = h + Math.random() * 0.5;
      terrainPos[i * 3 + 2] = z;

      sizes[i] = Math.random() * PARTICLES.SIZE + 0.01;
    }

    return { randomPositions: randomPos, terrainPositions: terrainPos, sizes };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = Math.min(1, Math.max(0, progress));

      arr[i3] = THREE.MathUtils.lerp(randomPositions[i3], terrainPositions[i3], t);
      arr[i3 + 1] = THREE.MathUtils.lerp(randomPositions[i3 + 1], terrainPositions[i3 + 1], t);
      arr[i3 + 2] = THREE.MathUtils.lerp(randomPositions[i3 + 2], terrainPositions[i3 + 2], t);

      const floatAmount = (1 - t) * 0.3;
      arr[i3 + 1] += Math.sin(time * 0.5 + i * 0.1) * floatAmount;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02 * (1 - progress * 0.8);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[randomPositions.slice(), 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isLight ? '#15803d' : '#7af0a0'}
        transparent
        opacity={isLight ? 0.5 : 0.6}
        sizeAttenuation
        depthWrite={false}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}
