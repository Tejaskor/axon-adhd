"use client";

import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Compass,
  FileText,
  Laptop,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { journeyToClarity } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/*
 * Arc geometry, in the reference design's units (a 548 × 720 box that scales with the section): the steps sit on an arc of radius R whose
 * centre is left of the box, spread ±SWEEP° around the vertical middle; the step counter sits inside the curve.
 */
const W = 548;
const H = 720;
const R = 302.9;
const CX = 226.6 - R;
const CY = H / 2;
const SWEEP = 68;
const AUTOPLAY_MS = 5500;
/** Scroll distance (viewport heights) between two steps while the section is pinned (the reference uses one screen per step). */
const SCROLL_PER_STEP_VH = 90;
/** How quickly the progress line and its glowing dot catch up with the scroll position (per frame, 0–1). */
const FOLLOW = 0.12;
/** Card swap: the old content fades out for this long, then the new content fades in. */
const OUT_MS = 180;

/** One small icon per step, shown in the card's counter chip. */
const STEP_ICONS: LucideIcon[] = [
  ClipboardList,
  BarChart3,
  Laptop,
  Users,
  FileText,
  Compass,
];

const rad = (d: number) => (d * Math.PI) / 180;
// Rounded: Math.cos/sin can differ in the last digits between the server and the browser, which React reports as a hydration mismatch.
const round = (v: number) => Math.round(v * 100) / 100;
const at = (deg: number) => ({
  x: round(CX + R * Math.cos(rad(deg))),
  y: round(CY + R * Math.sin(rad(deg))),
});
const ARC_START = at(-SWEEP);
const ARC_END = at(SWEEP);
const ARC = `M ${ARC_START.x} ${ARC_START.y} A ${R} ${R} 0 0 1 ${ARC_END.x} ${ARC_END.y}`;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "Your Journey to Clarity". The section pins (see .journey-pin in globals.css) while scrolling walks through the steps, as on the reference:
 * the progress line and a glowing dot follow the scroll smoothly along the arc, the step counter rolls to the next number, and the card's
 * content fades out and back in (blur + rise) with the picture revealed through an expanding circle. Click / tap / arrow keys scroll to a step.
 * Where pinning is off (short screens, reduced motion) the steps advance on their own. Below lg the arc becomes a row of numbered chips.
 */
