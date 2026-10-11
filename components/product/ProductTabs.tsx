'use client';

import { useState } from 'react';
import { TabList } from '@/components/TabList';

const tabs = [
  { id: 'desc', label: 'Description' },
  { id: 'details', label: 'Details' },
];

// Description / Details. The copy is placeholder: swap in the real text.
export function ProductTabs({ noun }: { noun: string }) {
  const [selected, setSelected] = useState('desc');

  return (
    <div className="pt-[15px] lg:pb-[37px]">
      <TabList idPrefix="p" tabs={tabs} selected={selected} onSelect={setSelected} label="Product information" className="flex gap-[29px]" />
      <div id="p-panel-desc" role="tabpanel" aria-labelledby="p-tab-desc" className="pdp-copy" hidden={selected !== 'desc'}>
        <p>
          Placeholder description. Say what this {noun} is made from, how it sits in the hair, how firmly it holds and
          why it is worth it, in two or three lines about this long. Swap it for yours.
        </p>
        <p>Placeholder fabric line</p>
      </div>
      <div id="p-panel-details" role="tabpanel" aria-labelledby="p-tab-details" className="pdp-copy" hidden={selected !== 'details'}>
        <p>Placeholder details. Add the size, the fabric and how to care for it.</p>
      </div>
    </div>
  );
}
