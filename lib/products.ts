// The product list: the one place to add, remove or edit products.
// Each product belongs to one collection (see `collections` below). Within a collection, the order here is the
// "Featured" order on its page.
// silver-satin-scrunchie.jpg and silver-satin-scrunchie-with-green-bow.jpg are the shop's own scrunchies, cut out
// and placed on the same plain studio backdrop with a soft shadow.
// tulip-hair-clip-on-lace.jpg is the shop's own tulip clip (front and back) placed on the bare tabletop from a Pexels
// stock photo (pexel-hair-clips.jpg), with a lace doily that was drawn for it. It is a composite, not a single photograph.
// rose-hair-clip-on-lace.jpg is the shop's own rose clip (a cut-out the shop owner supplied) placed on that same
// tabletop and drawn doily.
// pastel-blue-flower-hair-clip-on-lace.jpg is the shop's own blue flower clip (front and back, a cut-out the shop owner
// supplied) placed on that same tabletop and drawn doily.
// red-flower-hair-clip-on-lace.jpg is the shop's own red flower clip (front and back, a cut-out the shop owner supplied)
// placed on that same tabletop and drawn doily.
// golden-sunflower-hair-clip-on-lace.jpg is the shop's own golden sunflower clip (front and back, a cut-out the shop owner
// supplied) placed on that same tabletop and drawn doily.
// golden-crochet-flower-hair-clip-on-lace.jpg and red-crochet-bow-hair-clip-on-lace.jpg are the shop's own clips (front
// and back, cut-outs the shop owner supplied) placed on that same tabletop and drawn doily.
// pink-satin-scrunchie-with-tulip-ribbon.jpg is the shop's own scrunchie, cut out of a photo on linen and placed on the
// same plain studio backdrop as the silver scrunchies.
// Hair clips are sold in pairs at ₱89 a pair (set by the shop owner). Scrunchies are ₱50 plain and ₱65 with a ribbon (set by the shop owner).

import { channelNames } from '@/lib/site';

export type Collection = {
  slug: 'scrunchies' | 'hair-clips';
  /** address of the collection page */
  path: string;
  title: string;
  /** one of these, in running text: "this scrunchie", "this hair clip" */
  noun: string;
  /** the paragraph beside the title at the top of the collection page: what the pieces are, in the words people search with */
  intro: string;
  /** the browser tab and search result title (about 60 characters at most), and the search result summary (about 155) */
  metaTitle: string;
  metaDescription: string;
  /** what one price buys, when it is more than one piece: shown as "₱89.00 PHP per pair", and the bag counts in it */
  unit?: string;
  /** the "How we create ..." section under the grid: a title, one line, and four steps */
  process: { title: string; intro: string; steps: { title: string; text: string }[] };
};

export const collections: Collection[] = [
  {
    slug: 'scrunchies',
    path: '/',
    title: 'Scrunchies',
    noun: 'scrunchie',
    intro:
      "Handmade satin scrunchies from the Philippines, gathered full and finished by hand. Satin glides over your hair instead of snagging it, so it is gentler on your ponytail. Bagay sa'yo, promise.",
    metaTitle: 'Handmade Satin Scrunchies in the Philippines | Maarjud',
    metaDescription:
      `Handmade satin scrunchies from Maarjud, made in the Philippines: full, soft and gentle on your hair. Order on ${channelNames}, pay with GCash.`,
    // placeholder steps: swap in the real process
    process: {
      title: 'How we create scrunchies',
      intro: 'By hand, a few at a time. Here is what happens before one reaches you.',
      steps: [
        { title: 'Pick the fabric', text: 'Satin, velvet or cotton, chosen for how it catches the light and how it feels in your hand.' },
        { title: 'Cut it generous', text: 'Each strip is cut long and wide, so the gather comes out full.' },
        { title: 'Sew and thread', text: 'We stitch the strip into a tube, turn it out and run a soft elastic through.' },
        { title: 'Finish by hand', text: 'The last seam is closed by hand, and every scrunchie is checked before it is packed.' },
      ],
    },
  },
  {
    slug: 'hair-clips',
    path: '/hair-clips',
    title: 'Hair Clips',
    noun: 'hair clip',
    unit: 'pair',
    intro:
      'Handmade hair clips, crocheted stitch by stitch into sunflowers, tulips, bows and little blooms, plus a satin ribbon rose. Sold in pairs at ₱89 a pair: one for each side, or one for your bestie.',
    metaTitle: 'Handmade Crochet Hair Clips, ₱89 a Pair | Maarjud',
    metaDescription:
      `Handmade crochet hair clips from the Philippines: sunflowers, tulips, bows, blooms and a ribbon rose, ₱89 a pair. Order on ${channelNames}, pay with GCash.`,
    // placeholder steps: swap in the real process
    process: {
      title: 'How we create hair clips',
      intro: 'One stitch at a time. Here is what happens before a clip reaches you.',
      steps: [
        { title: 'Pick the yarn', text: 'Soft cotton yarn, chosen for colours that stay bright and a feel that is kind to your hair.' },
        { title: 'Crochet the shape', text: 'Each petal, bow or bloom is worked by hand, stitch by stitch.' },
        { title: 'Fix it to the clip', text: 'We sew the piece onto a snap clip, firmly enough to stay put all day.' },
        { title: 'Shape and check', text: 'Every clip is shaped by hand and checked before it is packed.' },
      ],
    },
  },
];

