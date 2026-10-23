import Image from "next/image";
import { ChartColumn, Clock, Compass, FileText, Zap } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { CtaSection, FeaturesSection, SplitSection, StepsSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Arrow, Eyebrow, IconChip, h2, lead, lightBtn, wrap } from "./AccommodationSections";
import { Results, Screening } from "./HowItWorksGlass";

/**
 * Free-assessment page sections from "What You'll Learn from the Free Assessment" downward.
 * Every string is read from the page's content definition (or kept from the components they replace),
 * so only presentation changes. Design tokens and helpers are shared with the Accommodation page.
 */

/** Heading with the content's `accent` substring picked out in brand blue. */
function AccentTitle({ title, accent }: { title: string; accent?: string }) {
  const [before, after] = accent && title.includes(accent) ? title.split(accent) : [title, ""];
  return (
    <>
      {before}
      {accent && <span className="text-[#2578CA]">{accent}</span>}
      {after}
    </>
  );
}

function BlueBanner({ children }: { children: ReactNode }) {
  return <div className="rounded-[24px] border border-white/20 bg-white/10 p-7 sm:p-9">{children}</div>;
}

/* ------------------------------------------------ What You'll Learn */

const learnTones = [
  { Icon: FileText, panel: "bg-[#F0F6FD]", tile: "bg-[#E1EEFC] text-[#2578CA]" },
  { Icon: ChartColumn, panel: "bg-[#EAF8F3]", tile: "bg-[#D6F2E8] text-[#12998A]" },
  { Icon: Compass, panel: "bg-[#FFF5EA]", tile: "bg-[#FFE8CC] text-[#EB8B01]" },
] as const;
const detailIcons: ComponentType<{ className?: string }>[] = [Clock, FileText, Zap];

