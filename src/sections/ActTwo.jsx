import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import StatementReveal from '../components/StatementReveal';
import './ActTwo.css';

const ObservationScene = lazy(() => import('../scenes/ObservationScene'));

export default function ActTwo({ isMobile = false }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const total = Math.max(1, sectionHeight - viewportHeight);
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="act-two" id="observe">
      <div className="act-two__canvas">
        {isVisible && (
          <Suspense fallback={null}>
            <ObservationScene progress={progress} isMobile={isMobile} />
          </Suspense>
        )}
      </div>

      <div className="act-two__content">
        <div className="act-two__hero-text">
          <div className="badge-glow">
            <span className="badge-glow__dot" />
            <span>Satellite & Mobile Telemetry</span>
          </div>

          <StatementReveal
            text="Observe every hectare."
            className="t-display act-two__headline"
            tag="h2"
          />
          <p className="t-subheading act-two__sub" style={{ opacity: 0, animation: 'fadeInUp 1s ease 0.8s forwards' }}>
            We monitor the health, growth, and environmental conditions of every project using satellite imagery and on-the-ground mobile proof.
          </p>

          {/* Real Tree Field Inspection Visual Card */}
          <div className="act-two__real-tree-card">
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop"
              alt="Real tree canopy field inspection"
              className="act-two__real-tree-img"
            />
            <div className="act-two__real-tree-badge">
              <span className="status-dot"></span> REAL FIELD OBSERVATION · SITE 01
            </div>
          </div>

          {/* Animated Telemetry Overlay Badge Row */}
          <div className="act-two__radar-hud">
            <div className="act-two__radar-ping">
              <span className="radar-sweep" />
              <span className="radar-dot" />
            </div>
            <div className="act-two__telemetry-chips">
              <span className="t-mono chip">LAT 10.78°N</span>
              <span className="t-mono chip">LON 76.65°E</span>
              <span className="t-mono chip chip--accent">Canopy Index 94.2%</span>
              <span className="t-mono chip">10cm Multispectral</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
