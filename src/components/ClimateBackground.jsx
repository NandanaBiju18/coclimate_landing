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

    // 2. Realistic 3D Fluttering Organic Leaf Particles with Veins
    const leaves = Array.from({ length: 28 }).map(() => ({
      x: Math.random() * width,
      y: height + Math.random() * 300,
      vy: Math.random() * 0.6 + 0.35,
      vx: Math.random() * 0.4 - 0.2,
      length: Math.random() * 7 + 6,
      width: Math.random() * 4 + 3,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI * 2,
      vFlip: Math.random() * 0.04 + 0.02,
      seed: Math.random() * 10,
      opacity: Math.random() * 0.45 + 0.25,
    }));

    // 3. Flowing Atmospheric Wind Streamlines
    const windStreamlines = [
      { yRatio: 0.2, amplitude: 45, frequency: 0.002, speed: 0.015, strokeWidth: 1.6 },
      { yRatio: 0.48, amplitude: 60, frequency: 0.0018, speed: 0.012, strokeWidth: 1.3 },
      { yRatio: 0.78, amplitude: 40, frequency: 0.0025, speed: 0.018, strokeWidth: 1.5 },
    ];

    // 4. Drifting Pollen / Spore Luminescent Particles
    const pollen = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.45 + 0.15),
      vx: Math.random() * 0.35 - 0.17,
      size: Math.random() * 2.2 + 1.2,
      alpha: Math.random() * 0.55 + 0.25,
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
      // A. ATMOSPHERIC SUNBEAMS & GOD RAYS (Ultra High-End Light Mode Feature)
      // ----------------------------------------------------
      if (isLight) {
        const rays = [
          { x1: width * 0.65, x2: width * 0.25, w: 160, opacity: 0.12 },
          { x1: width * 0.82, x2: width * 0.42, w: 200, opacity: 0.09 },
          { x1: width * 0.48, x2: width * 0.1, w: 130, opacity: 0.1 },
        ];

        rays.forEach((ray, rIdx) => {
          const sway = Math.sin(step * 0.4 + rIdx) * 18;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(ray.x1 + sway, 0);
          ctx.lineTo(ray.x1 + ray.w + sway, 0);
          ctx.lineTo(ray.x2 + ray.w * 1.4 + sway, height);
          ctx.lineTo(ray.x2 + sway, height);
          ctx.closePath();

          const rayGrad = ctx.createLinearGradient(ray.x1, 0, ray.x2, height);
          rayGrad.addColorStop(0, `rgba(234, 179, 8, ${ray.opacity * 1.6})`); // Golden sunlight
          rayGrad.addColorStop(0.4, `rgba(34, 197, 94, ${ray.opacity * 1.1})`); // Sage green light beam
          rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = rayGrad;
          ctx.fill();
          ctx.restore();
        });
      }

      // ----------------------------------------------------
      // B. AMBIENT TOP CANOPY ARCHITECTURAL SILHOUETTES
      // ----------------------------------------------------
      const canopies = [
        { x: 0, scale: 1.1, isLeft: true },
        { x: width, scale: 1.25, isLeft: false },
      ];

      const topStroke = isLight ? 'rgba(21, 128, 61, 0.22)' : 'rgba(52, 211, 153, 0.25)';
      const topFill = isLight ? 'rgba(21, 128, 61, 0.05)' : 'rgba(52, 211, 153, 0.07)';

      canopies.forEach((c, cIdx) => {
        ctx.save();
        ctx.translate(c.x, 0);
        if (!c.isLeft) ctx.scale(-1, 1);
        ctx.scale(c.scale, c.scale);

        const sway = Math.sin(step * 0.4 + cIdx) * 5;

        ctx.beginPath();
        ctx.moveTo(-30, -30);
        ctx.bezierCurveTo(45, 12, 110, 30, 170 + sway, 16);
        ctx.bezierCurveTo(230 + sway, 6, 270, -28, 310, -70);
        ctx.lineTo(-30, -70);
        ctx.closePath();

        ctx.fillStyle = topFill;
        ctx.fill();
        ctx.strokeStyle = topStroke;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      });

      // ----------------------------------------------------
      // B2. ARCHITECTURAL MINIMAL TREE VECTOR ANIMATION (Small & Subtle)
      // ----------------------------------------------------
      const treeLine = isLight ? 'rgba(21, 128, 61, 0.28)' : 'rgba(34, 197, 94, 0.32)';
      const treeFill = isLight ? 'rgba(21, 128, 61, 0.06)' : 'rgba(52, 211, 153, 0.07)';
      const treePositions = [0.05, 0.22, 0.44, 0.65, 0.82, 0.94];

      treePositions.forEach((posRatio, tIdx) => {
        const treeX = width * posRatio;
        const treeY = height;
        const treeH = 42 + (tIdx % 3) * 12; // Small & subtle (42px to 66px)
        const treeSway = Math.sin(step * 0.4 + tIdx) * 3;

        ctx.save();
        ctx.translate(treeX, treeY);

        // 1. Sleek Tapered Vector Trunk
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(treeSway * 0.25, -treeH * 0.45, treeSway * 0.45, -treeH * 0.8);
        ctx.strokeStyle = treeLine;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Minimal Branch Splits
        ctx.beginPath();
        ctx.moveTo(treeSway * 0.25, -treeH * 0.45);
        ctx.quadraticCurveTo(-12 + treeSway * 0.4, -treeH * 0.6, -22 + treeSway * 0.55, -treeH * 0.7);
        ctx.strokeStyle = treeLine;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(treeSway * 0.3, -treeH * 0.5);
        ctx.quadraticCurveTo(12 + treeSway * 0.4, -treeH * 0.62, 22 + treeSway * 0.55, -treeH * 0.72);
        ctx.strokeStyle = treeLine;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // 2. Small Minimal Canopy Envelope
        const cx = treeSway * 0.45;
        const cy = -treeH * 0.82;
        const scale = 0.45 + (tIdx % 3) * 0.08; // Small delicate scale

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);

        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.bezierCurveTo(35, -45, 45, -20, 35, 10);
        ctx.bezierCurveTo(25, 25, -25, 25, -35, 10);
        ctx.bezierCurveTo(-45, -20, -35, -45, 0, -50);
        ctx.closePath();

        ctx.fillStyle = treeFill;
        ctx.fill();
        ctx.strokeStyle = treeLine;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Minimal Blueprint Dash Line
        ctx.beginPath();
        ctx.moveTo(0, -35);
        ctx.lineTo(0, 10);
        ctx.strokeStyle = treeLine;
        ctx.lineWidth = 0.7;
        ctx.setLineDash([2, 2]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
        ctx.restore();
      });

      // ----------------------------------------------------
      // C. Draw Fluid Topographic Contour Sine Waves
      // ----------------------------------------------------
      const waveColors = isLight
        ? ['rgba(21, 128, 61, 0.15)', 'rgba(14, 165, 233, 0.12)', 'rgba(5, 150, 105, 0.13)']
        : ['rgba(34, 197, 94, 0.16)', 'rgba(20, 184, 166, 0.14)', 'rgba(52, 211, 153, 0.14)'];

      waveColors.forEach((color, wIndex) => {
        ctx.beginPath();
        const baseHeight = height * (0.32 + wIndex * 0.24);
        ctx.moveTo(0, baseHeight);

        for (let x = 0; x <= width; x += 18) {
          const y =
            baseHeight +
            Math.sin(x * 0.003 + step + wIndex) * 35 +
            Math.cos(x * 0.008 + step * 0.7) * 20;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.6 - wIndex * 0.3;
        ctx.stroke();
      });

      // ----------------------------------------------------
      // D. Draw Flowing Atmospheric Wind Currents & Streamlines
      // ----------------------------------------------------
      windStreamlines.forEach((wind, i) => {
        ctx.beginPath();
        const baseOffsetY = height * wind.yRatio;
        const dashOffset = (step * wind.speed * 1000) % 60;

        ctx.setLineDash([14, 20]);
        ctx.lineDashOffset = -dashOffset;

        ctx.moveTo(0, baseOffsetY);
        for (let x = 0; x <= width; x += 25) {
          const wy = baseOffsetY + Math.sin(x * wind.frequency + step * 1.5 + i) * wind.amplitude;
          ctx.lineTo(x, wy);
        }

        ctx.strokeStyle = isLight
          ? `rgba(21, 128, 61, ${0.18 + i * 0.03})`
          : `rgba(52, 211, 153, ${0.2 + i * 0.04})`;
        ctx.lineWidth = wind.strokeWidth;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ----------------------------------------------------
      // E. REALISTIC 3D FLUTTERING ORGANIC LEAF PARTICLES
      // ----------------------------------------------------
      leaves.forEach((leaf) => {
        leaf.y -= leaf.vy;
        leaf.x += leaf.vx + Math.sin(step * 1.2 + leaf.seed) * 0.8;
        leaf.angle += leaf.vAngle;
        leaf.flip += leaf.vFlip;

        if (leaf.y < -30) {
          leaf.y = height + Math.random() * 60;
          leaf.x = Math.random() * width;
        }

        // Interactive mouse wind push
        const dxM = mouseX - leaf.x;
        const dyM = mouseY - leaf.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 160) {
          leaf.x -= (dxM / distM) * 1.4;
          leaf.y -= (dyM / distM) * 1.4;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        ctx.scale(Math.cos(leaf.flip), 1); // 3D leaf fluttering flip

        // Pointed Organic Leaf Shape
        ctx.beginPath();
        ctx.moveTo(0, -leaf.length);
        ctx.quadraticCurveTo(leaf.width, -leaf.length * 0.2, 0, leaf.length);
        ctx.quadraticCurveTo(-leaf.width, -leaf.length * 0.2, 0, -leaf.length);
        ctx.closePath();

        const leafGrad = ctx.createLinearGradient(0, -leaf.length, 0, leaf.length);
        if (isLight) {
          leafGrad.addColorStop(0, `rgba(22, 101, 52, ${leaf.opacity * 1.15})`);
          leafGrad.addColorStop(1, `rgba(34, 197, 94, ${leaf.opacity * 0.85})`);
        } else {
          leafGrad.addColorStop(0, `rgba(74, 222, 128, ${leaf.opacity * 1.2})`);
          leafGrad.addColorStop(1, `rgba(16, 185, 129, ${leaf.opacity * 0.85})`);
        }
        ctx.fillStyle = leafGrad;
        ctx.fill();

        // Central Vein Line
        ctx.beginPath();
        ctx.moveTo(0, -leaf.length * 0.8);
        ctx.lineTo(0, leaf.length * 0.8);
        ctx.strokeStyle = isLight
          ? `rgba(253, 230, 138, ${leaf.opacity * 0.95})`
          : `rgba(236, 253, 245, ${leaf.opacity * 0.95})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        ctx.restore();
      });

      // ----------------------------------------------------
      // F. Drifting Luminescent Pollen / Spore Particles
      // ----------------------------------------------------
      pollen.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.cos(step + p.y * 0.01) * 0.35;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = isLight
          ? `rgba(34, 197, 94, ${p.alpha * 0.85})`
          : `rgba(167, 243, 208, ${p.alpha})`;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      // ----------------------------------------------------
      // G. Telemetry Micro-Diamond Nodes & Vector Mesh
      // ----------------------------------------------------
      const nodeColor = isLight ? 'rgba(21, 128, 61, 0.5)' : 'rgba(74, 222, 128, 0.6)';
      const lineColor = isLight ? 'rgba(21, 128, 61, 0.13)' : 'rgba(34, 197, 94, 0.16)';

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
