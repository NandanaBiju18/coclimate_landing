import './Services.css';

const SERVICES = [
  {
    id: 'carbon-free-zones',
    number: '01',
    title: 'Carbon-Free Zones',
    description:
      'We turn unused rural land into managed green zones. Local farmers plant, maintain and monitor them. The zones build towards carbon credits over time.',
    tag: 'Land · Restoration · Credits',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'green-auditing',
    number: '02',
    title: 'Green Auditing & Carbon Assessments',
    description:
      'We audit and digitise the green cover on your campus or across your organisation — so you know what every tree is sequestering.',
    tag: 'Assessment · GHG · ESG',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'pre-certification',
    number: '03',
    title: 'Carbon Credit Pre-Certification',
    description:
      'We take you from planting to monetisation, preparing your projects for carbon credit validation under CDM, ICM and other frameworks.',
    tag: 'Certification · CDM · ICM',
    image: 'https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=800&auto=format&fit=crop',
  },
];

const OUTCOMES = [
  'Carbon absorption certificates with verified data',
  'SDG alignment documentation',
  'Monthly impact reports with photos and metrics',
  'ESG compliance with measurable outcomes',
  'Transparent cost and outcome breakdown',
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services__inner">
        <div className="services__header">
          <span className="services__label t-label">What We Do</span>
          <h2 className="services__headline t-headline">
            Climate action that is grounded,<br />measurable and scalable.
          </h2>
          <p className="services__sub t-body">
            The platform monitors every project we run inside it. That is what makes the outcomes checkable.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <div key={s.id} className={`services__card services__card--${s.number}`}>
              <div className="services__card-head">
                <span className="services__card-num t-mono">{s.number}</span>
                <span className="services__card-tag t-label">{s.tag}</span>
              </div>
              <img src={s.image} alt={s.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem', opacity: '0.9' }} />
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc t-body">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="services__outcomes">
          <span className="t-label services__outcomes-label">What you receive</span>
          <ul className="services__outcome-list">
            {OUTCOMES.map((o, i) => (
              <li key={i} className="services__outcome-item">
                <span className="services__outcome-dot" aria-hidden="true" />
                <span className="t-body">{o}</span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="services__cta">Schedule a Call</a>
        </div>
      </div>
    </section>
  );
}
