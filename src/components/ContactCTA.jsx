import { SectionLabel, Reveal } from './shared';

const ctaStyles = `
  #contact-cta {
    padding: 120px 60px;
    border-bottom: 1px solid var(--line);
    text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-label { margin: 0 auto 28px; justify-content: center; }
  .cta-heading {
    font-family: var(--serif);
    font-size: clamp(52px, 9vw, 130px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin-bottom: 40px;
  }
  .cta-heading em { font-style: italic; color: var(--accent2); }
  .cta-sub {
    font-size: 16px; color: var(--text2);
    max-width: 440px; margin: 0 auto 56px;
    line-height: 1.8; font-weight: 300;
  }
  .cta-email {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: var(--serif);
    font-size: clamp(22px, 3vw, 36px);
    font-weight: 300;
    letter-spacing: -0.01em;
    color: var(--text);
    border-bottom: 1px solid var(--line2);
    padding-bottom: 8px;
    transition: color .3s, border-color .3s;
  }
  .cta-email:hover { color: var(--accent); border-color: var(--accent); }
  @media (max-width: 1024px) {
    #contact-cta { padding-left: 32px; padding-right: 32px; }
  }
  @media (max-width: 768px) {
    .cta-heading { font-size: clamp(42px, 14vw, 80px); }
  }
`;

export default function ContactCTA() {
  return (
    <>
      <style>{ctaStyles}</style>
      <section id="contact-cta">
        <div className="cta-bg" />
        <Reveal>
          <SectionLabel className="cta-label">Get In Touch</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="cta-heading">
            Let's<br /><em>Talk.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="cta-sub">
            Ready to transform your brand? We'd love to hear about your vision and explore how we can help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="mailto:hello@fleava.com" className="cta-email">
            hello@fleava.com →
          </a>
        </Reveal>
      </section>
    </>
  );
}
