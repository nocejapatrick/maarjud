'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { policyNav, secondaryNav } from '@/lib/site';

export function Footer() {
  const onProductPage = usePathname().startsWith('/product/');

  return (
    <>
      {/* Footer: stacked on small screens, a single bar on wide ones */}
      <footer className="on-velvet mt-px bg-velvet px-5 pb-[39px] pt-[39px] text-surface lg:h-[47px] lg:p-0">
        <div className="lg:grid lg:h-full lg:grid-cols-[1fr_minmax(120px,440px)_1fr] lg:items-center lg:gap-x-6 lg:pl-5 lg:pr-14 min-[1500px]:gap-x-0">
          <nav aria-label="Footer" className="hidden lg:block lg:pl-[209px]">
            <ul className="flex gap-x-[30px] text-[12px]">
              {secondaryNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <form className="flex h-[29px] items-center border-b border-surface lg:mb-[3px] lg:h-[25px]" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            {/* 16px on phones: iOS zooms the page (and lets it pan sideways) when a focused field has smaller text */}
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              className="h-full min-w-0 flex-1 bg-transparent text-[16px] font-light text-surface outline-offset-4 placeholder:text-blush lg:text-[12px]"
            />
            <button type="submit" className="link px-3 text-[14px] font-light uppercase lg:text-[11px]">
              Join
            </button>
          </form>

          <nav aria-label="Policies" className="mt-[24px] lg:-mr-9 lg:mt-0 lg:justify-self-end">
            <ul className="text-[12px] uppercase leading-[22px] lg:flex lg:gap-x-[30px] lg:whitespace-nowrap lg:text-[12px] lg:normal-case lg:leading-normal">
              {policyNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>

      {/* on product pages, leaves room under the footer for the buy bar */}
      {onProductPage && <div className="hidden h-20 bg-velvet lg:block" aria-hidden="true" />}
    </>
  );
}
