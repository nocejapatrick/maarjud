'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, type Product } from '@/lib/products';

type StoredLine = { slug: string; quantity: number };
export type BagLine = { product: Product; quantity: number };

type Bag = {
  lines: BagLine[];
  /** number of items, counting quantities */
  count: number;
  /** pesos */
  total: number;
  add: (slug: string) => void;
  /** adds one only if the product is not in the bag yet */
  ensure: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const BagContext = createContext<Bag | null>(null);

// the bag lives in this browser only
const STORAGE_KEY = 'maarjud-bag';
const MAX_QUANTITY = 20;

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // read the saved bag after the first render, so the server and browser agree on the first paint
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(saved)) {
        setStored(
          saved.filter((line): line is StoredLine => typeof line?.slug === 'string' && Number.isInteger(line?.quantity) && line.quantity > 0),
        );
      }
    } catch {
      // private window or unreadable data: start with an empty bag
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // private window: the bag just lasts until the tab closes
    }
  }, [stored, loaded]);

  const add = useCallback((slug: string) => {
    setStored((lines) =>
      lines.some((line) => line.slug === slug)
        ? lines.map((line) => (line.slug === slug ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + 1) } : line))
        : [...lines, { slug, quantity: 1 }],
    );
  }, []);

  const ensure = useCallback((slug: string) => {
    setStored((lines) => (lines.some((line) => line.slug === slug) ? lines : [...lines, { slug, quantity: 1 }]));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setStored((lines) =>
      quantity < 1
        ? lines.filter((line) => line.slug !== slug)
        : lines.map((line) => (line.slug === slug ? { ...line, quantity: Math.min(MAX_QUANTITY, quantity) } : line)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setStored((lines) => lines.filter((line) => line.slug !== slug));
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const bag = useMemo<Bag>(() => {
    // products that were removed from the shop drop out of saved bags
    const lines = stored.flatMap((line) => {
      const product = getProduct(line.slug);
      return product ? [{ product, quantity: line.quantity }] : [];
    });
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      total: lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
      add,
      ensure,
      setQuantity,
      remove,
      isOpen,
      open,
      close,
    };
  }, [stored, add, ensure, setQuantity, remove, isOpen, open, close]);

  return <BagContext.Provider value={bag}>{children}</BagContext.Provider>;
}

export function useBag(): Bag {
  const bag = useContext(BagContext);
  if (!bag) throw new Error('useBag must be used inside <BagProvider>');
  return bag;
}
