import type { Metadata } from 'next';
import { CollectionPage } from '@/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Hair Clips',
  description: 'Placeholder description for the hair clips collection page.',
};

export default function HairClipsPage() {
  return <CollectionPage slug="hair-clips" />;
}
