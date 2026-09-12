import { useState } from 'react';
import './TreeAuditDiagram.css';

const DIAGRAM_MODES = [
  { id: 'multispectral', label: 'Multispectral Canopy', icon: '🛰️' },
  { id: 'biomass', label: 'Carbon & Biomass', icon: '🌱' },
  { id: 'ledger', label: 'Audit & Hash Ledger', icon: '🔐' },
];

const INSPECTION_POINTS = [
  {
    id: 'canopy',
    name: 'Photosynthetic Canopy (NDVI)',
    x: 50,
    y: 22,
    metric: 'NDVI 0.84',
    status: 'Optimal Health',
    detail: 'Satellite 10cm multispectral resolution measures chlorophyll density and foliage expansion every 14 days.',
    specs: [
      { label: 'Canopy Cover', val: '94.2%' },
      { label: 'Spectral Band', val: 'Near-Infrared (NIR)' },
      { label: 'Growth Delta', val: '+14.6% YoY' },
    ],
  },
  {
    id: 'trunk',
    name: 'On-Ground Trunk Geotag',
    x: 50,
    y: 54,
    metric: 'DBH 18.4 cm',
    status: 'Verified In Field',
    detail: 'Mobile officer photo proof with GPS coordinates, compass orientation, and timestamp cryptographically signed.',
    specs: [
      { label: 'Coordinates', val: '10.7845°N, 76.6521°E' },
      { label: 'Height (Est)', val: '8.6 meters' },
      { label: 'Officer ID', val: 'REV-IN-482' },
    ],
  },
  {
    id: 'roots',
    name: 'Root Biomass & Soil Organic Carbon',
    x: 50,
    y: 84,
    metric: '14.2 kg CO₂/yr',
    status: 'Sequestration Active',
    detail: 'Below-ground carbon stock calculated using validated tropical allometric equations and soil organic carbon probes.',
    specs: [
      { label: 'Root Ratio (R/S)', val: '0.24' },
      { label: 'Soil Organic Carbon', val: '3.8% Density' },
      { label: 'Annual Storage', val: '14.2 kg CO₂e' },
    ],
  },
];

