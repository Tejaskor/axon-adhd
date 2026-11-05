import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { mythBuster } from "@/content/home";
import { ArmOnView } from "@/components/ui/ArmOnView";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/*
 * Both column headings use the shared section-heading size; the deliberate <br> splits each into two lines.
 */
const headingClass =
  "type-section text-center leading-[1.3] tracking-[-0.5px] md:tracking-[-1px]";

const tones = { blue: "bg-brand", teal: "bg-teal", orange: "bg-orange" } as const;

/* Shared by the three myth cards and the definition card so all four read as one set. */
const glassCard =
  "relative isolate flex gap-3 rounded-[18px] border border-white/70 bg-white/45 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,.85),0_12px_32px_-14px_rgba(11,37,75,.22)] ring-1 ring-primary-100/60 backdrop-blur-xl backdrop-saturate-150 lg:px-5";
const cardDot = "size-3 shrink-0 rounded-full";
const cardText = "type-body leading-snug font-medium text-navy";

/*
 * Left journey geometry (≥768px). The diagram is a 100 × 76 grid where 1 unit = 1cqw of the diagram's width, so every
 * illustration, label and the SVG arrow overlay (viewBox 0 0 100 76) scale together. x/y are element centres, w its width.
 */
type At = { x: number; y: number; w?: number };
const spots = {
  symptomsLabel: { x: 19, y: 3.4 },
  symptomsArt: { x: 18, y: 15.5, w: 27 },
  treatmentsLabel: { x: 76, y: 3.4 },
  treatmentsArt: { x: 75, y: 12, w: 20 },
  confused: { x: 47, y: 32.5, w: 40 },
  frustrationArt: { x: 14, y: 44, w: 22 },
  frustrationLabel: { x: 14, y: 62.5 },
  exhaustionArt: { x: 49, y: 63, w: 26 },
  exhaustionLabel: { x: 49, y: 73 },
  clarityArt: { x: 86, y: 22, w: 11 },
  clarityLabel: { x: 85.5, y: 31 },
  clarityText: { x: 86, y: 38.5, w: 26 },
  relief: { x: 84, y: 57, w: 20 },
} satisfies Record<string, At>;

/*
 * The loop, as quadratic curves [start, control, end] in grid units:
 * symptoms → treatments → clarity → exhaustion → frustration → symptoms.
 */
type Pt = [number, number];
const loop: Array<[Pt, Pt, Pt]> = [
  [[36, 7.5], [48, 1], [61, 8]],
  [[68, 17.5], [69, 22.5], [79.5, 22.5]],
  [[71, 44], [70, 52], [63.5, 55.5]],
  [[35, 63], [29, 62], [27, 56.5]],
  [[14, 30.5], [12.5, 26.5], [17, 23.5]],
];
const arrows = loop.map(([[x0, y0], [cx, cy], [x1, y1]]) => ({
  d: `M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}`,
  // Arrowhead follows the curve's end tangent (control point → end point).
  head: `translate(${x1} ${y1}) rotate(${((Math.atan2(y1 - cy, x1 - cx) * 180) / Math.PI).toFixed(1)})`,
}));

/* Stage emphasis is timed in CSS from --k, the index of the arrow that arrives at that stage (see .myth-emph). */
const arrival = (k: number) => ({ "--k": k }) as CSSProperties;
// Stage reached by arrow i.
const reachedBy = { treatments: 0, clarity: 1, exhaustion: 2, frustration: 3, symptoms: 4 } as const;

/** Places a journey element on the diagram grid from 768px up; below that it stays in the stacked mobile flow. */
function Spot({ at, className, children }: { at: At; className?: string; children: ReactNode }) {
  return (
    <div
      style={{ "--x": at.x, "--y": at.y, "--w": at.w ?? 0 } as CSSProperties}
      className={cn(
        "sm:absolute sm:top-[calc(var(--y)*1cqw)] sm:left-[calc(var(--x)*1cqw)] sm:-translate-x-1/2 sm:-translate-y-1/2",
        at.w ? "sm:w-[calc(var(--w)*1cqw)] sm:max-w-none" : "sm:w-max",
        className,
      )}
    >
      {children}
    </div>
  );
}

