"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
    <section id={data.id} className="scroll-mt-[var(--header-offset)] bg-white py-14 sm:py-20" aria-labelledby={`${data.id ?? "workflow"}-title`}>
      <Container>
        <SectionHeading title={data.title} subtitle={data.subtitle} id={`${data.id ?? "workflow"}-title`} />
        <ol className="mt-8 sm:mt-10">
          {data.items.map((step, i) => {
            const t = tints[i % tints.length];
            const flip = i % 2 === 1;
            const n = String(i + 1).padStart(2, "0");
            return (
              <li
                key={step.title}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className="mb-6 last:mb-0 sm:sticky sm:mb-10"
                style={{ top: `calc(var(--header-offset) + ${i * STAGGER}px)`, zIndex: i + 1 }}
              >
                <div
                  ref={(el) => {
                    inner.current[i] = el;
                  }}
                  className="origin-top rounded-[26px] border p-6 shadow-[0_30px_30px_-30px_rgba(16,41,77,.3)] will-change-transform sm:min-h-[460px] sm:rounded-[30px] sm:p-9 lg:min-h-[500px] lg:p-12"
                  style={{ backgroundColor: t.bg, borderColor: t.ring }}
                >
                  <div className={cn("grid h-full items-center gap-8 sm:gap-8 lg:gap-12", flip ? "sm:grid-cols-[1.2fr_0.8fr]" : "sm:grid-cols-[0.8fr_1.2fr]")}>
                    <div className={cn(flip && "sm:order-2")}>
                      <div className="flex items-end gap-4">
                        <span aria-hidden className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.04em] sm:text-[84px]" style={{ color: t.num }}>
                          {n}
                        </span>
                        <span className="pb-1 text-[13px] font-bold tracking-[0.16em] text-primary uppercase">Step {n}</span>
                      </div>
                      <h3 className="mt-5 text-[clamp(22px,2.2vw,32px)] leading-[1.2] font-bold tracking-[-0.01em] text-navy">{step.title}</h3>
                      <p className="type-body mt-3 text-pretty text-body">{step.text}</p>
                      {step.details?.map((d) => (
                        <div key={d.title} className="mt-5 rounded-[14px] border border-white/80 bg-white/60 px-4 py-3.5">
                          <p className="text-[15px] font-bold text-navy">{d.title}</p>
                          <p className="mt-1 text-[14.5px] leading-relaxed text-body">{d.text}</p>
                        </div>
                      ))}
                    </div>
                    {step.image && <StepImage image={step.image} className={cn(flip && "sm:order-1")} />}
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
