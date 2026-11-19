"use client";

import Image from "next/image";
import { Building2, ClipboardCheck, Handshake, Link2, Share2, Stethoscope, type LucideIcon } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import type { StepsSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Step = StepsSection["items"][number];

const tints = [
  { bg: "#EAF3FF", ring: "#CFE2FA", num: "#BCD6F6" },
  { bg: "#F3EDFF", ring: "#E0D3FA", num: "#D3C2F6" },
  { bg: "#EAF8F0", ring: "#CDEBDA", num: "#B9E2CB" },
  { bg: "#EAF8FC", ring: "#CBECF4", num: "#B5E3EF" },
  { bg: "#FFF0F5", ring: "#F8D9E4", num: "#F4C5D7" },
  { bg: "#EDF3FF", ring: "#D2E0FA", num: "#C0D3F6" },
] as const;

/** Gradient mode (`deepBg`): one gradient per step (blue, purple, teal, peach, sky blue, green), dark text throughout. */
const gradientThemes = [
  "linear-gradient(135deg, #C5D9F2, #8FB5E2)",
  "linear-gradient(135deg, #D5C6F2, #B39AE0)",
  "linear-gradient(135deg, #B8E1D9, #83C8B9)",
  "linear-gradient(135deg, #F5D2BA, #E9AD8D)",
  "linear-gradient(135deg, #B8DDEE, #83BBD9)",
  "linear-gradient(135deg, #C8DDBD, #9DBE8C)",
] as const;
/** Step-number colour per card: a deep shade of that card's own hue, for strong contrast on its gradient. */
const gradientNumbers = ["#1F4E8C", "#5233A0", "#16695C", "#A5441B", "#17658F", "#3A6529"] as const;
const gradientLook = { label: "text-[#0F2F6B]", track: "tracking-[0.14em]", title: "text-[#0B1F4D]", text: "text-[#26384F]", shadow: "rgba(16,41,77,.28)" } as const;
/** Gradient mode: the small icon beside each step number, chosen for what that step is about (partner, university details, magic link, screening, results shared, consultation). */
const stepIcons: LucideIcon[] = [Handshake, Building2, Link2, ClipboardCheck, Share2, Stethoscope];

const deepThemeFor = (i: number) => ({ ...gradientLook, bg: gradientThemes[i % gradientThemes.length], num: gradientNumbers[i % gradientNumbers.length] });

/** Offset between the stuck edges of neighbouring cards. 0: every card lands exactly over the previous one, hiding it. */
const STAGGER = 0;
const SCALE_DOWN = 0.03;

/** The screenshot exactly as supplied: no frame, border or backing, so nothing white is added around it. */
function StepImage({ image, className }: { image: NonNullable<Step["image"]>; className?: string }) {
  return (
    <div className={className}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 767px) 92vw, (max-width: 1280px) 56vw, 760px" className="block h-auto w-full" />
    </div>
  );
}

/**
 * Pastel cards (one per workflow step) that stick near the top as you scroll; each next card rises over the previous one, which scales down
 * slightly and dims. Pure `position: sticky` for the stacking, plus a scroll-linked scale. From 768px up only: phones get
 * a normal vertical list. Needs no `overflow` on any ancestor.
 */
