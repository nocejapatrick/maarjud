// Fabric colours, used by the filter panel and the product page swatches.
// These are product colours, not brand colours: the brand palette lives in tailwind.config.ts.

export type FabricColor = {
  name: string;
  /** CSS background for the swatch */
  swatch: string;
  /** pale swatches get a thin outline so they show on the page background */
  pale?: boolean;
};

export const colors: FabricColor[] = [
  { name: 'Black', swatch: '#1a1a1a' },
  { name: 'Blue', swatch: '#8fb3da' },
  { name: 'Champagne', swatch: '#e6d5b4' },
  { name: 'Cocoa', swatch: '#6b5350' },
  { name: 'Cream', swatch: '#e3dccb', pale: true },
  { name: 'Gold', swatch: '#d2b06a' },
  { name: 'Honey', swatch: '#c8963c' },
  { name: 'Ivory', swatch: '#f4f0e4', pale: true },
  { name: 'Lilac', swatch: '#8d93d6' },
  { name: 'Marigold', swatch: '#f2a31c' },
  { name: 'Multi', swatch: 'linear-gradient(90deg, #2f4f8a 0 25%, #8a9a7a 25% 50%, #c47a9a 50% 75%, #e0685a 75%)' },
  { name: 'Peach', swatch: '#f4a98c' },
  { name: 'Pearl', swatch: '#f1ecc9', pale: true },
  { name: 'Pink', swatch: '#f0a8bf' },
  { name: 'Red', swatch: '#e0263c' },
];

export function getColor(name: string): FabricColor | undefined {
  return colors.find((color) => color.name === name);
}
