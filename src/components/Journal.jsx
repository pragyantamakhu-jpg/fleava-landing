import { SectionLabel, Reveal } from './shared';

const journalStyles = `
  #journal {
    padding: 100px 60px;
    border-bottom: 1px solid var(--line);
  }
  .journal-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 60px;
  }
  .journal-heading {
    font-family: var(--serif);
    font-size: clamp(32px, 4vw, 54px);
    font-weight: 300;
    letter-spacing: -0.01em;
  }
  .journal-heading em { font-style: italic; color: var(--accent2); }
  .journal-all {
    font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 400;
    color: var(--text3);
    display: flex; align-items: center; gap: 8px;
    transition: color .3s;
  }
  .journal-all:hover { color: var(--text); }
  .journal-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .journal-card {
    background: var(--bg);
    padding: 40px 36px;
    display: flex; flex-direction: column;
    cursor: none;
    transition: background .4s;
    position: relative; overflow: hidden;
  }
  .journal-card:hover { background: var(--bg2); }
  .journal-card-img {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 3px;
    margin-bottom: 28px;
    overflow: hidden;
    position: relative;
  }
  .journal-card-img-inner {
    width: 100%; height: 100%;
    background-size: cover; background-position: center;
    transition: transform .8s var(--ease1);
    filter: saturate(0.55) brightness(0.65);
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .journal-card:hover .journal-card-img-inner { transform: scale(1.06); filter: saturate(0.8) brightness(0.8); }
  .journal-meta {
    font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); font-weight: 400; margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .journal-meta-div { color: var(--text3); }
  .journal-card-title {
    font-family: var(--serif);
    font-weight: 300; line-height: 1.3;
    flex: 1;
  }
  .journal-card-title-lg { font-size: clamp(20px, 2vw, 28px); }
  .journal-card-title-sm { font-size: 18px; }
  .journal-excerpt {
    font-size: 14px; color: var(--text2); line-height: 1.7;
    margin-top: 12px; font-weight: 300;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  .journal-card-footer {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
    display: flex; justify-content: space-between; align-items: center;
  }
  .journal-date { font-size: 12px; color: var(--text3); font-weight: 300; }
  .journal-read-more {
    font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text3);
    transition: color .3s;
    display: flex; align-items: center; gap: 6px;
  }
  .journal-card:hover .journal-read-more { color: var(--accent); }
  @media (max-width: 1024px) {
    #journal { padding-left: 32px; padding-right: 32px; }
    .journal-grid { grid-template-columns: 1fr; }
    .journal-header { flex-direction: column; align-items: flex-start; gap: 16px; }
  }
`;

const ARTICLES = [
  {
    size: 'lg',
    category: 'Insight',
    subcategory: 'Marketing',
    date: 'Jan 2024',
    title: 'Human—centric Brand & Marketing Building an emotional connection with customers is the core principle of human-centered design.',
    excerpt: 'Building an emotional connection with customers is the core principle of human-centered design. We explore why brands that lead with empathy consistently outperform those that don\'t.',
    readLabel: 'Read more →',
    imgContent: (
      <div style={{ width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(200,169,110,0.2)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 15, borderRadius: '50%', border: '1px solid rgba(200,169,110,0.12)' }} />
        <span style={{ fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(200,169,110,0.4)' }}>HCD</span>
      </div>
    ),
    imgBg: 'linear-gradient(135deg,#0c1018 0%,#131c28 40%,#0a1420 80%)',
  },
  {
    size: 'sm',
    category: 'Insight',
    subcategory: 'Technology',
    date: 'Nov 2023',
    title: 'Discover how No-Code Development is changing the future of tech',
    excerpt: 'No-code platforms will be familiar to anyone interested in the future of software and how we interact with computers in a few years.',
    readLabel: 'Read →',
    imgContent: (
      <div style={{ width: 70, height: 70, border: '1px solid rgba(200,169,110,0.2)', transform: 'rotate(45deg)' }} />
    ),
    imgBg: 'linear-gradient(135deg,#080e10 0%,#0e1a1c 40%,#061014 80%)',
  },
  {
    size: 'sm',
    category: 'News',
    subcategory: 'Stories',
    date: 'Oct 2023',
    title: 'Fleava is nominated as the 2024 Agency of the Year on Awwwards',
    excerpt: 'Awwwards recognizes the talent and effort of industry-leading web professionals and agencies all around the world.',
    readLabel: 'Read →',
    imgContent: (
      <span style={{ fontFamily: 'var(--serif)', fontSize: 32, fontStyle: 'italic', color: 'rgba(200,169,110,0.3)' }}>A/Y</span>
    ),
    imgBg: 'linear-gradient(135deg,#100c08 0%,#1c160c 40%,#140e08 80%)',
  },
];

export default function Journal() {
  return (
    <>
      <style>{journalStyles}</style>
      <section id="journal">
        <div className="journal-header">
          <div>
            <Reveal>
              <SectionLabel style={{ marginBottom: 16 }}>Featured Stories</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="journal-heading"><em>Journal</em> &amp; Insights</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href="#" className="journal-all">Explore the Journal →</a>
          </Reveal>
        </div>

        <div className="journal-grid">
          {ARTICLES.map((article, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="journal-card">
                <div className="journal-card-img">
                  <div
                    className="journal-card-img-inner"
                    style={{ background: article.imgBg }}
                  >
                    {article.imgContent}
                  </div>
                </div>
                <div className="journal-meta">
                  {article.category}
                  <span className="journal-meta-div">/</span>
                  {article.subcategory}
                </div>
                <h3 className={`journal-card-title journal-card-title-${article.size}`}>
                  {article.title}
                </h3>
                <p className="journal-excerpt">{article.excerpt}</p>
                <div className="journal-card-footer">
                  <span className="journal-date">{article.date}</span>
                  <span className="journal-read-more">{article.readLabel}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