export function WorkflowStack({ data }: { data: StepsSection }) {
  const cards = useRef<Array<HTMLLIElement | null>>([]);
  const inner = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const active = desktop.matches && !reduce.matches;
      cards.current.forEach((li, i) => {
        const el = inner.current[i];
        const next = cards.current[i + 1];
        if (!li || !el) return;
        if (!active || !next) {
          el.style.transform = "";
          el.style.filter = "";
          return;
        }
        // How far the next card has risen over this one: 0 while it is still below, 1 once it sits at its own stuck position.
        const stuckTop = parseFloat(getComputedStyle(li).top) || 0;
        const height = li.offsetHeight;
        const gap = next.getBoundingClientRect().top - (stuckTop + STAGGER);
        const progress = Math.min(1, Math.max(0, 1 - gap / height));
        el.style.transform = `scale(${1 - SCALE_DOWN * progress})`;
        el.style.filter = progress > 0 ? `brightness(${1 - 0.05 * progress})` : "";
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    reduce.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section id={data.id} className={cn("scroll-mt-[var(--header-offset)] bg-white", data.compact ? "py-10 sm:py-12 lg:py-14" : "section-py")} aria-labelledby={`${data.id ?? "workflow"}-title`}>
      <Container>
        <SectionHeading title={data.title} subtitle={data.subtitle} id={`${data.id ?? "workflow"}-title`} />
        <ol className={cn("mt-8 sm:mt-10", data.compact && "sm:mt-8")}>
          {data.items.map((step, i) => {
            const t = tints[i % tints.length];
            const flip = i % 2 === 1;
            const n = String(i + 1).padStart(2, "0");
            const dt = deepThemeFor(i);
            return (
              <li
                key={step.title}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className={cn("mb-6 last:mb-0 sm:sticky sm:mb-10", data.compact && "!mb-5 sm:!mb-7")}
                style={{ top: `calc(var(--header-offset) + ${i * STAGGER}px)`, zIndex: i + 1 }}
              >
                <div
                  ref={(el) => {
                    inner.current[i] = el;
                  }}
                  className={cn("origin-top rounded-[26px] border p-6 shadow-[0_30px_30px_-30px_rgba(16,41,77,.3)] will-change-transform sm:min-h-[460px] sm:rounded-[30px] sm:p-9 lg:min-h-[500px] lg:p-12", data.deepBg && "rounded-[30px] sm:rounded-[38px] lg:rounded-[42px]", data.compact && "!p-5 sm:!min-h-[380px] sm:!p-7 lg:!min-h-[440px] lg:!p-9")}
                  style={
                    data.deepBg
                      ? ({ background: dt.bg, borderColor: "transparent", boxShadow: `0 30px 50px -28px ${dt.shadow}` } as CSSProperties)
                      : { backgroundColor: t.bg, borderColor: t.ring }
                  }
                >
                  <div className={cn("grid h-full items-center gap-6 sm:gap-8 lg:gap-12", data.compact && "!gap-5 sm:!gap-6 lg:!gap-8", flip ? "sm:grid-cols-[1.2fr_0.8fr]" : "sm:grid-cols-[0.8fr_1.2fr]")}>
                    <div className={cn(flip && "sm:order-2")}>
                      <div className="flex items-end gap-4">
                        <span aria-hidden className={cn("leading-[0.85] font-extrabold tracking-[-0.04em]", data.deepBg ? (data.compact ? "text-[56px] sm:text-[72px] lg:text-[84px]" : "text-[72px] sm:text-[96px] lg:text-[112px]") : "text-[64px] sm:text-[84px]")} style={{ color: data.deepBg ? dt.num : t.num }}>
                          {n}
                        </span>
                        {data.deepBg ? (
                          <>
                            <span className="sr-only">Step {n}</span>
                            <span aria-hidden className={cn("mb-1.5 grid size-11 shrink-0 place-items-center rounded-[14px] bg-[#EDE5FD] text-[#7C3AED] shadow-[0_6px_14px_-8px_rgba(124,58,237,.5)] sm:mb-2 sm:size-12", data.compact && "!size-9 !rounded-[12px] sm:!mb-1.5 sm:!size-10")}>
                              {(() => {
                                const Icon = stepIcons[i % stepIcons.length];
                                return <Icon className={data.compact ? "size-4 sm:size-5" : "size-5 sm:size-6"} strokeWidth={1.9} />;
                              })()}
                            </span>
                          </>
                        ) : (
                          <span className={cn("uppercase", data.deepBg ? cn("pb-2 text-[16px] font-semibold sm:text-[18px]", dt.label, dt.track) : "pb-1 text-[13px] font-bold tracking-[0.16em] text-primary")}>Step {n}</span>
                        )}
                      </div>
                      <h3 className={cn("mt-5 text-[clamp(22px,2.2vw,32px)] leading-[1.2] font-bold tracking-[-0.01em]", data.deepBg ? cn(dt.title, "lg:text-[clamp(28px,2.4vw,38px)]") : "text-navy", data.compact && "!mt-3 !text-[clamp(20px,1.9vw,26px)] lg:!text-[clamp(23px,2vw,30px)]")}>{step.title}</h3>
                      <p className={cn("type-body mt-3 text-pretty", data.deepBg ? dt.text : "text-body", data.compact && "mt-2 !text-[15px] !leading-[1.6] sm:!text-[16px]")}>{step.text}</p>
                      {step.details?.map((d) => (
                        <div key={d.title} className="mt-5 rounded-[14px] border border-white/80 bg-white/60 px-4 py-3.5">
                          <p className="text-[15px] font-bold text-navy">{d.title}</p>
                          <p className="mt-1 text-[14.5px] leading-relaxed text-body">{d.text}</p>
                        </div>
                      ))}
                    </div>
                    {step.image && <StepImage image={step.image} className={cn(flip && "sm:order-1", data.compact && "mx-auto flex w-full max-w-[420px] justify-center [&_img]:max-h-[320px] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain sm:h-[300px] sm:max-w-none sm:items-center sm:[&_img]:h-full sm:[&_img]:max-h-none sm:[&_img]:w-full lg:h-[360px]")} />}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
