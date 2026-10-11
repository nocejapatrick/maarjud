import Link from 'next/link';
import { ProductImage } from '@/components/ProductImage';
import { formatPrice, type Product } from '@/lib/products';

type Props = {
  product: Product;
  /** how wide the photo is shown, for picking the right image size */
  sizes: string;
  /** load the photo straight away (the first row of the page) */
  eager?: boolean;
  /** the very first photo on the page */
  first?: boolean;
};

// Photo with the name and price: under the photo on small screens, a band that slides up on hover on wide ones.
export function ProductCard({ product, sizes, eager = false, first = false }: Props) {
  return (
    <Link href={`/product/${product.slug}`} className="product">
      <span className="tile">
        <ProductImage src={product.image} alt="" fill sizes={sizes} eager={eager} first={first} />
      </span>
      <span className="caption">
        <span className="caption-name">{product.name}</span>
        <span className="caption-price">{formatPrice(product.price)}</span>
      </span>
    </Link>
  );
}
