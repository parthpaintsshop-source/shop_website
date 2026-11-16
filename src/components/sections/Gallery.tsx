'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Modern Living Room',
    color: '#87A878',
    accent: '#F5F0E8',
    description: 'Sage green walls with natural light',
  },
  {
    id: 2,
    title: 'Cozy Bedroom Suite',
    color: '#C67B5C',
    accent: '#FAF6F1',
    description: 'Warm terracotta for peaceful nights',
  },
  {
    id: 3,
    title: 'Elegant Dining Space',
    color: '#722F37',
    accent: '#F5F0E8',
    description: 'Deep burgundy for intimate gatherings',
  },
  {
    id: 4,
    title: 'Minimal Home Office',
    color: '#F5EBDC',
    accent: '#2C2C2C',
    description: 'Warm ivory for focused productivity',
  },
  {
    id: 5,
    title: 'Spa-inspired Bathroom',
    color: '#7DAEA3',
    accent: '#FAF6F1',
    description: 'Cool eucalyptus for relaxation',
  },
  {
    id: 6,
    title: 'Bold Statement Entry',
    color: '#2C3E50',
    accent: '#FAF6F1',
    description: 'Midnight navy for lasting impressions',
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalScroll = () => Math.max(0, track.scrollWidth - sectionRef.current!.clientWidth);

      gsap.to(track, {
        x: () => -totalScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${Math.max(1, totalScroll())}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#2C2C2C]"
    >
      {/* Section intro (always visible) */}
      <div className="relative z-10 pt-24 md:pt-32 pl-6 md:pl-12 lg:pl-24 pb-12">
        <ScrollReveal>
          <span className="text-xs tracking-[0.25em] uppercase text-[#B8AFA6] mb-4 block">
            Inspiration
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FAF6F1] mb-4">
            Interior Inspiration
          </h2>
          <p className="text-[#B8AFA6] text-lg max-w-md">
            Scroll through curated spaces — each one brought to life by the right shade of paint.
          </p>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className={`flex gap-6 md:gap-8 px-6 md:px-12 lg:px-24 pb-24 md:pb-32 ${
          prefersReducedMotion ? 'overflow-x-auto snap-x snap-mandatory' : ''
        }`}
        style={prefersReducedMotion ? {} : { width: 'max-content' }}
      >
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`relative flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[35vw] h-[60vh] md:h-[65vh] rounded-2xl overflow-hidden group ${
              prefersReducedMotion ? 'snap-center' : ''
            }`}
          >
            {/* Gradient background (placeholder for photos) */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                background: `linear-gradient(160deg, ${item.color}ee 0%, ${item.color} 50%, ${item.color}cc 100%)`,
              }}
            />

            {/* Decorative interior elements */}
            <div className="absolute inset-0 flex items-end justify-center opacity-10 pointer-events-none">
              {/* Simple geometric room suggestion */}
              <div className="w-3/4 h-2/3 border-t-2 border-l-2 border-r-2 border-white/30 rounded-t-lg" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="text-xs tracking-[0.2em] uppercase text-white/60 mb-2 block font-accent">
                0{item.id}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm">
                {item.description}
              </p>
            </div>

            {/* Color swatch indicator */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] font-mono text-white/70 uppercase">
                {item.color}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
