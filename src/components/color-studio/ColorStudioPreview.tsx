'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { findShades, inquiryText, SHADES } from '@/lib/color-studio/shades';
import { LIVING_ROOM, ROOM_OPTIONS } from '@/lib/color-studio/rooms';
import WallVisualizer from './WallVisualizer';
import WallPicker from './WallPicker';
import styles from './studio.module.css';

const FAVORITES_KEY = 'parth-paints:studio-favorites:v1';
const UPDATE_EVENT = 'parth-studio-favorites';
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(UPDATE_EVENT, callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(UPDATE_EVENT, callback); };
}
function readFavorites() { try { return localStorage.getItem(FAVORITES_KEY) ?? '[]'; } catch { return '[]'; } }
const serverFavorites = () => '[]';

export default function ColorStudioPreview({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1';
  const [shade, setShade] = useState(SHADES[3]);
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [mode, setMode] = useState<'preview' | 'original' | 'compare'>('preview');
  const [comparison, setComparison] = useState(50);
  const [wallId, setWallId] = useState<string | null>(null);
  const [showOutlines, setShowOutlines] = useState(true);
  const [notice, setNotice] = useState('');
  const stored = useSyncExternalStore(subscribe, readFavorites, serverFavorites);
  const favorites = useMemo<string[]>(() => {
    try { const parsed: unknown = JSON.parse(stored); return Array.isArray(parsed) ? parsed.filter((code): code is string => typeof code === 'string' && SHADES.some(s => s.code === code)) : []; } catch { return []; }
  }, [stored]);
  const visible = findShades(query, family, onlyFavorites ? favorites : null);
  const wall = LIVING_ROOM.walls.find(item => item.id === wallId);
  const inquiry = inquiryText(shade, LIVING_ROOM.name, wall?.name ?? 'a wall to be selected');

  function selectWall(id: string) {
    setWallId(id);
    setMode('preview');
    setNotice(`Selected: ${LIVING_ROOM.walls.find(item => item.id === id)?.name}. Choose a shade to paint this wall.`);
  }

  function toggleFavorite() {
    const next = favorites.includes(shade.code) ? favorites.filter(code => code !== shade.code) : [...favorites, shade.code];
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(UPDATE_EVENT));
      setNotice(next.includes(shade.code) ? 'Shade saved on this device.' : 'Shade removed from favorites.');
    } catch { setNotice('Favorites could not be saved. Browser storage may be disabled.'); }
  }
  async function copyInquiry() {
    try { await navigator.clipboard.writeText(inquiry); setNotice('Inquiry copied. Paste it into your message to Parth Paints.'); }
    catch { setNotice('Copy is unavailable. Select and copy the inquiry text below.'); }
  }

  return (
    <section id={embedded ? 'room-explorer' : undefined} aria-labelledby="studio-title" className={`${styles.studio} ${embedded ? styles.embedded : ''}`}>
      {!embedded && <header className={styles.header}><Link href="/" className={styles.brand}>Parth Paints<span>Authorized Nerolac Dealer</span></Link><Link href="/">Back to homepage ↗</Link></header>}
      <div className={styles.intro}><p className={styles.eyebrow}>{embedded ? 'Colour Studio' : 'Colour Studio / Proof of concept'}</p><Heading id="studio-title">See your space.<br /><em>In a new light.</em></Heading><p>1. Tap a numbered wall in the photograph.<br />2. Choose a shade to preview it on that wall.</p></div>
      <div className={styles.layout}>
        <section className={styles.preview} aria-label="Room and wall preview">
          <div className={styles.toolbar}><div><label htmlFor="studio-room">Room</label><select id="studio-room" defaultValue="living-room">{ROOM_OPTIONS.map(room => <option key={room.id} value={room.id} disabled={!room.available}>{room.name}{room.available ? '' : ' — coming later'}</option>)}</select></div>
            <div><label htmlFor="studio-wall">Where to paint</label><select id="studio-wall" value={wallId ?? ''} onChange={e => selectWall(e.target.value)}><option value="" disabled>Select a wall</option>{LIVING_ROOM.walls.map((region, index) => <option key={region.id} value={region.id}>{index + 1}. {region.name}</option>)}</select></div></div>
          <div className={styles.roomSurface}>
            <WallVisualizer key={`${LIVING_ROOM.id}:${wallId}`} room={LIVING_ROOM} wallId={wallId} hex={shade.hex} mode={mode} comparison={comparison} />
            <WallPicker room={LIVING_ROOM} selected={wallId} onSelect={selectWall} showOutlines={showOutlines} />
          </div>
          <div className={styles.wallSelection}><p role="status">{wall ? `Painting: ${wall.name}` : 'Choose wall 1 or 2 above to start.'}</p><label><input type="checkbox" checked={showOutlines} onChange={e => setShowOutlines(e.target.checked)} /> Show wall outlines</label></div>
          <div className={styles.comparison}>
            <div className={styles.segment} role="group" aria-label="Comparison mode">{(['original', 'preview', 'compare'] as const).map(value => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)}>{value === 'original' ? 'Before' : value === 'preview' ? 'After' : 'Compare'}</button>)}</div>
            {mode === 'compare' && <label className={styles.range}>Painted area <input type="range" min="0" max="100" value={comparison} onChange={e => setComparison(Number(e.target.value))} aria-label="Before and after split position" aria-valuetext={`${comparison}% painted, ${100 - comparison}% original`} /></label>}
          </div>
          <p className={styles.helper}>Preview one selected wall at a time. The other wall, ceiling, stairs, furniture and floor stay unchanged.</p>
          <p className={styles.credit}>Photograph by <a href={LIVING_ROOM.credit.url} target="_blank" rel="noreferrer">{LIVING_ROOM.credit.photographer} / Pexels ↗</a>. <a href={LIVING_ROOM.credit.license} target="_blank" rel="noreferrer">Photo licence</a>.</p>
        </section>
        <aside className={styles.catalogue} aria-label="Shade catalogue">
          <p className={styles.eyebrow}>The starter edit</p><h2>Find your shade.</h2>
          <p className={styles.helper}>6 shades verified against individual Nerolac pages. This is not the full catalogue.</p>
          <a className={styles.catalogueLink} href="https://www.nerolac.com/colour-catalogue" target="_blank" rel="noreferrer">Browse all Nerolac shades ↗<span>Opens Nerolac’s official catalogue. Only the 6 verified shades below can be previewed here.</span></a>
          <label className={styles.search}>Search by name or code<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try Red Ranch or 4573" /></label>
          <div className={styles.filterRow}><label>Colour family<select value={family} onChange={e => setFamily(e.target.value)}>{['All', ...new Set(SHADES.map(item => item.family))].map(item => <option key={item}>{item}</option>)}</select></label>
            <button type="button" aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites(!onlyFavorites)} className={styles.favoritesFilter}>♡ Favorites ({favorites.length})</button></div>
          <p className={styles.count} role="status">{visible.length} {visible.length === 1 ? 'shade' : 'shades'}</p>
          <div className={styles.swatches} role="group" aria-label="Select a shade">{visible.map(item => <button key={item.code} type="button" aria-pressed={shade.code === item.code} onClick={() => { setShade(item); setMode(current => current === 'original' ? 'preview' : current); }}>
            <span className={styles.swatch} style={{ backgroundColor: item.hex }} aria-hidden="true">{shade.code === item.code && <span className={styles.selectedMark}>✓</span>}</span><strong>{item.name}</strong><small>{item.code}{favorites.includes(item.code) ? ' · ♥' : ''}</small></button>)}</div>
          {!visible.length && <p className={styles.empty}>No matching shades. Try another search or turn off the filters.</p>}
          <div className={styles.details}><div className={styles.detailChip} style={{ backgroundColor: shade.hex }} aria-hidden="true" /><div aria-live="polite"><p>Selected shade</p><h3>{shade.name}</h3><span>{shade.code} · {shade.family}</span></div>
            <button type="button" aria-label={`${favorites.includes(shade.code) ? 'Remove' : 'Save'} ${shade.name} ${favorites.includes(shade.code) ? 'from' : 'to'} favorites`} aria-pressed={favorites.includes(shade.code)} onClick={toggleFavorite} className={styles.save}>{favorites.includes(shade.code) ? '♥' : '♡'}</button></div>
          <a href={shade.sourceUrl} target="_blank" rel="noreferrer" className={styles.sourceLink}>View official shade reference ↗</a>
          <details className={styles.inquiry}><summary>Ask Parth Paints about this shade</summary><label htmlFor="shade-inquiry">Your inquiry draft</label><textarea id="shade-inquiry" value={inquiry} readOnly rows={5} /><button type="button" onClick={copyInquiry} className={styles.primary}>Copy inquiry ↗</button><p>Sending will be enabled once the store’s real WhatsApp number is configured.</p></details>
          <p role="status" className={styles.notice}>{notice}</p>
        </aside>
      </div>
      <footer className={styles.disclaimer}><strong>Colours on screens are approximate.</strong> Lighting, wall preparation, finish and your display affect the result. Confirm your choice with a physical Nerolac shade card and a sample patch. Filter families are editorial groupings.</footer>
    </section>
  );
}
