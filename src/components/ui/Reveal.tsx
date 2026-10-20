import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle fade-up on scroll, matching Elementor's "fadeInUp" entrance.
 * Pure CSS scroll-driven animation (see `.reveal` in globals.css): content is
 * always visible without JS or in browsers lacking `animation-timeline`, and
 * the effect is disabled for prefers-reduced-motion. Zero client JS.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={cn("reveal", className)} style={delay ? ({ "--reveal-delay": `${Math.round(delay * 100)}%` } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}
