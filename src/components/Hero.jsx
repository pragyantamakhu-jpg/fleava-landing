import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const heroStyles = `
  #hero {
    position: relative;
    height: 100vh; min-height: 600px;
    overflow: hidden;
  }
  .hero-slides { position: absolute; inset: 0; }
  .hero-slide {
    position: absolute; inset: 0;
    opacity: 0; transition: opacity 1.2s var(--ease2);
    pointer-events: none;
  }
  .hero-slide.active { opacity: 1; pointer-events: all; }
  .hero-slide-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transform: scale(1.05);
    transition: transform 8s linear;
  }
  .hero-slide.active .hero-slide-bg { transform: scale(1); }
  .hero-slide-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to right,
      rgba(12,12,10,0.75) 0%,
      rgba(12,12,10,0.3) 60%,
      rgba(12,12,10,0.15) 100%
    );
  }
  .slide-bg-1 { background: linear-gradient(135deg,#0c0c0a 0%,#1a1410 30%,#251a0e 60%,#1a1008 100%); }
  .slide-bg-2 { background: linear-gradient(135deg,#080c14 0%,#0d1525 30%,#0a1020 60%,#060c18 100%); }
  .slide-bg-3 { background: linear-gradient(135deg,#080c0a 0%,#0d1810 30%,#0a140e 60%,#060b08 100%); }
  .slide-bg-4 { background: linear-gradient(135deg,#0c0a0e 0%,#160d1a 30%,#110a14 60%,#080610 100%); }
  .slide-bg-5 { background: linear-gradient(135deg,#0e0c08 0%,#1c180a 30%,#14100a 60%,#0a0806 100%); }
  .slide-art {
    position: absolute;
    right: 10%; top: 50%;
    transform: translateY(-50%);
    width: min(44vw, 600px);
    aspect-ratio: 16/10;
    opacity: 0.55;
    pointer-events: none;
  }
  .slide-art-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(200,169,110,0.18);
  }
  .slide-art-line { position: absolute; background: rgba(200,169,110,0.12); }

  .hero-content {
    position: absolute;
    bottom: 120px; left: 60px;
    z-index: 10;
    max-width: 680px;
  }
  .hero-slide-num {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text3); font-weight: 400;
    margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-slide-num::before { content: ''; width: 24px; height: 1px; background: var(--text3); }
  .hero-slide-tag {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); font-weight: 400; margin-bottom: 12px;
  }
  .hero-slide-title {
    font-family: var(--serif);
    font-size: clamp(40px, 6vw, 86px);
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin-bottom: 0;
  }
  .hero-slide-title em { font-style: italic; color: var(--accent2); }
  .hero-link {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 13px; letter-spacing: 0.08em;
    text-transform: uppercase; font-weight: 400;
    color: var(--text2);
    margin-top: 32px;
    transition: color .3s;
    border-bottom: 1px solid transparent;
  }
  .hero-link:hover { color: var(--text); border-bottom-color: var(--line2); }

  .hero-nav {
    position: absolute; bottom: 48px; right: 60px;
    z-index: 10;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-nav-btn {
    width: 44px; height: 44px;
    border: 1px solid var(--line2);
    border-radius: 50%;
    background: none;
    display: flex; align-items: center; justify-content: center;
    color: var(--text2);
    transition: border-color .3s, color .3s, transform .3s var(--ease1);
    font-size: 18px;
  }
  .hero-nav-btn:hover { border-color: var(--accent); color: var(--accent); transform: scale(1.08); }
  .hero-dots {
    position: absolute; bottom: 60px; left: 60px;
    z-index: 10; display: flex; gap: 8px;
  }
  .hero-dot {
    width: 20px; height: 2px;
    background: var(--text3);
    transition: background .4s, width .4s var(--ease1);
    border-radius: 1px;
    cursor: none;
    border: none;
    padding: 0;
  }
  .hero-dot.active { background: var(--accent); width: 40px; }
  .hero-scroll-hint {
    position: absolute; right: 60px; top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    writing-mode: vertical-rl;
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text3); font-weight: 400;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-scroll-hint::after {
    content: ''; width: 1px; height: 50px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @media (max-width: 1024px) {
    .hero-content { left: 32px; bottom: 80px; }
    .hero-scroll-hint { right: 32px; }
    .hero-nav { right: 32px; }
    .hero-dots { left: 32px; }
  }
  @media (max-width: 768px) {
    .slide-art { display: none; }
  }
`;

