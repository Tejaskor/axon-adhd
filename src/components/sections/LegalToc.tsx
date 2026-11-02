"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

function TocList({ items, active, onNavigate }: { items: TocItem[]; active: string; onNavigate?: () => void }) {
  return (
    <ol className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "type-small block rounded-[10px] border-l-2 px-3 py-2 leading-snug transition-colors duration-200",
              active === item.id ? "border-primary bg-primary-soft font-semibold text-primary" : "border-transparent text-body hover:bg-surface hover:text-navy",
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sticky "On this page" list from lg up (with scroll-spy); a collapsible card above the text below lg. */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // The last heading whose top has passed just below the sticky header is the one being read.
      const line = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-offset")) + 24;
      let current = items[0]?.id ?? "";
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  const closeDetails = () => details.current?.removeAttribute("open");

  return (
    <aside aria-label="On this page">
      <details ref={details} className="group rounded-[18px] border border-black/[0.06] bg-white shadow-[0_8px_26px_rgba(15,27,46,.06)] lg:hidden">
        <summary className="type-body flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold text-navy [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown aria-hidden className="size-5 text-primary transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <nav className="max-h-[60vh] overflow-y-auto border-t border-black/[0.06] p-3"><TocList items={items} active={active} onNavigate={closeDetails} /></nav>
      </details>

      <nav className="sticky top-[calc(var(--header-offset)+8px)] hidden max-h-[calc(100vh-var(--header-offset)-32px)] overflow-y-auto rounded-[18px] border border-black/[0.06] bg-white p-4 shadow-[0_8px_26px_rgba(15,27,46,.06)] lg:block">
        <p className="type-small mb-2 px-3 font-semibold tracking-[0.12em] text-muted uppercase">On this page</p>
        <TocList items={items} active={active} />
      </nav>
    </aside>
  );
}
