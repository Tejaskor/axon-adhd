"use client";

import { useEffect, useRef, useState } from "react";

const format = (n: number) => n.toLocaleString("en-US");

/**
 * Counts from 0 up to `value` the first time it scrolls into view (ease-out, ~1.6s).
 * Server markup and the first client render show the final number, so there is no hydration mismatch and the real
 * figure is there without JS; with reduced motion it never animates. Screen readers get the final value only, and the
 * span reserves the final width (tabular figures) so surrounding text doesn't shift while counting.
 */
export function CountUp({ value, duration = 1600 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    // Not yet on screen: start from 0 so the count is visible when it arrives.
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) setShown(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden className="inline-block text-left tabular-nums" style={{ minWidth: `${format(value).length}ch` }}>
        {format(shown)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}
