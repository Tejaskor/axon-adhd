"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { StepsSection } from "@/content/pages/types";
import { ctas } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Step = StepsSection["items"][number];

/*
 * Winding path, in the reference design's units (a 440 × 558 box that scales with the section): the steps alternate between two columns
 * (x = 290 and x = 150) and each pair is joined by an S-shaped cubic curve, exactly as on the reference.
 */
const W = 440;
const H = 558;
const X_A = 290;
const X_B = 150;
const Y0 = 34;
const Y1 = 524;
/** Scroll distance (px) between two steps while the section is pinned (the reference pins for 667px over five steps). */
const SCROLL_PER_STEP = 170;
const FOLLOW = 0.12;
const OUT_MS = 180;
const AUTOPLAY_MS = 5500;

const pad = (n: number) => String(n).padStart(2, "0");

function nodes(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    x: i % 2 === 0 ? X_A : X_B,
    y: Math.round((Y0 + (i * (Y1 - Y0)) / (n - 1)) * 10) / 10,
  }));
}

/** S-curve through the nodes: each segment leaves and arrives vertically (control points 62% of the step height away). */
function pathFor(pts: Array<{ x: number; y: number }>) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const k = Math.round((b.y - a.y) * 0.62 * 10) / 10;
    d += ` C ${a.x} ${Math.round((a.y + k) * 10) / 10} ${b.x} ${Math.round((b.y - k) * 10) / 10} ${b.x} ${b.y}`;
  }
  return d;
}

/**
 * "Step-by-Step Comprehensive ADHD Assessment", after the reference's winding-path section: the steps sit on an S-shaped path (labels on
 * alternating sides), and the selected step shows in a card beside it. While pinned (see .journey-pin in globals.css) scrolling walks
 * through the steps: the progress line and a glowing dot follow the path, the card's content fades out and back in, and the picture opens
 * from a circle. Clicks / arrow keys scroll to a step. Where pinning is off the steps advance on their own. Below lg the path becomes a row
 * of numbered chips.
 */
