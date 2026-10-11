'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useConsent } from '@/components/ConsentProvider';
import { site } from '@/lib/site';

// Google Analytics. It loads only on the live site, and only after the visitor chooses Accept on the privacy
// notice. Choosing "Only my bag" later switches it off and removes its cookies.
export function Analytics() {
  const { choice, ready } = useConsent();
  const id = site.googleAnalyticsId;
  // localhost visits would only pollute the numbers
  const live = Boolean(id) && process.env.NODE_ENV === 'production';
  const allowed = choice === 'all';

  useEffect(() => {
    if (!live || !ready) return;
    // Google's own switch: while this is true the tag sends nothing, even if it has already loaded
    (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = !allowed;
    if (!allowed) removeAnalyticsCookies();
  }, [live, ready, allowed, id]);

  if (!live || !ready || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

// Google Analytics keeps its visitor id in cookies named _ga and _ga_<property>
function removeAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  // the cookie may sit on this exact host or on a parent domain, so clear each possibility
  const parts = location.hostname.split('.');
  const domains = ['', ...parts.map((_, index) => `.${parts.slice(index).join('.')}`)];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}
