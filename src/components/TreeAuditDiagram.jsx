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
                
                {/* SVG Technical Tree Diagram */}
                <svg className="tree-svg" viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Sky / Satellite Scan Ray */}
                  <line x1="200" y1="10" x2="200" y2="100" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" className="sat-ray" />
                  <path d="M190 20 L200 10 L210 20" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                  <text x="200" y="32" fill="var(--accent)" fontSize="9" fontFamily="monospace" textAnchor="middle">SATELLITE SCAN (NIR)</text>

                  {/* Ground Level Line */}
                  <line x1="30" y1="300" x2="370" y2="300" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 6" />
                  <text x="35" y="292" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">GROUND HORIZON (ALT 42m)</text>

                  {/* Tree Trunk Structure */}
                  <path d="M192 300 C194 250 196 180 195 140 L205 140 C204 180 206 250 208 300 Z" fill="var(--accent-hover)" opacity="0.8" />
                  <path d="M196 220 C170 190 140 175 120 170" stroke="var(--accent-hover)" strokeWidth="3" fill="none" opacity="0.7" />
                  <path d="M204 200 C230 175 260 160 280 155" stroke="var(--accent-hover)" strokeWidth="3" fill="none" opacity="0.7" />

                  {/* Organic Broadleaf Canopy Concentric Rings */}
                  <circle cx="200" cy="115" r="75" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="1.5" opacity="0.85" />
                  <circle cx="160" cy="125" r="50" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="1.2" opacity="0.75" />
                  <circle cx="240" cy="125" r="50" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="1.2" opacity="0.75" />
                  <circle cx="200" cy="85" r="45" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="1.2" opacity="0.75" />

                  {/* Root System Network */}
                  <path d="M200 300 C180 340 150 380 110 410" stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="3 3" />
                  <path d="M200 300 C220 340 250 380 290 410" stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="3 3" />
                  <path d="M200 300 C195 350 205 390 200 430" stroke="var(--accent)" strokeWidth="2.5" fill="none" opacity="0.65" />

                  {/* Hotspot Target Nodes */}
                  {INSPECTION_POINTS.map((pt) => {
                    const isSelected = selectedPoint.id === pt.id;
                    const cx = (pt.x / 100) * 400;
                    const cy = (pt.y / 100) * 450;

                    return (
                      <g key={pt.id} onClick={() => setSelectedPoint(pt)} style={{ cursor: 'pointer' }}>
                        <circle cx={cx} cy={cy} r={isSelected ? 14 : 9} fill="var(--surface-raised)" stroke="var(--accent)" strokeWidth={isSelected ? 2.5 : 1.5} />
                        <circle cx={cx} cy={cy} r={isSelected ? 5 : 3} fill="var(--accent)" />
                        {isSelected && <circle cx={cx} cy={cy} r="20" stroke="var(--accent)" strokeWidth="1" opacity="0.5" className="hotspot-pulse" />}
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
