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

    // Sensor nodes
    const numNodes = Math.min(35, Math.floor(width / 35));
    const nodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.2,
    }));

    // Organic floating leaves
    const leaves = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: height + Math.random() * 300,
      vy: Math.random() * 0.7 + 0.3,
      vx: Math.random() * 0.4 - 0.2,
      rx: Math.random() * 5 + 4,
      ry: Math.random() * 3 + 2,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.35 + 0.15,
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
      step += 0.012;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Fluid Topographic Sine Waves
      const waveColors = isLight
        ? ['rgba(35, 122, 85, 0.12)', 'rgba(14, 165, 233, 0.1)', 'rgba(5, 150, 105, 0.12)']
        : ['rgba(34, 197, 94, 0.16)', 'rgba(20, 184, 166, 0.14)', 'rgba(52, 211, 153, 0.14)'];

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

      // 2. Draw Swaying Organic Broadleaf / Deciduous Trees (Nature Canopy)
      const foliageColor = isLight ? 'rgba(21, 128, 61, 0.25)' : 'rgba(52, 211, 153, 0.28)';
      const trunkColor = isLight ? 'rgba(44, 77, 55, 0.25)' : 'rgba(34, 197, 94, 0.2)';
      const treePositions = [0.06, 0.2, 0.38, 0.58, 0.76, 0.92];

      treePositions.forEach((posRatio, index) => {
        const treeBaseX = width * posRatio;
        const treeBaseY = height - 5;
        const treeHeight = 85 + (index % 3) * 30;
        const sway = Math.sin(step * 0.8 + index) * 8;

        ctx.save();
        ctx.translate(treeBaseX, treeBaseY);

        // Curved Natural Trunk
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(sway * 0.3, -treeHeight * 0.5, sway * 0.5, -treeHeight * 0.7);
        ctx.strokeStyle = trunkColor;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Round Organic Foliage Canopy Blobs (Broadleaf Oak/Banyan style)
        const canopyCenterX = sway * 0.5;
        const canopyCenterY = -treeHeight * 0.75;

        // Main Canopy Cluster
        const blobs = [
          { dx: 0, dy: 0, r: 38 },
          { dx: -22, dy: 10, r: 28 },
          { dx: 22, dy: 12, r: 28 },
          { dx: -14, dy: -18, r: 26 },
          { dx: 14, dy: -16, r: 26 },
        ];

        blobs.forEach((blob) => {
          ctx.beginPath();
          ctx.arc(
            canopyCenterX + blob.dx + Math.sin(step + index) * 2,
            canopyCenterY + blob.dy + Math.cos(step + index) * 2,
            blob.r,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = foliageColor;
          ctx.fill();
        });

        ctx.restore();
      });

      // 3. Floating Organic Leaves (Natural Leaf Shapes)
      leaves.forEach((leaf) => {
        leaf.y -= leaf.vy;
        leaf.x += leaf.vx + Math.sin(step + leaf.rx) * 0.6;
        leaf.angle += leaf.vAngle;

        if (leaf.y < -20) {
          leaf.y = height + Math.random() * 50;
          leaf.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);

        // Natural leaf ellipse shape
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.rx, leaf.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(21, 128, 61, ${leaf.opacity})`
          : `rgba(74, 222, 128, ${leaf.opacity})`;
        ctx.fill();

        ctx.restore();
      });

      // 4. Draw Radar Pulse Pings
      radarPings.forEach((ping) => {
        ping.radius += ping.speed;
        if (ping.radius > ping.maxRadius) ping.radius = 0;

        const pingOpacity = (1 - ping.radius / ping.maxRadius) * (isLight ? 0.22 : 0.3);
        ctx.beginPath();
        ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(21, 128, 61, ${pingOpacity})`
          : `rgba(52, 211, 153, ${pingOpacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // 5. Draw Sensor Nodes and Connections
      const nodeColor = isLight ? 'rgba(21, 128, 61, 0.4)' : 'rgba(74, 222, 128, 0.5)';
      const lineColor = isLight ? 'rgba(21, 128, 61, 0.1)' : 'rgba(34, 197, 94, 0.14)';

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

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 * (1 - dist / 130);
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
      {/* Dynamic Climate Canvas — Organic broadleaf trees, natural leaves, waves & nodes */}
      <DynamicClimateCanvas />

      {/* Rotating Atmospheric Gradient Aura */}
      <div className="climate-bg__aura climate-bg__aura--primary" />
      <div className="climate-bg__aura climate-bg__aura--secondary" />

      {/* GIS Coordinate Map Grid */}
      <div className="climate-bg__gis-grid" />
    </div>
  );
}
