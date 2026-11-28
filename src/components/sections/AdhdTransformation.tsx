"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Activity,
  BatteryLow,
  BedDouble,
  Brain,
  BrainCircuit,
  Frown,
  ShieldCheck,
  Smile,
  Sun,
  Target,
  TrendingUp,
  UserX,
  Users,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "From struggle to a better you": a pinned, scroll-scrubbed scene modelled on the reference "room" section.
 * Scroll progress t runs 0 → 3 across the pin (one unit per portrait) and is smoothed, then every layer is derived from it:
 *  - the four portraits cross-fade, and colour returns to her (desaturated → full) as t grows;
 *  - two AXON logo discs fade in at her sides, light up and pulse;
 *  - the eight struggles fly out of the logos into orbit (t ≈ 0.35 → 1), then are drawn back into them (t ≈ 1.45 → 2);
 *  - the eight outcomes burst out from her chest into orbit (t ≈ 2 → 2.7) and then glow;
 *  - the caption cross-fades (8px rise) to the nearest stage.
 */

type Orbit = { label: string; icon: LucideIcon };

const struggles: Orbit[] = [
  { label: "Persistent Fatigue", icon: BatteryLow },
  { label: "Difficulty Focusing", icon: Brain },
  { label: "Feelings of Sadness", icon: Frown },
  { label: "Impulsivity", icon: Zap },
  { label: "Sleep Problems", icon: BedDouble },
  { label: "Mood Swings", icon: Activity },
  { label: "Social Withdrawal", icon: UserX },
  { label: "Overthinking", icon: Waves },
];

const outcomes: Orbit[] = [
  { label: "Better Focus", icon: Target },
  { label: "Increased Confidence", icon: ShieldCheck },
  { label: "Mental Clarity", icon: BrainCircuit },
  { label: "Higher Productivity", icon: TrendingUp },
  { label: "Emotional Balance", icon: Smile },
  { label: "Stronger Relationships", icon: Users },
  { label: "Better Sleep", icon: BedDouble },
  { label: "Improved Daily Life", icon: Sun },
];

/** Native pixel sizes; every portrait is drawn at the same scale (700 source px = stage height) so the person stays the same size. */
const stages = [
  {
    image: { src: "/images/assessment/adhd-transformation-struggle.webp", width: 408, height: 612, alt: "Woman sitting on a stool holding her head, overwhelmed by ADHD symptoms" },
    eyebrow: "ADHD: The Struggle",
    caption: "It’s not just in your head. It’s a real challenge.",
  },
  {
    image: { src: "/images/assessment/adhd-transformation-reflection.webp", width: 357, height: 698, alt: "Woman sitting on a stool looking up, reflecting on her ADHD symptoms" },
    eyebrow: "ADHD: The Struggle",
    caption: "Fatigue, focus, mood and sleep all pull at once.",
  },
  {
    image: { src: "/images/assessment/adhd-transformation-relief.webp", width: 408, height: 612, alt: "Woman sitting calmly with her hand on her heart after getting ADHD answers" },
    eyebrow: "Getting the Right Care",
    caption: "An objective assessment turns questions into clarity.",
  },
  {
    image: { src: "/images/assessment/adhd-transformation-thriving.webp", width: 445, height: 561, alt: "Woman smiling with open arms, thriving with the right ADHD care" },
    eyebrow: "ADHD: A Better You",
    caption: "With the right care, you can thrive.",
  },
] as const;

const SOURCE_H = 700;
const LAST = stages.length - 1;
/** Scroll per portrait while pinned: a little longer than the reference's ≈ 65% of a screen, for a slower pace. */
const STEP_SVH = 85;
/** Smoothing: fraction of the remaining distance covered each frame (lower = softer, more gradual follow). */
const FOLLOW = 0.07;

/** Orbit slots as % of the stage box (x from centre, y from top): outer pair on the sides, inner pair above and below. */
const slots = [
  { x: -30, y: 13 },
  { x: 30, y: 13 },
  { x: -45, y: 37 },
  { x: 45, y: 37 },
  { x: -45, y: 63 },
  { x: 45, y: 63 },
  { x: -30, y: 87 },
  { x: 30, y: 87 },
] as const;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** Gentle start and finish (cubic in-out), so icons drift rather than snap. */
const easeInOut = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - (-2 * v + 2) ** 3 / 2);
const smooth = (v: number) => v * v * (3 - 2 * v);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

type OrbitEls = { item: HTMLLIElement | null; label: HTMLSpanElement | null; glow: HTMLSpanElement | null };

