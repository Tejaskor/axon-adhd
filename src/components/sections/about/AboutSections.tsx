import Image from "next/image";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { aboutPage, founder } from "@/content/pages/about";
import type { CtaSection, FeaturesSection, PageHero, SplitSection } from "@/content/pages/types";
import { site } from "@/content/site";
import { trustBar } from "@/content/trust";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/*
 * About page only. Brand colours live in CSS variables set on the page root (see AboutSections), so nothing here
 * touches global styles, the header or the footer.
 *   --ab-blue #1769D2 · --ab-green #16B65B · --ab-orange #F59E0B · --ab-navy #102B50 · --ab-soft #F5F9FF
 */
const vars = "[--ab-blue:#1769D2] [--ab-green:#16B65B] [--ab-orange:#F59E0B] [--ab-navy:#102B50] [--ab-soft:#F5F9FF]";
const wrap = "mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8";
const h2 = "text-[28px] leading-[1.18] font-bold tracking-[-0.02em] text-balance text-[var(--ab-navy)] sm:text-[36px] lg:text-[42px]";
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

function Hero({ data }: { data: PageHero }) {
  const [lead, accent] = data.title.split(/(?=That’s)/);
  return (
    <section className="relative isolate -mt-[var(--header-height)] overflow-hidden bg-white pt-[136px] pb-14 sm:pt-[150px] sm:pb-20" aria-labelledby="page-title">
      <Glow className="-top-32 -right-24 size-[620px] bg-[#1769D2]/12" />
      <Glow className="top-40 -left-40 size-[480px] bg-[#16B65B]/10" />
      <Glow className="right-1/3 -bottom-40 size-[420px] bg-[#7FB2F0]/15" />
      <div className={cn(wrap, "grid items-center gap-10 md:grid-cols-[1.35fr_1fr] lg:gap-12")}>
        <Reveal>
          <h1 id="page-title" className="max-w-[720px] text-[32px] leading-[1.14] font-bold tracking-[-0.025em] text-[var(--ab-navy)] sm:text-[42px] lg:text-[50px]">
            {lead.trim()}
            {accent && (
              <span className="mt-1 block">
                <Accent text={accent.trim()} words={["AXON ADHD."]} />
              </span>
            )}
          </h1>
          {data.text.map((t) => (
            <p key={t} className={cn(body, "mt-5 max-w-[600px]")}>
              {t}
            </p>
          ))}
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2.5">
              <Image src={trustBar.google.src} alt={trustBar.google.alt} width={34} height={34} className="size-8" />
              <div>
                <span className="flex gap-0.5 text-[var(--ab-orange)]" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                <p className="text-[14px] font-semibold text-[var(--ab-navy)]">
                  {trustBar.rating} <span className="font-normal text-[#5B6B80]">{trustBar.reviews}</span>
                  <span className="sr-only"> on Google</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex -space-x-2.5">
                {trustBar.avatars.map((a) => (
                  <Image key={a.src} src={a.src} alt="" width={36} height={36} className="size-9 rounded-full border-2 border-white object-cover" />
                ))}
              </span>
              <p className="max-w-[150px] text-[14px] leading-snug font-semibold text-[var(--ab-navy)]">{trustBar.helped}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            {data.ctas.map((c, i) => (
              <ButtonLink
                key={c.label}
                href={c.href}
                size="lg"
                className={cn(
                  "group rounded-full! whitespace-normal",
                  i === 0
                    ? "bg-[var(--ab-blue)]! text-white shadow-[0_12px_28px_rgba(23,105,210,.32)] hover:bg-[#1259B5]!"
                    : "border-2 border-[var(--ab-blue)]! bg-white! text-[var(--ab-blue)]! shadow-none! hover:bg-[var(--ab-soft)]!",
                )}
              >
                {c.label}
                {i === 0 && <ArrowRight aria-hidden className="size-[18px] transition-transform group-hover:translate-x-1" />}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[560px]">
          <div aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(23,105,210,.28),rgba(22,182,91,.10)_55%,transparent_72%)] blur-2xl" />
          <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} priority sizes="(max-width: 1024px) 90vw, 560px" className="h-auto w-full drop-shadow-[0_24px_50px_rgba(23,105,210,.25)]" />
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

function AxonName({ data }: { data: SplitSection }) {
  const para = data.paragraphs?.[0] ?? "";
  return (
    <section className="relative isolate overflow-hidden py-10 sm:py-14" aria-labelledby="axon-title">
      <div className={wrap}>
        <div className={cn(glass, "relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white/80 to-[var(--ab-soft)]/80 px-6 py-10 sm:px-10 sm:py-14 lg:px-16")}>
          <Glow className="-top-20 -right-20 size-[380px] bg-[#1769D2]/12" />
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal>
              <h2 id="axon-title" className={h2}>
                {data.eyebrow}
                <span className="mt-1 block text-[36px] text-[var(--ab-blue)] sm:text-[46px] lg:text-[56px]">{data.title}</span>
              </h2>
              {para && (
                <p className={cn(body, "mt-5 max-w-[620px]")}>
                  {data.highlight && para.includes(data.highlight) ? (
                    <>
                      {para.split(data.highlight)[0]}
                      <strong className="font-bold text-[var(--ab-navy)]">{data.highlight}</strong>
                      {para.split(data.highlight).slice(1).join(data.highlight)}
                    </>
                  ) : (
                    para
                  )}
                </p>
              )}
              <Checks items={data.features?.map((f) => f.text ?? f.title)} />
            </Reveal>
            {data.image && (
              <Reveal delay={0.1} className="relative mx-auto w-full max-w-[400px]">
                <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle,rgba(124,92,255,.35),rgba(23,105,210,.18)_50%,transparent_72%)] blur-2xl" />
                <div className="aspect-[37/50] overflow-hidden rounded-[28px] border border-white/30 bg-[#05060F] bg-contain bg-center bg-no-repeat shadow-[0_30px_60px_rgba(16,43,80,.35),inset_0_1px_0_rgba(255,255,255,.2)] [transform:perspective(1200px)_rotateY(-6deg)]">
                  <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} unoptimized className="size-full object-contain" />
                </div>
              </Reveal>
            )}
          </div>
        </div>
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

function Banner({ data, image }: { data: CtaSection; image: { src: string; alt: string; width: number; height: number } }) {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="banner-title">
      <div className={wrap}>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(115deg,#0B3F8A_0%,#1769D2_55%,#2C86E8_100%)] px-6 py-10 text-white shadow-[0_28px_60px_rgba(23,105,210,.3)] sm:rounded-[32px] sm:px-12 sm:py-14 md:grid md:grid-cols-[1.4fr_1fr] md:items-center">
            <Glow className="-bottom-24 left-1/4 size-[360px] bg-[#16B65B]/35" />
            <Glow className="-top-24 right-10 size-[300px] bg-[#F59E0B]/25" />
            <div className="relative">
              <h2 id="banner-title" className="text-[28px] leading-tight font-bold tracking-[-0.02em] sm:text-[38px]">
                {data.title}
              </h2>
              {data.subtitle && <p className="mt-4 max-w-[620px] text-[16px] leading-[1.7] text-white/90 sm:text-[17px]">{data.subtitle}</p>}
              <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <ButtonLink href={data.primary.href} variant="white" size="lg" className="group rounded-full! text-[var(--ab-blue)]!">
                  {data.primary.label}
                  <ArrowRight aria-hidden className="size-[18px] transition-transform group-hover:translate-x-1" />
                </ButtonLink>
                {data.secondary && (
                  <ButtonLink href={data.secondary.href} size="lg" className="rounded-full! border-2 border-white/80 bg-white/10! shadow-none! backdrop-blur-sm hover:bg-white/20!">
                    {data.secondary.label}
                  </ButtonLink>
                )}
              </div>
            </div>
            <div aria-hidden className="relative mx-auto mt-8 w-[220px] sm:w-[280px] md:mt-0 md:-my-6 md:w-full md:max-w-[340px]">
              <Image src={image.src} alt="" width={image.width} height={image.height} sizes="340px" className="h-auto w-full drop-shadow-[0_18px_40px_rgba(0,0,0,.3)]" />
            </div>
          </div>
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
      <MediaRow data={connecting} accent={["AXON"]} />
      <Banner data={cta} image={hero.image} />
      <MediaRow data={transforming} accent={["Science", "Compassion"]} />
      <WhyChoose data={features[1]} />
      <MediaRow data={barriers} accent={["Collaborative Care"]} />
      <MediaRow data={seamless} accent={["Clinicians", "Clients"]} mediaRight soft />
      <Founder />
    </div>
  );
}