function StageLabel({ children, soft, wrap, className }: { children: ReactNode; soft?: boolean; wrap?: boolean; className?: string }) {
  return (
    <h3
      className={cn(
        "mx-auto w-fit rounded-[14px] border border-primary-100 px-4",
        soft ? "bg-primary-soft" : "bg-white/90",
        "py-1.5 text-center font-display text-[15px] leading-tight font-bold text-navy shadow-[0_6px_18px_rgba(37,120,202,.08)] sm:rounded-[2cqw] sm:px-[2cqw] sm:py-[0.8cqw] sm:text-[clamp(11px,2.2cqw,15px)]",
        wrap ? "sm:max-w-[22cqw]" : "sm:whitespace-nowrap",
        className,
      )}
    >
      {children}
    </h3>
  );
}

/** Two medicine bottles and a rejected clipboard, drawn in soft 3D: gradient bodies, a highlight stripe and a drop shadow. */
function FailedTreatmentsArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className={className}>
      <defs>
        <linearGradient id="ft-cap" x1="0" x2="1">
          <stop offset="0" stopColor="#E6ECF3" />
          <stop offset="0.35" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C9D3DF" />
        </linearGradient>
        <linearGradient id="ft-blue" x1="0" x2="1">
          <stop offset="0" stopColor="#6CB8F2" />
          <stop offset="0.45" stopColor="#3A8BDD" />
          <stop offset="1" stopColor="#1E5FB0" />
        </linearGradient>
        <linearGradient id="ft-teal" x1="0" x2="1">
          <stop offset="0" stopColor="#8BE6E4" />
          <stop offset="0.45" stopColor="#35BCC6" />
          <stop offset="1" stopColor="#178A99" />
        </linearGradient>
        <linearGradient id="ft-label" x1="0" x2="1">
          <stop offset="0" stopColor="#FFF8E8" />
          <stop offset="1" stopColor="#EADCBE" />
        </linearGradient>
        <linearGradient id="ft-board" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F7FB" />
          <stop offset="1" stopColor="#D3DDE8" />
        </linearGradient>
        <linearGradient id="ft-clip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D79A68" />
          <stop offset="1" stopColor="#8E5A33" />
        </linearGradient>
        <linearGradient id="ft-x" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF7A7A" />
          <stop offset="1" stopColor="#E03131" />
        </linearGradient>
        <radialGradient id="ft-shadow">
          <stop offset="0" stopColor="#0B254B" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0B254B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="111" rx="88" ry="7" fill="url(#ft-shadow)" />

      {/* Clipboard, tilted back behind the bottles */}
      <g transform="rotate(9 148 66)">
        <rect x="118" y="24" width="64" height="88" rx="8" fill="#AEBBCB" />
        <rect x="116" y="22" width="64" height="88" rx="8" fill="url(#ft-board)" />
        <rect x="122" y="32" width="52" height="72" rx="3" fill="#FFFFFF" />
        <rect x="130" y="42" width="24" height="3" rx="1.5" fill="#D5DEE8" />
        <rect x="130" y="49" width="34" height="3" rx="1.5" fill="#E3E9F0" />
        <rect x="136" y="15" width="24" height="14" rx="4" fill="url(#ft-clip)" />
        <rect x="142" y="12" width="12" height="7" rx="3.5" fill="none" stroke="#8E5A33" strokeWidth="2.5" />
        <g strokeLinecap="round" strokeWidth="7">
          <path d="M137 66 L161 90 M161 66 L137 90" stroke="#B42323" transform="translate(1.5 2)" />
          <path d="M137 66 L161 90 M161 66 L137 90" stroke="url(#ft-x)" />
        </g>
      </g>

      {/* Tall blue bottle */}
      <rect x="62" y="12" width="36" height="22" rx="4" fill="url(#ft-cap)" />
      <path d="M68 15 V31 M74 15 V31 M80 15 V31 M86 15 V31 M92 15 V31" stroke="#C3CDD9" strokeWidth="1.2" />
      <rect x="58" y="32" width="44" height="76" rx="9" fill="url(#ft-blue)" />
      <rect x="58" y="54" width="44" height="32" fill="url(#ft-label)" />
      <rect x="66" y="64" width="20" height="3" rx="1.5" fill="#D9C79F" />
      <rect x="66" y="71" width="28" height="3" rx="1.5" fill="#E4D5B3" />
      <rect x="63" y="37" width="5" height="66" rx="2.5" fill="#FFFFFF" opacity="0.35" />

      {/* Short teal bottle in front */}
      <rect x="22" y="48" width="44" height="18" rx="4" fill="url(#ft-cap)" />
      <path d="M29 51 V63 M36 51 V63 M44 51 V63 M51 51 V63 M58 51 V63" stroke="#C3CDD9" strokeWidth="1.2" />
      <rect x="18" y="64" width="52" height="46" rx="9" fill="url(#ft-teal)" />
      <rect x="18" y="74" width="52" height="24" fill="url(#ft-label)" />
      <rect x="26" y="81" width="22" height="3" rx="1.5" fill="#D9C79F" />
      <rect x="26" y="88" width="30" height="3" rx="1.5" fill="#E4D5B3" />
      <rect x="23" y="68" width="5" height="38" rx="2.5" fill="#FFFFFF" opacity="0.4" />
    </svg>
  );
}

