import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export function SectionLabel({ children, className = '', style = {} }) {
  return (
    <div className={`section-label ${className}`} style={style}>
      {children}
    </div>
  );
}

/**
 * Hook that registers a GSAP scroll-triggered reveal on a ref.
 * Returns a ref to attach to any element.
 *
 * Usage:
 *   const ref = useReveal();
 *   <div ref={ref}>...</div>
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: options.start ?? 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 1,
          delay: options.delay ?? 0,
          ease: options.ease ?? 'power3.out',
        });
      },
    });

    return () => trigger.kill();
  }, [options.delay, options.duration, options.ease, options.start]);

  return ref;
}

/**
 * Wrapper component that applies scroll-triggered reveal to its child wrapper.
 * Usage: <Reveal delay={0.1}><YourComponent /></Reveal>
 */
export function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useReveal({ delay });

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
