import { useState } from 'react';
import './ImpactCalculator.css';

const PROJECT_TYPES = [
  {
    id: 'agroforestry',
    name: 'Agroforestry & Rural Belt',
    co2PerHectare: 8.5,
    treesPerHectare: 250,
    survivalRate: '94%',
    satCheck: 'Every 14 Days',
    icon: '🌱',
  },
  {
    id: 'forest-restoration',
    name: 'Native Forest Reforestation',
    co2PerHectare: 14.2,
    treesPerHectare: 400,
    survivalRate: '96%',
    satCheck: 'Every 7 Days',
    icon: '🌲',
  },
  {
    id: 'mangrove-blue-carbon',
    name: 'Coastal Blue Carbon & Wetlands',
    co2PerHectare: 22.0,
    treesPerHectare: 500,
    survivalRate: '92%',
    satCheck: 'Every 5 Days',
    icon: '🌊',
  },
];

export default function ImpactCalculator() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [hectares, setHectares] = useState(50);

  const totalTrees = Math.round(hectares * selectedType.treesPerHectare);
  const totalCo2 = Math.round(hectares * selectedType.co2PerHectare);
  const creditsGenerated = Math.round(totalCo2 * 0.95);

  return (
    <section className="calculator-section" id="calculator">
      <div className="calculator-container">
        <div className="calculator-header">
          <div className="badge-glow">
            <span className="badge-glow__dot" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="t-headline calculator-title">
            Simulate Your Environmental Impact
          </h2>
          <p className="t-statement calculator-desc">
            Adjust the sliders below to estimate carbon absorption, tree density, and verifiable credit output across Co-Climate monitored zones.
          </p>
        </div>

        <div className="calculator-card glass">
          <div className="calculator-grid">
            {/* Controls Left Column */}
            <div className="calculator-controls">
              <label className="calculator-label t-label">Select Project Model</label>
              <div className="calculator-type-selector">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    className={`calculator-type-btn ${selectedType.id === type.id ? 'calculator-type-btn--active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    <span className="calculator-type-icon">{type.icon}</span>
                    <span className="calculator-type-name">{type.name}</span>
                  </button>
                ))}
              </div>

              <div className="calculator-slider-group">
                <div className="calculator-slider-header">
                  <span className="t-label">Land Area (Hectares)</span>
                  <span className="calculator-slider-val t-mono">{hectares} ha</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={hectares}
                  onChange={(e) => setHectares(Number(e.target.value))}
                  className="calculator-slider"
                />
                <div className="calculator-slider-ticks t-label">
                  <span>5 ha</span>
                  <span>250 ha</span>
                  <span>500 ha</span>
                </div>
              </div>
            </div>

            {/* Results Right Column */}
            <div className="calculator-results">
              <div className="calculator-metrics-grid">
                <div className="calculator-metric">
                  <span className="calculator-metric-lbl t-label">Est. CO₂ Sequestered</span>
                  <span className="calculator-metric-num t-display">{totalCo2.toLocaleString()} <span className="calculator-metric-unit">tons/yr</span></span>
                </div>

                <div className="calculator-metric">
                  <span className="calculator-metric-lbl t-label">Total Trees Tracked</span>
                  <span className="calculator-metric-num t-display">{totalTrees.toLocaleString()} <span className="calculator-metric-unit">trees</span></span>
                </div>
              </div>

              <div className="calculator-details">
                <div className="calculator-detail-item">
                  <span className="calculator-detail-key t-label">Satellite Scan Frequency</span>
                  <span className="calculator-detail-val t-mono">{selectedType.satCheck}</span>
                </div>
                <div className="calculator-detail-item">
                  <span className="calculator-detail-key t-label">Historical Survival Rate</span>
                  <span className="calculator-detail-val t-mono">{selectedType.survivalRate}</span>
                </div>
                <div className="calculator-detail-item">
                  <span className="calculator-detail-key t-label">Pre-Certified Credits Output</span>
                  <span className="calculator-detail-val t-mono">{creditsGenerated.toLocaleString()} Credits</span>
                </div>
              </div>

              <div className="calculator-action">
                <a href="#contact" className="calculator-btn">
                  <span>Request Full Site Assessment</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
