import StatementReveal from '../components/StatementReveal';
import './Coda.css';

export default function Coda() {
  return (
    <section className="coda" id="coda">
      <div className="coda__content">
        <div className="coda__main">
          <div className="badge-glow">
            <span className="badge-glow__dot" />
            <span>Cryptographic Proof & Accountability</span>
          </div>

          <StatementReveal
            text="Proof the trees are still standing."
            className="t-display coda__headline"
            tag="h2"
          />

          <p className="t-statement coda__sub">
            Real impact isn't defined by marketing promises. It is built through ground truth, satellite monitoring, and verifiable evidence that stands up to scrutiny.
          </p>

          <div className="coda__actions">
            <a href="#contact" className="coda__btn">Get Started with Co-Climate</a>
            <a href="#discover" className="coda__btn coda__btn--outline">Back to top ↑</a>
          </div>
        </div>

        <footer className="coda__footer">
          <div className="coda__footer-left">
            <span className="coda__footer-logo">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(30 50 50)">
                  <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="12" strokeDasharray="198.968 39.793" strokeLinecap="butt" />
                  <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="12" strokeDasharray="115.192 23.038" strokeLinecap="butt" />
                </g>
              </svg>
              Co-Climate
            </span>
            <span className="coda__footer-copy t-label">© {new Date().getFullYear()}</span>
          </div>

          <div className="coda__footer-links">
            <a href="https://www.linkedin.com/company/co-climate/" target="_blank" rel="noreferrer" className="coda__footer-link t-label">LinkedIn</a>
            <a href="https://www.instagram.com/co.climate/" target="_blank" rel="noreferrer" className="coda__footer-link t-label">Instagram</a>
            <a href="mailto:outreach.coclimate@gmail.com" className="coda__footer-link t-label">Email</a>
          </div>

          <div className="coda__footer-right">
            <span className="t-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-hover)' }}>
              COIMBATORE & PALAKKAD, INDIA
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
