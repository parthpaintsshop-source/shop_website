'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const entranceRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
      entranceRef.current = entrance;
      entrance
        .fromTo('[data-image-mask]', { clipPath: 'inset(4% 3% 4% 3% round 8px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.45, ease: 'power3.inOut' }, 0)
        .fromTo('[data-image-entrance]', { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, 0)
        .from('[data-headline]', { yPercent: 105, rotation: 2, transformOrigin: 'left bottom',
          duration: 1.05, stagger: 0.14 }, 0.18)
        .from('[data-hero-detail]', { y: 20, opacity: 0, duration: 0.75, stagger: 0.09 }, 0.65)
        // Links stay visible and interactive throughout the entrance.
        .from('[data-hero-actions]', { y: 12, opacity: 0.35, duration: 0.7 }, 0.8);

      gsap.timeline({ scrollTrigger: {
        trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6,
        invalidateOnRefresh: true,
      } })
        .to('[data-image-parallax]', { yPercent: 12, scale: 1.035, ease: 'none' }, 0)
        .to('[data-hero-copy]', { yPercent: -12, ease: 'none' }, 0)
        .to('[data-image-shade]', { opacity: 0.8, ease: 'none' }, 0);

      // A restored scroll position should never replay the entrance off-screen.
      if (window.scrollY > section.offsetHeight / 2) entrance.progress(1);
    }, section);
    return () => {
      entranceRef.current = null;
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section id="home" ref={sectionRef} className={styles.hero} aria-labelledby="hero-title"
      onFocusCapture={() => entranceRef.current?.progress(1)}>
      <div data-image-mask className={styles.imageMask}>
        <div data-image-parallax className={styles.imageParallax}>
          <div data-image-entrance className={styles.imageEntrance}>
            <Image src="/images/parth-interior.webp" alt="Warm architectural living room with sculpted ivory seating, textured walls and an arch in afternoon light"
              fill sizes="100vw" preload className={styles.image} />
          </div>
        </div>
        <div data-image-shade className={styles.shade} />
      </div>
      <div data-hero-copy className={styles.copy}>
        <p data-hero-detail className={styles.kicker}><span className={styles.rule} aria-hidden="true" />A new perspective on colour</p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}><span data-headline>Colour,</span></span>
          <span className={styles.line}><span data-headline className={styles.italic}>with feeling.</span></span>
        </h1>
        <div className={styles.lowerCopy}>
          <p data-hero-detail className={styles.description}>The right shade changes everything.<br />Discover a palette that feels like you.</p>
          <div data-hero-actions className={styles.actions}>
            <a href="#room-explorer" className={styles.primary}>Find your colour <span aria-hidden="true">↗</span></a>
            <a href="#contact" className={styles.secondary}>Visit Parth Paints <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <a href="#room-explorer" className={styles.scroll}><span className={styles.scrollTrack} aria-hidden="true" />Scroll to explore colours</a>
        <p className={styles.dealer}>Parth Paints<span>Authorized Nerolac Dealer</span></p>
        <div className={styles.palette} aria-hidden="true"><i /><i /><i /><span>Spaces. Reimagined.</span></div>
      </div>
    </section>
  );
}
