'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/** 'all' = accepted, 'needed' = only what the bag needs, null = not chosen yet */
export type PrivacyChoice = 'all' | 'needed' | null;

type Consent = {
  choice: PrivacyChoice;
  /** false until the saved choice has been read from the browser */
  ready: boolean;
  choose: (choice: 'all' | 'needed') => void;
  /** forget the choice, so the notice shows again */
  reset: () => void;
};

const ConsentContext = createContext<Consent | null>(null);

const STORAGE_KEY = 'maarjud-privacy-choice';
// what "only what's needed" switches off
const OPTIONAL_KEYS = ['maarjud-recently-viewed'];

// Remembers the visitor's privacy choice. Anything optional (today: recently viewed) checks `choice === 'all'`
// before saving to the browser; analytics or similar should do the same if they are ever added.
export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoice] = useState<PrivacyChoice>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'all' || saved === 'needed') setChoice(saved);
    } catch {
      // private window: the notice simply shows on each visit
    }
    setReady(true);
  }, []);

  const choose = useCallback((next: 'all' | 'needed') => {
    setChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      if (next === 'needed') OPTIONAL_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      // nothing to do
    }
  }, []);

  const reset = useCallback(() => {
    setChoice(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // nothing to do
    }
  }, []);

  const consent = useMemo(() => ({ choice, ready, choose, reset }), [choice, ready, choose, reset]);

  return <ConsentContext.Provider value={consent}>{children}</ConsentContext.Provider>;
}

export function useConsent(): Consent {
  const consent = useContext(ConsentContext);
  if (!consent) throw new Error('useConsent must be used inside <ConsentProvider>');
  return consent;
}
