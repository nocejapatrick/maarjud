import Link from 'next/link';
import { MoreScrunchies } from '@/components/product/MoreScrunchies';
import { products } from '@/lib/products';

// Shown for any address that does not match a page or a product.
export default function NotFound() {
  return (
    <>
      <div className="px-[30px] py-24 text-center">
        <h1 className="font-promo text-[28px] font-normal leading-[33.6px]">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-[14px]">
          <Link href="/" className="link text-rouge">
            See all scrunchies
          </Link>
        </p>
      </div>
      <MoreScrunchies related={products.slice(0, 6)} />
    </>
  );
}
