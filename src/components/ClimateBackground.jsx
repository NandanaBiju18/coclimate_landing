import { useEffect, useState, useRef } from 'react';
import './ClimateBackground.css';

function DynamicClimateCanvas() {
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

    // Interactive sensor nodes
    const numNodes = Math.min(40, Math.floor(width / 32));
    const nodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1.2,
    }));

    // Floating leaves
    const leaves = Array.from({ length: 16 }).map(() => ({
      x: Math.random() * width,
      y: height + Math.random() * 200,
      vy: Math.random() * 0.8 + 0.4,
      vx: Math.random() * 0.5 - 0.25,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    // Radar pings
    const radarPings = [
      { x: width * 0.18, y: height * 0.35, radius: 0, maxRadius: 150, speed: 0.8 },
      { x: width * 0.78, y: height * 0.45, radius: 40, maxRadius: 170, speed: 0.7 },
      { x: width * 0.48, y: height * 0.75, radius: 80, maxRadius: 190, speed: 0.9 },
    ];

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let step = 0;

    const render = () => {
      step += 0.015;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Fluid Topographic Sine Waves
      const waveColors = isLight
        ? ['rgba(35, 122, 85, 0.14)', 'rgba(14, 165, 233, 0.12)', 'rgba(5, 150, 105, 0.14)']
        : ['rgba(34, 197, 94, 0.18)', 'rgba(20, 184, 166, 0.16)', 'rgba(52, 211, 153, 0.15)'];

      waveColors.forEach((color, wIndex) => {
        ctx.beginPath();
        const baseHeight = height * (0.35 + wIndex * 0.22);
        ctx.moveTo(0, baseHeight);

        for (let x = 0; x <= width; x += 15) {
          const y =
            baseHeight +
            Math.sin(x * 0.003 + step + wIndex) * 32 +
            Math.cos(x * 0.008 + step * 0.7) * 18;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.6 - wIndex * 0.3;
        ctx.stroke();
      });

      // 2. Draw Swaying Procedural Trees along Horizon
      const treeColor = isLight ? 'rgba(21, 128, 61, 0.22)' : 'rgba(52, 211, 153, 0.25)';
      const treePositions = [0.08, 0.22, 0.42, 0.62, 0.78, 0.92];

      treePositions.forEach((posRatio, index) => {
        const treeBaseX = width * posRatio;
        const treeBaseY = height - 10;
        const treeHeight = 70 + (index % 3) * 25;
        const sway = Math.sin(step * 1.2 + index) * 6;

        ctx.save();
        ctx.translate(treeBaseX, treeBaseY);

        // Trunk
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(sway * 0.3, -treeHeight * 0.4);
        ctx.strokeStyle = treeColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Layered Pine Canopy Triangles
        for (let layer = 0; layer < 3; layer++) {
          const layerY = -treeHeight * (0.35 + layer * 0.25);
          const layerWidth = (40 - layer * 9) * 0.85;
          const layerHeight = 35 - layer * 5;
          const layerSway = sway * (0.4 + layer * 0.3);

          ctx.beginPath();
          ctx.moveTo(layerSway, layerY - layerHeight);
          ctx.lineTo(layerSway - layerWidth / 2, layerY);
          ctx.lineTo(layerSway + layerWidth / 2, layerY);
          ctx.closePath();
          ctx.fillStyle = treeColor;
          ctx.fill();
        }

        ctx.restore();
      });

      // 3. Floating Leaves / Spores
      leaves.forEach((leaf) => {
        leaf.y -= leaf.vy;
        leaf.x += leaf.vx + Math.sin(step + leaf.size) * 0.5;

        if (leaf.y < -20) {
          leaf.y = height + Math.random() * 50;
          leaf.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(leaf.x, leaf.y, leaf.size, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(21, 128, 61, ${leaf.opacity})`
          : `rgba(74, 222, 128, ${leaf.opacity})`;
        ctx.fill();
      });

      // 4. Draw Radar Pulse Pings
      radarPings.forEach((ping) => {
        ping.radius += ping.speed;
        if (ping.radius > ping.maxRadius) ping.radius = 0;

        const pingOpacity = (1 - ping.radius / ping.maxRadius) * (isLight ? 0.25 : 0.32);
        ctx.beginPath();
        ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(21, 128, 61, ${pingOpacity})`
          : `rgba(52, 211, 153, ${pingOpacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // 5. Draw Sensor Nodes and Connections
      const nodeColor = isLight ? 'rgba(21, 128, 61, 0.45)' : 'rgba(74, 222, 128, 0.55)';
      const lineColor = isLight ? 'rgba(21, 128, 61, 0.12)' : 'rgba(34, 197, 94, 0.16)';

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        const dxMouse = mouseX - n1.x;
        const dyMouse = mouseY - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          n1.x -= (dxMouse / distMouse) * 0.8;
          n1.y -= (dyMouse / distMouse) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 * (1 - dist / 135);
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

  return <canvas ref={canvasRef} className="climate-bg__dynamic-canvas" />;
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
      {/* Dynamic Climate Canvas — Fluid sine waves, swaying trees, floating leaves & node mesh */}
      <DynamicClimateCanvas />

      {/* Rotating Atmospheric Gradient Aura */}
      <div className="climate-bg__aura climate-bg__aura--primary" />
      <div className="climate-bg__aura climate-bg__aura--secondary" />

      {/* GIS Coordinate Map Grid */}
      <div className="climate-bg__gis-grid" />
    </div>
  );
}