function OrbitIcons({ items, tone, els }: { items: Orbit[]; tone: "struggle" | "outcome"; els: RefObject<OrbitEls[]> }) {
  return (
    <ul aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <li
            key={it.label}
            ref={(el) => {
              els.current[i] = { ...els.current[i], item: el };
            }}
            className="absolute top-1/2 left-1/2 will-change-transform"
            style={{ width: "var(--icon)", height: "var(--icon)", marginLeft: "calc(var(--icon) / -2)", marginTop: "calc(var(--icon) / -2)", opacity: 0, transform: "scale(.3)" }}
          >
            <span
              className={cn(
                "relative grid size-full place-items-center overflow-hidden rounded-full border",
                tone === "struggle"
                  ? "border-[#C9D6E8] bg-[radial-gradient(circle_at_35%_30%,#FFFFFF,#EAF0F8)] text-[#5B6B85] shadow-[0_0_0_4px_rgba(91,107,133,.08),0_8px_18px_-8px_rgba(11,37,75,.25)]"
                  : "border-[#9CC4F0] bg-[radial-gradient(circle_at_35%_30%,#FFFFFF,#E3EFFD)] text-[#2578CA] shadow-[0_0_0_4px_rgba(37,120,202,.10),0_8px_18px_-8px_rgba(37,120,202,.35)]",
              )}
            >
              {/* Lit state (outcomes only): a solid blue disc faded in over the light one. */}
              {tone === "outcome" && (
                <span
                  ref={(el) => {
                    els.current[i] = { ...els.current[i], glow: el };
                  }}
                  className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#3A8DE0,#1E64AA)]"
                  style={{ opacity: 0 }}
                />
              )}
              <Icon className="relative size-[42%]" strokeWidth={1.75} />
            </span>
            <span
              ref={(el) => {
                els.current[i] = { ...els.current[i], label: el };
              }}
              className="absolute top-full left-1/2 mt-1.5 w-[80px] -translate-x-1/2 text-center text-[10.5px] leading-tight font-semibold text-navy [text-shadow:0_1px_6px_rgba(255,255,255,.95),0_0_2px_rgba(255,255,255,.9)] sm:mt-2 sm:w-[120px] sm:text-[12.5px]"
              style={{ opacity: 0 }}
            >
              {it.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** AXON logo disc beside the figure: soft halo, pulse ring while lit, glossy white disc with the logo mark. */
function LogoDisc({ setRef, setGlow }: { setRef: (el: HTMLDivElement | null) => void; setGlow: (el: HTMLSpanElement | null) => void }) {
  return (
    <div
      ref={setRef}
      aria-hidden
      className="absolute top-1/2 left-1/2 will-change-transform"
      style={{ width: "var(--logo)", height: "var(--logo)", marginLeft: "calc(var(--logo) / -2)", marginTop: "calc(var(--logo) / -2)", opacity: 0 }}
    >
      <span ref={setGlow} className="absolute -inset-[55%] block" style={{ opacity: 0 }}>
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(37,120,202,.22),rgba(37,120,202,.07)_55%,transparent)]" />
        <span className="absolute inset-[26%] animate-[axon-logo-ping_2.4s_cubic-bezier(.22,1,.36,1)_infinite] rounded-full border border-[#2578CA]/60" />
      </span>
      <span className="relative grid size-full place-items-center rounded-full border border-[#CFE0F3] bg-[radial-gradient(70%_60%_at_50%_30%,#FFFFFF,#EEF4FB_70%,#E2ECF8)] shadow-[inset_0_1px_0_#fff,inset_0_-8px_14px_-10px_rgba(11,37,75,.25),0_16px_34px_-16px_rgba(11,37,75,.45)]">
        <span className="absolute inset-[6px] rounded-full border border-[#2578CA]/10" />
        <Image src="/images/assessment/axon_logo.webp" alt="" width={131} height={140} unoptimized className="relative h-auto w-[60%]" />
      </span>
    </div>
  );
}

export function AdhdTransformation() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const personRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const logoGlowRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const struggleEls = useRef<OrbitEls[]>([]);
  const outcomeEls = useRef<OrbitEls[]>([]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const box = stageRef.current;
    if (!pin || !box) return;
    let raf = 0;
    let cur = -1;

    const target = () => {
      const travel = pin.offsetHeight - window.innerHeight;
      return travel > 0 ? clamp(-pin.getBoundingClientRect().top / travel) * LAST : 0;
    };

    const render = (t: number) => {
      const vw = window.innerWidth;
      const W = box.offsetWidth;
      const H = box.offsetHeight;
      const desktop = vw >= 1181;
      const spread = vw < 640 ? 0.8 : desktop ? 1 : 0.92;
      const logo = desktop ? 96 : vw >= 640 ? 72 : 56;
      const icon = vw >= 640 ? 52 : 40;
      box.style.setProperty("--logo", `${logo}px`);
      box.style.setProperty("--icon", `${icon}px`);

      // Logos: beside her just above centre on desktop (reference), in the top corners of the stage on smaller screens.
      const lx = desktop ? Math.min(532, vw / 2 - logo / 2 - 24) : Math.min(W / 2 - logo / 2, vw / 2 - logo / 2 - 12);
      const ly = desktop ? -0.04 * H : -H / 2 + logo / 2;
      const logoIn = smooth(clamp(t / 0.5)) * (1 - smooth(clamp((t - 2.4) / 0.45)));
      const lit = smooth(clamp((t - 0.4) / 0.4)) * (1 - smooth(clamp((t - 2.15) / 0.45)));
      logoRefs.current.forEach((el, side) => {
        if (!el) return;
        const dir = side === 0 ? -1 : 1;
        el.style.opacity = logoIn.toFixed(3);
        el.style.transform = `translate(${(dir * lx).toFixed(1)}px, ${ly.toFixed(1)}px) scale(${(0.85 + 0.15 * logoIn).toFixed(3)})`;
      });
      logoGlowRefs.current.forEach((el) => {
        if (el) el.style.opacity = lit.toFixed(3);
      });

      // Portraits: hold, then cross-fade at each midpoint; colour returns as she improves.
      imgRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = smooth(clamp(1 - Math.max(0, Math.abs(t - i) - 0.2) / 0.6)).toFixed(3);
      });
      if (personRef.current) {
        const k = t / LAST;
        personRef.current.style.filter = `saturate(${(0.45 + 0.55 * k).toFixed(3)}) brightness(${(0.9 + 0.1 * k).toFixed(3)})`;
        personRef.current.style.transform = `scale(${(1.04 - 0.04 * k).toFixed(4)})`;
      }
      if (spotRef.current) spotRef.current.style.opacity = (0.15 + 0.85 * (t / LAST)).toFixed(3);

      const slotPx = (i: number) => ({ x: (slots[i].x / 100) * W * spread, y: (slots[i].y / 100 - 0.5) * H });

      // Struggles: fly out of the nearer logo into orbit, then are drawn back into it.
      struggleEls.current.forEach((e, i) => {
        if (!e?.item) return;
        const s = slotPx(i);
        const from = { x: (s.x < 0 ? -1 : 1) * lx, y: ly };
        const out = easeInOut(clamp((t - 0.3 - i * 0.04) / 0.8));
        const back = easeInOut(clamp((t - 1.4 - i * 0.04) / 0.65));
        const a = out * (1 - back);
        e.item.style.opacity = clamp(a * 1.6).toFixed(3);
        e.item.style.transform = `translate(${lerp(from.x, s.x, a).toFixed(1)}px, ${lerp(from.y, s.y, a).toFixed(1)}px) scale(${(0.35 + 0.65 * a).toFixed(3)})`;
        if (e.label) e.label.style.opacity = smooth(clamp((a - 0.65) / 0.35)).toFixed(3);
      });

      // Outcomes: burst out from her chest into orbit, then light up.
      const glow = smooth(clamp((t - 2.55) / 0.45));
      outcomeEls.current.forEach((e, i) => {
        if (!e?.item) return;
        const s = slotPx(i);
        const b = easeInOut(clamp((t - 1.95 - i * 0.04) / 0.75));
        e.item.style.opacity = clamp(b * 1.6).toFixed(3);
        e.item.style.transform = `translate(${lerp(0, s.x, b).toFixed(1)}px, ${lerp(-0.25 * H, s.y, b).toFixed(1)}px) scale(${(0.25 + 0.75 * b).toFixed(3)})`;
        if (e.label) e.label.style.opacity = smooth(clamp((b - 0.65) / 0.35)).toFixed(3);
        if (e.glow) e.glow.style.opacity = glow.toFixed(3);
        const svg = e.item.querySelector("svg");
        if (svg) svg.style.color = glow > 0.5 ? "#fff" : "";
      });

      const next = Math.min(LAST, Math.max(0, Math.round(t)));
      setStage((v) => (v === next ? v : next));
    };

    const tick = () => {
      raf = 0;
      const goal = target();
      cur = cur < 0 ? goal : lerp(cur, goal, FOLLOW);
      if (Math.abs(goal - cur) < 0.0005) cur = goal;
      render(cur);
      if (cur !== goal) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  return (
    <section data-no-fx aria-labelledby="transformation-title" className="relative isolate overflow-clip bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! text-navy">
      <div ref={pinRef} className="relative" style={{ height: `calc(100svh + ${LAST * STEP_SVH}svh)` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-6 sm:pt-20">
          {/* Backdrop: a central spotlight that grows as she improves, and a faint grid. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div ref={spotRef} className="absolute inset-0 bg-[radial-gradient(42%_48%_at_50%_48%,rgba(37,120,202,.16),transparent_70%)]" style={{ opacity: 0.15 }} />
            <div className="absolute inset-0 [mask-image:radial-gradient(55%_55%_at_50%_45%,#000,transparent_75%)] bg-[linear-gradient(rgba(37,120,202,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,120,202,.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
          </div>

          <h2 id="transformation-title" className="sr-only">
            From the ADHD struggle to a better you
          </h2>
          <p className="sr-only">
            Common ADHD struggles: {struggles.map((s) => s.label).join(", ")}. With the right care: {outcomes.map((s) => s.label).join(", ")}.
          </p>

          {/* Stage box: portrait in the middle, logos at her sides, orbit icons around her. */}
          <div
            ref={stageRef}
            className="relative aspect-[360/470] w-full max-w-[min(94vw,calc((100svh-230px)*0.766))] sm:aspect-[700/620] sm:max-w-[min(760px,calc((100svh-240px)*1.13))]"
            style={{ ["--logo" as string]: "96px", ["--icon" as string]: "52px" }}
          >
            <div aria-hidden className="absolute bottom-[1%] left-1/2 h-[9%] w-[62%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(11,37,75,.22),rgba(11,37,75,.06)_60%,transparent)]" />
            <div ref={personRef} className="absolute inset-0 origin-[50%_94%] will-change-[filter,transform]" style={{ filter: "saturate(.45) brightness(.9)", transform: "scale(1.04)" }}>
              {stages.map((s, i) => (
                <div
                  key={s.image.src}
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className="absolute bottom-[3%] left-1/2 -translate-x-1/2"
                  style={{ height: `${(s.image.height / SOURCE_H) * 92}%`, aspectRatio: `${s.image.width} / ${s.image.height}`, opacity: i === 0 ? 1 : 0 }}
                >
                  <Image
                    src={s.image.src}
                    alt={i === stage ? s.image.alt : ""}
                    aria-hidden={i !== stage}
                    fill
                    sizes="(max-width: 639px) 70vw, 340px"
                    className="object-contain object-bottom drop-shadow-[0_18px_24px_rgba(11,37,75,.18)]"
                  />
                </div>
              ))}
            </div>
            <LogoDisc
              setRef={(el) => {
                logoRefs.current[0] = el;
              }}
              setGlow={(el) => {
                logoGlowRefs.current[0] = el;
              }}
            />
            <LogoDisc
              setRef={(el) => {
                logoRefs.current[1] = el;
              }}
              setGlow={(el) => {
                logoGlowRefs.current[1] = el;
              }}
            />
            <OrbitIcons items={struggles} tone="struggle" els={struggleEls} />
            <OrbitIcons items={outcomes} tone="outcome" els={outcomeEls} />
          </div>

          {/* Caption for the nearest stage (cross-fade with an 8px rise, as on the reference). */}
          <div aria-live="polite" className="relative mt-4 grid min-h-[84px] w-full max-w-[640px] text-center sm:mt-6">
            {stages.map((s, i) => (
              <div
                key={s.image.src}
                aria-hidden={i !== stage}
                className="col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ opacity: i === stage ? 1 : 0, transform: i === stage ? "none" : "translateY(8px)" }}
              >
                <p className="font-display text-[22px] leading-tight font-bold sm:text-[30px]">
                  {s.eyebrow.includes(":") ? (
                    <>
                      {s.eyebrow.split(":")[0]}:<span className="text-[#2578CA]">{s.eyebrow.split(":")[1]}</span>
                    </>
                  ) : (
                    <span className="text-[#2578CA]">{s.eyebrow}</span>
                  )}
                </p>
                <p className="mt-2 text-[15px] leading-snug text-body sm:text-[18px]">{s.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
