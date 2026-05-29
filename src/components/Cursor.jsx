import { useEffect, useRef } from 'react';

const cursorStyles = `
  #cur {
    position: fixed; top: 0; left: 0;
    width: 8px; height: 8px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width .3s var(--ease1), height .3s var(--ease1), background .3s;
    will-change: transform;
  }
  #cur-o {
    position: fixed; top: 0; left: 0;
    width: 32px; height: 32px;
    border: 1px solid rgba(200,169,110,0.35);
    border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width .4s var(--ease1), height .4s var(--ease1), opacity .3s;
    will-change: transform;
  }
  body.cur-big #cur { width: 60px; height: 60px; background: rgba(200,169,110,0.15); }
  body.cur-big #cur-o { opacity: 0; }
  body.cur-sm #cur { width: 4px; height: 4px; }
  body.cur-sm #cur-o { width: 24px; height: 24px; }
  @media (max-width: 768px) {
    #cur, #cur-o { display: none; }
  }
`;

export default function Cursor() {
  const curRef = useRef(null);
  const curORef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const cur = curRef.current;
    const curO = curORef.current;
    if (!cur || !curO) return;

    const onMouseMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      cur.style.left = e.clientX + 'px';
      cur.style.top = e.clientY + 'px';
    };

    const animate = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.1;
      p.ry += (p.my - p.ry) * 0.1;
      curO.style.left = p.rx + 'px';
      curO.style.top = p.ry + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    const addSmall = () => document.body.classList.add('cur-sm');
    const removeSmall = () => document.body.classList.remove('cur-sm');
    const addBig = () => document.body.classList.add('cur-big');
    const removeBig = () => document.body.classList.remove('cur-big');

    const interactiveEls = document.querySelectorAll('a, button');
    const bigEls = document.querySelectorAll('.hero-slide-bg, .intro-about-block');

    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', addSmall);
      el.addEventListener('mouseleave', removeSmall);
    });
    bigEls.forEach(el => {
      el.addEventListener('mouseenter', addBig);
      el.addEventListener('mouseleave', removeBig);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{cursorStyles}</style>
      <div id="cur" ref={curRef} />
      <div id="cur-o" ref={curORef} />
    </>
  );
}
