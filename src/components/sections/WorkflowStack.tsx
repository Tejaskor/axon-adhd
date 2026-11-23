"use client";

import Image from "next/image";
import { Building2, ClipboardCheck, Handshake, Link2, Share2, Stethoscope, type LucideIcon } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { StepsSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { Phone, PhoneOff, User } from "lucide-react";
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
  "linear-gradient(135deg, #C5D9F2, #8FB5E2)", // blue
  "linear-gradient(135deg, #D5C6F2, #B39AE0)", // purple
  "linear-gradient(135deg, #B8E1D9, #83C8B9)", // teal
  "linear-gradient(135deg, #F5D2BA, #E9AD8D)", // peach
  "linear-gradient(135deg, #B8DDEE, #83BBD9)", // sky blue
  "linear-gradient(135deg, #C8DDBD, #9DBE8C)", // green
] as const;
/** Step-number colour per card: a deep shade of that card's own hue, for strong contrast on its gradient. */
const gradientNumbers = ["#1F4E8C", "#5233A0", "#16695C", "#A5441B", "#17658F", "#3A6529"] as const;
const gradientLook = { label: "text-[#0F2F6B]", track: "tracking-[0.14em]", title: "text-[#0B1F4D]", text: "text-[#26384F]", shadow: "rgba(16,41,77,.28)" } as const;
/** Gradient mode: the small icon beside each step number, chosen for what that step is about (partner, university details, magic link, screening, results shared, consultation). */
const stepIcons: LucideIcon[] = [Handshake, Building2, Link2, ClipboardCheck, Share2, Stethoscope];

/** Look of a step that carries a portrait: white fading to blue from left to right, deep navy type. */
const portraitLook = { bg: "linear-gradient(90deg, #FFFFFF 0%, #E6F0FE 28%, #BCD7FB 52%, #93BDFA 78%, #78A9F7 100%)", num: "#0B2F7A", title: "text-[#0B2A6B]", text: "text-[#1B3A6B]", shadow: "rgba(37,106,204,.4)" } as const;

/** Bleed, corner, arc and overlay-card classes for a panel on the right (default) or the left of its card; written out in full so Tailwind sees every class. */
const panelSide = (left: boolean) =>
  left
    ? {
        wrap: "sm:-mt-7 sm:-ml-7 sm:-mb-7 sm:mr-0 lg:-mt-9 lg:-ml-9 lg:-mb-9",
        clip: "sm:rounded-r-[0] sm:rounded-tr-[90px] sm:rounded-l-[38px] lg:rounded-l-[42px]",
        arc: "right-0 translate-x-1/2",
        calling: "left-[5%]",
        pill: "right-3 sm:-right-[7%]",
      }
    : {
        wrap: "sm:-mt-7 sm:-mr-7 sm:-mb-7 sm:ml-0 lg:-mt-9 lg:-mr-9 lg:-mb-9",
        clip: "sm:rounded-l-[0] sm:rounded-tl-[90px] sm:rounded-r-[38px] lg:rounded-r-[42px]",
        arc: "left-0 -translate-x-1/2",
        calling: "right-[5%]",
        pill: "left-3 sm:-left-[7%]",
      };

