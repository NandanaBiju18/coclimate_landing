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

    // 1. Telemetry Diamond Nodes
    const numNodes = Math.min(32, Math.floor(width / 40));
    const nodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2.5 + 2,
    }));

    // 2. Realistic Pointed Leaf Particles with Veins
    const leaves = Array.from({ length: 22 }).map(() => ({
      x: Math.random() * width,
      y: height + Math.random() * 200,
      vy: Math.random() * 0.7 + 0.3,
      vx: Math.random() * 0.5 - 0.25,
      length: Math.random() * 6 + 5,
      width: Math.random() * 3.5 + 2.5,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.04,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    // 3. Flowing Atmospheric Wind Streamlines (NO CIRCLE PINGS!)
    const windStreamlines = [
      { yRatio: 0.25, amplitude: 40, frequency: 0.002, speed: 0.015, strokeWidth: 1.5 },
      { yRatio: 0.55, amplitude: 55, frequency: 0.0018, speed: 0.012, strokeWidth: 1.2 },
      { yRatio: 0.82, amplitude: 35, frequency: 0.0025, speed: 0.018, strokeWidth: 1.4 },
    ];

    // 4. Drifting Pollen / Spore Luminescent Particles
    const pollen = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: Math.random() * 0.3 - 0.15,
      size: Math.random() * 1.8 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let step = 0;

    const render = () => {
      step += 0.01;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      ctx.clearRect(0, 0, width, height);

      // ----------------------------------------------------
      // A. Draw Fluid Topographic Contour Sine Waves
      // ----------------------------------------------------
      const waveColors = isLight
        ? ['rgba(21, 128, 61, 0.12)', 'rgba(14, 165, 233, 0.1)', 'rgba(5, 150, 105, 0.11)']
        : ['rgba(34, 197, 94, 0.15)', 'rgba(20, 184, 166, 0.13)', 'rgba(52, 211, 153, 0.13)'];

      waveColors.forEach((color, wIndex) => {
        ctx.beginPath();
        const baseHeight = height * (0.35 + wIndex * 0.22);
        ctx.moveTo(0, baseHeight);

        for (let x = 0; x <= width; x += 18) {
          const y =
            baseHeight +
            Math.sin(x * 0.003 + step + wIndex) * 32 +
            Math.cos(x * 0.008 + step * 0.7) * 18;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5 - wIndex * 0.3;
        ctx.stroke();
      });

      // ----------------------------------------------------
      // B. Draw Flowing Atmospheric Wind Currents & Streamlines
      // ----------------------------------------------------
      windStreamlines.forEach((wind, i) => {
        ctx.beginPath();
        const baseOffsetY = height * wind.yRatio;
        const dashOffset = (step * wind.speed * 1000) % 60;

        ctx.setLineDash([12, 18]);
        ctx.lineDashOffset = -dashOffset;

        ctx.moveTo(0, baseOffsetY);
        for (let x = 0; x <= width; x += 25) {
          const wy = baseOffsetY + Math.sin(x * wind.frequency + step * 1.5 + i) * wind.amplitude;
          ctx.lineTo(x, wy);
        }

        ctx.strokeStyle = isLight
          ? `rgba(21, 128, 61, ${0.15 + i * 0.03})`
          : `rgba(52, 211, 153, ${0.18 + i * 0.04})`;
        ctx.lineWidth = wind.strokeWidth;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ----------------------------------------------------
      // C. Draw REALISTIC PROCEDURAL TREES (Branching Trunk & Multi-lobed Foliage)
      // ----------------------------------------------------
      const foliageFill = isLight ? 'rgba(21, 128, 61, 0.24)' : 'rgba(52, 211, 153, 0.25)';
      const foliageStroke = isLight ? 'rgba(21, 128, 61, 0.35)' : 'rgba(74, 222, 128, 0.38)';
      const trunkStroke = isLight ? 'rgba(30, 66, 44, 0.3)' : 'rgba(34, 197, 94, 0.28)';
      const treePositions = [0.07, 0.22, 0.42, 0.62, 0.8, 0.94];

      treePositions.forEach((posRatio, index) => {
        const treeBaseX = width * posRatio;
        const treeBaseY = height - 5;
        const treeHeight = 100 + (index % 3) * 35;
        const sway = Math.sin(step * 0.7 + index) * 7;

        ctx.save();
        ctx.translate(treeBaseX, treeBaseY);

        // 1. Curved Realistic Trunk with Root Base Flare
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.quadraticCurveTo(-2 + sway * 0.2, -treeHeight * 0.4, sway * 0.4, -treeHeight * 0.75);
        ctx.lineTo(sway * 0.6, -treeHeight * 0.75);
        ctx.quadraticCurveTo(2 + sway * 0.2, -treeHeight * 0.4, 6, 0);
        ctx.closePath();
        ctx.fillStyle = trunkStroke;
        ctx.fill();

        // Primary Left Bough Branch
        ctx.beginPath();
        ctx.moveTo(sway * 0.3, -treeHeight * 0.45);
        ctx.quadraticCurveTo(-25 + sway * 0.5, -treeHeight * 0.6, -45 + sway * 0.6, -treeHeight * 0.68);
        ctx.strokeStyle = trunkStroke;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Primary Right Bough Branch
        ctx.beginPath();
        ctx.moveTo(sway * 0.4, -treeHeight * 0.48);
        ctx.quadraticCurveTo(25 + sway * 0.5, -treeHeight * 0.62, 45 + sway * 0.6, -treeHeight * 0.7);
        ctx.strokeStyle = trunkStroke;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 2. Realistic Organic Multi-Lobed Canopy Outline (Bezier Curves, No Circles!)
        const cx = sway * 0.5;
        const cy = -treeHeight * 0.82;
        const scale = 0.9 + (index % 3) * 0.15;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);

        ctx.beginPath();
        ctx.moveTo(-50, 20);
        ctx.bezierCurveTo(-75, 0, -80, -40, -50, -65);
        ctx.bezierCurveTo(-35, -85, 0, -90, 25, -75);
        ctx.bezierCurveTo(55, -95, 85, -65, 75, -35);
        ctx.bezierCurveTo(90, -5, 75, 30, 45, 25);
        ctx.bezierCurveTo(20, 35, -25, 35, -50, 20);
        ctx.closePath();

        ctx.fillStyle = foliageFill;
        ctx.fill();
        ctx.strokeStyle = foliageStroke;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Internal Canopy Leaf Texture Layers
        ctx.beginPath();
        ctx.moveTo(-35, -15);
        ctx.bezierCurveTo(-50, -35, -30, -60, 0, -50);
        ctx.bezierCurveTo(25, -60, 45, -35, 30, -15);
        ctx.closePath();
        ctx.fillStyle = isLight ? 'rgba(21, 128, 61, 0.12)' : 'rgba(74, 222, 128, 0.15)';
        ctx.fill();

        ctx.restore();
        ctx.restore();
      });

      // ----------------------------------------------------
      // D. Draw Realistic Pointed Leaves with Central Veins
      // ----------------------------------------------------
      leaves.forEach((leaf) => {
        leaf.y -= leaf.vy;
        leaf.x += leaf.vx + Math.sin(step + leaf.length) * 0.5;
        leaf.angle += leaf.vAngle;

        if (leaf.y < -20) {
          leaf.y = height + Math.random() * 50;
          leaf.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);

        // Pointed Organic Leaf Geometry
        ctx.beginPath();
        ctx.moveTo(0, -leaf.length);
        ctx.quadraticCurveTo(leaf.width, -leaf.length * 0.2, 0, leaf.length);
        ctx.quadraticCurveTo(-leaf.width, -leaf.length * 0.2, 0, -leaf.length);
        ctx.closePath();
        ctx.fillStyle = isLight
          ? `rgba(21, 128, 61, ${leaf.opacity})`
          : `rgba(74, 222, 128, ${leaf.opacity})`;
        ctx.fill();

        // Leaf Central Vein Line
        ctx.beginPath();
        ctx.moveTo(0, -leaf.length * 0.85);
        ctx.lineTo(0, leaf.length * 0.85);
        ctx.strokeStyle = isLight
          ? `rgba(15, 80, 38, ${leaf.opacity * 0.8})`
          : `rgba(187, 247, 208, ${leaf.opacity * 0.8})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      // ----------------------------------------------------
      // E. Draw Drifting Luminescent Pollen / Spore Particles
      // ----------------------------------------------------
      pollen.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.cos(step + p.y * 0.01) * 0.3;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = isLight
          ? `rgba(34, 197, 94, ${p.alpha * 0.7})`
          : `rgba(167, 243, 208, ${p.alpha})`;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      // ----------------------------------------------------
      // F. Draw Telemetry Micro-Diamond Nodes & Vector Lines
      // ----------------------------------------------------
      const nodeColor = isLight ? 'rgba(21, 128, 61, 0.45)' : 'rgba(74, 222, 128, 0.55)';
      const lineColor = isLight ? 'rgba(21, 128, 61, 0.11)' : 'rgba(34, 197, 94, 0.15)';

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        const dxMouse = mouseX - n1.x;
        const dyMouse = mouseY - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 140) {
          n1.x -= (dxMouse / distMouse) * 0.8;
          n1.y -= (dyMouse / distMouse) * 0.8;
        }

        // Draw 4-Pointed Micro-Diamond
        const sz = n1.size;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y - sz);
        ctx.lineTo(n1.x + sz, n1.y);
        ctx.lineTo(n1.x, n1.y + sz);
        ctx.lineTo(n1.x - sz, n1.y);
        ctx.closePath();
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
