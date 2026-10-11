'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useBag, type BagLine } from '@/components/BagProvider';
import { ProductImage } from '@/components/ProductImage';
import { formatPrice } from '@/lib/products';
import { site } from '@/lib/site';

// The message a customer sends to place an order. Plain text, so it pastes cleanly into Instagram.
function orderMessage(lines: BagLine[], total: number): string {
  return [
    `Hi ${site.name}! I'd like to order:`,
    '',
    ...lines.map((line) => `${line.quantity} x ${line.product.name} (${formatPrice(line.quantity * line.product.price)})`),
    '',
    `Subtotal: ${formatPrice(total)}`,
    "I'll pay through GCash.",
  ].join('\n');
}

// The bag: a drawer from the right. There is no online checkout: the customer copies an order message
// and sends it on Instagram, and payment is arranged through GCash.
export function BagDrawer() {
  const bag = useBag();
  const dialog = useRef<HTMLDialogElement>(null);
  const messageBox = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (bag.isOpen && !el.open) el.showModal();
    if (!bag.isOpen && el.open) el.close();
  }, [bag.isOpen]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  const message = orderMessage(bag.lines, bag.total);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // older browsers, or clipboard access refused: select the text so it can be copied by hand
      messageBox.current?.select();
      document.execCommand('copy');
    }
    setCopied(true);
  };

  return (
    <dialog
      ref={dialog}
      className="drawer drawer-right"
      aria-label="Your bag"
      onClose={bag.close}
      // close when the dimmed area outside the panel is tapped
      onClick={(event) => {
        if (event.target === dialog.current) bag.close();
      }}
    >
      <div className="flex h-full flex-col overflow-y-auto px-4 pb-8">
        <div className="flex h-[66px] shrink-0 items-center justify-between">
          <h2 className="font-serif text-[26px] italic leading-none">Your bag</h2>
          <button type="button" className="icon-btn -mr-[5px]" aria-label="Close bag" onClick={bag.close}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" />
            </svg>
          </button>
        </div>

        {bag.lines.length === 0 ? (
          <div className="border-t border-line pt-6">
            <p className="text-[14px]">Nothing in here yet.</p>
            <p className="mt-4 text-[14px]">
              <Link href="/" className="link text-rouge" onClick={bag.close}>
                See all scrunchies
              </Link>
            </p>
          </div>
        ) : (
          <>
            <ul className="border-t border-line" role="list">
              {bag.lines.map(({ product, quantity }) => (
                <li key={product.slug} className="grid grid-cols-[64px_1fr] gap-x-4 border-b border-line py-4">
                  <Link href={`/product/${product.slug}`} className="relative block aspect-[2/3] bg-surface" onClick={bag.close} tabIndex={-1} aria-hidden="true">
                    <ProductImage src={product.image} alt="" fill sizes="64px" />
                  </Link>
                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/product/${product.slug}`} className="link text-[14px] leading-[18px]" onClick={bag.close}>
                        {product.name}
                      </Link>
                      <p className="shrink-0 text-[14px] leading-[18px]">{formatPrice(quantity * product.price)}</p>
                    </div>
                    <p className="mt-1 text-[13px] leading-[16px] text-ink-muted">{formatPrice(product.price)} each</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="qty" role="group" aria-label={`Quantity of ${product.name}`}>
                        <button type="button" aria-label="One less" onClick={() => bag.setQuantity(product.slug, quantity - 1)}>
                          <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                            <path d="M0 5h10" />
                          </svg>
                        </button>
                        <output aria-live="polite">{quantity}</output>
                        <button type="button" aria-label="One more" onClick={() => bag.setQuantity(product.slug, quantity + 1)}>
                          <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                            <path d="M0 5h10M5 0v10" />
                          </svg>
                        </button>
                      </div>
                      <button type="button" className="link text-[12px] text-ink-muted" onClick={() => bag.remove(product.slug)}>
                        Remove<span className="sr-only"> {product.name}</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline justify-between pt-4 text-[14px]">
              <p className="font-normal">Subtotal</p>
              <p className="font-normal">{formatPrice(bag.total)}</p>
            </div>
            <p className="mt-1 text-[13px] leading-[18px] text-ink-muted">We&apos;ll confirm shipping when you message us.</p>

            <div className="mt-6 border-t border-line pt-6">
              <h3 className="text-[14px] font-normal">How to order</h3>
              <p className="mt-2 text-[13px] leading-[18px]">
                Copy your order and send it to us on Instagram{site.instagram ? ` (@${site.instagram})` : ''}. We&apos;ll
                confirm it and reply with GCash payment details.
              </p>
              <textarea
                ref={messageBox}
                className="bag-message mt-4"
                aria-label="Your order message"
                readOnly
                rows={Math.min(10, bag.lines.length + 5)}
                value={message}
                onFocus={(event) => event.target.select()}
              />
              <button type="button" className="btn-primary mt-3" onClick={copy}>
                {copied ? 'Copied' : 'Copy order message'}
              </button>
              {site.instagram && (
                <a href={`https://ig.me/m/${site.instagram}`} className="btn-quiet mt-[10px]" target="_blank" rel="noopener noreferrer">
                  Open Instagram
                </a>
              )}
              <p className="sr-only" role="status" aria-live="polite">
                {copied ? 'Order message copied.' : ''}
              </p>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
