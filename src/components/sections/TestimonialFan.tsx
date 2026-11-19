"use client";

import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { TestimonialCarouselSection } from "@/content/pages/types";
import { trustBar } from "@/content/trust";
import { cn } from "@/lib/utils";

type Item = TestimonialCarouselSection["items"][number];

const avatarColors = ["#E99B19", "#36A875", "#4C82D8", "#E86A92", "#6B7280", "#D9531E", "#2E7D32", "#8B5CF6"];

/** Initials from the name before any credentials ("Jennie Byrne, MD, Ph.D" → JB, "S.S., MD" → SS). */
function initials(name: string) {
  const words = name.split(",")[0].split(/\s+/).filter((w) => w && !/^dr\.?$/i.test(w));
  if (words.length === 1) return words[0].replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/** Where a card sits relative to the active one (d = 0 centre, ±1 and ±2 fanned out behind it on either side). */
const POSE: Record<number, { x: number; scale: number; z: number; tone: string; opacity: number }> = {
  0: { x: 0, scale: 1, z: 30, tone: "bg-white text-[#0B1F4D] shadow-[0_30px_70px_-24px_rgba(18,61,106,.45)]", opacity: 1 },
  1: { x: 60, scale: 0.9, z: 20, tone: "bg-[#DCE5F1] text-[#0B1F4D]/70 shadow-[0_18px_40px_-24px_rgba(18,61,106,.35)]", opacity: 1 },
  [-1]: { x: -60, scale: 0.9, z: 20, tone: "bg-[#DCE5F1] text-[#0B1F4D]/70 shadow-[0_18px_40px_-24px_rgba(18,61,106,.35)]", opacity: 1 },
  2: { x: 96, scale: 0.8, z: 10, tone: "bg-[#C9D6E8] text-[#0B1F4D]/55", opacity: 1 },
  [-2]: { x: -96, scale: 0.8, z: 10, tone: "bg-[#C9D6E8] text-[#0B1F4D]/55", opacity: 1 },
};

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden>
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
  );
}

function Nav({ dir, onClick, className }: { dir: "prev" | "next"; onClick: () => void; className?: string }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={cn("relative z-40 size-11 shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_8px_22px_-8px_rgba(37,120,202,.5)] transition-colors hover:bg-[#F1F6FD] sm:size-12", className ?? "grid")}
    >
      <Icon aria-hidden className="size-5" strokeWidth={2.5} />
    </button>
  );
}

/**
 * Testimonials as a fanned stack: the current card sits in front (white, full size) with the neighbours tucked behind it on both sides,
 * smaller and greyed. Arrows, dots, a click on a side card and a swipe all bring another card to the front.
 */
export function TestimonialFan({ items }: { items: Item[] }) {
  const n = items.length;
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const touchX = useRef<number | null>(null);
  const liveId = useId();
  const go = (p: number) => {
    setI(((p % n) + n) % n);
    setOpen(false);
  };
  // Signed shortest distance of card k from the active one, in [-n/2, n/2).
  const dist = (k: number) => ((((k - i) % n) + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Testimonials" className="mt-10 sm:mt-14">
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
        <Nav dir="prev" onClick={() => go(i - 1)} className="hidden sm:grid" />

        <ul id={liveId} aria-live="polite" className="relative grid min-w-0 flex-1 justify-items-center py-4">
          {items.map((item, k) => {
            const d = dist(k);
            const pose = POSE[d];
            const active = d === 0;
            return (
              <li
                key={item.name}
                aria-hidden={!active}
                inert={!active}
                onClick={!active && pose ? () => go(k) : undefined}
                className={cn(
                  "col-start-1 row-start-1 w-[min(460px,78vw)] self-stretch transition-[transform,opacity] duration-500 ease-brand motion-reduce:transition-none",
                  !pose && "pointer-events-none opacity-0",
                  pose && !active && "cursor-pointer",
                )}
                style={{
                  transform: pose ? `translateX(${pose.x}%) scale(${pose.scale})` : `translateX(${d > 0 ? 120 : -120}%) scale(.7)`,
                  zIndex: pose?.z ?? 0,
                }}
              >
                <figure className={cn("flex h-full min-h-[360px] flex-col rounded-[24px] p-6 transition-colors duration-500 sm:p-8", pose?.tone, Math.abs(d) === 2 && "max-sm:hidden")}>
                  <div aria-hidden className="flex items-center justify-between">
                    <div className="flex gap-1 text-[#F5A623]">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} />
                      ))}
                    </div>
                    {/* The official Google "G", as used in the hero's Google Reviews row */}
                    <Image src={trustBar.google.src} alt="" width={28} height={28} className="size-7" />
                  </div>
                  <blockquote className="mt-4 flex-1">
                    <p className={cn("text-[16px] leading-[1.65] text-pretty", !(open && active) && "line-clamp-7")}>“{item.quote}”</p>
                    {active && (
                      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary hover:underline">
                        {open ? "Read less" : "Read more"}
                        {open ? <ArrowUp aria-hidden className="size-4" /> : <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
                      </button>
                    )}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-current/15 pt-5">
                    <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full text-[15px] font-semibold text-white" style={{ backgroundColor: avatarColors[k % avatarColors.length] }}>
                      {initials(item.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[16px] leading-snug font-semibold break-words">{item.name}</span>
                      <span className="mt-0.5 block text-[14px] leading-snug opacity-75">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <Nav dir="next" onClick={() => go(i + 1)} className="hidden sm:grid" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
        <Nav dir="prev" onClick={() => go(i - 1)} className="sm:hidden" />
        <div className="flex items-center gap-2.5" role="group" aria-label="Choose testimonial">
          {items.map((it, k) => (
            <button
              key={it.name}
              type="button"
              onClick={() => go(k)}
              aria-label={`Show testimonial ${k + 1} of ${n}: ${it.name}`}
              aria-current={k === i}
              className={cn("size-2.5 rounded-full transition-colors", k === i ? "bg-primary" : "bg-[#C9DAEE] hover:bg-primary/50")}
            />
          ))}
        </div>
        <Nav dir="next" onClick={() => go(i + 1)} className="sm:hidden" />
      </div>
    </div>
  );
}
