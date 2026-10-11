'use client';

import { useConsent } from '@/components/ConsentProvider';

// On the Privacy page: says what the visitor chose and lets them choose again.
export function PrivacyChoice() {
  const { choice, ready, reset } = useConsent();

  if (!ready) return <p>Checking your choice.</p>;

  if (!choice) return <p>You have not chosen yet. The notice at the bottom of the page has both options.</p>;

  return (
    <>
      <p>
        {choice === 'all'
          ? 'You accepted: we save your bag and the pieces you have looked at.'
          : 'You chose only your bag: we save your bag and nothing else.'}
      </p>
      <p>
        <button type="button" className="btn-quiet mt-2 max-w-[240px]" onClick={reset}>
          Change my choice
        </button>
      </p>
    </>
  );
}
