"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** `anchor` becomes the item's DOM id; visiting `#anchor` opens that item and scrolls to it. */
export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  anchor?: string;
};

/**
 * - `default`: one bordered panel with dividers (content pages, blog, trust center).
 * - `cards`: separate rounded cards with a rotating chevron and a blue bar beside the answer (home page FAQ and /adhd-faqs).
 */
type Variant = "default" | "cards";

const styles: Record<
  Variant,
  {
    list: string;
    item: (open: boolean) => string;
    button: (open: boolean) => string;
    title: string;
    body: string;
  }
> = {
  default: {
    list: "divide-y divide-line-2 overflow-hidden rounded-panel border border-line-2 bg-white",
    item: () => "",
    button: (open) =>
      cn(
        "flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[16px] font-semibold text-navy transition-colors sm:px-7 sm:text-[18px]",
        open ? "bg-primary-soft" : "hover:bg-surface-2",
      ),
    title: "",
    body: "type-body prose-axon px-5 pt-1 pb-6 sm:px-7 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  },
  cards: {
    list: "flex flex-col gap-4",
    // Frosted glass, identical open or closed (the answer area has no fill of its own, so it shares the card's glass):
    // 65% white + 16px backdrop blur, a thin light blue-grey border, 20px corners, a soft diffused shadow and a faint
    // top highlight. Hover lifts the opacity and shadow very slightly. 65% keeps body text high-contrast.
    item: () =>
      cn(
        "overflow-hidden rounded-[20px] border border-[rgba(190,210,230,.45)] bg-white/65 backdrop-blur-lg transition-[background-color,box-shadow] duration-300 ease-brand hover:bg-white/75",
        "shadow-[0_8px_24px_rgba(35,65,100,.06),inset_0_1px_0_rgba(255,255,255,.8)] hover:shadow-[0_10px_28px_rgba(35,65,100,.09),inset_0_1px_0_rgba(255,255,255,.8)]",
      ),
    // Question and chevron share one flex row (no absolutely positioned icon), so the text gets all remaining width and
    // both stay vertically centred. Height comes from padding + text only: one line is 24+27.5+24 ≈ 76px from sm
    // (20+25+20 = 65px on mobile); longer questions simply add lines.
    button: (open) =>
      cn(
        "flex w-full items-center gap-3 p-5 text-left sm:gap-4 sm:px-[30px] sm:py-6",
        open ? "text-[#27313F]" : "text-[#1E242A] hover:text-[#27313F]",
      ),
    title: "min-w-0 flex-1 text-[16px] leading-[25px] font-medium text-pretty sm:text-[20px] sm:leading-[1.375]",
    // Each top-level block gets its own 4px bar; blocks have no margins, so consecutive bars read as one.
    body: cn(
      "px-5 pb-5 text-left text-[14px] break-words text-[#525E6F] sm:px-[30px] sm:pb-[30px] sm:text-[18px]",
      "[&>*]:relative [&>*]:m-0 [&>*]:pl-[18px] sm:[&>*]:pl-6",
      "[&>*]:before:absolute [&>*]:before:inset-y-0 [&>*]:before:left-0 [&>*]:before:w-1 [&>*]:before:rounded-full [&>*]:before:bg-primary [&>*]:before:content-['']",
      "[&_p]:leading-[1.8] [&_p]:text-[#4B5563] [&_strong]:font-bold",
      "[&_ol]:list-decimal [&_ol]:pl-[calc(24px+1.25em)] [&_ul]:list-disc [&_ul]:pl-[calc(24px+1.25em)] [&_li]:leading-[1.8]",
      "[&_a]:text-primary [&_a]:no-underline [&_a:hover]:text-primary-600 [&_a:hover]:underline",
    ),
  },
};

function Icon({ variant, open }: { variant: Variant; open: boolean }) {
  if (variant === "cards") {
    return (
      <ChevronDown
        aria-hidden
        className={cn("size-[22px] shrink-0 text-[#111] transition-transform duration-300 sm:size-7", open && "rotate-180")}
        strokeWidth={1.25}
      />
    );
  }
  return <ChevronDown aria-hidden className={cn("size-5 shrink-0 text-primary transition-transform duration-300 ease-brand", open && "rotate-180")} />;
}

/**
 * Accessible single-open accordion: each header is a <button aria-expanded>
 * controlling a labelled region. Height animates via CSS grid rows.
 *
 * `columns={2}` splits the items into two independent stacks from md (1024px): the first half on the left, the rest on
 * the right. An expanded answer only pushes down cards in its own column, and the single column on smaller screens
 * keeps the original question order.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  variant = "default",
  columns = 1,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  variant?: Variant;
  columns?: 1 | 2;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  const s = styles[variant];

  // Deep links: `#question-slug` opens and scrolls to that question (also on later hash changes).
  useEffect(() => {
    const sync = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const i = hash ? items.findIndex((item) => item.anchor === hash) : -1;
      if (i < 0) return;
      setOpen(i);
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", sync);
    };
  }, [items]);

  const renderItem = (item: AccordionItem, i: number) => {
    const isOpen = open === i;
    const buttonId = `${base}-btn-${i}`;
    const panelId = `${base}-panel-${i}`;
    return (
      <div key={item.id} id={item.anchor} className={cn("scroll-mt-[var(--header-offset)]", s.item(isOpen))}>
        <h3 className="m-0">
          <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)} className={s.button(isOpen)}>
            <span className={s.title}>{item.title}</span>
            <Icon variant={variant} open={isOpen} />
          </button>
        </h3>
        <div id={panelId} role="region" aria-labelledby={buttonId} className={cn("grid transition-[grid-template-rows] duration-300 ease-brand", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="min-w-0 overflow-hidden" inert={!isOpen}>
            <div className={s.body}>{item.content}</div>
          </div>
        </div>
      </div>
    );
  };

  if (columns === 2) {
    const half = Math.ceil(items.length / 2);
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 md:items-start", className)}>
        <div className={cn(s.list, "min-w-0")}>{items.slice(0, half).map((item, j) => renderItem(item, j))}</div>
        <div className={cn(s.list, "min-w-0")}>{items.slice(half).map((item, j) => renderItem(item, half + j))}</div>
      </div>
    );
  }

  return <div className={cn(s.list, className)}>{items.map(renderItem)}</div>;
}
