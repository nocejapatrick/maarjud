'use client';

import { useBag } from '@/components/BagProvider';
import { channelNames } from '@/lib/site';

// Add to bag / Buy it now, with the note on how ordering works.
export function ProductActions({ slug }: { slug: string }) {
  const bag = useBag();

  return (
    <div className="mb-8 grid gap-[10px] lg:grid-cols-2 lg:items-center">
      <button
        type="button"
        id="p-add"
        className="btn-primary mt-[15px] lg:-mt-[2px]"
        onClick={() => {
          bag.add(slug);
          bag.open();
        }}
      >
        Add to bag
      </button>
      <div>
        {/* straight to the bag, without adding a second one if it is already there */}
        <button
          type="button"
          className="btn-quiet"
          onClick={() => {
            bag.ensure(slug);
            bag.open();
          }}
        >
          Buy it now
        </button>
        <p className="mt-3 text-[12px] leading-[14px] lg:mt-[14px] lg:text-[14px] lg:leading-[16.5px]">
          We take orders by message, not online checkout. Add what you like to your bag, send us the order on
          {` ${channelNames}`}, and we will confirm it and reply with GCash payment details.
        </p>
      </div>
    </div>
  );
}
