'use client';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { COLOUR_STORIES } from '@/lib/showroom';
import { NEROLAC } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './showroom.module.css';

export default function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = element.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step = first.offsetWidth + parseFloat(getComputedStyle(element).columnGap || '0');
        setActive(Math.max(0, Math.min(COLOUR_STORIES.length - 1, Math.round(element.scrollLeft / step))));
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); resize.disconnect(); element.removeEventListener('scroll', update); };
  }, []);

  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    const target = element.children[Math.max(0, Math.min(index, COLOUR_STORIES.length - 1))] as HTMLElement;
    const padding = parseFloat(getComputedStyle(element).paddingLeft);
    element.scrollTo({ left: target.offsetLeft - padding, behavior: reducedMotion ? 'instant' : 'smooth' });
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const index = event.key === 'ArrowRight' ? active + 1 : event.key === 'ArrowLeft' ? active - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? COLOUR_STORIES.length - 1 : null;
    if (index !== null) { event.preventDefault(); goTo(index); }
  }

  return (
    <section id="room-explorer" className={styles.stories} aria-labelledby="stories-title">
      <div id="gallery" className={styles.anchor} />
      <div className={styles.sectionTop}><p className={styles.eyebrow}>03 / Colour stories</p><span className={styles.smallNote}>A little inspiration goes a long way.</span></div>
      <div className={styles.sectionHeading}><h2 id="stories-title" data-editorial-title>Not just a shade.<br /><em>A state of mind.</em></h2><div className={styles.galleryArrows}><span aria-live="polite">0{active + 1} <small>/ 0{COLOUR_STORIES.length}</small></span><div><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous colour story">←</button><button type="button" onClick={() => goTo(active + 1)} disabled={active === COLOUR_STORIES.length - 1} aria-label="Next colour story">→</button></div></div></div>
      <div ref={track} className={styles.storyTrack} onKeyDown={onKeyDown} tabIndex={0} role="region" aria-label="Colour inspiration gallery. Swipe or use arrow keys to explore." data-lenis-prevent>
        {COLOUR_STORIES.map((story, index) => <article className={styles.story} key={story.mood} aria-label={`${index + 1} of ${COLOUR_STORIES.length}: ${story.title}`}>
          <div className={styles.storyImage} data-story-image><Image src={story.image} alt={story.alt} fill sizes="(max-width: 800px) 86vw, 65vw" style={{ objectPosition: index === 0 ? '32% center' : index === 2 ? '65% center' : '48% center' }} /></div>
          <div className={styles.storyScrim} /><div className={styles.storyContent}><p>{story.mood}</p><h3>{story.title}</h3><span>{story.text}</span><div className={styles.storyPalette} aria-label="Illustrative palette">{story.palette.map(color => <i key={color} style={{ background: color }} aria-label={color} />)}</div></div>
        </article>)}
      </div>
      <div className={styles.galleryPagination} role="group" aria-label="Choose a colour story">{COLOUR_STORIES.map((story, index) => <button key={story.mood} type="button" aria-label={`Show ${story.mood}`} aria-pressed={active === index} onClick={() => goTo(index)}><span /></button>)}</div>
      <div className={styles.storyBottom}><p>Curated inspiration. Screen colours are approximate.<br />Match your choice to a physical shade card in store.</p><div><a className={styles.lightLink} href={NEROLAC.catalogue} target="_blank" rel="noreferrer">Explore Nerolac shades ↗</a><a className={styles.lightLink} href={NEROLAC.visualizer} target="_blank" rel="noreferrer">Try Nerolac’s visualizer ↗</a></div></div>
    </section>
  );
}
