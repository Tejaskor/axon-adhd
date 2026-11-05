import Image from "next/image";
import { ArrowLeft, ArrowRight, Brain, Check, ClipboardList, Heart } from "lucide-react";
import type { CtaSection, FeaturesSection, SplitSection, StepsSection } from "@/content/pages/types";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { IconChip, h2, lead, wrap } from "./AccommodationSections";
import { PathCard } from "./AdhdCareSections";
import { AssessmentTimeline } from "./AssessmentTimeline";
import { GradientCtaBanner } from "./GradientCtaBanner";
import { TealBanner } from "./TealBanner";

/**
 * Free-assessment page sections from "What You'll Learn from the Free Assessment" downward.
 * Every string is read from the page's content definition (or kept from the components they replace),
 * so only presentation changes. Design tokens and helpers are shared with the Accommodation page.
 */

/** Heading with the content's `accent` substring picked out in brand blue. */
function AccentTitle({ title, accent }: { title: string; accent?: string }) {
  const [before, after] = accent && title.includes(accent) ? title.split(accent) : [title, ""];
  return (
    <>
      {before}
      {accent && <span className="text-primary">{accent}</span>}
      {after}
    </>
  );
}

/* ------------------------------------------------ What You'll Learn */

const gauges = [
  { label: "Anxiety", level: "Low", pct: 0.28, track: "#BFEFC9", arc: "#1C9B3F", chip: "bg-[#DDF6E6] text-[#1C9B3F]" },
  { label: "Depression", level: "High", pct: 0.82, track: "#F6D2D6", arc: "#B8202D", chip: "bg-[#FDE3E6] text-[#B8202D]" },
  { label: "ADHD", level: "Moderate", pct: 0.55, track: "#FBE7CC", arc: "#E07B0C", chip: "bg-[#FEEBD2] text-[#C26A06]" },
] as const;

const screeners = [
  { name: "PHQ-9 Depression Screening", note: "Patient Health Questionnaire for depression symptoms" },
  { name: "GAD-7 Anxiety Screening", note: "Generalized Anxiety Disorder questionnaire" },
  { name: "ASRS Adult ADHD Screening", note: "Adult ADHD Self-Report Scale" },
] as const;

/** One donut gauge: a full track ring plus an arc for `pct`, starting at 12 o'clock, with the level chip in the middle. */
function Gauge({ label, level, pct, track, arc, chip }: (typeof gauges)[number]) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <li className="flex flex-col items-center gap-2 rounded-lg bg-[#F5F6F8] px-2 py-3 sm:gap-3 sm:py-4">
      <span className="text-[11px] font-semibold text-[#1F2A3C] sm:text-[12px]">{label}</span>
      <span className="relative block aspect-square w-full max-w-[104px]">
        <svg aria-hidden viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke={track} strokeWidth="9" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={arc} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
        </svg>
        <span className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-1 py-0.5 text-[8px] font-semibold sm:px-2 sm:text-[10px]", chip)}>{level}</span>
      </span>
    </li>
  );
}

