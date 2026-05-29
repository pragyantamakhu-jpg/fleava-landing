const footerStyles = `
  footer {
    padding: 80px 60px 40px;
    border-top: 1px solid var(--line);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 60px;
    padding-bottom: 60px;
    border-bottom: 1px solid var(--line);
    margin-bottom: 40px;
  }
  .footer-logo {
    font-family: var(--serif);
    font-size: 28px; font-weight: 300;
    letter-spacing: 0.04em;
    margin-bottom: 16px;
    display: block;
  }
  .footer-tagline {
    font-size: 13px; color: var(--text3); line-height: 1.7;
    max-width: 220px; font-weight: 300;
  }
  .footer-addr { margin-top: 28px; }
  .footer-addr-country {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--accent); font-weight: 400; margin-bottom: 8px;
  }
  .footer-addr-text { font-size: 13px; color: var(--text3); line-height: 1.7; font-weight: 300; }
  .footer-col-title {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--text3); font-weight: 400; margin-bottom: 20px;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a {
    font-size: 14px; color: var(--text2); font-weight: 300;
    transition: color .3s;
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
  }
  .footer-links a:hover { color: var(--text); }
  .footer-links .f-count { font-size: 10px; color: var(--text3); letter-spacing: 0.06em; }
  .footer-bottom {
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
  }
  .footer-copy { font-size: 13px; color: var(--text3); font-weight: 300; }
  .footer-socials { display: flex; gap: 20px; }
  .footer-socials a {
    font-size: 12px; letter-spacing: 0.06em; color: var(--text3);
    transition: color .3s;
  }
  .footer-socials a:hover { color: var(--accent); }
  .footer-terms { display: flex; gap: 20px; }
  .footer-terms a {
    font-size: 12px; color: var(--text3);
    transition: color .3s; letter-spacing: 0.04em;
  }
  .footer-terms a:hover { color: var(--text); }
  @media (max-width: 1024px) {
    footer { padding-left: 32px; padding-right: 32px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
  }
  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
`;

const STUDIO_LINKS = [
  { label: 'Home' },
  { label: 'Works', count: 17 },
  { label: 'Expertise', count: 6 },
  { label: 'About' },
  { label: 'Journal', count: 33 },
];

const COMPANY_LINKS = [
  { label: 'Awards', count: 59 },
  { label: 'Brands', count: 141 },
  { label: 'Careers', count: 4 },
  { label: 'Inquiries' },
  { label: 'Transform →' },
];

const SOCIAL_LINKS = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Behance'];
const SOCIAL_SHORT = ['Fb', 'Ig', 'Tw', 'In', 'Bē'];

function FooterLinkList({ links }) {
  return (
    <ul className="footer-links">
      {links.map(({ label, count }) => (
        <li key={label}>
          <a href="#">
            {label}
            {count != null && <span className="f-count">{count}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <>
      <style>{footerStyles}</style>
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="footer-logo"><em>Fleava</em></a>
            <p className="footer-tagline">Bali, Jakarta &amp; Singapore's leading Creative Digital Agency.</p>

            <div className="footer-addr">
              <div className="footer-addr-country">Singapore</div>
              <div className="footer-addr-text">
                <strong style={{ fontWeight: 400, display: 'block', fontSize: 12, color: 'var(--text2)' }}>FLEAVA PTE. LTD.</strong>
                160 Robinson Road, #14-04<br />
                Singapore Business Federation<br />
                Centre - 068914, Singapore
              </div>
            </div>

            <div className="footer-addr" style={{ marginTop: 20 }}>
              <div className="footer-addr-country">Bali, Indonesia</div>
              <div className="footer-addr-text">
                <strong style={{ fontWeight: 400, display: 'block', fontSize: 12, color: 'var(--text2)' }}>PT FLEAVA DIGITAL MEDIA</strong>
                Jalan Merta Agung, No.25,<br />
                Kerobokan Kelod, Badung,<br />
                Bali - 80361, Indonesia
              </div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Studio</div>
            <FooterLinkList links={STUDIO_LINKS} />
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <FooterLinkList links={COMPANY_LINKS} />
          </div>

          <div>
            <div className="footer-col-title">Follow</div>
            <ul className="footer-links">
              {SOCIAL_LINKS.map(s => (
                <li key={s}><a href="#">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2024 <a href="#" style={{ color: 'inherit' }}>Fleava.</a></div>
          <div className="footer-socials">
            {SOCIAL_SHORT.map(s => <a href="#" key={s}>{s}</a>)}
          </div>
          <div className="footer-terms">
            <a href="#">Terms.</a>
            <a href="#">Sitemap.</a>
          </div>
        </div>
      </footer>
    </>
  );
}
