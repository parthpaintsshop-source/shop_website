'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './owner.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function OwnerIntroduction() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 }, scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
        .from('[data-owner-panel]', { scaleY: 0.85, opacity: 0, transformOrigin: 'bottom' }, 0)
        .from('[data-owner-frame]', { clipPath: 'inset(100% 0 0 0)', y: 16, duration: 1.3 }, 0.12)
        .from('[data-owner-name]', { yPercent: 105, stagger: 0.1 }, 0.35)
        .from('[data-owner-detail]', { y: 12, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.55);
      const media = gsap.matchMedia();
      media.add('(min-width: 800px)', () => {
        gsap.fromTo('[data-owner-portrait]', { y: 6 }, { y: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
        gsap.fromTo('[data-owner-swatches]', { y: 12 }, { y: -12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return <section ref={root} className={styles.owner} aria-labelledby="owner-title">
    <div className={styles.sectionLabel}><span>A personal welcome</span><span>Parth Paints / Aspur</span></div>
    <div className={styles.composition}>
      <figure className={styles.portrait}>
        <div className={styles.panel} data-owner-panel aria-hidden="true" />
        <div className={styles.frame} data-owner-frame><div className={styles.photo} data-owner-portrait><Image src="/images/owner.jpeg" alt="Mr. Gopal Sevak, proprietor of Parth Paints" fill sizes="(max-width: 799px) 262px, 336px" /></div></div>
        <div className={styles.swatches} data-owner-swatches aria-hidden="true"><i /><i /><i /></div>
        <figcaption>Mr. Gopal Sevak <span>Proprietor, Parth Paints</span></figcaption>
      </figure>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Meet the person behind Parth Paints</p>
        <h2 id="owner-title"><span className={styles.mask}><span data-owner-name>Mr. Gopal</span></span><span className={styles.mask}><em data-owner-name>Sevak.</em></span></h2>
        <p className={styles.role} data-owner-detail>Proprietor, Parth Paints</p>
        <p className={styles.introduction} data-owner-detail>Behind every beautiful space is a thoughtful choice of colour. At Parth Paints, Mr. Gopal Sevak welcomes customers looking for the right paints and finishes for their spaces.</p>
        <div className={styles.experience} data-owner-detail><strong>10+ <span>years of experience</span></strong><p>Serving trust.</p></div>
        <a className={styles.cta} href="#contact" data-owner-detail>Visit Parth Paints <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>;
}
