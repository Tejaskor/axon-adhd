"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Backgrounds at or above this relative luminance count as "white" (#fff = 1, #f7fafd ≈ .95, #dfeaf4 ≈ .80). */
const LIGHT = 0.92;

function lum(r: number, g: number, b: number) {
  const f = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function colours(css: string) {
  const out: Array<{ r: number; g: number; b: number; a: number }> = [];
  for (const m of css.matchAll(/rgba?\(([^)]+)\)/g)) {
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    out.push({ r: p[0], g: p[1], b: p[2], a: p[3] ?? 1 });
  }
  return out;
}

/** true = light background, false = dark / photo / tinted, null = transparent (keep looking further down the stack). */
function judge(el: Element): boolean | null {
  if (/^(IMG|VIDEO|CANVAS|IFRAME|SVG)$/i.test(el.tagName)) return el.tagName.toUpperCase() === "SVG" ? null : false;
  const cs = getComputedStyle(el);
  const bgi = cs.backgroundImage;
  if (bgi && bgi !== "none") {
    if (/url\(/.test(bgi)) return false;
    const stops = colours(bgi).filter((c) => c.a > 0.3);
    if (stops.length) return stops.reduce((s, c) => s + lum(c.r, c.g, c.b), 0) / stops.length >= LIGHT;
  }
  const bg = colours(cs.backgroundColor)[0];
  if (bg && bg.a > 0.5) return lum(bg.r, bg.g, bg.b) >= LIGHT;
  return null;
}

/**
 * Renders nothing. Sets `data-light="true|false"` on its parent (the header pill) depending on whether the content currently
 * underneath the pill is a white background, so the pill can switch to a tinted, higher-contrast style over white sections
 * (see the `data-[light=true]:` classes in Header.tsx / OnlineEvalHeader.tsx). Runs on scroll, resize and route changes.
 */
export function HeaderLightWatcher() {
  const ref = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const pill = ref.current?.parentElement;
    if (!pill) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const r = pill.getBoundingClientRect();
      const y = r.top + r.height / 2;
      let light = 0;
      for (const f of [0.25, 0.5, 0.75]) {
        const x = r.left + r.width * f;
        let verdict: boolean | null = null;
        for (const el of document.elementsFromPoint(x, y)) {
          if (pill.contains(el) || el.closest("[data-site-header], .axn-lp-header")) continue;
          verdict = judge(el);
          if (verdict !== null) break;
        }
        if (verdict !== false) light += 1; // nothing opaque found = the white page background
      }
      pill.dataset.light = light >= 2 ? "true" : "false";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    const late = window.setTimeout(schedule, 600);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(late);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return <span ref={ref} hidden aria-hidden />;
}
