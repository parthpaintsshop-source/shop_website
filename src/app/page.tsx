'use client';

import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import ColorStudioPreview from '@/components/color-studio/ColorStudioPreview';
import Products from '@/components/sections/Products';
import Gallery from '@/components/sections/Gallery';
import WhyUs from '@/components/sections/WhyUs';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <Hero />
      <ColorStudioPreview embedded />
      <Products />
      <Gallery />
      <WhyUs />
      <Contact />
      <Footer />
    </SmoothScroll>
  );
}