/** The free-assessment dashboard drawn in code: a screening card with a score card overlapping its lower right. */
function AssessmentPreview() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[640px] pb-14 sm:pb-16 lg:max-w-none">
      <div className="w-[88%] rounded-xl border border-[#E3E8F0] bg-white shadow-[0_18px_44px_-18px_rgba(11,37,75,.28)]">
        <div className="border-b border-[#EDF0F5] p-4 sm:p-5">
          <span className="grid size-8 place-items-center rounded-full bg-[#DDF6F1] text-[#12A58C]">
            <Heart className="size-4" strokeWidth={2} />
          </span>
          <p className="mt-2.5 text-[13px] font-bold text-[#0F1B2E] sm:text-[14px]">Free ADHD Assessment</p>
          <p className="mt-1 text-[10px] leading-snug text-[#6B7788] sm:text-[11px]">This short assessment consists of 20 easy questions and takes just 5–10 minutes to complete. It helps us learn more about your symptoms and experiences.</p>
        </div>
        <ul className="space-y-2 p-4 sm:p-5">
          {screeners.map((q) => (
            <li key={q.name} className="flex items-center gap-3 rounded-lg bg-[#F5F6F8] px-3 py-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#DDF6F1] text-[#12A58C]">
                <Brain className="size-3.5" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold text-[#1F2A3C]">{q.name}</span>
                <span className="block truncate text-[9px] text-[#6B7788]">{q.note}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="px-4 pt-1 pb-8 text-[10px] text-[#6B7788] sm:px-5 sm:pb-10">Ready when you are.</p>
      </div>

      <div className="absolute right-0 bottom-0 w-[80%] rounded-xl sm:w-[64%] border border-[#E3E8F0] bg-white shadow-[0_22px_50px_-16px_rgba(11,37,75,.35)]">
        <div className="flex items-start justify-between gap-3 border-b border-[#EDF0F5] p-3 sm:p-4">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#E6EEFB] text-primary">
              <ClipboardList className="size-3.5" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-bold text-[#0F1B2E] sm:text-[12px]">Detailed Performance Score</span>
              <span className="mt-0.5 hidden text-[9px] text-[#6B7788] sm:block">Based on your responses, here is your specified evaluation</span>
            </span>
          </div>
          <span className="shrink-0 text-right text-[8px] leading-tight text-[#6B7788]">
            Overall Severity
            <span className="mt-0.5 block rounded-full bg-[#FEEBD2] px-1.5 py-0.5 text-[8px] font-semibold text-[#C26A06]">Moderate</span>
          </span>
        </div>
        <ul className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-4">
          {gauges.map((g) => (
            <Gauge key={g.label} {...g} />
          ))}
        </ul>
        <div className="flex items-center justify-between gap-2 border-t border-[#EDF0F5] px-3 py-2.5 sm:px-4">
          <span className="inline-flex items-center gap-1 rounded border border-[#D5DBE6] px-2 py-1 text-[9px] font-medium text-[#1F2A3C]">
            <ArrowLeft className="size-2.5" /> Back
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-primary px-2.5 py-1 text-[9px] font-semibold text-white">
            <span className="sm:hidden">Proceed</span>
            <span className="max-sm:hidden">Please Proceed with Comprehensive ADHD Assessment</span> <ArrowRight className="size-2.5" />
          </span>
        </div>
      </div>

      <span className="absolute bottom-[26%] left-0 z-10 grid size-14 place-items-center rounded-[18px] bg-white text-primary shadow-[0_14px_30px_-10px_rgba(37,120,202,.4)] sm:size-[68px] sm:rounded-[22px]">
        <Brain className="size-7 sm:size-8" strokeWidth={1.6} />
      </span>
    </div>
  );
}

/**
 * Centred heading and subtitle over two columns, centred on each other: the explanation and three benefit points on
 * the left, the free-assessment dashboard (drawn in code, not an image) on the right. The content's `features`,
 * `details` and `image` are intentionally not used here.
 */
export function AssessmentLearn({ data }: { data: SplitSection }) {
  const [subtitle, ...body] = data.paragraphs ?? [];
  return (
    <section id={data.id} className="relative scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-14 sm:py-16 lg:py-20" aria-labelledby="learn-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[900px] text-center lg:max-w-none">
          <h2 id="learn-title" className={cn(h2, "lg:whitespace-nowrap")}>
            <AccentTitle title={data.title} accent={data.accent} />
          </h2>
          {subtitle && <p className={cn(lead, "mx-auto mt-4 max-w-[760px] text-[#5B6B80] lg:max-w-none lg:whitespace-nowrap")}>{subtitle}</p>}
        </Reveal>

        <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <Reveal>
              <div className="max-w-[580px] space-y-5">
                {body.map((p) => (
                  <p key={p} className="text-[17px] leading-[1.65] text-pretty text-[#33465E] sm:text-[19px]">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <ul className="mt-8 space-y-5">
              {data.list?.map((item, i) => (
                <li key={item}>
                  <Reveal delay={i * 0.07}>
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-[#DDF6EC] text-[#16A34A] shadow-[0_6px_16px_-8px_rgba(22,163,74,.45)]">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <h3 className="text-[18px] leading-snug font-bold text-[#0F2F55] sm:text-[20px]">{item}</h3>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <AssessmentPreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Mid-page CTA (blue banner) */

export function AssessmentBannerCta({ data }: { data: CtaSection }) {
  return <GradientCtaBanner data={data} accent="Official Diagnosis?" titleId="official-title" />;
}

/* ------------------------------------------------ Understanding ADHD with Confidence */

/** Same look as the "Key Benefits for University" section: pale blue gradient, centred heading, the image on the left and the benefits as glass cards on the right. */
export function AssessmentConfidence({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-12 sm:py-14 lg:py-16" aria-labelledby="confidence-title">
      <div className={wrap}>
        <div className="mx-auto text-center">
          <h2 id="confidence-title" className="type-section leading-[1.1] tracking-[-0.02em] text-[#0B1F4D]">
            {data.title}
          </h2>
          {data.subtitle && <p className="mx-auto mt-4 max-w-[900px] text-[16px] leading-snug text-pretty text-[#4B5C75] lg:max-w-none lg:text-[17px] lg:whitespace-nowrap">{data.subtitle}</p>}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-[58fr_42fr] lg:gap-10">
          {data.image && (
            <div className="relative mx-auto w-full max-w-[720px] lg:max-w-none">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                width={data.image.width}
                height={data.image.height}
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="h-auto w-full rounded-[32px] border-[5px] border-white shadow-[0_22px_50px_-22px_rgba(18,61,106,.5)]"
              />
            </div>
          )}
          <ul className="grid gap-4">
            {data.items.map((item) => (
              <li key={item.title} className="flex">
                <div className="group flex w-full items-center gap-4 rounded-[24px] border border-white/80 bg-white/55 px-4 py-4 shadow-[0_14px_34px_-18px_rgba(37,120,202,.35),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-[12px] sm:px-6 sm:py-5">
                  <IconChip className="size-12 rounded-2xl sm:size-14">{item.icon && <FeatureIcon name={item.icon} className="size-6 sm:size-7" />}</IconChip>
                  <span aria-hidden className="h-12 w-px shrink-0 bg-[#1677ED]/20" />
                  <div className="min-w-0">
                    <h3 className="text-[17px] leading-snug font-bold text-[#0B1F4D] sm:text-[18px]">{item.title}</h3>
                    <p className="mt-1 text-[14px] leading-snug text-[#4B5C75] sm:text-[15px]">{item.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ A Diagnosis That Opens Doors */

export function AssessmentOpensDoors({ data }: { data: FeaturesSection }) {
  const tones = ["blue", "green", "orange"] as const;
  return (
    <section className="bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)] py-16 sm:py-20 lg:py-24" aria-labelledby="doors-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 id="doors-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>
        {/* Same cards as "You deserve clarity not guesswork": icon on top, title and text at the bottom. */}
        <ul className="mx-auto mt-10 grid max-w-[560px] gap-5 sm:mt-12 md:max-w-none md:grid-cols-3 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={i * 0.07} className="flex w-full">
                <PathCard
                  tone={tones[i % tones.length]}
                  icon={item.icon && <FeatureIcon name={item.icon} className="size-7" />}
                  title={item.title}
                  text={item.text}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Step-by-step assessment (alternating rows) */

export function AssessmentProcess({ data }: { data: StepsSection }) {
  return (
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-16 sm:py-20 lg:py-24" aria-labelledby="process-title">
      {/* 1440px wide; the side padding keeps the timeline line and its dots (and their glow) well inside the container. */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 id="process-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>
        <AssessmentTimeline items={data.items} />
      </div>
    </section>
  );
}

/* ------------------------------------------------ Closing CTA (dark, centred) */

export function AssessmentClosingCta({ data }: { data: CtaSection }) {
  return <TealBanner data={data} />;
}
