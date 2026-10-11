import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BuyBar } from '@/components/product/BuyBar';
import { Gallery } from '@/components/product/Gallery';
import { MoreScrunchies } from '@/components/product/MoreScrunchies';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductTabs } from '@/components/product/ProductTabs';
import { getColor } from '@/lib/colors';
import { colorSiblings, formatPrice, getCollection, getProduct, products, relatedTo } from '@/lib/products';

type Props = { params: Promise<{ slug: string }> };

// one page per product, built ahead of time
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Not found' };
  return {
    title: product.name,
    description: `${product.name}, ${formatPrice(product.price)}. Handmade by Maarjud.`,
    openGraph: { title: `${product.name} | Maarjud`, images: [product.image] },
  };
}

// The product page: /product/name-of-product
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <article className="px-4 pb-[30px] min-[750px]:mx-[var(--outer)] min-[750px]:px-0">
        <div id="p-found" className="min-[750px]:grid min-[750px]:grid-cols-2 min-[750px]:gap-8">
          <Gallery product={product} />

          {/* Product details: stay in view while the photos scroll past on wide screens */}
          <div className="lg:pl-[50px]">
            <div className="min-[750px]:sticky min-[750px]:top-0 min-[750px]:flex min-[750px]:min-h-screen min-[750px]:items-center">
              <div className="min-[750px]:mx-auto min-[750px]:w-full min-[750px]:max-w-[550px]">
                <h1 id="p-title" className="mt-[11px] pr-[70px] font-promo text-[28px] font-normal leading-[33.6px] min-[750px]:mt-0">
                  {product.name}
                </h1>
                <div className="mb-4 flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
                  <p id="p-price" className="py-1 text-[14px] leading-[19.25px] lg:text-[16px] lg:leading-[22px]">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-[13px] leading-[18.2px]">Placeholder note for this product</p>
                </div>

                <div className="pb-[25px]">
                  <p className="mb-[9px] text-[12px] font-normal uppercase leading-4">
                    <span className="sr-only">Colour: </span>
                    <span id="p-color">{product.color}</span>
                  </p>
                  <ul id="p-swatches" className="swatches" role="list">
                    {colorSiblings(product).map((sibling) => {
                      const color = getColor(sibling.color);
                      return (
                        <li key={sibling.slug}>
                          <Link
                            href={`/product/${sibling.slug}`}
                            className={color?.pale ? 'swatch is-pale' : 'swatch'}
                            style={{ background: color?.swatch }}
                            aria-label={sibling.color}
                            aria-current={sibling === product ? 'page' : undefined}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <ProductActions slug={product.slug} />

                <ProductTabs noun={getCollection(product.collection).noun} />
              </div>
            </div>
          </div>
        </div>
      </article>

      <MoreScrunchies related={relatedTo(product)} currentSlug={product.slug} />

      <BuyBar product={product} />
    </>
  );
}
