'use client';
import { useSyncExternalStore } from 'react';
import { STORE_INFO, NAV_LINKS, NEROLAC } from '@/lib/constants';
import styles from '../sections/closing.module.css';
const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const serverYear = () => null;
export default function Footer() {
  const year = useSyncExternalStore(subscribe, getYear, serverYear);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div><a className={styles.footerBrand} href="#home" aria-label="Parth Paints, back to top">Parth Paints ↗</a><p>Opposite Nice Marble<br />Aspur, Dungarpur, Rajasthan</p><a href={STORE_INFO.mapUrl} target="_blank" rel="noreferrer">Directions ↗</a></div>
        <div><h2>Get in touch</h2><a href={`tel:${STORE_INFO.phone}`}>+91 63772 23181</a><a href={`tel:${STORE_INFO.secondaryPhone}`}>+91 70732 90182</a><a href={`mailto:${STORE_INFO.email}`}>{STORE_INFO.email}</a></div>
        <div><h2>Drop by</h2><p>Every day<br /><strong>8 AM–8 PM</strong></p><details className={styles.mapDetails}><summary>View map</summary><iframe title="Parth Paints location in Aspur, Dungarpur" src="https://maps.google.com/maps?q=23.952773,74.083259&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></details></div>
        <nav aria-label="Footer navigation">{NAV_LINKS.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}<a href={NEROLAC.catalogue} target="_blank" rel="noreferrer">Nerolac catalogue ↗</a></nav>
      </div>
      <div className={styles.footerLegal}><p>© {year} Parth Paints</p><span>{STORE_INFO.tagline}</span><a href="#home">Back to top ↑</a></div>
    </footer>
  );
}
