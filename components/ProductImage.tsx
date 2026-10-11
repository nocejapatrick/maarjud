'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { isPlaceholderImage } from '@/lib/products';

type Props = {
  src: string;
  alt: string;
  /** how wide the photo is shown, for picking the right image size */
  sizes: string;
  /** load straight away: only for photos that are on screen when the page opens */
  eager?: boolean;
  /** the single biggest photo on screen when the page opens: fetched ahead of everything else. Implies eager. */
  first?: boolean;
  /** fill the box it sits in (the box sets the shape); otherwise it lays out as an 850 x 1275 photo */
  fill?: boolean;
};

// How far before a photo reaches the screen it starts to load. A small head start means it is usually ready as it
// scrolls into view; set it to '0px' to wait until the photo is actually on screen.
const HEAD_START = '200px';

// A product photo that loads only when it is on (or just about to be on) the screen, then fades in.
// Real photos in public/images go through next/image, which resizes them for the screen; placehold.co stand-ins
// are plain images, because there is nothing to resize.
export function ProductImage({ src, alt, sizes, eager = false, first = false, fill = false }: Props) {
  const slot = useRef<HTMLSpanElement>(null);
  const immediate = eager || first;
  const [inView, setInView] = useState(immediate);
  const [loaded, setLoaded] = useState(immediate);

  useEffect(() => {
    if (inView) return;
    const el = slot.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: HEAD_START },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const fillStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } as const;
  const className = loaded ? undefined : 'lazy-pending';
  const onLoad = () => setLoaded(true);
  // only one photo per page is told to jump the queue; if several are, they just compete with each other
  const priority = first ? ({ preload: true, fetchPriority: 'high' } as const) : {};

  let image: React.ReactNode = null;
  if (inView) {
    if (isPlaceholderImage(src)) {
      image = (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={850} height={1275} className={className} style={fill ? fillStyle : undefined} onLoad={onLoad} onError={onLoad} />
      );
    } else if (fill) {
      image = <Image src={src} alt={alt} fill sizes={sizes} {...priority} loading="eager" className={className} onLoad={onLoad} onError={onLoad} />;
    } else {
      image = (
        <Image src={src} alt={alt} width={850} height={1275} sizes={sizes} {...priority} loading="eager" className={className} onLoad={onLoad} onError={onLoad} />
      );
    }
  }

  return (
    // the slot keeps the photo's place (and is what we watch) until the photo is asked for
    <span ref={slot} className={fill ? 'lazy-slot lazy-slot-fill' : 'lazy-slot'}>
      {image ?? (
        // without JavaScript nothing can tell when the slot is on screen, so the photo is simply shown
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} width={850} height={1275} style={fill ? fillStyle : undefined} />
        </noscript>
      )}
    </span>
  );
}
