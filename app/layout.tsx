import type { Metadata } from 'next';
import { Baskervville } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@/components/Analytics';
import { BagDrawer } from '@/components/BagDrawer';
import { BagProvider } from '@/components/BagProvider';
import { ConsentBanner } from '@/components/ConsentBanner';
import { ConsentProvider } from '@/components/ConsentProvider';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

// Rubik (basic Latin, weights 300 to 400 in one file; from Google Fonts, SIL Open Font License).
// It is a local file rather than next/font/google on purpose: Google's version also declares an extended character
// set that claims the peso sign without containing it, so every page downloaded an extra 18 KB font for nothing.
const rubik = localFont({ src: './fonts/rubik-latin.woff2', weight: '300 400', style: 'normal', display: 'swap', variable: '--font-rubik' });
const baskervville = Baskervville({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-baskervville' });

// Rubik has no peso sign. next/font pairs every font with an Arial-based stand-in, which would draw ₱ heavier than
// the text around it, so the page uses the bare font name and lets ₱ fall through to the system font instead.
const bodyFont = rubik.style.fontFamily.split(',')[0];

export const metadata: Metadata = {
  // TODO: set NEXT_PUBLIC_SITE_URL to the live address when the site is hosted (used for link previews)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Scrunchies | Maarjud', template: '%s | Maarjud' },
  description: 'Placeholder description for the scrunchies collection page.',
  icons: {
    icon: [
      { url: '/brand_assets/maarjud-icon.svg', type: 'image/svg+xml' },
      { url: '/brand_assets/maarjud-icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/brand_assets/maarjud-icon-512.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${baskervville.variable}`}
      style={{ '--font-body': bodyFont } as React.CSSProperties}
      data-scroll-behavior="smooth"
      // browser extensions add their own attributes to <html> before React starts, which React would otherwise
      // report as an error. This only quiets attribute differences on this one tag, not anything inside the page.
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ConsentProvider>
        <BagProvider>
          {/* first in the page so keyboard and screen reader users meet it first; it is fixed to the bottom of the screen */}
          <ConsentBanner />

          {/* Announcement bar */}
          <p className="on-velvet flex h-9 items-center justify-center bg-velvet px-4 text-center text-[12px] font-light text-surface lg:text-[14px]">
            Free shipping on orders over ₱1,000
          </p>

          <Header />

          <main className="flex-1">{children}</main>

          <Footer />

          {/* Offer tab: full width and peeking up from the bottom edge on small screens, a corner tab on wide ones */}
          <a
            href="#newsletter-email"
            className="fixed -bottom-[13px] left-5 right-5 z-40 flex h-[50px] items-center justify-center rounded-t-[4px] bg-blush font-promo text-[18px] font-normal text-rouge transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] active:translate-y-0 lg:bottom-0 lg:right-auto lg:w-[184px]"
          >
            Get 10% Off
          </a>

          <BagDrawer />
        </BagProvider>

        <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
