"use client";

import Image from "next/image";
import { CalendarCheck, HeartPulse, FileText, Video } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { StepsSection } from "@/content/pages/types";
import { cn } from "@/lib/utils";

type Step = StepsSection["items"][number];

/** Small icon beside each step's big number, in step order: schedule, consultation, report, treatment. */
const stepIcons = [CalendarCheck, Video, FileText, HeartPulse] as const;

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const list = window.matchMedia(REDUCED);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

/**
 * Vertical four-step timeline. The blue line fills as the visitor scrolls (its tip follows a trigger line at 55% of the viewport),
 * the dots turn blue as the tip passes them, and each step fades up as it enters. Plain scroll listeners drive it, so the page scrolls
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
      if (!list) return;
      // The line runs the whole height of the list, from the top of the first step to the bottom of the last.
      lineTop = 0;
      lineHeight = list.offsetHeight;
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
    <ol ref={listRef} className="relative mt-12 space-y-6 pl-9 sm:pl-12 lg:mt-14 lg:space-y-8">
      <span aria-hidden ref={trackRef} className="absolute left-[22px] w-1.5 -translate-x-1/2 rounded-full bg-[#D9E6F6]" />
      {/* Filled part: fades in from the top and ends in solid brand blue at the scroll tip. */}
      <span aria-hidden ref={fillRef} className="absolute left-[22px] w-1.5 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(37,120,202,.15)_0%,#2578CA_100%)]" style={{ height: 0 }} />
      {items.map((step, i) => {
        const reachedNow = i <= active;
        const current = i === active;
        const visible = !motion || shown[i];
        const Icon = stepIcons[i % stepIcons.length];
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
                "absolute top-9 -left-[22px] size-4 -translate-y-1/2 rounded-full border-2 sm:-left-[34px] lg:top-11",
                motion && "transition-[background-color,border-color,box-shadow] duration-500 ease-brand",
                reachedNow ? "border-[#2578CA] bg-[#2578CA]" : "border-[#BFD7F1] bg-white",
                current && "shadow-[0_0_0_5px_rgba(37,120,202,.2)]",
              )}
            />
            <div className="grid items-center gap-6 p-5 sm:p-7 md:grid-cols-2 lg:gap-14 lg:p-9">
              <div className={cn(motion && "transition-[opacity,transform] duration-700 ease-brand", visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.985] opacity-0")}>
                {step.image && (
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={step.image.width}
                    height={step.image.height}
                    sizes="(max-width: 767px) 100vw, (max-width: 1320px) 45vw, 560px"
                    className="h-auto w-full rounded-[18px] shadow-[0_18px_40px_-20px_rgba(18,61,106,.4)]"
                  />
                )}
              </div>
              <div className={cn(motion && "transition-[opacity,transform] duration-700 delay-100 ease-brand", visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}>
                <div aria-hidden className="flex items-center gap-3">
                  <span className="font-display text-[56px] leading-none font-bold text-[#E4DAFA] sm:text-[68px]">{i + 1}</span>
                  <span className="grid size-9 place-items-center rounded-lg bg-[#EEE7FC] text-[#7C4DDB]">
                    <Icon className="size-[18px]" strokeWidth={2} />
                  </span>
                </div>
                <h3 className="type-h3 mt-2 text-[#123D6A]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[520px] text-[16px] leading-[1.7] text-pretty text-[#44566E] sm:text-[18px]">{step.text}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