export default function TreeAuditDiagram() {
  const [activeMode, setActiveMode] = useState('multispectral');
  const [selectedPoint, setSelectedPoint] = useState(INSPECTION_POINTS[0]);

  return (
    <section className="tree-diagram-section" id="tree-audit">
      <div className="tree-diagram-container">
        
        {/* Header */}
        <div className="tree-diagram-header">
          <div className="badge-glow">
            <span className="badge-glow__dot" />
            <span>Enterprise Verification Telemetry</span>
          </div>
          <h2 className="t-headline tree-diagram-title">
            Precision Tree System & Audit Architecture
          </h2>
          <p className="t-statement tree-diagram-desc">
            Explore how satellite multispectral sensing, mobile ground proof, and soil carbon analytics combine to verify individual tree health.
          </p>
        </div>

        {/* Main Card */}
        <div className="tree-diagram-card glass">
          
          {/* Mode Switcher */}
          <div className="tree-diagram-modes">
            {DIAGRAM_MODES.map((mode) => (
              <button
                key={mode.id}
                className={`tree-diagram-mode-btn ${activeMode === mode.id ? 'tree-diagram-mode-btn--active' : ''}`}
                onClick={() => setActiveMode(mode.id)}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          <div className="tree-diagram-grid">
            
            {/* Left: Vector Diagram View */}
            <div className="tree-diagram-graphic-col">
              <div className="tree-svg-wrapper">
                
                {/* SVG Technical Tree Diagram — Realistic Organic Tree Architecture */}
                <svg className="tree-svg" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="canopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="var(--accent-hover)" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent-hover)" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="var(--accent-hover)" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>

                  {/* Sky / Satellite Scan Ray Beam */}
                  <line x1="200" y1="5" x2="200" y2="95" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" className="sat-ray" />
                  <polygon points="200,5 194,18 206,18" fill="var(--accent)" />
                  <polygon points="200,95 194,82 206,82" fill="var(--accent)" opacity="0.6" />
                  <text x="200" y="30" fill="var(--accent)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">SATELLITE SPECTRAL SCAN (NIR)</text>

                  {/* Ground Horizon Level */}
                  <line x1="20" y1="320" x2="380" y2="320" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="25" y="312" fill="var(--text-muted)" fontSize="8.5" fontFamily="monospace">GROUND HORIZON (SOIL ELEV 42m)</text>

                  {/* Underground Soil Stratum Marker */}
                  <rect x="20" y="321" width="360" height="150" fill="var(--accent)" opacity="0.03" />

                  {/* REALISTIC ROOT SYSTEM (Deep Taproot & Spreading Lateral Fibers) */}
                  <path d="M200 320 Q197 360 201 410 Q198 440 200 470" stroke="var(--accent)" strokeWidth="3" fill="none" opacity="0.8" />
                  <path d="M194 324 Q160 355 120 380 Q85 395 40 410" stroke="var(--accent)" strokeWidth="2.5" fill="none" opacity="0.7" />
                  <path d="M206 324 Q240 355 280 380 Q315 395 360 410" stroke="var(--accent)" strokeWidth="2.5" fill="none" opacity="0.7" />
                  <path d="M185 340 Q150 375 110 415 Q80 440 50 460" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.55" />
                  <path d="M215 340 Q250 375 290 415 Q320 440 350 460" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.55" />
                  <path d="M198 380 Q175 410 150 445" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeDasharray="2 2" opacity="0.45" />
                  <path d="M202 380 Q225 410 250 445" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeDasharray="2 2" opacity="0.45" />

                  {/* REALISTIC TRUNK & FLARED ROOT BASE */}
                  <path
                    d="M180 320 C186 280 190 220 192 145 L208 145 C210 220 214 280 220 320 C234 324 255 328 270 330 C240 323 218 320 200 320 C182 320 160 323 130 330 C145 328 166 324 180 320 Z"
                    fill="url(#trunkGrad)"
                  />
                  {/* Trunk Bark Texture Contours */}
                  <path d="M194 315 Q196 230 198 150" stroke="var(--accent-hover)" strokeWidth="1" opacity="0.4" fill="none" />
                  <path d="M206 315 Q204 230 202 150" stroke="var(--accent-hover)" strokeWidth="1" opacity="0.4" fill="none" />

                  {/* REALISTIC PRIMARY BOUGHS & BRANCHING STRUCTURE */}
                  {/* Left Main Limb */}
                  <path d="M193 215 Q155 180 110 175 Q95 173 80 178 Q100 165 125 168 Q168 174 196 200 Z" fill="url(#trunkGrad)" opacity="0.85" />
                  <path d="M135 170 Q110 145 90 130" stroke="var(--accent-hover)" strokeWidth="2.5" fill="none" opacity="0.75" />
                  <path d="M115 173 Q98 185 82 195" stroke="var(--accent-hover)" strokeWidth="1.8" fill="none" opacity="0.65" />

                  {/* Right Main Limb */}
                  <path d="M207 195 Q245 165 290 160 Q305 158 320 163 Q300 150 275 153 Q232 159 204 180 Z" fill="url(#trunkGrad)" opacity="0.85" />
                  <path d="M265 158 Q290 135 310 120" stroke="var(--accent-hover)" strokeWidth="2.5" fill="none" opacity="0.75" />
                  <path d="M285 161 Q302 173 318 183" stroke="var(--accent-hover)" strokeWidth="1.8" fill="none" opacity="0.65" />

                  {/* Upper Central Twigs */}
                  <path d="M196 150 Q175 110 150 90" stroke="var(--accent-hover)" strokeWidth="2.2" fill="none" opacity="0.8" />
                  <path d="M204 150 Q225 110 250 90" stroke="var(--accent-hover)" strokeWidth="2.2" fill="none" opacity="0.8" />

                  {/* REALISTIC ORGANIC BROADLEAF FOLIAGE SILHOUETTE (No circles!) */}
                  {/* Outer Canopy Envelope */}
                  <path
                    d="M125 140 C95 120 90 80 120 55 C145 35 185 30 215 42 C240 28 285 38 300 70 C320 85 325 125 300 150 C285 165 255 172 230 165 C205 178 165 175 145 160 C125 168 105 158 125 140 Z"
                    fill="url(#canopyGrad)"
                    stroke="var(--accent)"
                    strokeWidth="1.8"
                    opacity="0.92"
                  />

                  {/* Layered Organic Leaf Canopy Clusters */}
                  <path
                    d="M135 95 C145 75 175 68 195 82 C215 68 245 72 258 92 C275 110 262 135 242 142 C220 148 185 142 170 148 C150 142 128 122 135 95 Z"
                    fill="var(--accent)"
                    opacity="0.16"
                  />
                  <path
                    d="M155 62 C170 48 200 45 220 60 C232 75 222 98 205 102 C185 102 170 95 158 82 C150 72 152 65 155 62 Z"
                    fill="var(--accent)"
                    opacity="0.22"
                    stroke="var(--accent-hover)"
                    strokeWidth="1"
                  />
                  {/* Detailed Leaf Contour Veins */}
                  <path d="M140 110 Q170 90 200 100 Q230 90 260 110" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.6" />
                  <path d="M150 80 Q200 65 250 80" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.6" />

                  {/* TACTICAL DIAMOND RETICLE TARGETS (Replacing Circle Hotspots) */}
                  {INSPECTION_POINTS.map((pt) => {
                    const isSelected = selectedPoint.id === pt.id;
                    const cx = (pt.x / 100) * 400;
                    const cy = (pt.y / 100) * 480;
                    const size = isSelected ? 10 : 7;

                    return (
                      <g key={pt.id} onClick={() => setSelectedPoint(pt)} style={{ cursor: 'pointer' }}>
                        {/* Outer Diamond */}
                        <polygon
                          points={`${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`}
                          fill="var(--surface-raised)"
                          stroke="var(--accent)"
                          strokeWidth={isSelected ? 2.5 : 1.5}
                        />
                        {/* Inner Diamond Core */}
                        <polygon
                          points={`${cx},${cy - 3} ${cx + 3},${cy} ${cx},${cy + 3} ${cx - 3},${cy}`}
                          fill="var(--accent)"
                        />
                        {/* Selected Tactical Reticle Corners & Diamond Pulse */}
                        {isSelected && (
                          <g>
                            <path d={`M${cx - 15} ${cy - 8} L${cx - 15} ${cy - 15} L${cx - 8} ${cy - 15}`} stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                            <path d={`M${cx + 8} ${cy - 15} L${cx + 15} ${cy - 15} L${cx + 15} ${cy - 8}`} stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                            <path d={`M${cx + 15} ${cy + 8} L${cx + 15} ${cy + 15} L${cx + 8} ${cy + 15}`} stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                            <path d={`M${cx - 8} ${cy + 15} L${cx - 15} ${cy + 15} L${cx - 15} ${cy + 8}`} stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                            <polygon
                              points={`${cx},${cy - 22} ${cx + 22},${cy} ${cx},${cy + 22} ${cx - 22},${cy}`}
                              stroke="var(--accent)"
                              strokeWidth="1.2"
                              fill="none"
                              className="hotspot-diamond-pulse"
                            />
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Right: Technical Inspector Panel */}
            <div className="tree-diagram-panel">
              <div className="tree-panel-header">
                <span className="t-mono tree-panel-id">POINT #{selectedPoint.id.toUpperCase()}</span>
                <span className="tree-panel-status">{selectedPoint.status}</span>
              </div>

              <h3 className="tree-panel-name">{selectedPoint.name}</h3>
              <div className="tree-panel-metric t-display">{selectedPoint.metric}</div>

              <p className="tree-panel-desc t-statement">{selectedPoint.detail}</p>

              <div className="tree-panel-specs">
                {selectedPoint.specs.map((spec, i) => (
                  <div key={i} className="tree-spec-row">
                    <span className="t-label tree-spec-lbl">{spec.label}</span>
                    <span className="t-mono tree-spec-val">{spec.val}</span>
                  </div>
                ))}
              </div>

              <div className="tree-panel-footer">
                <div className="tree-audit-stamp">
                  <span className="stamp-icon">✓</span>
                  <span>Cryptographically Signed Hash: 0x8f4b...39a2</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
