import type { Metadata } from 'next';
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const title = 'Parth Paints, Aspur | Authorized Nerolac Dealer';
const description = 'Discover Nerolac paint collections and colour inspiration at Parth Paints, opposite Nice Marble in Aspur, Dungarpur. Open every day, 8 AM to 8 PM. Call +91 63772 23181.';
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: '/' } } : {}),
  title, description,
  openGraph: { title, description, siteName: 'Parth Paints', locale: 'en_IN', type: 'website',
    ...(siteUrl ? { images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: 'Parth Paints - Authorized Nerolac Dealer, Aspur' }] } : {}),
  },
  twitter: { card: 'summary_large_image', title, description, ...(siteUrl ? { images: ['/opengraph.jpg'] } : {}) },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:bg-[#722F37] focus:px-4 focus:py-2 focus:text-[#FAF6F1] focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
