'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);
export default function ShowroomMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let disposed = false;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-editorial-title]').forEach(title => {
        gsap.from(title, { y: 25, clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach(image => {
        gsap.from(image, { clipPath: 'inset(5% 3% 5% 3%)', duration: 1.3, ease: 'power3.inOut',
          scrollTrigger: { trigger: image, start: 'top 90%', once: true } });
      });
      const media = gsap.matchMedia();
      media.add('(min-width: 800px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-story-image]').forEach(image => {
          gsap.fromTo(image, { yPercent: -2 }, { yPercent: 2, ease: 'none',
            scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
        });
      });

    }, root);
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; ctx.revert(); };
  }, [reduced]);
  return <div ref={root}>{children}</div>;
}
