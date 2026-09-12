import { useEffect, useState } from 'react';
import './ClimateBackground.css';

export default function ClimateBackground() {
  const [activeSection, setActiveSection] = useState('discover');

  useEffect(() => {
    const sections = [
      'discover',
      'observe',
      'calculator',
      'platform',
      'how-it-works',
      'services',
      'contact',
      'coda',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`climate-bg-system climate-bg--${activeSection}`} aria-hidden="true">
      {/* 1. Atmospheric Gradient Aura (Soft Green & Sky Blue blend) */}
      <div className="climate-bg__aura climate-bg__aura--primary" />
      <div className="climate-bg__aura climate-bg__aura--secondary" />

      {/* 2. GIS Coordinate & Map Grid Overlay */}
      <div className="climate-bg__gis-grid" />

      {/* 3. Topographic Contour Line Paths */}
      <svg className="climate-bg__contours" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Outer Contour Ring 1 */}
        <path
          d="M-100,250 C250,120 600,380 950,220 C1250,80 1500,320 1600,280"
          stroke="currentColor"
          strokeWidth="1.2"
          className="contour-line contour-line--1"
        />
        {/* Contour Ring 2 */}
        <path
          d="M-80,380 C280,240 620,480 980,310 C1280,180 1480,420 1620,360"
          stroke="currentColor"
          strokeWidth="1"
          className="contour-line contour-line--2"
        />
        {/* Contour Ring 3 */}
        <path
          d="M-50,520 C320,380 660,600 1020,420 C1320,290 1520,530 1650,470"
          stroke="currentColor"
          strokeWidth="1"
          className="contour-line contour-line--3"
        />
        {/* Organic Terrain Elevation Ridge */}
        <path
          d="M-120,680 C200,580 500,750 850,620 C1200,480 1420,700 1680,630"
          stroke="currentColor"
          strokeWidth="0.8"
          className="contour-line contour-line--4"
        />
      </svg>

      {/* 4. Flowing Climate / Wind Stream Vector Lines */}
      <svg className="climate-bg__wind-streams" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
        <path
          d="M-100,150 Q400,80 900,180 T1600,120"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="12 16"
          className="wind-stream wind-stream--1"
        />
        <path
          d="M-100,320 Q500,240 1000,360 T1600,280"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="8 14"
          className="wind-stream wind-stream--2"
        />
        <path
          d="M-100,480 Q450,420 950,520 T1600,440"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeDasharray="10 18"
          className="wind-stream wind-stream--3"
        />
      </svg>
    </div>
  );
}
