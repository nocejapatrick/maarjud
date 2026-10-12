import type { Metadata } from 'next';
import Link from 'next/link';
import { Ring } from '@/components/Ring';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Connect with us',
  description: 'How to reach Maarjud: message us on Instagram to order, to ask a question or to show us how you wore yours.',
};

// The Connect With Us page. The contact details come from lib/site.ts; until the Instagram username is filled in
// there, the page shows a stand-in and no button.
export default function ConnectPage() {
  const handle = site.instagram ? `@${site.instagram}` : '';

  return (
    <>
      {/* Intro: same shape as the collection pages */}
      <section className="px-[46px] pb-[15px] pt-[26px] lg:mx-auto lg:grid lg:max-w-[800px] lg:grid-cols-2 lg:items-center lg:px-0 lg:pb-[51px] lg:pt-[41px]">
        <h1 className="font-serif text-[26px] italic leading-none lg:text-[30px]">Connect with us</h1>
        <p className="mt-[26px] max-w-[224px] text-[14px] leading-[16.8px] lg:mt-0 lg:max-w-none lg:text-[16px] lg:leading-[19px]">
          An order, a question about a colour, a photo of you wearing yours: it all comes straight to us, and we read
          every message ourselves.
        </p>
      </section>

      {/* Instagram: the one place every message goes */}
      <section className="on-velvet relative overflow-hidden bg-velvet text-surface" aria-labelledby="instagram-title">
        <Ring className="pointer-events-none absolute -right-[104px] -top-[104px] h-[208px] w-[208px] text-gold lg:-right-[70px] lg:top-1/2 lg:h-[440px] lg:w-[440px] lg:-translate-y-1/2" />
        <div className="relative px-[46px] py-12 lg:mx-auto lg:max-w-[800px] lg:px-0 lg:py-24">
          <h2 id="instagram-title" className="text-[14px] leading-[20px] text-blush">
            Message us on Instagram
          </h2>
          <p className="mt-4 break-words font-serif text-[40px] italic leading-none lg:text-[64px]">{handle || '@your-username'}</p>
          <p className="mt-6 max-w-[300px] text-[14px] font-light leading-[20px]">
            The quickest way to reach us, and where every order is sent.
          </p>
          {site.instagram ? (
            <a href={`https://ig.me/m/${site.instagram}`} className="btn-light mt-6" target="_blank" rel="noopener noreferrer">
              Open Instagram
            </a>
          ) : (
            <p className="mt-6 max-w-[300px] text-[13px] font-light leading-[20px] text-blush">
              Placeholder: add the shop&apos;s Instagram username in lib/site.ts and the button appears here.
            </p>
          )}
        </div>
      </section>

      {/* What people get in touch for */}
      <ul role="list" className="grid gap-px bg-line min-[750px]:grid-cols-3">
        <li className="bg-surface-raised px-[46px] py-6 min-[750px]:px-6 min-[750px]:pb-12">
          <h2 className="text-[14px] font-normal leading-[20px]">To order</h2>
          <p className="mt-2 text-[13px] leading-[20px] text-ink-muted">
            Add what you like to your bag and it writes the order message for you. Send it to us on Instagram, and we
            reply to confirm it with GCash payment details.
          </p>
          <p className="mt-4 text-[13px] leading-[20px]">
            <Link href="/" className="link">
              Shop scrunchies
            </Link>
          </p>
        </li>
        <li className="bg-surface-raised px-[46px] py-6 min-[750px]:px-6 min-[750px]:pb-12">
          <h2 className="text-[14px] font-normal leading-[20px]">To ask</h2>
          <p className="mt-2 text-[13px] leading-[20px] text-ink-muted">
            A colour you cannot find, which size to pick, an order on its way: ask us. We reply as soon as we can.
          </p>
          {site.email && (
            <p className="mt-4 text-[13px] leading-[20px]">
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </p>
          )}
        </li>
        <li className="bg-surface-raised px-[46px] py-6 min-[750px]:px-6 min-[750px]:pb-12">
          <h2 className="text-[14px] font-normal leading-[20px]">To show off</h2>
          <p className="mt-2 text-[13px] leading-[20px] text-ink-muted">
            Wore it out? Tag us{handle ? ` (${handle})` : ''} on Instagram. Bagay sa&apos;yo, and we want to see it.
          </p>
          {site.instagram && (
            <p className="mt-4 text-[13px] leading-[20px]">
              <a href={`https://www.instagram.com/${site.instagram}/`} className="link" target="_blank" rel="noopener noreferrer">
                See our Instagram
              </a>
            </p>
          )}
        </li>
      </ul>
    </>
  );
}
