import type { Metadata } from 'next';
import { CollectionPage } from '@/components/CollectionPage';
import { collectionMetadata } from '@/lib/products';

export const metadata: Metadata = collectionMetadata('hair-clips');

export default function HairClipsPage() {
  return <CollectionPage slug="hair-clips" />;
}
