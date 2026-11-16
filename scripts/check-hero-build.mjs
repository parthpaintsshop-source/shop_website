// Run after `npm run build`. Catches CSS Module export failures that compilation misses.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const html = readFileSync('.next/server/app/index.html', 'utf8');
const hero = html.match(/<section\b[^>]*id="home"[\s\S]*?<\/section>/)?.[0];
assert.ok(hero, 'The hero must be prerendered');
assert.doesNotMatch(hero, /class="[^"]*\bundefined\b/, 'CSS Module exports must resolve');
const css = readdirSync('.next/static/chunks').filter(name => name.endsWith('.css'))
  .map(name => readFileSync(`.next/static/chunks/${name}`, 'utf8')).join('\n');
for (const suffix of ['hero', 'title', 'imageMask', 'image', 'actions']) {
  const name = hero.match(new RegExp(`class="([^" ]+_${suffix})"`))?.[1];
  assert.ok(name, `Missing scoped ${suffix} class in HTML`);
  assert.ok(css.includes(`.${name}{`), `Missing emitted CSS for ${name}`);
}
assert.doesNotMatch(hero, /style="[^"]*(?:opacity:\s*0(?:;|")|visibility:\s*hidden)/,
  'Hero content must be visible before JavaScript initializes');
assert.match(hero, /href="#products"/);
assert.match(hero, /href="#contact"/);
assert.match(hero, /Authorized Nerolac Dealer/);
assert.match(css, /font-size:clamp\(74px,8\.4vw,136px\)/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /@font-face/);
assert.ok(readdirSync('.next/static/media').some(name => name.endsWith('.woff2')));
console.log('Hero build regression checks passed: scoped styles, static content, CTAs, typography, fonts and reduced-motion CSS.');
