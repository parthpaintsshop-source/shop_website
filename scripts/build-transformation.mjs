'use strict';
// Rebuild the photographic transformation from the checked-in source and masks.
// Node 22.18+ or 24+ provides native TypeScript stripping for this offline helper.
import sharp from 'sharp';
import assert from 'node:assert/strict';
import { prepareLighting, recolorWall } from './lib/relight.ts';

const { data, info } = await sharp('assets/source/architectural-source.jpg')
  .extract({ left: 750, top: 270, width: 1650, height: 1200 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const original = new Uint8ClampedArray(data);
const layers = [];
for (const [file, hex, reference] of [['architectural-wall.svg', '#702D39', 0.55], ['kitchen-wall.svg', '#879B80', 0.7]]) {
  const { data: alpha, info: dimensions } = await sharp(`assets/source/${file}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(dimensions.width, info.width); assert.equal(dimensions.height, info.height);
  const mask = new Uint8ClampedArray(alpha);
  const layer = recolorWall(prepareLighting(original, mask, reference), mask, hex);
  // Keep ceiling, stair treads, furniture, cabinet and floor outside both masks.
  for (const [x, y] of [[300,675], [1050,945], [1245,423], [1500,780], [600,105], [600,450]]) assert.equal(layer[(y * info.width + x) * 4 + 3], 0);
  layers.push({ input: Buffer.from(layer), raw: info });
}
await sharp(data, { raw: info }).webp({ quality: 90 }).toFile('public/images/showroom/neutral-room.webp');
await sharp(data, { raw: info }).composite(layers).webp({ quality: 90 }).toFile('public/images/showroom/transformed-room.webp');
console.log('Built registered before/after pair; protected-surface checks passed.');
