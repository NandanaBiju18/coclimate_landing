import { useEffect, useState, useRef } from 'react';
import './ClimateBackground.css';

function NodeMeshCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Node points array
    const numNodes = Math.min(35, Math.floor(width / 35));
    const nodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.2,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const nodeColor = isLight ? 'rgba(35, 122, 85, 0.35)' : 'rgba(62, 179, 128, 0.4)';
      const lineColor = isLight ? 'rgba(35, 122, 85, 0.08)' : 'rgba(45, 138, 98, 0.12)';

      ctx.clearRect(0, 0, width, height);

      // Draw node connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Bounce off walls
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Mouse displacement
        const dxMouse = mouseX - n1.x;
        const dyMouse = mouseY - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120) {
          n1.x -= (dxMouse / distMouse) * 0.5;
          n1.y -= (dyMouse / distMouse) * 0.5;
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.8 * (1 - dist / 130);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="climate-bg__node-canvas" />;
}

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
      {/* 1. Interactive Node & Sensor Data Mesh Canvas */}
      <NodeMeshCanvas />

      {/* 2. Atmospheric Gradient Aura (Soft Green & Sky Blue blend) */}
      <div className="climate-bg__aura climate-bg__aura--primary" />
      <div className="climate-bg__aura climate-bg__aura--secondary" />

      {/* 3. GIS Coordinate & Map Grid Overlay */}
      <div className="climate-bg__gis-grid" />

      {/* 4. Topographic Contour Line Paths */}
      <svg className="climate-bg__contours" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <path
          d="M-100,250 C250,120 600,380 950,220 C1250,80 1500,320 1600,280"
          stroke="currentColor"
          strokeWidth="1.2"
          className="contour-line contour-line--1"
        />
        <path
          d="M-80,380 C280,240 620,480 980,310 C1280,180 1480,420 1620,360"
          stroke="currentColor"
          strokeWidth="1"
          className="contour-line contour-line--2"
        />
        <path
          d="M-50,520 C320,380 660,600 1020,420 C1320,290 1520,530 1650,470"
          stroke="currentColor"
          strokeWidth="1"
          className="contour-line contour-line--3"
        />
        <path
          d="M-120,680 C200,580 500,750 850,620 C1200,480 1420,700 1680,630"
          stroke="currentColor"
          strokeWidth="0.8"
          className="contour-line contour-line--4"
        />
      </svg>

      {/* 5. Flowing Climate / Wind Stream Vector Lines */}
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
