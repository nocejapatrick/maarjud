// The product list: the one place to add, remove or edit products.
// Each product belongs to one collection (see `collections` below). Within a collection, the order here is the
// "Featured" order on its page.
// Scrunchie photos are free-licence stock stand-ins (Unsplash: Sincerely Media, John Carlo Tubelleza, Ifrah Akhter,
// Reve Haus, StartVisuals, Sandra Ivleva, Karlis Zalans; Pexels: Luana Mundek), cropped to 2:3.
// Replace with the shop's own product photos. Names and prices are placeholders too.
// Hair clip photos are public-domain (CC0) stand-ins from the WordPress Photo Directory, cropped to 2:3:
// wordpress.org/photos/photo/ 36768b93fd, 5769d55084, 4996a15c6e, 109684baf5, 3546a1983d, 59969bd182, 63669bac40,
// 8226a08012. They show crocheted flowers and bows rather than the shop's own clips: replace them too.
// pexel-hair-clips.jpg (bunny and carrot clips) is a Pexels photo the shop owner added; it is a stand-in as well.

export type Collection = {
  slug: 'scrunchies' | 'hair-clips';
  /** address of the collection page */
  path: string;
  title: string;
  /** one of these, in running text: "this scrunchie", "this hair clip" */
  noun: string;
  intro: string;
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
      'Placeholder copy for this collection. Say what the pieces are made from, how they sit in the hair and why they are worth it, in three or four short lines about this long, give or take a word. Swap it for yours.',
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
    intro:
      'Placeholder copy for this collection. Say what the clips are made from, how they hold in the hair and why they are worth it, in three or four short lines about this long, give or take a word. Swap it for yours.',
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
  { collection: 'scrunchies', family: 'satin', slug: 'red-satin-scrunchie', name: 'Red satin scrunchie', price: 180, color: 'Red', rank: 1, date: '2026-09-20', inStock: true, image: '/images/tile-01.jpg' },
  { collection: 'scrunchies', family: 'satin', slug: 'champagne-satin-scrunchie', name: 'Champagne satin scrunchie', price: 180, color: 'Champagne', rank: 4, date: '2026-08-02', inStock: true, image: '/images/tile-02.jpg' },
  { collection: 'scrunchies', slug: 'velvet-scrunchie-stack', name: 'Velvet scrunchie stack', price: 640, color: 'Multi', rank: 9, date: '2026-10-01', inStock: true, image: '/images/tile-03.jpg' },
  { collection: 'scrunchies', family: 'satin', slug: 'cocoa-satin-scrunchie', name: 'Cocoa satin scrunchie', price: 180, color: 'Cocoa', rank: 6, date: '2026-07-15', inStock: true, image: '/images/tile-04.jpg' },
  { collection: 'scrunchies', slug: 'pearl-organza-scrunchie', name: 'Pearl organza scrunchie', price: 200, color: 'Pearl', rank: 3, date: '2026-10-05', inStock: true, image: '/images/tile-05.jpg' },
  { collection: 'scrunchies', family: 'satin', slug: 'gold-satin-scrunchie', name: 'Gold satin scrunchie', price: 180, color: 'Gold', rank: 5, date: '2026-06-30', inStock: true, image: '/images/tile-06.jpg' },
  { collection: 'scrunchies', slug: 'black-velvet-scrunchie', name: 'Black velvet scrunchie', price: 220, color: 'Black', rank: 2, date: '2026-09-01', inStock: true, image: '/images/tile-07.jpg' },
  { collection: 'scrunchies', family: 'satin', slug: 'pink-satin-scrunchie', name: 'Pink satin scrunchie', price: 180, color: 'Pink', rank: 7, date: '2026-09-12', inStock: true, image: '/images/tile-08.jpg' },
  { collection: 'scrunchies', family: 'satin', slug: 'honey-satin-scrunchie', name: 'Honey satin scrunchie', price: 180, color: 'Honey', rank: 10, date: '2026-05-18', inStock: true, image: '/images/tile-09.jpg' },
  { collection: 'scrunchies', family: 'satin', slug: 'ivory-satin-scrunchie', name: 'Ivory satin scrunchie', price: 180, color: 'Ivory', rank: 8, date: '2026-06-10', inStock: true, image: '/images/tile-10.jpg' },
  { collection: 'scrunchies', slug: 'linen-scrunchie-pair', name: 'Linen scrunchie pair', price: 340, color: 'Cream', rank: 12, date: '2026-08-21', inStock: true, image: '/images/tile-11.jpg' },
  { collection: 'scrunchies', slug: 'peach-cotton-scrunchie', name: 'Peach cotton scrunchie', price: 160, color: 'Peach', rank: 11, date: '2026-07-28', inStock: true, image: '/images/tile-12.jpg' },
  { collection: 'scrunchies', slug: 'gold-satin-and-clip-set', name: 'Gold satin and clip set', price: 320, color: 'Gold', rank: 13, date: '2026-04-25', inStock: true, image: '/images/tile-13.jpg' },
  { collection: 'scrunchies', slug: 'blue-and-white-pair', name: 'Blue and white pair', price: 340, color: 'Blue', rank: 14, date: '2026-03-30', inStock: true, image: '/images/tile-14.jpg' },

  // Hair clips: placeholder names and prices, named after what the stand-in photos show
  { collection: 'hair-clips', slug: 'bunny-and-carrot-crochet-clip-set', name: 'Bunny and carrot crochet clip set', price: 320, color: 'Multi', rank: 9, date: '2026-10-11', inStock: true, image: '/images/pexel-hair-clips.jpg' },
  { collection: 'hair-clips', family: 'rose', slug: 'lilac-rose-crochet-clip', name: 'Lilac rose crochet clip', price: 140, color: 'Lilac', rank: 2, date: '2026-10-06', inStock: true, image: '/images/clip-01.jpg' },
  { collection: 'hair-clips', slug: 'gold-sunflower-crochet-clip', name: 'Gold sunflower crochet clip', price: 150, color: 'Gold', rank: 1, date: '2026-10-02', inStock: true, image: '/images/clip-02.jpg' },
  { collection: 'hair-clips', family: 'rose', slug: 'red-rose-crochet-clip', name: 'Red rose crochet clip', price: 140, color: 'Red', rank: 3, date: '2026-09-28', inStock: true, image: '/images/clip-03.jpg' },
  { collection: 'hair-clips', slug: 'pink-lotus-crochet-clip', name: 'Pink lotus crochet clip', price: 160, color: 'Pink', rank: 4, date: '2026-09-15', inStock: true, image: '/images/clip-04.jpg' },
  { collection: 'hair-clips', slug: 'ivory-bloom-hair-clip', name: 'Ivory bloom hair clip', price: 180, color: 'Ivory', rank: 5, date: '2026-09-03', inStock: true, image: '/images/clip-05.jpg' },
  { collection: 'hair-clips', slug: 'marigold-crochet-clip', name: 'Marigold crochet clip', price: 150, color: 'Marigold', rank: 6, date: '2026-08-30', inStock: true, image: '/images/clip-06.jpg' },
  { collection: 'hair-clips', slug: 'pink-bow-hair-clip', name: 'Pink bow hair clip', price: 130, color: 'Pink', rank: 7, date: '2026-08-12', inStock: true, image: '/images/clip-07.jpg' },
  { collection: 'hair-clips', slug: 'rose-garland-crochet-clip', name: 'Rose garland crochet clip', price: 220, color: 'Red', rank: 8, date: '2026-07-20', inStock: true, image: '/images/clip-08.jpg' },
];

const bySlug = new Map(products.map((product) => [product.slug, product]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug.toLowerCase());
}

/** ₱180.00 PHP */
export function formatPrice(pesos: number): string {
  return `₱${pesos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PHP`;
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
