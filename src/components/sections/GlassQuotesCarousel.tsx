"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import type { QuotesSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Item = QuotesSection["items"][number];

const QUERIES = ["(min-width: 1024px)", "(min-width: 640px)"] as const;
const avatarColors = [
  "#F08A4B",
  "#1F8A8A",
  "#2E7D32",
  "#E0A21B",
  "#E86A92",
  "#6B7280",
  "#D9531E",
  "#4C82D8",
];

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}
const cardsPerView = () =>
  window.matchMedia(QUERIES[0]).matches
    ? 4
    : window.matchMedia(QUERIES[1]).matches
      ? 2
      : 1;

/** Two initials from the name part before any credentials ("Sam Pappas, MD" → S P, "S.S., MD" → S S). */
function initials(name: string) {
  const words = name
    .split(",")[0]
    .split(/\s+/)
    .filter((w) => !/^dr\.?$/i.test(w));
  if (words.length === 1)
    return words[0]
      .replace(/[^A-Za-z]/g, "")
      .slice(0, 2)
      .toUpperCase()
      .split("");
  return [words[0], words[words.length - 1]].map((w) =>
    w.charAt(0).toUpperCase(),
  );
}

function NavButton({
  dir,
  onClick,
  className,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous reviews" : "Next reviews"}
      className={cn(
        "size-11 shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_8px_22px_-8px_rgba(37,120,202,.45)] transition-colors hover:bg-[#EAF3FE] sm:size-12",
        className ?? "grid",
      )}
    >
      <Icon aria-hidden className="size-6" strokeWidth={2.5} />
    </button>
  );
}

function ReviewCard({
  item,
  index,
  expanded,
  onToggle,
}: {
  item: Item;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const quoteId = useId();
  const [a, b] = initials(item.name);
  return (
    <figure className="flex w-full flex-col rounded-[22px] border border-white/90 bg-white/50 p-5 shadow-[0_18px_44px_-22px_rgba(37,120,202,.5),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-[12px] sm:p-6">
      <Quote aria-hidden className="size-6 fill-primary text-primary" />
      <blockquote
        id={quoteId}
        className={cn(
          "mt-3 text-[15px] leading-[1.55] text-[#1F3048]",
          !expanded && "line-clamp-4 min-h-[6.2em]",
        )}
      >
        {item.quote}
      </blockquote>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={quoteId}
        className="group mt-3 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-primary hover:underline"
      >
        {expanded ? "Show less" : "Read full review"}
        {!expanded && (
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        )}
        <span className="sr-only">
          {" "}
          {expanded ? "of" : "from"} {item.name}
        </span>
      </button>
      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        <span aria-hidden className="flex shrink-0 -space-x-3">
          {[a, b].map((ch, i) => (
            <span
              key={i}
              className="grid size-10 place-items-center rounded-full border-2 border-white text-[15px] font-semibold text-white"
              style={{
                backgroundColor:
                  avatarColors[(index * 2 + i) % avatarColors.length],
              }}
            >
              {ch}
            </span>
          ))}
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] leading-snug font-bold break-words text-[#0B1F4D]">
            {item.name}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-[#5B6B80]">
            {item.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Light-blue glass testimonial carousel: 4 cards on desktop, 2 on tablet, 1 on phones; arrows, dots and swipe move a page at a time; "Read full review" expands the card inline. */
export function GlassQuotesCarousel({ data }: { data: QuotesSection }) {
  const perView = useSyncExternalStore(subscribe, cardsPerView, () => 4);
  const [pos, setPos] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const n = data.items.length;
  // One resting position per card that can lead the row; the arrows move a single card at a time.
  const pages = Math.max(n - perView, 0) + 1;
  const current = Math.min(pos, pages - 1);
  const start = current;
  const go = (p: number) => setPos((p + pages) % pages);

  const [before, after] =
    data.accent && data.title.includes(data.accent)
      ? data.title.split(data.accent)
      : [data.title, undefined];

  return (
    <section
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F6FAFF_0%,#E9F2FE_100%)] py-12 sm:py-16"
      aria-labelledby="glass-quotes-title"
    >
      <svg
        aria-hidden
        viewBox="0 0 400 160"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 -z-10 h-24 w-56 sm:h-32 sm:w-72"
      >
        <path
          d="M0 0H400C300 30 200 40 120 80S30 140 0 160Z"
          fill="#5DA2F0"
          fillOpacity=".2"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 800 200"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 bottom-0 -z-10 h-24 w-[70%] sm:h-32"
      >
        <path
          d="M0 200C160 110 420 90 800 50V200Z"
          fill="#7DB4F4"
          fillOpacity=".2"
        />
        <path
          d="M200 200C380 130 620 120 800 80V200Z"
          fill="#3F8EEB"
          fillOpacity=".2"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 600 160"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-20 w-[45%] sm:h-28"
      >
        <path
          d="M0 60C140 50 280 120 420 140S560 150 600 160H0Z"
          fill="#A9CDF8"
          fillOpacity=".3"
        />
      </svg>

      <Container>
        <div className="mx-auto text-center">
          <h2 id="glass-quotes-title" className="type-h2 text-[#0B1F4D]">
            {before}
            {after !== undefined && (
              <span className="text-primary">{data.accent}</span>
            )}
            {after}
          </h2>
          {data.subtitle && (
            <p className="type-body mx-auto mt-4 max-w-[860px] text-pretty text-[#4B5C75] lg:max-w-none lg:whitespace-nowrap">
              {data.subtitle}
            </p>
          )}
        </div>
      </Container>

      {/* The row is full-bleed: it runs to both screen edges and slides one card per step under them. */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Reviews"
        className="mt-7 sm:mt-8"
      >
        <div className="relative">
          <NavButton
            dir="prev"
            onClick={() => go(current - 1)}
            className="absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 sm:grid"
          />
          <NavButton
            dir="next"
            onClick={() => go(current + 1)}
            className="absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 sm:grid"
          />
          <div
            className="overflow-hidden"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1);
            }}
          >
            <ul
              className="flex items-stretch py-3 transition-transform duration-500 ease-brand [--gutter:1rem] motion-reduce:transition-none sm:[--gutter:4.5rem] lg:[--gutter:4.5rem]"
              style={{
                paddingInline: "calc(var(--gutter) - 0.5rem)",
                transform: `translateX(calc(${-start} * (100% - 2 * var(--gutter) + 1rem) / ${perView}))`,
              }}
            >
              {data.items.map((item, i) => {
                const visible = i >= start && i < start + perView;
                return (
                  <li
                    key={item.name}
                    aria-hidden={!visible}
                    inert={!visible}
                    className="flex shrink-0 px-2"
                    style={{ width: `${100 / perView}%` }}
                  >
                    <ReviewCard
                      item={item}
                      index={i}
                      expanded={open === i}
                      onToggle={() => setOpen(open === i ? null : i)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6">
          <NavButton
            dir="prev"
            onClick={() => go(current - 1)}
            className="sm:hidden"
          />
          <div
            className="flex items-center gap-2.5"
            role="group"
            aria-label="Choose review position"
          >
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show reviews starting at ${i + 1} of ${pages}`}
                aria-current={i === current}
                className={cn(
                  "size-3 rounded-full transition-colors",
                  i === current
                    ? "bg-primary"
                    : "bg-[#C9DAEE] hover:bg-primary/50",
                )}
              />
            ))}
          </div>
          <NavButton
            dir="next"
            onClick={() => go(current + 1)}
            className="sm:hidden"
          />
        </div>
      </div>
    </section>
  );
}
