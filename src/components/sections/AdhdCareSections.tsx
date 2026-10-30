import type { CSSProperties } from "react";
import Image from "next/image";
import { Brain, Check, HeartHandshake, Lightbulb, UserCheck } from "lucide-react";
import type { CtaSection, FeaturesSection, PageHero, SplitSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Arrow, h2, lead, wrap } from "./AccommodationSections";
import { VideoCardPlayer } from "./AssessmentVideo";
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
    <section aria-labelledby="page-title" className="relative -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(140deg,#F4F9FE_0%,#E6F0FB_52%,#F8FBFF_100%)] pt-[calc(var(--header-height)+36px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-height)+56px)] lg:pb-24">
      <div aria-hidden className="absolute -top-24 right-[-10%] size-[560px] rounded-full bg-[radial-gradient(circle,rgba(84,152,219,.26),transparent_68%)] blur-2xl" />
      <div aria-hidden className="absolute bottom-[-180px] left-[-120px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.45),transparent_70%)] blur-2xl" />
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
const videoCards = [
  { label: "Expert Guidance", Icon: UserCheck, pos: "left-0 top-[4cqw]", d: "M7.5 8C7.5 15 12 18 17 18", node: [17, 18] },
  { label: "Personalized Support", Icon: HeartHandshake, pos: "left-[1.5cqw] top-[24cqw]", d: "M9 28C9 34 13 37.4 20 37.8", node: [20, 37.8] },
  { label: "Real Strategies", Icon: Lightbulb, pos: "right-0 top-[14cqw]", d: "M92.5 18C92.5 25 88 27 83 27", node: [83, 27] },
];

