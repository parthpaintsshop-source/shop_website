// Node 22.18+ / 24+ native type stripping. Tests use the real shipped photo and mask.
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import sharp from 'sharp';
import { prepareLighting, recolorWall } from '../src/lib/color-studio/render.ts';
import { SHADES, findShades, inquiryText } from '../src/lib/color-studio/shades.ts';
import { LIVING_ROOM } from '../src/lib/color-studio/rooms.ts';

const { data: photo, info } = await sharp(`public${LIVING_ROOM.image}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { data: maskBuffer, info: maskInfo } = await sharp(`public${LIVING_ROOM.walls[0].mask}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
assert.equal(info.width, maskInfo.width);
assert.equal(info.height, maskInfo.height);
const mask = new Uint8ClampedArray(maskBuffer);
const lighting = prepareLighting(new Uint8ClampedArray(photo), mask, LIVING_ROOM.walls[0].referenceLuminance);
const at = (x, y) => (y * info.width + x) * 4;
for (const [x, y, name] of [[300, 675, 'sofa'], [1050, 945, 'floor'], [1245, 423, 'stairs'], [1500, 780, 'cabinet'], [600, 105, 'ceiling'], [1605, 570, 'adjacent wall'], [600, 450, 'kitchen'], [1290, 525, 'stair structure']]) {
  assert.equal(mask[at(x, y) + 3], 0, name + ' must remain unchanged');
}
assert.equal(mask[at(1275, 615) + 3], 255, 'Only the recessed wall must be paintable');
const coverage = Array.from(mask).filter((alpha, i) => i % 4 === 3 && alpha > 0).length / (info.width * info.height);
assert.ok(coverage > 0.01 && coverage < 0.1, 'The mask must cover a bounded accent wall, not the whole background');
console.log('Paintable image area: ' + (coverage * 100).toFixed(1) + '%');
const start = performance.now();
for (const shade of SHADES) {
  const painted = recolorWall(lighting, mask, shade.hex);
  for (let i = 3; i < mask.length; i += 4) assert.equal(painted[i], mask[i], 'Output must preserve mask coverage');
  assert.notDeepEqual(Array.from(painted.slice(at(1275, 615), at(1275, 615) + 3)),
    Array.from(photo.slice(at(1275, 615), at(1275, 615) + 3)));
}
console.log(`Six 1.98 MP shade renders and coverage assertions: ${Math.round(performance.now() - start)}ms`);
assert.ok(Math.abs(lighting[at(1470, 510) / 4] - lighting[at(1275, 615) / 4]) > 0.01, 'Source lighting variation must be preserved');
assert.equal(findShades('4573', 'All', null)[0].name, 'Red Ranch');
assert.equal(findShades('HEALING', 'All', null)[0].code, 'W-215');
assert.equal(findShades('no-such-shade', 'All', null).length, 0);
assert.equal(findShades('', 'All', ['2293']).length, 1);
assert.equal(findShades('', 'Greens', null).length, 2);
assert.match(inquiryText(SHADES[3], 'Living room', 'Feature wall'), /Red Ranch \(shade code 4573\)/);
const verification = JSON.parse(readFileSync('src/lib/color-studio/source-verification.json', 'utf8'));
for (const shade of SHADES) {
  const source = verification.shades.find(item => shade.sourceUrl.endsWith(item.slug));
  assert.equal(source.hex.toUpperCase(), shade.hex);
  assert.equal(source.code, shade.code);
}
mkdirSync('output/color-studio', { recursive: true });
for (const code of ['4573', 'W-215']) {
  const shade = SHADES.find(item => item.code === code);
  const overlay = recolorWall(lighting, mask, shade.hex);
  await sharp(photo, { raw: info }).composite([{ input: Buffer.from(overlay), raw: info }]).png()
    .toFile(`output/color-studio/${code === '4573' ? 'red-ranch' : 'healing-herbs'}-mask-review.png`);
}
console.log('Passed: asset registration, protected objects, mask alpha, lighting, search, filters, favorites filtering, inquiry contents and six verified source values.');
// Additional wall-selection registration checks. No arbitrary whole-image paint regions.
for (const wall of LIVING_ROOM.walls) {
  const svg = readFileSync(`public${wall.mask}`, 'utf8');
  assert.ok(svg.includes(wall.outlinePath), `${wall.name}: picker contour must match the actual mask`);
  const alpha = new Uint8ClampedArray(await sharp(`public${wall.mask}`).ensureAlpha().raw().toBuffer());
  const prepared = prepareLighting(new Uint8ClampedArray(photo), alpha, wall.referenceLuminance);
  const protectedPoints = [[300, 675, 'sofa'], [1050, 945, 'floor'], [1245, 423, 'stairs'], [1500, 780, 'cabinet'], [600, 105, 'ceiling'], [600, 450, 'kitchen cabinet'], [30, 315, 'clock'], [225, 435, 'window'], [420, 293, 'extractor hood']];
  for (const [x, y, name] of protectedPoints) assert.equal(alpha[at(x, y) + 3], 0, `${wall.name} must exclude ${name}`);
  const x = Math.round(wall.target.x / 100 * info.width);
  const y = Math.round(wall.target.y / 100 * info.height);
  assert.equal(alpha[at(x, y) + 3], 255, `${wall.name}: tap target must land on paintable pixels`);
  const overlay = recolorWall(prepared, alpha, '#BA5749');
  await sharp(photo, { raw: info }).composite([{ input: Buffer.from(overlay), raw: info }]).png().toFile(`output/color-studio/${wall.id}-selection-review.png`);
}
console.log('Passed: both selectable wall contours, touch-target registration, and clock/window/hood protection.');