export type Product = {
  /** address of the product page: /product/<slug> */
  slug: string;
  /** which collection page it appears on */
  collection: Collection['slug'];
  /** products with the same family show each other as colour swatches on the product page */
  family?: string;
  name: string;
  /** pesos */
  price: number;
  /** must match a name in lib/colors.ts */
  color: string;
  /** best-selling rank, 1 = best seller */
  rank: number;
  /** date added, YYYY-MM-DD */
  date: string;
  inStock: boolean;
  /** a file in public/images, or a full placehold.co address while there is no photo */
  image: string;
};

export const products: Product[] = [
  { collection: 'scrunchies', slug: 'pink-satin-scrunchie-with-tulip-ribbon', family: 'tulip-ribbon', name: 'Pink satin scrunchie with tulip ribbon', price: 65, color: 'Pink', rank: 17, date: '2026-10-25', inStock: true, image: '/images/pink-satin-scrunchie-with-tulip-ribbon.jpg' },
  { collection: 'scrunchies', slug: 'silver-satin-scrunchie', name: 'Silver satin scrunchie', price: 50, color: 'Silver', rank: 16, date: '2026-10-11', inStock: true, image: '/images/silver-satin-scrunchie.jpg' },
  { collection: 'scrunchies', slug: 'silver-satin-scrunchie-with-green-bow', family: 'tulip-ribbon', name: 'Silver satin scrunchie with green bow', price: 65, color: 'Silver', rank: 15, date: '2026-10-11', inStock: true, image: '/images/silver-satin-scrunchie-with-green-bow.jpg' },

  // Hair clips
  { collection: 'hair-clips', slug: 'golden-crochet-flower-hair-clip', name: 'Golden crochet flower hair clip', price: 89, color: 'Yellow', rank: 17, date: '2026-10-25', inStock: true, image: '/images/golden-crochet-flower-hair-clip-on-lace.jpg' },
  { collection: 'hair-clips', slug: 'red-crochet-bow-hair-clip', name: 'Red crochet bow hair clip', price: 89, color: 'Red', rank: 16, date: '2026-10-25', inStock: true, image: '/images/red-crochet-bow-hair-clip-on-lace.jpg' },
  { collection: 'hair-clips', slug: 'golden-sunflower-hair-clip', name: 'Golden sunflower hair clip', price: 89, color: 'Yellow', rank: 15, date: '2026-10-14', inStock: true, image: '/images/golden-sunflower-hair-clip-on-lace.jpg' },
  { collection: 'hair-clips', slug: 'red-flower-hair-clip', name: 'Red flower hair clip', price: 89, color: 'Red', rank: 14, date: '2026-10-14', inStock: true, image: '/images/red-flower-hair-clip-on-lace.jpg' },
  { collection: 'hair-clips', slug: 'pastel-blue-flower-hair-clip', name: 'Pastel blue flower hair clip', price: 89, color: 'Blue', rank: 13, date: '2026-10-14', inStock: true, image: '/images/pastel-blue-flower-hair-clip-on-lace.jpg' },
  { collection: 'hair-clips', slug: 'rose-hair-clip', name: 'Rose hair clip', price: 89, color: 'Red', rank: 11, date: '2026-10-11', inStock: true, image: '/images/rose-hair-clip-on-lace.jpg' },
  { collection: 'hair-clips', slug: 'tulip-crochet-hair-clip', name: 'Tulip crochet hair clip', price: 89, color: 'Green', rank: 10, date: '2026-10-11', inStock: true, image: '/images/tulip-hair-clip-on-lace.jpg' },
];

const bySlug = new Map(products.map((product) => [product.slug, product]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug.toLowerCase());
}

/** ₱180.00 PHP */
export function formatPrice(pesos: number): string {
  return `₱${pesos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PHP`;
}

/** what one price buys, if the product is sold as a set (hair clips come in pairs) */
export function unitOf(product: Product): string | undefined {
  return getCollection(product.collection).unit;
}

/** ₱89.00 PHP per pair, or just ₱180.00 PHP for something sold singly */
export function priceLabel(product: Product): string {
  const unit = unitOf(product);
  return unit ? `${formatPrice(product.price)} per ${unit}` : formatPrice(product.price);
}

/** a collection page's title, search summary, preferred address and link preview */
export function collectionMetadata(slug: Collection['slug']) {
  const { metaTitle, metaDescription, path } = getCollection(slug);
  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: { canonical: path },
    openGraph: { title: metaTitle, description: metaDescription, url: path, siteName: 'Maarjud', locale: 'en_PH', type: 'website' as const },
  };
}

export function getCollection(slug: Collection['slug']): Collection {
  return collections.find((collection) => collection.slug === slug)!;
}

/** the products on a collection page, in "Featured" order */
export function productsIn(slug: Collection['slug']): Product[] {
  return products.filter((product) => product.collection === slug);
}

/** true while a product has no real photo and uses a placehold.co address */
export function isPlaceholderImage(image: string): boolean {
  return image.startsWith('http');
}

const sameFamily = (a: Product, b: Product) => a === b || (a.family !== undefined && a.family === b.family && a.collection === b.collection);

/** the colours a product page offers: the product's own family, in collection order */
export function colorSiblings(product: Product): Product[] {
  return products.filter((other) => sameFamily(other, product));
}

/** related products, all from the same collection: same family first, then the rest in collection order */
export function relatedTo(product: Product, limit = 6): Product[] {
  const others = productsIn(product.collection).filter((other) => other !== product);
  return [
    ...others.filter((other) => sameFamily(other, product)),
    ...others.filter((other) => !sameFamily(other, product)),
  ].slice(0, limit);
}
