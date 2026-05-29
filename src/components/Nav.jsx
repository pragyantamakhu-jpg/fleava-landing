import { useState, useEffect } from 'react';

const navStyles = `
  nav.main-nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 500;
    padding: 0 40px;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--line);
    transition: background .4s, border-color .4s;
  }
  nav.main-nav.scrolled {
    background: rgba(12,12,10,0.92);
    backdrop-filter: blur(16px);
  }
  .nav-logo {
    font-family: var(--serif);
    font-size: 22px; font-weight: 400;
    letter-spacing: 0.04em;
    display: flex; align-items: center; gap: 6px;
    z-index: 600;
  }
  .nav-logo-wordmark {
    font-size: 18px; font-weight: 300;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.5;
  }
  .nav-right {
    display: flex; align-items: center; gap: 32px;
    z-index: 600;
  }
  .nav-link-sm {
    font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; font-weight: 400;
    color: var(--text2);
    transition: color .3s;
    background: none; border: none; padding: 0;
  }
  .nav-link-sm:hover { color: var(--text); }
  .nav-inquire {
    font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; font-weight: 400;
    border: 1px solid var(--line2);
    padding: 9px 20px; border-radius: 100px;
    color: var(--text);
    transition: border-color .3s, background .3s;
    background: none;
  }
  .nav-inquire:hover { border-color: var(--accent); background: rgba(200,169,110,0.06); }
  .nav-menu-btn {
    display: flex; flex-direction: column; gap: 5px;
    background: none; border: none; padding: 8px;
    z-index: 600;
  }
  .nav-menu-btn span {
    display: block; width: 22px; height: 1px;
    background: var(--text);
    transition: transform .4s var(--ease1), opacity .3s, width .4s;
  }
  .nav-menu-btn.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .nav-menu-btn.open span:nth-child(2) { opacity: 0; width: 0; }
  .nav-menu-btn.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* Overlay */
  #nav-overlay {
    position: fixed; inset: 0;
    background: var(--bg2);
    z-index: 490;
    display: flex;
    pointer-events: none;
    opacity: 0;
    transition: opacity .5s var(--ease1);
  }
  #nav-overlay.open { opacity: 1; pointer-events: all; }
  .nav-overlay-left {
    width: 45%;
    border-right: 1px solid var(--line);
    padding: 100px 60px 60px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .nav-overlay-right {
    flex: 1;
    padding: 100px 60px 60px;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .nav-overlay-links { list-style: none; display: flex; flex-direction: column; gap: 4px; }
  .nav-overlay-links li a {
    font-family: var(--serif);
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 300;
    letter-spacing: -0.01em;
    color: var(--text3);
    line-height: 1.15;
    display: inline-flex; align-items: baseline; gap: 10px;
    transition: color .3s;
  }
  .nav-overlay-links li a:hover { color: var(--text); }
  .nav-overlay-links li a .nav-count {
    font-family: var(--sans);
    font-size: 11px; letter-spacing: 0.1em;
    color: var(--text3);
    transition: color .3s; font-weight: 400;
  }
  .nav-overlay-links li a:hover .nav-count { color: var(--accent); }
  .nav-overlay-addr { font-size: 13px; color: var(--text3); line-height: 1.8; }
  .nav-overlay-addr strong {
    color: var(--text2); font-weight: 400; display: block;
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;
  }
  .nav-overlay-socials { display: flex; gap: 20px; margin-top: 40px; }
  .nav-overlay-socials a {
    font-size: 12px; letter-spacing: 0.06em; color: var(--text3);
    transition: color .3s;
  }
  .nav-overlay-socials a:hover { color: var(--text); }

  @media (max-width: 1024px) {
    nav.main-nav { padding: 0 24px; }
    .nav-overlay-left, .nav-overlay-right { padding: 80px 32px 40px; }
  }
  @media (max-width: 768px) {
    .nav-overlay-left { width: 100%; border-right: none; }
    .nav-overlay-right { display: none; }
  }
`;

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Works', href: '#', count: 17 },
  { label: 'Journal', href: '#', count: 33 },
  { label: 'Expertise', href: '#expertise', count: 6 },
  { label: 'About', href: '#' },
  { label: 'Awards', href: '#', count: 59 },
  { label: 'Brands', href: '#', count: 141 },
  { label: 'Careers', href: '#', count: 4 },
  { label: 'Inquiries', href: '#contact-cta' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleAnchor = (e, href) => {
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    closeMenu();
  };

  return (
    <>
      <style>{navStyles}</style>

      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`} id="main-nav">
        <a href="#" className="nav-logo">
          <span style={{ fontStyle: 'italic' }}>Fleava</span>
          <span className="nav-logo-wordmark">Digital</span>
        </a>
        <div className="nav-right">
          <a href="#" className="nav-link-sm">
            Works <span style={{ fontSize: '9px', color: 'var(--text3)' }}>17</span>
          </a>
          <a href="#" className="nav-link-sm">
            Journal <span style={{ fontSize: '9px', color: 'var(--text3)' }}>33</span>
          </a>
          <a href="#expertise" className="nav-link-sm" onClick={e => handleAnchor(e, '#expertise')}>Expertise</a>
          <a href="#" className="nav-link-sm">About</a>
          <a href="#contact-cta" className="nav-inquire" onClick={e => handleAnchor(e, '#contact-cta')}>Inquiries</a>
          <button
            className={`nav-menu-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        id="nav-overlay"
        className={menuOpen ? 'open' : ''}
        role="dialog"
        aria-label="Main menu"
        aria-hidden={!menuOpen}
      >
        <div className="nav-overlay-left">
          <ul className="nav-overlay-links">
            {NAV_LINKS.map(({ label, href, count }) => (
              <li key={label}>
                <a href={href} onClick={e => handleAnchor(e, href)}>
                  {label}
                  {count != null && <span className="nav-count">{String(count).padStart(2, '0')}</span>}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <div className="nav-overlay-socials">
              {['Fb', 'Ig', 'Tw', 'In', 'Bē'].map(s => <a href="#" key={s}>{s}</a>)}
            </div>
          </div>
        </div>
        <div className="nav-overlay-right">
          <div>
            <div className="nav-overlay-addr">
              <strong>Singapore</strong>
              160 Robinson Road, #14-04<br />
              Singapore Business Federation<br />
              Centre - 068914, Singapore
            </div>
            <div className="nav-overlay-addr" style={{ marginTop: 32 }}>
              <strong>Bali, Indonesia</strong>
              Jalan Merta Agung, No.25,<br />
              Kerobokan Kelod, Badung,<br />
              Bali - 80361, Indonesia
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
