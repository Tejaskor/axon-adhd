"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { QuotesSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const G = "bg-[linear-gradient(91.82deg,#EAF2FC_23.38%,#D6E5F7_101.8%)]";
const avatarColors = ["#F08A4B", "#1F8A8A", "#2E7D32", "#E0A21B", "#E86A92", "#6B7280", "#D9531E", "#4C82D8"];

/** Initials from the name before any credentials ("Jennie Byrne, MD, Ph.D" → JB, "S.S., M" → SS). */
function initials(name: string) {
  const words = name.split(",")[0].split(/\s+/).filter((w) => w && !/^dr\.?$/i.test(w));
  if (words.length === 1) return words[0].replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous review" : "Next review"}
      className="grid size-11 shrink-0 place-items-center rounded-full bg-white/90 text-primary shadow-[0_10px_26px_-10px_rgba(37,120,202,.55)] transition-colors hover:bg-white sm:size-12"
    >
      <Icon aria-hidden className="size-6" strokeWidth={2.2} />
    </button>
  );
}

/** One review at a time on a pinched stack of three gradient cards, with round arrows either side and dots below; swipe works on touch. */
export function StackedQuotesCarousel({ data }: { data: QuotesSection }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const touchX = useRef<number | null>(null);
  const liveId = useId();
  const n = data.items.length;
  const go = (p: number) => {
    setI((p + n) % n);
    setOpen(false);
  };
  const [before, after] = data.accent && data.title.includes(data.accent) ? data.title.split(data.accent) : [data.title, undefined];

  return (
    <section className="relative isolate overflow-hidden bg-white py-12 sm:py-16 lg:py-20" aria-labelledby={`${liveId}-title`}>
      <Container>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 id={`${liveId}-title`} className="type-h2 text-[#0B1F4D]">
            {before}
            {after !== undefined && <span className="text-primary">{data.accent}</span>}
            {after}
          </h2>
          {data.subtitle && <p className="type-body mx-auto mt-4 text-pretty text-[#4B5C75]">{data.subtitle}</p>}
        </div>

        <div role="region" aria-roledescription="carousel" aria-label="Reviews" className="mx-auto mt-10 sm:mt-14">
          <div
            className="flex items-center gap-3 sm:gap-6"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
            }}
          >
            <div className="hidden sm:block">
              <Arrow dir="prev" onClick={() => go(i - 1)} />
            </div>

            <div className="relative mx-auto w-full max-w-[1000px] flex-1 px-1 py-6">
              {/* Two more cards behind, one pinched at the top and one at the bottom, so the stack reads as a bow-tie. */}
              <span aria-hidden className="absolute inset-x-3 inset-y-0 sm:inset-x-5">
                <span className={cn("block size-full rounded-[22px] brightness-[1.04] [clip-path:polygon(0_0,50%_10%,100%_0,100%_100%,0_100%)]", G)} />
              </span>
              <span aria-hidden className="absolute inset-x-3 inset-y-0 sm:inset-x-5">
                <span className={cn("block size-full rounded-[22px] brightness-[1.07] [clip-path:polygon(0_0,100%_0,100%_100%,50%_90%,0_100%)]", G)} />
              </span>
              {/* All reviews share one grid cell so the card keeps the height of the longest one. */}
              <ul id={liveId} aria-live="polite" className="relative grid">
                {data.items.map((item, k) => (
                  <li
                    key={item.name}
                    aria-hidden={k !== i}
                    inert={k !== i}
                    className={cn(
                      "col-start-1 row-start-1 flex flex-col justify-between rounded-[22px] px-7 py-11 [clip-path:polygon(0_0,50%_5%,100%_0,100%_100%,50%_95%,0_100%)] transition-opacity duration-500 motion-reduce:transition-none sm:px-14 sm:py-14",
                      G,
                      k === i ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                  >
                    <div>
                      <blockquote className={cn("text-[16px] leading-[1.7] text-pretty text-[#1F3048] sm:text-[18px]", !(open && k === i) && "line-clamp-5")}>
                        “{item.quote}”
                      </blockquote>
                      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open && k === i} className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary hover:underline">
                        {open && k === i ? "Show less" : "Read full review"}
                        {!(open && k === i) && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
                      </button>
                    </div>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-white text-[15px] font-semibold text-white shadow-sm" style={{ backgroundColor: avatarColors[k % avatarColors.length] }}>
                        {initials(item.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] leading-snug font-bold break-words text-[#0B1F4D]">{item.name}</span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-[#5B6B80]">{item.role}</span>
                      </span>
                    </figcaption>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden sm:block">
              <Arrow dir="next" onClick={() => go(i + 1)} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="sm:hidden">
              <Arrow dir="prev" onClick={() => go(i - 1)} />
            </div>
            <div className="flex items-center gap-2.5" role="group" aria-label="Choose review">
              {data.items.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => go(k)}
                  aria-label={`Show review ${k + 1} of ${n}`}
                  aria-current={k === i}
                  className={cn("size-3 rounded-full transition-colors", k === i ? "bg-primary" : "bg-[#C9DAEE] hover:bg-primary/50")}
                />
              ))}
            </div>
            <div className="sm:hidden">
              <Arrow dir="next" onClick={() => go(i + 1)} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
