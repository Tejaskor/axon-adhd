import Image from "next/image";
import { ArrowRight, Brain, CheckCircle2, Quote, Target } from "lucide-react";
import type { BadgesSection, CtaSection, FeaturesSection, PageHero as PageHeroData, PageSection, QuotesSection, SplitSection, StepsSection, Tone } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { ContactSection } from "./ContactSection";
import { CTABand } from "./CTABand";
import { FAQAccordion } from "./FAQAccordion";
import { LatestBlogs } from "./LatestBlogs";
import { LogoMarquee } from "./LogoMarquee";
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
      <div className="relative isolate overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#10458D_0%,#256ACC_55%,#8EB8F2_100%)] pt-[120px] pb-12 sm:rounded-[28px] sm:pt-[130px] sm:pb-16 md:flex md:min-h-[640px] md:items-center md:bg-[linear-gradient(100deg,#10458D_0%,#256ACC_48%,#7FB0EC_78%,#CFE3F8_100%)] md:pb-20 lg:rounded-[32px]">
        {/* Background spans the viewport; content (and the glow that tracks the image) is capped at 1440px. */}
        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Soft light pool behind the image, like the reference's bright centre. */}
          <div aria-hidden className="absolute bottom-0 left-1/2 -z-10 size-[420px] -translate-x-1/2 translate-y-1/4 rounded-full bg-white/30 blur-3xl md:top-1/2 md:right-[2%] md:bottom-auto md:left-auto md:size-[620px] md:translate-x-0 md:-translate-y-1/2" />

          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="max-w-[600px]">
              {data.eyebrow && <p className="mb-3 text-[13px] font-semibold tracking-[0.14em] text-white/80 uppercase">{data.eyebrow}</p>}
              <h1 id="page-title" className="font-geist text-[32px] leading-[1.4] font-normal text-balance text-white">
                {data.title}
              </h1>
              {data.text.map((t) => (
                <p key={t} className="mt-4 max-w-[560px] font-inter text-[18px] leading-[1.6] font-normal text-pretty text-white/90 sm:text-[20px]">
                  {t}
                </p>
              ))}
              {data.ctas.length > 0 && (
                <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:mt-10">
                  {data.ctas.map((cta, i) => (
                    <ButtonLink key={cta.label} href={cta.href} variant={solidFirst && i === 0 ? "white" : "glass"} size="lg" className={cn("group px-9 text-center font-inter! text-[16px]! leading-[1.25] font-medium whitespace-normal", !(solidFirst && i === 0) && "cta-trace cta-trace-tricolor [--cta-trace-offset:1px]")}>
                      {cta.label}
                      <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </ButtonLink>
                  ))}
                </div>
              )}
              {data.note && <p className="mt-3 text-[13px] text-white/75">{data.note}</p>}
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