/** Right half of the portrait step: the photo (blended into a soft blurred copy of itself and cut by a curved edge), two faint arcs, the call card and the number pill. */
function PortraitPanel({ image, left = false, framed = false }: { image: NonNullable<Step["image"]>; left?: boolean; framed?: boolean }) {
  const side = framed ? { ...panelSide(left), wrap: "", arc: "hidden", clip: "", pill: "left-3" } : panelSide(left);
  // The wrapper bleeds to the card's top, right and bottom edges (cancelling its padding). The photo fills it; the arcs and the number pill are
  // drawn outside the photo's clip so they can overlap its left edge, as in the design.
  return (
    <div className={framed ? "absolute inset-0" : cn("relative -mx-1 h-[320px] sm:h-[380px] lg:h-[440px]", side.wrap)}>
      <span aria-hidden className={cn("pointer-events-none absolute top-1/2 size-[112%] -translate-y-1/2 rounded-full border border-white/70 max-sm:hidden", side.arc)} />
      <span aria-hidden className={cn("pointer-events-none absolute top-1/2 size-[92%] -translate-y-1/2 rounded-full border border-white/60 max-sm:hidden", side.arc)} />
      <div className={cn("absolute inset-0 overflow-hidden rounded-[22px]", side.clip)}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 767px) 92vw, 760px" className="size-full object-cover object-[28%_35%]" />
      </div>
      {/* Framed below md (phones and small tablets, where the frame is narrow): a compact card (no number or hang-up button) so it clears the pill below. */}
      <div className={cn("absolute top-[12%] w-[min(38%,270px)] rounded-[20px] bg-white px-4 py-5 text-center shadow-[0_20px_44px_-18px_rgba(10,40,110,.55)] max-sm:w-[46%]", framed && "max-md:top-[6%] max-md:rounded-[14px] max-md:px-2 max-md:py-2.5", side.calling)}>
        <p className={cn("text-[13px] font-semibold text-[#6B7280]", framed && "max-md:text-[11px]")}>Calling......</p>
        <span aria-hidden className={cn("mx-auto mt-2 grid size-14 place-items-center rounded-full bg-[linear-gradient(160deg,#4DB0F7,#1E6FD9)] text-white sm:size-16", framed && "max-md:mt-1.5 max-md:size-9")}>
          <User className={cn("size-7 fill-white sm:size-8", framed && "max-md:size-5")} strokeWidth={1.5} />
        </span>
        <p className={cn("mt-2.5 text-[16px] leading-tight font-bold text-[#1F2937] sm:text-[19px]", framed && "max-md:mt-1.5 max-md:text-[12.5px]")}>Dr. Aaron Dodini</p>
        <p className={cn("mt-0.5 text-[13px] text-[#8A8F98]", framed && "max-md:hidden")}>(703) 909-5101</p>
        <span aria-hidden className={cn("mx-auto mt-3.5 grid size-11 place-items-center rounded-full bg-[#E5323B] text-white sm:size-12", framed && "max-md:hidden")}>
          <PhoneOff className="size-5" strokeWidth={2} />
        </span>
      </div>
      <div className={cn("absolute bottom-[9%] flex items-center gap-3.5 rounded-[18px] bg-white px-5 py-3.5 shadow-[0_18px_38px_-16px_rgba(10,40,110,.5)]", framed && "max-md:bottom-[6%] max-md:gap-2 max-md:rounded-[12px] max-md:px-2.5 max-md:py-2", side.pill)}>
        <Phone aria-hidden className={cn("size-7 shrink-0 text-[#0F766E]", framed && "max-md:size-4")} strokeWidth={1.8} />
        <div className="leading-tight">
          <p className={cn("text-[13px] text-[#374151] sm:text-[14px]", framed && "max-md:text-[10.5px]")}>Dr. Aaron Dodini</p>
          <p className={cn("mt-0.5 text-[16px] font-medium text-[#1F2937] sm:text-[20px]", framed && "max-md:text-[12.5px]")}>(703) 909-5101</p>
        </div>
      </div>
    </div>
  );
}

/** A step whose picture is drawn in code: the drawing sits inside a frosted-glass frame inset in the card (not full bleed), as in the design. */
function MockPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[609/346] w-full lg:h-[368px] lg:w-auto lg:max-w-full", className)}>
      <span aria-hidden className="absolute inset-0 rounded-[26px] border border-white/80 bg-white/40 shadow-[0_34px_70px_-34px_rgba(120,80,220,.4),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-md sm:rounded-[36px]" />
      <div className="absolute inset-[1.2%] overflow-hidden rounded-[20px] sm:rounded-[28px]">{children}</div>
    </div>
  );
}

/**
 * The "Add New Provider Group" form, drawn in HTML/CSS instead of an image. It is laid out on the 609 × 346 canvas of the original picture: every
 * measurement below is in those pixels, converted to cqw (units of the drawing's width) so the whole thing scales as one piece.
 */
