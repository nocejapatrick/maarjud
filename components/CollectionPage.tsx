import { CollectionView } from '@/components/CollectionView';
import { ProcessSection } from '@/components/ProcessSection';
import { getCollection, productsIn, type Collection } from '@/lib/products';

// A collection page: intro, filters and sorting, the product grid, then how the pieces are made.
// Every collection uses this one layout; the words and products come from lib/products.ts.
export function CollectionPage({ slug }: { slug: Collection['slug'] }) {
  const collection = getCollection(slug);

  return (
    <>
      {/* Collection intro */}
      <section className="px-[46px] pb-[15px] pt-[26px] lg:mx-auto lg:grid lg:max-w-[800px] lg:grid-cols-2 lg:items-center lg:px-0 lg:pb-[51px] lg:pt-[41px]">
        <h1 className="font-serif text-[26px] italic leading-none lg:text-[30px]">{collection.title}</h1>
        <p className="mt-[26px] max-w-[224px] text-[14px] leading-[16.8px] lg:mt-0 lg:max-w-none lg:text-[16px] lg:leading-[19px]">
          {collection.intro}
        </p>
      </section>

      <CollectionView products={productsIn(slug)} />

      <ProcessSection process={collection.process} />
    </>
  );
}
