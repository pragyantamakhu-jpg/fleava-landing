import { SectionLabel, Reveal } from './shared';

const expertiseStyles = `
  #expertise {
    padding: 100px 60px;
    border-bottom: 1px solid var(--line);
  }
  .expertise-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 60px; gap: 40px;
  }
  .expertise-desc {
    max-width: 500px;
    font-size: 15px; color: var(--text2); line-height: 1.78; font-weight: 300;
    margin-top: 20px;
  }
  .expertise-list { display: flex; flex-direction: column; }
  .expertise-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 0;
    border-bottom: 1px solid var(--line);
    cursor: none;
    transition: padding-left .4s var(--ease1);
    position: relative; overflow: hidden;
  }
  .expertise-item::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 0;
    background: rgba(200,169,110,0.04);
    transition: width .5s var(--ease1);
  }
  .expertise-item:hover { padding-left: 20px; }
  .expertise-item:hover::before { width: 100%; }
  .expertise-item:first-child { border-top: 1px solid var(--line); }
  .expertise-left { display: flex; align-items: baseline; gap: 20px; }
  .expertise-num {
    font-size: 11px; letter-spacing: 0.1em; color: var(--text3);
    font-weight: 400; width: 28px; flex-shrink: 0;
  }
  .expertise-name {
    font-family: var(--serif);
    font-size: clamp(22px, 2.8vw, 36px);
    font-weight: 300;
    letter-spacing: -0.005em;
    transition: color .3s;
  }
  .expertise-item:hover .expertise-name { color: var(--accent2); }
  .expertise-arrow {
    font-size: 20px; color: var(--text3);
    transition: transform .4s var(--ease1), color .3s;
  }
  .expertise-item:hover .expertise-arrow { transform: translate(6px,-6px); color: var(--accent); }
  @media (max-width: 1024px) {
    #expertise { padding-left: 32px; padding-right: 32px; }
  }
  @media (max-width: 768px) {
    .expertise-name { font-size: clamp(18px, 6vw, 28px); }
  }
`;

const SERVICES = [
  'Digital Strategy',
  'Branding',
  'Web + App Development',
  'User Experience',
  'Digital Marketing',
  'Media Production',
];

export default function Expertise() {
  return (
    <>
      <style>{expertiseStyles}</style>
      <section id="expertise">
        <div className="expertise-header">
          <div>
            <Reveal>
              <SectionLabel>Expertise</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="expertise-desc">
                We are passionate about uncovering the best digital innovations for forward—thinking brands looking to push boundaries and drive significant impact.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href="#" className="nav-inquire" style={{ flexShrink: 0, marginTop: 20 }}>
              Explore all Expertise →
            </a>
          </Reveal>
        </div>

        <div className="expertise-list">
          {SERVICES.map((name, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <div className="expertise-item">
                <div className="expertise-left">
                  <span className="expertise-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="expertise-name">{name}</span>
                </div>
                <span className="expertise-arrow">↗</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
