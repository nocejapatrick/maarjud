# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Project Structure (Next.js)
This is a Next.js 16 site (App Router, TypeScript, Tailwind CSS 3). It was a single `index.html` until October 2026; that version is kept in `legacy-static/` for reference only.
- `app/` — pages. `app/page.tsx` is the Scrunchies collection (the home page), `app/hair-clips/page.tsx` is the Hair Clips collection, `app/product/[slug]/page.tsx` is the product page (`/product/name-of-product`), `app/connect/page.tsx` is the Connect With Us page (`/connect`), `app/layout.tsx` wraps every page (announcement bar, header, footer, offer tab, bag).
- `app/globals.css` — design tokens as CSS variables and all component styles.
- `components/` — shared pieces (header, footer, product card, filters and grid, bag). `components/product/` holds the product page parts.
- `lib/products.ts` — **the product list and the collections. Add, remove or edit products here**; the collection pages, product pages and bag all read from it. Each product names its `collection`. Every collection page uses the same layout (`components/CollectionPage.tsx`): to add a collection, add it to `collections` in this file, add a page in `app/` that renders `<CollectionPage slug="..." />`, and add a link in `lib/site.ts`. The stock stand-in products were removed in October 2026: the list now holds only products the shop owner supplied (photo notes are at the top of `lib/products.ts`). `lib/colors.ts` holds fabric swatch colours, `lib/site.ts` holds navigation links and the shop's contact details (Instagram username, email). While the Instagram username is empty, the Connect With Us page shows a stand-in and no button.
- `public/images/` — product photos. `public/brand_assets/` — logos and icons.
- `scripts/prepare_photos.py` — gets new product photos ready: crops to 2:3 portrait, resizes to 1600 x 2400, converts to sRGB JPG (HEIC included) and strips location data. Originals go in `new-photos/` (not in git); run `python3 scripts/prepare_photos.py` and the results land in `public/images/`. New photos should go through it rather than being copied in by hand.
- Next.js 16 has breaking changes from earlier versions. Before using an API you are not sure of, read the matching guide in `node_modules/next/dist/docs/`.

