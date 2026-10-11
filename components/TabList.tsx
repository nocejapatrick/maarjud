'use client';

import { useRef } from 'react';

type Props = {
  /** each tab's button id is `${idPrefix}-tab-${id}` and it controls the panel `${idPrefix}-panel-${id}` */
  idPrefix: string;
  tabs: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
  label: string;
  className?: string;
  tabClassName?: string;
};

// A row of tabs. Left and right arrow keys move between them.
export function TabList({ idPrefix, tabs, selected, onSelect, label, className, tabClassName = 'tab' }: Props) {
  const list = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    onSelect(tabs[next].id);
    list.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div ref={list} role="tablist" aria-label={label} className={className}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${tab.id}`}
          aria-controls={`${idPrefix}-panel-${tab.id}`}
          aria-selected={tab.id === selected}
          tabIndex={tab.id === selected ? 0 : -1}
          className={tabClassName}
          onClick={() => onSelect(tab.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
