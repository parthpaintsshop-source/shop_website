export interface Shade {
  name: string;
  code: string;
  hex: string;
  /** Editorial filter grouping, not a claim about Nerolac taxonomy. */
  family: 'Whites' | 'Greens' | 'Pinks' | 'Reds' | 'Purples';
  sourceUrl: string;
  verifiedOn: string;
}

// Six individual detail pages only. No catalogue download, imagery or logo reuse.
export const SHADES: readonly Shade[] = [
  { name: 'Foam White', code: 'W-161', hex: '#F5EADB', family: 'Whites', sourceUrl: 'https://www.nerolac.com/colour-catalogue/foam-white', verifiedOn: '2026-11-16' },
  { name: 'Healing Herbs', code: 'W-215', hex: '#E9EDE1', family: 'Greens', sourceUrl: 'https://www.nerolac.com/colour-catalogue/healing-herbs', verifiedOn: '2026-11-16' },
  { name: 'Birthday Kiss', code: '4111', hex: '#F0E3E0', family: 'Pinks', sourceUrl: 'https://www.nerolac.com/colour-catalogue/birthday-kiss', verifiedOn: '2026-11-16' },
  { name: 'Red Ranch', code: '4573', hex: '#BA5749', family: 'Reds', sourceUrl: 'https://www.nerolac.com/colour-catalogue/red-ranch', verifiedOn: '2026-11-16' },
  { name: 'Limelite', code: '4393', hex: '#C7E4B6', family: 'Greens', sourceUrl: 'https://www.nerolac.com/colour-catalogue/limelite', verifiedOn: '2026-11-16' },
  { name: 'Grape Popsicle', code: '2293', hex: '#9C6EA9', family: 'Purples', sourceUrl: 'https://www.nerolac.com/colour-catalogue/grape-popsicle', verifiedOn: '2026-11-16' },
];

export function findShades(query: string, family: string, favorites: readonly string[] | null) {
  const needle = query.trim().toLowerCase();
  return SHADES.filter(shade => (family === 'All' || shade.family === family)
    && (!favorites || favorites.includes(shade.code))
    && `${shade.name} ${shade.code}`.toLowerCase().includes(needle));
}

export function inquiryText(shade: Shade, room: string, wall: string) {
  return `Hello Parth Paints, I would like to enquire about Nerolac ${shade.name} (shade code ${shade.code}) for the ${wall.toLowerCase()} in the ${room.toLowerCase()}. Please advise on samples, availability and suitable finishes.`;
}
