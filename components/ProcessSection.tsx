import type { Collection } from '@/lib/products';

// the brand motif: a ring of overlapping circles (the scrunchie silhouette)
const ring = Array.from({ length: 12 }, (_, i) => {
  const angle = (2 * Math.PI * i) / 12;
  return { cx: (20 + 12.5 * Math.cos(angle)).toFixed(2), cy: (20 + 12.5 * Math.sin(angle)).toFixed(2) };
});

// "How we create ...", under the product grid. The words come from the collection (lib/products.ts).
export function ProcessSection({ process }: { process: Collection['process'] }) {
  return (
    <section className="bg-surface-raised" aria-labelledby="process-title">
      <div className="px-[46px] pb-6 pt-12 lg:mx-auto lg:grid lg:max-w-[800px] lg:grid-cols-2 lg:items-end lg:px-0 lg:pb-12 lg:pt-[72px]">
        <div>
          <svg className="h-10 w-10 text-gold" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            {ring.map((circle) => (
              <circle key={`${circle.cx}-${circle.cy}`} cx={circle.cx} cy={circle.cy} r="6.5" />
            ))}
          </svg>
          <h2 id="process-title" className="mt-4 font-serif text-[26px] italic leading-none lg:text-[30px]">
            {process.title}
          </h2>
        </div>
        <p className="mt-4 text-[14px] leading-[16.8px] lg:mt-0 lg:text-[16px] lg:leading-[19px]">{process.intro}</p>
      </div>
      <ol role="list" className="grid gap-px border-t border-line bg-line min-[750px]:grid-cols-4">
        {process.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[30px_1fr] gap-y-2 bg-surface-raised py-6 pl-4 pr-6 min-[750px]:block min-[750px]:px-6 min-[750px]:pb-12 min-[750px]:pt-6"
          >
            <span
              className="row-span-2 self-start font-serif text-[30px] italic lining-nums leading-[20px] min-[750px]:block min-[750px]:text-[40px] min-[750px]:leading-none"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <h3 className="text-[14px] font-normal leading-[20px] min-[750px]:mt-4">{step.title}</h3>
            <p className="text-[13px] leading-[20px] text-ink-muted min-[750px]:mt-2">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
