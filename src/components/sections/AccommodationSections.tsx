import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, FileCheck2, FileText, GraduationCap, ShieldCheck, Stethoscope, TrendingUp, Users, Award, FlaskConical, ClipboardList, Mail, Info, Timer, CalendarDays, HandHeart } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { blogPosts } from "@/content/blogs";
import { formatDate } from "@/lib/utils";
import { links, site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { TrustBar } from "./TrustBar";

/**
 * Accommodation & Advocacy page sections. Blue (#2578CA and shades) leads; green and orange appear only as small accents.
 * Copy is limited to what the existing service page already states (price, inclusions, audiences, eligibility).
 */

export const wrap = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
const wrapWide = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
export const h2 = "font-display text-[32px] leading-[1.1] font-extrabold tracking-[-0.025em] text-balance text-[#123D6A] sm:text-[40px] lg:text-[48px]";
export const lead = "text-[17px] leading-[1.75] text-pretty text-[#44566E] sm:text-[19px]";
export const primaryBtn = "bg-primary! text-white! shadow-[0_8px_20px_rgba(37,120,202,.28)]! hover:bg-primary-600!";
export const lightBtn = "bg-white! text-primary-600! shadow-[0_8px_24px_rgba(8,32,64,.22)]! hover:bg-[#E8F2FC]!";

const checkout = links.accommodationCheckout;
const ctaLabel = "Explore Accommodation Support";

export function Arrow() {
  return <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />;
}

export function IconChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden className={cn("grid size-11 shrink-0 place-items-center rounded-xl bg-[#E8F2FC] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white", className)}>
      {children}
    </span>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.12em] uppercase", light ? "bg-white/15 text-white" : "bg-[#E8F2FC] text-primary-600")}>
      <span aria-hidden className={cn("size-1.5 rounded-full", light ? "bg-white" : "bg-primary")} />
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------- Hero */

const journey = [
  { state: "done", kicker: "Step 1 · Completed", title: "Free ADHD Screening", text: "Your starting point for a quick check of ADHD indicators." },
  { state: "done", kicker: "Step 2 · Completed", title: "Comprehensive ADHD Evaluation", text: "Objective testing, clinical interview, and diagnosis already done." },
  { state: "current", kicker: "Step 3 · Optional Add-On", title: "Accommodation Documentation & Advocacy", text: "Turn your existing findings into documentation for accommodation requests." },
] as const;

const reportFeatures = [
  { label: "Detailed Clinical Summary", icon: FileText },
  { label: "Functional Impact Analysis", icon: TrendingUp },
  { label: "Accommodation Recommendations", icon: Users },
  { label: "Supporting Documentation", icon: FileCheck2 },
  { label: "Professional Review", icon: ShieldCheck },
];

/** Hero visual: glass panel with a 2-row grid. Row 1 = three-step timeline | report card; row 2 = optional add-on note. Decorative layers stay behind and inside the card column. */
function ReportPreview() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[700px] lg:max-w-none">
      <div aria-hidden className="pointer-events-none absolute -top-10 -right-6 -z-10 size-[300px] rounded-full bg-primary-400/45 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-8 -z-10 size-[260px] rounded-full bg-primary/30 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-1/4 -z-10 size-[200px] rounded-full bg-[#22C083]/15 blur-3xl" />

      <div className="grid gap-3.5 rounded-[28px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,.55),rgba(201,222,244,.32))] p-4 shadow-[0_24px_60px_rgba(37,120,202,.22),inset_0_1px_0_rgba(255,255,255,.95),inset_0_0_0_1px_rgba(255,255,255,.35)] backdrop-blur-2xl backdrop-saturate-150 pt-5 pr-5 sm:p-5 sm:pt-7 sm:pr-7 lg:p-7 lg:pt-9 lg:pr-9 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] lg:gap-x-5 lg:gap-y-3">
        {/* Row 1 · left: timeline blocks stretch to the card's height (always above the decorative layers) */}
        <ol aria-label="Your ADHD care journey" className="relative z-20 flex flex-col gap-3 lg:col-start-1 lg:row-start-1">
          {journey.map((step, i) => {
            const done = step.state === "done";
            const last = i === journey.length - 1;
            return (
              <li
                key={step.kicker}
                className={cn(
                  "relative flex flex-1 items-start gap-3.5 pl-1",
                  !last && "z-10",
                )}
              >
                {!last && <span aria-hidden className={cn("absolute top-11 -bottom-3 left-[26px] w-0.5 -translate-x-1/2", i === journey.length - 2 ? "bg-gradient-to-b from-[#22C083] to-primary" : "bg-[#22C083]")} />}
                <span aria-hidden className={cn("relative z-10 grid size-11 shrink-0 place-items-center rounded-full text-white shadow-[0_6px_14px_rgba(18,61,106,.18)]", done ? "bg-[#22C083]" : "bg-primary")}>
                  {done ? <Check className="size-5" strokeWidth={3} /> : <span className="type-lead font-bold">{i + 1}</span>}
                </span>
                <div className="min-w-0">
                  <p className={cn("type-small font-semibold", done ? "text-[#1A9F6A]" : "text-primary")}>{step.kicker}</p>
                  <p className="type-body mt-1 font-bold text-balance text-[#123D6A]">{step.title}</p>
                  <p className="type-small mt-1 text-pretty text-[#5B6B80]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Row 1 · right: report card */}
        <div className="relative lg:col-start-2 lg:row-start-1">
          <div className="relative z-10 rounded-[26px] border border-primary-100 bg-white p-4 shadow-[0_22px_48px_rgba(18,61,106,.16)]">
            <div className="flex items-start justify-between gap-3">
              <Image src={site.headerLogo.src} alt="AXON ADHD" width={site.headerLogo.width} height={site.headerLogo.height} className="h-7 w-auto" />
              <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-[#E8F2FC] text-primary">
                <FileText className="size-[18px]" />
              </span>
            </div>
            <h3 className="type-h4 mt-2 text-[#123D6A]">Academic Performance &amp; Accommodations Report</h3>
            <ul className="mt-1.5 divide-y divide-[#EDF1F6]">
              {reportFeatures.map((f) => (
                <li key={f.label} className="flex items-center gap-3 py-[5px]">
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#E8F2FC] text-primary">
                    <f.icon className="size-[18px]" />
                  </span>
                  <span className="type-body font-medium text-[#1F3048]">{f.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 rounded-2xl bg-[#EAF3FD] p-3">
              <p className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="font-display text-[34px] leading-none font-extrabold text-[#123D6A]">$250</span>
                <span className="type-small text-[#5B6B80]">Price includes taxes.</span>
              </p>
              <ButtonLink href={checkout} size="md" className={cn("group mt-2.5 w-full px-4", primaryBtn)}>
                Add Package &amp; Continue
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Row 2: optional add-on note, full width, compact footer in normal flow */}
        <div className="flex items-center gap-4 rounded-[22px] bg-[linear-gradient(100deg,#FFF6DF_0%,#FFF9EA_100%)] px-4 py-3 sm:px-5 lg:col-span-2 lg:row-start-2">
          <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-[#EB8B01]/15 text-[#EB8B01]">
            <Info className="size-5" />
          </span>
          <span aria-hidden className="h-10 w-px shrink-0 bg-[#EB8B01]/25" />
          <div className="min-w-0">
            <p className="type-body font-bold text-[#123D6A]">Why is this an optional add-on?</p>
            <p className="type-small mt-1 text-pretty text-[#4A5B72]">Preparing accommodations documentation requires additional clinical analysis, report creation, and form completion. It’s an optional service for those who plan to request accommodations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccommodationHero() {
  return (
    <section aria-labelledby="page-title" className="relative -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(135deg,#F3F8FE_0%,#E8F2FC_55%,#F7FAFF_100%)] pt-[calc(var(--header-height)+32px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-height)+44px)] lg:pb-24">
      <div aria-hidden className="absolute top-0 right-0 hidden h-full w-[46%] bg-[radial-gradient(circle_at_60%_40%,rgba(134,182,229,.28),transparent_68%)] md:block" />
      <div className={cn(wrapWide, "relative grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr] lg:gap-10")}>
        <div>
          <Eyebrow>Accommodation &amp; Advocacy</Eyebrow>
          <h1 id="page-title" className="mt-6 font-display text-[clamp(38px,5.4vw,60px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-[#123D6A]">
            Accommodation Documentation &amp; Advocacy
          </h1>
          <p className="type-lead mt-6 max-w-[600px] text-pretty text-[#33465E]">
            You’ve completed your Comprehensive ADHD Evaluation. Let us turn your diagnostic findings into professional documentation that supports requests for academic, standardized testing, and workplace accommodations.
          </p>
          <p className="type-body mt-4 max-w-[560px] border-l-[3px] border-primary-300 pl-4 text-[#5B6B80]">
            Available exclusively for individuals who have completed an AXON Comprehensive ADHD Evaluation. Accommodation decisions are made by each institution.
          </p>
          <div className="mt-9 flex flex-col gap-3.5 xs:flex-row xs:flex-wrap">
            <ButtonLink href={checkout} size="lg" className={cn("group", primaryBtn)}>
              {ctaLabel}
              <Arrow />
            </ButtonLink>
          </div>
          <TrustBar className="mt-11 items-center gap-x-5 gap-y-4 lg:flex-nowrap [&>li]:shrink-0 max-lg:[&>li[aria-hidden]]:hidden [&_a]:-my-2 [&_a]:-ml-1.5 [&_a_img]:h-[64px] lg:[&_a_img]:h-[68px]" />
        </div>
        <ReportPreview />
      </div>
    </section>
  );
}

/* ----------------------------------------------- More Than an Evaluation */

const benefits = [
  { title: "How ADHD impacts", text: "your academic and testing performance", icon: GraduationCap, panel: "bg-[#F0F6FD]", tile: "bg-[#E1EEFC] text-primary" },
  { title: "Which accommodations", text: "are medically appropriate", icon: ClipboardList, panel: "bg-[#FFF5EA]", tile: "bg-[#FFE8CC] text-[#EB8B01]" },
  { title: "The objective data", text: "supporting those recommendations", icon: TrendingUp, panel: "bg-[#EAF8F3]", tile: "bg-[#D6F2E8] text-[#12998A]" },
];

/** Line colours: [upper segment (previous icon → this icon), lower segment (this icon → next icon)] per row. */
const benefitLine = [
  [null, "bg-gradient-to-b from-primary to-[#B79A6A]"],
  ["bg-gradient-to-b from-[#B79A6A] to-[#EB8B01]", "bg-gradient-to-b from-[#EB8B01] to-[#9FA89A]"],
  ["bg-gradient-to-b from-[#9FA89A] to-[#12998A]", null],
] as const;

export function AccommodationBenefits() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="more-title">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-4 sm:px-6 md:grid-cols-[44fr_56fr] lg:gap-16 lg:px-8">
        <Reveal>
          <Eyebrow>Beyond your diagnosis</Eyebrow>
          <h2 id="more-title" className="mt-5 font-display text-[clamp(36px,4.4vw,58px)] leading-[1.08] font-extrabold tracking-[-0.025em] text-balance text-[#123768]">
            Not Another Evaluation.
          </h2>
          <p className="type-lead mt-6 max-w-[560px] text-pretty text-[#536985]">
            This is a specialized accommodations report created from the results of your completed AXON Comprehensive ADHD Evaluation. Because we already have comprehensive objective testing, clinical interviews, and documentation of functional impairment, we can prepare individualized recommendations.
          </p>
          <p className="type-lead mt-4 max-w-[560px] text-pretty text-[#536985]">
            This report is designed to help support accommodation requests not repeat the evaluation you’ve already completed.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-4">
            {benefits.map((b, i) => (
              <li key={b.title} className="grid grid-cols-[auto_1fr] items-stretch gap-3 sm:gap-5">
                {/* Icon cell: the timeline segments sit behind the tile (z-0 vs z-10) and join through the 16px row gap */}
                <div className="relative flex items-center justify-center">
                  {benefitLine[i][0] && <span aria-hidden className={cn("absolute -top-4 left-1/2 z-0 h-[calc(50%+1rem)] w-0.5 -translate-x-1/2", benefitLine[i][0])} />}
                  {benefitLine[i][1] && <span aria-hidden className={cn("absolute top-1/2 bottom-0 left-1/2 z-0 w-0.5 -translate-x-1/2", benefitLine[i][1])} />}
                  <span aria-hidden className={cn("relative z-10 grid size-[72px] place-items-center rounded-[22px] sm:size-24 sm:rounded-[28px] lg:size-28", b.tile)}>
                    <b.icon className="size-8 sm:size-11 lg:size-12" strokeWidth={1.75} />
                  </span>
                </div>
                <div className={cn("flex flex-col justify-center rounded-[24px] px-5 py-5 sm:rounded-[28px] sm:px-8 sm:py-7", b.panel)}>
                  <h3 className="type-h4 text-[#123768]">{b.title}</h3>
                  <p className="type-body mt-1.5 text-[#536985]">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------- Documentation package grid */

type PackageFeature = { title: string; text: string; icon: typeof FileText; tile: string };

const packageLeft: PackageFeature[] = [
  { title: "Individualized accommodations report", text: "A separate report prepared specifically for accommodation requests.", icon: FileText, tile: "bg-[#E3EFFC] text-primary" },
  { title: "Professional review by your evaluating psychologist", text: "Prepared and reviewed by the clinician who knows your case.", icon: Stethoscope, tile: "bg-[#DDF7EF] text-[#12998A]" },
  { title: "Evidence-based rationale", text: "Tied directly to your evaluation findings.", icon: ShieldCheck, tile: "bg-[#FFE8EC] text-[#E5484D]" },
];

const packageRight: PackageFeature[] = [
  { title: "Objective data supporting each recommendation", text: "Findings from your testing linked to what is recommended.", icon: FlaskConical, tile: "bg-[#FFF0DC] text-[#EB8B01]" },
  { title: "Functional impairment analysis", text: "How ADHD affects your academic or work performance.", icon: TrendingUp, tile: "bg-[#EEE9FF] text-[#6D4AE0]" },
  { title: "Assistance completing required forms", text: "Support with institution-specific accommodation forms.", icon: ClipboardList, tile: "bg-[#E3EFFC] text-primary" },
];

const packageInstitutions: PackageFeature = {
  title: "Appropriate for a range of institutions",
  text: "Colleges, universities, licensing boards, testing agencies, and employers.",
  icon: GraduationCap,
  tile: "bg-[#E3EFFC] text-primary",
};

function PackageFeatureItem({ f, delay, side }: { f: PackageFeature; delay: number; side: "left" | "right" }) {
  return (
    <li className="relative z-10">
      <Reveal delay={delay}>
        {/* Desktop: left = [text][icon], right = [icon][text]. Mobile: icon first, text left-aligned. */}
        <div className={cn("flex items-center gap-4 sm:gap-5", side === "left" && "md:flex-row-reverse md:text-right")}>
          <span aria-hidden className={cn("grid size-[68px] shrink-0 place-items-center rounded-full shadow-[0_8px_20px_rgba(37,120,202,.10)] sm:size-[76px] lg:size-[88px]", f.tile)}>
            <f.icon className="size-8 sm:size-9" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h3 className="type-h4 text-[#123B70]">{f.title}</h3>
            <p className="type-body mt-1 text-[#526781]">{f.text}</p>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

/** Report-cover mockup with layered pale-blue rings and small nodes behind it. */
function PackageDocument() {
  return (
    <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center py-6 md:py-0">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -z-0 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#E6F1FD_0%,#EEF5FD_60%,rgba(238,245,253,0)_72%)] sm:size-[520px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCEBFB]/60 sm:size-[430px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-150/60 sm:size-[330px]" />
      {/* Nodes (desktop only) */}
      <span aria-hidden className="absolute top-[22%] left-[2%] hidden size-3 rounded-full bg-[#F4B26B] md:block" />
      <span aria-hidden className="absolute top-[50%] -left-[4%] hidden size-3 rounded-full bg-primary md:block" />
      <span aria-hidden className="absolute top-[22%] right-[2%] hidden size-3 rounded-full bg-[#F3A0AE] md:block" />
      <span aria-hidden className="absolute top-[50%] -right-[4%] hidden size-3 rounded-full bg-primary md:block" />

      <div className="relative aspect-[3/4] w-[240px] overflow-hidden rounded-[10px] border border-[#E3EAF2] bg-white p-6 shadow-[0_30px_60px_rgba(18,59,112,.18)] transition-transform duration-300 hover:-translate-y-1 sm:w-[280px] sm:p-7">
        <Image src={site.headerLogo.src} alt="AXON ADHD" width={site.headerLogo.width} height={site.headerLogo.height} className="h-7 w-auto" />
        <p className="mt-8 text-[10.5px] font-semibold tracking-[0.14em] text-primary uppercase">Individualized report</p>
        <h3 className="type-h3 mt-2 text-[#123B70]">Accommodation Documentation Package</h3>
        <div aria-hidden className="mt-4 space-y-1.5">
          <span className="block h-1 w-[55%] rounded-full bg-primary/15" />
          <span className="block h-1 w-[40%] rounded-full bg-primary/10" />
        </div>
        {/* Abstract shapes */}
        <span aria-hidden className="absolute -right-8 bottom-6 size-32 rounded-full bg-primary-400/80" />
        <span aria-hidden className="absolute right-4 -bottom-12 size-28 rounded-full bg-primary-600" />
        <span aria-hidden className="absolute bottom-3 left-6 size-12 rounded-full bg-[#F7C98B]/80" />
        <span aria-hidden className="absolute bottom-10 left-1/2 size-6 rounded-full bg-[#7ED8BD]/80" />
      </div>
    </div>
  );
}

export function DocumentationPackage() {
  return (
    <section id="package" className="scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF5FD_100%)] py-16 sm:py-20 lg:py-24" aria-labelledby="package-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 id="package-title" className={h2.replace("text-[#123D6A]", "text-[#123B70]")}>
            Your Accommodation Documentation Package
          </h2>
          <p className={cn(lead, "mt-4")}>Everything an institution needs to evaluate your request, prepared and reviewed by the psychologist who knows your case.</p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-[1fr_300px_1fr] md:gap-x-6 lg:mt-14 lg:grid-cols-[1fr_340px_1fr] lg:gap-x-12">
          <div className="order-2 md:order-none md:self-stretch md:py-6">
            <ul className="flex flex-col gap-8 md:h-full md:justify-between md:gap-10">
              {packageLeft.map((f, i) => (
                <PackageFeatureItem key={f.title} f={f} side="left" delay={i * 0.06} />
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-none">
            <PackageDocument />
          </div>
          <div className="order-3 md:order-none md:self-stretch md:py-6">
            <ul className="flex flex-col gap-8 md:h-full md:justify-between md:gap-10">
              {packageRight.map((f, i) => (
                <PackageFeatureItem key={f.title} f={f} side="right" delay={0.18 + i * 0.06} />
              ))}
            </ul>
          </div>
        </div>

        <ul className="mx-auto mt-12 flex max-w-[880px] justify-center lg:mt-14">
          <PackageFeatureItem f={packageInstitutions} side="right" delay={0} />
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- Feature banner */

export function AccommodationFeatureBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(110deg,#2578CA_0%,#1E64AA_50%,#19528C_100%)] py-20 text-white sm:py-24 lg:py-28" aria-labelledby="why-title">
      <div aria-hidden className="absolute -top-32 -left-24 -z-10 size-[380px] rounded-full bg-white/[0.06]" />
      <div aria-hidden className="absolute -right-20 -bottom-40 -z-10 size-[460px] rounded-full bg-primary-300/10" />
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20")}>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.14em] text-primary-200 uppercase">Optional add-on</p>
          <h2 id="why-title" className="type-h2 mt-4 text-balance">
            Why Consider Accommodation Support?
          </h2>
          <p className="type-lead mt-6 max-w-[780px] text-white/90">
            Not everyone diagnosed with ADHD needs formal accommodations. For those who plan to request them from a school, testing organization, licensing board, or employer, documentation prepared by your evaluating psychologist helps organize the relevant information and communicate your needs clearly.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[24px] border border-white/20 bg-white/10 p-8 sm:p-10">
            <p className="type-body text-white/90">Prepared by the psychologist who completed your Comprehensive ADHD Evaluation.</p>
            <ButtonLink href={checkout} size="lg" className={cn("group mt-6 w-full whitespace-normal", lightBtn)}>
              {ctaLabel}
              <Arrow />
            </ButtonLink>
            <p className="type-small mt-4 text-center text-white/75">Available after your evaluation</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Clinician guidance */

const guidance = [
  "Analyze your evaluation through the lens of functional impairment",
  "Prepare a separate individualized accommodations report",
  "Identify appropriate accommodations supported by objective findings",
  "Complete institution-specific forms & supporting documentation",
];

/** Image-led split: the photo is the larger column and stays inside the section container. */
export function ClinicianGuidance() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="guidance-title">
      <div className={cn(wrap, "grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20")}>
        <Reveal>
          <h2 id="guidance-title" className={h2}>
            What our clinicians do for this package
          </h2>
          <p className={cn(lead, "mt-6")}>Beyond your existing report, each package requires dedicated professional work:</p>
          <ul className="mt-9 space-y-5">
            {guidance.map((g) => (
              <li key={g} className="type-body flex items-start gap-4 text-[#15243A]">
                <span aria-hidden className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <Check className="size-[18px]" strokeWidth={3} />
                </span>
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/images/services/Whatour.webp"
            alt="Clinician at a desk in an office reviewing printed evaluation reports and writing notes beside a monitor"
            width={2540}
            height={1448}
            sizes="(max-width: 1024px) 100vw, 740px"
            className="aspect-[16/11] w-full rounded-[24px] object-cover object-center shadow-[0_28px_64px_rgba(18,61,106,.20)]"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Who is this for */

const summaryIncludes = [
  "Specialized accommodations report",
  "Personalized recommendations",
  "Functional impairment documentation",
  "Assistance completing institutional forms",
  "Supporting documentation when requested",
];

const audiences = [
  { title: "College & University", text: "Disability services and campus accommodations.", icon: GraduationCap },
  { title: "Standardized Exams", text: "MCAT, LSAT, GRE, GMAT, SAT, ACT, Bar Exam, NCLEX, and more.", icon: FileText },
  { title: "Workplace (ADA)", text: "Accommodations under the Americans with Disabilities Act.", icon: Users },
  { title: "Licensing & Certification", text: "Professional certification and licensing examinations.", icon: Award },
];

export function ServiceAudience() {
  return (
    <section className="bg-[#E8F2FC] py-20 sm:py-24 lg:py-28" aria-labelledby="audience-title">
      <div className={cn(wrap, "grid items-start gap-12 md:grid-cols-[1.05fr_1fr] lg:gap-16")}>
        <Reveal>
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_rgba(18,61,106,.16)]">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#123D6A] px-8 py-6 text-white sm:px-10">
              <h2 className="type-h2">Accommodation Documentation &amp; Advocacy</h2>
              <span className="type-small rounded-full bg-[#FFF3DC] px-3.5 py-1 font-bold text-[#B86E00]">Optional add-on</span>
            </div>
            <div className="p-8 sm:p-10">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-[64px] leading-none font-extrabold text-primary">$250</span>
                <span className="type-body text-[#5B6B80]">one-time · taxes included</span>
              </p>
              <p className="type-body mt-6 rounded-xl bg-[#F3F8FE] px-5 py-3.5 text-primary-600">Available only after completion of an AXON Comprehensive ADHD Evaluation.</p>
              <ul className="mt-7 space-y-4">
                {summaryIncludes.map((s) => (
                  <li key={s} className="type-body flex items-start gap-3.5 text-[#15243A]">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-primary" />
                    {s}
                  </li>
                ))}
              </ul>
              <ButtonLink href={checkout} size="lg" className={cn("group mt-9 w-full whitespace-normal", primaryBtn)}>
                Add AXON Accommodation &amp; Advocacy Package
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 id="audience-title" className={h2}>
              Who Is This For?
            </h2>
            <p className={cn(lead, "mt-4")}>This service is ideal if you’re requesting accommodations for:</p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {audiences.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={i * 0.06}>
                  <div className="group flex items-center gap-5 rounded-[20px] bg-white p-6 shadow-[0_8px_24px_rgba(18,61,106,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(37,120,202,.16)]">
                    <IconChip className="size-14 rounded-2xl">
                      <a.icon className="size-7" />
                    </IconChip>
                    <div>
                      <h3 className="type-h4 text-[#123D6A]">{a.title}</h3>
                      <p className="type-body mt-1 text-[#4A5B72]">{a.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Final CTA */

export function AccommodationCTA() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_85%_15%,rgba(8,122,145,.35),transparent_55%),linear-gradient(115deg,#063653_0%,#064766_52%,#075A70_100%)] py-16 text-center text-white sm:py-24 lg:py-28"
      aria-labelledby="cta-title"
    >
      {/* Decorative shapes: partially cropped circles and thin outlines at both edges, kept low-contrast and behind the content */}
      <div aria-hidden className="pointer-events-none absolute top-[28%] -left-[14%] -z-10 size-[420px] rounded-full bg-[#0A6A8C]/35 sm:size-[560px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[38%] -left-[8%] -z-10 size-[460px] rounded-full bg-[#087EA4]/20 sm:size-[640px]" />
      <div aria-hidden className="pointer-events-none absolute top-[6%] -left-[10%] -z-10 size-[460px] rounded-full border border-white/10 sm:size-[620px]" />
      <div aria-hidden className="pointer-events-none absolute -top-[34%] -right-[12%] -z-10 size-[460px] rounded-full bg-[#087A91]/30 sm:size-[640px]" />
      <div aria-hidden className="pointer-events-none absolute -right-[16%] -bottom-[48%] -z-10 size-[520px] rounded-full border border-white/10 sm:size-[760px]" />

      <Reveal className={cn(wrap, "max-w-[1000px]")}>
        <h2 id="cta-title" className="mx-auto max-w-[900px] font-display text-[clamp(30px,4.2vw,54px)] leading-[1.15] font-bold tracking-[-0.02em] text-balance">
          Ready to turn your diagnosis into documentation that works?
        </h2>
        <p className="type-lead mx-auto mt-6 max-w-[850px] text-pretty text-primary-100">
          Your evaluation is done. Let your evaluating psychologist prepare the report, data, and forms that institutions actually accept and advocate for the accommodations you’re entitled to.
        </p>
        <div className="mt-9 sm:mt-10">
          <ButtonLink
            href={checkout}
            size="lg"
            className="group w-full bg-white! whitespace-normal text-[#0F2F57]! shadow-[0_14px_34px_rgba(2,24,48,.35)]! transition-[background-color,box-shadow] duration-300 hover:bg-[#F4F9FF]! hover:shadow-[0_18px_42px_rgba(8,126,164,.40)]! sm:w-auto lg:whitespace-nowrap"
          >
            Add the Accommodation Documentation &amp; Advocacy Package
            <ArrowRight aria-hidden className="size-5 shrink-0 text-primary transition-transform duration-300 ease-brand group-hover:translate-x-1" strokeWidth={2.5} />
          </ButtonLink>
        </div>
        <p className="type-body mx-auto mt-6 max-w-[760px] text-primary-100">$250 one-time · taxes included · available only after your Comprehensive ADHD Evaluation</p>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------- Latest blogs */

/** Editorial layout: one large featured post beside two stacked horizontal posts. */
export function AccommodationBlogs({ title = "Latest Blogs", subtitle = "Explore helpful resources about ADHD, evaluations, and support options." }: { title?: string; subtitle?: string } = {}) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="blogs-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 id="blogs-title" className={h2}>
            {title}
          </h2>
          <p className={cn(lead, "mt-4")}>{subtitle}</p>
        </Reveal>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, i) => {
            const href = `/blog/${post.slug}/`;
            return (
              <li key={post.slug} className="flex">
                <Reveal delay={i * 0.08} className="flex w-full">
                  <article className="group flex w-full flex-col overflow-hidden rounded-[24px] border border-[#E3EAF2] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(37,120,202,.14)]">
                    <Link href={href} tabIndex={-1} aria-hidden className="block overflow-hidden">
                      <Image src={post.image.src} alt="" width={post.image.width} height={post.image.height} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    </Link>
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-[13px] font-semibold tracking-wide text-primary-400 uppercase">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </p>
                      <h3 className="type-h4 mt-2.5 text-[#123D6A]">
                        <Link href={href} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="type-body mt-3 line-clamp-3 flex-1 text-[#5B6B80]">{post.excerpt}</p>
                      <Link href={href} className="type-body mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-600">
                        Read more <span className="sr-only">about {post.title}</span>
                        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <div className="mt-12 text-center">
          <Link href="/blog/" className="type-body inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-600">
            View all articles <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Contact */

const contactPoints = [
  { title: "Take our FREE screening in seconds", icon: Timer, tile: "bg-[#E1EEFC] text-primary" },
  { title: "Get an official diagnosis in days", icon: CalendarDays, tile: "bg-[#DDF4F2] text-[#0E9AA0]" },
  { title: "Get treatment and support to help you thrive.", icon: HandHeart, tile: "bg-[#E1EEFC] text-primary" },
];

const dotPattern = "bg-[radial-gradient(#86B6E5_2px,transparent_2.5px)] bg-[length:22px_22px]";

/** Form styling is scoped here (via the wrapper) so the shared form and input components stay untouched. */
const contactFormSkin = [
  "[&_label]:text-[14.5px] [&_label]:font-medium [&_label]:text-[#1F3048]",
  "[&_input:not([type=tel])]:rounded-xl [&_textarea]:rounded-xl [&_input]:border-[#DCE5F0] [&_textarea]:border-[#DCE5F0] [&_select]:border-[#DCE5F0]",
  "[&_select]:rounded-l-xl [&_input[type=tel]]:rounded-r-xl [&_select]:bg-white",
  "[&_input:focus]:border-primary [&_textarea:focus]:border-primary",
  "[&_button[type=submit]]:w-full [&_button[type=submit]]:bg-primary [&_button[type=submit]]:font-semibold [&_button[type=submit]]:shadow-[0_10px_24px_rgba(37,120,202,.30)] [&_button[type=submit]:hover]:bg-primary-600",
  "[&_form>p:last-child]:text-center [&_form>p:last-child]:text-[#5B6B84]",
].join(" ");

/**
 * Size sets for the contact section. `cn` only joins classes (no conflict resolution), so `compact` swaps whole strings
 * instead of layering overrides: slightly smaller type and tighter spacing throughout.
 */
const contactSizes = {
  regular: {
    section: "py-16 sm:py-20 lg:py-24",
    grid: "gap-12 lg:gap-16",
    title: "text-[clamp(34px,4vw,54px)]",
    description: "type-lead mt-5",
    list: "mt-8 space-y-4",
    tile: "size-14 sm:size-16 lg:size-[72px]",
    tileIcon: "size-7 sm:size-8",
    point: "type-lead",
    help: "mt-8 p-5 sm:gap-5 sm:p-6",
    mail: "size-14 sm:size-16",
    mailIcon: "size-7 sm:size-8",
    email: "type-lead",
    card: "p-6 sm:p-9 lg:p-10",
    formTitle: "type-h2",
    formIntro: "mt-3 mb-7",
    form: "[&_input]:py-3 [&_button[type=submit]]:h-14 [&_button[type=submit]]:text-[17px]",
  },
  compact: {
    section: "py-12 sm:py-16 lg:py-20",
    grid: "gap-10 lg:gap-12",
    title: "text-[clamp(30px,3.4vw,44px)]",
    description: "type-body mt-4",
    list: "mt-6 space-y-3",
    tile: "size-12 sm:size-14 lg:size-[60px]",
    tileIcon: "size-6 sm:size-7",
    point: "type-body",
    help: "mt-6 p-4 sm:gap-4 sm:p-5",
    mail: "size-12 sm:size-14",
    mailIcon: "size-6 sm:size-7",
    email: "type-body",
    card: "p-6 sm:p-8",
    formTitle: "type-h3",
    formIntro: "mt-2 mb-5",
    form: "[&_input]:py-2.5 [&_button[type=submit]]:h-12 [&_button[type=submit]]:text-[16px]",
  },
};

export function AccommodationContact({
  eyebrow = "LET'S TALK",
  description = "We provide comprehensive ADHD assessments for adults across Arlington, including Rosslyn, Clarendon, Ballston, and the 22209 area.",
  placeholders = true,
  compact = false,
}: { eyebrow?: string | null; description?: string; placeholders?: boolean; compact?: boolean } = {}) {
  const s = contactSizes[compact ? "compact" : "regular"];
  return (
    <section id="contact" className={cn("relative isolate scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(135deg,#F3F8FE_0%,#E8F2FC_55%,#F7FAFF_100%)]", s.section)} aria-labelledby="contact-title">
      {/* Decorative background: curved shapes (upper-right, lower-left) and dot patterns (upper-left, lower-right) */}
      <div aria-hidden className="pointer-events-none absolute -top-28 -right-24 -z-10 size-[300px] rounded-full bg-primary-150/70 sm:size-[420px]" />
      <div aria-hidden className="pointer-events-none absolute -top-12 -right-10 -z-10 size-[170px] rounded-full bg-primary-200/60 sm:size-[240px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[360px] rounded-full bg-primary-150/70 sm:size-[520px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 -z-10 size-[240px] rounded-full bg-primary-200/60 sm:size-[340px]" />
      <div aria-hidden className={cn("pointer-events-none absolute top-8 left-4 -z-10 h-24 w-28 sm:left-8 sm:h-32 sm:w-40", dotPattern)} />
      <div aria-hidden className={cn("pointer-events-none absolute right-4 bottom-10 -z-10 hidden h-32 w-40 sm:block lg:right-10", dotPattern)} />

      <div className={cn(wrap, "grid items-center md:grid-cols-[1fr_1fr]", s.grid)}>
        <Reveal>
          {eyebrow && (
            <p className="flex items-center gap-3 text-[14px] font-medium tracking-[0.2em] text-primary uppercase">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {eyebrow}
            </p>
          )}
          <h2 className={cn("font-display leading-[1.1] font-extrabold tracking-[-0.025em] text-balance text-[#0F2F5E]", s.title, eyebrow && "mt-5")}>Get your ADHD care right.</h2>
          <p className={cn("max-w-[600px] text-pretty text-[#5B6B84]", s.description)}>{description}</p>
          <ul className={s.list}>
            {contactPoints.map((c) => (
              <li key={c.title} className="flex items-center gap-4 sm:gap-5">
                <span aria-hidden className={cn("grid shrink-0 place-items-center rounded-full", s.tile, c.tile)}>
                  <c.icon className={s.tileIcon} strokeWidth={1.75} />
                </span>
                <span className={cn("font-semibold text-[#123768]", s.point)}>{c.title}</span>
              </li>
            ))}
          </ul>
          <div className={cn("flex max-w-[600px] items-center gap-4 rounded-2xl border border-primary-150 bg-white/55 backdrop-blur-sm", s.help)}>
            <span aria-hidden className={cn("grid shrink-0 place-items-center rounded-full border border-primary-100 bg-white text-primary", s.mail)}>
              <Mail className={s.mailIcon} strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <p className="type-body text-[#4A5B72]">Need assistance?</p>
              <a href={`mailto:${site.supportEmail}`} className={cn("mt-0.5 block font-semibold break-words text-primary hover:text-primary-600", s.email)}>
                {site.supportEmail}
              </a>
              <p className="type-small mt-1 text-[#5B6B84]">We typically respond within 2 business days.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className={cn("rounded-[28px] bg-white shadow-[0_18px_50px_rgba(18,61,106,.10)]", s.card, contactFormSkin, s.form)}>
            <h2 id="contact-title" className={cn("text-[#0F2F5E]", s.formTitle)}>
              Contact Us
            </h2>
            <p className={cn("type-body text-[#5B6B84]", s.formIntro)}>{"We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible."}</p>
            <ContactForm placeholders={placeholders} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
