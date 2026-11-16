export interface StoreDetails {
  name: string; tagline: string; phone: string; secondaryPhone: string; whatsapp: string;
  email: string; address: string; mapUrl: string; hours: string;
  instagram: string | null; facebook: string | null;
}
// Business details supplied and confirmed by the owner on 16 November 2026.
export const STORE_INFO: StoreDetails = {
  name: 'Parth Paints', tagline: 'Authorized Nerolac Dealer',
  phone: '+916377223181', secondaryPhone: '+917073290182', whatsapp: '916377223181',
  email: 'parthsevak97@gmail.com', address: 'Opposite Nice Marble, Aspur, Dungarpur, Rajasthan',
  mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=23.952773,74.083259',
  hours: 'Every day · 8 AM–8 PM', instagram: null, facebook: null,
};
export const NAV_LINKS = [
  { label: 'Collections', href: '#products' },
  { label: 'Colour stories', href: '#room-explorer' },
  { label: 'Our store', href: '#why-us' },
] as const;
export const NEROLAC = {
  catalogue: 'https://www.nerolac.com/colour-catalogue',
  visualizer: 'https://visualiser.nerolac.com/',
  website: 'https://www.nerolac.com/',
};
export function inquiryHref(topic: string): string {
  return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(`Hello Parth Paints, I would like to ask about ${topic}.`)}`;
}
