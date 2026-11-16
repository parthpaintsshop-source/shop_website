import Image from 'next/image';
import { STORE_INFO } from '@/lib/constants';
import styles from './closing.module.css';

export default function WhyUs() {
  return (
    <section id="why-us" className={styles.about} aria-labelledby="about-title">
      <figure className={styles.aboutFigure}>
        <div className={styles.figureTop}><span>Parth Paints</span><small>Aspur / Dungarpur</small></div>
        <div className={styles.aboutImage} data-image-reveal><Image src="/images/showroom/soft-neutral.webp" alt="Neutral living-room inspiration with warm timber, soft seating and naturally lit walls" fill sizes="(max-width: 760px) 88vw, 46vw" /></div>
        <figcaption>Interior inspiration photograph · not a photograph of our store.</figcaption>
      </figure>
      <div className={styles.aboutCopy}>
        <p className={styles.eyebrow}>04 / A place to begin</p>
        <h2 id="about-title" data-editorial-title>Your ideas.<br /><em>Our starting point.</em></h2>
        <p className={styles.aboutDescription}>A room you love. A shade you keep coming back to. Bring your inspiration to Parth Paints and make the next step a conversation.</p>
        <p className={styles.aboutDescription}><strong>10+ years of experience.</strong><br />Serving trust.</p>
        <div className={styles.storeProof}><p><span>Your local destination</span>Aspur, Dungarpur</p><p><span>Paints you know</span>{STORE_INFO.tagline}</p></div>
        <p className={styles.aboutNote}>Bring room photos and shortlisted colours. Ask us about current stock, finishes and suitable preparation before you decide.</p>
        <a href="#contact" className={styles.darkLink}>Come explore the possibilities <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
