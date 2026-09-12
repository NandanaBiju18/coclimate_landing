import { useState, useRef, useCallback, useEffect } from 'react';
import './ProductShowcase.css';


/**
 * Card data — swap `content` with actual screenshots later.
 * Animation logic is fully separated from content.
 */
const CARDS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Project Overview',
    subtitle: 'Trees, health and survival — per project',
    accent: '#4a8f5f',
    content: { image: '/images/dashboard.jpg' },
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Project Registry',
    subtitle: 'Land-based restoration projects',
    accent: '#3b7a54',
    content: { image: '/images/projects.jpg' },
  },
  {
    id: 'tasks',
    label: 'Tasks',
    title: 'Field Tasks',
    subtitle: 'Assigned, submitted and reviewed',
    accent: '#2d6b48',
    content: { image: '/images/tasks.jpg' },
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    title: 'Monitoring Records',
    subtitle: 'Survival trends built over time',
    accent: '#4e9e6b',
    content: { image: '/images/monitoring.jpg' },
  },
];

/* ── Card content renderers (using images) ── */
function ImageContent({ data }) {
  return (
    <div className="pc-content" style={{ padding: 0, height: '100%' }}>
      <img 
        src={data.image} 
        alt="Dashboard UI" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
      />
    </div>
  );
}

const CONTENT_RENDERERS = {
  dashboard: ImageContent,
  projects: ImageContent,
  tasks: ImageContent,
  monitoring: ImageContent,
};

function mod(n, m) { return ((n % m) + m) % m; }

/* ── Main component ── */
export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const scrollAccumRef = useRef(0);
  const lastScrollTime = useRef(0);
  const isTransitioning = useRef(false);
  const total = CARDS.length;

  const goTo = useCallback((index) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveIndex(mod(index, total));
    setTimeout(() => { isTransitioning.current = false; }, 550);
  }, [total]);

  /* ── Drag / swipe ── */
  const dragStartX = useRef(null);

  const onPointerDown = useCallback((e) => {
    dragStartX.current = e.clientX;
  }, []);

  const onPointerUp = useCallback((e) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
  }, [activeIndex, goTo]);

  /* ── Wheel — intercept only horizontal intent, never trap vertical ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Only intercept trackpad horizontal swipe (deltaX clearly dominant)
      if (absX > absY && absX > 8) {
        e.preventDefault();
        scrollAccumRef.current += e.deltaX;
        const now = Date.now();
        if (Math.abs(scrollAccumRef.current) > 80 && now - lastScrollTime.current > 400) {
          lastScrollTime.current = now;
          if (scrollAccumRef.current > 0) goTo(activeIndex + 1);
          else goTo(activeIndex - 1);
          scrollAccumRef.current = 0;
        }
      }
      // Pure vertical → fall through; page scrolls normally (no preventDefault)
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [activeIndex, goTo]);

  return (
    <section className="showcase" id="platform">
      <div className="showcase__inner">

        <div className="showcase__split">

          {/* LEFT — text column */}
          <div className="showcase__text-col">
            <span className="showcase__label t-label">The Platform</span>
            <h2 className="showcase__headline">
              Everyone reads<br />the same record.
            </h2>
            <p className="showcase__subtext">
              Field officers, managers and funding organisations all see the same photos, counts and dates — including who reviewed each submission.
            </p>

            {/* Dot indicators */}
            <div className="showcase__dots" role="group" aria-label="Card navigation">
              {CARDS.map((card, i) => (
                <button
                  key={card.id}
                  className={`showcase__dot${i === activeIndex ? ' showcase__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`View ${card.label}`}
                />
              ))}
            </div>

            {/* Active card label */}
            <p className="showcase__active-label t-label">
              {CARDS[activeIndex].label} — {CARDS[activeIndex].subtitle}
            </p>
          </div>

          {/* RIGHT — card stack */}
          <div
            ref={containerRef}
            className="showcase__stack-wrapper"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={(e) => { if (e.buttons > 0) onPointerUp(e); }}
          >
            <div className="showcase__stack">
              {CARDS.map((card, i) => {
                let rel = mod(i - activeIndex + total, total);
                if (rel > total / 2) rel -= total;

                const isActive = rel === 0;
                const ContentRenderer = CONTENT_RENDERERS[card.id];

                return (
                  <div
                    key={card.id}
                    className={`showcase__card${isActive ? ' showcase__card--active' : ''}`}
                    data-rel={rel}
                    onClick={() => !isActive && goTo(i)}
                    onMouseEnter={() => !isActive && goTo(i)}
                    style={{ visibility: Math.abs(rel) > 2 ? 'hidden' : 'visible' }}
                  >
                    {/* Card chrome */}
                    <div className="showcase__card-chrome">
                      <div className="sc-dots">
                        <span className="sc-dot sc-dot--red" />
                        <span className="sc-dot sc-dot--yellow" />
                        <span className="sc-dot sc-dot--green" />
                      </div>
                      <span className="t-mono sc-url">co-climate.io / {card.id}</span>
                      <span className="t-label sc-label">{card.label}</span>
                    </div>

                    {/* Card header band */}
                    <div className="showcase__card-header" style={{ '--accent': card.accent }}>
                      <div className="sc-accent-bar" />
                      <div className="sc-header-text">
                        <h3 className="sc-title">{card.title}</h3>
                        <p className="sc-subtitle t-label">{card.subtitle}</p>
                      </div>
                    </div>

                    {/* Modular content */}
                    <div className="showcase__card-content">
                      {isActive && <ContentRenderer data={card.content} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
