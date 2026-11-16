'use client';
import { useState } from 'react';
import Image from 'next/image';
import { COLLECTIONS } from '@/lib/showroom';
import { inquiryHref, NEROLAC } from '@/lib/constants';
import styles from './showroom.module.css';

export default function Products() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([]);
  const collection = COLLECTIONS[active];
  const displayed = loaded.includes(active) ? active : 0;
  return (
    <section id="products" className={styles.collections} aria-labelledby="collections-title">
      <div className={styles.sectionTop}><p className={styles.eyebrow}>02 / The Nerolac collections</p><span className={styles.smallNote}>For the room. For the home. For what comes next.</span></div>
      <div className={styles.sectionHeading}><h2 id="collections-title" data-editorial-title>A finish for every<br /><em>new beginning.</em></h2><p>Discover your starting point.<br />Ask Parth Paints about current stock and suitable products.</p></div>
      <div className={styles.collectionLayout}>
        <figure className={styles.collectionVisual} data-image-reveal>
          {COLLECTIONS.map((item, index) => <div key={item.id} className={styles.collectionLayer} data-current={displayed === index} aria-hidden={displayed !== index}>
            <Image src={item.image} alt={item.alt} fill sizes="(max-width: 800px) 90vw, 48vw" className={styles.collectionPhoto}
              onLoad={() => setLoaded(previous => previous.includes(index) ? previous : [...previous, index])} />
          </div>)}
          <figcaption>{COLLECTIONS[displayed].caption}</figcaption><span className={styles.visualNumber}>0{displayed + 1}<small>/ 05</small></span>
        </figure>
        <div className={styles.collectionList}>
          {COLLECTIONS.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="collection-description" className={styles.collectionRow}>
            <span className={styles.rowNumber}>0{index + 1}</span><span><strong>{item.title}</strong><small>{item.note}</small></span><span className={styles.rowArrow} aria-hidden="true">↗</span>
          </button>)}
          <div id="collection-description" className={styles.collectionDetail} aria-live="polite"><p>{collection.description}</p><a className={styles.textLink} href={inquiryHref(collection.title)}>Ask about {collection.title.toLowerCase()} <span aria-hidden="true">↗</span></a></div>
          <p className={styles.finePrint}>Collections shown for discovery. Store availability and product suitability require confirmation. <a href={NEROLAC.website} target="_blank" rel="noreferrer">Official Nerolac product information ↗</a></p>
        </div>
      </div>
    </section>
  );
}
