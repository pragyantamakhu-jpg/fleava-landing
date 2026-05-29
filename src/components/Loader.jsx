import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const loaderStyles = `
  #loader {
    position: fixed; inset: 0;
    background: var(--bg);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
  }
  .loader-logo {
    font-family: var(--serif);
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 300;
    letter-spacing: 0.08em;
    color: var(--text);
    margin-bottom: 48px;
    opacity: 0;
  }
  .loader-logo em { font-style: italic; color: var(--accent); }
  .loader-bar-wrap {
    width: 160px; height: 1px;
    background: var(--line);
    position: relative; overflow: hidden;
  }
  .loader-bar {
    position: absolute; left: -100%; top: 0;
    width: 100%; height: 100%;
    background: var(--accent);
  }
  .loader-pct {
    font-size: 11px; letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text3);
    margin-top: 20px;
    font-weight: 400;
  }
`;

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;
    const bar = barRef.current;
    const pct = pctRef.current;
    const loader = loaderRef.current;

    gsap.to(logo, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1 });
    gsap.to(bar, {
      left: '0%',
      duration: 1.6,
      ease: 'power2.inOut',
      delay: 0.2,
      onUpdate: function () {
        const p = Math.min(100, Math.round((this.progress() || 0) * 100));
        if (pct) pct.textContent = p + '%';
      },
      onComplete: () => {
        if (pct) pct.textContent = '100%';
        setTimeout(() => {
          gsap.to(loader, {
            yPercent: -100,
            duration: 1,
            ease: 'power3.inOut',
            onComplete: () => {
              if (loader) loader.style.display = 'none';
              onComplete?.();
            },
          });
        }, 300);
      },
    });
  }, [onComplete]);

  return (
    <>
      <style>{loaderStyles}</style>
      <div id="loader" ref={loaderRef}>
        <div className="loader-logo" ref={logoRef}>
          <em>Fleava</em>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" ref={barRef} />
        </div>
        <div className="loader-pct" ref={pctRef}>0%</div>
      </div>
    </>
  );
}
