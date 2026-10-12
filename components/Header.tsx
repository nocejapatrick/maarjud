'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { useBag } from '@/components/BagProvider';
import { mainNav, secondaryNav } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const bag = useBag();

  const current = (href: string) => (href === pathname ? 'page' : undefined);

  return (
    <>
      <header className="relative flex h-[66px] items-center px-[var(--outer)] lg:h-[77px]">
        <button
          type="button"
          className="icon-btn -ml-[5px] lg:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={() => menu.current?.showModal()}
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M0 1h20M0 8h20M0 15h20" />
          </svg>
        </button>

        {/* Brand logo from public/brand_assets (ink wordmark, rouge ring). Small screens: it sits where the reference
            puts the wordmark; on very narrow phones it centres in the gap between menu and icons */}
        <Link
          href="/"
          className="logo absolute left-[calc(50%-44px)] top-1/2 -translate-x-1/2 -translate-y-1/2 min-[390px]:left-[47.4%] lg:static lg:ml-[2px] lg:translate-x-0 lg:translate-y-0"
          aria-label="Maarjud home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand_assets/maarjud-logo.svg" alt="" width={814} height={239} className="block h-[35px] w-auto max-w-none lg:h-[38px]" />
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <ul className="flex gap-[30px] whitespace-nowrap text-[14px] font-normal">
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="link" aria-current={current(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-[2px] ml-auto flex items-center gap-3 lg:-mr-1 lg:gap-4">
          <button type="button" className="link mr-1 hidden gap-2 text-[14px] font-normal xl:inline-flex" aria-label="Currency: Philippine peso">
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
              <rect width="20" height="7" fill="#0038a8" />
              <rect y="7" width="20" height="7" fill="#ce1126" />
              <path d="M0 0l9 7-9 7z" fill="#ffffff" />
              <circle cx="3" cy="7" r="1.3" fill="#fcd116" />
            </svg>
            PHP ₱
          </button>

          <a href="#" className="icon-btn" aria-label="Account">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="9.5" r="3" />
              <path d="M5.8 18.6c1.3-2.2 3.5-3.5 6.2-3.5s4.9 1.3 6.2 3.5" strokeLinecap="round" />
            </svg>
          </a>
          {/* search leads the group on small screens, sits second on wide ones */}
          <button type="button" className="icon-btn order-first lg:order-none" aria-label="Search">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="9" />
              <path d="M17.6 17.6L22 22" />
            </svg>
          </button>
          <button
            type="button"
            className="icon-btn relative"
            aria-label={bag.count ? `Bag, ${bag.count} ${bag.count === 1 ? 'item' : 'items'}` : 'Bag, empty'}
            aria-haspopup="dialog"
            onClick={bag.open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
              <path d="M4.5 8.5h15L21 21H3z" />
              <path d="M8.5 8.5V6a3.5 3.5 0 017 0v2.5" strokeLinecap="round" />
            </svg>
            {bag.count > 0 && (
              <span className="bag-count" aria-hidden="true">
                {bag.count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Menu drawer (small screens) */}
      <dialog
        ref={menu}
        id="menu"
        className="drawer"
        aria-label="Menu"
        // close when the dimmed area outside the panel is tapped
        onClick={(event) => {
          if (event.target === menu.current) menu.current?.close();
        }}
      >
        <div className="flex h-full flex-col px-4 pb-8">
          <div className="flex h-[66px] shrink-0 items-center">
            <button type="button" className="icon-btn -ml-[5px]" aria-label="Close menu" onClick={() => menu.current?.close()}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M1 1l16 16M17 1L1 17" />
              </svg>
            </button>
          </div>

          <nav aria-label="Main">
            <ul className="text-[19px] leading-[44px]">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link" aria-current={current(item.href)} onClick={() => menu.current?.close()}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-auto text-[14px] leading-[32px]">
            {secondaryNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="link" onClick={() => menu.current?.close()}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
