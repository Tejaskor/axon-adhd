import type { CSSProperties } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { ArrowRight, BriefcaseMedical, Brain, CheckCircle2, Clock, Coins, Frown, ChartColumn, GraduationCap, Handshake, HeartPulse, Lock, Quote, Shield, ShieldCheck, ShieldPlus, Star, Stethoscope, Target, TrendingDown, TrendingUp, TriangleAlert, Users } from "lucide-react";
import type { BadgesSection, CtaSection, FeatureItem, FeaturesSection, PageHero as PageHeroData, PageSection, QuotesSection, SplitSection, StepsSection, Tone } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustBar } from "@/content/trust";
import { cn } from "@/lib/utils";
import { AssessmentOverview } from "./AssessmentOverview";
import { StepsJourney } from "./StepsJourney";
import { WorkflowStack } from "./WorkflowStack";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { ContactSection } from "./ContactSection";
import { CTABand } from "./CTABand";
import { FAQAccordion } from "./FAQAccordion";
import { FreeAssessmentGlass } from "./FreeAssessmentGlass";
import { GlassQuotesCarousel } from "./GlassQuotesCarousel";
import { StackedQuotesCarousel } from "./StackedQuotesCarousel";
import { TealBanner } from "./TealBanner";
import { HowItWorksGlass } from "./HowItWorksGlass";
import { HeroVideoCard } from "./HeroVideoCard";
import { LatestBlogs } from "./LatestBlogs";
import { LogoMarquee } from "./LogoMarquee";
import { ReviewStrip } from "./ReviewStrip";
import { TrustBar } from "./TrustBar";

const toneClass: Record<Tone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  soft: "bg-primary-soft",
  navy: "bg-navy text-white",
};

const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4", 5: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5", 6: "sm:grid-cols-2 md:grid-cols-3" } as const;

function Ctas({ ctas, light, className }: { ctas?: Array<{ label: string; href: string }>; light?: boolean; className?: string }) {
  if (!ctas?.length) return null;
  return (
    <div className={cn("mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap", className)}>
      {ctas.map((cta, i) => (
        <ButtonLink key={cta.label} href={cta.href} variant={i === 0 ? (light ? "white" : "primary") : "outline"} size="lg" className="whitespace-normal text-center">
          {cta.label}
        </ButtonLink>
      ))}
    </div>
  );
}

/** Rounded blue gradient card; H1 + subtitle mirror the home `Hero` type scale. Stacks below md, gradient turns vertical so copy stays on the dark end. */
function BannerHero({ data }: { data: PageHeroData }) {
  // A lone CTA stays glass; with several, the first is the solid white primary.
  const solidFirst = data.ctas.length > 1;
  return (
    <section className="relative -mt-[var(--header-height)] pt-2 sm:pt-3" aria-labelledby="page-title">
      <div className="relative isolate overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#19528C_0%,#2578CA_55%,#86B6E5_100%)] pt-[120px] pb-12 sm:rounded-[28px] sm:pt-[130px] sm:pb-16 md:flex md:min-h-[640px] md:items-center md:bg-[linear-gradient(100deg,#19528C_0%,#2578CA_48%,#86B6E5_78%,#C9DEF4_100%)] md:pb-20 lg:rounded-[32px]">
        {/* Background spans the viewport; content (and the glow that tracks the image) is capped at 1440px. */}
        <div className="relative mx-auto w-full max-w-[1372px] px-4">
          {/* Soft light pool behind the image, like the reference's bright centre. */}
          <div aria-hidden className="absolute bottom-0 left-1/2 -z-10 size-[420px] -translate-x-1/2 translate-y-1/4 rounded-full bg-white/30 blur-3xl md:top-1/2 md:right-[2%] md:bottom-auto md:left-auto md:size-[620px] md:translate-x-0 md:-translate-y-1/2" />

          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="max-w-[600px]">
              {data.eyebrow && <p className="mb-3 text-[13px] font-semibold tracking-[0.14em] text-white/80 uppercase">{data.eyebrow}</p>}
              <h1 id="page-title" className="type-h1 text-balance text-white">
                {data.title}
              </h1>
              {data.text.map((t) => (
                <p key={t} className="type-lead mt-4 max-w-[560px] font-normal text-pretty text-white/90">
                  {t}
                </p>
              ))}
              {data.ctas.length > 0 && (
                <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:mt-10">
                  {data.ctas.map((cta, i) => (
                    <ButtonLink key={cta.label} href={cta.href} variant={solidFirst && i === 0 ? "white" : "glass"} size="lg" className={cn("group whitespace-normal", !(solidFirst && i === 0) && "cta-trace cta-trace-tricolor [--cta-trace-offset:1px]")}>
                      {cta.label}
                      <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </ButtonLink>
                  ))}
                </div>
              )}
              {data.note && <p className="type-small mt-3 text-white/75">{data.note}</p>}
              {data.trust && <TrustBar light />}
            </div>
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              priority
              sizes="(max-width: 767px) 300px, (max-width: 1023px) 420px, 560px"
              className="mx-auto h-auto w-full max-w-[300px] drop-shadow-[0_24px_40px_rgba(6,26,54,.28)] sm:max-w-[420px] md:max-w-[560px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Light hero that starts behind the floating header: pale blue ground with faint concentric rings, copy on the left (
 * heading with a blue accent, intro, two pill CTAs, Google rating · adults helped trust row) and a large video card on
 * the right. Content sits in the same 1340px box as the header; stacks below lg.
 */
function PhotoHero({ data }: { data: PageHeroData }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  const [helpedLead, helpedTail] = trustBar.helped.split(/(?<=Helped) /);
  return (
    // Pulled up behind the floating header (like the home hero), so the pale blue starts at the very top of the page.
    <section className="relative isolate -mt-[var(--header-height)] w-full overflow-hidden bg-[#E8F2FF] lg:flex lg:min-h-svh lg:items-center" aria-labelledby="page-title">
      {/* Faint rings centred behind the video card (decorative; hidden on phones). */}
      <svg aria-hidden viewBox="0 0 1000 1000" fill="none" className="pointer-events-none absolute top-1/2 right-[-6%] -z-10 hidden size-[min(1100px,90vw)] -translate-y-1/2 md:block">
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx="500" cy="500" r={150 + i * 42} stroke="#2578CA" strokeOpacity={0.1 - i * 0.008} strokeWidth="1.2" />
        ))}
      </svg>

      <div className="mx-auto grid w-full max-w-[1372px] gap-10 px-4 pt-[calc(var(--header-height)+32px)] pb-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-12 lg:pt-[calc(var(--header-height)+24px)] lg:pb-14">
        <div className="min-w-0">
          <h1 id="page-title" className="max-w-[760px] font-display text-[clamp(32px,5.2vw,50px)] leading-[1.14] font-bold tracking-[-0.025em] text-balance text-[#061836]">
            {after !== undefined ? (
              <>
                {before}
                <span className="text-[#004EAE]">{data.accent}</span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h1>
          {data.text.map((t) => (
            <p key={t} className="mt-6 max-w-[640px] text-[16px] leading-[1.6] text-pretty text-[#242A3C] sm:text-[18px] lg:text-[19px]">
              {t}
            </p>
          ))}
          {data.ctas.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {data.ctas.map((cta, i) => (
                <ButtonLink
                  key={cta.label}
                  href={cta.href}
                  size="lg"
                  className={cn(
                    "group h-14 gap-2 px-7! text-[16px]! font-medium whitespace-normal xl:whitespace-nowrap",
                    i === 0 ? "bg-[#0048AE]! text-white! shadow-[0_12px_26px_-8px_rgba(0,72,174,.55)]! hover:bg-[#003B91]!" : "border border-[#0648B4]! bg-white/70! text-[#003CAE]! shadow-none! hover:bg-white!",
                  )}
                >
                  {cta.label}
                  <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" strokeWidth={2.5} />
                </ButtonLink>
              ))}
            </div>
          )}
          {data.note && <p className="type-small mt-3 text-[#5B6B80]">{data.note}</p>}
          {data.trust && (
            <ul aria-label="Why people trust AXON ADHD" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
              <li className="flex items-center gap-3">
                <Image src={trustBar.google.src} alt={trustBar.google.alt} width={44} height={44} className="size-11" />
                <span className="flex flex-col gap-1">
                  <span className="flex gap-0.5 text-[#F5B400]" aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-[19px] fill-current" strokeWidth={0} />
                    ))}
                  </span>
                  <span className="text-[16px] text-[#242A3C]">
                    <strong className="font-semibold">{trustBar.rating}</strong> {trustBar.reviews}
                    <span className="sr-only"> on Google</span>
                  </span>
                </span>
              </li>
              <li aria-hidden className="hidden h-14 w-px bg-[#D2E3F9] sm:block" />
              <li className="flex items-center gap-3.5">
                <span className="flex -space-x-3">
                  {trustBar.avatars.map((av) => (
                    <Image key={av.src} src={av.src} alt="" width={44} height={44} className="size-11 rounded-full border-[3px] border-white object-cover shadow-[0_4px_12px_rgba(11,37,75,.15)]" />
                  ))}
                </span>
              </li>
              <li aria-hidden className="hidden h-14 w-px bg-[#D2E3F9] sm:block" />
              <li className="leading-snug">
                <span className="block text-[19px] font-bold text-[#00004E]">{helpedLead}</span>
                {helpedTail && <span className="block text-[18px] text-[#242A3C]">{helpedTail}</span>}
              </li>
            </ul>
          )}
        </div>
        {data.video && <HeroVideoCard id={data.video.id} title={data.video.title} className="mx-auto w-full max-w-[720px] lg:max-w-none" />}
      </div>
    </section>
  );
}

const glassCard = "border border-white shadow-[0_6px_18px_-8px_rgba(20,70,150,.18)]";

