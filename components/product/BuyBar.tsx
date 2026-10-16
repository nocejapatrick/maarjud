'use client';

import { useEffect, useState } from 'react';
import { useBag } from '@/components/BagProvider';
import { priceLabel, type Product } from '@/lib/products';

// Buy bar (wide screens): slides up once the main Add to bag button has scrolled out of view.
export function BuyBar({ product }: { product: Product }) {
  const bag = useBag();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mainButton = document.getElementById('p-add');
    if (!mainButton) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(mainButton);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="p-bar"
      className={`p-bar fixed inset-x-0 bottom-0 z-30 hidden h-20 items-center justify-between bg-surface pl-[220px] pr-[var(--outer)] lg:flex${visible ? ' is-visible' : ''}`}
    >
      <p className="flex items-center">
        <span className="font-promo text-[18.4px] italic leading-[25px]">{product.name}</span>
        <span className="px-[10px]" aria-hidden="true">
          &bull;
        </span>
        <span className="text-[16px] leading-[25px]">{priceLabel(product)}</span>
      </p>
      <button
        type="button"
        className="btn-pill"
        onClick={() => {
          bag.add(product.slug);
          bag.open();
        }}
      >
        Add to bag
      </button>
    </div>
  );
}
