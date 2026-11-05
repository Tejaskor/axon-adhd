import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Brain, ClipboardList, Clock, Layers } from "lucide-react";
import type { CtaSection, FeaturesSection, PageHero, SplitSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Arrow, h2, lead, wrap } from "./AccommodationSections";
import { VideoCardPlayer } from "./AssessmentVideo";
import { GradientCtaBanner } from "./GradientCtaBanner";
import { TrustBar } from "./TrustBar";

/**
 * ADHD Care page sections. All copy, images and link targets come from the page's content definition,
 * so only presentation changes. Tokens and helpers are shared with the Accommodation page.
 */

/* ------------------------------------------------ Hero */

/**
 * Report cards that pop out of the dashboard (see `.qb-*` in globals.css). From 640px the stage is a 100 × 73 grid
 * (1 unit = 1cqw) with the dashboard at x 17.5–78.5, y 14.5–54.4: each card sits at x/y with width w and pops out of
 * its source point on the dashboard (sx, sy) — the panel it details. Below 640px the cards form a plain grid. Listed
 * in mobile grid order; `wide` spans both mobile columns.
 */
const QB = "/images/adhdcare/";
const qbCards = [
  { src: "qbcheck-symptom-analysis-chart 1.webp", alt: "Symptom analysis chart tracking focus and impulsivity over six months", width: 1036, height: 505, x: 11, y: 55.5, w: 33.5, sx: 46.8, sy: 38.4, wide: true },
  { src: "qbcheck-report-completion 1.webp", alt: "87% report completion", width: 1041, height: 382, x: 65.5, y: 0, w: 28, sx: 71.2, sy: 26.5 },
  { src: "qbcheck-high-symptom-level 1.webp", alt: "19 assessments with a high symptom level, up 5 this week", width: 1044, height: 383, x: 74, y: 26.3, w: 26, sx: 59.6, sy: 26.5 },
  { src: "qbcheck-detailed-assessment-reports 1.webp", alt: "Detailed assessment reports", width: 1046, height: 383, x: 4.6, y: 1.3, w: 28, sx: 23.6, sy: 25.7 },
  { src: "qbcheck-attention-activity-analysis 1.webp", alt: "Attention and activity plot comparing a result with the reference range", width: 1041, height: 379, x: 67, y: 58.5, w: 29, sx: 70, sy: 40.8 },
  { src: "image 18.webp", alt: "Total symptom level compared with the general population", width: 1048, height: 386, x: 0, y: 34, w: 28, sx: 36.4, sy: 26.5, wide: true },
];

/**
 * Two-item restyle of the shared TrustBar for this hero only (its items: 1 Google rating · 2 divider ·
 * 3 avatars + caption · 4 divider · 5 Psychology Today badge). Items 4–5 are hidden here, so the shared
 * component keeps its badge everywhere else. One row with a divider on tablets and from 1280px, where it may run
 * past the copy column into the empty lower-left of the dashboard stage; between 1024 and 1280px the avatars wrap
 * under the rating; stacked on phones.
 */
const heroTrust = [
  "mt-0! flex-wrap items-center gap-x-7 gap-y-5 xl:flex-nowrap max-sm:flex-col max-sm:items-start",
  "[&>li]:shrink-0 [&>li:nth-child(n+4)]:hidden! [&>li[aria-hidden]]:h-12 [&>li[aria-hidden]]:bg-primary/15 lg:max-xl:[&>li:nth-child(2)]:hidden",
  // Google rating
  "[&>li:first-child]:gap-3 [&>li:first-child>img]:size-10 [&>li:first-child_svg]:size-[18px] [&>li:first-child>span>span:first-child]:gap-0.5",
  "[&>li:first-child>span>span:last-child]:text-[16px] [&>li:first-child>span>span:last-child]:leading-tight",
  // Avatars + caption, side by side; the caption breaks after "Helped"
  "[&>li:nth-child(3)]:flex-row [&>li:nth-child(3)]:gap-3.5 [&>li:nth-child(3)_img]:size-[38px] [&>li:nth-child(3)_img]:shadow-[0_3px_8px_rgba(18,61,106,.16)]",
  "[&>li:nth-child(3)>span:last-child]:min-w-0 [&>li:nth-child(3)>span:last-child]:max-w-[190px] [&>li:nth-child(3)>span:last-child]:text-left [&>li:nth-child(3)>span:last-child]:text-[16px] [&>li:nth-child(3)>span:last-child]:leading-snug [&>li:nth-child(3)>span:last-child]:text-[#0F2F55]",
].join(" ");

