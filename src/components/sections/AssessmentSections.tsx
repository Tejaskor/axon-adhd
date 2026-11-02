import Image from "next/image";
import { Brain, CalendarCheck, ChartColumn, Check, ClipboardList } from "lucide-react";
import type { CtaSection, FeaturesSection, SplitSection, StepsSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Arrow, IconChip, h2, lead, lightBtn, wrap } from "./AccommodationSections";

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

const learnDots = "bg-[radial-gradient(rgba(37,120,202,.28)_1.6px,transparent_1.8px)] [background-size:18px_18px]";

/**
 * Centred heading and subtitle over two columns: the explanation and three benefit points on the left, the
 * free-assessment preview artwork (which already carries both overlapping dashboard cards) on the right with
 * CSS/SVG decoration around it. The content's `features` and `details` are intentionally not shown here.
 */
export function AssessmentLearn({ data }: { data: SplitSection }) {
  const [subtitle, ...body] = data.paragraphs ?? [];
  return (
    <section id={data.id} className="relative scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(180deg,#F7FAFE_0%,#EAF3FC_100%)] py-14 sm:py-16 lg:py-20" aria-labelledby="learn-title">
      {/* Soft circles, light-blue curves and dotted patches */}
      <div aria-hidden className="absolute top-1/3 -left-48 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.5),rgba(182,211,240,.12)_55%,transparent_72%)]" />
      <div aria-hidden className="absolute -right-40 -bottom-40 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(134,182,229,.35),transparent_70%)]" />
      <svg aria-hidden viewBox="0 0 1440 700" preserveAspectRatio="none" fill="none" className="absolute inset-0 hidden size-full md:block">
        <path d="M-20 520C260 430 520 600 820 520S1240 380 1460 460" stroke="rgba(37,120,202,.12)" strokeWidth="1.5" />
        <path d="M-20 600C300 530 560 660 860 590S1260 490 1460 550" stroke="rgba(255,255,255,.8)" strokeWidth="2" />
      </svg>
      <div aria-hidden className={cn("absolute bottom-10 left-6 hidden h-28 w-44 sm:block", learnDots)} />

      <div className={cn(wrap, "relative")}>
        <Reveal className="mx-auto max-w-[900px] text-center lg:max-w-none">
          <h2 id="learn-title" className={cn(h2, "text-[clamp(28px,3.4vw,40px)]! lg:whitespace-nowrap")}>
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

          {data.image && (
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-[680px] px-2 pt-6 pb-8 sm:px-4 lg:max-w-none">
                {/* Ring and glow behind the artwork, dotted grid, sparkle marks, dashed arc and dots */}
                <div aria-hidden className="absolute top-[2%] left-[6%] aspect-square w-[84%] rounded-full border border-primary/15 bg-[radial-gradient(circle,rgba(220,235,251,.9),rgba(238,245,253,.3)_65%,transparent_75%)]" />
                <div aria-hidden className={cn("absolute top-0 right-0 hidden h-32 w-44 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_75%)] sm:block", learnDots)} />
                <svg aria-hidden viewBox="0 0 40 40" fill="none" className="absolute top-[3%] right-[10%] z-20 hidden size-10 sm:block">
                  <path d="M10 4L7 14M22 8L30 3M26 20H38" stroke="#2578CA" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <svg aria-hidden viewBox="0 0 180 70" fill="none" className="absolute bottom-0 left-[9%] z-20 hidden w-[24%] sm:block">
                  <path d="M170 8C150 52 70 64 16 30" stroke="#2578CA" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
                  <path d="M16 30L30 30M16 30L19 44" stroke="#2578CA" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span aria-hidden className="absolute right-[34%] bottom-[2%] z-20 hidden size-4 rounded-full bg-[#4FA3F0] sm:block" />
                <span aria-hidden className="absolute right-[31%] -bottom-1 z-20 hidden size-2.5 rounded-full bg-[#B6D3F0] sm:block" />

                {/* The artwork is transparent and carries its own shadows, so it is left unframed. */}
                <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1023px) 92vw, 720px" className="relative z-10 h-auto w-full object-contain" />
                <span aria-hidden className="absolute bottom-[12%] left-0 z-20 grid size-14 place-items-center rounded-[18px] bg-white text-primary shadow-[0_14px_30px_-10px_rgba(37,120,202,.4)] sm:size-[72px] sm:rounded-[22px]">
                  <Brain className="size-7 sm:size-9" strokeWidth={1.6} />
                </span>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ How It Works */

/** Step styling, in item order: blue · mint · purple. Class strings are written out so Tailwind can see them. */
const journey = [
  {
    Icon: ClipboardList,
    ring: "border-[#2F86FF] bg-[#DCEBFF] shadow-[0_0_0_8px_rgba(10,108,255,.07),0_22px_44px_-12px_rgba(10,108,255,.45)]",
    disc: "text-[#0A6CFF] shadow-[inset_0_2px_10px_rgba(10,108,255,.12)]",
    badge: "bg-[#0A6CFF] shadow-[0_10px_22px_-6px_rgba(10,108,255,.6)] left-1/2 -top-[7%] -translate-x-1/2",
    offset: "",
  },
  {
    Icon: ChartColumn,
    ring: "border-[#B9F1E0] bg-[#D4F7EC] shadow-[0_0_0_8px_rgba(20,200,160,.08),0_22px_44px_-12px_rgba(20,200,160,.5)]",
    disc: "text-[#14C8A0] shadow-[inset_0_2px_10px_rgba(20,200,160,.14)]",
    badge: "bg-[#14C8A0] shadow-[0_10px_22px_-6px_rgba(20,200,160,.6)] left-1/2 -top-[7%] -translate-x-1/2",
    offset: "",
  },
  {
    Icon: CalendarCheck,
    ring: "border-[#E3D6FB] bg-[#EFE6FF] shadow-[0_0_0_8px_rgba(124,58,237,.07),0_22px_44px_-12px_rgba(124,58,237,.45)]",
    disc: "text-[#7A2FE8] shadow-[inset_0_2px_10px_rgba(124,58,237,.12)]",
    badge: "bg-[#7A2FE8] shadow-[0_10px_22px_-6px_rgba(124,58,237,.6)] left-1/2 -top-[7%] -translate-x-1/2",
    offset: "",
  },
] as const;

export function AssessmentHowItWorks({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent && data.title.includes(data.accent) ? data.title.split(data.accent) : [data.title, ""];
  return (
    <section id={data.id} className="relative scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(180deg,#F5FAFF_0%,#E4F0FE_100%)] py-14 sm:py-16 lg:py-20" aria-labelledby="how-title">
      {/* Flowing waves and a dotted patch */}
      <svg aria-hidden viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none" className="absolute inset-0 size-full">
        <path d="M-40 90C260 40 520 210 860 250S1260 170 1500 60V0H-40Z" fill="rgba(255,255,255,.55)" />
        <path d="M-40 640C240 560 520 720 860 660S1280 520 1500 600V820H-40Z" fill="rgba(255,255,255,.5)" />
        <path d="M-40 460C300 380 560 560 900 500S1300 380 1500 440" stroke="rgba(37,120,202,.1)" strokeWidth="1.5" />
        <path d="M900 0C1100 120 1300 150 1500 120V0Z" fill="rgba(160,205,250,.22)" />
      </svg>
      <div aria-hidden className={cn("absolute top-6 left-0 hidden h-44 w-52 sm:block", learnDots)} />

      <div className={cn(wrap, "relative")}>
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 id="how-title" className="font-display text-[44px] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#0B1F4D] sm:text-[56px] lg:text-[68px]">
            {before}
            {data.accent && <span className="text-[#0A6CFF]">{data.accent}</span>}
            {after}
          </h2>
          {data.subtitle && <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.6] text-pretty text-[#3F4E6B] sm:text-[18px]">{data.subtitle}</p>}
        </Reveal>

        <ol className="relative mt-9 flex flex-col items-center gap-0 lg:mt-3 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:pt-5">
          {/* Dashed journey path behind the circles (desktop only) */}
          <svg aria-hidden viewBox="0 0 1000 220" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute top-5 left-0 hidden h-[220px] w-full lg:block">
            <path d="M200 95C290 95 330 170 430 168S480 130 500 118" stroke="#0A6CFF" strokeWidth="2.5" strokeDasharray="7 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M500 100C560 40 650 30 720 80S800 130 833 115" stroke="#0A6CFF" strokeWidth="2.5" strokeDasharray="7 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>

          {data.items.map((item, i) => {
            const { Icon, ring, disc, badge, offset } = journey[i];
            const last = i === data.items.length - 1;
            return (
              <li key={item.title} className="relative z-10 flex w-full max-w-[420px] flex-col items-center text-center lg:max-w-none">
                <Reveal delay={i * 0.1} className="flex w-full flex-col items-center">
                  <div className={cn("relative size-[190px] sm:size-[210px] lg:size-[220px]", offset)}>
                    <span aria-hidden className={cn("absolute inset-0 rounded-full border-[3px]", ring)} />
                    <span aria-hidden className={cn("absolute inset-[9%] grid place-items-center rounded-full bg-white", disc)}>
                      <Icon className="size-[34%]" strokeWidth={2.2} />
                    </span>
                    <span aria-hidden className={cn("absolute grid size-[38px] place-items-center rounded-full font-display text-[18px] leading-none font-bold text-white sm:size-[42px] sm:text-[20px]", badge)}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 max-w-[340px] font-display text-[22px] leading-[1.25] font-bold text-[#0B1F4D] sm:text-[26px]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[340px] text-[17px] leading-[1.65] text-pretty text-[#41516B] sm:text-[19px]">{item.text}</p>
                </Reveal>
                {!last && <span aria-hidden className="my-8 block h-14 border-l-2 border-dashed border-[#0A6CFF] lg:hidden" />}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Mid-page CTA (blue banner) */

export function AssessmentBannerCta({ data }: { data: CtaSection }) {
  const accent = "Official Diagnosis?";
  const [before, after] = data.title.includes(accent) ? data.title.split(accent) : [data.title, ""];
  const pill = "group rounded-full! px-7! whitespace-normal transition duration-300 hover:-translate-y-0.5";
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#256ACC_0%,#133566_100%)] py-14 text-white sm:py-16 lg:py-20" aria-labelledby="official-title">
      {/* Layered waves, fine curved lines, soft glows, dots: low opacity and edge-to-edge so the surface reads evenly */}
      <svg aria-hidden viewBox="0 0 1440 480" preserveAspectRatio="none" fill="none" className="absolute inset-0 -z-10 size-full">
        <defs>
          <linearGradient id="cta-wave-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7DB4FF" stopOpacity=".16" />
            <stop offset="1" stopColor="#7DB4FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cta-wave-fade-up" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#8EC1FF" stopOpacity=".2" />
            <stop offset="1" stopColor="#8EC1FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 0H1440V60C1260 90 1100 40 900 50C700 60 520 110 340 80C200 56 100 70 0 90Z" fill="url(#cta-wave-fade)" />
        <path d="M0 480V360C160 330 300 380 480 400C680 422 800 380 980 390C1160 400 1300 350 1440 330V480Z" fill="url(#cta-wave-fade-up)" />
        <path d="M0 480V420C200 400 380 440 600 440C840 440 1040 400 1200 380C1300 368 1380 372 1440 380V480Z" fill="url(#cta-wave-fade-up)" />
        <path d="M1000 400C1000 220 1130 70 1320 70C1380 70 1420 85 1450 100" stroke="rgba(255,255,255,.2)" strokeWidth="1.2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
        <path d="M1060 480C1070 300 1180 150 1340 140C1390 138 1420 148 1450 160" stroke="rgba(255,255,255,.1)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div aria-hidden className="absolute top-8 -right-24 -z-10 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(120,180,255,.18),transparent_70%)]" />
      <div aria-hidden className="absolute top-10 right-[17%] -z-10 hidden size-12 rounded-full bg-[radial-gradient(circle_at_30%_30%,#5CB0FF,#1E70F0)] opacity-60 lg:block" />
      <div aria-hidden className="absolute top-1/2 left-0 -z-10 hidden h-36 w-48 -translate-y-1/2 bg-[radial-gradient(rgba(150,205,255,.4)_1.5px,transparent_1.8px)] [background-size:24px_24px] sm:block" />
      <div aria-hidden className="absolute right-8 bottom-10 -z-10 hidden h-32 w-52 bg-[radial-gradient(rgba(190,225,255,.35)_1.5px,transparent_1.8px)] [background-size:24px_24px] lg:block" />

      <div className={wrap}>
        <Reveal className="max-w-[1100px]">
          <h2 id="official-title" className="font-display text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em] text-balance sm:text-[32px] lg:text-[40px] lg:whitespace-nowrap">
            {before}
            {before !== data.title && <span className="text-[#8FE3FF]">{accent}</span>}
            {after}
          </h2>
          {data.subtitle && <p className="mt-5 max-w-[1040px] text-[16px] leading-[1.7] text-pretty text-white/90 sm:text-[18px]">{data.subtitle}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href={data.primary.href} size="lg" className={cn(pill, lightBtn)}>
              {data.primary.label}
              <Arrow />
            </ButtonLink>
            {data.secondary && (
              <ButtonLink href={data.secondary.href} size="lg" className={cn(pill, "border border-white/25 bg-primary! text-white! shadow-[0_10px_26px_-8px_rgba(0,20,80,.6)]! hover:bg-primary-hover!")}>
                {data.secondary.label}
                <Arrow />
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Understanding ADHD with Confidence */

export function AssessmentConfidence({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="confidence-title">
      <div className={wrap}>
        <Reveal className="grid items-end gap-4 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <h2 id="confidence-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={lead}>{data.subtitle}</p>}
        </Reveal>
        {data.image && (
          <Reveal delay={0.05}>
            <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1320px) 100vw, 1256px" className="mt-10 h-auto w-full rounded-[28px] shadow-[0_24px_56px_rgba(18,61,106,.16)]" />
          </Reveal>
        )}
        <ul className="mt-12 grid gap-9 md:grid-cols-3 md:gap-0">
          {data.items.map((item, i) => (
            <li key={item.title} className="md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[#E3EAF2]">
              <Reveal delay={i * 0.07}>
                <div className="group flex items-start gap-5">
                  <IconChip className="size-14 rounded-2xl">{item.icon && <FeatureIcon name={item.icon} className="size-7" />}</IconChip>
                  <div>
                    <h3 className="type-h4 text-[#123D6A]">{item.title}</h3>
                    <p className="type-body mt-2 text-[#536985]">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------ A Diagnosis That Opens Doors */

export function AssessmentOpensDoors({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-[#E8F2FC] py-16 sm:py-20 lg:py-24" aria-labelledby="doors-title">
      <div className={cn(wrap, "grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16")}>
        <Reveal className="lg:sticky lg:top-[var(--header-offset)]">
          <h2 id="doors-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>
        <ul className="space-y-4">
          {data.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.07}>
                <div className="group flex items-center gap-5 rounded-[22px] bg-white p-6 shadow-[0_8px_24px_rgba(18,61,106,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(37,120,202,.16)] sm:p-7">
                  <IconChip className="size-16 rounded-2xl">{item.icon && <FeatureIcon name={item.icon} className="size-8" />}</IconChip>
                  <div>
                    <h3 className="type-h4 text-[#123D6A]">{item.title}</h3>
                    <p className="type-body mt-1.5 text-[#536985]">{item.text}</p>
                  </div>
                </div>
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
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="process-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 id="process-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>
        <ol className="mt-14 space-y-12 lg:space-y-16">
          {data.items.map((step, i) => (
            <li key={step.title}>
              <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
                <Reveal className={cn(i % 2 === 1 && "md:order-2")}>
                  {step.image && <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} sizes="(max-width: 1023px) 100vw, 620px" className="aspect-[16/10] w-full rounded-[26px] object-cover shadow-[0_22px_50px_rgba(18,61,106,.16)]" />}
                </Reveal>
                <Reveal delay={0.08}>
                  <span aria-hidden className="grid size-14 place-items-center rounded-full bg-primary font-display text-[22px] font-bold text-white shadow-[0_8px_20px_rgba(37,120,202,.30)]">
                    {i + 1}
                  </span>
                  <h3 className="type-h3 mt-5 text-[#123D6A]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className={cn(lead, "mt-4 max-w-[520px]")}>{step.text}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Closing CTA (dark, centred) */

export function AssessmentClosingCta({ data }: { data: CtaSection }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#123D6A_0%,#1E64AA_60%,#2578CA_100%)] py-20 text-center text-white sm:py-24 lg:py-28" aria-labelledby="closing-title">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(134,182,229,.25),transparent_55%)]" />
      <Reveal className={cn(wrap, "max-w-[900px]")}>
        <h2 id="closing-title" className="type-h2 text-balance">
          {data.title}
        </h2>
        {data.subtitle && <p className="type-lead mx-auto mt-6 max-w-[720px] text-white/90">{data.subtitle}</p>}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href={data.primary.href} size="lg" className={cn("group whitespace-normal", lightBtn)}>
            {data.primary.label}
            <Arrow />
          </ButtonLink>
          {data.secondary && (
            <ButtonLink href={data.secondary.href} variant="outline" size="lg" className="border-white/70! bg-transparent! whitespace-normal text-white! hover:bg-white! hover:text-primary-600!">
              {data.secondary.label}
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </section>
  );
}
