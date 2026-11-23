"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Full-bleed banner wrapper: the band starts at a 1440px max width (centred) and, as it scrolls into view,
 * widens smoothly to the full viewport width (its 30px corner radius easing to square), and eases back when scrolled back up.
 * Only the band's own width animates (its height and the content, which sits in a centred container, never move), so nothing
 * around it shifts. Viewports narrower than 1440px are unaffected, and
 * reduced-motion users get the full-width band straight away.
 */
export function ExpandOnScroll({ children, from = 1440 }: { children: ReactNode; from?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Expands once the band's top crosses a line 15% above the viewport bottom; scrolling back up past that line (the band
    // dropping below it) contracts it again. Once it has scrolled off the top it is simply left expanded.
    const io = new IntersectionObserver(
      ([entry]) => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setAnimate(!reduced);
        if (reduced || entry.isIntersecting) setExpanded(true);
        else if (entry.boundingClientRect.top > 0) setExpanded(false);
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        // Contained: 30px rounded corners (only where the viewport is wide enough for the band to look inset); they ease to square as it goes full-bleed.
        className="mx-auto w-full overflow-hidden [--r:30px] max-[1279px]:[--r:0px]"
        style={{
          maxWidth: expanded ? "100%" : `${from}px`,
          borderRadius: expanded ? 0 : "var(--r)",
          transition: animate ? "max-width 1100ms cubic-bezier(.22,.61,.36,1), border-radius 1100ms cubic-bezier(.22,.61,.36,1)" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