const u = (px: number) => `${(px / 609) * 100}cqw`;
type Box = { x: number; y: number; w?: number; h?: number };
const at = ({ x, y, w, h }: Box): React.CSSProperties => ({ position: "absolute", left: u(x), top: u(y), width: w ? u(w) : undefined, height: h ? u(h) : undefined });

/** A form field: grey caption bar + red asterisk above a white input holding a dark bar. */
function MockField({ x, y, w, h = 19, cap = 48, bar = 96, tall }: { x: number; y: number; w: number; h?: number; cap?: number; bar?: number; tall?: boolean }) {
  return (
    <>
      <span aria-hidden className="absolute rounded-full bg-[#CDD1D6]" style={{ ...at({ x, y: y - 11, w: cap, h: 4 }) }} />
      <span aria-hidden className="absolute font-bold text-[#E0314B]" style={{ left: u(x + cap + 4), top: u(y - 16), fontSize: u(9), lineHeight: 1 }}>
        *
      </span>
      <span aria-hidden className="absolute rounded-[0.7cqw] border border-[#D3D7DC] bg-white" style={at({ x, y, w, h })}>
        <span className="absolute rounded-full bg-[#6C7378]" style={{ left: u(8), top: tall ? u(7) : u(h / 2 - 2), width: u(bar), height: u(4) }} />
      </span>
    </>
  );
}

function FormMock() {
  // Canvas coordinates; the form window's origin is (147, 10), so its children use that offset.
  const fx = 147;
  const fy = 10;
  const f = (x: number, y: number) => ({ x: x - fx, y: y - fy });
  const pill = "absolute rounded-[0.9cqw] bg-white font-bold whitespace-nowrap text-[#2F3640] shadow-[0_1.2cqw_3.4cqw_-1cqw_rgba(30,58,107,.28)]";
  return (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-visible [container-type:inline-size]" style={{ aspectRatio: "609 / 346" }}>
      <div role="img" aria-label="Add New Provider Group form with provider and point-of-contact fields" className="absolute inset-0">
        {/* Pale-blue backing */}
        <span aria-hidden className="absolute bg-[#E6EFFD]" style={{ ...at({ x: 20, y: 35, w: 548, h: 293 }), borderRadius: u(24) }} />
        {/* Form window, running past the backing to the bottom of the picture */}
        <div className="absolute bg-white shadow-[0_1.6cqw_4.4cqw_-1.6cqw_rgba(30,58,107,.3)]" style={{ ...at({ x: fx, y: fy, w: 375, h: 360 }), borderRadius: `${u(8)} ${u(8)} 0 0` }}>
          <span aria-hidden className="absolute right-0 left-0 border-b border-[#E7E9EC]" style={{ top: u(28) }} />
          <span aria-hidden className="absolute text-[#3A4048]" style={{ left: u(353), top: u(6), fontSize: u(14), lineHeight: 1 }}>
            ×
          </span>
          {/* Avatar + upload badge */}
          <span aria-hidden className="absolute grid place-items-center rounded-full bg-[#E3E5E8]" style={at({ x: 5, y: 56, w: 68, h: 68 })}>
            <svg viewBox="0 0 24 24" style={{ width: u(30), height: u(30) }} fill="none" stroke="#B5BBC3" strokeWidth="2" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2.5" />
              <path d="M5 17 L10 11 L13 15 L15.5 12.5 L19 17Z" fill="#B5BBC3" stroke="none" />
            </svg>
          </span>
          <span aria-hidden className="absolute grid place-items-center rounded-full border border-[#43AFD9] bg-white" style={at({ x: 52, y: 101, w: 22, h: 22 })}>
            <svg viewBox="0 0 24 24" style={{ width: u(11), height: u(11) }} fill="none" stroke="#43AFD9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 18V6M6 11l6-6 6 6" />
            </svg>
          </span>
          <MockField {...f(234, 79)} w={280} />
          <MockField {...f(234, 122)} w={136} />
          <MockField {...f(378, 122)} w={136} />
          <MockField {...f(234, 164)} w={280} h={46} tall />
          <span aria-hidden className="absolute right-0 left-0 border-t border-[#E7E9EC]" style={{ top: u(212) }} />
          <MockField {...f(153, 264)} w={176} cap={44} bar={96} />
          <MockField {...f(338, 264)} w={176} cap={44} bar={96} />
          <MockField {...f(153, 307)} w={176} cap={44} bar={96} />
          <MockField {...f(338, 307)} w={176} cap={44} bar={96} />
        </div>
        <span className={pill} style={{ ...at({ x: 70, y: 17, w: 200, h: 39 }), display: "grid", placeItems: "center", fontSize: u(14.5) }}>
          Add New Provider Group
        </span>
        <span className={pill} style={{ ...at({ x: 105, y: 204, w: 92, h: 37 }), display: "grid", placeItems: "center", fontSize: u(14.5) }}>
          POC Info
        </span>
      </div>
    </div>
  );
}

