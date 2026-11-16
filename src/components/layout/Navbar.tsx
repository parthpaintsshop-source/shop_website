'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { NAV_LINKS, STORE_INFO, inquiryHref } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './navbar.module.css';

export default function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (reduced || window.scrollY > 60) return;
    const ctx = gsap.context(() => {
      gsap.from(nav.current, { y: -12, opacity: 0.65, duration: 0.8, delay: 0.45, ease: 'power2.out' });
    }, nav);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(panel.current, { x: 0, xPercent: open ? 0 : 100, duration: reduced ? 0 : 0.5, ease: 'power3.inOut' });
      if (open) gsap.fromTo('[data-mobile-link]', { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: reduced ? 0 : 0.07, duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15 });
    }, panel);
    return () => ctx.kill(false);
  }, [open, reduced]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const toggleButton = toggle.current;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('parth:menu', { detail: true }));
    close.current?.focus();
    const desktop = window.matchMedia('(min-width: 1000px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const targets = panel.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!targets?.length) return;
      const first = targets[0], last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', keydown); desktop.addEventListener('change', resize);
    return () => {
      document.body.style.overflow = previous;
      window.dispatchEvent(new CustomEvent('parth:menu', { detail: false }));
      document.removeEventListener('keydown', keydown); desktop.removeEventListener('change', resize);
      if (!desktop.matches) toggleButton?.focus();
    };
  }, [open]);

  return (<>
    <nav ref={nav} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Main navigation">
      <a className={styles.brand} href="#home" aria-label="Parth Paints home">
        <Image className={styles.logo} src="/images/logo.png" alt="" width={52} height={52} priority />
        <span className={styles.brandCopy}>Parth Paints<span className={styles.slogan}>Trusted to Quality</span><span className={styles.dealer}>{STORE_INFO.tagline}</span></span>
      </a>
      <div className={styles.links}>{NAV_LINKS.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? 'location' : undefined}>{link.label}</a>)}</div>
      <a href={inquiryHref('my painting project')} className={styles.navCta} target="_blank" rel="noreferrer">Let’s talk colour <span aria-hidden="true">↗</span></a>
      <button ref={toggle} type="button" className={styles.menuToggle} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>Menu <span aria-hidden="true">☰</span></button>
    </nav>
    {open && <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />}
    <div ref={panel} id="mobile-navigation" className={styles.panel} role="dialog" aria-label="Navigation" aria-modal={open ? true : undefined} aria-hidden={!open} inert={!open} data-lenis-prevent>
      <button ref={close} className={styles.close} onClick={() => setOpen(false)} type="button" aria-label="Close navigation">Close ×</button>
      <p className={styles.menuEyebrow}>A little colour. A whole new feeling.</p>
      {[...NAV_LINKS, { label: 'Visit the store', href: '#contact' }].map((link, index) => <a key={link.href} data-mobile-link href={link.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{link.label}<span aria-hidden="true">↗</span></a>)}
      <div className={styles.menuContact}><span>Aspur, Dungarpur</span><a href={`tel:${STORE_INFO.phone}`}>+91 63772 23181</a><p>{STORE_INFO.hours}</p></div>
    </div>
    <div className={styles.mobileActions} data-visible={Boolean(active && active !== '#home')} aria-hidden={!active || active === '#home'} inert={!active || active === '#home'}>
      <a href={`tel:${STORE_INFO.phone}`}>Call the store</a>
      <a href={inquiryHref('paint options')} target="_blank" rel="noreferrer">WhatsApp ↗</a>
      <a href={STORE_INFO.mapUrl} target="_blank" rel="noreferrer">Directions ↗</a>
    </div>
  </>);
}
