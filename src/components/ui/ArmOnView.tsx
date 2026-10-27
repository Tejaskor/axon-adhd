"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wrapper for entrance animations that should *start* when scrolled into view (rather than scrub with scroll).
 * After mount, when motion is allowed, it sets `data-armed` (CSS hides the "before" state) and then `data-inview` once
 * 30% of it is visible. The server markup carries neither attribute, so without JS or with reduced motion the content
 * renders in its final state, and nothing differs at hydration.
 */
export function ArmOnView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.armed = "";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.inview = "";
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
