'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/products';

type Props = {
  products: Product[];
  /** false while the row's tab is not showing, so the arrows are worked out again when it appears */
  visible?: boolean;
};

// A sideways-scrolling row of product cards, with arrow buttons on wide screens.
export function ProductRow({ products, visible = true }: Props) {
  const row = useRef<HTMLUListElement>(null);
  const [arrows, setArrows] = useState({ prev: false, next: false });

  const sync = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setArrows({
      prev: el.scrollLeft >= 8,
      next: el.scrollLeft + el.clientWidth <= el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync, products, visible]);

  const step = (direction: 1 | -1) => {
    const el = row.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <>
      <ul ref={row} className="rel-slider" role="list" onScroll={sync}>
        {products.map((product) => (
          <li key={product.slug} className="rel-item">
            <ProductCard product={product} sizes="(min-width: 750px) 27vw, 90vw" />
          </li>
        ))}
      </ul>
      {arrows.prev && (
        <button type="button" className="rel-nav rel-prev" aria-label="Previous products" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
      )}
      {arrows.next && (
        <button type="button" className="rel-nav rel-next" aria-label="Next products" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </>
  );
}
