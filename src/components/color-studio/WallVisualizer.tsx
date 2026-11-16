'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { prepareLighting, recolorWall } from '@/lib/color-studio/render';
import type { RoomPreset } from '@/lib/color-studio/rooms';
import styles from './studio.module.css';

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const img = new window.Image();
  img.onload = () => resolve(img);
  img.onerror = () => reject(new Error('The room photograph or wall mask could not be loaded.'));
  img.src = src;
});

export default function WallVisualizer({ room, wallId, hex, mode, comparison }: {
  room: RoomPreset; wallId: string | null; hex: string; mode: 'preview' | 'original' | 'compare'; comparison: number;
}) {
  const previous = useRef<HTMLCanvasElement>(null);
  const current = useRef<HTMLCanvasElement>(null);
  const pixels = useRef<{ lighting: Float32Array; mask: Uint8ClampedArray } | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const reducedMotion = useReducedMotion();
  const wall = room.walls.find(item => item.id === wallId) ?? room.walls[0];

  useEffect(() => {
    let cancelled = false;
    pixels.current = null;
    Promise.all([loadImage(room.image), loadImage(wall.mask)]).then(([photo, mask]) => {
      if (cancelled) return;
      if (photo.naturalWidth !== room.width || photo.naturalHeight !== room.height
        || mask.naturalWidth !== room.width || mask.naturalHeight !== room.height) throw new Error('The wall mask does not match the photograph.');
      const buffer = document.createElement('canvas');
      buffer.width = room.width; buffer.height = room.height;
      const ctx = buffer.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('This browser cannot render the wall preview.');
      ctx.drawImage(photo, 0, 0);
      const original = ctx.getImageData(0, 0, room.width, room.height).data;
      ctx.clearRect(0, 0, room.width, room.height);
      ctx.drawImage(mask, 0, 0);
      const alpha = ctx.getImageData(0, 0, room.width, room.height).data;
      pixels.current = { lighting: prepareLighting(original, alpha, wall.referenceLuminance), mask: alpha };
      setReady(true);
    }).catch(reason => { if (!cancelled) setError(reason instanceof Error ? reason.message : 'Preview unavailable.'); });
    return () => { cancelled = true; };
  }, [room, wall]);

  useEffect(() => {
    if (!ready || !pixels.current) return;
    const animatedCanvas = current.current;
    const frame = requestAnimationFrame(() => {
      const canvas = current.current;
      const old = previous.current;
      const data = pixels.current;
      if (!canvas || !old || !data) return;
      const ctx = canvas.getContext('2d');
      const oldCtx = old.getContext('2d');
      if (!ctx || !oldCtx) return;
      // Retain the preceding shade under the new layer while it fades in.
      oldCtx.clearRect(0, 0, room.width, room.height);
      oldCtx.drawImage(canvas, 0, 0);
      ctx.putImageData(new ImageData(recolorWall(data.lighting, data.mask, hex), room.width, room.height), 0, 0);
      if (!reducedMotion) canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, easing: 'ease-out' });
    });
    return () => {
      cancelAnimationFrame(frame);
      animatedCanvas?.getAnimations().forEach(animation => animation.cancel());
    };
  }, [ready, hex, reducedMotion, room]);

  return (
    <div className={styles.scene} style={{ aspectRatio: `${room.width}/${room.height}` }}>
      <Image src={room.image} width={room.width} height={room.height} alt={room.alt}
        sizes="(max-width: 900px) 92vw, 60vw" preload unoptimized />
      <div className={styles.paintLayer} style={{ visibility: mode === 'original' || !wallId ? 'hidden' : 'visible', clipPath: mode === 'compare' ? `inset(0 ${100 - comparison}% 0 0)` : undefined }} aria-hidden="true">
        <canvas ref={previous} width={room.width} height={room.height} />
        <canvas ref={current} width={room.width} height={room.height} />
      </div>
      {mode === 'compare' && <div className={styles.divider} style={{ left: `${comparison}%` }} aria-hidden="true"><span>↔</span></div>}
      <span className={styles.sceneLabel}>{!wallId ? 'Tap a numbered wall to begin' : mode === 'original' ? 'Original photograph' : mode === 'compare' ? 'Preview / Original' : wall.name}</span>
      {!ready && <p className={styles.imageStatus} role="status">{error || 'Preparing wall preview…'}</p>}
      {error && ready && <p className={styles.imageStatus} role="alert">{error}</p>}
      <noscript><p className={styles.imageStatus}>Enable JavaScript to try wall colours. The original photograph is shown.</p></noscript>
    </div>
  );
}
