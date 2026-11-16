import Image from 'next/image';
import styles from './cinematic.module.css';

export default function PaintReveal() {
  return (
    <section id="paint-story" className={styles.paintSection} aria-labelledby="paint-title">
      <div className={styles.paintStage}>
        <div className={styles.paintHeading}>
          <div>
            <p className={styles.eyebrow}>02 / A change in perspective</p>
            <h2 id="paint-title" className={`font-display ${styles.paintTitle}`}>Same space.<br /><em className="font-accent">New possibilities.</em></h2>
          </div>
          <p className={styles.paintDescription}>Thoughtful colour. A fresh perspective.<br />Find a shade that changes the way your room feels.</p>
        </div>
        <div className={styles.paintFrame}>
          <Image src="/images/parth-interior.webp" width={1672} height={941}
            sizes="(max-width: 1454px) 88vw, 1280px"
            alt="Sunlit living room with warm ivory walls, an architectural arch and a curved sofa"
            className={styles.paintScene} style={{ objectFit: 'contain' }} />
        </div>
        <div className={styles.paintFoot}>
          <p>Illustrative interior. Find your Nerolac shade in store.</p>
          <a href="#room-explorer" className={styles.paintLink}>Find your colour <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
