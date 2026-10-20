"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { FaqTab } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";
import { Blocks } from "@/components/ui/RichText";
import { cn } from "@/lib/utils";

/** WAI-ARIA tabs (arrow-key navigation) each holding an FAQ accordion. */
export function FAQTabs({ tabs }: { tabs: FaqTab[] }) {
  const [active, setActive] = useState(tabs.length - 1);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="FAQ audience" className="mx-auto mb-8 flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-pill bg-white p-1.5 shadow-card">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn("rounded-pill px-5 py-2.5 text-[15px] font-semibold transition-colors", active === i ? "bg-primary text-white" : "text-ink-2 hover:bg-primary-soft")}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={active !== i}>
          <Accordion items={tab.items.map((f, j) => ({ id: `${tab.id}-${j}`, title: f.q, content: <Blocks blocks={f.a} /> }))} />
        </div>
      ))}
    </div>
  );
}
