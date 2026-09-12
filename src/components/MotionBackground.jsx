import { useMemo } from 'react';
import './MotionBackground.css';

export default function MotionBackground() {
  // Floating organic leaf/spore dust particles
  const leaves = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7 + 4) % 94}%`,
      size: `${Math.random() * 6 + 4}px`,
      duration: `${Math.random() * 10 + 15}s`,
      delay: `${Math.random() * -12}s`,
      opacity: Math.random() * 0.25 + 0.1,
    }));
  }, []);

  return (
    <div className="ambient-bg-glow" aria-hidden="true">
      {/* Floating Forest Dust / Leaves */}
      <div className="bg-spores-container">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="bg-spore"
            style={{
              left: leaf.left,
              width: leaf.size,
              height: leaf.size,
              animationDuration: leaf.duration,
              animationDelay: leaf.delay,
              opacity: leaf.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
