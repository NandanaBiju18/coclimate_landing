import { useEffect, useState, useMemo } from 'react';
import './MotionBackground.css';

export default function MotionBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating leaf/spore particles
  const leaves = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + 3) % 95}%`,
      size: `${Math.random() * 8 + 6}px`,
      duration: `${Math.random() * 12 + 14}s`,
      delay: `${Math.random() * -15}s`,
      opacity: Math.random() * 0.3 + 0.15,
    }));
  }, []);

  return (
    <div className="ambient-bg-glow" aria-hidden="true">
      <div className="ambient-grid" />
      
      {/* Floating ambient light orbs */}
      <div 
        className="ambient-orb ambient-orb--1" 
        style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }} 
      />
      <div 
        className="ambient-orb ambient-orb--2" 
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }} 
      />
      <div 
        className="ambient-orb ambient-orb--3" 
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }} 
      />

      {/* Floating Forest Spores / Leaves */}
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

      {/* Forest Canopy Silhouette Backdrop Layer */}
      <div 
        className="bg-tree-silhouettes"
        style={{ transform: `translateX(${mousePos.x * -0.2}px)` }}
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Layer 1: Distant tree peaks */}
          <path 
            d="M0 320 L0 260 L40 220 L70 260 L120 180 L160 250 L220 190 L270 270 L340 160 L390 250 L450 180 L520 270 L580 150 L630 240 L700 170 L760 260 L830 140 L890 250 L950 160 L1020 270 L1090 150 L1150 250 L1220 170 L1290 260 L1360 180 L1440 240 L1440 320 Z" 
            fill="rgba(16, 185, 129, 0.05)" 
          />
          {/* Layer 2: Mid-ground pine tree silhouettes */}
          <path 
            d="M0 320 L0 280 L50 210 L100 280 L150 190 L200 280 L280 170 L350 280 L420 180 L490 290 L560 160 L630 280 L720 190 L790 280 L860 170 L930 290 L1000 180 L1080 280 L1150 190 L1230 290 L1310 200 L1380 280 L1440 210 L1440 320 Z" 
            fill="rgba(5, 150, 105, 0.08)" 
          />
        </svg>
      </div>
    </div>
  );
}
