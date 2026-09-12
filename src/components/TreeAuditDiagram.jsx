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
                
                {/* SVG Technical Tree Diagram — Hyper-Realistic Organic Tree Blueprint */}
                <svg className="tree-svg" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="canopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="var(--accent-hover)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent-hover)" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="var(--accent-hover)" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="ndviGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Sky / Satellite Scan Ray Beam */}
                  <line x1="200" y1="5" x2="200" y2="85" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" className="sat-ray" />
                  <polygon points="200,5 194,18 206,18" fill="var(--accent)" />
                  <polygon points="200,85 194,72 206,72" fill="var(--accent)" opacity="0.6" />
                  <text x="200" y="28" fill="var(--accent)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">SATELLITE SPECTRAL SCAN (NIR)</text>

                  {/* Ground Horizon Level */}
                  <line x1="20" y1="315" x2="380" y2="315" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="25" y="307" fill="var(--text-muted)" fontSize="8.5" fontFamily="monospace">GROUND HORIZON (SOIL ELEV 42.8m)</text>

                  {/* Subsurface Soil Layer Accent */}
                  <rect x="20" y="316" width="360" height="155" fill="var(--accent)" opacity="0.03" />

                  {/* REALISTIC SUBSURFACE ROOT SYSTEM (Deep Taproot & Spreading Lateral Fibers) */}
                  <path d="M200 315 C198 350 202 390 199 430 C197 450 201 465 200 475" stroke="var(--accent)" strokeWidth="3" fill="none" opacity="0.85" />
                  <path d="M196 320 C165 350 120 375 60 395 C40 402 25 408 10 412" stroke="var(--accent)" strokeWidth="2.4" fill="none" opacity="0.75" />
                  <path d="M204 320 C235 350 280 375 340 395 C360 402 375 408 390 412" stroke="var(--accent)" strokeWidth="2.4" fill="none" opacity="0.75" />
                  <path d="M185 338 Q145 375 105 415 Q75 440 45 460" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.6" />
                  <path d="M215 338 Q255 375 295 415 Q325 440 355 460" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.6" />
                  <path d="M198 380 Q175 410 150 445" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeDasharray="2 2" opacity="0.45" />
                  <path d="M202 380 Q225 410 250 445" stroke="var(--accent)" strokeWidth="1.2" fill="none" strokeDasharray="2 2" opacity="0.45" />

                  {/* REALISTIC TRUNK & FLARED ROOT BASE */}
                  <path
                    d="M186 315 C190 270 193 210 194 155 L206 155 C207 210 210 270 214 315 C226 320 245 325 260 328 C235 322 215 318 200 318 C185 318 165 322 140 328 C155 325 174 320 186 315 Z"
                    fill="url(#trunkGrad)"
                  />
                  {/* Bark Texture Line Detailing */}
                  <path d="M195 310 Q197 230 198 160" stroke="var(--accent-hover)" strokeWidth="1" opacity="0.4" fill="none" />
                  <path d="M205 310 Q203 230 202 160" stroke="var(--accent-hover)" strokeWidth="1" opacity="0.4" fill="none" />

                  {/* REALISTIC NATURAL TAPERED BOUGHS & BRANCH NETWORK */}
                  {/* Left Primary Bough & Sub-branches */}
                  <path d="M194 210 Q160 180 120 160" stroke="var(--accent-hover)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.85" />
                  <path d="M145 172 Q125 145 100 130" stroke="var(--accent-hover)" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.75" />
                  <path d="M130 165 Q115 178 95 188" stroke="var(--accent-hover)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.65" />

                  {/* Right Primary Bough & Sub-branches */}
                  <path d="M206 200 Q240 170 280 150" stroke="var(--accent-hover)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.85" />
                  <path d="M255 162 Q275 138 300 125" stroke="var(--accent-hover)" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.75" />
                  <path d="M270 155 Q285 170 305 180" stroke="var(--accent-hover)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.65" />

                  {/* Center Crown Stem Extension */}
                  <path d="M200 155 Q198 120 196 95" stroke="var(--accent-hover)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
                  <path d="M197 125 Q175 105 155 95" stroke="var(--accent-hover)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
                  <path d="M199 120 Q220 102 245 92" stroke="var(--accent-hover)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />

                  {/* REALISTIC ORGANIC OAK CANOPY SILHOUETTE */}
                  {/* Main Canopy Envelope */}
                  <path
                    d="M120 145 C85 125 75 75 110 48 C140 22 190 18 225 32 C255 15 305 28 320 62 C340 80 342 125 315 152 C295 170 260 178 232 170 C205 184 160 180 138 162 C118 170 98 160 120 145 Z"
                    fill={activeMode === 'multispectral' ? 'url(#ndviGrad)' : 'url(#canopyGrad)'}
                    stroke="var(--accent)"
                    strokeWidth="1.8"
                    opacity="0.9"
                  />

                  {/* Internal Canopy Leaf Cluster Layers (Adds organic foliage depth) */}
                  <path
                    d="M130 95 C142 70 175 62 198 78 C220 62 252 68 268 90 C285 112 270 138 248 145 C222 152 182 145 165 152 C142 145 120 122 130 95 Z"
                    fill="var(--accent)"
                    opacity="0.18"
                  />
                  <path
                    d="M150 60 C168 42 205 40 225 58 C238 75 225 102 205 106 C182 106 165 98 152 82 C142 70 145 62 150 60 Z"
                    fill="var(--accent)"
                    opacity="0.25"
                    stroke="var(--accent-hover)"
                    strokeWidth="1"
                  />

                  {/* Detailed Foliage Contour Texture Veins */}
                  <path d="M140 110 Q170 90 200 100 Q230 90 260 110" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />
                  <path d="M150 78 Q200 62 250 78" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />

                  {/* MODE SPECIFIC TELEMETRY OVERLAYS */}
                  {activeMode === 'biomass' && (
                    <g className="biomass-flow-layer">
                      <path d="M198 90 L198 315" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.9" className="sat-ray" />
                      <path d="M125 155 Q160 178 198 210" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" className="sat-ray" />
                      <path d="M275 145 Q240 168 198 200" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" className="sat-ray" />
                    </g>
                  )}

                  {/* TACTICAL TELEMETRY RETICLES & HOTSPOTS */}
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
                        {/* Inner Core */}
                        <polygon
                          points={`${cx},${cy - 3} ${cx + 3},${cy} ${cx},${cy + 3} ${cx - 3},${cy}`}
                          fill="var(--accent)"
                        />
                        {/* Selected HUD Target Reticle Brackets */}
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
