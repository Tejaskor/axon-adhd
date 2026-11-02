"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { FaqTab } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";
import { Blocks } from "@/components/ui/RichText";
import { cn, slugify } from "@/lib/utils";

/** Question slugs per tab (the live ids); a question repeated in a later tab gets `-2` so DOM ids stay unique. */
function uniqueAnchors(tabs: FaqTab[]) {
  const seen = new Set<string>();
  return tabs.map((tab) =>
    tab.items.map((f) => {
      let id = slugify(f.q);
      for (let n = 2; seen.has(id); n++) id = `${slugify(f.q)}-${n}`;
      seen.add(id);
      return id;
    }),
  );
}

/**
 * WAI-ARIA tabs (arrow-key navigation) each holding an FAQ accordion, styled as the live site's audience toggle.
 * Like the original, the first tab and the first question of every tab start open; a `#question-slug` link
 * switches to the tab containing that question (the accordion then opens it).
 */
export function FAQTabs({ tabs }: { tabs: FaqTab[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const anchors = useMemo(() => uniqueAnchors(tabs), [tabs]);

  useEffect(() => {
    const sync = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const i = hash ? anchors.findIndex((ids) => ids.includes(hash)) : -1;
      if (i >= 0) setActive(i);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", sync);
    };
  }, [anchors]);

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
      <div className="mx-auto w-full max-w-[585px] rounded-md bg-white">
        <div role="tablist" aria-label="FAQ audience" className="flex flex-wrap items-center justify-center gap-x-[30px] gap-y-1 rounded-[10px] bg-[#F4F7FA] py-1">
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
              className={cn("rounded-xl px-5 py-3 text-[16px] leading-none font-medium transition-colors", active === i ? "bg-white text-primary" : "text-muted-3 hover:text-ink-2")}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={active !== i} className="mx-auto mt-6 max-w-content">
          <Accordion
            variant="cards"
            columns={2}
            items={tab.items.map((f, j) => ({
              id: `${tab.id}-${j}`,
              title: f.q,
              content: <Blocks blocks={f.a} />,
              anchor: anchors[i][j],
            }))}
          />
        </div>
      ))}
    </div>
  );
}