/** Soft, faded version of a step's own gradient: white on the left melting into its two colours, like the first card. */
const fadedBg = (gradient: string) => {
  const [a, b] = gradient.match(/#[0-9A-Fa-f]{6}/g) ?? ["#DCEAFD", "#93BDFA"];
  return `linear-gradient(90deg, #FFFFFF 0%, ${a} 42%, ${b} 100%)`;
};

/** The drawn-picture step: pale blue melting through lavender into near-white, built from the purple and blue already used on these cards. */
const mockBg = "linear-gradient(90deg, #E6EFFD 0%, #E3DCFB 30%, #D9CAF7 58%, #F4EEFD 100%)";

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
            // Cards alternate image-right / image-left, starting with the first card's image on the right.
            const flip = i % 2 === 1;
            const n = String(i + 1).padStart(2, "0");
            const base = deepThemeFor(i);
            // The white end of the fade sits behind the text, so it flips with the image.
            const mirror = (g: string) => (flip ? g.replace("90deg", "270deg") : g);
            const dt = step.portrait ? { ...base, ...portraitLook, bg: mirror(portraitLook.bg) } : step.mock ? { ...base, bg: mockBg } : data.deepBg && data.compact ? { ...base, bg: mirror(fadedBg(base.bg)) } : base;
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
                  className={cn(step.mock && "relative overflow-hidden", "origin-top rounded-[26px] border p-6 shadow-[0_30px_30px_-30px_rgba(16,41,77,.3)] will-change-transform sm:min-h-[460px] sm:rounded-[30px] sm:p-9 lg:min-h-[500px] lg:p-12", data.deepBg && "rounded-[30px] sm:rounded-[38px] lg:rounded-[42px]", data.compact && "!p-5 sm:!min-h-[380px] sm:!p-7 lg:!min-h-[440px] lg:!p-9")}
                  style={
                    data.deepBg
                      ? ({ background: dt.bg, backgroundOrigin: "border-box", borderWidth: 0, borderColor: "transparent", boxShadow: `0 30px 50px -28px ${dt.shadow}` } as CSSProperties)
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
                    {step.portrait && (
                      // Taller frame below lg (phones and tablets), so the call card and number pill both fit over the portrait.
                      <MockPanel className="max-lg:aspect-[5/4]">
                        <PortraitPanel image={step.portrait} left={flip} framed />
                      </MockPanel>
                    )}
                    {step.mock === "form" && (
                      <MockPanel>
                        <FormMock />
                      </MockPanel>
                    )}
                    {!step.portrait && !step.mock && step.image && (step.framed || (data.deepBg && data.compact)) && (
                      <MockPanel>
                        <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} sizes="(max-width: 767px) 92vw, 700px" className="size-full object-cover object-center" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </MockPanel>
                    )}
                    
                    {!step.portrait && !step.mock && step.image && !step.framed && !(data.deepBg && data.compact) && <StepImage image={step.image} className={cn(flip && "sm:order-1", data.compact && "mx-auto flex w-full max-w-[420px] justify-center [&_img]:max-h-[320px] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain sm:h-[300px] sm:max-w-none sm:items-center sm:[&_img]:h-full sm:[&_img]:max-h-none sm:[&_img]:w-full lg:h-[360px]")} />}
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
