import { SectionLabel, Reveal } from './shared';

const awardsStyles = `
  #awards-section {
    padding: 100px 60px;
    border-bottom: 1px solid var(--line);
  }
  .awards-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .awards-heading {
    font-family: var(--serif);
    font-size: clamp(32px, 4vw, 58px);
    font-weight: 300;
    line-height: 1.12;
    letter-spacing: -0.01em;
  }
  .awards-heading em { font-style: italic; color: var(--accent2); }
  .awards-body {
    font-size: 15px; color: var(--text2); line-height: 1.8;
    margin-top: 24px; font-weight: 300; max-width: 480px;
  }
  .awards-cta {
    margin-top: 40px;
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 400;
    color: var(--text2);
    border: 1px solid var(--line2);
    padding: 12px 28px; border-radius: 100px;
    transition: border-color .3s, color .3s;
  }
  .awards-cta:hover { border-color: var(--accent); color: var(--text); }
  .awards-right { display: flex; flex-direction: column; gap: 16px; }
  .award-item {
    border: 1px solid var(--line);
    padding: 28px; border-radius: 4px;
    display: flex; gap: 20px; align-items: flex-start;
    transition: border-color .4s, background .4s;
    cursor: none;
  }
  .award-item:hover { border-color: var(--line2); background: rgba(200,169,110,0.03); }
  .award-year-badge {
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); font-weight: 400;
    width: 42px; flex-shrink: 0; padding-top: 3px;
  }
  .award-org {
    font-family: var(--serif);
    font-size: 18px; font-weight: 400; margin-bottom: 4px;
  }
  .award-cat { font-size: 13px; color: var(--text3); font-weight: 300; }
  @media (max-width: 1024px) {
    #awards-section { padding-left: 32px; padding-right: 32px; }
    .awards-inner { grid-template-columns: 1fr; gap: 48px; }
  }
`;

const AWARDS = [
  { year: '2024', org: 'Awwwards', cat: 'Agency of the Year Nomination — Best Digital Agency' },
  { year: '2023', org: 'CSS Design Awards', cat: 'Site of the Year — Special Kudos & Best UI' },
  { year: '2023', org: 'FWA', cat: 'Favourite Website Award — Design Excellence' },
  { year: '2022', org: 'Webby Awards', cat: 'Nominee — Best Agency Website of the Year' },
];

export default function Awards() {
  return (
    <>
      <style>{awardsStyles}</style>
      <section id="awards-section">
        <div className="awards-inner">
          <div className="awards-left">
            <Reveal>
              <SectionLabel style={{ marginBottom: 32 }}>Industry Recognition</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="awards-heading">
                Nominated as Agency of<br />the Year amongst best<br /><em>Digital Agencies</em><br />Worldwide.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="awards-body">
                We're passionate about doing the best digital innovation we can and pushing new technology to its limits. And we achieve results we're proud of.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#" className="awards-cta">Explore our Awards →</a>
            </Reveal>
          </div>

          <div className="awards-right">
            {AWARDS.map((award, i) => (
              <Reveal key={award.org + award.year} delay={i * 0.07}>
                <div className="award-item">
                  <div className="award-year-badge">{award.year}</div>
                  <div className="award-info">
                    <div className="award-org">{award.org}</div>
                    <div className="award-cat">{award.cat}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
