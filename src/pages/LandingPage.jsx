import { useState, useCallback } from 'react';
import { useMobile } from '../hooks/useMobile';
import Preloader from '../components/Preloader';
import Navigation from '../components/Navigation';
import ScrollProgress from '../components/ScrollProgress';
import ClimateBackground from '../components/ClimateBackground';
import TreeAuditDiagram from '../components/TreeAuditDiagram';
import ImpactCalculator from '../components/ImpactCalculator';
import ActOne from '../sections/ActOne';
import ActTwo from '../sections/ActTwo';
import ProductShowcase from '../sections/ProductShowcase';
import ActFour from '../sections/ActFour';
import Services from '../sections/Services';
import Contact from '../sections/Contact';
import Coda from '../sections/Coda';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useMobile();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Cohesive Climate-Tech GIS & Atmospheric Background System */}
      <ClimateBackground />

      <div className={`app ${loaded ? 'app--loaded' : ''}`}>
        <Navigation />
        <ScrollProgress />

        <main className="app__main">
          {/* 1. Hero — What is Co-Climate and why it exists */}
          <ActOne isMobile={isMobile} />

          {/* 2. In the Field — How evidence is captured */}
          <ActTwo isMobile={isMobile} />

          {/* 3. Professional Technical Tree System & Audit Diagram */}
          <TreeAuditDiagram />

          {/* 4. Interactive Climate & Carbon Impact Simulator */}
          <ImpactCalculator />

          {/* 5. The Platform — What the interface looks like */}
          <ProductShowcase />

          {/* 6. How It Works — The 4-step verification process */}
          <ActFour />

          {/* 7. Services — What Co-Climate offers */}
          <Services />

          {/* 8. Contact — Get started */}
          <Contact />

          {/* 9. Coda — Final statement + closing */}
          <Coda />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