/** Partner logo on its own glass card. `multiply` drops the white boxes baked into some logo files so they sit on the glass. */
function NetworkLogoCard({ logo, className, style }: { logo: ImageAsset; className?: string; style?: CSSProperties }) {
  return (
    <div style={style} className={cn("isolate rounded-[14px] sm:rounded-[16px]", glassCard, className)}>
      <span aria-hidden className="absolute inset-0 -z-10 rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,.98),rgba(244,249,255,.96))]" />
      <Image src={logo.src} alt={logo.alt} fill sizes="260px" className="object-contain p-[3%_5%] mix-blend-multiply brightness-[1.06]" />
    </div>
  );
}

/** Hub: an open white-outlined circle with the serif label, or (`glow`) a bright disc with a soft halo and a people icon. */
function NetworkHub({ label, className, glow }: { label: string; className?: string; glow?: boolean }) {
  if (glow) {
    return (
      <div className={cn("@container relative flex flex-col items-center justify-center rounded-full border-[3px] border-white bg-[radial-gradient(circle_at_50%_30%,#FFFFFF,#EAF5FF_70%,#CFE8FD)] text-center shadow-[0_0_0_12px_rgba(255,255,255,.35),0_0_46px_8px_rgba(80,190,255,.45),0_24px_60px_-20px_rgba(20,90,200,.35)]", className)}>
        <Users aria-hidden className="relative size-[30%] text-[#1A6DF0]" strokeWidth={1.6} />
        <span className="relative mt-[4%] max-w-[78%] text-[clamp(12px,7.6cqw,22px)] leading-[1.2] font-extrabold text-[#0B2A6B]">{label}</span>
      </div>
    );
  }
  return (
    <div className={cn("@container relative flex items-center justify-center rounded-full border-[1.5px] border-white bg-white/10 text-center", className)}>
      <span className="max-w-[78%] font-serif text-[clamp(12px,7.4cqw,22px)] leading-[1.3] font-bold tracking-[0.01em] text-[#1B2B5C]">{label}</span>
    </div>
  );
}

/*
 * Network geometry in a 800x700 stage. Every card is centred ON the orbit (angles measured from the design reference: top, then
 * clockwise), so the dashed line runs behind each card.
 */
