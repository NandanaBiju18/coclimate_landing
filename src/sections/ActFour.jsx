import { useRef, useEffect, useState } from 'react';
import StatementReveal from '../components/StatementReveal';
import { VERIFICATION_STEPS } from '../utils/constants';
import './ActFour.css';

export default function ActFour() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Sequence timing: reveal steps one by one
      const timeouts = [];
      for (let i = 0; i <= 4; i++) {
        timeouts.push(setTimeout(() => {
          setActiveStep(i);
        }, i * 600)); // 600ms per step
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="act-four" id="how-it-works">
      <div className={`act-four__content ${isVisible ? 'act-four__content--visible' : ''}`}>
        
        <div className="act-four__header">
          <span className="act-four__label t-label">02 / HOW IT WORKS</span>
          <h2 className="t-headline act-four__heading">
            Not self-reported.<br />
            <em>Independently reviewed.</em>
          </h2>
          <p className="act-four__subtext t-statement">
            Four connected steps turn work on the ground into an impact report you can check. No gaps between the planting and the proof.
          </p>
        </div>

        <div className="act-four__grid">
          {/* Step 01 */}
          <div className="act-four__card">
            <div className="act-four__card-header">
              <span className="act-four__step-num">01</span>
            </div>
            <div className="act-four__card-visual act-four__visual--task">
              <span className="act-four__mini-label">FIELD TASK · #042</span>
              <strong>Monthly survival count</strong>
              <div className="act-four__mini-meta">
                <span>📍 Restoration site · Plot 01</span>
                <span className="act-four__mini-pill">Assigned</span>
              </div>
            </div>
            <h3>Work is assigned.</h3>
            <p>A manager defines the site, the deadline and the evidence needed. Accountability starts before anyone sets foot on the land.</p>
            <div className="act-four__card-footer">
              <span className="status-dot"></span> A CLEAR TASK, NOT AN ASSUMPTION
            </div>
          </div>

          {/* Step 02: Real Tree Foliage Photo Card */}
          <div className="act-four__card">
            <div className="act-four__card-header">
              <span className="act-four__step-num">02</span>
            </div>
            <div className="act-four__card-visual act-four__visual--photo">
              <img 
                src="https://images.unsplash.com/photo-1511497584788-876761c119ef?q=80&w=1200&auto=format&fit=crop" 
                alt="Young tree foliage in a restoration plot" 
                className="act-four__tree-photo"
              />
              <div className="act-four__photo-badge">
                <span>📷 Photo captured on site</span>
                <small>GPS + timestamp attached</small>
              </div>
            </div>
            <h3>Evidence comes in.</h3>
            <p>An officer records photographs, GPS and tree counts from the site. The record is made as the work happens.</p>
            <div className="act-four__card-footer">
              <span className="status-dot"></span> RECORDED ON THE GROUND
            </div>
          </div>

          {/* Step 03 */}
          <div className="act-four__card">
            <div className="act-four__card-header">
              <span className="act-four__step-num">03</span>
            </div>
            <div className="act-four__card-visual act-four__visual--review">
              <div className="act-four__review-box">
                <span className="act-four__shield-icon">🛡️</span>
                <strong>Evidence reviewed</strong>
                <p>Photographs, location & tree counts</p>
                <div className="act-four__reviewer-tag">
                  <span className="avatar">AR</span>
                  <span>Reviewed by Arun R.</span>
                </div>
              </div>
            </div>
            <h3>A person reviews it.</h3>
            <p>A manager checks every submission. Nothing counts as verified until someone has reviewed the evidence.</p>
            <div className="act-four__card-footer">
              <span className="status-dot"></span> HUMAN JUDGEMENT, ALWAYS
            </div>
          </div>

          {/* Step 04 */}
          <div className="act-four__card">
            <div className="act-four__card-header">
              <span className="act-four__step-num">04</span>
            </div>
            <div className="act-four__card-visual act-four__visual--health">
              <div className="act-four__health-stat">
                <span className="lbl">SURVIVAL, OVER TIME</span>
                <span className="val">94.1%</span>
              </div>
              <div className="act-four__health-bars">
                <span style={{ height: '55%' }}></span>
                <span style={{ height: '70%' }}></span>
                <span style={{ height: '82%' }}></span>
                <span style={{ height: '94%' }}></span>
              </div>
            </div>
            <h3>Health is tracked.</h3>
            <p>Approved observations build a history of tree survival and plot health. A trend, not a one-off snapshot.</p>
            <div className="act-four__card-footer">
              <span className="status-dot"></span> A RECORD THAT KEEPS GROWING
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
