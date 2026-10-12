'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useConsent } from '@/components/ConsentProvider';
import { TabList } from '@/components/TabList';
import { ProductRow } from '@/components/product/ProductRow';
import { getProduct, type Product } from '@/lib/products';

const tabs = [
  { id: 'related', label: 'Related products' },
  { id: 'recent', label: 'Recently viewed' },
];

// recently viewed lives in this browser only, and only if the visitor accepted the privacy notice
const STORAGE_KEY = 'maarjud-recently-viewed';

type Props = {
  related: Product[];
  /** the product being viewed: remembered for next time, and left out of its own "recently viewed" row */
  currentSlug?: string;
};

// Related products / Recently viewed, under the product details.
export function MoreScrunchies({ related, currentSlug }: Props) {
  // with nothing related to show (a collection of one), only "Recently viewed" is offered
  const shownTabs = related.length > 0 ? tabs : tabs.filter((tab) => tab.id !== 'related');
  const [selected, setSelected] = useState(shownTabs[0].id);
  const [recent, setRecent] = useState<Product[]>([]);
  const { choice, ready } = useConsent();
  const allowed = choice === 'all';

  useEffect(() => {
    if (!ready) return;
    if (!allowed) {
      setRecent([]);
      return;
    }
    let slugs: string[] = [];
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(saved)) slugs = saved.filter((slug) => typeof slug === 'string');
    } catch {
      // private window or unreadable data: the tab just stays empty
    }
    const others = slugs.filter((slug) => slug !== currentSlug);
    setRecent(others.flatMap((slug) => getProduct(slug) ?? []));
    if (!currentSlug) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([currentSlug, ...others].slice(0, 8)));
    } catch {
      // nothing to do
    }
  }, [currentSlug, allowed, ready]);

  return (
    <section className="pb-[30px] pt-[47px] lg:pb-[50px] lg:pt-[73px]" aria-label="More scrunchies">
      <TabList
        idPrefix="rel"
        tabs={shownTabs}
        selected={selected}
        onSelect={setSelected}
        label="More scrunchies"
        className="mb-8 flex justify-center gap-4 whitespace-nowrap px-2 min-[360px]:gap-[30px] min-[360px]:px-[var(--outer)]"
        tabClassName="tab uppercase"
      />
      {related.length > 0 && (
        <div id="rel-panel-related" role="tabpanel" aria-labelledby="rel-tab-related" className="rel-panel" hidden={selected !== 'related'}>
          <ProductRow products={related} visible={selected === 'related'} />
        </div>
      )}
      <div id="rel-panel-recent" role="tabpanel" aria-labelledby="rel-tab-recent" className="rel-panel" hidden={selected !== 'recent'}>
        <ProductRow products={recent} visible={selected === 'recent'} />
        {recent.length === 0 && (
          <p className="px-[30px] py-12 text-center text-[14px] text-ink-muted">
            {allowed || !ready ? (
              'Pieces you look at will show up here.'
            ) : (
              <>
                Recently viewed is switched off. You can turn it on from the{' '}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-rouge active:opacity-70">
                  Privacy page
                </Link>
                .
              </>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
