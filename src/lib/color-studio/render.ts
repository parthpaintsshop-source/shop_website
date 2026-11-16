// Neutral-wall relighting in linear RGB. Each room needs a calibrated neutral
// photograph and a registered, antialiased mask; this is not arbitrary-photo segmentation.
const linear = (value: number) => {
  const s = value / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const srgb = (value: number) => Math.round(255 * (value <= 0.0031308
  ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055));
const LINEAR = Array.from({ length: 256 }, (_, i) => linear(i));

export function prepareLighting(photo: Uint8ClampedArray, mask: Uint8ClampedArray, reference: number) {
  if (photo.length !== mask.length || photo.length % 4 !== 0 || reference <= 0) throw new Error('Invalid registered wall assets');
  const lighting = new Float32Array(photo.length / 4);
  for (let p = 0; p < lighting.length; p++) {
    const i = p * 4;
    if (mask[i + 3]) lighting[p] = (0.2126 * LINEAR[photo[i]] + 0.7152 * LINEAR[photo[i + 1]] + 0.0722 * LINEAR[photo[i + 2]]) / reference;
  }
  return lighting;
}

/** Transparent outside the wall: furniture, trim and floor remain the actual photograph. */
export function recolorWall(lighting: Float32Array, mask: Uint8ClampedArray, hex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hex) || mask.length !== lighting.length * 4) throw new Error('Invalid shade or mask');
  const rgb = [1, 3, 5].map(offset => linear(parseInt(hex.slice(offset, offset + 2), 16)));
  const out = new Uint8ClampedArray(mask.length);
  // A per-shade lookup avoids exponentiation in the pixel loop.
  const lut = rgb.map(channel => Array.from({ length: 2049 }, (_, n) => srgb(Math.min(1, channel * n / 1024))));
  for (let p = 0; p < lighting.length; p++) {
    const i = p * 4;
    if (!mask[i + 3]) continue;
    const level = Math.min(2048, Math.max(0, Math.round(lighting[p] * 1024)));
    out[i] = lut[0][level]; out[i + 1] = lut[1][level]; out[i + 2] = lut[2][level]; out[i + 3] = mask[i + 3];
  }
  return out;
}
