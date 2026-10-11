'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { colors } from '@/lib/colors';
import type { Product } from '@/lib/products';

type Sorter = (a: Product, b: Product) => number;

const COLORS_SHOWN = 10;

// 'featured' is the order of the product list itself; ties in every other sort fall back to it
const SORTS: { id: string; label: string; compare: Sorter | null }[] = [
  { id: 'featured', label: 'Featured', compare: null },
  { id: 'best', label: 'Best selling', compare: (a, b) => a.rank - b.rank },
  { id: 'az', label: 'Alphabetically, A-Z', compare: (a, b) => a.name.localeCompare(b.name) },
  { id: 'za', label: 'Alphabetically, Z-A', compare: (a, b) => b.name.localeCompare(a.name) },
  { id: 'price-asc', label: 'Price, low to high', compare: (a, b) => a.price - b.price },
  { id: 'price-desc', label: 'Price, high to low', compare: (a, b) => b.price - a.price },
  { id: 'date-asc', label: 'Date, old to new', compare: (a, b) => a.date.localeCompare(b.date) },
  { id: 'date-desc', label: 'Date, new to old', compare: (a, b) => b.date.localeCompare(a.date) },
];

// Filter bar, filter panel and product grid for a collection page.
export function CollectionView({ products }: { products: Product[] }) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [moreColors, setMoreColors] = useState(false);
  const [sortId, setSortId] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [status, setStatus] = useState('');

  const panel = useRef<HTMLDialogElement>(null);
  const sortToggle = useRef<HTMLButtonElement>(null);
  const sortMenu = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => {
    const featured: Sorter = (a, b) => products.indexOf(a) - products.indexOf(b);
    const compare = SORTS.find((sort) => sort.id === sortId)?.compare ?? featured;
    return [...products].sort((a, b) => compare(a, b) || featured(a, b));
  }, [products, sortId]);

  // only the colours this collection actually comes in
  const collectionColors = useMemo(() => colors.filter((color) => products.some((product) => product.color === color.name)), [products]);
  // the panel lists up to ten colours; any beyond that sit behind "More options"
  const hasMoreColors = collectionColors.length > COLORS_SHOWN;

  const matches = (product: Product) =>
    (!selectedColors.length || selectedColors.includes(product.color)) && (!inStockOnly || product.inStock);

  const announceFilters = (nextColors: string[], nextInStockOnly: boolean) => {
    const shown = products.filter(
      (product) => (!nextColors.length || nextColors.includes(product.color)) && (!nextInStockOnly || product.inStock),
    ).length;
    setStatus(`Showing ${shown} of ${products.length} products.`);
  };

  const toggleColor = (name: string, checked: boolean) => {
    const next = checked ? [...selectedColors, name] : selectedColors.filter((color) => color !== name);
    setSelectedColors(next);
    announceFilters(next, inStockOnly);
  };

  // Filter panel: an in-page sidebar on wide screens, a modal drawer on small ones
  const openPanel = () => {
    const dialog = panel.current;
    if (!dialog) return;
    if (window.matchMedia('(min-width: 1024px)').matches) dialog.show();
    else dialog.showModal();
    setPanelOpen(true);
  };

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    setIsWide(wide.matches);
    const onChange = () => {
      setIsWide(wide.matches);
      // crossing the breakpoint with the panel open: reopen it in the other mode
      const dialog = panel.current;
      if (dialog?.open) {
        dialog.close();
        if (wide.matches) dialog.show();
        else dialog.showModal();
        setPanelOpen(true);
      }
    };
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, []);

  // pause the caption slide while the window size is changing
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      setIsResizing(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIsResizing(false), 250);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, []);

  // Sort menu: focus the current option when it opens, close on an outside click
  useEffect(() => {
    if (!sortOpen) return;
    const options = sortMenu.current?.querySelectorAll<HTMLButtonElement>('button');
    const checked = [...(options ?? [])].find((option) => option.getAttribute('aria-checked') === 'true');
    (checked ?? options?.[0])?.focus();

    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!sortMenu.current?.contains(target) && target !== sortToggle.current) setSortOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [sortOpen]);

  const onSortKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const options = [...(sortMenu.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])];
    const at = options.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      options[(at + 1) % options.length]?.focus();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      options[(at - 1 + options.length) % options.length]?.focus();
    }
    if (event.key === 'Escape') {
      setSortOpen(false);
      sortToggle.current?.focus();
    }
  };

  return (
    <>
      {/* Filter bar */}
      <div className="relative flex h-[49px] items-center justify-between px-[var(--outer)] text-[9px] font-light uppercase lg:pb-[7px] lg:text-[10px]">
        <button
          type="button"
          id="filters-toggle"
          className="link uppercase"
          aria-expanded={panelOpen}
          aria-controls="filters"
          onClick={() => (panel.current?.open ? panel.current.close() : openPanel())}
        >
          {panelOpen && isWide ? 'Hide filters' : 'Filters'}
        </button>
        <button
          type="button"
          id="sort-toggle"
          ref={sortToggle}
          className="link uppercase"
          aria-expanded={sortOpen}
          aria-haspopup="menu"
          aria-controls="sort-menu"
          onClick={() => setSortOpen((open) => !open)}
        >
          Sort by
        </button>

        <div id="sort-menu" ref={sortMenu} className="sort-menu" role="menu" aria-label="Sort by" hidden={!sortOpen} onKeyDown={onSortKeyDown}>
          {SORTS.map((sort) => (
            <button
              key={sort.id}
              type="button"
              role="menuitemradio"
              aria-checked={sort.id === sortId}
              onClick={() => {
                setSortId(sort.id);
                setStatus(`Sorted by ${sort.label}.`);
                setSortOpen(false);
                sortToggle.current?.focus();
              }}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid: edge to edge, hairline gaps */}
      <div className="lg:flex lg:items-start">
        {/* Filter panel: sidebar on wide screens, drawer on small ones (same controls, same state) */}
        <dialog
          ref={panel}
          id="filters"
          className="filters"
          aria-label="Filters"
          onClose={() => setPanelOpen(false)}
          // close when the dimmed area outside the drawer is tapped
          onClick={(event) => {
            if (event.target === panel.current) panel.current?.close();
          }}
        >
          <div className="f-head">
            <h2 className="text-[15px] font-normal uppercase tracking-[0.12em]">Filters</h2>
            <button type="button" className="icon-btn text-ink" aria-label="Close filters" onClick={() => panel.current?.close()}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" />
              </svg>
            </button>
          </div>

          <form id="filter-form" className="f-body" onSubmit={(event) => event.preventDefault()}>
            <details open>
              <summary className="f-sum">
                Availability <span className="f-pm" aria-hidden="true" />
              </summary>
              <div className="f-list f-list-tight">
                <label className="f-row f-row-tight">
                  <input
                    type="checkbox"
                    name="stock"
                    value="in"
                    checked={inStockOnly}
                    onChange={(event) => {
                      setInStockOnly(event.target.checked);
                      announceFilters(selectedColors, event.target.checked);
                    }}
                  />
                  In stock
                </label>
                <label className="f-row f-row-tight is-off">
                  <input type="checkbox" name="stock" value="out" disabled />
                  Out of stock
                </label>
              </div>
            </details>

            <details open>
              <summary className="f-sum">
                Color <span className="f-pm" aria-hidden="true" />
              </summary>
              <div className="f-list">
                {(moreColors ? collectionColors : collectionColors.slice(0, COLORS_SHOWN)).map((color) => (
                    <label key={color.name} className="f-row">
                      <input
                        type="checkbox"
                        name="color"
                        value={color.name}
                        checked={selectedColors.includes(color.name)}
                        onChange={(event) => toggleColor(color.name, event.target.checked)}
                      />
                      <span className={color.pale ? 'f-swatch is-pale' : 'f-swatch'} style={{ background: color.swatch }} />
                      {color.name}
                    </label>
                  ))}
              </div>
              {hasMoreColors && (
              <button type="button" id="more-colors" className="f-more" aria-expanded={moreColors} onClick={() => setMoreColors((more) => !more)}>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M1 5.5l4-4 4 4M1 9.5l4 4 4-4" />
                </svg>
                <span>{moreColors ? 'Fewer options' : 'More options'}</span>
              </button>
              )}
            </details>
          </form>
        </dialog>

        <ul id="grid" className={`grid min-w-0 flex-1 grid-cols-2 gap-px min-[750px]:grid-cols-4${isResizing ? ' is-resizing' : ''}`}>
          {sorted.map((product) => (
            <li key={product.slug} data-slug={product.slug} hidden={!matches(product)}>
              <ProductCard product={product} sizes="(min-width: 750px) 25vw, 50vw" eager={products.indexOf(product) < 4} first={products.indexOf(product) === 0} />
            </li>
          ))}
        </ul>
      </div>

      <p id="grid-status" className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </>
  );
}
