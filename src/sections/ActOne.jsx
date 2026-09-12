import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import MagneticButton from '../components/MagneticButton';
import './ActOne.css';

const HeroScene = lazy(() => import('../scenes/HeroScene'));

export default function ActOne({ isMobile = false }) {
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
    <section ref={sectionRef} className="act-one" id="discover">
      <div className="act-one__canvas">
        {isVisible && (
          <Suspense fallback={null}>
            <HeroScene progress={progress} isMobile={isMobile} />
          </Suspense>
        )}
      </div>

      <div className="act-one__content">
        <div className="act-one__hero-text">
          <div className="badge-glow act-one__float-slow">
            <span className="badge-glow__dot" />
            <span>MONITORING, REPORTING & VERIFICATION</span>
          </div>

          <h1 className="t-display act-one__headline act-one__headline--constant-motion">
            Proof the trees are still <em>standing.</em>
          </h1>
          
          <p className="t-subheading act-one__sub act-one__float-slow-delay">
            Real land. Field evidence. Human verification. A shared record of restoration that you can check, not just trust.
          </p>

          <div className="act-one__cta-group">
            <MagneticButton href="#contact">Schedule a Call</MagneticButton>
          </div>

          {/* Hero Live Metric Ticker with constant floating pulse */}
          <div className="act-one__ticker act-one__ticker--float">
            <div className="act-one__ticker-item">
              <span className="act-one__ticker-val">12,480+</span>
              <span className="act-one__ticker-lbl">Trees Verified</span>
            </div>
            <div className="act-one__ticker-dot">•</div>
            <div className="act-one__ticker-item">
              <span className="act-one__ticker-val">94.1%</span>
              <span className="act-one__ticker-lbl">Survival Rate</span>
            </div>
            <div className="act-one__ticker-dot">•</div>
            <div className="act-one__ticker-item">
              <span className="act-one__ticker-val">100%</span>
              <span className="act-one__ticker-lbl">Cryptographic Proof</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