export function AdhdCareHero({ data }: { data: PageHero }) {
  // "Lead: key words" titles break after the colon and highlight the key words; other titles render as-is.
  const colon = data.title.indexOf(": ");
  const titleLead = colon > 0 ? data.title.slice(0, colon + 1) : null;
  const titleKey = data.title.slice(colon + 2);
  return (
    <section aria-labelledby="page-title" className="relative -mt-[var(--header-height)] overflow-hidden bg-[radial-gradient(ellipse_42%_55%_at_0%_0%,#D2D8FD,transparent_70%),radial-gradient(ellipse_48%_55%_at_100%_8%,#D4F8F8,transparent_72%),radial-gradient(ellipse_60%_45%_at_100%_100%,#CBE7FE,transparent_72%),linear-gradient(180deg,#D6F1FD_0%,#E6F1FE_30%,#EEF7FE_65%,#DCECFE_100%)] pt-[calc(var(--header-height)+36px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-height)+56px)] lg:pb-24">
      <div className={cn(wrap, "relative grid items-center gap-12 sm:gap-14 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-10 xl:gap-0")}>
        <div className="relative z-10 max-w-[620px]">
          {data.eyebrow && <p className="mb-4 text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">{data.eyebrow}</p>}
          <h1 id="page-title" className="qb-in font-display text-[clamp(32px,3.4vw,48px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance text-[#0F2F55] lg:[text-wrap:wrap]">
            {titleLead ? (
              <>
                <span className="block">{titleLead}</span>{" "}
                <span className="box-decoration-clone bg-[linear-gradient(100deg,#2578CA_10%,#3C8BD9_90%)] bg-clip-text text-transparent">{titleKey}</span>
              </>
            ) : (
              data.title
            )}
          </h1>
          {data.text.map((t) => (
            <p key={t} className="qb-in mt-7 max-w-[490px] text-[16px] leading-[1.75] text-pretty text-[#44566E] sm:text-[17px]" style={{ "--d": 0.12 } as CSSProperties}>
              {t}
            </p>
          ))}
          {data.ctas.length > 0 && (
            <div className="qb-in mt-7 flex flex-col items-start gap-3.5" style={{ "--d": 0.24 } as CSSProperties}>
              {data.ctas.map((cta, i) =>
                i === 0 ? (
                  <ButtonLink
                    key={cta.label}
                    href={cta.href}
                    size="lg"
                    className="group min-h-14! gap-5! rounded-full! bg-[linear-gradient(90deg,#1F64B8_0%,#2578CA_55%,#3A8AD8_100%)]! py-2! pr-2.5! pl-8! text-[17px]! font-medium! text-white! shadow-[0_16px_32px_-12px_rgba(37,120,202,.65)]! transition-[translate,box-shadow]! duration-300! hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_rgba(37,120,202,.75)]! active:translate-y-0"
                  >
                    {cta.label}
                    <span aria-hidden className="grid size-9 place-items-center rounded-full bg-white text-primary shadow-[0_4px_10px_rgba(11,37,75,.18)]">
                      <Arrow />
                    </span>
                  </ButtonLink>
                ) : (
                  <ButtonLink key={cta.label} href={cta.href} size="lg" variant="outline" className="group border-primary! text-primary! hover:bg-primary! hover:text-white!">
                    {cta.label}
                    <Arrow />
                  </ButtonLink>
                ),
              )}
            </div>
          )}
          {data.note && <p className="type-small mt-3 text-[#5B6B80]">{data.note}</p>}
          {data.trust && (
            <div className="qb-in mt-10 xl:w-max" style={{ "--d": 0.36 } as CSSProperties}>
              <TrustBar className={heroTrust} />
            </div>
          )}
        </div>

        <div className="qb-stage relative mx-auto grid w-full max-w-[720px] grid-cols-2 gap-3 sm:block sm:aspect-[100/73] lg:max-w-none xl:-ml-10 xl:w-[calc(100%+2.5rem)]">
          {/* Glow and two faint orbit rings, centred on the dashboard */}
          <div aria-hidden className="absolute top-[47%] left-[48%] hidden size-[78cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,120,202,.16),rgba(134,182,229,.08)_45%,transparent_70%)] sm:block" />
          <div aria-hidden className="absolute top-[47%] left-[48%] hidden size-[70cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 shadow-[inset_0_0_40px_rgba(255,255,255,.35)] sm:block" />
          <div aria-hidden className="absolute top-[47%] left-[48%] hidden size-[104cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 sm:block" />
          <div className="qb-dash relative col-span-2 rounded-[16px] shadow-[0_30px_70px_rgba(18,61,106,.18),0_0_0_7px_rgba(255,255,255,.55),0_0_0_8px_rgba(37,120,202,.10)] sm:absolute sm:top-[14.5cqw] sm:left-[17.5cqw] sm:w-[61cqw] sm:rounded-[1.8cqw]">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              priority
              unoptimized
              className="h-auto w-full rounded-[inherit]"
            />
          </div>

          {qbCards.map((c, i) => (
            <div
              key={c.src}
              className={cn("qb-card z-20", c.wide && "col-span-2")}
              style={{ "--i": i, "--x": c.x, "--y": c.y, "--w": c.w, "--fx": c.sx - c.x - c.w / 2, "--fy": c.sy - c.y - ((c.w * c.height) / c.width) / 2 } as CSSProperties}
            >
              <div className="qb-float rounded-[14px] bg-white/55 p-1 shadow-[0_14px_34px_rgba(18,61,106,.16)] ring-1 ring-white/80 backdrop-blur-md sm:rounded-[1.6cqw] sm:p-[0.5cqw]">
                <Image src={QB + c.src} alt={c.alt} width={c.width} height={c.height} unoptimized className="h-auto w-full rounded-[10px] sm:rounded-[1.2cqw]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Care and support services */

/**
 * Floating glass cards around the video (lg+). The stage is a 100 × 37.85 grid (1 unit = 1cqw): the framed 16:9
 * video's box at 66% width (x 17–83, its padding included), so each card's curved connector can end on the video's
 * edge. Connectors start under their card (cards sit above the lines).
 */
/** Item accents in reading order: blue, green, orange, purple (the PathCard tones). */
const careTones = ["blue", "green", "orange", "purple"] as const;

/** Centred heading and intro (two lines on desktop), the framed explainer video, then four centred icon cards. */
export function AdhdCareServices({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
      <div className={cn(wrap, "relative")}>
        <Reveal className="mx-auto max-w-[1300px] text-center">
          <h2 id="services-title" className={cn(h2, "mx-auto max-w-[880px] text-[#0F2F55]")}>
            {after !== undefined ? (
              <>
                {before}
                <span className="text-[#0A4FF0]">{data.accent}</span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.subtitle && <p className={cn(lead, "mx-auto mt-5 max-w-[820px] text-[#1F3350] lg:max-w-[1280px] lg:text-[clamp(13px,1.15vw,15px)] lg:text-balance")}>{data.subtitle}</p>}
        </Reveal>

        {data.video && (
          <Reveal delay={0.05}>
            <div className="mx-auto mt-10 max-w-[980px] rounded-[30px] border border-white bg-white/70 p-2 shadow-[0_30px_70px_-24px_rgba(37,120,202,.45)] sm:p-2.5 lg:mt-12">
              <VideoCardPlayer id={data.video.id} title={data.video.title} poster="maxres" />
            </div>
          </Reveal>
        )}

        <ul className="mx-auto mt-6 grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {data.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={0.05 + i * 0.06} className="flex w-full">
                <PathCard
                  center
                  tone={careTones[i % careTones.length]}
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

/* ------------------------------------------------ "The ADHD brain is specialized" */

/** Card tints in item order: blue, lavender, mint, orange. */
const specializedTones = [
  { tile: "bg-[#E3EFFC] text-[#1766D6]", card: "border-[#D3E3F8] bg-[linear-gradient(120deg,rgba(231,241,254,.9),rgba(255,255,255,.7))]" },
  { tile: "bg-[#EEE9FF] text-[#6D4AE0]", card: "border-[#E0D8F8] bg-[linear-gradient(120deg,rgba(240,235,255,.9),rgba(255,255,255,.7))]" },
  { tile: "bg-[#DDF7EF] text-[#12998A]", card: "border-[#CDEFE3] bg-[linear-gradient(120deg,rgba(228,247,240,.9),rgba(255,255,255,.7))]" },
  { tile: "bg-[#FFEBCB] text-[#EB8B01]", card: "border-[#F7E1BE] bg-[linear-gradient(120deg,rgba(255,243,224,.9),rgba(255,255,255,.7))]" },
] as const;

/** Where each card sits from lg: two either side of the photo (reading order stays 1-4 below lg). */
const specializedPlace = ["lg:col-start-1 lg:row-start-1", "lg:col-start-3 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-3 lg:row-start-2"] as const;

/** Centred heading and intro, then the framed photo (shown whole, centred between the cards) flanked by four centred, tinted service cards. */
export function AdhdCareSpecialized({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)] py-14 sm:py-16 lg:py-20" aria-labelledby="specialized-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[1000px] text-center">
          <h2 id="specialized-title" className={cn(h2, "text-[#0B1F4D]")}>
            {after !== undefined ? (
              <>
                <span className="block">{before.trim()}</span>
                <span className="relative inline-block text-[#3B2DC7]">
                  {data.accent}
                  <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[16%] -bottom-[0.18em] h-[0.18em] w-[68%]" fill="none">
                    <path d="M2 10 C 70 3, 190 3, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.subtitle && <p className={cn(lead, "mx-auto mt-6 max-w-[940px] text-[#33465E]")}>{data.subtitle}</p>}
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[0.85fr_1.75fr_0.85fr] lg:grid-rows-2 lg:gap-6">
          {data.image && (
            <Reveal delay={0.05} className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div className="rounded-[34px] border border-white/90 bg-white/70 p-2.5 shadow-[0_28px_64px_-24px_rgba(37,60,160,.35)] sm:p-3">
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  width={data.image.width}
                  height={data.image.height}
                  sizes="(max-width: 1023px) 100vw, 680px"
                  className="h-auto w-full rounded-[26px]"
                />
              </div>
            </Reveal>
          )}
          {data.items.map((item, i) => {
            const t = specializedTones[i % specializedTones.length];
            return (
              <Reveal key={item.title} delay={0.1 + i * 0.06} className={cn("flex", specializedPlace[i])}>
                <div className={cn("flex w-full flex-col items-center justify-center rounded-[26px] border px-5 py-6 text-center shadow-[0_14px_34px_-20px_rgba(37,120,202,.4)] backdrop-blur-sm sm:px-6", t.card)}>
                  <span aria-hidden className={cn("grid size-14 place-items-center rounded-2xl shadow-[0_8px_18px_-8px_rgba(37,120,202,.3)] lg:size-12", t.tile)}>
                    {item.icon && <FeatureIcon name={item.icon} className="size-7 lg:size-6" />}
                  </span>
                  <h3 className="mt-3 max-w-[300px] text-[17px] leading-snug font-bold text-balance text-[#0B1F4D] sm:text-[18px]">{item.title}</h3>
                  {item.text && <p className="mt-1.5 max-w-[320px] text-[14px] leading-snug text-pretty text-[#44566E] sm:text-[15px]">{item.text}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ "Haven't Started Yet?" banner */

/** Full-bleed blue banner shared with the assessment page's "Ready for an Official Diagnosis?" (same layout, colours and buttons). */
export function AdhdCareStartCta({ data }: { data: CtaSection }) {
  return <GradientCtaBanner data={data} accent="Started Yet?" titleId="start-title" />;
}

/* ------------------------------------------------ Closing CTA ("You don't have to manage ADHD alone.") */

const closingBtn =
  "group min-h-14! gap-3! rounded-full! bg-white! px-7! text-[16px]! font-semibold! whitespace-normal text-[#0F4C6E]! shadow-[0_16px_34px_-14px_rgba(4,24,44,.6)]! transition-[translate,box-shadow,background-color]! duration-300! hover:-translate-y-0.5 hover:bg-[#F2FAFE]! hover:shadow-[0_22px_42px_-14px_rgba(4,24,44,.65)]! sm:px-8! sm:text-[17px]!";

/** Edge-to-edge teal-to-blue banner with translucent circles and flowing lines (CSS only), centred copy and two white pill buttons. */
export function AdhdCareClosingCta({ data }: { data: CtaSection }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(110deg,#0A3253_0%,#0E4569_30%,#13618E_58%,#1A8BBF_84%,#24A9D8_100%)] py-20 text-center text-white sm:py-24 lg:py-32" aria-labelledby="closing-title">
      {/* Haze: lighter towards the top, deeper along the bottom */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_62%_0%,rgba(90,190,235,.2),transparent_70%),linear-gradient(180deg,transparent_55%,rgba(4,24,44,.14)_100%)]" />

      {/* Left: three overlapping translucent discs, each edge picked out by a soft cast shadow */}
      <div aria-hidden className="absolute top-[-4.5%] left-[-24.5%] -z-10 aspect-square blur-[2px] w-[41%] rounded-full bg-[linear-gradient(150deg,rgba(255,255,255,.05),rgba(255,255,255,.01)_70%)] shadow-[30px_10px_80px_-10px_rgba(3,20,38,.2)]" />
      <div aria-hidden className="absolute top-[-31%] left-[-16.5%] -z-10 aspect-square blur-[2px] w-[31%] rounded-full bg-[linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.015)_70%)] shadow-[24px_16px_70px_-10px_rgba(3,20,38,.2)]" />
      <div aria-hidden className="absolute top-[73%] left-[-12%] -z-10 aspect-square blur-[2px] w-[37%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,0)_45%)] shadow-[0_-18px_60px_-14px_rgba(3,20,38,.18)]" />

      {/* Right: two bright cyan discs */}
      <div aria-hidden className="absolute top-[-4.5%] left-[80%] -z-10 aspect-square blur-[2px] w-[45%] rounded-full bg-[linear-gradient(200deg,rgba(70,200,240,.38),rgba(40,160,215,.1)_70%)] shadow-[-24px_10px_80px_-12px_rgba(3,40,70,.18)]" />
      <div aria-hidden className="absolute top-[54%] left-[74%] -z-10 aspect-square blur-[2px] w-[28%] rounded-full bg-[linear-gradient(160deg,rgba(70,195,238,.32),rgba(30,140,200,.07)_70%)] shadow-[-18px_-8px_70px_-12px_rgba(3,40,70,.16)]" />

      {/* Flowing lines */}
      <svg aria-hidden viewBox="0 0 2000 669" preserveAspectRatio="none" fill="none" className="absolute inset-0 -z-10 size-full">
        <path d="M0 255C220 262 330 360 440 440S640 570 760 565S900 520 960 500" stroke="rgba(255,255,255,.1)" strokeWidth="2" />
        <path d="M2000 270C1880 330 1830 470 1730 560S1580 660 1540 690" stroke="rgba(255,255,255,.09)" strokeWidth="2" />
      </svg>

      <Reveal className={cn(wrap, "max-w-[960px]")}>
        <h2 id="closing-title" className="type-section font-display leading-[1.15] tracking-[-0.02em] text-balance">
          {data.title}
        </h2>
        {data.subtitle && <p className="mx-auto mt-5 max-w-[760px] text-[17px] leading-[1.7] text-pretty text-white/90 sm:text-[19px]">{data.subtitle}</p>}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <ButtonLink href={data.primary.href} size="lg" className={closingBtn}>
            {data.primary.label}
            <Arrow />
          </ButtonLink>
          {data.secondary && (
            <ButtonLink href={data.secondary.href} size="lg" className={closingBtn}>
              {data.secondary.label}
              <Arrow />
            </ButtonLink>
          )}
        </div>
        {data.note && <p className="type-small mt-4 text-white/75">{data.note}</p>}
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------ "Your Path to Long-Term Success" */

/** Per-card accents: icon badge, icon colour and the pastel curve at the bottom-right. */
export const pathTones = {
  blue: { badge: "bg-[#E3EFFC] text-primary", curve: "#D6E7FA" },
  green: { badge: "bg-[#DDF6EC] text-[#16A34A]", curve: "#D9F4E8" },
  purple: { badge: "bg-[#F0E8FD] text-[#9333EA]", curve: "#EDE3FC" },
  orange: { badge: "bg-[#FDEEE0] text-[#EA6A12]", curve: "#FCE6D3" },
} as const;
const pathToneOrder = ["blue", "green", "purple", "orange"] as const;

/** Translucent card with a pastel icon badge and a corner curve. Also used by the home page's WhyAxon. */
export function PathCard({ tone, icon, title, text, center }: { tone: keyof typeof pathTones; icon: ReactNode; title: string; text?: string; center?: boolean }) {
  const t = pathTones[tone];
  return (
    <div className={cn("group relative isolate flex w-full flex-col overflow-hidden rounded-[24px] border border-primary-100 bg-white/70 p-7 shadow-[0_18px_40px_-24px_rgba(18,61,106,.3)] backdrop-blur-md transition-[translate,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_28px_52px_-24px_rgba(37,120,202,.42)] sm:p-8", center && "items-center p-6 text-center sm:p-6")}>
      <svg aria-hidden viewBox="0 0 200 140" preserveAspectRatio="none" className="absolute right-0 bottom-0 -z-10 h-[46%] w-[62%] transition-transform duration-500 ease-brand group-hover:scale-105" style={{ transformOrigin: "100% 100%" }}>
        <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" fill={t.curve} fillOpacity=".75" />
      </svg>
      <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-full", center && "size-[72px]", t.badge)}>
        {icon}
      </span>
      <h3 className={cn("mt-6 font-display text-[20px] leading-snug font-bold text-[#0F2F55]", center && "mt-4 text-[19px]")}>{title}</h3>
      {text && <p className={cn("mt-3 text-[16px] leading-[1.65] text-pretty text-[#5B6B80]", center && "mt-2 max-w-[260px] text-[15px] leading-[1.55]")}>{text}</p>}
    </div>
  );
}

/** Centred heading (accent words in a blue gradient) over four PathCards, on the "Your Journey to Clarity" background. */
export function AdhdCarePath({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] py-16 sm:py-20 lg:py-24" aria-labelledby="path-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2 id="path-title" className={cn(h2, "text-[#0F2F55]")}>
            {after !== undefined ? (
              <>
                {before}
                <span className="bg-[linear-gradient(90deg,#2578CA_0%,#3C8BD9_100%)] bg-clip-text text-transparent">{data.accent}</span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.subtitle && <p className={cn(lead, "mx-auto mt-4 text-[#5B6B80]")}>{data.subtitle}</p>}
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={i * 0.06} className="flex w-full">
                <PathCard
                  tone={pathToneOrder[i % pathToneOrder.length]}
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

/* ------------------------------------------------ "Practical Tools for Everyday Success" */

/** AXON ADHD dashboard card overlaid on the lower-left of the coaching photo (the artwork carries its own card and shadow). */
const toolsOverlay = { src: "/images/adhdcare/axon-adhd-dashboard-ui.webp", width: 1890, height: 832 };

/** Icon tile and tint for each of the four tools, in list order. */
const toolCards = [
  { Icon: ClipboardList, tile: "bg-[#E3EFFC] text-[#1766D6]" },
  { Icon: Clock, tile: "bg-[#DDF7EF] text-[#12998A]" },
  { Icon: Brain, tile: "bg-[#EEE9FF] text-[#6D4AE0]" },
  { Icon: Layers, tile: "bg-[#FFEBCB] text-[#EB8B01]" },
] as const;

/** Pill, accent heading, intro and a 2 × 2 grid of tool cards on the left; the coaching photo in a white frame with the dashboard overlay on the right. */
export function AdhdCareTools({ data }: { data: SplitSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-16 sm:py-20 lg:py-24" aria-labelledby="tools-title">
      <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14")}>
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[#B9D0F3] bg-white/55 px-5 py-2 text-[14px] font-semibold text-[#0A4FF0] sm:text-[16px]">
            <Layers aria-hidden className="size-5" strokeWidth={1.75} />
            Evidence-Based Strategies
          </p>
          <h2 id="tools-title" className={cn(h2, "mt-5 text-[#0B1F4D]")}>
            {after !== undefined ? (
              <>
                <span className="block">{before.trim()}</span>
                <span className="relative inline-block text-[#0A4FF0]">
                  {data.accent}
                  <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[2%] -bottom-[0.18em] h-[0.18em] w-[96%]" fill="none">
                    <path d="M2 10 C 70 3, 190 3, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className={cn(lead, "mt-6 max-w-[600px] text-[#33465E]")}>
              {p}
            </p>
          ))}
          {data.list && (
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {data.list.map((li, i) => {
                const { Icon, tile } = toolCards[i % toolCards.length];
                return (
                  <li key={li} className="flex items-center gap-4 rounded-[20px] border border-white/90 bg-white/80 p-4 shadow-[0_14px_34px_-20px_rgba(37,120,202,.4)] backdrop-blur-sm">
                    <span aria-hidden className={cn("grid size-14 shrink-0 place-items-center rounded-2xl", tile)}>
                      <Icon className="size-7" strokeWidth={1.75} />
                    </span>
                    <span className="text-[16px] leading-snug font-bold text-balance text-[#0B1F4D] sm:text-[17px]">{li}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Reveal>

        {data.image && (
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[680px] rounded-[34px] border border-white/90 bg-white/70 p-2.5 shadow-[0_28px_64px_-24px_rgba(37,60,160,.35)] sm:p-3 lg:max-w-none">
              <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} unoptimized className="aspect-[5/4] w-full rounded-[26px] object-cover" />
              <div className="absolute right-[7%] bottom-[7%] left-[7%] rounded-[16px] bg-white shadow-[0_24px_50px_-18px_rgba(18,61,106,.35)] sm:rounded-[20px]">
                <Image src={toolsOverlay.src} alt="AXON ADHD coaching dashboard" width={toolsOverlay.width} height={toolsOverlay.height} unoptimized className="h-auto w-full rounded-[inherit]" />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
