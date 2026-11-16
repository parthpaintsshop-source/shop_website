export interface WallRegion {
  id: string; name: string; mask: string; referenceLuminance: number;
  outlinePath: string; target: { x: number; y: number };
}
export interface RoomPreset {
  id: string; name: string; image: string; width: number; height: number; alt: string;
  walls: readonly WallRegion[];
  credit: { photographer: string; url: string; license: string };
}
export const LIVING_ROOM: RoomPreset = {
  id: 'living-room', name: 'Living room', image: '/images/studio/architectural-room.webp', width: 1650, height: 1200,
  alt: 'Real architectural interior with a grey sofa, timber staircase and a recessed accent wall beneath the stairs',
  walls: [
    { id: 'stair-recess', name: 'Wall beneath stairs', mask: '/images/studio/architectural-wall.svg', referenceLuminance: 0.55,
      outlinePath: 'M1085 627L1270 536L1398 540V500L1548 502V618L1435 619L1440 681L1085 632Z', target: { x: 77, y: 51 } },
    { id: 'kitchen-wall', name: 'Kitchen / dining wall', mask: '/images/studio/kitchen-wall.svg', referenceLuminance: 0.7,
      outlinePath: 'M396 284L761 357V413H795V451L594 450V498H593V538L518 541L521 514Q509 512 499 519L481 540L442 542L441 524L396 522Z M558 397A50 50 0 1 0 458 397A50 50 0 1 0 558 397Z', target: { x: 17, y: 28 } },
  ],
  credit: { photographer: 'Viaceslav Kat', url: 'https://www.pexels.com/photo/interior-design-of-a-house-1571460/', license: 'https://www.pexels.com/license/' },
};
export const ROOM_OPTIONS = [
  { id: 'living-room', name: 'Living room', available: true },
  { id: 'bedroom', name: 'Bedroom', available: false },
  { id: 'kitchen', name: 'Kitchen', available: false },
  { id: 'dining-room', name: 'Dining room', available: false },
] as const;
