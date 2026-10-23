import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, ClipboardCheck, FileCheck2, FileText, GraduationCap, ShieldCheck, Stethoscope, TrendingUp, UserCheck, Users, Award, FlaskConical, ClipboardList, Mail, Phone, BookOpenCheck, Info } from "lucide-react";
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

const wrap = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
const wrapWide = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
const h2 = "font-display text-[32px] leading-[1.1] font-extrabold tracking-[-0.025em] text-balance text-[#123D6A] sm:text-[40px] lg:text-[48px]";
const lead = "text-[17px] leading-[1.75] text-pretty text-[#44566E] sm:text-[19px]";
const primaryBtn = "bg-[#2578CA]! text-white! shadow-[0_8px_20px_rgba(37,120,202,.28)]! hover:bg-[#195FA8]!";
const lightBtn = "bg-white! text-[#195FA8]! shadow-[0_8px_24px_rgba(8,32,64,.22)]! hover:bg-[#E8F2FC]!";

const checkout = links.accommodationCheckout;
const ctaLabel = "Explore Accommodation Support";

function Arrow() {
  return <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />;
}

function IconChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden className={cn("grid size-11 shrink-0 place-items-center rounded-xl bg-[#E8F2FC] text-[#2578CA] transition-colors duration-300 group-hover:bg-[#2578CA] group-hover:text-white", className)}>
      {children}
    </span>
  );
}

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.12em] uppercase", light ? "bg-white/15 text-white" : "bg-[#E8F2FC] text-[#195FA8]")}>
      <span aria-hidden className={cn("size-1.5 rounded-full", light ? "bg-white" : "bg-[#2578CA]")} />
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------- Hero */

const journey = [
  { state: "done", kicker: "Step 1 · Completed", title: "Comprehensive ADHD Evaluation", text: "Objective testing, clinical interview, and diagnosis already done." },
  { state: "current", kicker: "Step 2 · Optional Add-On · You are here", title: "Accommodation Documentation & Advocacy", text: "Turn your existing findings into documentation for accommodation requests." },
] as const;

const reportFeatures = [
  { label: "Detailed Clinical Summary", icon: FileText },
  { label: "Functional Impact Analysis", icon: TrendingUp },
  { label: "Accommodation Recommendations", icon: Users },
  { label: "Supporting Documentation", icon: FileCheck2 },
  { label: "Professional Review", icon: ShieldCheck },
];

/** Hero visual: glass panel with a 2-row grid. Row 1 = timeline | report card; row 2 = optional add-on note. Decorative layers stay behind and inside the card column. */
function ReportPreview() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[700px] lg:max-w-none">
      <div aria-hidden className="pointer-events-none absolute -top-8 -right-4 -z-10 size-[260px] rounded-full bg-[#80B5E8]/30 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-6 -z-10 size-[200px] rounded-full bg-[#2578CA]/15 blur-2xl" />

      <div className="grid gap-6 rounded-[28px] border border-white/75 bg-white/35 p-5 shadow-[0_24px_60px_rgba(37,120,202,.18)] backdrop-blur-[14px] sm:p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-6 lg:gap-y-5">
        {/* Row 1 · left: timeline (always above the decorative layers) */}
        <ol aria-label="Your ADHD care journey" className="relative z-20 lg:col-start-1 lg:row-start-1">
          {journey.map((step, i) => {
            const done = step.state === "done";
            return (
              <li key={step.kicker} className="relative flex gap-3.5 pb-6 last:pb-0">
                {i < journey.length - 1 && <span aria-hidden className="absolute top-12 bottom-0 left-6 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#22C083] to-[#2578CA]" />}
                <span aria-hidden className={cn("relative z-10 grid size-12 shrink-0 place-items-center rounded-full text-white shadow-[0_6px_14px_rgba(18,61,106,.18)]", done ? "bg-[#22C083]" : "bg-[#2578CA]")}>
                  {done ? <Check className="size-6" strokeWidth={3} /> : <span className="font-display text-[21px] font-bold">2</span>}
                </span>
                <div className="min-w-0 pt-px">
                  <p className={cn("text-[14px] font-semibold", done ? "text-[#1A9F6A]" : "text-[#2578CA]")}>{step.kicker}</p>
                  <p className="mt-0.5 text-[16.5px] leading-snug font-bold text-[#123D6A]">{step.title}</p>
                  <p className="mt-1 text-[14px] leading-[1.45] text-[#5B6B80]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Row 1 · right: report card with two subtle layers behind it (kept inside this column) */}
        <div className="relative lg:col-start-2 lg:row-start-1">
          <div aria-hidden className="pointer-events-none absolute inset-y-6 right-0 left-2 hidden -rotate-[3deg] rounded-[22px] border border-white/80 bg-[#E3EFFC]/70 shadow-[0_10px_24px_rgba(37,120,202,.10)] lg:block">
            <div className="space-y-2 p-4">
              {[70, 55, 62].map((w, i) => (
                <span key={i} className="block h-1.5 rounded-full bg-[#2578CA]/15" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-y-3 right-0 left-0 hidden translate-x-2 rotate-[3deg] rounded-[22px] border border-white/80 bg-[#EEF5FD]/80 shadow-[0_10px_24px_rgba(37,120,202,.10)] lg:block">
            <div className="flex items-end justify-end gap-2 p-4 pt-3">
              {[30, 50, 40, 70].map((h, i) => (
                <span key={i} className="w-2.5 rounded-t bg-[#2578CA]/20" style={{ height: `${h / 2.5}px` }} />
              ))}
            </div>
          </div>

          <div className="relative z-10 rounded-[24px] border border-[#D8E8F8] bg-white p-5 shadow-[0_22px_48px_rgba(18,61,106,.16)]">
            <div className="flex items-start justify-between gap-3">
              <Image src={site.headerLogo.src} alt="AXON ADHD" width={site.headerLogo.width} height={site.headerLogo.height} className="h-7 w-auto" />
              <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-[#E8F2FC] text-[#2578CA]">
                <FileText className="size-[18px]" />
              </span>
            </div>
            <h3 className="mt-3 font-display text-[20px] leading-[1.25] font-extrabold text-[#123D6A]">Academic Performance &amp; Accommodations Report</h3>
            <ul className="mt-2 divide-y divide-[#EDF1F6]">
              {reportFeatures.map((f) => (
                <li key={f.label} className="flex items-center gap-3 py-2">
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#E8F2FC] text-[#2578CA]">
                    <f.icon className="size-[18px]" />
                  </span>
                  <span className="text-[15px] leading-tight font-medium text-[#1F3048]">{f.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-2xl bg-[#EAF3FD] p-3.5">
              <p className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="font-display text-[34px] leading-none font-extrabold text-[#123D6A]">$250</span>
                <span className="text-[13.5px] text-[#5B6B80]">Price includes taxes.</span>
              </p>
              <ButtonLink href={checkout} size="lg" className={cn("group mt-3 w-full px-4 text-[15.5px]", primaryBtn)}>
                Add Package &amp; Continue
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Row 2: optional add-on note, full width, in normal flow below both columns */}
        <div className="flex items-start gap-4 rounded-[20px] bg-[linear-gradient(100deg,#FFF6DF_0%,#FFF9EA_100%)] p-4 sm:p-5 lg:col-span-2 lg:row-start-2">
          <span aria-hidden className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#EB8B01]/15 text-[#B86E00]">
            <Info className="size-5" />
          </span>
          <div>
            <p className="text-[16.5px] font-bold text-[#123D6A]">Why is this an optional add-on?</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[#4A5B72]">Preparing accommodations documentation requires additional clinical analysis, report creation, and form completion. It’s an optional service for those who plan to request accommodations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccommodationHero() {
  return (
    <section aria-labelledby="page-title" className="relative -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(135deg,#F3F8FE_0%,#E8F2FC_55%,#F7FAFF_100%)] pt-[calc(var(--header-height)+32px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-height)+44px)] lg:pb-24">
      <div aria-hidden className="absolute top-0 right-0 hidden h-full w-[46%] bg-[radial-gradient(circle_at_60%_40%,rgba(128,181,232,.28),transparent_68%)] md:block" />
      <div className={cn(wrapWide, "relative grid items-center gap-14 md:grid-cols-[0.86fr_1.14fr] lg:gap-12")}>
        <div>
          <Eyebrow>Accommodation &amp; Advocacy</Eyebrow>
          <h1 id="page-title" className="mt-6 font-display text-[clamp(38px,5.4vw,60px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-[#123D6A]">
            Accommodation Documentation &amp; Advocacy
          </h1>
          <p className="mt-6 max-w-[600px] text-[18px] leading-[1.7] text-pretty text-[#33465E] sm:text-[20px]">
            You’ve completed your Comprehensive ADHD Evaluation. Let us turn your diagnostic findings into professional documentation that supports requests for academic, standardized testing, and workplace accommodations.
          </p>
          <p className="mt-4 max-w-[560px] border-l-[3px] border-[#80B5E8] pl-4 text-[15px] leading-relaxed text-[#5B6B80]">
            Available exclusively for individuals who have completed an AXON Comprehensive ADHD Evaluation. Accommodation decisions are made by each institution.
          </p>
          <div className="mt-9 flex flex-col gap-3.5 xs:flex-row xs:flex-wrap">
            <ButtonLink href={checkout} size="lg" className={cn("group px-9", primaryBtn)}>
              {ctaLabel}
              <Arrow />
            </ButtonLink>
            <ButtonLink href={links.freeScreening} variant="outline" size="lg" className="border-[#2578CA]! px-8 text-[#2578CA]! hover:bg-[#2578CA]! hover:text-white!">
              Take the Free ADHD Assessment
            </ButtonLink>
          </div>
          <TrustBar className="mt-10" />
        </div>
        <ReportPreview />
      </div>
    </section>
  );
}

/* ----------------------------------------------- More Than an Evaluation */

const benefits = [
  { title: "Clear Documentation", text: "A separate, individualized report built from your evaluation results.", icon: FileCheck2 },
  { title: "Accommodation Guidance", text: "Recommendations supported by the objective data from your testing.", icon: ClipboardCheck },
  { title: "Support for Next Steps", text: "Help completing the institution-specific forms your request requires.", icon: BookOpenCheck },
];

/** Editorial split: large type left, hairline-divided rows right (no cards). */
export function AccommodationBenefits() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="more-title">
      <div className={cn(wrap, "grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-start lg:gap-24")}>
        <Reveal>
          <Eyebrow>Beyond your diagnosis</Eyebrow>
          <h2 id="more-title" className={cn(h2, "mt-5 lg:text-[52px] lg:leading-[1.06]")}>
            More Than an Evaluation
          </h2>
          <p className={cn(lead, "mt-6")}>
            This is a specialized accommodations report created from the results of your completed AXON Comprehensive ADHD Evaluation.
          </p>
          <p className={cn(lead, "mt-4")}>
            Because comprehensive objective testing, clinical interviews, and documentation of functional impairment are already in hand, we can prepare individualized recommendations without repeating the evaluation.
          </p>
          <ButtonLink href="/comprehensive-adhd-assessment/" variant="ghost" size="md" className="group mt-5 text-[#2578CA]! hover:text-[#195FA8]!">
            About the Comprehensive ADHD Evaluation
            <Arrow />
          </ButtonLink>
        </Reveal>
        <ul className="divide-y divide-[#E3EAF2] border-y border-[#E3EAF2]">
          {benefits.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={i * 0.08}>
                <div className="group flex items-start gap-5 py-7">
                  <IconChip className="size-14 rounded-2xl">
                    <b.icon className="size-6" />
                  </IconChip>
                  <div>
                    <h3 className="text-[22px] font-bold text-[#123D6A]">{b.title}</h3>
                    <p className="mt-2 text-[17px] leading-relaxed text-[#5B6B80]">{b.text}</p>
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

/* -------------------------------------------- Documentation package grid */

const packageItems = [
  { title: "Individualized accommodations report", text: "A separate report prepared specifically for accommodation requests.", icon: FileText },
  { title: "Objective data supporting each recommendation", text: "Findings from your testing linked to what is recommended.", icon: FlaskConical },
  { title: "Professional review by your evaluating psychologist", text: "Prepared and reviewed by the clinician who knows your case.", icon: Stethoscope },
  { title: "Functional impairment analysis", text: "How ADHD affects your academic or work performance.", icon: TrendingUp },
  { title: "Evidence-based rationale", text: "Tied directly to your evaluation findings.", icon: ShieldCheck },
  { title: "Assistance completing required forms", text: "Support with institution-specific accommodation forms.", icon: ClipboardList },
  { title: "Appropriate for a range of institutions", text: "Colleges, universities, licensing boards, testing agencies, and employers.", icon: GraduationCap },
];

export function DocumentationPackage() {
  return (
    <section id="package" className="scroll-mt-[var(--header-offset)] bg-[#EAF0F7] py-20 sm:py-24 lg:py-28" aria-labelledby="package-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 id="package-title" className={h2}>
            Your Accommodation Documentation Package
          </h2>
          <p className={cn(lead, "mt-5")}>Everything an institution needs to evaluate your request, prepared and reviewed by the psychologist who knows your case.</p>
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {packageItems.map((item, i) => (
            <li key={item.title} className={cn("flex", i === packageItems.length - 1 && packageItems.length % 2 === 1 && "sm:col-span-2")}>
              <Reveal delay={Math.min(i, 5) * 0.05} className="flex w-full">
                <div className="group flex w-full items-start gap-5 rounded-[20px] border border-[#D8E8F8] bg-white p-6 shadow-[0_6px_20px_rgba(18,61,106,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,120,202,.15)] sm:p-8">
                  <IconChip className="size-14 rounded-2xl">
                    <item.icon className="size-7" />
                  </IconChip>
                  <div>
                    <h3 className="text-[20px] leading-snug font-bold text-[#123D6A]">{item.title}</h3>
                    <p className="mt-2 text-[16.5px] leading-relaxed text-[#5B6B80]">{item.text}</p>
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

/* ----------------------------------------------------- Feature banner */

export function AccommodationFeatureBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(110deg,#2578CA_0%,#1F68B1_50%,#174D86_100%)] py-20 text-white sm:py-24 lg:py-28" aria-labelledby="why-title">
      <div aria-hidden className="absolute -top-32 -left-24 -z-10 size-[380px] rounded-full bg-white/[0.06]" />
      <div aria-hidden className="absolute -right-20 -bottom-40 -z-10 size-[460px] rounded-full bg-[#80B5E8]/10" />
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20")}>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.14em] text-[#BBD9F5] uppercase">Optional add-on</p>
          <h2 id="why-title" className="mt-4 font-display text-[34px] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance sm:text-[46px] lg:text-[58px]">
            Why Consider Accommodation Support?
          </h2>
          <p className="mt-6 max-w-[780px] text-[18px] leading-[1.75] text-white/90 sm:text-[20px]">
            Not everyone diagnosed with ADHD needs formal accommodations. For those who plan to request them from a school, testing organization, licensing board, or employer, documentation prepared by your evaluating psychologist helps organize the relevant information and communicate your needs clearly.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[24px] border border-white/20 bg-white/10 p-8 sm:p-10">
            <p className="text-[17px] leading-relaxed text-white/90">Prepared by the psychologist who completed your Comprehensive ADHD Evaluation.</p>
            <ButtonLink href={checkout} size="lg" className={cn("group mt-6 h-16 w-full text-[17px]", lightBtn)}>
              {ctaLabel}
              <Arrow />
            </ButtonLink>
            <p className="mt-4 text-center text-[14px] text-white/75">Available after your evaluation</p>
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
  "Complete institution-specific forms and supporting documentation",
];

/** Image-led split: the photo is the larger column and stays inside the section container. */
export function ClinicianGuidance() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="guidance-title">
      <div className={cn(wrap, "grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20")}>
        <Reveal>
          <h2 id="guidance-title" className={h2}>
            Professional Guidance for Your Documentation
          </h2>
          <p className={cn(lead, "mt-6")}>Beyond your existing report, each package requires dedicated professional work from the clinician who evaluated you.</p>
          <ul className="mt-9 space-y-5">
            {guidance.map((g) => (
              <li key={g} className="flex items-start gap-4 text-[18px] leading-snug text-[#15243A]">
                <span aria-hidden className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#2578CA] text-white">
                  <Check className="size-[18px]" strokeWidth={3} />
                </span>
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-9 text-[15px] leading-relaxed text-[#5B6B80]">Documentation supports your request. Final decisions rest with the institution or organization you apply to.</p>
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
              <h2 className="font-display text-[24px] leading-tight font-extrabold sm:text-[30px]">Accommodation Documentation &amp; Advocacy</h2>
              <span className="rounded-full bg-[#FFF3DC] px-3.5 py-1 text-[12.5px] font-bold text-[#B86E00]">Optional add-on</span>
            </div>
            <div className="p-8 sm:p-10">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-[64px] leading-none font-extrabold text-[#2578CA]">$250</span>
                <span className="text-[16px] text-[#5B6B80]">one-time · taxes included</span>
              </p>
              <p className="mt-6 rounded-xl bg-[#F3F8FE] px-5 py-3.5 text-[16px] leading-snug text-[#195FA8]">Available only after completion of an AXON Comprehensive ADHD Evaluation.</p>
              <ul className="mt-7 space-y-4">
                {summaryIncludes.map((s) => (
                  <li key={s} className="flex items-start gap-3.5 text-[18px] leading-snug text-[#15243A]">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-[#2578CA]" />
                    {s}
                  </li>
                ))}
              </ul>
              <ButtonLink href={checkout} size="lg" className={cn("group mt-9 h-16 w-full text-[17px]", primaryBtn)}>
                Add Accommodation Support
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
                      <h3 className="text-[20px] font-bold text-[#123D6A]">{a.title}</h3>
                      <p className="mt-1 text-[16.5px] leading-relaxed text-[#4A5B72]">{a.text}</p>
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
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#123D6A_0%,#1B5E96_60%,#2578CA_100%)] py-24 text-center text-white sm:py-28 lg:py-32" aria-labelledby="cta-title">
      <Reveal className={cn(wrap, "max-w-[980px]")}>
        <h2 id="cta-title" className="font-display text-[38px] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance sm:text-[54px] lg:text-[68px]">
          Ready to Take the Next Step?
        </h2>
        <p className="mx-auto mt-7 max-w-[720px] text-[18px] leading-[1.7] text-white/90 sm:text-[21px]">Explore your ADHD evaluation options and learn whether accommodation documentation may be appropriate for your needs.</p>
        <div className="mt-11 flex flex-col items-center justify-center gap-5 xs:flex-row">
          <ButtonLink href={checkout} size="lg" className={cn("group h-[68px] px-12 text-[18px]", lightBtn)}>
            {ctaLabel}
            <Arrow />
          </ButtonLink>
          <ButtonLink href="/comprehensive-adhd-assessment/" variant="ghost" size="lg" className="text-[17px] text-white! underline decoration-white/40 hover:text-white! hover:decoration-white">
            Learn About ADHD Assessments
          </ButtonLink>
        </div>
        <p className="mt-7 text-[14px] text-white/75">$250 one-time · taxes included · available only after your Comprehensive ADHD Evaluation</p>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------- Latest blogs */

/** Editorial layout: one large featured post beside two stacked horizontal posts. */
export function AccommodationBlogs() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="blogs-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 id="blogs-title" className={h2}>
            Latest Blogs
          </h2>
          <p className={cn(lead, "mt-4")}>Explore helpful resources about ADHD, evaluations, and support options.</p>
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
                      <p className="text-[13px] font-semibold tracking-wide text-[#4B91D6] uppercase">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </p>
                      <h3 className="mt-2.5 text-[21px] leading-snug font-bold text-[#123D6A]">
                        <Link href={href} className="hover:text-[#2578CA]">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-[16px] leading-relaxed text-[#5B6B80]">{post.excerpt}</p>
                      <Link href={href} className="mt-5 inline-flex items-center gap-2 text-[16px] font-semibold text-[#2578CA] hover:text-[#195FA8]">
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
          <Link href="/blog/" className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#2578CA] hover:text-[#195FA8]">
            View all articles <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Contact */

const contactPoints = [
  { title: "Free ADHD screening in minutes", icon: ClipboardCheck },
  { title: "Comprehensive evaluation with a licensed clinician", icon: UserCheck },
  { title: "Documentation and support when you need it", icon: FileCheck2 },
];

export function AccommodationContact() {
  return (
    <section id="contact" className="scroll-mt-[var(--header-offset)] bg-[#EAF0F7] py-20 sm:py-24 lg:py-28" aria-labelledby="contact-title">
      <div className={cn(wrapWide, "grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16")}>
        <Reveal>
          <h2 className={cn(h2, "lg:text-[52px]")}>Get the ADHD Support You Need</h2>
          <p className={cn(lead, "mt-5")}>Questions about the evaluation or accommodation documentation? Send us a message and we’ll help you find the right next step.</p>
          <ul className="mt-9 space-y-5">
            {contactPoints.map((c) => (
              <li key={c.title} className="group flex items-center gap-4">
                <IconChip className="size-14 rounded-2xl bg-white">
                  <c.icon className="size-7" />
                </IconChip>
                <span className="text-[18.5px] leading-snug font-semibold text-[#15243A]">{c.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl bg-[#123D6A] p-7 text-white">
            <p className="text-[17px] font-bold">Need assistance?</p>
            <a href={`mailto:${site.supportEmail}`} className="mt-4 flex items-center gap-3 text-[16.5px] font-semibold text-white hover:text-[#80B5E8]">
              <Mail aria-hidden className="size-5 text-[#80B5E8]" /> {site.supportEmail}
            </a>
            <a href={site.phoneHref} className="mt-2.5 flex items-center gap-3 text-[16.5px] font-semibold text-white hover:text-[#80B5E8]">
              <Phone aria-hidden className="size-5 text-[#80B5E8]" /> {site.phone}
            </a>
            <p className="mt-4 text-[14px] text-white/70">We typically respond within 2 business days.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[28px] border border-[#D8E8F8] bg-white p-7 shadow-[0_30px_70px_rgba(18,61,106,.14)] sm:p-12">
            <h2 id="contact-title" className="font-display text-[30px] font-extrabold text-[#123D6A] sm:text-[36px]">
              Contact Us
            </h2>
            <p className="mt-3 mb-9 text-[17px] text-[#5B6B80]">We’d love to hear from you. Please fill out the form and we’ll get back to you as soon as possible.</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
