import { SectionLabel, Reveal } from './shared';

const introStyles = `
  #intro {
    padding: 120px 60px 100px;
    border-bottom: 1px solid var(--line);
  }
  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1.8fr;
    gap: 80px;
    align-items: start;
  }
  .intro-heading {
    font-family: var(--serif);
    font-size: clamp(36px, 4.5vw, 66px);
    font-weight: 300;
    line-height: 1.12;
    letter-spacing: -0.01em;
    margin-bottom: 0;
  }
  .intro-heading em { font-style: italic; color: var(--accent2); }
  .intro-body {
    font-size: 17px;
    color: var(--text2);
    line-height: 1.82;
    max-width: 580px;
    font-weight: 300;
  }
  .intro-about-link {
    display: inline-flex; align-items: center; gap: 10px;
    margin-top: 48px;
    font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 400;
    color: var(--text3);
    border-bottom: 1px solid var(--line);
    padding-bottom: 12px;
    transition: color .3s, border-color .3s;
  }
  .intro-about-link:hover { color: var(--text); border-color: var(--line2); }
  .intro-about-block {
    margin-top: 60px;
    border: 1px solid var(--line);
    padding: 32px;
    border-radius: 4px;
    position: relative; overflow: hidden;
  }
  .intro-about-block::before {
    content: '/ The Agency';
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--text3);
    display: block; margin-bottom: 16px; font-weight: 400;
  }
  .intro-about-title {
    font-family: var(--serif);
    font-size: 22px; font-weight: 300;
    line-height: 1.4;
    margin-bottom: 16px;
  }
  .intro-about-desc {
    font-size: 14px; color: var(--text3); line-height: 1.7; font-weight: 300;
  }
  @media (max-width: 1024px) {
    #intro { padding-left: 32px; padding-right: 32px; }
    .intro-grid { grid-template-columns: 1fr; gap: 48px; }
  }
`;

export default function Intro() {
  return (
    <>
      <style>{introStyles}</style>
      <section id="intro">
        <div className="intro-grid">
          <div className="intro-left">
            <Reveal>
              <SectionLabel style={{ marginBottom: 24 }}>Introduction</SectionLabel>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h2 className="intro-heading">
                Accelerating Global<br />Brands — <em>Years</em><br />ahead.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="intro-body" style={{ marginTop: 32 }}>
                We are a world—class team of industry—leading professionals, who constantly push new technology to its limits.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="#" className="intro-about-link">About Fleava →</a>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="intro-about-block">
                <div className="intro-about-title">We Provoke what's<br />Possible.</div>
                <p className="intro-about-desc">
                  We're an award-winning strategic digital innovation agency. We fuse data with unrivaled creativity to achieve remarkable results for ambitious brands.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
