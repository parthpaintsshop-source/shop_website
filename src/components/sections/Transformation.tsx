'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './showroom.module.css';
gsap.registerPlugin(ScrollTrigger);

export default function Transformation() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [manual, setManual] = useState(false);
  const [position, setPosition] = useState(100);
  const reducedMotion = useReducedMotion();

  // Timelines are enabled after the static composition; both images share one
  // camera and crop, so only the registered wall colours change.
  useEffect(() => {
    if (reducedMotion || manual) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 1000px) and (min-height: 760px)', mobile: '(max-width: 999px)', short: '(max-height: 759px)' }, context => {
        const desktop = context.conditions?.desktop;
        const tl = gsap.timeline({ scrollTrigger: {
          trigger: section.current, start: desktop ? 'top top' : 'top 65%',
          end: desktop ? () => `+=${window.innerHeight * 0.65}` : 'bottom 70%',
          pin: desktop ? stage.current : false, scrub: 0.5,
          invalidateOnRefresh: true, anticipatePin: 1,
        } });
        tl.fromTo('[data-after-scene]', { '--scroll-reveal': '100%' }, { '--scroll-reveal': '0%', duration: 1, ease: 'none' }, 0)
          .fromTo('[data-transform-old]', { opacity: 1, y: 0 }, { opacity: 0, y: -20, duration: 0.45 }, 0)
          .fromTo('[data-transform-new]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45 }, 0.4)
          .fromTo('[data-transform-image]', { scale: 1.035 }, { scale: 1, duration: 1, ease: 'none' }, 0);
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion, manual]);

  return (
    <section ref={section} id="transformation" className={styles.transformation} aria-labelledby="transformation-title">
      <div ref={stage} className={styles.transformationStage}>
        <div className={styles.transformationHeading}><p className={styles.eyebrow}>01 / The possibility of paint</p><div className={styles.transformTitles}><h2 id="transformation-title" data-transform-new>Same space.<br /><em>A new feeling.</em></h2><p data-transform-old aria-hidden="true">A familiar room.<br /><em>A fresh perspective.</em></p></div><p className={styles.transformNote}>A considered accent changes the conversation.<br />Scroll to see the room in a different light.</p></div>
        <div className={styles.transformFrame}>
          <div className={styles.transformCamera} data-transform-image>
            <Image src="/images/showroom/neutral-room.webp" alt="Neutral architectural living room before the accent walls change colour" fill sizes="(max-width: 800px) 90vw, 88vw" />
            <div data-after-scene className={styles.afterScene} style={manual ? { '--manual-reveal': `${100 - position}%` } as CSSProperties : undefined}><Image src="/images/showroom/transformed-room.webp" alt="The same room with sage and burgundy accent walls; lighting, furniture and floor preserved" fill sizes="(max-width: 800px) 90vw, 88vw" /></div>
          </div>
          <span className={styles.transformTag}>Two accents. One different atmosphere.</span>
        </div>
        <div className={styles.transformBottom}><p>Illustrative colour study · not a completed Parth Paints project.</p>{manual || reducedMotion ? <label>Compare the room <input type="range" min="0" max="100" value={position} aria-label="Reveal accent wall colours" aria-valuetext={`${position}% of colour reveal shown`} onChange={event => { setManual(true); setPosition(Number(event.target.value)); }} /></label> : <button type="button" onClick={() => setManual(true)}>Compare the room yourself</button>}{manual && !reducedMotion && <button type="button" onClick={() => setManual(false)}>Resume scroll reveal ↗</button>}</div>
      </div>
    </section>
  );
}
