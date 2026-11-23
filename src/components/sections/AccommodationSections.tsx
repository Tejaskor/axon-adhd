import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, FileText, GraduationCap, ShieldCheck, Stethoscope, TrendingUp, Users, Award, FlaskConical, ClipboardList, Mail, Info, Timer, CalendarDays, HandHeart, Sparkles, Star, ChartColumn, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { links, site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { trustBar } from "@/content/trust";
import type { CtaSection } from "@/content/pages/types";
import { GradientCtaBanner } from "./GradientCtaBanner";
import { PathCard } from "./AdhdCareSections";

/**
 * Accommodation & Advocacy page sections. Blue (#2578CA and shades) leads; green and orange appear only as small accents.
 * Copy is limited to what the existing service page already states (price, inclusions, audiences, eligibility).
 */

export const wrap = "mx-auto w-full max-w-[1372px] px-4";
const wrapWide = "mx-auto w-full max-w-[1372px] px-4";
export const h2 = "type-h2 text-balance text-navy";
export const lead = "text-[17px] leading-[1.75] text-pretty text-[#44566E] sm:text-[19px]";
export const primaryBtn = "bg-primary! text-white! shadow-[0_8px_20px_rgba(37,120,202,.28)]! hover:bg-primary-600!";
export const lightBtn = "bg-white! text-primary-600! shadow-[0_8px_24px_rgba(8,32,64,.22)]! hover:bg-[#E8F2FC]!";

const checkout = links.accommodationCheckout;
const ctaLabel = "Explore Accommodation Support";

export function Arrow() {
  return <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />;
}
Arrow.displayName = "Arrow"; // read by ArrowFillContent so minified builds still recognise it

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
                  <p className={cn("text-[12px] font-semibold", done ? "text-[#197D29]" : "text-[#2B6BD0]")}>{step.kicker}</p>
                  <p className="mt-0.5 text-[14px] leading-snug text-[#1C2430] sm:text-[15px]">{step.title}</p>
                  <p className="mt-0.5 text-[14px] leading-snug text-[#7A828E]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 flex flex-col gap-2.5 rounded-lg bg-[linear-gradient(100deg,#2B3A3E_0%,#355459_55%,#3FADC6_100%)] px-4 py-3 text-white shadow-[0_10px_24px_-12px_rgba(31,110,130,.6)] sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="min-w-0">
            <p className="text-[14px] font-medium sm:text-[15px]">Accommodation Document &amp; Advocacy</p>
            <p className="mt-0.5 text-[13px] leading-snug text-white/85">Specialized report, personalized recommendations &amp; functional impairment documentation</p>
          </div>
          <p className="shrink-0 sm:text-right">
            <span className="inline-flex items-start font-display text-[28px] leading-none font-semibold">
              <span className="mt-0.5 mr-0.5 text-[12px] font-normal">$</span>250
            </span>
            <span className="mt-0.5 block text-[12px] text-white/80">Price includes taxes.</span>
          </p>
        </div>

        <div className="mt-3 flex items-start gap-3 rounded-lg bg-[#FFF5D6] px-4 py-3">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-[#1C2430]" />
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-[#1C2430]">Why is this an optional add-on?</p>
            <p className="mt-0.5 text-[13px] leading-snug text-pretty text-[#3B4452]">Preparing accommodations documentation requires additional clinical analysis, report creation, and form completion. It’s an optional service for those who plan to request accommodations.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-[#EEF0F3] px-4 py-2.5 sm:px-5">
        <ButtonLink href={checkout} size="sm" className="group gap-1.5 rounded-[50px]! bg-[linear-gradient(90deg,#2F6B78,#3A9BB1)]! px-4! text-[12.5px]! text-white! shadow-none! hover:brightness-110">
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
    <section aria-labelledby="page-title" className="relative -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(115deg,#F4F7FF_0%,#E8EDFF_48%,#E6E0FF_100%)] section-hero-py">
      <div className={cn(wrapWide, "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14")}>
        <div className="min-w-0">
          <h1 id="page-title" className="type-h1 text-navy text-balance lg:[text-wrap:wrap]">
            Accommodation <span className="text-[#2578CA]">Documentation &amp; Advocacy</span>
          </h1>
          <p className="mt-6 max-w-[640px] text-[20px] leading-[1.7] text-pretty text-[#242A3C]">
            You’ve completed your Comprehensive ADHD Evaluation. Let us turn your diagnostic findings into professional documentation that supports requests for academic, standardized testing, and workplace accommodations.
          </p>
          <p className="mt-8 max-w-[640px] rounded-[10px] border-l-2 border-[#1E3E6D] bg-white px-4 py-4 text-[15px] leading-relaxed text-[#0B2A5A] sm:px-5">
            Available exclusively for individuals who have completed an AXON Comprehensive ADHD Evaluation. Accommodation decisions are made by each institution.
          </p>
          <div className="mt-7">
            <ButtonLink href={checkout} size="lg" className="group w-full gap-2 bg-[#256ACC]! px-4! text-white! shadow-none! hover:bg-[#1E5BB4]! sm:w-auto">
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
  { title: "How ADHD impacts", text: "your academic and testing performance", icon: GraduationCap, tone: "blue" },
  { title: "Which accommodations", text: "are medically appropriate", icon: ClipboardList, tone: "green" },
  { title: "The objective data", text: "supporting those recommendations", icon: TrendingUp, tone: "orange" },
] as const;

/** "Not Another Evaluation.": centred heading and intro over three equal PathCards (same design as the ADHD Care page's cards). */
export function AccommodationBenefits() {
  return (
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] section-py" aria-labelledby="more-title">
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <Reveal className="mx-auto max-w-[1340px] text-center">
          <h2 id="more-title" className="type-h2 text-navy text-balance">
            Not Another <span className="text-[#2578CA]">Evaluation.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[1300px] text-[20px] leading-[1.7] text-balance text-[#5B6B80]">
            This specialized report is based on your completed AXON Comprehensive ADHD Evaluation. Using the testing, clinical interviews, and documented functional impacts, we develop personalized recommendations tailored to your needs. Its purpose is to support your accommodation requests, not repeat your completed ADHD evaluation.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-14 lg:gap-6">
          {benefits.map((b, i) => (
            <li key={b.title} className="flex">
              <Reveal delay={i * 0.06} className="flex w-full">
                <PathCard tone={b.tone} icon={<b.icon className="size-7" strokeWidth={1.9} />} title={b.title} text={b.text} />
              </Reveal>
            </li>
          ))}
        </ul>
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
          <p className="mt-6 text-[12px] font-semibold tracking-[0.14em] text-[#2578CA] uppercase">Individualized report</p>
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
    <section id="package" className="scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! section-py" aria-labelledby="package-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 id="package-title" className={h2}>
            Your Accommodation{" "}
            <span className="relative inline-block text-primary">
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

const whyBanner: CtaSection = {
  type: "cta",
  title: "Why Consider Accommodation Support?",
  subtitle:
    "Not everyone diagnosed with ADHD needs formal accommodations. For those who plan to request them from a school, testing organization, licensing board, or employer, documentation prepared by your evaluating psychologist helps organize the relevant information and communicate your needs clearly.",
  primary: { label: ctaLabel, href: checkout },
};

/** Same banner as the ADHD Care page's "Haven't Started Yet?" (blue gradient, doodle pattern, logos, darker wash behind the copy) with the add-on card on the right. */
export function AccommodationFeatureBanner() {
  return (
    <GradientCtaBanner
      data={whyBanner}
      accent="Accommodation Support?"
      titleId="why-title"
      plain
      scrim
      aside={
        <div className="rounded-[24px] border border-white/25 bg-[#123F83]/55 p-8 backdrop-blur-md sm:p-10">
          <p className="text-[20px] leading-[1.7] text-white/92">Prepared by the psychologist who completed your Comprehensive ADHD Evaluation.</p>
          <ButtonLink href={checkout} size="lg" variant="white" className="group mt-6 w-full whitespace-normal">
            {ctaLabel}
            <Arrow />
          </ButtonLink>
          <p className="type-small mt-4 text-center text-white/80">Available after your evaluation</p>
        </div>
      }
    />
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
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] section-py" aria-labelledby="guidance-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 id="guidance-title" className={h2}>
            <span className="block">What Our Clinicians Do</span>
            <span className="relative inline-block text-primary">
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
            <div className="h-full rounded-[26px] shadow-[0_28px_64px_-24px_rgba(37,60,160,.35)]">
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
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] section-py" aria-labelledby="audience-title">
      <div className={cn(wrap, "grid items-center gap-10 md:grid-cols-[1.05fr_1fr] lg:gap-14")}>
        <div className="flex w-full max-w-[600px] flex-col">
          <Reveal>
            <h2 id="audience-title" className={h2}>
              <span className="relative inline-block">
                Who
                <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.18em] h-[0.18em] w-full text-[#0A4FF0]" fill="none">
                  <path d="M2 10 C 70 3, 190 3, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Is This <span className="text-primary">For?</span>
            </h2>
            <p className={cn(lead, "mt-5 text-[#33465E]")}>This service is ideal if you’re requesting accommodations for:</p>
          </Reveal>
          <ul className="mt-6 flex flex-col gap-3">
            {audiences.map((a, i) => (
              <PackageFeatureItem key={a.title} f={a} delay={i * 0.06} className="[&_div>div]:rounded-[18px] [&_div>div]:p-3.5 sm:[&_div>div]:p-4 [&_div>div>span:first-child]:size-12 [&_div>div>span:first-child_svg]:size-6 [&_div>div>span:nth-child(2)]:h-10" />
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="ml-auto w-full max-w-[540px] rounded-[36px] border-2 border-white/90 bg-[linear-gradient(165deg,#EAE4FB_0%,#F1EDFD_40%,#F8F6FF_100%)] p-6 shadow-[0_30px_70px_-30px_rgba(110,70,220,.35)] sm:p-6">
            <div className="flex items-start gap-4">
              <span aria-hidden className="relative grid size-[72px] shrink-0 place-items-center rounded-full bg-white text-[#7A2FE6] shadow-[0_14px_30px_-12px_rgba(122,47,230,.4)] sm:size-[80px]">
                <FileText className="size-8 sm:size-10" strokeWidth={1.5} />
                <ShieldCheck className="absolute right-3 bottom-3 size-5 rounded-full bg-white p-0.5 sm:size-6" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <span className="inline-block rounded-full bg-[#E2D4FA] px-3.5 py-0.5 text-[14px] font-bold text-[#7A1FE0]">Optional add-on</span>
                <h3 className="mt-2.5 font-display text-[clamp(20px,1.7vw,24px)] leading-[1.15] font-extrabold text-[#161B45]"><span className="block">Accommodation</span>Documentation &amp; Advocacy</h3>
                <p className="mt-2 max-w-[420px] text-[16px] leading-[1.5] text-[#5E6272]">Specialized documentation and support to help you get the accommodations you need.</p>
              </div>
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 pl-1">
              <span className="bg-[linear-gradient(180deg,#8B2FE8,#6A28D4)] bg-clip-text font-display text-[44px] leading-none font-extrabold text-transparent sm:text-[48px]">$250</span>
              <span aria-hidden className="h-8 w-px bg-[#CFC6E6]" />
              <span className="text-[15px] text-[#5E6272]">one-time · taxes included</span>
            </p>
            <p className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-white/80 bg-[#E8E0FA] px-4 py-3 text-[14px] leading-snug text-[#3A3F58]">
              <Info aria-hidden className="size-6 shrink-0 text-[#7A2FE6]" strokeWidth={1.7} />
              Available only after completion of an AXON Comprehensive ADHD Evaluation.
            </p>
            <h4 className="mt-4 pl-1 font-display text-[19px] font-extrabold text-[#161B45]">What’s Included:</h4>
            <ul className="mt-2.5 space-y-2 pl-1">
              {summaryIncludes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-[#161B45]">
                  <CheckCircle2 aria-hidden className="size-6 shrink-0 fill-[#9A6CEA] text-white" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Plain link, not ButtonLink: the shared button forces the site's blue, and this card follows its own lavender/violet design. */}
            <a
              href={checkout}
              className="group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border-2 border-white/80 bg-[linear-gradient(90deg,#8040EA,#6B2BD6)] px-5 py-2.5 text-center leading-snug text-[clamp(14px,1.05vw,15px)] font-medium text-white shadow-[0_14px_28px_-10px_rgba(110,43,214,.6)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Add AXON Accommodation &amp; Advocacy Package
              <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </a>
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
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_85%_15%,rgba(8,122,145,.35),transparent_55%),linear-gradient(115deg,#063653_0%,#064766_52%,#075A70_100%)] text-center text-white section-py"
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
        <h2 id="cta-title" className="type-h2 mx-auto max-w-[900px] text-balance lg:max-w-none lg:whitespace-nowrap">
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
  // Same glass card + field styling as the homepage contact section.
  "rounded-[28px] border border-white/80 bg-white/70 p-6 shadow-[0_24px_60px_rgba(37,120,202,.12),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl sm:p-8",
  "[&_form]:gap-4 [&_label]:text-[14px] [&_label]:font-semibold [&_label]:text-navy",
  "[&_input:not([type=tel])]:rounded-[16px] [&_textarea]:rounded-[16px] [&_input:not([type=tel])]:border-[#D1D1D6] [&_textarea]:border-[#D1D1D6] [&_input]:py-2.5 [&_textarea]:min-h-[120px]",
  "[&_form>button[type=submit]]:w-full [&_form>button[type=submit]]:justify-self-stretch",
  "[&_form>p:last-child]:text-center [&_form>p:last-child]:text-[14px] [&_form>p:last-child]:text-[#4B5B73]",
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
  left,
}: { eyebrow?: string | null; description?: string; compact?: boolean; /** Replaces the whole left column (the ADHD Referral for Universities page shows its own headline and photo there). */ left?: ReactNode } = {}) {
  const s = contactSizes[compact ? "compact" : "regular"];
  return (
    <section id="contact" className={cn("scroll-mt-[var(--header-offset)] bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)]!", s.section)} aria-labelledby="contact-title">
      <div className={cn(wrap, "grid items-center md:grid-cols-[1fr_1fr]", s.grid)}>
        {left ?? (
        <Reveal>
          {eyebrow && (
            <p className="flex items-center gap-3 text-[14px] font-medium tracking-[0.2em] text-primary uppercase">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {eyebrow}
            </p>
          )}
          <h2 className={cn("type-h2 text-navy text-balance", s.title, eyebrow && "mt-5")}>Get your ADHD care right.</h2>
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
        )}
        <Reveal delay={0.1}>
          <div className={cn(contactFormSkin, !!left && "bg-white/80 sm:rounded-[44px] sm:p-10 sm:shadow-[0_40px_90px_-40px_rgba(37,120,202,.35)] [&_form]:gap-5")}>
            <h2 id="contact-title" className={"type-h2 text-center text-navy"}>
              Contact Us
            </h2>
            <p className="mt-3 mb-6 text-[16px] leading-relaxed text-[#4B5B73]">{"We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible."}</p>
            <ContactForm placeholders submitArrow={false} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
