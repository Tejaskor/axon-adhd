import Image from "next/image";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import type { BadgesSection, CtaSection, FeaturesSection, PageHero as PageHeroData, PageSection, QuotesSection, SplitSection, StepsSection, Tone } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
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

export function PageHero({ data }: { data: PageHeroData }) {
  return (
    <section className="relative -mt-[84px] overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white pt-[130px] pb-14 sm:pb-20" aria-labelledby="page-title">
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

function Features({ data }: { data: FeaturesSection }) {
  const variant = data.variant ?? "card";
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
        {data.quote && <blockquote className={cn("mx-auto mt-10 max-w-[760px] text-center font-display text-[19px] font-semibold italic sm:text-[22px]", dark ? "text-white" : "text-primary-deep")}>{data.quote}</blockquote>}
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
                  <span className="mb-3 inline-grid size-9 place-items-center rounded-full bg-primary font-display text-[15px] font-bold text-white" aria-hidden>
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

function Split({ data }: { data: SplitSection }) {
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
