'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { NAV_LINKS, STORE_INFO } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './navbar.module.css';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || window.scrollY > 60) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -10, opacity: 0.65, duration: 0.8,
        delay: 0.4, ease: 'power2.out' });
    }, navRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Scroll detection for navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    const ctx = gsap.context(() => {
      if (isMobileOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: 'power3.out',
        });
        gsap.fromTo(
          linkRefs.current.filter(Boolean),
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, stagger: prefersReducedMotion ? 0 : 0.07, duration: prefersReducedMotion ? 0 : 0.5, ease: 'power3.out', delay: prefersReducedMotion ? 0 : 0.2 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: 'power3.inOut',
        });
      }
    }, mobileMenuRef);
    // Preserve the current transform so interrupted open/close tweens stay smooth.
    return () => ctx.kill(false);
  }, [isMobileOpen, prefersReducedMotion]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const toggle = toggleRef.current;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = () => {
      if (desktop.matches) setIsMobileOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
      }
      if (event.key !== 'Tab') return;
      const items = mobileMenuRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
      if (!desktop.matches) toggle?.focus();
    };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${!isScrolled ? styles.overHero : ''} ${
          isScrolled
            ? 'bg-[#FAF6F1]/95 backdrop-blur-md shadow-[0_1px_0_rgba(184,175,166,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a href="#" className="flex flex-col">
              <span className="font-display text-lg md:text-xl tracking-[0.2em] uppercase text-[#2C2C2C]">
                Parth Paints
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#B8AFA6]">
                {STORE_INFO.tagline}
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative text-sm tracking-wide text-[#4A4A4A] hover:text-[#2C2C2C] transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#722F37] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#722F37] text-[#FAF6F1] rounded-full px-5 py-2.5 text-sm tracking-wide hover:bg-[#5A252C] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.688-1.228A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.315 0-4.458-.764-6.18-2.054l-.175-.137-3.628.951.968-3.536-.15-.239A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              WhatsApp
            </a>

            {/* Mobile Hamburger */}
            <button
              ref={toggleRef}
              type="button"
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              <span
                className={`block w-6 h-px bg-[#2C2C2C] transition-all duration-300 ${
                  isMobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-[#2C2C2C] transition-all duration-300 ${
                  isMobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={isMobileOpen ? true : undefined}
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
        data-lenis-prevent
        className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#FAF6F1] z-50 lg:hidden shadow-2xl translate-x-full"
      >
        <button ref={closeRef} type="button" onClick={() => setIsMobileOpen(false)}
          className="absolute right-6 top-6 w-10 h-10 text-2xl text-[#2C2C2C]"
          aria-label="Close menu">×</button>
        <div className="flex flex-col justify-center h-full px-10">
          <div className="flex flex-col gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-display text-[#2C2C2C] hover:text-[#722F37] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#B8AFA6]/30">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#722F37] text-[#FAF6F1] rounded-full px-6 py-3 text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.688-1.228A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.315 0-4.458-.764-6.18-2.054l-.175-.137-3.628.951.968-3.536-.15-.239A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              WhatsApp Us
            </a>
            <p className="mt-4 text-sm text-[#B8AFA6]">{STORE_INFO.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}
