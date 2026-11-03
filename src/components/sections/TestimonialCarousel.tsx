"use client";

import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import type { TestimonialCarouselSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Item = TestimonialCarouselSection["items"][number];

const QUERIES = ["(min-width: 1024px)", "(min-width: 640px)"] as const;
const avatarColors = ["#E99B19", "#36A875", "#4C82D8"];

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}
const cardsPerView = () => (window.matchMedia(QUERIES[0]).matches ? 3 : window.matchMedia(QUERIES[1]).matches ? 2 : 1);

function NavButton({ dir, onClick, className }: { dir: "prev" | "next"; onClick: () => void; className?: string }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonials" : "Next testimonials"}
      className={cn("size-11 shrink-0 place-items-center rounded-full bg-white text-[#174F38] shadow-[0_6px_18px_-4px_rgba(23,79,56,.25)] transition-colors hover:bg-[#F1F8F4] sm:size-12", className ?? "grid")}
    >
      <Icon aria-hidden className="size-5" strokeWidth={2.75} />
    </button>
  );
}

const COLLAPSE_MS = 400;

/** Expands in place: the quote area animates from six lines to its full height, then Read less reverses it. Open state is owned by the carousel so only one card is open at a time. */
function TestimonialCard({ item, index, expanded, onToggle }: { item: Item; index: number; expanded: boolean; onToggle: () => void }) {
  // The line clamp (ellipsis) is derived, not stored: it is off while open and for the length of the close animation, so it never needs a state flip in render.
  // `settledFor` is the `expanded` value the animation last finished for; it only changes from the timer below.
  const [settledFor, setSettledFor] = useState(false);
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const quoteId = useId();
  const clamped = !expanded && !settledFor;

  useLayoutEffect(() => {
    if (expanded && textRef.current) setFullHeight(textRef.current.scrollHeight);
  }, [expanded]);
  useEffect(() => {
    const t = setTimeout(() => setSettledFor(expanded), COLLAPSE_MS);
    return () => clearTimeout(t);
  }, [expanded]);

  return (
    <figure className="flex w-full flex-col rounded-[18px] border border-[#D5EDE0] bg-[#F1F8F4] p-5 shadow-[0_8px_22px_-12px_rgba(23,79,56,.28)] sm:p-6">
      <figcaption className="flex min-h-[96px] items-start gap-4">
        <span aria-hidden className="grid size-[52px] shrink-0 place-items-center rounded-full text-[20px] font-semibold text-white" style={{ backgroundColor: avatarColors[index % avatarColors.length] }}>
          {item.name.replace(/^Dr\.?\s+/, "").charAt(0)}
        </span>
        <span className="min-w-0 pt-0.5">
          <span className="block text-[17px] leading-snug font-semibold break-words text-[#10231B]">{item.name}</span>
          <span className="mt-0.5 block text-[14px] leading-snug text-muted">{item.role}</span>
        </span>
      </figcaption>
      {/* Collapsed height is exactly six lines so every collapsed card is the same size; expanded uses the measured text height. */}
      <blockquote id={quoteId} className="mt-3 overflow-hidden text-[16px] leading-[1.65] transition-[height] ease-brand motion-reduce:transition-none" style={{ height: expanded && fullHeight !== null ? fullHeight : "9.9em", transitionDuration: `${COLLAPSE_MS}ms` }}>
        <p ref={textRef} className={cn("text-ink-2", clamped && "line-clamp-6")}>
          “{item.quote}”
        </p>
      </blockquote>
      <button type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={quoteId} className="group mt-5 inline-flex items-center gap-2 self-start text-[16px] font-semibold text-[#E99B19] hover:underline">
        {expanded ? "Read less" : "Read more"}
        {expanded ? <ArrowUp aria-hidden className="size-[18px]" /> : <ArrowRight aria-hidden className="size-[18px] transition-transform duration-300 ease-brand group-hover:translate-x-1" />}
        <span className="sr-only"> {expanded ? "of" : "from"} {item.name}</span>
      </button>
    </figure>
  );
}

/** Centered heading, then a paged carousel: 3 cards on desktop, 2 on tablet, 1 on phones, with arrows and pagination dots. */
export function TestimonialCarousel({ data }: { data: TestimonialCarouselSection }) {
  const perView = useSyncExternalStore(subscribe, cardsPerView, () => 3);
  const [index, setIndex] = useState(0);
  // At most one card is open; opening another closes it.
  const [open, setOpen] = useState<number | null>(null);

  const n = data.items.length;
  // The arrows move one card at a time; `start` is the first visible card, `positions` how many places the row can rest in.
  const positions = Math.max(n - perView, 0) + 1;
  const start = Math.min(index, positions - 1);
  const prev = () => setIndex((start - 1 + positions) % positions);
  const next = () => setIndex((start + 1) % positions);

  const [before, after] = data.title.split(data.accent);

  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-24 sm:pt-16 sm:pb-28" aria-labelledby="testimonials-title">
      {/* Pale mint waves along the bottom edge. */}
      <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full sm:h-32">
        <path d="M0 70C220 20 420 20 700 70S1180 130 1440 60V160H0Z" fill="#F1F8F4" />
        <path d="M0 110C260 70 520 90 800 120S1220 140 1440 100V160H0Z" fill="#E8F4ED" fillOpacity=".7" />
      </svg>

      <Container className="relative">
        <div className="mx-auto max-w-[960px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#D5EDE0] bg-[#F1F8F4] px-5 py-2 text-[15px] font-semibold text-[#174F38] shadow-[0_2px_8px_-4px_rgba(23,79,56,.2)]">
            <Users aria-hidden className="size-[18px]" />
            {data.eyebrow}
          </p>
          <h2 id="testimonials-title" className="mt-5 text-[clamp(28px,4vw,48px)] leading-[1.15] font-medium tracking-[-0.01em] text-[#174F38]">
            {after !== undefined ? (
              <>
                {before}
                <span className="font-bold text-[#E99B19]">{data.accent}</span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          <p className="type-body mx-auto mt-3 text-body">{data.subtitle}</p>
        </div>

        <div role="region" aria-roledescription="carousel" aria-label="Testimonials" className="mt-10 sm:mt-12">
          <div className="flex items-center gap-3 lg:gap-5">
            <NavButton dir="prev" onClick={prev} className="hidden sm:grid" />
            <div className="min-w-0 flex-1 overflow-hidden">
              <ul className="-mx-2 flex py-3 transition-transform duration-500 ease-brand motion-reduce:transition-none" style={{ transform: `translateX(-${(start * 100) / perView}%)` }}>
                {data.items.map((item, i) => {
                  const visible = i >= start && i < start + perView;
                  return (
                    <li key={item.name} aria-hidden={!visible} inert={!visible} className="flex shrink-0 px-2" style={{ width: `${100 / perView}%` }}>
                      <TestimonialCard item={item} index={i} expanded={open === i} onToggle={() => setOpen(open === i ? null : i)} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <NavButton dir="next" onClick={next} className="hidden sm:grid" />
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-6">
            <NavButton dir="prev" onClick={prev} className="sm:hidden" />
            <div className="flex items-center gap-2.5" role="group" aria-label="Choose testimonial position">
              {Array.from({ length: positions }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonials starting at ${i + 1} of ${positions}`}
                  aria-current={i === start}
                  className={cn("size-2.5 rounded-full transition-colors", i === start ? "bg-[#E99B19]" : "bg-[#CBE6D8] hover:bg-[#36A875]/60")}
                />
              ))}
            </div>
            <NavButton dir="next" onClick={next} className="sm:hidden" />
          </div>
        </div>
      </Container>

    </section>
  );
}
