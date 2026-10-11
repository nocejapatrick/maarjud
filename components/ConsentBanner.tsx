'use client';

import Link from 'next/link';
import { useConsent } from '@/components/ConsentProvider';

// Privacy notice: shown until the visitor picks one of the two choices. A band along the bottom on small screens,
// a box in the bottom right corner on wide ones.
export function ConsentBanner() {
  const { choice, ready, choose } = useConsent();

  if (!ready || choice) return null;

  return (
    <section
      className="consent on-velvet fixed inset-x-0 bottom-0 z-50 bg-velvet p-4 text-surface lg:inset-x-auto lg:bottom-5 lg:right-5 lg:w-[400px] lg:p-5"
      aria-label="Privacy choices"
    >
      <p className="text-[13px] leading-[18px]">
        We save your bag in this browser so it is still here when you come back. With your OK, we will also remember
        the pieces you have looked at. No ads, no tracking.{' '}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-gold active:opacity-70">
          Privacy
        </Link>
      </p>
      <div className="mt-3 flex gap-[10px]">
        <button type="button" className="btn-light flex-1" onClick={() => choose('all')}>
          Accept
        </button>
        <button type="button" className="btn-light-quiet flex-1" onClick={() => choose('needed')}>
          Only my bag
        </button>
      </div>
    </section>
  );
}
