'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORE_INFO, inquiryHref } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './closing.module.css';

gsap.registerPlugin(ScrollTrigger);
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(root.current, { backgroundColor: '#493735' }, { backgroundColor: '#702d39', ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 15%', scrub: 0.6 } });
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: {
        trigger: '[data-invitation-grid]', start: 'top 90%', end: 'top 15%', scrub: 0.5,
      } })
        .fromTo('[data-closing-frame]', { clipPath: 'inset(9% 8% 9% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
        .fromTo('[data-closing-image]', { scale: 1.08 }, { scale: 1, duration: 1.2 }, 0)
        .from('[data-closing-line]', { yPercent: 105, duration: 0.7, stagger: 0.09 }, 0.1)
        .from('[data-closing-detail]', { y: 12, opacity: 0.5, duration: 0.6, stagger: 0.07 }, 0.35);
      gsap.utils.toArray<HTMLElement>('[data-colour-accent]').forEach((accent, index) => {
        gsap.fromTo(accent, { y: 8 + index * 4 }, { y: -8 - index * 3, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.9 } });
      });
      gsap.from('[data-closing-wordmark]', { yPercent: 24, ease: 'none',
        scrollTrigger: { trigger: '[data-closing-wordmark]', start: 'top bottom', end: 'top 75%', scrub: 0.6 } });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="contact" ref={root} className={styles.invitation} aria-labelledby="contact-title">
      <div className={styles.invitationTop}><p className={styles.eyebrow}>05 / Let’s make it yours</p><span>Aspur, Dungarpur · {STORE_INFO.hours}</span></div>
      <div className={styles.invitationGrid} data-invitation-grid>
        <div className={styles.invitationCopy}>
          <h2 id="contact-title"><span className={styles.lineMask}><span data-closing-line>Come for</span></span><span className={styles.lineMask}><span data-closing-line>colour.</span></span><span className={styles.lineMask}><em data-closing-line>Leave inspired.</em></span></h2>
          <p data-closing-detail>Bring a room photograph, a favourite shade,<br />or just an idea. We’ll start there.</p>
          <div className={styles.invitationActions} data-closing-detail><a className={styles.buttonLight} href={inquiryHref('paint and colour options for my space')} target="_blank" rel="noreferrer">Chat on WhatsApp <span aria-hidden="true">↗</span></a><a className={styles.buttonOutline} href={STORE_INFO.mapUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a></div>
          <p className={styles.visitAddress} data-closing-detail>Parth Paints · Opposite Nice Marble<br />Aspur, Dungarpur, Rajasthan</p>
        </div>
        <figure className={styles.invitationFigure}>
          <div className={styles.closingFrame} data-closing-frame><Image data-closing-image src="/images/showroom/closing-interior.webp" alt="Architectural inspiration with warm timber stairs, neutral upholstery and softly lit plaster walls" fill sizes="(max-width: 760px) 88vw, 40vw" /></div>
          <div className={styles.colourAccents} aria-hidden="true"><i data-colour-accent /><i data-colour-accent /><i data-colour-accent /></div>
          <figcaption>Architectural inspiration · not our shop interior.</figcaption>
        </figure>
      </div>
      <div className={styles.wordmarkMask}><p data-closing-wordmark className={styles.wordmark}>Parth Paints<span aria-hidden="true">↗</span></p></div>
      <div className={styles.invitationSignature}><span>{STORE_INFO.tagline}</span><span>A little colour. A whole new feeling.</span></div>
    </section>
  );
}