export function JourneyToClarity() {
  const { steps, ctas } = journeyToClarity;
  const n = steps.length;
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0); // the step whose content the card currently displays
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [roll, setRoll] = useState<{ from: number | null; dir: 1 | -1 }>({
    from: null,
    dir: 1,
  });
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [pinned, setPinned] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const progressPath = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const target = useRef(0);
  const smooth = useRef(0);
  const activeRef = useRef(0);

  useEffect(() => {
    // Hide the heading words only once JS is running (they rise into view when the section is reached); without JS they simply show.
    root.current?.classList.add("journey-armed");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) root.current?.classList.add("journey-seen");
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" },
    );
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  /* Scroll → raw progress (0–1) while pinned; the nearest step becomes active. */
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

  /* Unpinned: the target simply follows the active step. */
  useEffect(() => {
    if (!pinned) target.current = active / (n - 1);
  }, [pinned, active, n]);

  /* The progress line and the dot ease towards the target every frame (written straight to the SVG, no re-render). */
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
      const { x, y } = at(-SWEEP + smooth.current * 2 * SWEEP);
      dot.current?.setAttribute("transform", `translate(${x} ${y})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* Step change: roll the counter and swap the card (fade out → new content fades in). */
  useEffect(() => {
    const prev = activeRef.current;
    if (prev === active) return;
    activeRef.current = active;
    setRoll({ from: prev, dir: active > prev ? 1 : -1 });
    if (reduced) {
      setShown(active);
      return;
    }
    setPhase("out");
    const id = window.setTimeout(() => {
      setShown(active);
      setPhase("in");
    }, OUT_MS);
    const clear = window.setTimeout(
      () => setRoll((r) => ({ ...r, from: null })),
      650,
    );
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(clear);
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

  /** Pick a step: when pinned, scroll to that step's place in the sequence (the scroll position then selects it). */
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

  const step = steps[shown];
  const StepIcon = STEP_ICONS[shown % STEP_ICONS.length];
  const words = [
    ...journeyToClarity.title.split(" ").map((w) => ({ w, accent: false })),
    { w: journeyToClarity.titleAccent, accent: true },
  ];

  return (
    <section
      data-no-fx
      className="bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] section-py"
      aria-labelledby="journey-title"
    >
      <div
        ref={root}
        className="mx-auto w-full max-w-[1372px] px-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
      >
        <div
          ref={outer}
          className="journey-pin"
          style={
            {
              "--journey-scroll": `${(n - 1) * SCROLL_PER_STEP_VH}vh`,
            } as CSSProperties
          }
        >
          <div ref={stick} className="journey-stick">
            <div className="w-full py-3">
              {/* Heading: each word slides up out of a mask once the section comes into view, then the line below fades up. */}
              <div className="text-center">
                <h2 id="journey-title" className="type-h2 text-navy">
                  <span className="sr-only">
                    {journeyToClarity.title} {journeyToClarity.titleAccent}
                  </span>
                  <span aria-hidden>
                    {words.map(({ w, accent }, i) => (
                      <span
                        key={i}
                        className="inline-block overflow-hidden pb-[0.1em] align-bottom"
                      >
                        <span
                          className={cn(
                            "journey-word inline-block",
                            accent && "text-primary",
                          )}
                          style={{ "--d": `${i * 70}ms` } as CSSProperties}
                        >
                          {w}
                          {i < words.length - 1 && " "}
                        </span>
                      </span>
                    ))}
                  </span>
                </h2>
                <p className="journey-lead mx-auto mt-2 max-w-[820px] text-[16px] leading-[1.7] text-muted sm:text-[20px]">
                  {journeyToClarity.disclaimer}
                </p>
              </div>

              <div className="mt-6 lg:mt-6 xl:mt-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-12">
                {/* Steps: numbered chips on small screens, the arc from lg */}
                <div className="relative mx-auto lg:mr-0 lg:ml-[6%] lg:aspect-[548/720] lg:h-[min(66vh,640px)]">
                  <svg
                    aria-hidden
                    viewBox={`0 0 ${W} ${H}`}
                    className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
                    fill="none"
                  >
                    <defs>
                      <linearGradient
                        id="journey-arc"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1={ARC_START.y}
                        x2="0"
                        y2={ARC_END.y}
                      >
                        <stop offset="0" stopColor="#5498DB" />
                        <stop offset="1" stopColor="#1E64AA" />
                      </linearGradient>
                    </defs>
                    <path
                      d={ARC}
                      stroke="#C9DAEE"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <path
                      d={ARC}
                      stroke="rgba(37,106,204,.05)"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    <path
                      d={ARC}
                      stroke="#9DB9D8"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeDasharray="1 9"
                    />
                    <path
                      ref={progressPath}
                      d={ARC}
                      stroke="url(#journey-arc)"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="0 1"
                    />
                    {/* Glowing dot riding the progress line */}
                    <g
                      ref={dot}
                      transform={`translate(${ARC_START.x} ${ARC_START.y})`}
                    >
                      <circle r="26" fill="rgba(37,106,204,.12)" />
                      <circle
                        r="5"
                        fill="#19528C"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>

                  {/* Step counter inside the curve: the number rolls up (or down) to the next one */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-[13%] hidden -translate-x-1/2 -translate-y-1/2 text-center lg:block"
                  >
                    <p className="text-[14px] font-semibold tracking-[0.2em] text-muted">
                      STEP
                    </p>
                    <div className="relative mt-1 h-[96px] w-[140px] overflow-hidden">
                      {roll.from !== null && (
                        <span
                          key={`out-${roll.from}-${active}`}
                          className={cn(
                            "absolute inset-0 font-display text-[96px] leading-none font-normal tracking-[-0.04em] text-navy tabular-nums",
                            roll.dir > 0
                              ? "journey-roll-out-up"
                              : "journey-roll-out-down",
                          )}
                        >
                          {pad(roll.from + 1)}
                        </span>
                      )}
                      <span
                        key={`in-${active}`}
                        className={cn(
                          "absolute inset-0 font-display text-[96px] leading-none font-normal tracking-[-0.04em] text-navy tabular-nums",
                          roll.from !== null &&
                            (roll.dir > 0
                              ? "journey-roll-in-up"
                              : "journey-roll-in-down"),
                        )}
                      >
                        {pad(active + 1)}
                      </span>
                    </div>
                    <p className="mt-1 text-[16px] font-medium text-muted">
                      of {pad(n)}
                    </p>
                  </div>

                  <ol className="flex items-center justify-center gap-2.5 sm:gap-4 lg:absolute lg:inset-0 lg:block">
                    {steps.map((s, i) => {
                      const { x, y } = at(-SWEEP + (i * 2 * SWEEP) / (n - 1));
                      const on = i === active;
                      return (
                        <li
                          key={s.title}
                          className="lg:absolute"
                          style={
                            {
                              left: `${round((x / W) * 100)}%`,
                              top: `${round((y / H) * 100)}%`,
                            } as CSSProperties
                          }
                        >
                          <button
                            type="button"
                            aria-label={`Step ${i + 1}: ${s.title}`}
                            aria-current={on ? "step" : undefined}
                            onClick={() => goTo(i)}
                            onKeyDown={(e) => {
                              if (
                                e.key === "ArrowRight" ||
                                e.key === "ArrowDown"
                              )
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
                                "absolute top-1/2 left-full ml-4 hidden w-max -translate-y-1/2 text-left leading-[1.3] transition-colors duration-300 lg:block",
                                on
                                  ? "text-[22px] font-bold text-navy"
                                  : "text-[20px] font-medium text-muted group-hover:text-navy",
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

                {/* Selected step + calls to action */}
                <div className="mt-6 lg:mt-0">
                  <article
                    aria-live="polite"
                    className="journey-card mx-auto flex max-w-[620px] flex-col items-stretch gap-3 rounded-[20px] border border-white bg-white p-3 shadow-[0_22px_56px_-24px_rgba(25,82,140,.35)] sm:gap-5 sm:rounded-[28px] sm:p-4 lg:mx-0 lg:max-w-[min(620px,calc((min(66vh,640px)-250px)*1.78))]"
                  >
                    {/* Whole picture (the box has the photo's own 16:9 shape, so nothing is cropped), revealed through an expanding circle */}
                    <div
                      key={`img-${shown}`}
                      className={cn(
                        "journey-imgbox relative aspect-[1672/941] w-full shrink-0 overflow-hidden rounded-[14px] sm:w-full sm:rounded-[18px]",
                        phase === "in" ? "journey-clip-in" : "journey-fade-out",
                      )}
                    >
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(max-width: 639px) 92vw, 620px"
                        className="object-cover"
                      />
                    </div>
                    <div
                      key={`txt-${shown}`}
                      className={cn(
                        "min-w-0 py-1 pr-1 sm:px-2 sm:pt-0 sm:pb-2",
                        phase === "in" ? "journey-text-in" : "journey-fade-out",
                      )}
                    >
                      <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 font-display text-[13px] font-semibold text-primary tabular-nums sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[15px]">
                        <StepIcon aria-hidden className="size-[17px]" />
                        {pad(shown + 1)} <span aria-hidden>/</span> {pad(n)}
                      </p>
                      <h3 className="mt-2 text-[19px] leading-tight font-bold text-navy sm:mt-3 sm:text-[30px]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-[1.45] text-muted sm:mt-2 sm:text-[19px] sm:leading-[1.55]">
                        {step.text}
                      </p>
                    </div>
                  </article>

                  <div className="mt-5 flex flex-col items-stretch gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:justify-center sm:mt-7 sm:gap-4 lg:justify-start">
                    {/* Same buttons as the hero (same component, variants and classes). */}
                    <ButtonLink
                      href={ctas[0].href}
                      size="lg"
                      className="group h-14 gap-2 bg-[#0058F0]! font-semibold whitespace-normal shadow-[0_12px_28px_rgba(0,88,240,.4)]! hover:bg-[#004FD8]!"
                    >
                      {ctas[0].label}
                      <ArrowRight
                        aria-hidden
                        className="size-[18px] shrink-0 transition-transform group-hover:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </ButtonLink>
                    <ButtonLink
                      href={ctas[1].href}
                      size="lg"
                      variant="white"
                      className="group h-14 gap-2 border-2 border-[#0058F0] font-semibold text-[#0058F0]! hover:bg-[#EAF2FF]!"
                    >
                      {ctas[1].label}
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
    </section>
  );
}
