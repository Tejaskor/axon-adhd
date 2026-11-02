import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ClipboardX, Cog, Lightbulb, Pill, PillBottle, Target, type LucideIcon } from "lucide-react";
import { mythBuster } from "@/content/home";
import { ArmOnView } from "@/components/ui/ArmOnView";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const conceptIcons: Record<string, LucideIcon> = { target: Target, gear: Cog, bulb: Lightbulb };

const tones = {
  blue: { dot: "bg-brand", icon: "text-brand", ring: "ring-primary-soft", pill: "bg-primary-soft text-primary-deep" },
  teal: { dot: "bg-teal", icon: "text-teal", ring: "ring-teal-soft", pill: "bg-teal-soft text-teal" },
  orange: { dot: "bg-orange", icon: "text-orange", ring: "ring-orange-soft", pill: "bg-orange-soft text-amber-700" },
} as const;

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

/* Concept badges around the brain, in % of the 8:5 diagram (viewBox 0 0 100 62.5, rings centred on 50,36). */
const conceptPos = [
  { x: 50, y: 18 },
  { x: 21, y: 70 },
  { x: 79, y: 70 },
];

const pos = (p: { x: number; y: number }) => ({ "--x": `${p.x}%`, "--y": `${p.y}%` }) as CSSProperties;

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

const MobileArrow = () => <ArrowDown aria-hidden className="mx-auto my-3 size-5 text-brand-2 sm:hidden" />;

/** Two light columns divided by a vertical rule — the confusion-to-clarity loop vs. what ADHD actually is. */
export function ADHDMythBuster() {
  const [symptoms, treatments, frustration, exhaustion] = mythBuster.stages;
  const { clarity } = mythBuster;

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)] py-16 sm:py-20"
      aria-labelledby="myth-title"
    >
      <div aria-hidden className="pointer-events-none absolute -top-48 -left-48 size-[520px] rounded-full border border-primary-100 bg-primary-soft/60" />
      <div aria-hidden className="pointer-events-none absolute -right-56 -bottom-56 size-[560px] rounded-full border border-primary-100 bg-primary-soft/50" />
      <Container className="relative">
        <div className="grid gap-12 md:grid-cols-[54fr_46fr] md:gap-0 md:divide-x md:divide-primary-100">
          {/* Left: the cycle before a diagnosis */}
          <div className="flex flex-col border-b border-primary-100 pb-12 md:border-b-0 md:pr-8 md:pb-0 lg:pr-12">
            <Reveal>
              <h2 className="type-h2 text-center text-navy">
                {mythBuster.question.lead}
                <span className="text-brand">{mythBuster.question.highlight}</span>
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
                        className="myth-emph flex items-center justify-center gap-[9%] rounded-full bg-[radial-gradient(closest-side,#EAF4FF,rgba(234,244,255,0))] py-[8%]"
                        style={arrival(reachedBy.treatments)}
                      >
                        <Pill className="size-[24%] -rotate-45 text-danger" strokeWidth={1.75} />
                        <PillBottle className="size-[30%] text-brand" strokeWidth={1.75} />
                        <ClipboardX className="size-[28%] rotate-6 text-danger" strokeWidth={1.75} />
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
          <div className="md:pl-8 lg:pl-12">
            <Reveal>
              <h2 id="myth-title" className="type-h2 text-center text-navy">
                {mythBuster.title}
              </h2>
              <p className="type-lead mt-2 text-center text-muted">{mythBuster.subtitle}</p>
            </Reveal>

            <div className="myth-diagram relative mx-auto mt-6 aspect-[8/5] w-full max-w-[520px]">
              <svg aria-hidden viewBox="0 0 100 62.5" className="absolute inset-0 size-full overflow-visible" fill="none">
                <circle className="myth-breathe" cx="50" cy="36" r="21" fill="#F2F8FF" stroke="#DCEAF8" strokeWidth="0.35" />
                <circle cx="50" cy="36" r="15.5" fill="#EAF4FF" opacity="0.7" />
                <circle className="myth-ring" cx="50" cy="36" r="27" stroke="#86B6E5" strokeWidth="0.4" strokeDasharray="0.9 1.8" strokeLinecap="round" />
              </svg>
              <div className="absolute top-[57.6%] left-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2">
                <div className="myth-pop">
                  <div className="myth-float relative aspect-square">
                    <Image src={mythBuster.brain.src} alt={mythBuster.brain.alt} fill sizes="(max-width: 1023px) 40vw, 190px" className="object-cover" />
                  </div>
                </div>
              </div>
              <ul aria-label="What ADHD is often mistaken for">
                {mythBuster.concepts.map((concept, i) => {
                  const Icon = conceptIcons[concept.icon];
                  const tone = tones[concept.tone];
                  return (
                    <li key={concept.label} style={pos(conceptPos[i])} className="absolute top-(--y) left-(--x) -translate-x-1/2 -translate-y-1/2">
                      <Reveal delay={0.1 + 0.05 * i} className={cn("flex items-center gap-[1.6cqw]", i === 0 ? "flex-col" : "flex-col-reverse")}>
                        <span className={cn("rounded-pill px-3 py-1 font-display text-[clamp(12px,3cqw,16px)] font-bold whitespace-nowrap", tone.pill)}>{concept.label}</span>
                        <span
                          className={cn(
                            "grid size-[clamp(40px,12cqw,64px)] place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(11,37,75,.1)] ring-[6px] transition duration-300 ease-brand hover:scale-105 hover:shadow-[0_12px_28px_rgba(11,37,75,.16)]",
                            tone.ring,
                            tone.icon,
                          )}
                        >
                          <Icon aria-hidden className="size-[48%]" strokeWidth={2.2} />
                        </span>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {mythBuster.myths.map((myth, i) => (
                <li key={myth.text} className="reveal" style={{ "--reveal-delay": `${10 + 5 * i}%` } as CSSProperties}>
                  <div className="flex h-full items-center gap-3 rounded-[18px] border border-primary-100 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(11,37,75,.05)] transition duration-300 ease-brand hover:-translate-y-1 hover:border-brand-2/50 hover:shadow-[0_14px_30px_rgba(37,120,202,.12)] lg:px-5">
                    <span aria-hidden className={cn("size-3.5 shrink-0 rounded-full", tones[myth.tone].dot)} />
                    <h3 className="type-h4 text-navy">{myth.text}</h3>
                  </div>
                </li>
              ))}
            </ul>
            <Reveal delay={0.15} className="mt-4">
              <p className="type-body flex gap-3 rounded-panel border border-primary-100 bg-primary-soft px-5 py-4 text-ink sm:px-6 sm:py-5">
                <span aria-hidden className="mt-2 size-3 shrink-0 rounded-full bg-orange" />
                <span>{mythBuster.definition}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
