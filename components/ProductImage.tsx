import Image from 'next/image';
import { isPlaceholderImage } from '@/lib/products';

type Props = {
  src: string;
  alt: string;
  /** how wide the photo is shown, for picking the right image size */
  sizes: string;
  /** load straight away instead of when it scrolls into view */
  eager?: boolean;
  /** fill the box it sits in (the box sets the shape); otherwise it lays out as an 850 x 1275 photo */
  fill?: boolean;
};

// A product photo. Real photos in public/images go through next/image, which resizes them for the screen;
// placehold.co stand-ins are plain images, because there is nothing to resize.
export function ProductImage({ src, alt, sizes, eager = false, fill = false }: Props) {
  if (isPlaceholderImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={850}
        height={1275}
        loading={eager ? 'eager' : 'lazy'}
        style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } : undefined}
      />
    );
  }

  const loading = eager ? 'eager' : 'lazy';
  return fill ? (
    <Image src={src} alt={alt} fill sizes={sizes} preload={eager} loading={loading} />
  ) : (
    <Image src={src} alt={alt} width={850} height={1275} sizes={sizes} preload={eager} loading={loading} />
  );
}
