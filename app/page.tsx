import type { Metadata } from 'next';
import { CollectionPage } from '@/components/CollectionPage';
import { collectionMetadata } from '@/lib/products';

// The title is written out in full ("... | Maarjud"): the layout's title template does not apply to the home page.
export const metadata: Metadata = collectionMetadata('scrunchies');

// The home page is the scrunchies collection.
export default function ScrunchiesPage() {
  return <CollectionPage slug="scrunchies" />;
}
