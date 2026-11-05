import Image from "next/image";
import { CheckCircle2, Laptop, Layers, Rocket, ShieldCheck, Star, Target, Users, Zap } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { aboutPage, founder } from "@/content/pages/about";
import type { CtaSection, FeaturesSection, PageHero, SplitSection } from "@/content/pages/types";
import { site } from "@/content/site";
import { trustBar } from "@/content/trust";
import { TealBanner } from "@/components/sections/TealBanner";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/*
 * About page only. Brand colours live in CSS variables set on the page root (see AboutSections), so nothing here
 * touches global styles, the header or the footer.
 *   --ab-blue #1769D2 · --ab-green #16B65B · --ab-orange #F59E0B · --ab-navy #102B50 · --ab-soft #F5F9FF
 */
const vars = "[--ab-blue:#1769D2] [--ab-green:#16B65B] [--ab-orange:#F59E0B] [--ab-navy:#102B50] [--ab-soft:#F5F9FF]";
const wrap = "mx-auto w-full max-w-[1372px] px-4";
const h2 = "type-section leading-[1.18] tracking-[-0.02em] text-balance text-[var(--ab-navy)]";
const body = "text-[16px] leading-[1.75] text-[#4A5A70] sm:text-[17px]";
const glass = "border border-white/70 bg-white/60 shadow-[0_14px_44px_rgba(16,43,80,.09),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl";

/** Blue / green / orange tints for cards, in that order. */
const tints = [
  { card: "from-[#1769D2]/[0.10] via-white/70 to-white/60", border: "border-[#1769D2]/20", icon: "bg-[#1769D2]/10 text-[var(--ab-blue)]", ring: "hover:border-[#1769D2]/40" },
  { card: "from-[#16B65B]/[0.10] via-white/70 to-white/60", border: "border-[#16B65B]/20", icon: "bg-[#16B65B]/10 text-[#0E8E46]", ring: "hover:border-[#16B65B]/40" },
  { card: "from-[#F59E0B]/[0.12] via-white/70 to-white/60", border: "border-[#F59E0B]/25", icon: "bg-[#F59E0B]/12 text-[#C67A00]", ring: "hover:border-[#F59E0B]/45" },
];