const SLIDES = [
  {
    num: '/ 01',
    tag: '/ Digital Agency',
    title: 'Elevating Brands<br>through <em>Digital</em><br>Innovation.',
    link: 'About Fleava',
    bgClass: 'slide-bg-1',
    art: (
      <>
        <div className="slide-art-circle" style={{ width: 340, height: 340, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="slide-art-circle" style={{ width: 220, height: 220, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="slide-art-circle" style={{ width: 80, height: 80, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(200,169,110,0.04)' }} />
        <div className="slide-art-line" style={{ width: 1, height: 200, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="slide-art-line" style={{ height: 1, width: 200, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      </>
    ),
  },
  {
    num: '/ 02',
    tag: '/ Work — Fine Dine Club',
    title: "The World's most<br><em>Exquisite</em><br>dishes Digital Art.",
    link: 'View Project',
    bgClass: 'slide-bg-2',
    art: (
      <>
        <div className="slide-art-circle" style={{ width: 400, height: 280, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%' }} />
        <div className="slide-art-circle" style={{ width: 260, height: 180, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%' }} />
        <div className="slide-art-circle" style={{ width: 120, height: 120, top: '30%', left: '70%', transform: 'translate(-50%,-50%)' }} />
      </>
    ),
  },
  {
    num: '/ 03',
    tag: '/ Work — Capsll',
    title: 'Share your<br>Life Stories.<br><em>Generationally.</em>',
    link: 'View Project',
    bgClass: 'slide-bg-3',
    art: (
      <>
        <div className="slide-art-circle" style={{ width: 300, height: 300, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="slide-art-line" style={{ width: 2, height: 280, top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(30deg)' }} />
        <div className="slide-art-line" style={{ width: 2, height: 280, top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-30deg)' }} />
      </>
    ),
  },
  {
    num: '/ 04',
    tag: '/ Work — Karma Group',
    title: 'Revamping Global<br><em>Lifestyle</em><br>Brand.',
    link: 'View Project',
    bgClass: 'slide-bg-4',
    art: (
      <>
        <div className="slide-art-circle" style={{ width: 360, height: 360, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ position: 'absolute', width: 180, height: 180, top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(45deg)', border: '1px solid rgba(200,169,110,0.14)' }} />
      </>
    ),
  },
  {
    num: '/ 05',
    tag: '/ Work — The Body Shop®',
    title: 'Aesthetic Mobile<br><em>Commerce</em><br>Experience.',
    link: 'View Project',
    bgClass: 'slide-bg-5',
    art: (
      <>
        <div className="slide-art-circle" style={{ width: 320, height: 320, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="slide-art-circle" style={{ width: 200, height: 200, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="slide-art-circle" style={{ width: 60, height: 60, top: '20%', left: '30%' }} />
      </>
    ),
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const numRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const linkRef = useRef(null);

  const goSlide = useCallback((idx) => {
    const next = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;

    const els = [numRef.current, tagRef.current, titleRef.current, linkRef.current].filter(Boolean);
    gsap.to(els, {
      opacity: 0, y: 16, duration: 0.25, stagger: 0.04, ease: 'power2.in',
      onComplete: () => {
        setCurrent(next);
        gsap.to(els, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
      },
    });

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goSlide(next + 1), 5500);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => goSlide(current + 1), 5500);
    return () => clearInterval(timerRef.current);
  }, []); // eslint-disable-line

  const slide = SLIDES[current];

  return (
    <>
      <style>{heroStyles}</style>
      <section id="hero" aria-label="Hero Slideshow">
        <div className="hero-slides">
          {SLIDES.map((s, i) => (
            <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`} data-index={i}>
              <div className={`hero-slide-bg ${s.bgClass}`}>
                <div className="slide-art">{s.art}</div>
              </div>
              <div className="hero-slide-overlay" />
            </div>
          ))}
        </div>

        <div className="hero-content" id="hero-content">
          <div className="hero-slide-num" ref={numRef}>{slide.num}</div>
          <div className="hero-slide-tag" ref={tagRef}>{slide.tag}</div>
          <h1
            className="hero-slide-title"
            ref={titleRef}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
          <a href="#intro" className="hero-link" ref={linkRef}>
            {slide.link} →
          </a>
        </div>

        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? 'active' : ''}`}
              onClick={() => goSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero-nav">
          <button className="hero-nav-btn" onClick={() => goSlide(current - 1)} aria-label="Previous slide">←</button>
          <button className="hero-nav-btn" onClick={() => goSlide(current + 1)} aria-label="Next slide">→</button>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">Scroll Down</div>
      </section>
    </>
  );
}