const NET = { w: 800, h: 700, cx: 400, cy: 350, r: 270 };
const NETWORK_ANGLES = [-90, -35, 0, 35, 90, 145, 180, 215];
/** Hub radius and card half-size in stage units (hub 31% of 800 wide; cards 26.25% x 11.14%). Keep in sync with the classes below. */
const NET_HUB_R = 124;
const NET_CARD_HALF = { w: 105, h: 39 };
/** Spoke from just outside the hub to the card's near edge, along the line through the stage centre. */
const NETWORK_SPOKES = NETWORK_ANGLES.map((deg) => {
  const a = (deg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const toEdge = Math.min(NET_CARD_HALF.w / Math.abs(ux || 1e-6), NET_CARD_HALF.h / Math.abs(uy || 1e-6));
  const from = NET_HUB_R + 6;
  const to = NET.r - toEdge;
  return { x1: NET.cx + from * ux, y1: NET.cy + from * uy, x2: NET.cx + to * ux, y2: NET.cy + to * uy };
});
const NETWORK_CARDS = NETWORK_ANGLES.map((deg) => {
  const a = (deg * Math.PI) / 180;
  const x = NET.cx + NET.r * Math.cos(a);
  const y = NET.cy + NET.r * Math.sin(a);
  return { left: (x / NET.w) * 100, top: (y / NET.h) * 100 };
});

/** Google rating · avatars + "adults helped" in one row. */
function NetworkTrust() {
  return (
    <ul aria-label="Why people trust AXON ADHD" className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 sm:flex-nowrap lg:mt-7">
      <li className="flex shrink-0 items-center gap-3">
        <Image src={trustBar.google.src} alt={trustBar.google.alt} width={40} height={40} className="size-9 lg:size-10" />
        <span className="flex flex-col gap-0.5">
          <span className="flex gap-0.5 text-orange-star" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </span>
          <span className="text-[15px] font-semibold whitespace-nowrap text-navy">
            {trustBar.rating} <span className="font-normal text-[#4B5C74]">{trustBar.reviews}</span>
            <span className="sr-only"> on Google</span>
          </span>
        </span>
      </li>
      <li aria-hidden className="hidden h-12 w-px shrink-0 bg-navy/15 sm:block" />
      <li className="flex items-center gap-3">
        <span className="flex shrink-0 -space-x-2.5">
          {trustBar.avatars.map((a) => (
            <Image key={a.src} src={a.src} alt="" width={40} height={40} className="size-10 rounded-full border-2 border-white object-cover shadow-soft" />
          ))}
        </span>
        <span className="max-w-[190px] text-[16px] leading-snug font-bold text-navy">{trustBar.helped}</span>
      </li>
    </ul>
  );
}

/**
 * Rich-blue rounded canvas: wide frosted glass copy panel on the left, circular referral network on the right (glass hub, dashed ring,
 * logo cards placed per the design reference). Below lg the two stack; below sm the ring becomes a hub over a two-column card grid.
 */
function NetworkHero({ data }: { data: PageHeroData }) {
  const logos = data.network?.logos ?? [];
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  const lead = "AXON ADHD catches early signals and";
  return (
    <section className="relative -mt-[var(--header-height)]" aria-labelledby="page-title">
      {/* Full-bleed pale sky-blue hero that starts behind the floating header. */}
      <div className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#F0F7FE_0%,#D0E7FD_38%,#C3E2FD_72%,#E8F3FE_100%)] pt-[calc(var(--header-height)+24px)] pb-10 sm:pb-12 lg:flex lg:min-h-[clamp(760px,58vw,900px)] lg:items-center lg:pt-[calc(var(--header-height)+16px)] lg:pb-12">
        {/* Soft light sweep across the bottom right. */}
        <svg aria-hidden viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none" className="absolute inset-0 -z-10 size-full">
          <path d="M700 800C900 700 1180 640 1460 560V800Z" fill="rgba(255,255,255,.35)" />
          <path d="M-40 800V700C200 680 420 760 620 800Z" fill="rgba(255,255,255,.25)" />
        </svg>

        {data.network?.hub === "glow" && (
          <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 w-full sm:h-32">
            <path d="M0 110C240 60 520 70 800 105S1240 130 1440 70V160H0Z" fill="#8CC8FD" fillOpacity=".5" />
            <path d="M0 135C300 100 640 125 960 140S1300 140 1440 112V160H0Z" fill="#5BAEFB" fillOpacity=".7" />
          </svg>
        )}

        <div className="mx-auto grid w-full max-w-[1372px] items-center gap-8 px-4 lg:grid-cols-[minmax(0,53fr)_minmax(0,47fr)] lg:gap-0">
          {/* Left: copy on the open background */}
          <div className="relative p-2 sm:p-0 lg:py-10 lg:pr-12">
            <div className="relative">
              {data.eyebrow && (
                <p className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-[#D6E8FC] px-5 py-2.5 text-[14px] font-bold tracking-[0.02em] text-[#0B2A5A] uppercase">
                  {data.network?.hub === "glow" ? <Stethoscope aria-hidden className="size-6 text-[#1A6DF0]" strokeWidth={2} /> : <GraduationCap aria-hidden className="size-5 fill-navy text-navy" strokeWidth={2} />}
                  {data.eyebrow}
                </p>
              )}
              <h1 id="page-title" className={cn("font-display text-[clamp(36px,8.5vw,52px)] leading-[1.12] font-extrabold tracking-[-0.03em] text-[#022860]", data.network?.hub === "glow" ? "text-[clamp(32px,8vw,48px)] lg:text-[clamp(40px,3.7vw,58px)]" : "lg:text-[clamp(44px,4.6vw,72px)]")}>
                {after !== undefined ? (
                  <>
                    <span className="block">{before.trim()}</span>
                    <span className="block">
                      <span className={cn("relative inline-block text-[#0A5BE0]", data.network?.hub === "glow" && "lg:whitespace-nowrap")}>
                        {data.accent}
                        <svg aria-hidden viewBox="0 0 240 12" preserveAspectRatio="none" fill="none" className={cn("absolute inset-x-0 -bottom-3 h-3", data.network?.hub === "glow" ? "w-full" : "w-[108%]")}>
                          <path d="M2 10C60 3 150 3 238 6" stroke="#2E86E8" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </span>
                    <span className="block">{after.trim()}</span>
                  </>
                ) : (
                  data.title
                )}
              </h1>
              {data.text.map((t) => {
                const [pre, post] = t.split(lead);
                return (
                  <p key={t} className="mt-6 max-w-[700px] text-[16px] leading-[1.6] text-pretty text-[#324E74] sm:text-[17px] lg:text-[clamp(16px,1.3vw,20px)]">
                    {post !== undefined ? (
                      <>
                        {pre}
                        <strong className="font-bold text-[#022860]">{lead}</strong>
                        {post}
                      </>
                    ) : (
                      t
                    )}
                  </p>
                );
              })}
              {data.ctas.length > 0 && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-nowrap">
                  {data.ctas.map((cta, i) => (
                    <ButtonLink
                      key={cta.label}
                      href={cta.href}
                      variant={i === 0 ? "primary" : "outline"}
                      size="lg"
                      className={cn("group whitespace-normal sm:px-6! sm:whitespace-nowrap lg:min-h-[54px]! lg:text-[17px]!", i === 0 ? "bg-[#025ECD]! font-semibold shadow-[0_14px_28px_-10px_rgba(2,94,205,.6)]!" : "border-[#0B5BD3]! bg-white/60 font-semibold text-[#0A4FC0]! hover:bg-[#0B5BD3] hover:text-white!")}
                    >
                      {cta.label}
                      {i === 0 && <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />}
                    </ButtonLink>
                  ))}
                </div>
              )}
              {data.trust && <NetworkTrust />}
              {data.note && <p className="type-small mt-4 text-[#324E74]">{data.note}</p>}
            </div>
          </div>

          {/* Right: referral network, or (when the page has no partner logos) its hero image in a glass frame. */}
          {!data.network ? (
            <div className="relative z-10 mx-auto w-full max-w-[680px] lg:max-w-none">
              <div className="rounded-[30px] border border-white/90 bg-white/60 p-2.5 shadow-[0_28px_64px_-28px_rgba(20,90,200,.45)] backdrop-blur-sm sm:p-3">
                <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} priority sizes="(max-width: 1023px) 100vw, 640px" className="h-auto w-full rounded-[22px]" />
              </div>
            </div>
          ) : (
          <div className="relative z-10 mx-auto w-full max-w-[680px] lg:-mr-4 lg:w-[calc(100%+1rem)] lg:max-w-none min-[1440px]:-ml-20 min-[1440px]:w-[calc(100%+6rem)]">
            {/* Phones: hub over a two-column card grid */}
            <div className="flex flex-col items-center gap-5 sm:hidden">
              <NetworkHub label={data.network?.hubLabel ?? ""} glow={data.network?.hub === "glow"} className="size-[180px]" />
              <ul className="grid w-full grid-cols-2 gap-3">
                {logos.map((logo) => (
                  <li key={logo.src} className="flex">
                    <NetworkLogoCard logo={logo} className="relative h-[72px] w-full" />
                  </li>
                ))}
              </ul>
            </div>

            {/* sm and up: ring (stage 8:7, ring is a true circle in a 800x700 viewBox) */}
            <div className="relative mx-auto hidden aspect-[8/7] w-full sm:block">
              <svg aria-hidden viewBox="0 0 800 700" fill="none" className="absolute inset-0 size-full">
                <circle cx={NET.cx} cy={NET.cy} r={NET.r} stroke="#C3D2E8" strokeWidth="1.2" strokeDasharray="5 6" />
                {NETWORK_SPOKES.slice(0, logos.length).map((l, i) => (
                  <g key={i}>
                    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#B7C6DE" strokeWidth="1.2" strokeDasharray="5 5" />
                    <circle cx={l.x1} cy={l.y1} r="5.5" fill="none" stroke="#A9BCDB" strokeWidth="1.3" />
                    <circle cx={l.x2} cy={l.y2} r="5.5" fill="none" stroke="#A9BCDB" strokeWidth="1.3" />
                  </g>
                ))}
              </svg>
              <NetworkHub label={data.network?.hubLabel ?? ""} glow={data.network?.hub === "glow"} className="absolute top-1/2 left-1/2 aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2" />
              {logos.map((logo, i) => {
                const p = NETWORK_CARDS[i];
                if (!p) return null;
                return <NetworkLogoCard key={logo.src} logo={logo} style={{ left: `${p.left}%`, top: `${p.top}%` }} className="absolute h-[11.14%] w-[26.25%] -translate-x-1/2 -translate-y-1/2" />;
              })}
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PageHero({ data }: { data: PageHeroData }) {
  if (data.variant === "network") return <NetworkHero data={data} />;
  if (data.variant === "banner") return <BannerHero data={data} />;
  if (data.variant === "photo") return <PhotoHero data={data} />;
  return (
    <section className="relative -mt-[var(--header-height)] overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white pt-[130px] pb-14 sm:pb-20" aria-labelledby="page-title">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            {data.eyebrow && <p className="mb-3 text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">{data.eyebrow}</p>}
            <h1 id="page-title" className="type-h1 text-ink">
              {data.title}
            </h1>
            {data.text.map((t) => (
              <p key={t} className="type-body mt-4 text-body">
                {t}
              </p>
            ))}
            <Ctas ctas={data.ctas} />
            {data.note && <p className="type-small mt-3 text-muted">{data.note}</p>}
            {data.trust && <TrustBar />}
          </div>
          <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} priority sizes="(max-width: 1024px) 100vw, 640px" className="h-auto w-full rounded-xl2 shadow-soft" />
        </div>
      </Container>
    </section>
  );
}

/** White band with an eyebrow pill, navy heading and horizontal glass cards tinted green / blue / orange. */
function MissionFeatures({ data }: { data: FeaturesSection }) {
  return (
    <section id={data.id} className="relative isolate overflow-hidden bg-[#FFFFFF] py-16 font-inter sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <div className="mx-auto max-w-[980px] text-center">
          {data.eyebrow && (
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-primary/40 sm:w-20" />
              <p className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.07] px-5 py-2.5 text-[13px] font-medium tracking-[0.2em] text-primary uppercase shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_6px_18px_rgba(37,120,202,.08)] backdrop-blur-md sm:px-6 sm:text-[15px]">
                <Target aria-hidden className="size-[18px]" strokeWidth={2} />
                {data.eyebrow}
              </p>
              <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-primary/40 sm:w-20" />
            </div>
          )}
          <h2 className="type-h2 mt-6 text-balance text-navy">{data.title}</h2>
          {data.subtitle && <p className="type-body mx-auto mt-5 max-w-[900px] text-pretty text-body">{data.subtitle}</p>}
        </div>
        <ul className="mx-auto mt-10 grid max-w-[640px] gap-5 sm:mt-12 lg:max-w-none lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={Math.min(i, 6) * 0.08} className="flex w-full">
                <GlassCard index={i} icon={item.icon} title={item.title} text={item.text} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** White split card on a pale-blue band: lead + check list + quote on the left, a full-height photo on the right (stacked below md). */
/** Icon-tile tints for the partner list, in item order: green, blue, purple, orange. */
const partnerTiles = ["bg-[#DDF6E6] text-[#1C9B3F]", "bg-[#E3EFFC] text-[#1766D6]", "bg-[#EEE9FF] text-[#6D4AE0]", "bg-[#FFEBCB] text-[#EB8B01]"] as const;

/**
 * "Why Partner With AXON ADHD": pill + heading + intro, then one white card. Left: the audience header, a list of four icon
 * rows and a quote box. Right: the photo, its left edge bowed into an arc with a blue line beside it, on desktop.
 */
function PartnerFeatures({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  const lead = data.lead?.replace(/^For\s+/, "");
  const [hBefore, hAfter] = data.headline ? data.headline.text.split(data.headline.accent) : ["", ""];
  return (
    <section id={data.id} className="bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-[900px] text-center">
          {data.headline ? (
            <>
              <p className="inline-flex items-center gap-2.5 rounded-full bg-[#D9E8FB] px-5 py-2 text-[15px] font-semibold text-[#0A4FF0] sm:text-[17px]">
                {data.leadIcon ? <FeatureIcon name={data.leadIcon} className="size-5" /> : <Handshake aria-hidden className="size-5" strokeWidth={1.8} />}
                {data.title}
              </p>
              <h2 className="type-section mt-4 leading-[1.15] tracking-[-0.02em] text-balance text-[#0B1F4D]">
                {hBefore}
                <span className="relative inline-block text-[#0A52E0]">
                  {data.headline.accent}
                  <svg aria-hidden viewBox="0 0 240 12" preserveAspectRatio="none" fill="none" className="absolute inset-x-0 -bottom-2 h-2.5 w-full">
                    <path d="M2 9C60 3 150 3 238 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                {hAfter}
              </h2>
            </>
          ) : (
            <h2 className="type-section text-balance text-[#10231B]">
              {after !== undefined ? (
                <>
                  {before}
                  <span className="font-bold">{data.accent}</span>
                  {after}
                </>
              ) : (
                data.title
              )}
            </h2>
          )}
          {data.subtitle && <p className="type-body mx-auto mt-4 max-w-[860px] text-pretty text-[#44546E]">{data.subtitle}</p>}
        </div>

        <div className="mt-8 grid overflow-hidden rounded-[28px] border border-white bg-white/80 shadow-[0_24px_60px_-28px_rgba(20,70,150,.35)] sm:mt-10 md:grid-cols-[1.05fr_1fr]">
          <div className="p-6 sm:p-8 lg:px-10 lg:py-9">
            {data.lead && (
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(160deg,#6FB0F8,#2A7BEA)] text-white shadow-[0_10px_22px_-10px_rgba(42,123,234,.7)]">
                  {data.leadIcon ? <FeatureIcon name={data.leadIcon} className="size-7" /> : <GraduationCap aria-hidden className="size-7" strokeWidth={1.8} />}
                </span>
                <p className="text-[22px] leading-tight font-bold tracking-[-0.01em] text-[#0B1F4D] sm:text-[26px]">For {lead}</p>
              </div>
            )}
            <ul className="mt-6 grid gap-3.5">
              {data.items.map((item, i) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span aria-hidden className={cn("grid size-12 shrink-0 place-items-center rounded-xl", partnerTiles[i % partnerTiles.length])}>
                    {item.icon && <FeatureIcon name={item.icon} className="size-6" />}
                  </span>
                  <div className="min-w-0 self-center">
                    <h3 className="text-[17px] leading-snug font-bold text-[#0B1F4D] sm:text-[18px]">{item.title}</h3>
                    {item.text && <p className="mt-0.5 text-[14px] leading-snug text-[#44566E] sm:text-[15px]">{item.text}</p>}
                  </div>
                </li>
              ))}
            </ul>
            {data.quote && (
              <blockquote className="mt-6 flex items-center gap-4 rounded-xl border-l-[3px] border-[#2A7BEA] bg-[linear-gradient(100deg,rgba(226,238,253,.9),rgba(214,230,250,.7))] px-5 py-4 text-[16px] leading-[1.55] text-[#0B1F4D] italic">
                <Quote aria-hidden className="size-7 shrink-0 fill-[#2A7BEA] text-[#2A7BEA] not-italic" strokeWidth={1.5} />
                <span>{data.quote}</span>
              </blockquote>
            )}
          </div>
          {data.image && data.image.width / data.image.height < 1.15 && (
            // Square artwork (a partner diagram): shown whole on a soft panel, with no arc crop.
            <div className="relative flex items-center justify-center bg-[linear-gradient(160deg,rgba(231,241,254,.7),rgba(255,255,255,.4))] p-4 sm:p-6">
              <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full max-w-[560px] rounded-[22px]" />
            </div>
          )}
          {data.image && data.image.width / data.image.height >= 1.15 && (
            <div className="relative aspect-[820/667] md:aspect-auto md:min-h-[440px] md:p-4 md:pl-0">
              <div className={cn("relative size-full overflow-hidden md:rounded-r-[22px] md:[clip-path:ellipse(64%_78%_at_72%_50%)]", data.imageLabels && "md:[clip-path:ellipse(100%_75%_at_100%_50%)]!")}>
                <Image src={data.image.src} alt={data.image.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className={cn("object-cover object-[60%_center]", data.imageLabels && "object-[100%_0%]")} />
              </div>
              {/* Blue arc just outside the image's bowed left edge (desktop). */}
              <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-y-4 left-0 hidden h-[calc(100%-2rem)] w-[calc(100%-1rem)] md:block">
                <path d={data.imageLabels ? "M25.5 0A100 75 0 0 0 25.5 100" : "M23.5 0A64 78 0 0 0 23.5 100"} stroke="#6FB0F8" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" transform="translate(-1.6 0)" />
              </svg>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

type GapAccent = Exclude<NonNullable<FeatureItem["accent"]>, "pink" | "cyan">;
const gapAccents: Record<GapAccent, { icon: typeof Brain; color: string; pale: string; border: string }> = {
  blue: { icon: GraduationCap, color: "#0868DC", pale: "#E3EEFD", border: "#D3E4FA" },
  red: { icon: TrendingUp, color: "#E5243B", pale: "#FDE6EA", border: "#F8D3D9" },
  green: { icon: Shield, color: "#16852B", pale: "#E0F3E4", border: "#CCE9D3" },
  orange: { icon: TriangleAlert, color: "#E87518", pale: "#FDEBDA", border: "#F8DCC2" },
  purple: { icon: Frown, color: "#6516C9", pale: "#EDE3FB", border: "#DDCEF5" },
  teal: { icon: Coins, color: "#078A9B", pale: "#D9F2F5", border: "#C3E7EB" },
};

/** Centered header (pill, accented hand-underlined title, subtitle) over a 3x2 grid of colour-coded statistic cards. */
function GapFeatures({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section id={data.id} className="relative isolate overflow-hidden bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-[1100px] text-center">
          {data.eyebrow && (
            <p className="inline-flex items-center gap-2.5 rounded-full bg-[#DCE9FB] px-5 py-2.5 text-[15px] font-semibold text-[#0A4FF0] sm:text-[17px]">
              <ChartColumn aria-hidden className="size-5" strokeWidth={2.4} />
              {data.eyebrow}
            </p>
          )}
          <h2 className={cn("type-section relative text-[#0B1F4D]", data.eyebrow && "mt-6")}>
            {after !== undefined ? (
              <>
                {before}
                <span className="relative inline-block text-[#0A52E0]">
                  {data.accent}
                  <svg aria-hidden viewBox="0 0 240 12" preserveAspectRatio="none" fill="none" className="absolute inset-x-0 -bottom-2.5 h-3 w-full">
                    <path d="M2 9C60 3 150 3 238 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.subtitle && <p className="type-body mx-auto mt-6 text-pretty text-[#465A78]">{data.subtitle}</p>}
        </div>

        <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {data.items.map((item, i) => {
            const a = gapAccents[(item.accent as GapAccent) ?? "blue"] ?? gapAccents.blue;
            const Icon = a.icon;
            return (
              <li key={item.title} className="flex">
                <Reveal delay={Math.min(i, 6) * 0.05} className="flex w-full">
                  <div className="@container relative flex w-full flex-col overflow-hidden rounded-[24px] border bg-white/90 p-6 shadow-[0_14px_34px_-16px_rgba(16,41,77,.25)] transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(16,41,77,.28)] sm:p-7" style={{ borderColor: a.border }}>
                    {/* Soft corner curve in the card's own colour. */}
                    <svg aria-hidden viewBox="0 0 200 140" preserveAspectRatio="none" className="pointer-events-none absolute right-0 bottom-0 h-[34%] w-[48%]">
                      <path d="M200 0C160 40 150 70 100 100S30 128 0 140H200Z" fill={a.color} fillOpacity=".16" />
                      <path d="M200 50C170 80 140 110 90 126S40 138 20 140H200Z" fill={a.color} fillOpacity=".32" />
                    </svg>
                    <div className="relative flex items-center gap-3">
                      <span className="grid size-14 shrink-0 place-items-center rounded-[16px]" style={{ backgroundColor: a.pale, color: a.color }}>
                        {item.icon ? <FeatureIcon name={item.icon} className="size-7" /> : <Icon aria-hidden className="size-7" strokeWidth={1.8} />}
                      </span>
                      <span aria-hidden className="h-9 w-0.5 shrink-0 rounded-full opacity-60" style={{ backgroundColor: a.color }} />
                      <p className="min-w-0 text-[clamp(22px,9.4cqw,42px)] leading-[1.1] font-bold tracking-[-0.02em] whitespace-nowrap" style={{ color: a.color }}>
                        {item.title}
                      </p>
                    </div>
                    <h3 className="relative mt-5 text-[19px] leading-snug font-bold text-[#10294D] sm:text-[20px]">{item.text}</h3>
                    {item.detail && <p className="relative mt-1.5 text-[15px] leading-snug text-[#465A78]">{item.detail}</p>}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** Head profile with two question marks (no Lucide equivalent). */
function HeadQuestionIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.5 3C8.4 3 5.5 6 5.5 10c0 2.3 1 4 2.5 5.2V20h7.5v-3h1c.8 0 1.5-.6 1.5-1.5V13l1.3-.6-1.5-2.5C17.6 5.8 15.6 3 12.5 3Z" />
      <path d="M10 8.2a1.3 1.3 0 1 1 1.8 1.2c-.5.2-.8.6-.8 1.1M11 12.3h.01M14.2 8.6a1 1 0 1 1 1.4.9c-.4.2-.6.5-.6.9M15 11.4h.01" strokeWidth="1.5" />
    </svg>
  );
}

type RibbonAccent = "blue" | "red" | "green" | "orange";
const ribbonAccents: Record<RibbonAccent, { icon: typeof Brain | typeof HeadQuestionIcon; color: string; pale: string; label: string }> = {
  blue: { icon: HeadQuestionIcon, color: "#1673E8", pale: "#E5F2FF", label: "#10294D" },
  red: { icon: HeartPulse, color: "#E83E70", pale: "#FCE8EF", label: "#B3234F" },
  green: { icon: GraduationCap, color: "#16A56A", pale: "#E2F8EB", label: "#0F6B49" },
  orange: { icon: Coins, color: "#F0A126", pale: "#FFF2D9", label: "#1F2A44" },
};
const RIBBON_NOTCH = 28;
const ribbonClip = `polygon(0 0, calc(100% - ${RIBBON_NOTCH}px) 0, 100% 50%, calc(100% - ${RIBBON_NOTCH}px) 100%, 0 100%, ${RIBBON_NOTCH}px 50%)`;

/** Centered heading over four pastel chevron ribbons, each with a stem and dot leading to its description. 2x2 on tablet, a vertical timeline on phones. */
function RibbonFeatures({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section id={data.id} className="bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-12 sm:py-16">
      <Container>
        <div>
          <div className="mx-auto max-w-[960px] text-center">
            <h2 className="type-h2 text-balance text-[#10294D]">
              {after !== undefined ? (
                <>
                  {before}
                  <span className="text-[#1673E8]">{data.accent}</span>
                  {after}
                </>
              ) : (
                data.title
              )}
            </h2>
            {data.subtitle && <p className="type-body mx-auto mt-4 text-pretty text-[#465A78]">{data.subtitle}</p>}
          </div>

          <ol className="mt-10 grid gap-x-3 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:flex lg:gap-0">
            {data.items.map((item, i) => {
              const a = ribbonAccents[(item.accent as RibbonAccent) ?? "blue"] ?? ribbonAccents.blue;
              const Icon = a.icon;
              const last = i === data.items.length - 1;
              return (
                <li key={item.title} className={cn("relative pl-8 sm:pl-0 lg:flex-1", i > 0 && "lg:-ml-[22px]")}>
                  <Reveal delay={i * 0.08}>
                    {/* Phone timeline: dot on a line running down to the next stage */}
                    <span aria-hidden className="absolute top-[42px] left-[5px] size-[11px] rounded-full sm:hidden" style={{ backgroundColor: a.color }} />
                    {!last && <span aria-hidden className="absolute top-[50px] -bottom-8 left-[10px] w-px sm:hidden" style={{ backgroundColor: a.color, opacity: 0.45 }} />}

                    <div className="flex h-[88px] items-center gap-3 pr-9 pl-10 lg:gap-3.5" style={{ backgroundColor: a.pale, clipPath: ribbonClip }}>
                      <span className="grid size-[54px] shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${a.color}26`, color: a.color }}>
                        <Icon aria-hidden className="size-[26px]" />
                      </span>
                      <h3 className="text-[17px] leading-tight font-bold lg:text-[18px]" style={{ color: a.label }}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Desktop/tablet stem + dot */}
                    <div aria-hidden className="hidden flex-col items-center sm:flex">
                      <span className="h-9 w-px" style={{ backgroundColor: a.color, opacity: 0.45 }} />
                      <span className="size-[11px] rounded-full" style={{ backgroundColor: a.color }} />
                    </div>
                    <p className="mx-auto mt-3 max-w-[230px] text-[16px] leading-snug font-medium text-[#10294D] sm:mt-4 sm:text-center lg:max-w-[210px]">{item.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/** Full-colour campus skyline (white columned hall with a blue flag, green trees, hills) for the card's lower left. Decorative. */
function CampusIllustration({ className }: { className?: string }) {
  const tree = (x: number, y: number, k: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${k})`}>
      <rect x="-3" y="40" width="6" height="30" rx="2" fill="#7A5A3A" />
      <ellipse cx="0" cy="22" rx="22" ry="30" fill="#7CC850" />
      <ellipse cx="-10" cy="38" rx="14" ry="16" fill="#5DB23C" />
      <ellipse cx="11" cy="36" rx="14" ry="17" fill="#6CC045" />
    </g>
  );
  return (
    <svg aria-hidden viewBox="0 0 620 300" fill="none" className={className} preserveAspectRatio="xMinYMax meet">
      {/* hills and lawn */}
      <path d="M0 252C120 222 260 236 400 252S560 262 620 246V300H0Z" fill="#CFE4F8" />
      <path d="M0 270C160 252 340 268 620 258V300H0Z" fill="#9ED36E" />
      {/* hall */}
      <g fill="#F4F8FD" stroke="#C9D8EA" strokeWidth="1.5">
        <rect x="150" y="190" width="300" height="12" />
        <rect x="136" y="202" width="328" height="12" />
        <rect x="124" y="214" width="352" height="14" />
        <rect x="140" y="118" width="320" height="16" />
        <path d="M300 62 460 118H140Z" />
        <rect x="104" y="150" width="60" height="64" />
        <rect x="436" y="150" width="60" height="64" />
      </g>
      <g fill="#E4EDF8">
        {[170, 214, 258, 302, 346, 390].map((x) => (
          <rect key={x} x={x} y="134" width="20" height="56" rx="2" />
        ))}
      </g>
      <circle cx="300" cy="96" r="9" fill="#2A7BEA" fillOpacity=".55" />
      <g fill="#2A7BEA">
        {[118, 138, 440, 460].map((x) => (
          <rect key={x} x={x} y="164" width="12" height="26" rx="2" />
        ))}
        <rect x="298" y="20" width="3" height="44" fill="#8896AA" />
        <path d="M301 20 332 30 301 40Z" />
      </g>
      {tree(44, 176, 1.05)}
      {tree(96, 210, 0.7)}
      {tree(520, 184, 1)}
      {tree(580, 210, 0.7)}
    </svg>
  );
}

const campusAccents = {
  blue: { icon: Users, color: "#1769D2", pale: "#E4EEFD" },
  orange: { icon: Coins, color: "#E87518", pale: "#FDEBDB" },
  green: { icon: TrendingDown, color: "#168A45", pale: "#E1F4E7" },
} as const;

/** Pale-blue rounded panel: heading, copy and the campus illustration on the left, three white statistic cards on the right; the impact bar sits below it. */
function CampusBannerFeatures({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section id={data.id} className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-10 sm:py-14">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] border border-white bg-[linear-gradient(135deg,#F2F8FE_0%,#E3F0FD_55%,#D9EBFB_100%)] px-5 pt-10 pb-12 shadow-[0_24px_60px_-34px_rgba(20,90,200,.4)] sm:px-8 sm:pt-12 sm:pb-14 lg:px-10 lg:py-14">
          {/* Light-blue swell along the bottom edge. */}
          <svg aria-hidden viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 w-full sm:h-32">
            <path d="M0 140C300 100 560 150 860 130S1260 90 1440 120V200H0Z" fill="#CBE3FA" fillOpacity=".6" />
          </svg>
          <CampusIllustration className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[44%] w-auto max-w-[78%] lg:h-[46%] lg:max-w-[42%]" />

          <div className="grid items-center gap-8 lg:grid-cols-[40fr_60fr] lg:gap-8">
            <div className="lg:pb-44">
              <span aria-hidden className="mb-5 block h-1 w-16 rounded-full bg-[#2A7BEA]" />
              <h2 className="type-section leading-[1.15] tracking-[-0.02em] text-[#0B1F4D]">
                {after !== undefined ? (
                  <>
                    <span className="block">{before.trim()}</span>
                    <span className="relative inline-block text-[#0A52E0]">
                      {data.accent}
                      <svg aria-hidden viewBox="0 0 240 12" preserveAspectRatio="none" fill="none" className="absolute inset-x-0 -bottom-2.5 h-3 w-full">
                        <path d="M2 9C60 3 150 3 238 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    {after.trim() && <span className="block">{after.trim()}</span>}
                  </>
                ) : (
                  data.title
                )}
              </h2>
              {data.subtitle && <p className="mt-6 max-w-[400px] text-[16px] leading-[1.65] text-[#33465E] sm:text-[17px]">{data.subtitle}</p>}
            </div>

            <ul className="grid gap-4 sm:grid-cols-3 sm:gap-4 lg:gap-5">
              {data.items.map((item, i) => {
                const a = campusAccents[(item.accent as keyof typeof campusAccents) ?? "blue"] ?? campusAccents.blue;
                const Icon = a.icon;
                return (
                  <li key={item.title} className="flex">
                    <Reveal delay={i * 0.08} className="flex w-full">
                      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-[22px] border border-white bg-white/90 px-5 py-7 text-center shadow-[0_18px_40px_-20px_rgba(20,90,200,.4)] sm:px-4 lg:px-5 lg:py-8">
                        <svg aria-hidden viewBox="0 0 200 140" preserveAspectRatio="none" className="pointer-events-none absolute right-0 bottom-0 h-[26%] w-[70%]">
                          <path d="M200 0C160 40 120 70 70 100S20 128 0 140H200Z" fill={a.color} fillOpacity=".14" />
                          <path d="M200 60C170 90 140 112 90 126S40 138 20 140H200Z" fill={a.color} fillOpacity=".3" />
                        </svg>
                        <span className="relative grid size-[68px] place-items-center rounded-full" style={{ backgroundColor: a.pale, color: a.color }}>
                          <Icon aria-hidden className="size-8" strokeWidth={1.9} />
                        </span>
                        <p className="relative mt-4 text-[clamp(26px,2.5vw,38px)] leading-none font-extrabold tracking-[-0.02em] whitespace-nowrap" style={{ color: a.color }}>
                          {item.title}
                        </p>
                        <p className="relative mt-3 text-[16px] leading-snug font-medium text-[#10294D]">{item.text}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {data.footnote && (
          <p className="mt-5 flex items-center gap-4 rounded-2xl bg-[linear-gradient(100deg,#044F9D_0%,#0560B2_50%,#0281E8_100%)] px-5 py-3.5 text-[14px] leading-snug font-bold text-white shadow-[0_14px_30px_-14px_rgba(12,74,166,.6)] sm:px-6 sm:py-4 sm:text-[16px]">
            <GraduationCap aria-hidden className="size-7 shrink-0 sm:size-8" strokeWidth={1.6} />
            <span aria-hidden className="h-8 w-px shrink-0 bg-white/40" />
            <span>{data.footnote}</span>
          </p>
        )}
      </Container>
    </section>
  );
}

const earlyAccents = {
  blue: { icon: Target, color: "#2A7BEA", pale: "#E1EEFD", bg: "rgba(236,245,255,.9)", border: "#D3E4FA" },
  green: { icon: ShieldPlus, color: "#2BB24C", pale: "#DDF6E4", bg: "rgba(238,250,241,.9)", border: "#D2EFDA" },
  orange: { icon: GraduationCap, color: "#F59A1B", pale: "#FEEBCF", bg: "rgba(255,247,235,.9)", border: "#F8E4C6" },
  pink: { icon: BriefcaseMedical, color: "#EF5BA0", pale: "#FDE3EE", bg: "rgba(255,241,247,.9)", border: "#F8DCE9" },
  purple: { icon: HeartPulse, color: "#8B5CF6", pale: "#EDE5FD", bg: "rgba(244,239,255,.9)", border: "#E3D9FA" },
} as const;

/** Centered heading (accented title with hand underline), then the supplied clinician image beside five pastel benefit cards. */
/** Pill, accented heading and intro over a two-column row: the photo (with its blue wave) beside five tinted icon cards. */
function EarlyReferralFeatures({ data, stretchImage }: { data: FeaturesSection; stretchImage?: boolean }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section id={data.id} className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F3F8FE_0%,#E8F2FD_100%)] py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-[1000px] text-center">
          {data.eyebrow && (
            <p className="inline-flex items-center gap-2.5 rounded-full bg-[#DCE9FB] px-5 py-2 text-[15px] font-semibold text-[#0B2A6B] sm:text-[17px]">
              <HeartPulse aria-hidden className="size-5 text-[#2A7BEA]" strokeWidth={2} />
              {data.eyebrow}
            </p>
          )}
          <h2 className={cn("type-section leading-[1.15] tracking-[-0.02em] text-[#0B1F4D]", data.eyebrow && "mt-4")}>
            {after !== undefined ? (
              <>
                {before}
                <span className="relative inline-block text-[#0A52E0]">
                  {data.accent}
                  <svg aria-hidden viewBox="0 0 240 12" preserveAspectRatio="none" fill="none" className="absolute inset-x-0 -bottom-2.5 h-3 w-full">
                    <path d="M2 9C60 3 150 3 238 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.subtitle && <p className="type-body mx-auto mt-5 text-pretty text-[#44546E]">{data.subtitle}</p>}
        </div>

        <div className={cn("mt-10 grid gap-6 sm:mt-12", data.image ? "lg:grid-cols-[1.32fr_1fr] lg:items-center" : "")}>
          {data.image && (
            <div className={cn("relative overflow-hidden rounded-[26px] border border-white shadow-[0_24px_56px_-28px_rgba(20,90,200,.5)]", stretchImage ? "aspect-[3/2]" : "aspect-[1024/609]")}>
              <Image src={data.image.src} alt={data.image.alt} fill priority={false} sizes="(max-width: 1023px) 100vw, 56vw" className="object-cover object-center" />
            </div>
          )}
          <ul className={cn("grid gap-3", !data.image && "mx-auto w-full max-w-[1100px] sm:grid-cols-2 sm:gap-4")}>
            {data.items.map((item, i) => {
              const a = earlyAccents[(item.accent as keyof typeof earlyAccents) ?? "blue"] ?? earlyAccents.blue;
              const Icon = a.icon;
              return (
                <li key={item.title} className="flex">
                  <Reveal delay={Math.min(i, 5) * 0.06} className="flex w-full">
                    <div className="relative flex w-full items-center gap-4 overflow-hidden rounded-[20px] border px-4 py-3.5 shadow-[0_14px_32px_-18px_rgba(20,90,200,.35)] sm:px-5" style={{ backgroundColor: a.bg, borderColor: a.border }}>
                      <svg aria-hidden viewBox="0 0 200 100" preserveAspectRatio="none" className="pointer-events-none absolute right-0 bottom-0 h-[44%] w-[34%]">
                        <path d="M200 0C170 30 140 60 90 78S30 96 0 100H200Z" fill={a.color} fillOpacity=".18" />
                        <path d="M200 40C176 62 146 80 100 90S40 98 20 100H200Z" fill={a.color} fillOpacity=".4" />
                      </svg>
                      <span className="relative grid size-12 shrink-0 place-items-center rounded-[14px] sm:size-14" style={{ backgroundColor: a.pale, color: a.color }}>
                        {item.icon ? <FeatureIcon name={item.icon} className="size-6 sm:size-7" /> : <Icon aria-hidden className="size-6 sm:size-7" strokeWidth={1.8} />}
                      </span>
                      <span aria-hidden className="relative h-10 w-px shrink-0" style={{ backgroundColor: a.color, opacity: 0.55 }} />
                      <div className="relative min-w-0">
                        <h3 className="text-[16px] leading-snug font-bold text-[#0B1F4D] sm:text-[17px]">{item.title}</h3>
                        {item.text && <p className="mt-0.5 text-[13.5px] leading-snug text-[#44566E] sm:text-[14px]">{item.text}</p>}
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Features({ data }: { data: FeaturesSection }) {
  const variant = data.variant ?? "card";
  // "Key Benefits for University" shares the "Why Early Referral Matters" design; its photo uses a taller 3:2 frame to match the card stack.
  if (variant === "universityBenefits") return <EarlyReferralFeatures data={data} stretchImage />;
  if (variant === "earlyReferral") return <EarlyReferralFeatures data={data} />;
  if (variant === "campusBanner") return <CampusBannerFeatures data={data} />;
  if (variant === "ribbon") return <RibbonFeatures data={data} />;
  if (variant === "gap") return <GapFeatures data={data} />;
  if (variant === "partner") return <PartnerFeatures data={data} />;
  if (variant === "mission") return <MissionFeatures data={data} />;
  if (variant === "glassFlow") return <HowItWorksGlass data={data} />;
  const dark = data.tone === "navy";
  const grid = (
    <ul className={cn("grid gap-5", data.image ? "sm:grid-cols-2" : cols[data.columns ?? 3])}>
      {data.items.map((item, i) => (
        <li key={item.title} className="flex">
          <Reveal delay={Math.min(i, 6) * 0.05} className="flex w-full">
            {variant === "stat" ? (
              <div className={cn("w-full rounded-panel p-6", dark ? "bg-white/10" : "border border-line-2 bg-white shadow-card")}>
                <h3 className={cn("type-h3", dark ? "text-primary-300" : "text-primary")}>{item.title}</h3>
                {item.text && <p className={cn("type-body mt-3 font-semibold", dark ? "text-white" : "text-navy")}>{item.text}</p>}
                {item.detail && <p className={cn("type-small mt-1", dark ? "text-white/70" : "text-muted")}>{item.detail}</p>}
              </div>
            ) : variant === "check" ? (
              <div className="flex w-full items-start gap-3 rounded-card border border-line-2 bg-white px-5 py-4 shadow-card">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                <div>
                  <h3 className="text-[16px] font-semibold text-ink-2">{item.title}</h3>
                  {item.text && <p className="type-small mt-1 text-body">{item.text}</p>}
                </div>
              </div>
            ) : variant === "flow" ? (
              <div className={cn("relative w-full rounded-panel p-6 text-center", dark ? "bg-white/10" : "border border-line-2 bg-white shadow-card")}>
                <h3 className={cn("type-h4", dark ? "text-white" : "text-navy")}>{item.title}</h3>
                {item.text && <p className={cn("type-body mt-2", dark ? "text-white/80" : "text-body")}>{item.text}</p>}
                {i < data.items.length - 1 && <ArrowRight aria-hidden className="absolute top-1/2 -right-4 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-primary p-1 text-white md:block" />}
              </div>
            ) : (
              <div className={cn("w-full rounded-panel p-6", dark ? "bg-white/10" : "border border-line-2 bg-white shadow-card")}>
                {item.image ? (
                  <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} className="mb-4 h-12 w-auto" />
                ) : (
                  item.icon && (
                    <span className={cn("mb-4 grid size-12 place-items-center rounded-[12px]", dark ? "bg-white/15 text-white" : "bg-primary-soft text-primary")}>
                      <FeatureIcon name={item.icon} className="size-6" />
                    </span>
                  )
                )}
                <h3 className={cn("type-h4", dark ? "text-white" : "text-navy")}>{item.title}</h3>
                {item.text && <p className={cn("type-body mt-2", dark ? "text-white/80" : "text-body")}>{item.text}</p>}
              </div>
            )}
          </Reveal>
        </li>
      ))}
    </ul>
  );

  return (
    <section id={data.id} className={cn("py-16 sm:py-20", toneClass[data.tone ?? "white"])}>
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} tone={dark ? "light" : "dark"} />
        {data.lead && <p className={cn("type-body -mt-4 mb-8 text-center font-semibold", dark ? "text-white" : "text-navy")}>{data.lead}</p>}
        {data.image ? (
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
            <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 100vw, 560px" className="h-auto w-full rounded-xl2 shadow-soft" />
            {grid}
          </div>
        ) : (
          grid
        )}
        {data.quote && <blockquote className={cn("type-lead mx-auto mt-10 max-w-[760px] text-center font-semibold italic", dark ? "text-white" : "text-primary-deep")}>{data.quote}</blockquote>}
        {data.footnote && <p className={cn("type-body mx-auto mt-8 max-w-[820px] text-center font-medium", dark ? "text-white/85" : "text-ink-2")}>{data.footnote}</p>}
        <Ctas ctas={data.ctas} light={dark} className="justify-center" />
      </Container>
    </section>
  );
}

function Steps({ data }: { data: StepsSection }) {
  if (data.variant === "journey") return <StepsJourney data={data} />;
  if (data.variant === "stack") return <WorkflowStack data={data} />;
  return (
    <section id={data.id} className={cn("scroll-mt-[var(--header-offset)] py-16 sm:py-20", toneClass[data.tone ?? "surface"])}>
      <Container>
        <SectionHeading title={data.title} subtitle={data.subtitle} />
        <ol className={cn("grid gap-6", data.items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : data.items.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-3")}>
          {data.items.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={Math.min(i, 5) * 0.06} className="h-full overflow-hidden rounded-panel border border-line-2 bg-white shadow-card">
                {step.image && <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} sizes="(max-width: 1024px) 100vw, 420px" className="aspect-[16/10] w-full object-cover" />}
                <div className="p-6">
                  <span className="mb-3 inline-grid size-9 place-items-center rounded-full bg-primary text-[15px] font-bold text-white" aria-hidden>
                    {i + 1}
                  </span>
                  <h3 className="type-h4 text-navy">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="type-body mt-2 text-body">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Icon chip tints for the axon feature list, in item order. */
const axonTones = [
  "bg-[#E3EEFF] text-primary",
  "bg-[#DDF5EE] text-[#0F9F7E]",
  "bg-[#ECE7FF] text-[#6D4AE0]",
  "bg-[#DCF4F4] text-[#0E97A0]",
  "bg-[#F0E8FD] text-[#7C4DDB]",
];

function withHighlight(text: string, word?: string) {
  if (!word || !text.includes(word)) return text;
  const [before, ...rest] = text.split(word);
  return (
    <>
      {before}
      <strong className="font-bold text-primary-700">{word}</strong>
      {rest.join(word)}
    </>
  );
}

/** "Why We Chose the Name": copy + icon list on the left, neuron GIF card on soft blue rings on the right. */
function AxonSplit({ data }: { data: SplitSection }) {
  const [first, ...rest] = data.title.split(" ");
  return (
    <section id={data.id} className="relative isolate scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(180deg,#F7FAFE_0%,#EEF4FC_100%)] py-16 font-inter sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1372px] items-center gap-12 px-4 md:grid-cols-[1.25fr_1fr] lg:gap-16">
        <Reveal>
          {data.eyebrow && (
            <p className="type-body inline-flex items-center gap-2 rounded-full bg-[#E3EEFB] px-4 py-2 font-medium text-primary-600">
              <Brain aria-hidden className="size-5" strokeWidth={1.75} />
              {data.eyebrow}
            </p>
          )}
          <h2 className="type-h2 mt-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-600 bg-clip-text text-transparent">{first}</span>{" "}
            <span className="bg-gradient-to-r from-[#1A9FD0] to-[#22C083] bg-clip-text text-transparent">{rest.join(" ")}</span>
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className="type-lead mt-4 max-w-[640px] text-body">
              {withHighlight(p, data.highlight)}
            </p>
          ))}
          {data.features && (
            <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {data.features.map((f, i) => (
                <li key={f.title} className="group flex items-start gap-4 sm:gap-5">
                  {f.icon && (
                    <span aria-hidden className={cn("grid size-12 shrink-0 place-items-center rounded-full transition duration-300 ease-brand group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(25,82,140,.15)] sm:size-14", axonTones[i % axonTones.length])}>
                      <FeatureIcon name={f.icon} className="size-5 sm:size-6" />
                    </span>
                  )}
                  <div className="pt-1">
                    <h3 className="type-h4 text-navy">{f.title}</h3>
                    {f.text && <p className="type-body mt-1 text-body">{f.text}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[460px]">
          {/* Soft rings, arc and dots behind the card */}
          <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#DCEAF8_0%,#E4F0FC_55%,rgba(238,244,252,0)_72%)]" />
          <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-100/70" />
          <div aria-hidden className="absolute top-[-6%] right-[-22%] -z-10 aspect-square w-[95%] rounded-full border-r-[1.5px] border-primary-200" />
          <span aria-hidden className="absolute top-[14%] -left-[10%] size-3 rounded-full bg-[#5CCFD8]" />
          <span aria-hidden className="absolute top-[50%] -right-[16%] size-4 rounded-full bg-[#5CCFD8]" />
          <span aria-hidden className="absolute bottom-[24%] -right-[10%] size-2.5 rounded-full bg-primary-200" />
          {/* The GIF has a black ground, so the card is black and the GIF is contained (never cropped). */}
          {data.image && (
            <div
              role="img"
              aria-label={data.image.alt}
              style={{ backgroundImage: `url("${encodeURI(data.image.src)}")` }}
              className="mx-auto aspect-[37/58] w-full max-w-[300px] overflow-hidden rounded-[24px] bg-black bg-contain bg-center bg-no-repeat shadow-[0_30px_60px_rgba(11,37,75,.35)] ring-1 ring-white/10 sm:max-w-[360px]"
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Split({ data }: { data: SplitSection }) {
  if (data.variant === "axon") return <AxonSplit data={data} />;
  if (data.variant === "glass") return <FreeAssessmentGlass data={data} />;
  const dark = data.tone === "navy";
  return (
    <section id={data.id} className={cn("scroll-mt-[var(--header-offset)] py-16 sm:py-20", toneClass[data.tone ?? "white"])}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
          <Reveal className={cn("min-w-0", data.reverse && "md:order-2")}>
            {data.video ? (
              <video src={data.video} autoPlay muted loop playsInline preload="none" aria-hidden className="h-auto w-full rounded-xl2 shadow-soft" />
            ) : (
              data.image && <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 100vw, 620px" unoptimized={data.image.src.endsWith(".gif")} className="mx-auto h-auto w-full max-w-[620px] rounded-xl2 shadow-soft" />
            )}
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            {data.eyebrow && <p className={cn("mb-3 text-[13px] font-semibold tracking-[0.14em] uppercase", dark ? "text-white/80" : "text-primary")}>{data.eyebrow}</p>}
            <h2 className={cn("type-h2", dark ? "text-white" : "text-navy")}>{data.title}</h2>
            {data.paragraphs?.map((p) => (
              <p key={p} className={cn("type-body mt-4", dark ? "text-white/85" : "text-body")}>
                {p}
              </p>
            ))}
            {data.list && (
              <ul className="mt-6 space-y-3">
                {data.list.map((li) => (
                  <li key={li} className={cn("type-body flex gap-3", dark ? "text-white" : "text-ink-2")}>
                    <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                    {li}
                  </li>
                ))}
              </ul>
            )}
            <Ctas ctas={data.ctas} light={dark} />
            {data.note && <p className={cn("type-small mt-3", dark ? "text-white/70" : "text-muted")}>{data.note}</p>}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Quotes({ data }: { data: QuotesSection }) {
  if (data.variant === "glass") return <GlassQuotesCarousel data={data} />;
  if (data.variant === "stacked") return <StackedQuotesCarousel data={data} />;
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading title={data.title} subtitle={data.subtitle} />
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {data.items.map((q) => (
            <li key={q.name} className="mb-6 break-inside-avoid">
              <figure className="rounded-panel border border-line-2 bg-white p-6 shadow-card">
                <Quote aria-hidden className="size-7 text-primary/30" />
                <blockquote className="type-body mt-3 text-body">{q.quote}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line-2 pt-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-semibold text-white" aria-hidden>
                    {q.name.charAt(0)}
                  </span>
                  <span>
                    <span className="type-body block font-semibold text-navy">{q.name}</span>
                    <span className="type-small block text-muted">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Ring node angles (deg) for the compliance orbit. */
const COMPLIANCE_NODES = [-118, -62, 0, 180, 112, 68];

/** Glass shield with a blue check, centred in the compliance orbit. Decorative. */
function ComplianceShield({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 140" fill="none" className={className}>
      <defs>
        <linearGradient id="cs-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset="1" stopColor="#B9DDFB" stopOpacity=".75" />
        </linearGradient>
        <linearGradient id="cs-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7CC0FA" />
          <stop offset="1" stopColor="#3C9CF2" />
        </linearGradient>
        <filter id="cs-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <path d="M60 10 108 28V68C108 98 88 120 60 132 32 120 12 98 12 68V28Z" fill="#4DA6F8" fillOpacity=".55" filter="url(#cs-glow)" />
      <path d="M60 10 108 28V68C108 98 88 120 60 132 32 120 12 98 12 68V28Z" fill="url(#cs-fill)" stroke="url(#cs-edge)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M38 70 54 86 84 52" stroke="#2F8DEB" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Rounded pale-blue panel: certification orbit on the left, divider, then pill / accented heading / copy / note bar. */
function ComplianceBadges({ data }: { data: BadgesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  const [line1, line2] = before.split(/(?<=& )/);
  return (
    <section className={cn("bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-10 sm:py-14", data.compact && "pt-5 sm:pt-6 bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)]!")} aria-labelledby="compliance-title">
      <Container>
        <div className={cn("relative isolate overflow-hidden rounded-[24px] bg-[linear-gradient(115deg,#BDDCFB_0%,#D3E7FC_40%,#E8F2FE_100%)] shadow-[0_24px_60px_-34px_rgba(20,90,200,.5)] px-5 py-10 sm:rounded-[30px] sm:px-8 sm:py-14 lg:px-12 lg:py-16", data.compact && "border border-white bg-[linear-gradient(115deg,#E6F1FD_0%,#EEF5FE_45%,#F6FAFF_100%)]! lg:py-9")}>
          {/* Bright-blue wave rising along the bottom edge, strongest at the right. */}
          <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 w-full sm:h-32">
            <path d="M0 120C300 80 560 90 860 125S1260 140 1440 70V160H0Z" fill="#A9D3FD" fillOpacity=".55" />
            <path d="M0 140C340 110 700 130 1000 145S1320 150 1440 110V160H0Z" fill="#86C2FD" fillOpacity=".7" />
          </svg>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1.1fr)] lg:gap-10 xl:gap-14">
            {/* Left: certification orbit */}
            <Reveal>
              <div className={cn("@container relative mx-auto aspect-[35/32] w-full max-w-[680px]", data.compact && "lg:max-w-[520px]")}>
                <svg aria-hidden viewBox="0 0 700 640" fill="none" className="absolute inset-0 size-full">
                  <circle cx="350" cy="320" r="275" stroke="#B9DDFB" strokeWidth="1.5" />
                  <circle cx="350" cy="320" r="200" stroke="#B9DDFB" strokeOpacity=".45" strokeWidth="1.5" />
                  {COMPLIANCE_NODES.map((deg) => {
                    const a = (deg * Math.PI) / 180;
                    return <circle key={deg} cx={350 + 275 * Math.cos(a)} cy={320 + 275 * Math.sin(a)} r="8" fill="#5AB0F8" />;
                  })}
                </svg>
                <div className="absolute inset-x-[2%] top-1/2 grid -translate-y-1/2 grid-cols-2 gap-x-[12%] gap-y-[10%]">
                  {data.badges.slice(0, 4).map((b) => (
                    <div key={b.src} className="relative h-[clamp(76px,25cqw,150px)] rounded-[22px] bg-white/95 shadow-[0_18px_40px_-16px_rgba(8,120,232,.35)] transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(8,120,232,.38)] sm:rounded-[24px]">
                      <Image src={b.src} alt={b.alt} fill sizes="260px" className="object-contain p-[6%_8%]" />
                    </div>
                  ))}
                </div>
                <ComplianceShield className="absolute top-1/2 left-1/2 w-[14%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_24px_rgba(8,120,232,.25)]" />
              </div>
            </Reveal>

            <span aria-hidden className="hidden h-[72%] w-px self-center bg-[#9CC4F0]/60 lg:block" />

            {/* Right: copy */}
            <Reveal delay={0.1}>
              <div>
                {data.eyebrow && (
                  <p className="inline-flex items-center gap-2.5 rounded-full bg-[#D7E8FC] px-5 py-2.5 text-[16px] font-semibold text-[#0B2A6B]">
                    <ShieldCheck aria-hidden className="size-5 fill-[#1A6DF0]/15 text-[#1A6DF0]" strokeWidth={2} />
                    {data.eyebrow}
                  </p>
                )}
                <h2 id="compliance-title" className="type-section mt-6 leading-[1.15] tracking-[-0.02em] text-[#0B1F4D]">
                  {after !== undefined ? (
                    <>
                      <span className="block">{line1.trim()}</span>
                      <span className="block sm:whitespace-nowrap">
                        {line2}
                        <span className="relative inline-block text-[#0A52E0]">
                          {data.accent}
                          <svg aria-hidden viewBox="0 0 240 12" preserveAspectRatio="none" fill="none" className="absolute inset-x-0 -bottom-2.5 h-3 w-full">
                            <path d="M2 9C60 3 150 3 238 6" stroke="#0A52E0" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                        </span>
                        {after}
                      </span>
                    </>
                  ) : (
                    data.title
                  )}
                </h2>
                <p className="mt-8 max-w-[640px] text-[17px] leading-[1.7] text-pretty text-[#44546E] sm:text-[19px]">{data.subtitle}</p>
                {data.note && (
                  <p className="mt-8 flex items-center gap-4 rounded-2xl bg-[linear-gradient(100deg,rgba(255,255,255,.55),rgba(206,226,250,.8))] px-5 py-4 text-[16px] leading-snug text-[#0B1F4D] shadow-[0_10px_26px_-16px_rgba(20,90,200,.45)] sm:px-6 sm:text-[18px]">
                    <Lock aria-hidden className="size-6 shrink-0 fill-[#1A6DF0] text-[#1A6DF0]" strokeWidth={2} />
                    {data.note}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Badges({ data }: { data: BadgesSection }) {
  if (data.variant === "compliance") return <ComplianceBadges data={data} />;
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className={cn("grid items-center gap-10", data.image && "md:grid-cols-[1.2fr_1fr]")}>
          <div>
            <SectionHeading title={data.title} subtitle={data.subtitle} align={data.image ? "left" : "center"} className="mb-8 sm:mb-8" />
            <ul className={cn("flex flex-wrap items-center gap-4", !data.image && "justify-center")}>
              {data.badges.map((b) => (
                <li key={b.src} className="rounded-card border border-line-2 bg-white px-4 py-3 shadow-card">
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-12 w-auto" />
                </li>
              ))}
            </ul>
          </div>
          {data.image && <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 100vw, 520px" className="h-auto w-full rounded-xl2" />}
        </div>
      </Container>
    </section>
  );
}

const screeningAccents = {
  cyan: { icon: Clock, ink: "#7FE3FF", border: "rgba(110,215,255,.95)", glow: "rgba(70,200,255,.55)", tint: "linear-gradient(135deg,rgba(60,170,255,.5) 0%,rgba(20,100,210,.38) 55%,rgba(12,70,170,.3) 100%)" },
  green: { icon: Users, ink: "#8FF0CE", border: "rgba(100,235,190,.9)", glow: "rgba(60,220,170,.45)", tint: "linear-gradient(135deg,rgba(40,200,170,.5) 0%,rgba(20,130,160,.38) 55%,rgba(12,80,150,.3) 100%)" },
  orange: { icon: GraduationCap, ink: "#FFC565", border: "rgba(255,190,100,.95)", glow: "rgba(255,170,60,.5)", tint: "linear-gradient(135deg,rgba(235,160,70,.45) 0%,rgba(70,100,170,.38) 55%,rgba(14,75,165,.3) 100%)" },
} as const;

/** Rich blue banner: pill, accented title, copy and white CTA on the left; three staggered glass stat cards on the right. */
function ScreeningBanner({ data }: { data: CtaSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#001A5E_0%,#002A78_45%,#00439C_100%)] py-14 sm:py-16 lg:py-20" aria-label={data.title}>
      {/* Deep-blue ground with two large light-blue sweeps: one arcing across the top, one rising along the bottom. */}
      <svg aria-hidden viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-0 -z-10 size-full">
        <defs>
          <linearGradient id="scr-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1B7BFF" stopOpacity=".5" />
            <stop offset="1" stopColor="#0A4CD0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="scr-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0B6BFF" stopOpacity=".55" />
            <stop offset="1" stopColor="#0A3FB0" stopOpacity=".05" />
          </linearGradient>
        </defs>
        <path d="M900 -10C1000 160 1160 230 1460 260V-10Z" fill="url(#scr-a)" />
        <path d="M-20 470C200 430 420 520 700 560S1200 540 1460 470V610H-20Z" fill="url(#scr-b)" />
        <path d="M-20 470C200 430 420 520 700 560S1200 540 1460 470" stroke="#3B8DFF" strokeOpacity=".5" strokeWidth="2" />
      </svg>

      <Container>
        <div>
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] lg:gap-4">
            <div>
              {data.eyebrow && (
                <p className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-md sm:text-[17px]">
                  <GraduationCap aria-hidden className="size-6 text-[#9CC8FF]" strokeWidth={1.8} />
                  {data.eyebrow}
                </p>
              )}
              <h2 className={cn(data.eyebrow && "mt-6", "type-section leading-[1.2] tracking-[-0.02em] text-white lg:whitespace-nowrap")}>
                {after !== undefined ? (
                  <>
                    <span className="block">{before.split("First Step")[0].trim()}</span>
                    <span className="block">
                    First Step {before.split("First Step")[1]}
                    <span className="relative inline-block text-[#0CF1F5]">
                      {data.accent}
                      <svg aria-hidden viewBox="0 0 300 12" preserveAspectRatio="none" fill="none" className="absolute inset-x-0 -bottom-2 h-2.5 w-full">
                        <path d="M3 9C60 3 150 3 297 6" stroke="#1E8BFF" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </span>
                    {after}
                    </span>
                  </>
                ) : (
                  data.title
                )}
              </h2>
              {data.subtitle && <p className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-white/95 sm:text-[18px]">{data.subtitle}</p>}
              <ButtonLink href={data.primary.href} variant="white" size="lg" className="group mt-8 w-full whitespace-normal! px-5! text-center font-semibold text-[#0B58C4] sm:whitespace-nowrap! shadow-[0_12px_30px_-8px_rgba(120,190,255,.8)] transition duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(120,190,255,.95)] sm:w-auto">
                {data.primary.label}
                <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
              </ButtonLink>
            </div>

            <ul className="grid gap-3 lg:gap-4">
              {(data.stats ?? []).map((st, i) => {
                const a = screeningAccents[st.accent];
                const Icon = a.icon;
                return (
                  <li key={st.value} className="flex">
                    <Reveal delay={i * 0.1} className="w-full">
                      <div className="relative flex items-center gap-3 overflow-hidden rounded-[18px] border px-3.5 py-3.5 text-white backdrop-blur-xl backdrop-saturate-150 sm:gap-5 sm:px-5 sm:py-4" style={{ background: a.tint, borderColor: a.border, boxShadow: `0 0 22px -2px ${a.glow}, 0 12px 28px -12px rgba(4,30,90,.6), inset 0 0 18px ${a.glow}, inset 0 1px 0 rgba(255,255,255,.55)` }}>
                        {/* Soft top sheen */}
                        <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.16)_0%,transparent_45%)]" />
                        <svg aria-hidden viewBox="0 0 200 100" preserveAspectRatio="none" className="pointer-events-none absolute right-0 bottom-0 h-[46%] w-[38%]">
                          <path d="M200 0C170 30 140 60 90 78S30 96 0 100H200Z" fill={a.ink} fillOpacity=".18" />
                          <path d="M200 40C176 62 146 80 100 90S40 98 20 100H200Z" fill={a.ink} fillOpacity=".45" />
                        </svg>
                        <span className="relative grid size-12 shrink-0 place-items-center rounded-[14px] bg-[rgba(10,40,110,.45)] shadow-[inset_0_0_14px_rgba(255,255,255,.1)] sm:size-16" style={{ color: a.ink }}>
                          <Icon aria-hidden className="size-6 sm:size-8" strokeWidth={1.8} />
                        </span>
                        <span aria-hidden className="relative h-10 w-px shrink-0 sm:h-12" style={{ backgroundColor: a.ink, opacity: 0.85 }} />
                        <div className="relative min-w-0">
                          <p className="text-[clamp(24px,2.5vw,40px)] leading-none font-extrabold tracking-[-0.02em]">{st.value}</p>
                          <p className="mt-1.5 text-[14px] leading-snug text-white sm:text-[16px]">{st.label}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Cta({ data }: { data: CtaSection }) {
  if (data.variant === "teal") return <TealBanner data={data} />;
  if (data.variant === "blue") return <TealBanner data={data} tone="blue" />;
  if (data.variant === "screening") return <ScreeningBanner data={data} />;
  return (
    <>
      <CTABand title={data.title} subtitle={data.subtitle} primary={data.primary} secondary={data.secondary} />
      {data.note && <p className="type-small -mt-8 mb-10 text-center text-muted">{data.note}</p>}
    </>
  );
}

/** Renders an inner page from its content definition. */
export function PageSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section.type) {
          case "hero":
            return <PageHero key={i} data={section} />;
          case "assessmentOverview":
            return <AssessmentOverview key={i} data={section} />;
          case "features":
            return <Features key={i} data={section} />;
          case "steps":
            return <Steps key={i} data={section} />;
          case "split":
            return <Split key={i} data={section} />;
          case "cta":
            return <Cta key={i} data={section} />;
          case "quotes":
            return <Quotes key={i} data={section} />;
          case "testimonialCarousel":
            return <TestimonialCarousel key={i} data={section} />;
          case "badges":
            return <Badges key={i} data={section} />;
          case "faq":
            return <FAQAccordion key={i} faqs={section.faqs} title={section.title} subtitle={section.subtitle} variant={section.variant} accent={section.accent} aside={section.aside} anchors={section.homeStyle} background={section.homeStyle ? "bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)]" : undefined} />;
          case "blogs":
            return <LatestBlogs key={i} />;
          case "contact":
            return <ContactSection key={i} />;
          case "logos":
            return <LogoMarquee key={i} />;
          case "reviewStrip":
            return <ReviewStrip key={i} stat={section.stat} />;
        }
      })}
    </>
  );
}