/** Centred heading, the explainer video with floating glass cards, then a single soft panel that holds all the items as columns. */
export function AdhdCareServices({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F6FAFE_0%,#EAF3FC_55%,#F7FAFE_100%)] py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
      {/* Dotted patches and soft abstract curves */}
      <div aria-hidden className="absolute top-10 left-0 h-56 w-64 bg-[radial-gradient(rgba(37,120,202,.18)_1.2px,transparent_1.4px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_top_left,#000,transparent_70%)]" />
      <div aria-hidden className="absolute right-0 bottom-24 h-64 w-72 bg-[radial-gradient(rgba(37,120,202,.18)_1.2px,transparent_1.4px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_bottom_right,#000,transparent_70%)]" />
      <svg aria-hidden viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" className="absolute inset-0 size-full">
        <path d="M-40 260C220 120 420 380 700 250S1180 60 1480 190" stroke="rgba(37,120,202,.10)" strokeWidth="1.5" />
        <path d="M-40 720C260 580 520 820 820 700S1240 520 1480 640" stroke="rgba(37,120,202,.08)" strokeWidth="1.5" />
      </svg>

      <div className={cn(wrap, "relative")}>
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2 id="services-title" className={cn(h2, "text-[#0F2F55]")}>
            {after !== undefined ? (
              <>
                {before}
                <span className="text-primary">{data.accent}</span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.subtitle && <p className={cn(lead, "mx-auto mt-5 max-w-[820px]")}>{data.subtitle}</p>}
        </Reveal>

        {data.video && (
          <Reveal delay={0.05}>
            <div className="relative mx-auto mt-12 max-w-[1200px] lg:mt-14 lg:[container-type:inline-size]">
              <div className="relative z-10 mx-auto rounded-[28px] border border-white bg-white/60 p-2 shadow-[0_30px_70px_-24px_rgba(37,120,202,.45)] backdrop-blur-sm sm:p-2.5 lg:w-[66%]">
                <VideoCardPlayer id={data.video.id} title={data.video.title} poster="maxres" />
              </div>

              <svg aria-hidden viewBox="0 0 100 37.85" fill="none" className="pointer-events-none absolute inset-0 z-20 hidden size-full overflow-visible lg:block">
                {videoCards.map((c) => (
                  <g key={c.label}>
                    <path d={c.d} stroke="#2578CA" strokeOpacity=".45" strokeWidth=".14" strokeLinecap="round" />
                    <circle cx={c.node[0]} cy={c.node[1]} r=".45" fill="#2578CA" stroke="#fff" strokeWidth=".18" />
                  </g>
                ))}
              </svg>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:mt-0">
                {videoCards.map(({ label, Icon, pos }) => (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-3 rounded-[18px] border border-white/80 bg-white/70 p-3 shadow-[0_14px_34px_-12px_rgba(18,61,106,.22)] backdrop-blur-md",
                      "lg:absolute lg:z-30 lg:w-[15cqw] lg:gap-[1cqw] lg:rounded-[1.6cqw] lg:p-[1cqw]",
                      pos,
                    )}
                  >
                    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#E8F2FC] text-primary lg:size-[3.2cqw] lg:rounded-[1cqw]">
                      <Icon className="size-5 lg:size-[1.6cqw]" strokeWidth={1.75} />
                    </span>
                    <span className="text-[15px] leading-snug font-semibold text-[#0F2F55] lg:text-[clamp(13px,1.3cqw,16px)]">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <div className="relative mt-14 lg:mt-16">
            {/* Soft blue blobs at both edges and two dotted grids behind the cards */}
            <div aria-hidden className="absolute top-1/2 -left-56 size-[460px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.6),rgba(182,211,240,.18)_55%,transparent_72%)]" />
            <div aria-hidden className="absolute -top-24 -right-56 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.55),rgba(182,211,240,.16)_55%,transparent_72%)]" />
            <div aria-hidden className="absolute top-[42%] -left-10 hidden h-36 w-28 bg-[radial-gradient(rgba(37,120,202,.22)_1.6px,transparent_1.8px)] [background-size:22px_22px] sm:block" />
            <div aria-hidden className="absolute -top-10 -right-8 hidden h-28 w-36 bg-[radial-gradient(rgba(37,120,202,.22)_1.6px,transparent_1.8px)] [background-size:22px_22px] sm:block" />

            <ul className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {data.items.map((item) => (
                <li
                  key={item.title}
                  className="group flex h-full flex-col items-center rounded-[22px] border border-white bg-[linear-gradient(180deg,rgba(255,255,255,.94),rgba(255,255,255,.72))] px-7 pt-10 pb-8 text-center shadow-[0_26px_50px_-30px_rgba(37,120,202,.5),0_2px_6px_rgba(18,61,106,.04)] backdrop-blur-md transition-[translate,box-shadow] duration-300 ease-brand hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-30px_rgba(37,120,202,.6),0_2px_6px_rgba(18,61,106,.05)]"
                >
                  <span aria-hidden className="relative grid size-[88px] shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,#EFF6FD,#DCE9F8)] text-primary shadow-[0_16px_28px_-14px_rgba(37,120,202,.45)]">
                    {/* Accent arc around the badge's upper right, ending in a dot */}
                    <svg viewBox="0 0 120 120" fill="none" className="absolute -inset-4 size-[120px] transition-transform duration-500 ease-brand group-hover:rotate-[18deg]">
                      <path d="M63.9 4.1A56 56 0 0 1 111.7 81.4" stroke="#2578CA" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="111.7" cy="81.4" r="3.2" fill="#2578CA" />
                    </svg>
                    {item.icon && <FeatureIcon name={item.icon} className="size-9 transition-transform duration-500 ease-brand group-hover:scale-110" />}
                  </span>
                  <h3 className="mt-7 font-display text-[21px] leading-tight font-bold tracking-[-0.01em] text-[#2A4A70]">{item.title}</h3>
                  {item.text && <p className="mt-3 max-w-[260px] text-[16px] leading-[1.65] text-pretty text-[#5B6B80]">{item.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ "The ADHD brain is specialized" */

const tileTones = ["bg-[#E3EFFC] text-primary", "bg-[#DDF7EF] text-[#12998A]", "bg-[#FFE8EC] text-[#E5484D]", "bg-[#EEE9FF] text-[#6D4AE0]"];

const dots = "bg-[radial-gradient(rgba(37,120,202,.22)_1.6px,transparent_1.8px)] [background-size:20px_20px]";

/** Centred heading over a framed photo (with blue backing shapes and a brain badge) beside four horizontal service cards. */
export function AdhdCareSpecialized({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F5F9FE_0%,#EBF3FC_60%,#F4F8FD_100%)] py-14 sm:py-16 lg:py-20" aria-labelledby="specialized-title">
      <div aria-hidden className="absolute top-40 -left-48 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.55),rgba(182,211,240,.15)_55%,transparent_72%)]" />
      <div aria-hidden className="absolute -top-20 -right-56 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(134,182,229,.4),rgba(182,211,240,.14)_55%,transparent_72%)]" />
      <div aria-hidden className={cn("absolute top-1/2 right-4 hidden h-40 w-24 lg:block", dots)} />

      <div className={cn(wrap, "relative")}>
        <Reveal className="mx-auto max-w-[1000px] text-center">
          <h2 id="specialized-title" className={cn(h2, "text-[#0F2F55]")}>
            {after !== undefined ? (
              <>
                {before.trim()}{" "}
                <span className="block text-primary">{data.accent}</span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.subtitle && <p className={cn(lead, "mx-auto mt-5 max-w-[940px] text-[#5B6B80]")}>{data.subtitle}</p>}
        </Reveal>

        {/* Image column slightly wider than the cards (as in the design); the image is centred on the card stack's height (no scroll offset on it, so it never sits low) */}
        <div className="mt-10 grid items-center gap-10 lg:mt-12 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] xl:gap-10">
          {data.image && (
            <div className="w-full xl:self-center">
              <div className="relative mx-auto max-w-[640px] p-4 sm:p-6 xl:max-w-none">
                {/* Blue backing shapes, dotted grid and a dashed orbit with a node */}
                <div aria-hidden className="absolute top-0 right-0 h-[62%] w-[42%] rounded-[36px] bg-[linear-gradient(160deg,#5498DB,#2578CA)] opacity-90" />
                <div aria-hidden className="absolute bottom-[10%] left-0 h-[58%] w-[18%] rounded-[32px] bg-[linear-gradient(180deg,#5498DB,#86B6E5)] opacity-80" />
                <div aria-hidden className={cn("absolute -top-4 -left-4 hidden h-28 w-40 sm:block", dots)} />
                <svg aria-hidden viewBox="0 0 60 220" fill="none" className="absolute bottom-0 -left-3 hidden h-[45%] sm:block">
                  <path d="M40 4C10 50 6 140 44 206" stroke="#2578CA" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
                  <circle cx="34" cy="186" r="6" fill="#fff" stroke="#2578CA" strokeWidth="3" />
                </svg>

                <div className="relative rounded-[28px] border border-white bg-white/80 p-2 shadow-[0_30px_60px_-24px_rgba(37,120,202,.5)] backdrop-blur-sm sm:p-2.5">
                  <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1279px) 640px, 680px" className="aspect-[4/3] h-auto w-full rounded-[22px] object-cover object-[50%_35%]" />
                </div>
                <span aria-hidden className="absolute top-0 left-0 grid size-20 place-items-center rounded-full bg-white text-primary shadow-[0_14px_30px_-10px_rgba(37,120,202,.5),0_0_0_8px_rgba(255,255,255,.55)] sm:size-24">
                  <Brain className="size-9 sm:size-11" strokeWidth={1.6} />
                </span>
              </div>
            </div>
          )}

          <ul className="grid gap-3.5">
            {data.items.map((item, i) => (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.06} className="flex w-full">
                  <div className="group flex w-full items-center gap-4 rounded-[18px] border border-primary-100 bg-white/70 px-4 py-3.5 shadow-[0_14px_34px_-20px_rgba(18,61,106,.28)] backdrop-blur-md transition-[translate,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_24px_46px_-22px_rgba(37,120,202,.42)] sm:px-5">
                    <span aria-hidden className={cn("grid size-11 shrink-0 place-items-center self-start rounded-full transition-transform duration-300 ease-brand group-hover:scale-105 sm:size-12 sm:self-center", tileTones[i % tileTones.length])}>
                      {item.icon && <FeatureIcon name={item.icon} className="size-5" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[16px] leading-tight font-bold text-[#0F2F55]">{item.title}</h3>
                      {item.text && <p className="mt-1 text-[13px] leading-[1.5] text-[#5B6B80]">{item.text}</p>}
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

/* ------------------------------------------------ "Haven't Started Yet?" banner */

const startAccent = "Started Yet?";
const whiteDots = "bg-[radial-gradient(rgba(255,255,255,.28)_1.4px,transparent_1.6px)] [background-size:18px_18px]";

/** Full-width blue gradient banner: left-aligned heading, description and the screening button (CSS-only decoration). */
export function AdhdCareStartCta({ data }: { data: CtaSection }) {
  const [before, after] = data.title.includes(startAccent) ? data.title.split(startAccent) : [data.title];
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#256ACC_0%,#133566_100%)] py-16 text-white sm:py-20 lg:py-24" aria-labelledby="start-title">
      {/* Rings, soft glows, curved lines and dotted patches */}
      <div aria-hidden className="absolute -top-40 -left-32 -z-10 size-[460px] rounded-full border border-white/10 bg-white/[0.04]" />
      <div aria-hidden className="absolute -top-24 -left-16 -z-10 size-[300px] rounded-full border border-white/10" />
      <div aria-hidden className="absolute -right-32 -bottom-48 -z-10 size-[520px] rounded-full border border-white/10 bg-[#86B6E5]/10" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(134,182,229,.22),transparent_65%)]" />
      <svg aria-hidden viewBox="0 0 1440 420" preserveAspectRatio="none" fill="none" className="absolute inset-0 -z-10 size-full">
        <path d="M-20 330C240 230 460 400 760 300S1200 150 1460 240" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" />
        <path d="M-20 120C260 40 520 200 820 110S1240 20 1460 90" stroke="rgba(255,255,255,.08)" strokeWidth="1.5" strokeDasharray="3 8" strokeLinecap="round" />
      </svg>
      <div aria-hidden className={cn("absolute top-10 right-[8%] -z-10 hidden h-24 w-36 sm:block", whiteDots)} />
      <div aria-hidden className={cn("absolute bottom-10 left-[6%] -z-10 hidden h-24 w-36 sm:block", whiteDots)} />

      <Reveal className={cn(wrap, "relative flex flex-col items-start text-left")}>
        <h2 id="start-title" className="font-display text-[34px] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance sm:text-[44px] lg:text-[54px]">
          {after !== undefined ? (
            <>
              {before}
              <span className="text-[#8CC0F2]">{startAccent}</span>
              {after}
            </>
          ) : (
            data.title
          )}
        </h2>
        {data.subtitle && <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-pretty text-white/88 sm:text-[19px]">{data.subtitle}</p>}

        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
          <ButtonLink
            href={data.primary.href}
            size="lg"
            className="group min-h-14! gap-3! rounded-full! bg-white! px-8! text-[17px]! font-semibold! whitespace-normal text-primary-600! shadow-[0_18px_36px_-14px_rgba(6,26,54,.55)]! transition-[translate,box-shadow,background-color]! duration-300! hover:-translate-y-0.5 hover:bg-[#F3F8FE]! hover:shadow-[0_24px_44px_-14px_rgba(6,26,54,.6)]!"
          >
            {data.primary.label}
            <Arrow />
          </ButtonLink>
          {data.secondary && (
            <ButtonLink href={data.secondary.href} variant="outline" size="lg" className="min-h-14! rounded-full! border-white/70! bg-transparent! px-8! whitespace-normal text-white! hover:bg-white! hover:text-primary-600!">
              {data.secondary.label}
            </ButtonLink>
          )}
        </div>
        {data.note && <p className="type-small mt-4 text-white/75">{data.note}</p>}
      </Reveal>
    </section>
  );
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
        <h2 id="closing-title" className="font-display text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-[40px] lg:text-[46px]">
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

/** Per-card accents (blue, green, purple, orange): icon badge, icon colour and the pastel curve at the bottom-right. */
const pathTones = [
  { badge: "bg-[#E3EFFC] text-primary", curve: "#D6E7FA" },
  { badge: "bg-[#DDF6EC] text-[#16A34A]", curve: "#D9F4E8" },
  { badge: "bg-[#F0E8FD] text-[#9333EA]", curve: "#EDE3FC" },
  { badge: "bg-[#FDEEE0] text-[#EA6A12]", curve: "#FCE6D3" },
];

/** Centred heading (accent words in a blue gradient) over four translucent cards with pastel icon badges and corner curves. */
export function AdhdCarePath({ data }: { data: FeaturesSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F6FAFE_0%,#EDF4FC_55%,#F6FAFE_100%)] py-16 sm:py-20 lg:py-24" aria-labelledby="path-title">
      {/* Soft circles and dotted arcs near the outer edges */}
      <div aria-hidden className="absolute -top-24 -left-40 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.5),rgba(182,211,240,.12)_55%,transparent_72%)]" />
      <div aria-hidden className="absolute -top-16 -right-32 size-[340px] rounded-full bg-[radial-gradient(circle,rgba(134,182,229,.35),rgba(182,211,240,.12)_55%,transparent_72%)]" />
      <div aria-hidden className="absolute -right-40 -bottom-32 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.45),transparent_70%)]" />
      <svg aria-hidden viewBox="0 0 260 120" fill="none" className="absolute top-24 -left-6 hidden w-[240px] lg:block">
        <path d="M4 60C60 10 150 4 230 70" stroke="#2578CA" strokeOpacity=".35" strokeWidth="2.5" strokeDasharray="0.1 9" strokeLinecap="round" />
      </svg>
      <svg aria-hidden viewBox="0 0 260 120" fill="none" className="absolute top-16 -right-4 hidden w-[200px] -scale-x-100 lg:block">
        <path d="M4 100C40 40 120 10 250 30" stroke="#2578CA" strokeOpacity=".35" strokeWidth="2.5" strokeDasharray="0.1 9" strokeLinecap="round" />
      </svg>

      <div className={cn(wrap, "relative")}>
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
          {data.items.map((item, i) => {
            const tone = pathTones[i % pathTones.length];
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.06} className="flex w-full">
                  <div className="group relative isolate flex w-full flex-col overflow-hidden rounded-[24px] border border-primary-100 bg-white/70 p-7 shadow-[0_18px_40px_-24px_rgba(18,61,106,.3)] backdrop-blur-md transition-[translate,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_28px_52px_-24px_rgba(37,120,202,.42)] sm:p-8">
                    <svg aria-hidden viewBox="0 0 200 140" preserveAspectRatio="none" className="absolute right-0 bottom-0 -z-10 h-[46%] w-[62%] transition-transform duration-500 ease-brand group-hover:scale-105" style={{ transformOrigin: "100% 100%" }}>
                      <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" fill={tone.curve} fillOpacity=".75" />
                    </svg>
                    <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-full", tone.badge)}>
                      {item.icon && <FeatureIcon name={item.icon} className="size-7" />}
                    </span>
                    <h3 className="mt-6 font-display text-[20px] leading-snug font-bold text-[#0F2F55]">{item.title}</h3>
                    {item.text && <p className="mt-3 text-[16px] leading-[1.65] text-pretty text-[#5B6B80]">{item.text}</p>}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------ "Practical Tools for Everyday Success" */

/** AXON ADHD dashboard card overlaid on the lower-left of the coaching photo (the artwork carries its own card and shadow). */
const toolsOverlay = { src: "/images/adhdcare/axon-adhd-dashboard-ui.webp", width: 1890, height: 832 };

/** Text, accent heading and check list on the left; the coaching photo with the dashboard overlay on the right. */
export function AdhdCareTools({ data }: { data: SplitSection }) {
  const [before, after] = data.accent ? data.title.split(data.accent) : [data.title];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F5F9FE_0%,#EDF4FC_60%,#F5F9FE_100%)] py-16 sm:py-20 lg:py-24" aria-labelledby="tools-title">
      {/* Soft circles, dotted patches and faint curves */}
      <div aria-hidden className="absolute -bottom-40 -left-40 size-[440px] rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.5),rgba(182,211,240,.12)_55%,transparent_72%)]" />
      <div aria-hidden className="absolute top-1/2 right-[18%] hidden size-[620px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.45),rgba(182,211,240,.12)_55%,transparent_72%)] lg:block" />
      <div aria-hidden className={cn("absolute top-8 right-6 hidden h-32 w-48 sm:block", dots)} />
      <svg aria-hidden viewBox="0 0 400 600" preserveAspectRatio="none" fill="none" className="absolute top-0 right-0 hidden h-full w-[22%] lg:block">
        <path d="M400 40C300 140 330 300 250 420S300 560 360 620" stroke="#2578CA" strokeOpacity=".14" strokeWidth="1.5" strokeDasharray="0.1 7" strokeLinecap="round" />
      </svg>

      <div className={cn(wrap, "relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14")}>
        <Reveal>
          <h2 id="tools-title" className={cn(h2, "text-[#0F2F55]")}>
            {after !== undefined ? (
              <>
                {before.trim()}{" "}
                <span className="block text-primary">{data.accent}</span>
                {after}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className={cn(lead, "mt-6 max-w-[580px] text-[#5B6B80]")}>
              {p}
            </p>
          ))}
          {data.list && (
            <ul className="mt-8 space-y-4">
              {data.list.map((li) => (
                <li key={li} className="flex items-center gap-4 text-[17px] font-medium text-[#0F2F55] sm:text-[18px]">
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-[#E3EFFC] text-primary shadow-[0_6px_14px_-6px_rgba(37,120,202,.35)] sm:size-12">
                    <Check className="size-5" strokeWidth={3} />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {data.image && (
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[680px] pb-6 sm:pb-8 lg:max-w-none">
              <div aria-hidden className={cn("absolute top-[12%] -left-6 hidden h-28 w-20 sm:block", dots)} />
              <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} unoptimized className="relative h-auto w-full rounded-[28px] shadow-[0_28px_60px_-24px_rgba(18,61,106,.35)]" />
              <div className="absolute bottom-0 left-0 w-[74%] rounded-[18px] bg-white shadow-[0_24px_50px_-18px_rgba(18,61,106,.35)] sm:-left-[3%] sm:rounded-[22px]">
                <Image src={toolsOverlay.src} alt="AXON ADHD coaching dashboard" width={toolsOverlay.width} height={toolsOverlay.height} unoptimized className="h-auto w-full rounded-[inherit]" />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
