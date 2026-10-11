'use client';

import { useEffect, useRef } from 'react';
import { ProductImage } from '@/components/ProductImage';
import type { Product } from '@/lib/products';

// Photos: a swipeable row on small screens, a stacked column from 750px.
// Each product has one real photo for now, so the other two are placeholders.
export function Gallery({ product }: { product: Product }) {
  const gallery = useRef<HTMLDivElement>(null);

  // the row only scrolls sideways on small screens, so it is only a keyboard stop there
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 750px)');
    const sync = () => {
      if (wide.matches) gallery.current?.removeAttribute('tabindex');
      else gallery.current?.setAttribute('tabindex', '0');
    };
    sync();
    wide.addEventListener('change', sync);
    return () => wide.removeEventListener('change', sync);
  }, []);

  return (
    <div ref={gallery} id="p-gallery" className="pdp-gallery" role="region" aria-label="Product photos">
      <figure className="pdp-photo">
        <ProductImage src={product.image} alt={product.name} sizes="(min-width: 750px) 50vw, 90vw" eager />
      </figure>
      {[2, 3].map((number) => (
        <figure key={number} className="pdp-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://placehold.co/850x1275/e8d6c9/6b4f5c?text=Photo+${number}`} alt="" width={850} height={1275} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
