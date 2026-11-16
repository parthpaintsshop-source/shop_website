import type { Metadata } from 'next';
import ColorStudioPreview from '@/components/color-studio/ColorStudioPreview';

export const metadata: Metadata = {
  title: 'Colour Studio Preview | Parth Paints',
  robots: { index: false, follow: false },
  description: 'One-room photographic wall colour proof of concept for review.',
};

export default function ColorStudioPreviewPage() {
  return <ColorStudioPreview />;
}
