import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, FileText, GraduationCap, ShieldCheck, Stethoscope, TrendingUp, Users, Award, FlaskConical, ClipboardList, Mail, Info, Timer, CalendarDays, HandHeart, Sparkles, Star, ChartColumn, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { links, site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { trustBar } from "@/content/trust";

/**
 * Accommodation & Advocacy page sections. Blue (#2578CA and shades) leads; green and orange appear only as small accents.
 * Copy is limited to what the existing service page already states (price, inclusions, audiences, eligibility).
 */

export const wrap = "mx-auto w-full max-w-[1372px] px-4";
const wrapWide = "mx-auto w-full max-w-[1372px] px-4";
export const h2 = "type-section font-display leading-[1.1] tracking-[-0.025em] text-balance text-[#123D6A]";
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

/** Hero visual: one white report card: tag, title, three-step journey, teal price bar, optional add-on note, Add Package footer. */
function ReportPreview() {
  return (
    <div className="mx-auto w-full max-w-[700px] rounded-2xl border border-[#EEF0F3] bg-white shadow-[0_24px_60px_-28px_rgba(11,37,75,.3)] lg:max-w-none">
      <div className="p-4 sm:p-5 lg:p-5">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#8EAFDA] px-2.5 py-0.5 text-[11px] font-medium text-[#2B6BD0]">
          <Sparkles aria-hidden className="size-3" />
          Optional Add-On Service
        </p>
        <h3 className="mt-2.5 text-[clamp(17px,1.6vw,20px)] leading-snug font-bold text-[#0E1726]">AXON Academic Performance &amp; Accommodations Report™</h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#636B78]">Professional documentation support for academic testing, school accommodations, and workplace ADA needs — built from your existing AXON Full Evaluation findings.</p>

        <ol aria-label="Your ADHD care journey" className="mt-4">
          {journey.map((step, i) => {
            const done = step.state === "done";
            const last = i === journey.length - 1;
            return (
              <li key={step.kicker} className={cn("relative flex items-start gap-3.5", !last && "pb-3.5")}>
                {!last && <span aria-hidden className={cn("absolute top-9 -bottom-0 left-[16px] w-0.5 -translate-x-1/2", i === journey.length - 2 ? "bg-gradient-to-b from-[#197D29] to-[#2B6BD0]" : "bg-[#197D29]")} />}
                <span aria-hidden className={cn("relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-white", done ? "bg-[#197D29]" : "bg-[#2B6BD0]")}>
                  {done ? <Check className="size-4" strokeWidth={3} /> : <span className="text-[14px] font-bold">{i + 1}</span>}
                </span>
                <div className="min-w-0">
                  <p className={cn("text-[11px] font-semibold", done ? "text-[#197D29]" : "text-[#2B6BD0]")}>{step.kicker}</p>
                  <p className="mt-0.5 text-[14px] leading-snug text-[#1C2430] sm:text-[15px]">{step.title}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-[#7A828E]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 flex flex-col gap-2.5 rounded-lg bg-[linear-gradient(100deg,#2B3A3E_0%,#355459_55%,#3FADC6_100%)] px-4 py-3 text-white shadow-[0_10px_24px_-12px_rgba(31,110,130,.6)] sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="min-w-0">
            <p className="text-[14px] font-medium sm:text-[15px]">Accommodation Document &amp; Advocacy</p>
            <p className="mt-0.5 text-[11px] leading-snug text-white/85">Specialized report, personalized recommendations &amp; functional impairment documentation</p>
          </div>
          <p className="shrink-0 sm:text-right">
            <span className="inline-flex items-start font-display text-[28px] leading-none font-semibold">
              <span className="mt-0.5 mr-0.5 text-[12px] font-normal">$</span>250
            </span>
            <span className="mt-0.5 block text-[10px] text-white/80">Price includes taxes.</span>
          </p>
        </div>

        <div className="mt-3 flex items-start gap-3 rounded-lg bg-[#FFF5D6] px-4 py-3">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-[#1C2430]" />
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-[#1C2430]">Why is this an optional add-on?</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-pretty text-[#3B4452]">Preparing accommodations documentation requires additional clinical analysis, report creation, and form completion. It’s an optional service for those who plan to request accommodations.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-[#EEF0F3] px-4 py-2.5 sm:px-5">
        <ButtonLink href={checkout} size="sm" className="group gap-1.5 rounded-md! bg-[linear-gradient(90deg,#2F6B78,#3A9BB1)]! px-4 text-[12.5px]! text-white! shadow-none! hover:brightness-110">
          Add Package &amp; Continue
          <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </div>
  );
}

export function AccommodationHero() {
  const [helpedLead, helpedTail] = trustBar.helped.split(/(?<=Helped) /);
  return (
    // Pulled up behind the floating header, on a pale blue-to-lavender gradient.
    <section aria-labelledby="page-title" className="relative -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(115deg,#F4F7FF_0%,#E8EDFF_48%,#E6E0FF_100%)] pt-[calc(var(--header-height)+32px)] pb-14 sm:pb-16 lg:pt-[calc(var(--header-height)+40px)] lg:pb-20">
      <div className={cn(wrapWide, "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14")}>
        <div className="min-w-0">
          <h1 id="page-title" className="font-display text-[clamp(32px,4.4vw,48px)] leading-[1.3] font-medium tracking-[-0.01em] text-balance text-[#2B3238]">
            Accommodation Documentation &amp; Advocacy
          </h1>
          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.75] text-pretty text-[#5F6672] sm:text-[19px]">
            You’ve completed your Comprehensive ADHD Evaluation. Let us turn your diagnostic findings into professional documentation that supports requests for academic, standardized testing, and workplace accommodations.
          </p>
          <p className="mt-8 max-w-[640px] rounded-[10px] border-l-2 border-[#1E3E6D] bg-white px-4 py-4 text-[15px] leading-relaxed text-[#0B2A5A] sm:px-5">
            Available exclusively for individuals who have completed an AXON Comprehensive ADHD Evaluation. Accommodation decisions are made by each institution.
          </p>
          <div className="mt-7">
            <ButtonLink href={checkout} size="lg" className="group h-14 w-full gap-2 bg-[#256ACC]! px-7! text-white! shadow-none! hover:bg-[#1E5BB4]! sm:w-auto">
              {ctaLabel}
              <Arrow />
            </ButtonLink>
          </div>
          <ul aria-label="Why people trust AXON ADHD" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <li className="flex items-center gap-3">
              <Image src={trustBar.google.src} alt={trustBar.google.alt} width={44} height={44} className="size-11" />
              <span className="flex flex-col gap-1">
                <span className="flex gap-1 text-[#F5B400]" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-[18px] fill-current" strokeWidth={0} />
                  ))}
                </span>
                <span className="text-[15px] text-[#3B4452]">
                  <strong className="font-semibold">{trustBar.rating}</strong> <span className="text-[#7A828E]">{trustBar.reviews}</span>
                  <span className="sr-only"> on Google</span>
                </span>
              </span>
            </li>
            <li aria-hidden className="hidden h-12 w-px bg-[#CFDCEC] sm:block" />
            <li className="flex items-center gap-4">
              <span className="flex -space-x-3">
                {trustBar.avatars.map((av) => (
                  <Image key={av.src} src={av.src} alt="" width={44} height={44} className="size-11 rounded-full border-[3px] border-white object-cover shadow-[0_4px_12px_rgba(11,37,75,.15)]" />
                ))}
              </span>
              <span className="leading-snug">
                <span className="block text-[18px] font-medium text-[#1C2430]">{helpedLead}</span>
                {helpedTail && <span className="block text-[17px] text-[#3B4452]">{helpedTail}</span>}
              </span>
            </li>
          </ul>
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
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-14 sm:py-16 lg:py-20" aria-labelledby="more-title">
      <div className="mx-auto grid w-full max-w-[1372px] items-center gap-10 px-4 md:grid-cols-[44fr_56fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Beyond your diagnosis</Eyebrow>
          <h2 id="more-title" className="type-section mt-5 font-display leading-[1.08] tracking-[-0.025em] text-balance text-[#123768]">
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

type PackageFeature = { title: string; text: string; icon: typeof FileText; tile: string; card: string; divider?: string };

const packageLeft: PackageFeature[] = [
  { title: "Individualized accommodations report", text: "A separate report prepared specifically for accommodation requests.", icon: FileText, tile: "bg-[#E3EFFC] text-[#1766D6]", card: "border-[#D3E3F8] bg-[linear-gradient(120deg,rgba(231,241,254,.9),rgba(255,255,255,.7))]" },
  { title: "Professional review by your evaluating psychologist", text: "Prepared and reviewed by the clinician who knows your case.", icon: Stethoscope, tile: "bg-[#DDF7EF] text-[#12998A]", card: "border-[#CDEFE3] bg-[linear-gradient(120deg,rgba(228,247,240,.9),rgba(255,255,255,.7))]" },
  { title: "Evidence-based rationale", text: "Tied directly to your evaluation findings.", icon: ShieldCheck, tile: "bg-[#FFE8EC] text-[#E5303A]", card: "border-[#F6D5DA] bg-[linear-gradient(120deg,rgba(255,236,239,.9),rgba(255,255,255,.7))]" },
];

const packageRight: PackageFeature[] = [
  { title: "Objective data supporting each recommendation", text: "Findings from your testing linked to what is recommended.", icon: FlaskConical, tile: "bg-[#FFEBCB] text-[#EB8B01]", card: "border-[#F7E1BE] bg-[linear-gradient(120deg,rgba(255,243,224,.9),rgba(255,255,255,.7))]" },
  { title: "Functional impairment analysis", text: "How ADHD affects your academic or work performance.", icon: TrendingUp, tile: "bg-[#EEE9FF] text-[#6D4AE0]", card: "border-[#E0D8F8] bg-[linear-gradient(120deg,rgba(240,235,255,.9),rgba(255,255,255,.7))]" },
  { title: "Assistance completing required forms", text: "Support with institution-specific accommodation forms.", icon: ClipboardList, tile: "bg-[#E3EFFC] text-[#1766D6]", card: "border-[#D3E3F8] bg-[linear-gradient(120deg,rgba(231,241,254,.9),rgba(255,255,255,.7))]" },
];

const packageInstitutions: PackageFeature = {
  title: "Appropriate for a range of institutions",
  text: "Colleges, universities, licensing boards, testing agencies, and employers.",
  icon: GraduationCap,
  tile: "bg-[#E3EFFC] text-[#1766D6]",
  card: "border-[#DCD6F6] bg-[linear-gradient(120deg,rgba(238,234,255,.9),rgba(255,255,255,.7))]",
};

/** One feature card: icon tile, thin divider, then title and text. Same orientation on both sides. */
function PackageFeatureItem({ f, delay, className }: { f: PackageFeature; delay: number; className?: string }) {
  return (
    <li className={cn("relative z-10 flex", className)}>
      <Reveal delay={delay} className="flex w-full">
        <div className={cn("flex w-full items-center gap-4 rounded-[22px] border p-4 shadow-[0_14px_34px_-20px_rgba(37,120,202,.4)] backdrop-blur-sm sm:p-5", f.card)}>
          <span aria-hidden className={cn("grid size-14 shrink-0 place-items-center rounded-2xl shadow-[0_8px_18px_-8px_rgba(37,120,202,.3)] sm:size-16", f.tile)}>
            <f.icon className="size-7 sm:size-8" strokeWidth={1.75} />
          </span>
          <span aria-hidden className={cn("h-12 w-px shrink-0 sm:h-14", f.divider ?? "bg-[#1677ED]/20")} />
          <div className="min-w-0">
            <h3 className="text-[16px] leading-snug font-bold text-[#0B1F4D] sm:text-[17px]">{f.title}</h3>
            <p className="mt-1 text-[14px] leading-snug text-[#44566E] sm:text-[15px]">{f.text}</p>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

/** Report-cover mockup: a stack of pages on soft circles. */
function PackageDocument() {
  return (
    <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center py-8 md:py-0">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#E5E3FF_0%,#E8EEFF_62%,rgba(232,238,255,.4)_100%)] sm:size-[350px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9E4FB]/70 sm:size-[280px]" />

      <div className="relative w-[200px] sm:w-[230px]">
        <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-2.5 rotate-[3deg] rounded-[16px] bg-white/80 shadow-[0_14px_30px_-12px_rgba(18,59,112,.3)]" />
        <span aria-hidden className="absolute inset-0 translate-x-2 translate-y-1 rotate-[1.5deg] rounded-[16px] bg-white/90 shadow-[0_14px_30px_-12px_rgba(18,59,112,.3)]" />
        <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] border border-white bg-white p-5 shadow-[0_30px_60px_-20px_rgba(18,59,112,.4)] transition-transform duration-300 hover:-translate-y-1 sm:p-6">
          <Image src={site.headerLogo.src} alt="AXON ADHD" width={site.headerLogo.width} height={site.headerLogo.height} className="h-6 w-auto sm:h-7" />
          <p className="mt-6 text-[10px] font-semibold tracking-[0.14em] text-[#2578CA] uppercase">Individualized report</p>
          <h3 className="mt-2 text-[19px] leading-[1.2] font-bold text-[#0B1F4D] sm:text-[21px]">Accommodation Documentation Package</h3>
          <div aria-hidden className="mt-3 space-y-1.5">
            <span className="block h-1 w-[60%] rounded-full bg-[#2578CA]/15" />
            <span className="block h-1 w-[42%] rounded-full bg-[#2578CA]/10" />
          </div>
          <svg aria-hidden viewBox="0 0 240 110" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[34%] w-full">
            <defs>
              <linearGradient id="pkg-wave" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8CC2FF" />
                <stop offset="1" stopColor="#2578CA" />
              </linearGradient>
            </defs>
            <path d="M0 70C40 40 80 20 130 24S210 10 240 0V110H0Z" fill="url(#pkg-wave)" opacity=".85" />
            <path d="M60 110C90 70 150 60 240 40V110Z" fill="#1E64AA" opacity=".55" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function DocumentationPackage() {
  return (
    <section id="package" className="scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-16 sm:py-20 lg:py-24" aria-labelledby="package-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[#B9D0F3] bg-white/55 px-5 py-2 text-[14px] font-semibold text-[#0A4FF0] sm:text-[16px]">
            <GraduationCap aria-hidden className="size-5" strokeWidth={1.75} />
            Accommodation Support
          </p>
          <h2 id="package-title" className={cn(h2, "mt-5 text-[#0B1F4D]")}>
            Your Accommodation{" "}
            <span className="relative inline-block text-[#3B2DC7]">
              Documentation Package
              <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[8%] -bottom-[0.18em] h-[0.18em] w-[84%]" fill="none">
                <path d="M2 10 C 70 3, 190 3, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className={cn(lead, "mt-5 text-[#33465E]")}>Everything an institution needs to evaluate your request, prepared and reviewed by the psychologist who knows your case.</p>
        </Reveal>

        <div className="mt-10 grid items-center gap-8 md:grid-cols-[1fr_260px_1fr] md:gap-x-5 lg:mt-12 lg:grid-cols-[1fr_340px_1fr] lg:gap-x-8">
          <ul className="order-2 grid gap-4 md:order-none md:h-full md:grid-rows-3">
            {packageLeft.map((f, i) => (
              <PackageFeatureItem key={f.title} f={f} delay={i * 0.06} />
            ))}
          </ul>
          <div className="order-1 md:order-none">
            <PackageDocument />
          </div>
          <ul className="order-3 grid gap-4 md:order-none md:h-full md:grid-rows-3">
            {packageRight.map((f, i) => (
              <PackageFeatureItem key={f.title} f={f} delay={0.18 + i * 0.06} />
            ))}
          </ul>
        </div>

        <ul className="mx-auto mt-6 flex max-w-[880px] justify-center md:mt-8">
          <PackageFeatureItem f={packageInstitutions} delay={0} className="w-full [&>div>div]:rounded-[32px]" />
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

const guidance: PackageFeature[] = [
  { title: "Analyze Your Evaluation", text: "Through the lens of functional impairment.", icon: ChartColumn, tile: "bg-[#E3EFFC] text-[#1766D6]", card: "border-[#D3E3F8] bg-[linear-gradient(120deg,rgba(231,241,254,.9),rgba(255,255,255,.7))]" },
  { title: "Prepare an Individualized Report", text: "A separate, detailed accommodations report.", icon: FileText, tile: "bg-[#EEE9FF] text-[#6D4AE0]", card: "border-[#E0D8F8] bg-[linear-gradient(120deg,rgba(240,235,255,.9),rgba(255,255,255,.7))]" },
  { title: "Identify Appropriate Accommodations", text: "Supported by objective findings.", icon: CircleCheck, tile: "bg-[#DDF7EF] text-[#12998A]", card: "border-[#CDEFE3] bg-[linear-gradient(120deg,rgba(228,247,240,.9),rgba(255,255,255,.7))]" },
  { title: "Complete Required Forms & Documentation", text: "All institution-specific forms and supporting materials.", icon: ClipboardList, tile: "bg-[#FFEBCB] text-[#EB8B01]", card: "border-[#F7E1BE] bg-[linear-gradient(120deg,rgba(255,243,224,.9),rgba(255,255,255,.7))]" },
];

/** Where each card sits from lg: the four cards flank the photo, two per side (reading order stays 1-4 on mobile). */
const guidancePlace = ["lg:col-start-1 lg:row-start-1", "lg:col-start-3 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-3 lg:row-start-2"] as const;

/** Centred heading, then the photo in a white frame between four centred, tinted feature cards (two each side). */
export function ClinicianGuidance() {
  return (
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-16 sm:py-20 lg:py-24" aria-labelledby="guidance-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[900px] text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[#B9D0F3] bg-white/55 px-5 py-2 text-[14px] font-semibold text-[#0A4FF0] sm:text-[16px]">
            <Users aria-hidden className="size-5" strokeWidth={1.75} />
            Expert Clinical Support
          </p>
          <h2 id="guidance-title" className={cn(h2, "mt-5 text-[#0B1F4D]")}>
            <span className="block">What Our Clinicians Do</span>
            <span className="relative inline-block text-[#3B2DC7]">
              for This Package
              <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[20%] -bottom-[0.18em] h-[0.18em] w-[60%]" fill="none">
                <path d="M2 10 C 70 3, 190 3, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className={cn(lead, "mx-auto mt-5 max-w-[760px] text-[#33465E]")}>Beyond your existing report, each package requires dedicated professional work:</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[0.9fr_1.5fr_0.9fr] lg:grid-rows-2 lg:gap-6">
          <Reveal delay={0.05} className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="h-full rounded-[34px] border border-white/90 bg-white/70 p-2.5 shadow-[0_28px_64px_-24px_rgba(37,60,160,.35)] sm:p-3">
              <Image
                src="/images/services/Whatour.webp"
                alt="Clinician at a desk in an office reviewing printed evaluation reports and writing notes beside a monitor"
                width={2540}
                height={1448}
                sizes="(max-width: 1023px) 100vw, 600px"
                className="aspect-[16/11] w-full rounded-[26px] object-cover object-center lg:aspect-auto lg:h-full"
              />
            </div>
          </Reveal>
          {guidance.map((g, i) => (
            <Reveal key={g.title} delay={0.1 + i * 0.06} className={cn("flex", guidancePlace[i])}>
              <div className={cn("flex w-full flex-col items-center justify-center rounded-[26px] border px-5 py-5 text-center shadow-[0_14px_34px_-20px_rgba(37,120,202,.4)] backdrop-blur-sm sm:px-6", g.card)}>
                <span aria-hidden className={cn("grid size-14 place-items-center rounded-2xl shadow-[0_8px_18px_-8px_rgba(37,120,202,.3)] lg:size-12", g.tile)}>
                  <g.icon className="size-7 lg:size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-3 max-w-[280px] text-[17px] leading-snug font-bold text-balance text-[#0B1F4D] sm:text-[18px]">{g.title}</h3>
                <p className="mt-1.5 max-w-[260px] text-[15px] leading-snug text-balance text-[#44566E]">{g.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
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

const audienceCard = "border-white/80 bg-white/85";
const audiences: PackageFeature[] = [
  { title: "College & University", text: "Disability services and campus accommodations.", icon: GraduationCap, tile: "bg-[#E3EFFC] text-[#1766D6]", card: audienceCard, divider: "bg-[#1766D6]" },
  { title: "Standardized Exams", text: "MCAT, LSAT, GRE, GMAT, SAT, ACT, Bar Exam, NCLEX, and more.", icon: FileText, tile: "bg-[#EEE9FF] text-[#6D4AE0]", card: audienceCard, divider: "bg-[#6D4AE0]" },
  { title: "Workplace (ADA)", text: "Accommodations under the Americans with Disabilities Act.", icon: Users, tile: "bg-[#DDF7EF] text-[#12998A]", card: audienceCard, divider: "bg-[#12B07B]" },
  { title: "Licensing & Certification", text: "Professional certification and licensing examinations.", icon: Award, tile: "bg-[#FFEBCB] text-[#EB8B01]", card: audienceCard, divider: "bg-[#EB8B01]" },
];

/** "Who Is This For?": the four audiences on the left, the package summary card (price, inclusions, button) on the right. */
export function ServiceAudience() {
  return (
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-16 sm:py-20 lg:py-24" aria-labelledby="audience-title">
      <div className={cn(wrap, "grid items-center gap-10 md:grid-cols-[1.05fr_1fr] lg:gap-14")}>
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-[#B9D0F3] bg-white/55 px-5 py-2 text-[14px] font-semibold text-[#0A4FF0] sm:text-[16px]">
              <Users aria-hidden className="size-5" strokeWidth={1.75} />
              Who It’s For
            </p>
            <h2 id="audience-title" className={cn(h2, "mt-5 text-[#0B1F4D]")}>
              <span className="relative inline-block">
                Who
                <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.18em] h-[0.18em] w-full text-[#0A4FF0]" fill="none">
                  <path d="M2 10 C 70 3, 190 3, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Is This <span className="text-[#0A4FF0]">For?</span>
            </h2>
            <p className={cn(lead, "mt-5 text-[#33465E]")}>This service is ideal if you’re requesting accommodations for:</p>
          </Reveal>
          <ul className="mt-7 space-y-3.5">
            {audiences.map((a, i) => (
              <PackageFeatureItem key={a.title} f={a} delay={i * 0.06} className="[&_div>div]:rounded-[20px]" />
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_30px_70px_-30px_rgba(11,37,75,.35)]">
            <div className="relative flex items-center gap-5 bg-[linear-gradient(110deg,#2B72D6_0%,#124C9F_55%,#0B3E8E_100%)] px-6 py-7 text-white sm:px-8">
              <span aria-hidden className="relative shrink-0">
                <FileText className="size-14 sm:size-16" strokeWidth={1.4} />
                <ShieldCheck className="absolute -right-2 -bottom-1 size-7 rounded-full bg-[#124C9F] p-0.5 sm:size-8" strokeWidth={1.8} />
              </span>
              <span aria-hidden className="h-16 w-px shrink-0 bg-white/30" />
              <div className="min-w-0">
                <h3 className="text-[clamp(20px,2.1vw,26px)] leading-tight font-semibold text-balance">Accommodation Documentation &amp; Advocacy</h3>
                <span className="mt-2.5 inline-block rounded-full bg-[#FFF1CC] px-3.5 py-1 text-[14px] font-bold text-[#B86E00]">Optional add-on</span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="flex flex-wrap items-center gap-x-4">
                <span className="font-display text-[52px] leading-none font-bold text-[#0A4FF0] sm:text-[60px]">$250</span>
                <span aria-hidden className="h-8 w-px bg-[#CFDCEC]" />
                <span className="text-[16px] text-[#5B6B80]">one-time · taxes included</span>
              </p>
              <p className="mt-5 flex items-center gap-3 rounded-xl bg-[#EAF1FC] px-4 py-3 text-[15px] leading-snug text-[#123D6A]">
                <Info aria-hidden className="size-6 shrink-0 text-[#1766D6]" strokeWidth={1.6} />
                Available only after completion of an AXON Comprehensive ADHD Evaluation.
              </p>
              <ul className="mt-6 space-y-3.5">
                {summaryIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-[16px] text-[#15243A]">
                    <CheckCircle2 aria-hidden className="size-6 shrink-0 fill-[#2B72D6] text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href={checkout} size="lg" className="group mt-8 h-14 w-full gap-2 bg-[#0A52C4]! text-white! shadow-[0_12px_26px_-10px_rgba(10,82,196,.6)]! whitespace-normal hover:bg-[#0846A6]!">
                Add AXON Accommodation &amp; Advocacy Package
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
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

      <Reveal className={wrap}>
        {/* Wide enough on desktop that the heading is one line, the paragraph two and the price note one. */}
        <h2 id="cta-title" className="type-section mx-auto max-w-[900px] font-display leading-[1.15] tracking-[-0.02em] text-balance lg:max-w-none lg:whitespace-nowrap">
          Ready to turn your diagnosis into documentation that works?
        </h2>
        <p className="type-lead mx-auto mt-6 max-w-[850px] text-pretty text-primary-100 lg:max-w-[1040px]">
          Your evaluation is done. Let your evaluating psychologist prepare the report, data, and forms that institutions actually accept and advocate for the accommodations you’re entitled to.
        </p>
        <div className="mx-auto mt-9 max-w-[968px] sm:mt-10">
          <ButtonLink
            href={checkout}
            size="lg"
            className="group w-full bg-white! whitespace-normal text-[#0F2F57]! shadow-[0_14px_34px_rgba(2,24,48,.35)]! transition-[background-color,box-shadow] duration-300 hover:bg-[#F4F9FF]! hover:shadow-[0_18px_42px_rgba(8,126,164,.40)]! sm:w-auto lg:whitespace-nowrap"
          >
            Add the Accommodation Documentation &amp; Advocacy Package
            <ArrowRight aria-hidden className="size-5 shrink-0 text-primary transition-transform duration-300 ease-brand group-hover:translate-x-1" strokeWidth={2.5} />
          </ButtonLink>
        </div>
        <p className="type-body mx-auto mt-6 max-w-[760px] text-primary-100 lg:max-w-none lg:whitespace-nowrap">$250 one-time · taxes included · available only after your Comprehensive ADHD Evaluation</p>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------- Latest blogs */

/* --------------------------------------------------------- Contact */

const contactPoints = [
  { title: "Take our FREE screening in seconds", icon: Timer, tile: "bg-[#E1EEFC] text-primary" },
  { title: "Get an official diagnosis in days", icon: CalendarDays, tile: "bg-[#DDF4F2] text-[#0E9AA0]" },
  { title: "Get treatment and support to help you thrive.", icon: HandHeart, tile: "bg-[#E1EEFC] text-primary" },
];


/** Form styling is scoped here (via the wrapper) so the shared form and input components stay untouched. */
/** Form card styling (matches the Contact Us reference): light grey card, grey labels, 8px fields, full-width pill submit. */
const contactFormSkin = [
  "rounded-[16px] border border-[#E2E5EA] bg-[#FBFBFB] p-6 shadow-[0_12px_36px_rgba(18,61,106,.08)] sm:p-7",
  "[&_form]:gap-4 [&_label]:text-[13px] [&_label]:font-medium [&_label]:text-[#4B5563]",
  "[&_input:not([type=tel])]:rounded-lg [&_textarea]:rounded-lg [&_input:not([type=tel])]:border-[#D1D5DB] [&_textarea]:border-[#D1D5DB] [&_input]:py-2.5 [&_textarea]:min-h-[108px]",
  "[&_button[type=submit]]:h-12 [&_button[type=submit]]:w-full [&_button[type=submit]]:rounded-[50px] [&_button[type=submit]]:bg-[#1A56A8] [&_button[type=submit]]:text-[16px] [&_button[type=submit]]:shadow-none [&_button[type=submit]:hover]:bg-[#164A91]",
  "[&_form>p:last-child]:text-center [&_form>p:last-child]:text-[13px] [&_form>p:last-child]:text-[#6B7280] [&_form>p:last-child_a]:font-normal [&_form>p:last-child_a]:text-primary [&_form>p:last-child_a]:no-underline [&_form>p:last-child_a:hover]:underline",
].join(" ");

/**
 * Size sets for the contact section. `cn` only joins classes (no conflict resolution), so `compact` swaps whole strings
 * instead of layering overrides: slightly smaller type and tighter spacing throughout.
 */
const contactSizes = {
  regular: {
    section: "py-16 sm:py-20 lg:py-24",
    grid: "gap-12 lg:gap-16",
    title: "type-section",
    description: "type-lead mt-5",
    list: "mt-8 space-y-4",
    tile: "size-14 sm:size-16 lg:size-[72px]",
    tileIcon: "size-7 sm:size-8",
    point: "type-lead",
    help: "mt-8 p-5 sm:gap-5 sm:p-6",
    mail: "size-14 sm:size-16",
    mailIcon: "size-7 sm:size-8",
    email: "type-lead",
  },
  compact: {
    section: "py-12 sm:py-16 lg:py-20",
    grid: "gap-10 lg:gap-12",
    title: "type-section",
    description: "type-body mt-4",
    list: "mt-6 space-y-3",
    tile: "size-12 sm:size-14 lg:size-[60px]",
    tileIcon: "size-6 sm:size-7",
    point: "type-body",
    help: "mt-6 p-4 sm:gap-4 sm:p-5",
    mail: "size-12 sm:size-14",
    mailIcon: "size-6 sm:size-7",
    email: "type-body",
  },
};

export function AccommodationContact({
  eyebrow = "LET'S TALK",
  description = "We provide comprehensive ADHD assessments for adults across Arlington, including Rosslyn, Clarendon, Ballston, and the 22209 area.",
  compact = false,
}: { eyebrow?: string | null; description?: string; compact?: boolean } = {}) {
  const s = contactSizes[compact ? "compact" : "regular"];
  return (
    <section id="contact" className={cn("scroll-mt-[var(--header-offset)] bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)]!", s.section)} aria-labelledby="contact-title">
      <div className={cn(wrap, "grid items-center md:grid-cols-[1fr_1fr]", s.grid)}>
        <Reveal>
          {eyebrow && (
            <p className="flex items-center gap-3 text-[14px] font-medium tracking-[0.2em] text-primary uppercase">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {eyebrow}
            </p>
          )}
          <h2 className={cn("font-display leading-[1.1] tracking-[-0.025em] text-balance text-[#0F2F5E]", s.title, eyebrow && "mt-5")}>Get your ADHD care right.</h2>
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
          <div className={contactFormSkin}>
            <h2 id="contact-title" className="text-[clamp(24px,2.2vw,28px)] leading-tight font-medium text-[#111827]">
              Contact Us
            </h2>
            <p className="mt-2 mb-6 text-[14.5px] leading-relaxed text-[#4B5563]">{"We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible."}</p>
            <ContactForm placeholders />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