export function AssessmentLearn({ data }: { data: SplitSection }) {
  return (
    <section id={data.id} className="scroll-mt-[var(--header-offset)] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="learn-title">
      <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16")}>
        <div>
          <Reveal>
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <h2 id="learn-title" className={cn(h2, "mt-5")}>
              <AccentTitle title={data.title} accent={data.accent} />
            </h2>
            <div className="mt-6 max-w-[600px] space-y-4">
              {data.paragraphs?.map((p) => (
                <p key={p} className={lead}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <ul className="mt-9 space-y-3.5">
            {data.features?.map((f, i) => {
              const { Icon, panel, tile } = learnTones[i % learnTones.length];
              return (
                <li key={f.title}>
                  <Reveal delay={i * 0.07}>
                    <div className={cn("group flex items-center gap-4 rounded-[22px] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,120,202,.12)] sm:gap-5", panel)}>
                      <span aria-hidden className={cn("grid size-14 shrink-0 place-items-center rounded-2xl", tile)}>
                        <Icon className="size-7" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[18px] leading-tight font-bold text-[#123D6A]">{f.title}</h3>
                        <p className="mt-1 text-[15.5px] leading-snug text-[#536985]">{f.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {data.image && (
            <Reveal delay={0.1}>
              <div className="relative">
                <div aria-hidden className="absolute inset-x-[6%] inset-y-[8%] -z-0 rounded-[40px] bg-[radial-gradient(circle,#DCEBFB_0%,#EEF5FD_70%)]" />
                {/* The artwork is transparent and carries its own shadows, so it is left unframed. */}
                <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1023px) 92vw, 640px" className="relative mx-auto h-auto w-full max-w-[640px] object-contain" />
              </div>
            </Reveal>
          )}
          {data.details && (
            <Reveal delay={0.15}>
              <div className="mt-6 rounded-[24px] border border-[#D8E8F8] bg-[#F3F8FE] px-6 py-5">
                <p className="text-[12.5px] font-bold tracking-[0.14em] text-[#5B6B80] uppercase">Quick and easy</p>
                <ul className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-0">
                  {data.details.map((d, i) => {
                    const Icon = detailIcons[i % detailIcons.length];
                    return (
                      <li key={d.title} className="flex items-center gap-3 sm:px-4 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-[#D8E8F8]">
                        <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#2578CA] shadow-[0_4px_12px_rgba(37,120,202,.12)]">
                          <Icon className="size-5" />
                        </span>
                        <span>
                          <span className="block text-[15.5px] leading-tight font-bold text-[#123D6A]">{d.title}</span>
                          <span className="mt-0.5 block text-[13.5px] leading-snug text-[#536985]">{d.text}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ A Simple Path to Clarity */

export function AssessmentHowItWorks({ data }: { data: FeaturesSection }) {
  return (
    <section id={data.id} className="scroll-mt-[var(--header-offset)] bg-[#EAF2FC] py-16 sm:py-20 lg:py-24" aria-labelledby="how-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[780px] text-center">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 id="how-title" className={cn(h2, "mt-5")}>
            <AccentTitle title={data.title} accent={data.accent} />
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-7">
          {data.items.map((item, i) => {
            const last = i === data.items.length - 1;
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.08} className="flex w-full">
                  <article className="flex w-full flex-col rounded-[26px] border border-[#D8E8F8] bg-white p-6 shadow-[0_10px_30px_rgba(18,61,106,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(37,120,202,.15)] sm:p-7">
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4B91D6] to-[#2578CA] font-display text-[19px] font-bold text-white shadow-[0_8px_20px_rgba(37,120,202,.30)]">
                        0{i + 1}
                      </span>
                      {!last && <span aria-hidden className="hidden h-px flex-1 border-t-2 border-dashed border-[#9CC4EC] lg:block" />}
                    </div>
                    <h3 className="mt-5 text-[21px] leading-snug font-bold text-[#123D6A]">
                      <span className="sr-only">Step {i + 1}: </span>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#536985]">{item.text}</p>
                    <div className="mt-6 flex-1">
                      {i === 0 && <Screening />}
                      {i === 1 && <Results />}
                      {i === 2 && item.image && (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#E3EAF2]">
                          <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 1023px) 90vw, 420px" className="object-cover" />
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Mid-page CTA (blue banner) */

export function AssessmentBannerCta({ data }: { data: CtaSection }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(110deg,#2578CA_0%,#1F68B1_50%,#174D86_100%)] py-16 text-white sm:py-20 lg:py-24" aria-labelledby="official-title">
      <div aria-hidden className="absolute -top-32 -left-24 -z-10 size-[380px] rounded-full bg-white/[0.06]" />
      <div aria-hidden className="absolute -right-20 -bottom-40 -z-10 size-[460px] rounded-full bg-[#80B5E8]/10" />
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16")}>
        <Reveal>
          <h2 id="official-title" className="font-display text-[32px] leading-[1.1] font-extrabold tracking-[-0.025em] text-balance sm:text-[42px] lg:text-[50px]">
            {data.title}
          </h2>
          {data.subtitle && <p className="mt-6 max-w-[760px] text-[17px] leading-[1.75] text-white/90 sm:text-[19px]">{data.subtitle}</p>}
        </Reveal>
        <Reveal delay={0.1}>
          <BlueBanner>
            <div className="flex flex-col gap-4">
              <ButtonLink href={data.primary.href} size="lg" className={cn("group h-auto! min-h-14 py-3 text-center whitespace-normal", lightBtn)}>
                {data.primary.label}
                <Arrow />
              </ButtonLink>
              {data.secondary && (
                <ButtonLink href={data.secondary.href} variant="outline" size="lg" className="h-auto! min-h-14 border-white/70! bg-transparent! py-3 text-center whitespace-normal text-white! hover:bg-white! hover:text-[#195FA8]!">
                  {data.secondary.label}
                </ButtonLink>
              )}
            </div>
          </BlueBanner>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Understanding ADHD with Confidence */

export function AssessmentConfidence({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="confidence-title">
      <div className={wrap}>
        <Reveal className="grid items-end gap-4 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <h2 id="confidence-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={lead}>{data.subtitle}</p>}
        </Reveal>
        {data.image && (
          <Reveal delay={0.05}>
            <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1320px) 100vw, 1256px" className="mt-10 h-auto w-full rounded-[28px] shadow-[0_24px_56px_rgba(18,61,106,.16)]" />
          </Reveal>
        )}
        <ul className="mt-12 grid gap-9 md:grid-cols-3 md:gap-0">
          {data.items.map((item, i) => (
            <li key={item.title} className="md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[#E3EAF2]">
              <Reveal delay={i * 0.07}>
                <div className="group flex items-start gap-5">
                  <IconChip className="size-14 rounded-2xl">{item.icon && <FeatureIcon name={item.icon} className="size-7" />}</IconChip>
                  <div>
                    <h3 className="text-[20px] leading-snug font-bold text-[#123D6A]">{item.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#536985]">{item.text}</p>
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

/* ------------------------------------------------ A Diagnosis That Opens Doors */

export function AssessmentOpensDoors({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-[#E8F2FC] py-16 sm:py-20 lg:py-24" aria-labelledby="doors-title">
      <div className={cn(wrap, "grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16")}>
        <Reveal className="lg:sticky lg:top-[var(--header-offset)]">
          <h2 id="doors-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>
        <ul className="space-y-4">
          {data.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.07}>
                <div className="group flex items-center gap-5 rounded-[22px] bg-white p-6 shadow-[0_8px_24px_rgba(18,61,106,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(37,120,202,.16)] sm:p-7">
                  <IconChip className="size-16 rounded-2xl">{item.icon && <FeatureIcon name={item.icon} className="size-8" />}</IconChip>
                  <div>
                    <h3 className="text-[20px] leading-snug font-bold text-[#123D6A]">{item.title}</h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-[#536985]">{item.text}</p>
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

/* ------------------------------------------------ Step-by-step assessment (alternating rows) */

export function AssessmentProcess({ data }: { data: StepsSection }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="process-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 id="process-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>
        <ol className="mt-14 space-y-12 lg:space-y-16">
          {data.items.map((step, i) => (
            <li key={step.title}>
              <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
                <Reveal className={cn(i % 2 === 1 && "md:order-2")}>
                  {step.image && <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} sizes="(max-width: 1023px) 100vw, 620px" className="aspect-[16/10] w-full rounded-[26px] object-cover shadow-[0_22px_50px_rgba(18,61,106,.16)]" />}
                </Reveal>
                <Reveal delay={0.08}>
                  <span aria-hidden className="grid size-14 place-items-center rounded-full bg-[#2578CA] font-display text-[22px] font-bold text-white shadow-[0_8px_20px_rgba(37,120,202,.30)]">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-[26px] leading-tight font-extrabold text-[#123D6A] sm:text-[30px]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className={cn(lead, "mt-4 max-w-[520px]")}>{step.text}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Closing CTA (dark, centred) */

export function AssessmentClosingCta({ data }: { data: CtaSection }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#123D6A_0%,#1B5E96_60%,#2578CA_100%)] py-20 text-center text-white sm:py-24 lg:py-28" aria-labelledby="closing-title">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(128,181,232,.25),transparent_55%)]" />
      <Reveal className={cn(wrap, "max-w-[900px]")}>
        <h2 id="closing-title" className="font-display text-[34px] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-[48px] lg:text-[58px]">
          {data.title}
        </h2>
        {data.subtitle && <p className="mx-auto mt-6 max-w-[720px] text-[17px] leading-[1.7] text-white/90 sm:text-[20px]">{data.subtitle}</p>}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href={data.primary.href} size="lg" className={cn("group h-auto! min-h-16 px-9 py-3 text-center text-[17px] whitespace-normal", lightBtn)}>
            {data.primary.label}
            <Arrow />
          </ButtonLink>
          {data.secondary && (
            <ButtonLink href={data.secondary.href} variant="outline" size="lg" className="h-auto! min-h-16 border-white/70! bg-transparent! px-9 py-3 text-center text-[17px] whitespace-normal text-white! hover:bg-white! hover:text-[#195FA8]!">
              {data.secondary.label}
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </section>
  );
}
