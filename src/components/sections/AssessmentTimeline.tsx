"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { StepsSection } from "@/content/pages/types";
import { cn } from "@/lib/utils";

type Step = StepsSection["items"][number];

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const list = window.matchMedia(REDUCED);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

/**
 * Vertical four-step timeline. The blue line fills as the visitor scrolls (its tip follows a trigger line at 55% of the viewport),
 * markers turn blue as the tip passes them, and each step fades up as it enters. Plain scroll listeners drive it, so the page scrolls
 * normally in both directions; with reduced motion the transitions are off and everything is simply visible.
 */
export function AssessmentTimeline({ items }: { items: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [reached, setReached] = useState(0);
  const [shown, setShown] = useState<boolean[]>(() => items.map(() => false));
  const motion = !useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

  useEffect(() => {
    let frame = 0;
    let lineTop = 0;
    let lineHeight = 0;

    const measure = () => {
      const list = listRef.current;
      const first = markerRefs.current[0];
      const last = markerRefs.current[items.length - 1];
      if (!list || !first || !last) return;
      const base = list.getBoundingClientRect().top;
      lineTop = first.getBoundingClientRect().top - base + first.offsetHeight / 2;
      lineHeight = last.getBoundingClientRect().top - base + last.offsetHeight / 2 - lineTop;
      if (trackRef.current) {
        trackRef.current.style.top = `${lineTop}px`;
        trackRef.current.style.height = `${lineHeight}px`;
      }
      if (fillRef.current) fillRef.current.style.top = `${lineTop}px`;
    };

    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;
      const vh = window.innerHeight;
      const trigger = vh * 0.55;
      const base = list.getBoundingClientRect().top;
      const fill = Math.min(Math.max(trigger - (base + lineTop), 0), lineHeight);
      if (fillRef.current) fillRef.current.style.height = `${fill}px`;
      const count = markerRefs.current.filter((m) => m && m.getBoundingClientRect().top + m.offsetHeight / 2 <= trigger).length;
      setReached((prev) => (prev === count ? prev : count));
      const next = stepRefs.current.map((s) => (s ? s.getBoundingClientRect().top < vh * 0.82 : false));
      setShown((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    // Images and fonts settle after load; re-measure once they have.
    window.addEventListener("load", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [items.length]);

  const active = reached - 1;

  return (
    <ol ref={listRef} className="relative mt-12 space-y-8 pl-12 sm:pl-16 lg:mt-14 lg:space-y-10">
      <span aria-hidden ref={trackRef} className="absolute left-5 w-[3px] -translate-x-1/2 rounded-full bg-[#DCEAF8] sm:left-6" />
      <span aria-hidden ref={fillRef} className="absolute left-5 w-[3px] -translate-x-1/2 rounded-full bg-[#6AA5DD] sm:left-6" style={{ height: 0 }} />
      {items.map((step, i) => {
        const done = i < active;
        const current = i === active;
        const visible = !motion || shown[i];
        return (
          <li
            key={step.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="relative"
          >
            <span
              ref={(el) => {
                markerRefs.current[i] = el;
              }}
              aria-hidden
              className={cn(
                "absolute top-8 -left-12 grid size-10 -translate-y-1/2 place-items-center rounded-full border-2 font-display text-[17px] font-bold sm:-left-16 sm:size-12 sm:text-[20px] lg:top-10",
                motion && "transition-[background-color,border-color,color,transform,box-shadow] duration-500 ease-brand",
                current
                  ? "scale-110 border-transparent bg-[#2578CA] text-white shadow-[0_8px_20px_-4px_rgba(37,120,202,.4)]"
                  : done
                    ? "border-[#6AA5DD] bg-[#6AA5DD] text-white"
                    : "border-[#BFD7F1] bg-white text-[#6E9CCB]",
              )}
            >
              {done ? <Check className="size-5 sm:size-6" strokeWidth={3} /> : i + 1}
            </span>
            <div
              className={cn(
                "grid items-center gap-6 rounded-[28px] border p-5 sm:p-7 md:grid-cols-2 lg:gap-14 lg:p-10",
                i % 2 === 0 ? "border-[#E6EEF8] bg-white shadow-[0_14px_40px_-22px_rgba(18,61,106,.3)]" : "border-transparent bg-[#F1F6FD]",
              )}
            >
              <div className={cn(motion && "transition-[opacity,transform] duration-700 ease-brand", visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.985] opacity-0")}>
                {step.image && (
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={step.image.width}
                    height={step.image.height}
                    sizes="(max-width: 767px) 100vw, (max-width: 1320px) 45vw, 560px"
                    className="aspect-[16/10] w-full rounded-[22px] object-cover shadow-[0_18px_40px_-20px_rgba(18,61,106,.4)]"
                  />
                )}
              </div>
              <div className={cn(motion && "transition-[opacity,transform] duration-700 delay-100 ease-brand", visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}>
                <h3 className="type-h3 text-[#123D6A]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[520px] text-[17px] leading-[1.75] text-pretty text-[#44566E] sm:text-[19px]">{step.text}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