/** Renders `text`, colouring each listed phrase in AXON blue. */
function Accent({ text, words }: { text: string; words: string[] }) {
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return (
    <>
      {text.split(re).map((part, i) =>
        words.includes(part) ? (
          <span key={i} className="text-[var(--ab-blue)]">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function Checks({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-6 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[15.5px] leading-snug font-medium text-[var(--ab-navy)] sm:text-[16.5px]">
          <CheckCircle2 aria-hidden className="mt-0.5 size-[22px] shrink-0 fill-[var(--ab-green)] text-white" />
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Soft blurred colour pools behind a section (decorative). */
function Glow({ className }: { className: string }) {
  return <div aria-hidden className={cn("pointer-events-none absolute -z-10 rounded-full blur-3xl", className)} />;
}

/** Flat brain badge on a soft glass orb, ringed by a blue orbit with three coloured dots (decorative). */
function BrainOrb() {
  return (
    <svg aria-hidden viewBox="-10 0 570 500" fill="none" className="h-auto w-full">
      <defs>
        <radialGradient id="ab-orb" cx="50%" cy="48%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".62" stopColor="#EAF3FE" stopOpacity=".9" />
          <stop offset="1" stopColor="#D5E7FB" stopOpacity=".55" />
        </radialGradient>
        <linearGradient id="ab-orbit" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#8FBCF5" />
          <stop offset="1" stopColor="#C9E0FA" />
        </linearGradient>
        <linearGradient id="ab-brain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F72E0" />
          <stop offset="1" stopColor="#1F55C7" />
        </linearGradient>
        <filter id="ab-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <ellipse cx="265" cy="452" rx="105" ry="16" fill="#BFD9F7" opacity=".55" filter="url(#ab-soft)" />
      <circle cx="265" cy="230" r="212" fill="url(#ab-orb)" />
      <circle cx="265" cy="230" r="212" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
      <circle cx="265" cy="230" r="158" fill="#fff" fillOpacity=".45" stroke="#D9E8FB" strokeWidth="2" />
      <circle cx="265" cy="238" r="128" fill="#fff" />
      {/* Orbit: the back half sits behind the brain, the front half in front of the orb. */}
      <path d="M44 300C0 340 40 395 150 398S330 380 440 300 540 160 430 112" stroke="url(#ab-orbit)" strokeWidth="9" strokeLinecap="round" opacity=".85" />
      {/* Brain: two lobes with a central split and white circuit nodes. */}
      <g transform="translate(265 238)">
        <path d="M-6 -78C-6 -90 -16 -98 -30 -98 -50 -98 -58 -84 -58 -72 -76 -70 -84 -56 -80 -42 -96 -36 -98 -16 -88 -4 -100 8 -94 30 -78 36 -80 52 -66 62 -54 58 -50 74 -38 82 -26 78L-6 78Z" fill="url(#ab-brain)" />
        <path d="M6 -78C6 -90 16 -98 30 -98 50 -98 58 -84 58 -72 76 -70 84 -56 80 -42 96 -36 98 -16 88 -4 100 8 94 30 78 36 80 52 66 62 54 58 50 74 38 82 26 78L6 78Z" fill="url(#ab-brain)" />
        <g stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M-62 -38H-42L-32 -48" />
          <path d="M-66 8H-44L-34 20" />
          <path d="M62 -38H42L32 -48" />
          <path d="M66 8H44L34 20" />
        </g>
        <g fill="#fff">
          <circle cx="-31" cy="-48" r="7" />
          <circle cx="-33" cy="20" r="7" />
          <circle cx="31" cy="-48" r="7" />
          <circle cx="33" cy="20" r="7" />
        </g>
      </g>
      <path d="M44 300C60 330 120 352 200 348" stroke="url(#ab-orbit)" strokeWidth="9" strokeLinecap="round" opacity="0" />
      <circle cx="262" cy="52" r="17" fill="#22D480" />
      <circle cx="108" cy="346" r="23" fill="#F59E0B" />
      <circle cx="418" cy="316" r="16" fill="#1A73F5" />
    </svg>
  );
}

function Hero({ data }: { data: PageHero }) {
  const [lead, accent] = data.title.split(/(?=That’s)/);
  const [helpedBold, helpedRest] = trustBar.helped.split(/(?<=Helped) /);
  return (
    <section
      className="relative isolate -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(115deg,#FDF9F6_0%,#F7FAFE_45%,#E6F0FC_100%)] pt-[130px] pb-[130px] sm:pt-[150px] sm:pb-[150px] lg:pb-[170px]"
      aria-labelledby="page-title"
    >
      {/* Soft blue waves along the bottom edge. */}
      <svg aria-hidden viewBox="0 0 1440 220" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[110px] w-full sm:h-[150px] lg:h-[190px]">
        <path d="M0 120C200 60 420 70 640 120S1040 200 1280 140 1400 100 1440 80V220H0Z" fill="#DCEBFC" fillOpacity=".75" />
        <path d="M0 170C260 130 520 150 760 185S1200 200 1440 120V220H0Z" fill="#CFE3FA" fillOpacity=".7" />
      </svg>
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.75fr_1fr] lg:gap-6")}>
        <Reveal>
          {data.eyebrow && <p className="inline-flex rounded-full bg-[#DCE9FB] px-5 py-2 text-[15px] font-semibold text-[#0B3FC4] shadow-[0_8px_20px_-10px_rgba(37,120,202,.5)] sm:text-[17px]">{data.eyebrow}</p>}
          <h1 id="page-title" className={cn("max-w-[960px] text-[32px] leading-[1.18] font-semibold tracking-[-0.02em] text-[#0F1B33] sm:text-[44px] lg:text-[clamp(40px,3vw,56px)]", data.eyebrow && "mt-6")}>
            {lead.trim()}{" "}
            {accent && (
              <span className="box-decoration-clone bg-[linear-gradient(#A9CBF8,#A9CBF8)] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-1.5 font-bold text-[#0A47D6]">{accent.trim()}
              </span>
            )}
          </h1>
          {data.text.map((t) => (
            <p key={t} className="mt-6 max-w-[780px] text-[16px] leading-[1.7] text-[#4A5568] sm:text-[18px] lg:text-[20px]">
              {t}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
            <div className="flex items-center gap-3">
              <Image src={trustBar.google.src} alt={trustBar.google.alt} width={44} height={44} className="size-10 sm:size-11" />
              <div>
                <span className="flex gap-0.5 text-[var(--ab-orange)]" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-[18px] fill-current" />
                  ))}
                </span>
                <p className="mt-0.5 text-[15px] font-semibold text-[#0F1B33]">
                  {trustBar.rating} <span className="font-normal text-[#5B6B80]">{trustBar.reviews}</span>
                  <span className="sr-only"> on Google</span>
                </p>
              </div>
            </div>
            <span aria-hidden className="hidden h-12 w-px bg-[#D3DCE8] sm:block" />
            <div className="flex items-center gap-4">
              <span className="flex -space-x-3">
                {trustBar.avatars.map((a) => (
                  <Image key={a.src} src={a.src} alt="" width={48} height={48} className="size-11 rounded-full border-2 border-white object-cover shadow-sm sm:size-12" />
                ))}
              </span>
              <p className="text-[15px] leading-snug sm:text-[17px]">
                <span className="block font-bold text-[#0F1B33]">{helpedBold}</span>
                <span className="block text-[#4A5568]">{helpedRest}</span>
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]">
          <BrainOrb />
          <span className="sr-only">{data.image.alt}</span>
        </Reveal>
      </div>
    </section>
  );
}

function Mission({ data }: { data: FeaturesSection }) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="mission-title">
      <Glow className="-right-40 top-10 size-[420px] bg-[#F59E0B]/8" />
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[860px] text-center">
          {data.eyebrow && <p className="inline-block rounded-full bg-[#1769D2]/10 px-4 py-1.5 text-[13px] font-semibold tracking-[0.04em] text-[var(--ab-blue)]">{data.eyebrow}</p>}
          <h2 id="mission-title" className={cn(h2, "mt-4")}>
            <Accent text={data.title} words={["Clarity"]} />
          </h2>
          {data.subtitle && <p className={cn(body, "mt-4")}>{data.subtitle}</p>}
        </Reveal>
        <ul className="mx-auto mt-10 grid max-w-[1100px] gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:gap-6">
          {data.items.map((item, i) => {
            const t = tints[[0, 2, 1][i % 3]];
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.08} className="flex w-full">
                  <div className={cn("group w-full rounded-[22px] border bg-gradient-to-br p-7 sm:p-5 lg:p-7 text-center shadow-[0_14px_40px_rgba(16,43,80,.07),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(16,43,80,.12)]", t.card, t.border, t.ring)}>
                    {item.icon && (
                      <span aria-hidden className={cn("mx-auto grid size-14 place-items-center rounded-[16px] transition-transform duration-300 group-hover:scale-105", t.icon)}>
                        <FeatureIcon name={item.icon} className="size-7 stroke-[1.6]" />
                      </span>
                    )}
                    <h3 className="mt-4 text-[19px] font-bold text-[var(--ab-navy)]">{item.title}</h3>
                    {item.text && <p className="mt-1.5 text-[15px] text-[#4A5A70]">{item.text}</p>}
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

const axonIcons = [Zap, Layers, Target, Rocket, Users] as const;

/** "Why We Chose the Name AXON ADHD": pill + one-line heading + intro + five pale icon rows, beside the neuron clip in a phone-style frame on a soft orb. */
function AxonName({ data }: { data: SplitSection }) {
  const para = data.paragraphs?.[0] ?? "";
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#FDF9F6_0%,#F7FAFE_45%,#EDF4FD_100%)] py-14 sm:py-16 lg:pb-28" aria-labelledby="axon-title">
      <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70px] w-full sm:h-[100px] lg:h-[120px]">
        <path d="M0 90C220 40 480 50 720 90S1180 130 1440 60V160H0Z" fill="#E3EEFC" fillOpacity=".8" />
        <path d="M0 125C300 95 640 120 980 135S1320 120 1440 100V160H0Z" fill="#D9E8FB" fillOpacity=".7" />
      </svg>
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-8")}>
        <Reveal>
          <p className="inline-flex rounded-full bg-[#DCE9FB] px-5 py-2 text-[15px] font-semibold text-[#0B3FC4] shadow-[0_8px_20px_-10px_rgba(37,120,202,.5)] sm:text-[17px]">About AXON ADHD</p>
          <h2 id="axon-title" className="mt-5 text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-[#0F1B33] sm:text-[40px] lg:text-[clamp(36px,3vw,52px)]">
            {data.eyebrow}{" "}
            <span className="box-decoration-clone bg-[linear-gradient(#A9CBF8,#A9CBF8)] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-1.5 text-[#0A47D6]">{data.title}</span>
          </h2>
          {para && (
            <p className="mt-5 max-w-[900px] text-[16px] leading-[1.7] text-[#4A5568] sm:text-[18px] lg:text-[20px]">
              {data.highlight && para.includes(data.highlight) ? (
                <>
                  {para.split(data.highlight)[0]}
                  {data.highlight}
                  {para.split(data.highlight).slice(1).join(data.highlight)}
                </>
              ) : (
                para
              )}
            </p>
          )}
          <ul className="mt-7 grid max-w-[900px] gap-3">
            {data.features?.map((f, i) => {
              const Icon = axonIcons[i % axonIcons.length];
              return (
                <li key={f.title} className="flex items-center gap-4 rounded-2xl bg-[#EEF4FD]/90 py-2 pr-4 pl-2.5 sm:gap-5 sm:pr-6">
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#E3EDFB] text-[#1A5FE0] sm:size-12">
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>
                  <span aria-hidden className="h-6 w-px shrink-0 bg-[#B9C7DB]" />
                  <span className="text-[15px] leading-snug font-medium text-[#0F1B33] sm:text-[17px]">{f.text ?? f.title}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
        {data.image && (
          <Reveal delay={0.1} className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
            <svg aria-hidden viewBox="0 0 520 520" fill="none" className="absolute inset-0 size-full">
              <defs>
                <radialGradient id="ax-orb" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#fff" stopOpacity=".9" />
                  <stop offset="1" stopColor="#DCEAFB" stopOpacity=".7" />
                </radialGradient>
                <linearGradient id="ax-orbit" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#3B8BF2" />
                  <stop offset="1" stopColor="#BBD8FA" />
                </linearGradient>
              </defs>
              <circle cx="260" cy="260" r="250" fill="url(#ax-orb)" />
              <circle cx="260" cy="260" r="196" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
              <path d="M30 430C-10 380 30 310 110 330M410 190C480 150 540 190 500 260S400 330 400 330" stroke="url(#ax-orbit)" strokeWidth="14" strokeLinecap="round" />
              <circle cx="92" cy="316" r="26" fill="#F59E0B" />
              <circle cx="470" cy="330" r="19" fill="#1A73F5" />
            </svg>
            <div className="absolute top-1/2 left-1/2 aspect-[10/17] w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] border-[7px] border-white bg-black shadow-[0_26px_50px_-18px_rgba(37,120,202,.5)]">
              <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} unoptimized className="size-full object-contain" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

const transformPoints = [
  { icon: ShieldCheck, text: "Secure & Private Care" },
  { icon: Laptop, text: "Virtual & Accessible" },
  { icon: Users, text: "Connected Care Teams" },
] as const;

/** "Transforming ADHD Care with Science and Compassion": the photo in a white frame on a soft blob, beside the accented heading, three paragraphs, a green-check list and three pale icon cards. */
function Transforming({ data }: { data: SplitSection }) {
  const accent = "Science and Compassion";
  const [lead] = data.title.split(accent);
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#FDF9F6_0%,#F7FAFE_50%,#EDF4FD_100%)] py-14 sm:py-16 lg:pb-28" aria-labelledby="ab-transforming">
      <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70px] w-full sm:h-[100px] lg:h-[120px]">
        <path d="M0 90C220 40 480 50 720 90S1180 130 1440 60V160H0Z" fill="#E3EEFC" fillOpacity=".8" />
        <path d="M0 125C300 95 640 120 980 135S1320 120 1440 100V160H0Z" fill="#D9E8FB" fillOpacity=".7" />
      </svg>
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1fr_1.12fr] lg:gap-12")}>
        <Reveal className="relative min-w-0">
          <div aria-hidden className="absolute -inset-5 -z-10 rounded-[90px_60px_80px_56px] bg-[#E4EEFC]/80 sm:-inset-8" />
          {data.image && (
            <div className="overflow-hidden rounded-[30px] border-[6px] border-white bg-white shadow-[0_26px_50px_-24px_rgba(37,120,202,.45)]">
              <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 90vw, 600px" className="h-auto w-full" />
            </div>
          )}
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <h2 id="ab-transforming" className="text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance text-[#0F1B33] sm:text-[40px] lg:text-[clamp(34px,2.9vw,52px)]">
            {lead}
            <span className="box-decoration-clone bg-[linear-gradient(#A9CBF8,#A9CBF8)] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-1.5 text-[#0A47D6]">{accent}</span>
          </h2>
          <div className="mt-6 space-y-4">
            {data.paragraphs?.map((p) => (
              <p key={p} className="text-[15.5px] leading-[1.65] text-[#344155] sm:text-[17px]">
                {p}
              </p>
            ))}
          </div>
          <Checks items={data.list} />
          <ul className="mt-7 grid gap-4 sm:grid-cols-3 sm:gap-0">
            {transformPoints.map((c, i) => (
              <li key={c.text} className={cn("flex items-center sm:px-3", i === 0 && "sm:pl-0", i > 0 && "sm:border-l sm:border-[#C9D5E6]")}>
                <span className="flex w-full items-center gap-3 rounded-2xl bg-[#EAF2FD] px-4 py-3">
                  <c.icon aria-hidden className="size-8 shrink-0 text-[#1A5FE0]" strokeWidth={1.6} />
                  <span className="text-[15px] leading-snug font-semibold text-[#0F1B33] sm:text-[16px]">{c.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Text + media row. `accent` words in the title turn AXON blue; media sits left unless `mediaRight`. */
function MediaRow({ data, accent, mediaRight, soft, children }: { data: SplitSection; accent: string[]; mediaRight?: boolean; soft?: boolean; children?: ReactNode }) {
  const id = `ab-${data.title.slice(0, 16).replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <section className={cn("relative isolate overflow-hidden py-12 sm:py-16", soft ? "bg-[var(--ab-soft)]" : "bg-white")} aria-labelledby={id}>
      <div className={cn(wrap, "grid items-center gap-10 md:grid-cols-2 lg:gap-16")}>
        <Reveal className={cn("relative min-w-0", mediaRight && "md:order-2")}>
          <div aria-hidden className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-[#1769D2]/15 via-[#16B65B]/8 to-[#F59E0B]/10 blur-2xl" />
          <div className={cn(glass, "overflow-hidden rounded-[28px] p-2")}>
            {children ??
              (data.video ? (
                <video src={data.video} autoPlay muted loop playsInline preload="none" aria-hidden className="block h-auto w-full rounded-[22px]" />
              ) : (
                data.image && <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 90vw, 620px" className="h-auto w-full rounded-[22px]" />
              ))}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <h2 id={id} className={h2}>
            <Accent text={data.title} words={accent} />
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className={cn(body, "mt-4")}>
              {p}
            </p>
          ))}
          <Checks items={data.list} />
        </Reveal>
      </div>
    </section>
  );
}

const connectPoints = [
  { icon: ShieldCheck, text: "HIPAA-Compliant & Secure" },
  { icon: Layers, text: "Seamless Collaboration" },
  { icon: Zap, text: "Right Data, Right Time" },
] as const;

/** "Connecting Patients, Clinics & Universities Through AXON": the video in a white frame on a soft blob, beside the accented heading, intro and three icon points. */
function Connecting({ data }: { data: SplitSection }) {
  const accent = "Through AXON";
  const [lead] = data.title.split(accent);
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#FDF9F6_0%,#F7FAFE_50%,#EDF4FD_100%)] py-14 sm:py-16 lg:pb-28" aria-labelledby="ab-connecting">
      <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70px] w-full sm:h-[100px] lg:h-[120px]">
        <path d="M0 90C220 40 480 50 720 90S1180 130 1440 60V160H0Z" fill="#E3EEFC" fillOpacity=".8" />
        <path d="M0 125C300 95 640 120 980 135S1320 120 1440 100V160H0Z" fill="#D9E8FB" fillOpacity=".7" />
      </svg>
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12")}>
        <Reveal className="relative min-w-0">
          <div aria-hidden className="absolute -inset-5 -z-10 rounded-[56px_90px_80px_60px] bg-[#E4EEFC]/80 sm:-inset-8" />
          <div className="overflow-hidden rounded-[26px] border-[6px] border-white bg-white shadow-[0_26px_50px_-24px_rgba(37,120,202,.45)]">
            {data.image ? (
              <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 90vw, 620px" className="h-auto w-full" />
            ) : (
              data.video && <video src={data.video} autoPlay muted loop playsInline preload="none" aria-hidden className="block h-auto w-full" />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <h2 id="ab-connecting" className="text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance text-[#0F1B33] sm:text-[40px] lg:text-[clamp(34px,2.7vw,48px)]">
            {lead}
            <span className="box-decoration-clone bg-[linear-gradient(#A9CBF8,#A9CBF8)] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-1.5 text-[#0A47D6]">{accent}</span>
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className="mt-6 text-[16px] leading-[1.7] text-[#4A5568] sm:text-[18px]">
              {p}
            </p>
          ))}
          <ul className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-0">
            {connectPoints.map((c, i) => (
              <li key={c.text} className={cn("flex items-center gap-3 sm:px-4", i === 0 && "sm:pl-0", i > 0 && "sm:border-l sm:border-[#C9D5E6]")}>
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#E3EDFB] text-[#1A5FE0] sm:size-14">
                  <c.icon className="size-6 sm:size-7" strokeWidth={1.7} />
                </span>
                <span className="text-[15px] leading-snug font-medium text-[#0F1B33] sm:text-[16px]">{c.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChoose({ data }: { data: FeaturesSection }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ab-soft)] py-14 sm:py-20" aria-labelledby="why-title">
      <Glow className="-left-32 top-1/3 size-[400px] bg-[#16B65B]/10" />
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[860px] text-center">
          <h2 id="why-title" className={h2}>
            <Accent text={data.title} words={["AXON ADHD"]} />
          </h2>
          {data.subtitle && <p className={cn(body, "mt-4")}>{data.subtitle}</p>}
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:gap-6">
          {data.items.map((item, i) => {
            const t = tints[i % 3];
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.08} className="flex w-full">
                  <div className={cn("group w-full rounded-[22px] border bg-gradient-to-br p-7 sm:p-5 lg:p-7 text-center shadow-[0_14px_40px_rgba(16,43,80,.07),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(16,43,80,.12)] sm:p-8", t.card, t.border, t.ring)}>
                    {item.icon && (
                      <span aria-hidden className={cn("mx-auto grid size-14 place-items-center rounded-full transition-transform duration-300 group-hover:scale-105", t.icon)}>
                        <FeatureIcon name={item.icon} className="size-7 stroke-[1.6]" />
                      </span>
                    )}
                    <h3 className="mt-4 text-[19px] leading-snug font-bold text-balance text-[var(--ab-navy)]">{item.title}</h3>
                    {item.text && <p className="mt-2 text-[15px] leading-relaxed text-[#4A5A70]">{item.text}</p>}
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

function Founder() {
  return (
    <section id="Meet" className="relative isolate scroll-mt-[var(--header-offset)] overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="founder-title">
      <Glow className="-right-32 bottom-0 size-[420px] bg-[#1769D2]/10" />
      <div className={wrap}>
        <h2 id="founder-title" className={cn(h2, "text-center")}>
          <Accent text="Meet Our Founder" words={["Our Founder"]} />
        </h2>
        <div className="mx-auto mt-10 grid max-w-[1100px] items-center gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
          <Reveal className="mx-auto">
            <div className="rounded-full bg-[conic-gradient(from_200deg,#1769D2,#16B65B,#F59E0B,#1769D2)] p-[5px] shadow-[0_20px_50px_rgba(23,105,210,.25)]">
              <Image src={founder.image.src} alt={founder.image.alt} width={founder.image.width} height={founder.image.height} className="size-[220px] rounded-full border-4 border-white object-cover sm:size-[260px]" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className={cn(glass, "rounded-[26px] bg-gradient-to-br from-white/80 to-[var(--ab-soft)]/70 p-6 sm:p-9")}>
              <h3 className="text-[24px] font-bold text-[var(--ab-navy)]">{founder.name}</h3>
              <p className="mt-1 text-[15px] font-semibold text-[var(--ab-blue)]">{founder.title}</p>
              <p className={cn(body, "mt-4")}>{founder.bio}</p>
              <p className={cn(body, "mt-4")}>{site.blurb}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Whole About page body, in the order of the reference design. */
export function AboutSections() {
  const s = aboutPage.sections;
  const hero = s.find((x): x is PageHero => x.type === "hero")!;
  const features = s.filter((x): x is FeaturesSection => x.type === "features");
  const splits = s.filter((x): x is SplitSection => x.type === "split");
  const cta = s.find((x): x is CtaSection => x.type === "cta")!;
  const [axon, connecting, transforming, barriers, seamless] = splits;

  return (
    <div className={cn(vars, "bg-white")}>
      <Hero data={hero} />
      <Mission data={features[0]} />
      <AxonName data={axon} />
      <Connecting data={connecting} />
      <TealBanner data={{ ...cta, accent: "Confidence" }} tone="blue" />
      <Transforming data={transforming} />
      <WhyChoose data={features[1]} />
      <MediaRow data={barriers} accent={["Collaborative Care"]} />
      <MediaRow data={seamless} accent={["Clinicians", "Clients"]} mediaRight soft />
      <Founder />
    </div>
  );
}
