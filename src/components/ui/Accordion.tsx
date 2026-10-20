"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

/**
 * Accessible single-open accordion: each header is a <button aria-expanded>
 * controlling a labelled region. Height animates via CSS grid rows.
 */
export function Accordion({ items, defaultOpen = 0, className }: { items: AccordionItem[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className={cn("divide-y divide-line-2 overflow-hidden rounded-panel border border-line-2 bg-white", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={item.id}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[16px] font-semibold text-navy transition-colors sm:px-7 sm:text-[18px]",
                  isOpen ? "bg-primary-soft" : "hover:bg-surface-2",
                )}
              >
                <span>{item.title}</span>
                <ChevronDown aria-hidden className={cn("size-5 shrink-0 text-primary transition-transform duration-300 ease-brand", isOpen && "rotate-180")} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn("grid transition-[grid-template-rows] duration-300 ease-brand", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="prose-axon px-5 pt-1 pb-6 text-[15px] sm:px-7 sm:text-[16px] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