export function PageHero({ data }: { data: PageHeroData }) {
  if (data.variant === "banner") return <BannerHero data={data} />;
  return (
    <section className="relative -mt-[var(--header-height)] overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white pt-[130px] pb-14 sm:pb-20" aria-labelledby="page-title">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            {data.eyebrow && <p className="mb-3 text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">{data.eyebrow}</p>}
            <h1 id="page-title" className="font-display text-[28px] leading-[1.2] font-bold tracking-[-0.5px] text-ink sm:text-[36px] lg:text-[46px]">
              {data.title}
            </h1>
            {data.text.map((t) => (
              <p key={t} className="mt-4 text-[16px] leading-relaxed text-body sm:text-[18px]">
                {t}
              </p>
            ))}
            <Ctas ctas={data.ctas} />
            {data.note && <p className="mt-3 text-[13px] text-muted">{data.note}</p>}
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
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
          {data.eyebrow && (
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-[#2578CA]/40 sm:w-20" />
              <p className="inline-flex items-center gap-2.5 rounded-full border border-[#2578CA]/25 bg-[#2578CA]/[0.07] px-5 py-2.5 text-[13px] font-medium tracking-[0.2em] text-[#2578CA] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_6px_18px_rgba(37,120,202,.08)] backdrop-blur-md sm:px-6 sm:text-[15px]">
                <Target aria-hidden className="size-[18px]" strokeWidth={2} />
                {data.eyebrow}
              </p>
              <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-[#2578CA]/40 sm:w-20" />
            </div>
          )}
          <h2 className="mt-6 font-inter text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance text-navy sm:text-[40px] lg:text-[52px]">{data.title}</h2>
          {data.subtitle && <p className="mx-auto mt-5 max-w-[900px] text-[16px] leading-[1.75] text-pretty text-body sm:text-[18px]">{data.subtitle}</p>}
        </div>
        <ul className="mx-auto mt-10 grid max-w-[640px] gap-5 sm:mt-12 lg:max-w-[1320px] lg:grid-cols-3 lg:gap-5 xl:gap-6">
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

function Features({ data }: { data: FeaturesSection }) {
  const variant = data.variant ?? "card";
  if (variant === "mission") return <MissionFeatures data={data} />;
  const dark = data.tone === "navy";
  const grid = (
    <ul className={cn("grid gap-5", data.image ? "sm:grid-cols-2" : cols[data.columns ?? 3])}>
      {data.items.map((item, i) => (
        <li key={item.title} className="flex">
          <Reveal delay={Math.min(i, 6) * 0.05} className="flex w-full">
            {variant === "stat" ? (
              <div className={cn("w-full rounded-panel p-6", dark ? "bg-white/10" : "border border-line-2 bg-white shadow-card")}>
                <h3 className={cn("font-display text-[30px] leading-none font-extrabold sm:text-[34px]", dark ? "text-[#8EB8F2]" : "text-primary")}>{item.title}</h3>
                {item.text && <p className={cn("mt-3 text-[16px] font-semibold", dark ? "text-white" : "text-navy")}>{item.text}</p>}
                {item.detail && <p className={cn("mt-1 text-[14px]", dark ? "text-white/70" : "text-muted")}>{item.detail}</p>}
              </div>
            ) : variant === "check" ? (
              <div className="flex w-full items-start gap-3 rounded-card border border-line-2 bg-white px-5 py-4 shadow-card">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                <div>
                  <h3 className="text-[16px] font-semibold text-ink-2">{item.title}</h3>
                  {item.text && <p className="mt-1 text-[14.5px] text-body">{item.text}</p>}
                </div>
              </div>
            ) : variant === "flow" ? (
              <div className={cn("relative w-full rounded-panel p-6 text-center", dark ? "bg-white/10" : "border border-line-2 bg-white shadow-card")}>
                <h3 className={cn("font-display text-[20px] font-bold", dark ? "text-white" : "text-navy")}>{item.title}</h3>
                {item.text && <p className={cn("mt-2 text-[15px]", dark ? "text-white/80" : "text-body")}>{item.text}</p>}
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
                <h3 className={cn("text-[18px] font-bold", dark ? "text-white" : "text-navy")}>{item.title}</h3>
                {item.text && <p className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-white/80" : "text-body")}>{item.text}</p>}
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
        {data.lead && <p className={cn("-mt-4 mb-8 text-center text-[17px] font-semibold", dark ? "text-white" : "text-navy")}>{data.lead}</p>}
        {data.image ? (
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
            <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 100vw, 560px" className="h-auto w-full rounded-xl2 shadow-soft" />
            {grid}
          </div>
        ) : (
          grid
        )}
        {data.quote && <blockquote className={cn("mx-auto mt-10 max-w-[760px] text-center text-[19px] font-semibold italic sm:text-[22px]", dark ? "text-white" : "text-primary-deep")}>{data.quote}</blockquote>}
        {data.footnote && <p className={cn("mx-auto mt-8 max-w-[820px] text-center text-[16px] font-medium", dark ? "text-white/85" : "text-ink-2")}>{data.footnote}</p>}
        <Ctas ctas={data.ctas} light={dark} className="justify-center" />
      </Container>
    </section>
  );
}

function Steps({ data }: { data: StepsSection }) {
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
                  <h3 className="text-[18px] font-bold text-navy">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{step.text}</p>
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
  "bg-[#E3EEFF] text-[#2563EB]",
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
      <strong className="font-bold text-[#1D4FAF]">{word}</strong>
      {rest.join(word)}
    </>
  );
}

/** "Why We Chose the Name": copy + icon list on the left, neuron GIF card on soft blue rings on the right. */
function AxonSplit({ data }: { data: SplitSection }) {
  const [first, ...rest] = data.title.split(" ");
  return (
    <section id={data.id} className="relative isolate scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(180deg,#F7FAFE_0%,#EEF4FC_100%)] py-16 font-inter sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-4 sm:px-6 md:grid-cols-[1.25fr_1fr] lg:gap-16 lg:px-8">
        <Reveal>
          {data.eyebrow && (
            <p className="inline-flex items-center gap-2 rounded-full bg-[#E3EEFB] px-4 py-2 text-[15px] font-medium text-[#1D5FC0] sm:text-[17px]">
              <Brain aria-hidden className="size-5" strokeWidth={1.75} />
              {data.eyebrow}
            </p>
          )}
          <h2 className="mt-4 font-display text-[44px] leading-[1.05] font-extrabold tracking-[-0.02em] sm:text-[56px] lg:text-[64px]">
            <span className="bg-gradient-to-r from-[#1D4ED8] to-[#1D5FC0] bg-clip-text text-transparent">{first}</span>{" "}
            <span className="bg-gradient-to-r from-[#1A9FD0] to-[#22C083] bg-clip-text text-transparent">{rest.join(" ")}</span>
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className="mt-4 max-w-[640px] text-[17px] leading-[1.7] text-body sm:text-[19px]">
              {withHighlight(p, data.highlight)}
            </p>
          ))}
          {data.features && (
            <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {data.features.map((f, i) => (
                <li key={f.title} className="group flex items-start gap-4 sm:gap-5">
                  {f.icon && (
                    <span aria-hidden className={cn("grid size-12 shrink-0 place-items-center rounded-full transition duration-300 ease-brand group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(29,79,175,.15)] sm:size-14", axonTones[i % axonTones.length])}>
                      <FeatureIcon name={f.icon} className="size-5 sm:size-6" />
                    </span>
                  )}
                  <div className="pt-1">
                    <h3 className="font-inter text-[17px] leading-snug font-semibold text-navy sm:text-[18px]">{f.title}</h3>
                    {f.text && <p className="mt-1 text-[15px] leading-relaxed text-body sm:text-[16px]">{f.text}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[460px]">
          {/* Soft rings, arc and dots behind the card */}
          <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#D6E8FB_0%,#E4F0FC_55%,rgba(238,244,252,0)_72%)]" />
          <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D3E6FA]/70" />
          <div aria-hidden className="absolute top-[-6%] right-[-22%] -z-10 aspect-square w-[95%] rounded-full border-r-[1.5px] border-[#BBD7F4]" />
          <span aria-hidden className="absolute top-[14%] -left-[10%] size-3 rounded-full bg-[#5CCFD8]" />
          <span aria-hidden className="absolute top-[50%] -right-[16%] size-4 rounded-full bg-[#5CCFD8]" />
          <span aria-hidden className="absolute bottom-[24%] -right-[10%] size-2.5 rounded-full bg-[#9EC7F2]" />
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
  const dark = data.tone === "navy";
  return (
    <section id={data.id} className={cn("scroll-mt-[var(--header-offset)] py-16 sm:py-20", toneClass[data.tone ?? "white"])}>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <Reveal className={cn(data.reverse && "md:order-2")}>
            {data.video ? (
              <video src={data.video} autoPlay muted loop playsInline preload="none" aria-hidden className="h-auto w-full rounded-xl2 shadow-soft" />
            ) : (
              data.image && <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 100vw, 620px" unoptimized={data.image.src.endsWith(".gif")} className="mx-auto h-auto w-full max-w-[620px] rounded-xl2 shadow-soft" />
            )}
          </Reveal>
          <Reveal delay={0.08}>
            {data.eyebrow && <p className={cn("mb-3 text-[13px] font-semibold tracking-[0.14em] uppercase", dark ? "text-white/80" : "text-primary")}>{data.eyebrow}</p>}
            <h2 className={cn("font-display text-[26px] leading-tight font-bold sm:text-[34px] lg:text-[38px]", dark ? "text-white" : "text-navy")}>{data.title}</h2>
            {data.paragraphs?.map((p) => (
              <p key={p} className={cn("mt-4 text-[16px] leading-[1.75] sm:text-[17px]", dark ? "text-white/85" : "text-body")}>
                {p}
              </p>
            ))}
            {data.list && (
              <ul className="mt-6 space-y-3">
                {data.list.map((li) => (
                  <li key={li} className={cn("flex gap-3 text-[16px]", dark ? "text-white" : "text-ink-2")}>
                    <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                    {li}
                  </li>
                ))}
              </ul>
            )}
            <Ctas ctas={data.ctas} light={dark} />
            {data.note && <p className={cn("mt-3 text-[13px]", dark ? "text-white/70" : "text-muted")}>{data.note}</p>}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Quotes({ data }: { data: QuotesSection }) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading title={data.title} subtitle={data.subtitle} />
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {data.items.map((q) => (
            <li key={q.name} className="mb-6 break-inside-avoid">
              <figure className="rounded-panel border border-line-2 bg-white p-6 shadow-card">
                <Quote aria-hidden className="size-7 text-primary/30" />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-body">{q.quote}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line-2 pt-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-semibold text-white" aria-hidden>
                    {q.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-navy">{q.name}</span>
                    <span className="block text-[13px] text-muted">{q.role}</span>
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

function Badges({ data }: { data: BadgesSection }) {
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

function Cta({ data }: { data: CtaSection }) {
  return (
    <>
      <CTABand title={data.title} subtitle={data.subtitle} primary={data.primary} secondary={data.secondary} />
      {data.note && <p className="-mt-8 mb-10 text-center text-[13px] text-muted">{data.note}</p>}
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
          case "badges":
            return <Badges key={i} data={section} />;
          case "faq":
            return <FAQAccordion key={i} faqs={section.faqs} title={section.title} subtitle={section.subtitle} />;
          case "blogs":
            return <LatestBlogs key={i} />;
          case "contact":
            return <ContactSection key={i} />;
          case "logos":
            return <LogoMarquee key={i} />;
        }
      })}
    </>
  );
}