export function AssessmentPath({
  items,
  heading,
}: {
  items: Step[];
  heading: ReactNode;
}) {
  const n = items.length;
  const pts = nodes(n);
  const D = pathFor(pts);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [pinned, setPinned] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const progressPath = useRef<SVGPathElement>(null);
  const measurePath = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const target = useRef(0);
  const smooth = useRef(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0,
      rootMargin: "0px 0px -25% 0px",
    });
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  /* Scroll → progress (0–1) while pinned; the nearest step becomes active. */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const o = outer.current;
      const st = stick.current;
      if (!o || !st) return;
      const isPinned = getComputedStyle(st).position === "sticky";
      setPinned((p) => (p === isPinned ? p : isPinned));
      if (!isPinned) return;
      const top = parseFloat(getComputedStyle(st).top) || 0;
      const range = o.offsetHeight - st.offsetHeight;
      if (range <= 0) return;
      const p = Math.min(
        1,
        Math.max(0, (top - o.getBoundingClientRect().top) / range),
      );
      target.current = p;
      setActive(Math.round(p * (n - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  useEffect(() => {
    if (!pinned) target.current = active / (n - 1);
  }, [pinned, active, n]);

  /* Progress line and dot ease towards the target each frame (written straight to the SVG). */
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = target.current;
      const s = reduced ? t : smooth.current + (t - smooth.current) * FOLLOW;
      smooth.current = Math.abs(t - s) < 0.0005 ? t : s;
      progressPath.current?.setAttribute(
        "stroke-dasharray",
        `${smooth.current.toFixed(4)} 1`,
      );
      const m = measurePath.current;
      if (m && dot.current) {
        const pt = m.getPointAtLength(m.getTotalLength() * smooth.current);
        dot.current.setAttribute(
          "transform",
          `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`,
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* Step change: the card's content fades out, then the new step fades in. */
  useEffect(() => {
    if (activeRef.current === active) return;
    activeRef.current = active;
    // State changes run from timers (not synchronously in the effect): fade the old content out, then swap in the new step.
    const out = window.setTimeout(() => {
      if (!reduced) setPhase("out");
    }, 0);
    const swap = window.setTimeout(
      () => {
        setShown(active);
        setPhase("in");
      },
      reduced ? 0 : OUT_MS,
    );
    return () => {
      window.clearTimeout(out);
      window.clearTimeout(swap);
    };
  }, [active, reduced]);

  useEffect(() => {
    if (pinned || paused || reduced || !visible) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % n),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [pinned, paused, reduced, visible, n]);

  const goTo = (i: number) => {
    const o = outer.current;
    const st = stick.current;
    if (pinned && o && st) {
      const top = parseFloat(getComputedStyle(st).top) || 0;
      const range = o.offsetHeight - st.offsetHeight;
      window.scrollTo({
        top:
          window.scrollY +
          o.getBoundingClientRect().top -
          top +
          (i / (n - 1)) * range,
        behavior: "smooth",
      });
    } else {
      setActive(i);
    }
  };

  const step = items[shown];

  return (
    <div
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div
        ref={outer}
        className="journey-pin assess-pin"
        style={
          {
            "--journey-scroll": `${(n - 1) * SCROLL_PER_STEP}px`,
          } as CSSProperties
        }
      >
        <div ref={stick} className="journey-stick">
          <div className="w-full py-3">
            {heading}

            <div className="mt-6 lg:mt-8 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-x-10 xl:grid-cols-2 xl:gap-x-16">
              {/* Steps: numbered chips on small screens, the winding path from lg */}
              <div className="assess-pathbox relative mx-auto lg:aspect-[440/558] lg:h-[min(56vh,540px)]">
                <svg
                  aria-hidden
                  viewBox={`0 0 ${W} ${H}`}
                  className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="assess-path"
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      y1={Y0}
                      x2="0"
                      y2={Y1}
                    >
                      <stop offset="0" stopColor="#5498DB" />
                      <stop offset="1" stopColor="#1E64AA" />
                    </linearGradient>
                  </defs>
                  <path
                    d={D}
                    stroke="rgba(37,106,204,.06)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={D}
                    stroke="#9DB9D8"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeDasharray="1 9"
                  />
                  <path
                    ref={progressPath}
                    d={D}
                    stroke="url(#assess-path)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray="0 1"
                  />
                  <path ref={measurePath} d={D} stroke="none" />
                  <g ref={dot} transform={`translate(${pts[0].x} ${pts[0].y})`}>
                    <circle r="20" fill="rgba(37,106,204,.12)" />
                    <circle
                      r="5"
                      fill="#19528C"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  </g>
                </svg>

                <ol className="flex items-center justify-center gap-3 sm:gap-4 lg:absolute lg:inset-0 lg:block">
                  {items.map((s, i) => {
                    const on = i === active;
                    const right = pts[i].x === X_A; // label to the right of the node on the right-hand column, to the left otherwise
                    return (
                      <li
                        key={s.title}
                        className="lg:absolute"
                        style={
                          {
                            left: `${(pts[i].x / W) * 100}%`,
                            top: `${(pts[i].y / H) * 100}%`,
                          } as CSSProperties
                        }
                      >
                        <button
                          type="button"
                          aria-label={`Step ${i + 1}: ${s.title}`}
                          aria-current={on ? "step" : undefined}
                          onClick={() => goTo(i)}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowRight" || e.key === "ArrowDown")
                              goTo(Math.min(n - 1, active + 1));
                            if (e.key === "ArrowLeft" || e.key === "ArrowUp")
                              goTo(Math.max(0, active - 1));
                          }}
                          className="group relative block rounded-full transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-95 lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2"
                        >
                          <span
                            className={cn(
                              "relative grid size-10 place-items-center rounded-full border-2 font-display text-[16px] font-bold transition-[background-color,border-color,color,scale,box-shadow] duration-500 ease-brand",
                              on
                                ? "scale-[1.15] border-[#2578CA] bg-[linear-gradient(145deg,#2578CA,#19528C)] text-white shadow-[0_0_0_5px_rgba(37,120,202,.16),0_10px_22px_-8px_rgba(25,82,140,.5)]"
                                : "border-[#B9D3EE] bg-white text-primary group-hover:border-[#7FAEDF]",
                            )}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={cn(
                              "absolute top-1/2 hidden w-max max-w-[220px] -translate-y-1/2 leading-[1.3] transition-colors duration-300 lg:block",
                              right
                                ? "left-full ml-4 text-left"
                                : "right-full mr-4 text-right",
                              on
                                ? "text-[19px] font-bold text-navy"
                                : "text-[18px] font-medium text-muted group-hover:text-navy",
                            )}
                          >
                            {s.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Selected step card + calls to action */}
              <div className="mt-6 lg:mt-0">
                <article
                  aria-live="polite"
                  className="relative mx-auto max-w-[600px] rounded-[24px] border border-white bg-white/85 p-4 shadow-[0_22px_56px_-24px_rgba(25,82,140,.35)] backdrop-blur-xl sm:p-5 lg:mx-0"
                >
                  <p className="absolute top-4 right-5 z-10 font-display text-[14px] font-semibold text-primary tabular-nums sm:top-5 sm:right-6">
                    {pad(shown + 1)}{" "}
                    <span className="text-muted">/ {pad(n)}</span>
                  </p>
                  {/* One fixed-size picture box for every step; each picture sits inside it whole (object-contain, never cropped)
                      and is revealed through an expanding circle. */}
                  <div className="assess-imgbox relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-[16px] sm:mt-7 lg:aspect-auto lg:h-[min(36vh,380px)]">
                    {step.image && (
                      <div
                        key={`img-${shown}`}
                        className={cn(
                          "absolute inset-0",
                          phase === "in"
                            ? "journey-clip-in"
                            : "journey-fade-out",
                        )}
                      >
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          fill
                          sizes="(max-width: 767px) 92vw, 600px"
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    key={`txt-${shown}`}
                    className={cn(
                      "mt-4 px-1",
                      phase === "in" ? "journey-text-in" : "journey-fade-out",
                    )}
                  >
                    <h3 className="text-[24px] leading-tight font-bold text-navy sm:text-[32px]">
                      {step.title}
                    </h3>
                    <p className="assess-text mt-2 max-w-[46ch] text-[16px] leading-[1.6] text-muted sm:text-[18px]">
                      {step.text}
                    </p>
                  </div>
                </article>

                <div className="mt-6 flex flex-col items-stretch gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:justify-center sm:mt-7 lg:justify-start">
                  <ButtonLink
                    href={ctas.evaluation.href}
                    size="lg"
                    className="group h-14 gap-2 bg-[#0058F0]! font-semibold whitespace-normal shadow-[0_12px_28px_rgba(0,88,240,.4)]! hover:bg-[#004FD8]!"
                  >
                    {ctas.evaluation.label}
                    <ArrowRight
                      aria-hidden
                      className="size-[18px] shrink-0 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </ButtonLink>
                  <ButtonLink
                    href={ctas.screening.href}
                    size="lg"
                    variant="white"
                    className="group h-14 gap-2 border-2 border-[#0058F0] font-semibold text-[#0058F0]! hover:bg-[#EAF2FF]!"
                  >
                    {ctas.screening.label}
                    <ArrowRight
                      aria-hidden
                      className="size-[18px] shrink-0 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
