import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Transformation from '@/components/sections/Transformation';
import Products from '@/components/sections/Products';
import Gallery from '@/components/sections/Gallery';
import WhyUs from '@/components/sections/WhyUs';
import OwnerIntroduction from '@/components/sections/OwnerIntroduction';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import ShowroomMotion from '@/components/layout/ShowroomMotion';
import { STORE_INFO } from '@/lib/constants';

export default function Home() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'Store', name: STORE_INFO.name,
    description: 'Authorized Nerolac paint dealer in Aspur, Dungarpur.',
    telephone: STORE_INFO.phone, email: STORE_INFO.email,
    contactPoint: [{ '@type': 'ContactPoint', telephone: STORE_INFO.secondaryPhone, contactType: 'customer service' }],
    address: { '@type': 'PostalAddress', streetAddress: 'Opposite Nice Marble', addressLocality: 'Aspur, Dungarpur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: 23.952773, longitude: 74.083259 },
    hasMap: STORE_INFO.mapUrl, openingHours: 'Mo-Su 08:00-20:00',
    ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}),
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }} /><SmoothScroll><Navbar /><ShowroomMotion><main id="main-content"><Hero /><Transformation /><Products /><Gallery /><WhyUs /><OwnerIntroduction /><Contact /></main><Footer /></ShowroomMotion></SmoothScroll></>;
}