## Ordering
- There is no online checkout. Customers add scrunchies to the bag, copy the order message the bag writes for them, and send it on Instagram. Payment is arranged through GCash.
- Hair clips are sold in pairs, ₱89 a pair. The Hair Clips collection has `unit: 'pair'` in `lib/products.ts`, so its prices read "per pair" everywhere (use `priceLabel(product)`, not `formatPrice`, wherever a product's price is shown) and the bag and order message count pairs.
- The bag is saved in the customer's browser only (`components/BagProvider.tsx`, `components/BagDrawer.tsx`).
- The shop's Instagram username goes in `lib/site.ts`. While it is empty, the bag shows no "Open Instagram" button.

## Privacy notice
- A notice (`components/ConsentBanner.tsx`) asks each new visitor to choose **Accept** or **Only my bag**. The choice is kept by `components/ConsentProvider.tsx`.
- The bag is always saved in the browser, because it cannot work otherwise. Anything optional must check `useConsent().choice === 'all'` first. Today that is "Recently viewed" and Google Analytics. Any other tracking added later must wait for Accept in the same way, and the notice and `/privacy` page text must be updated to say so.
- Google Analytics (`components/Analytics.tsx`, measurement ID in `lib/site.ts`) loads only on the live site (production builds, never `npm run dev`) and only after Accept. Choosing "Only my bag" switches it off and removes its cookies.
- `app/privacy/page.tsx` is the Privacy page. Two of its sections are still placeholders for the shop owner to fill in.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Next.js needs Node 20.9 or newer. This machine's default Node is older, so run `nvm use` in the project folder first (`.nvmrc` picks Node 24).
- Start the dev server: `npm run dev` (serves the site at `http://localhost:3000`). Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.
- Before calling a change done, `npm run build` must pass.

## Screenshot Workflow
- Puppeteer is a dev dependency of this project (`node_modules/puppeteer`).
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Next.js pages and React components (see Project Structure). Server components by default; add `'use client'` only to parts that need clicks, state or browser storage.
- Tailwind CSS 3, compiled by Next.js (`tailwind.config.ts`, `postcss.config.mjs`). Do not use the Tailwind CDN script.
- Component styles that are more than a few utilities go in `app/globals.css`, above `@tailwind utilities`.
- Product photos go through `components/ProductImage.tsx`, never a bare `next/image` or `<img>`. It loads a photo only when it is on, or about 200px from, the screen and then fades it in; pass `eager` only for photos that are on screen when the page opens, and `first` for the single biggest photo on screen at page open (one per page: it is fetched ahead of everything else, which is what the phone speed score depends on). It uses `next/image` for files in `public/images` and a plain `<img>` for placeholder images (`https://placehold.co/WIDTHxHEIGHT`).
- Links between pages use `next/link`.
- Rubik is loaded from `app/fonts/rubik-latin.woff2` with `next/font/local`, not `next/font/google`: Google's version makes every page download an extra font file for the peso sign, which Rubik does not contain. ₱ is drawn by the system font.
- Mobile-first responsive

## Brand Assets
- Always check the `public/brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Maarjud Design System
This project is the website for **Maarjud** — a scrunchie brand (handmade crafts later). *Arjud / maarjud* means someone fully dolled up: glamorous, adorned, a little extra, and proud of it. The site should feel like getting ready with your best friend: generous, witty, a bit dramatic, never snobbish. **These values override the generic guardrails below wherever they differ.**

### Colors — use these exact hex values, nothing else
| Token | Hex | Use |
|---|---|---|
| `surface` | `#fbf4ec` | Page background (warm pearl) |
| `surface-raised` | `#fffaf5` | Product cards, drawers, cart, form fields |
| `line` | `#e8d6c9` | Decorative dividers only (never input borders) |
| `ink` | `#2b1320` | Headlines and body text. Never pure black |
| `ink-muted` | `#6b4f5c` | Captions, fabric notes, helper text; input & quiet-button borders |
| `rouge` | `#b3124f` | Hero color: primary buttons, links, sale prices, focus ring. Text on it: `surface` |
| `velvet` | `#4a0f2b` | Announcement bar, footer, dramatic hero bands. Text on it: `surface`, `blush` or `gold` |
| `gold` | `#d4a03c` | Trim only: badges, stars, ornaments, thin rules. Text on it: `ink`. Never gold text on light grounds |
| `blush` | `#f5cfd3` | Promo strips, selected swatches, soft section grounds. Text on it: `ink` or `rouge` |
| `jade` | `#2e6f5c` | In stock / success (always with a word or ✓); the future Crafts line |

- One `rouge` primary action per view.
- They are defined in `tailwind.config.ts` and as CSS variables in `app/globals.css`. Use the token names — never raw Tailwind colors.

### Typography (Google Fonts)
- **Display:** Bodoni Moda (500–600, roman + italic). **Body:** Figtree (400, 600).
- `display` 64/68px, 600, -0.01em — hero headline, once per page
- `heading` 36/42px, 500 — section and collection titles
- `heading-italic` 24/30px, 500 italic — product names and pull-quotes (the italic is the signature)
- `body` 16/26px, 400 — running copy · `body-strong` 16/26px, 600 — prices, button labels
- `small` 14/20px, 400 — captions, fabric notes, helper/error text
- `label` 12/16px, 600, 0.14em tracking, UPPERCASE — eyebrows, badges, nav
- On mobile, scale `display` down to ~40px and `heading` to ~28px.
- **Current state:** the pages still use the fonts from the reference site they were cloned from — Rubik (300/400) for text, Baskervville italic for headings, Times New Roman for product titles and the offer tab — and its small type sizes. Bodoni Moda and Figtree are not in use yet. Keep new work consistent with the existing pages unless the user asks to switch.

### Spacing & radius
- Spacing: `space-xs` 8px · `space-sm` 16px · `space-md` 24px · `space-lg` 48px. Use only these (and multiples).
- Radius: `radius-sm` 6px (inputs, badges) · `radius-lg` 20px (cards, photos, promo blocks) · `radius-pill` 9999px (buttons, swatches, chips).

### Brand rules
- **No drop shadows.** Separate layers with `surface-raised` on `surface`, or with `line`.
- **No dark gradient overlays on photos.** Product photos are warm, daylight, close-up and tactile (the gather, the sheen). Put text on a solid `velvet` or `surface` band instead. One exception the user asked for: product tiles get a flat 15% `ink` wash on hover.
- Focus ring: solid 2px `rouge` outline, 2px offset.
- Signature motif: a ring of overlapping circles (the scrunchie silhouette) as an ornament in `gold` or `blush` on hero bands. Use `components/Ring.tsx`.
- Logo: use the files in `public/brand_assets/` — `maarjud-logo.svg` (ink wordmark, rouge ring) on light grounds, `maarjud-logo-reverse.svg` or `maarjud-logo-white.svg` on `velvet`/`rouge`, `maarjud-icon.svg` for the browser tab.

### Voice & copy
- Speak as **we** to **you**: warm, quick, confident — a compliment, not a sales pitch. ("Dolled up, on purpose." "One more won't hurt.")
- Light Taglish is welcome (*ganda*, *bagay sa'yo*), but product facts (fabric, size, price, care) are plain English.
- Product names = fabric + color + attitude: *Rouge Satin, oversized*.
- Prices in pesos: ₱180, ₱1,000. Sentence case for headings and buttons ("Add to bag"). No emoji in UI; one ✦ ornament allowed.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Use the Maarjud palette above.
- **Shadows:** Maarjud uses no drop shadows — depth comes from surface color, not shadow.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking on large headings, generous line-height (`1.6–1.7`) on body.
- **Gradients:** Avoid decorative gradients; use the solid brand color blocks. A subtle SVG grain texture on `velvet` bands is allowed.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Keep photos clean and warm — no dark overlays (except the hover wash noted above). Use `radius-lg` corners.
- **Spacing:** Use the Maarjud spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (`surface` → `surface-raised` → drawers/modals), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color