const MobileArrow = () => <ArrowDown aria-hidden className="mx-auto my-3 size-5 text-brand-2 sm:hidden" />;

/** Two light columns divided by a vertical rule — the confusion-to-clarity loop vs. what ADHD actually is. */
export function ADHDMythBuster() {
  const [symptoms, treatments, frustration, exhaustion] = mythBuster.stages;
  const { clarity } = mythBuster;

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] py-16 sm:py-20"
      aria-labelledby="myth-title"
    >
      <div className="relative mx-auto w-full max-w-[1372px] px-4">
        <div className="grid gap-12 md:grid-cols-[54fr_46fr] md:gap-0 md:divide-x md:divide-primary-100">
          {/* Left: the cycle before a diagnosis */}
          <div className="flex flex-col border-b border-primary-100 pb-12 md:border-b-0 md:pr-6 md:pb-0 lg:pr-10">
            <Reveal>
              <h2 className={cn(headingClass, "text-navy")}>
                {mythBuster.question.lead}
                <span className="text-brand">
                  {mythBuster.question.highlight}
                  <br />
                  {mythBuster.question.nextLine}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.05} className="mt-4 flex justify-center">
              <p className="type-body inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-pill border border-primary-100 bg-primary-soft px-7 py-2.5 font-medium text-navy">
                {mythBuster.feelings.map((feeling, i) => (
                  <span key={feeling} className="inline-flex items-center gap-4">
                    {i > 0 && <ArrowRight aria-hidden className="size-4 text-brand-2" strokeWidth={2.25} />}
                    {feeling}
                  </span>
                ))}
              </p>
            </Reveal>

            {/* Centred in whatever height the right column sets, so both halves read as one panel. */}
            <div className="flex flex-1 items-center">
            <ArmOnView className="myth-diagram relative mx-auto mt-8 w-full max-w-[680px] sm:mt-6 sm:aspect-[100/76]">
              <svg aria-hidden viewBox="0 0 100 76" className="absolute inset-0 hidden size-full overflow-visible sm:block" fill="none">
                {/* Each arrow fades from sky blue at its start to brand blue at its head, following the direction of travel. */}
                <defs>
                  {loop.map(([[x0, y0], , [x1, y1]], i) => (
                    <linearGradient key={i} id={`myth-arrow-${i}`} gradientUnits="userSpaceOnUse" x1={x0} y1={y0} x2={x1} y2={y1}>
                      <stop offset="0" stopColor="#B6D3F0" />
                      <stop offset="0.55" stopColor="#5498DB" />
                      <stop offset="1" stopColor="#2578CA" />
                    </linearGradient>
                  ))}
                </defs>
                <g strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round">
                  {arrows.map(({ d, head }, i) => (
                    <g key={d} style={{ "--i": i } as CSSProperties}>
                      <path className="myth-arrow-line" d={d} pathLength={1} strokeDasharray="1 2" stroke={`url(#myth-arrow-${i})`} />
                      <path className="myth-arrow-head" d="M-2.3 -1.8 L0 0 L-2.3 1.8" transform={head} stroke="#2578CA" />
                    </g>
                  ))}
                </g>
              </svg>

              {/* Centre: the confused woman on a soft radial halo */}
              <span
                aria-hidden
                className="absolute top-[35cqw] left-[47%] hidden size-[44cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,244,255,.95)_0%,rgba(234,244,255,.6)_58%,rgba(234,244,255,0)_72%)] sm:block"
              />
              <Spot at={spots.confused} className="mx-auto w-[min(320px,82%)]">
                <div className="myth-pop">
                  <Image
                    src={mythBuster.confused.src}
                    alt={mythBuster.confused.alt}
                    width={mythBuster.confused.width}
                    height={mythBuster.confused.height}
                    sizes="(max-width: 767px) 320px, 280px"
                    className="myth-float h-auto w-full"
                  />
                </div>
              </Spot>

              <ol aria-label="A common cycle before an ADHD diagnosis">
                <li>
                  <MobileArrow />
                  <Spot at={spots.symptomsLabel}>
                    <Reveal delay={0.05}>
                      <StageLabel>{symptoms.title}</StageLabel>
                    </Reveal>
                  </Spot>
                  {"image" in symptoms && (
                    // The asset has an opaque white background: multiply it into the section tint and feather its edges.
                    <Spot at={spots.symptomsArt} className="mx-auto mt-2 w-[min(280px,80%)] mix-blend-multiply sm:mt-0">
                      <Reveal delay={0.05}>
                        <div className="myth-emph" style={arrival(reachedBy.symptoms)}>
                          <Image
                            src={symptoms.image.src}
                            alt={symptoms.image.alt}
                            width={symptoms.image.width}
                            height={symptoms.image.height}
                            sizes="(max-width: 767px) 280px, 190px"
                            className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_86%,transparent)]"
                          />
                        </div>
                      </Reveal>
                    </Spot>
                  )}
                </li>
                <li>
                  <MobileArrow />
                  <Spot at={spots.treatmentsLabel}>
                    <Reveal delay={0.1}>
                      <StageLabel>{treatments.title}</StageLabel>
                    </Reveal>
                  </Spot>
                  <Spot at={spots.treatmentsArt} className="mx-auto mt-3 w-[200px] sm:mt-0">
                    <Reveal delay={0.1}>
                      <span
                        aria-hidden
                        className="myth-emph block rounded-full bg-[radial-gradient(closest-side,#EAF4FF,rgba(234,244,255,0))] px-[6%] py-[4%]"
                        style={arrival(reachedBy.treatments)}
                      >
                        <FailedTreatmentsArt className="h-auto w-full" />
                      </span>
                    </Reveal>
                  </Spot>
                </li>
                <li>
                  <MobileArrow />
                  {"image" in frustration && (
                    <Spot at={spots.frustrationArt} className="mx-auto w-[min(220px,62%)]">
                      <Reveal delay={0.15}>
                        <div className="myth-emph" style={arrival(reachedBy.frustration)}>
                          <Image
                            src={frustration.image.src}
                            alt={frustration.image.alt}
                            width={frustration.image.width}
                            height={frustration.image.height}
                            sizes="(max-width: 767px) 220px, 160px"
                            className="h-auto w-full"
                          />
                        </div>
                      </Reveal>
                    </Spot>
                  )}
                  <Spot at={spots.frustrationLabel} className="mt-2 sm:mt-0">
                    <Reveal delay={0.15}>
                      <StageLabel wrap>{frustration.title}</StageLabel>
                    </Reveal>
                  </Spot>
                </li>
                <li>
                  <MobileArrow />
                  {"image" in exhaustion && (
                    <Spot at={spots.exhaustionArt} className="mx-auto w-[min(300px,84%)]">
                      <Reveal delay={0.2}>
                        <div className="myth-emph myth-emph-lift" style={arrival(reachedBy.exhaustion)}>
                          <Image
                            src={exhaustion.image.src}
                            alt={exhaustion.image.alt}
                            width={exhaustion.image.width}
                            height={exhaustion.image.height}
                            sizes="(max-width: 767px) 300px, 190px"
                            className="h-auto w-full"
                          />
                        </div>
                      </Reveal>
                    </Spot>
                  )}
                  <Spot at={spots.exhaustionLabel} className="mt-2 sm:mt-0">
                    <Reveal delay={0.2}>
                      <StageLabel soft>{exhaustion.title}</StageLabel>
                    </Reveal>
                  </Spot>
                </li>
              </ol>

              {/* Way out of the loop: diagnostic clarity, then relief */}
              <div className="text-center">
                <MobileArrow />
                <Spot at={spots.clarityArt} className="mx-auto w-24">
                  <div className="myth-pop relative">
                    <span
                      aria-hidden
                      className="myth-halo absolute inset-[-18%] rounded-full bg-[radial-gradient(closest-side,rgba(25,179,148,.28),rgba(25,179,148,0))]"
                      style={arrival(reachedBy.clarity)}
                    />
                    <Image
                      src={clarity.image.src}
                      alt=""
                      width={clarity.image.width}
                      height={clarity.image.height}
                      sizes="96px"
                      className="relative h-auto w-full"
                    />
                  </div>
                </Spot>
                <Spot at={spots.clarityLabel} className="mt-2 sm:mt-0">
                  <Reveal delay={0.25}>
                    <p className="mx-auto w-fit rounded-pill border border-teal/25 bg-teal-soft px-5 py-1.5 font-display text-[16px] font-bold whitespace-nowrap text-navy shadow-[0_6px_18px_rgba(13,124,102,.1)] sm:px-[2cqw] sm:py-[0.8cqw] sm:text-[clamp(12.5px,2.4cqw,15.5px)]">
                      {clarity.label}
                    </p>
                  </Reveal>
                </Spot>
                <Spot at={spots.clarityText} className="mx-auto mt-2 max-w-[260px] sm:mt-0">
                  <Reveal delay={0.25}>
                    <p className="text-[14px] leading-snug text-muted sm:text-[clamp(12px,2.05cqw,14px)]">{clarity.text}</p>
                  </Reveal>
                </Spot>
                <Spot at={spots.relief} className="mx-auto mt-4 w-[min(200px,58%)] sm:mt-0">
                  <Reveal delay={0.3}>
                    <Image
                      src={clarity.relief.src}
                      alt={clarity.relief.alt}
                      width={clarity.relief.width}
                      height={clarity.relief.height}
                      sizes="(max-width: 767px) 200px, 140px"
                      className="myth-float myth-float-late h-auto w-full"
                    />
                  </Reveal>
                </Spot>
              </div>
            </ArmOnView>
            </div>
          </div>

          {/* Right: what ADHD actually is */}
          <div className="md:pl-6 lg:pl-10">
            <Reveal>
              <h2 id="myth-title" className={cn(headingClass, "text-brand")}>
                {mythBuster.title.lead}
                <br />
                {mythBuster.title.nextLine}
              </h2>
              <p className="type-lead mt-2 text-center text-muted">{mythBuster.subtitle}</p>
            </Reveal>

            <div className="mx-auto w-full max-w-[500px]">
              <div className="myth-pop mx-auto mt-6 max-w-[420px]">
                <Image
                  src={mythBuster.infographic.src}
                  alt={mythBuster.infographic.alt}
                  width={mythBuster.infographic.width}
                  height={mythBuster.infographic.height}
                  sizes="(max-width: 767px) 80vw, 420px"
                  className="myth-float h-auto w-full"
                />
              </div>

              {/* Soft colour wash behind the glass cards so the backdrop blur has something to frost. */}
              <div className="relative mt-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 bg-[radial-gradient(40%_60%_at_20%_30%,rgba(84,152,219,.22),transparent),radial-gradient(40%_60%_at_80%_70%,rgba(255,159,67,.16),transparent),radial-gradient(35%_50%_at_55%_20%,rgba(25,179,148,.14),transparent)] blur-2xl"
                />
                <ul className="grid gap-3 sm:grid-cols-3">
                  {mythBuster.myths.map((myth, i) => (
                    <li key={myth.text} className="reveal" style={{ "--reveal-delay": `${10 + 5 * i}%` } as CSSProperties}>
                      <div className={cn(glassCard, "h-full items-center transition duration-300 ease-brand hover:-translate-y-1 hover:bg-white/65 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_18px_40px_-16px_rgba(37,120,202,.35)]")}>
                        <span aria-hidden className={cn(cardDot, tones[myth.tone])} />
                        <h3 className={cardText}>
                          {mythBuster.mythLead}
                          <br />
                          {mythBuster.mythPrefix} <br className="max-sm:hidden" />
                          {myth.text}
                        </h3>
                      </div>
                    </li>
                  ))}
                </ul>
                <Reveal delay={0.15} className="mt-3">
                  <p className={cn(glassCard, "items-start")}>
                    <span aria-hidden className={cn(cardDot, "mt-[0.3em]", tones.orange)} />
                    <span className={cardText}>{mythBuster.definition}</span>
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
