import Image from "next/image";
import { ArrowDown, ArrowRight, ChartColumn, Check, FileText, Settings, Stethoscope } from "lucide-react";
import type { FeaturesSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const glass = "border border-white/80 bg-white/65 backdrop-blur-sm shadow-[0_20px_50px_rgba(37,106,204,.12)] lg:backdrop-blur-xl";

/** Step accents, in item order: blue · teal · violet. */
const tones = [
  { Icon: FileText, disc: "from-[#5AA6FF] to-[#256ACC]", pill: "bg-[#E3EEFF] text-primary", glow: "hover:border-primary/40" },
  { Icon: ChartColumn, disc: "from-[#62E3C6] to-[#1FB89A]", pill: "bg-[#D9F4EC] text-[#0F9F7E]", glow: "hover:border-[#1FB89A]/40" },
  { Icon: Stethoscope, disc: "from-[#B39BFB] to-[#7C4DDB]", pill: "bg-[#ECE7FF] text-[#6D4AE0]", glow: "hover:border-[#7C4DDB]/40" },
] as const;

/** Illustrative ring: arc length is a fixed placeholder, deliberately unlabelled (not a real or graded result). */
function Ring({ pct, color, label }: { pct: number; color: string; label: string }) {
  const c = 2 * Math.PI * 30;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[12px] font-semibold text-navy">{label}</span>
      <svg viewBox="0 0 80 80" className="size-[64px] -rotate-90" aria-hidden>
        <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeOpacity=".18" strokeWidth="9" />
        <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
      </svg>
    </div>
  );
}

export function Screening() {
  return (
    <div aria-hidden className="rounded-2xl border border-white bg-white/85 p-3.5 shadow-[0_6px_18px_rgba(11,37,75,.06)]">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[#FF6B6B]/70" />
        <span className="size-2 rounded-full bg-[#FFC857]/80" />
        <span className="size-2 rounded-full bg-[#34C48B]/80" />
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[12px] font-semibold">
        <span className="text-navy">Free ADHD Assessment</span>
        <span className="text-muted">Question 3</span>
      </div>
      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-primary-soft">
        <span className="draw-x block h-full w-[30%] origin-left rounded-full bg-primary" />
      </span>
      <p className="mt-3 text-[13px] leading-snug font-semibold text-navy">How often is it hard to stay focused on one task?</p>
      <ul className="mt-2.5 grid grid-cols-2 gap-1.5">
        {["Rarely", "Sometimes", "Often", "Very often"].map((o, i) => (
          <li key={o} className={cn("flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold", i === 1 ? "border-primary bg-primary-soft text-primary" : "border-line-3 bg-white/80 text-body")}>
            <span className={cn("flex size-3.5 shrink-0 items-center justify-center rounded-full border-2", i === 1 ? "border-primary bg-primary text-white" : "border-line-3")}>{i === 1 && <Check className="size-2" strokeWidth={4} />}</span>
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Results() {
  return (
    <div aria-hidden className="rounded-2xl border border-white bg-white/85 p-3.5 shadow-[0_6px_18px_rgba(11,37,75,.06)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[13px] font-bold text-navy">Your Screening Results</p>
          <p className="mt-0.5 text-[11px] text-muted">Here&apos;s a summary of your assessment.</p>
        </div>
        <span className="shrink-0 rounded-full bg-primary-soft px-2 py-0.5 text-[10.5px] font-semibold text-primary">Illustrative</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        <Ring pct={0.4} color="#1E9A55" label="Attention" />
        <Ring pct={0.6} color="#256ACC" label="Anxiety" />
        <Ring pct={0.75} color="#E58A12" label="ADHD" />
      </div>
    </div>
  );
}

/**
 * "How It Works" on a frosted-glass layout: centred heading, three glass step panels (screening preview → results preview →
 * clinician photo) joined by arrow connectors (horizontal on desktop, vertical on small screens). Panels fade up with the
 * shared scroll reveal; connector lines draw in with the same scroll timeline (see `.draw-x` in globals.css).
 */
export function HowItWorksGlass({ data }: { data: FeaturesSection }) {
  const [lead, tail] = data.accent && data.title.includes(data.accent) ? data.title.split(data.accent) : [data.title, ""];
  return (
    <section id={data.id} className="scroll-mt-[var(--header-offset)] bg-[radial-gradient(55%_55%_at_10%_35%,rgba(37,106,204,.14),transparent),radial-gradient(45%_50%_at_92%_30%,rgba(86,190,255,.16),transparent),linear-gradient(180deg,#F6FAFF_0%,#EAF2FD_100%)] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          {data.eyebrow && (
            <p className="inline-flex items-center gap-2 rounded-full border border-white bg-white/75 px-3.5 py-1.5 text-[12px] font-bold tracking-[0.12em] text-primary uppercase shadow-[0_4px_14px_rgba(37,106,204,.10)]">
              <Settings className="size-3.5" aria-hidden />
              {data.eyebrow}
            </p>
          )}
          <h2 className="mt-4 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.02em] text-balance text-navy sm:text-[40px] lg:text-[48px]">
            {lead}
            {data.accent && <span className="text-primary">{data.accent}</span>}
            {tail}
          </h2>
          {data.subtitle && <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-relaxed text-body sm:text-[17px]">{data.subtitle}</p>}
        </div>

        <ol className="mt-12 grid gap-y-4 sm:mx-auto sm:max-w-[560px] lg:mt-14 lg:max-w-none lg:grid-cols-3 lg:gap-x-14 lg:gap-y-0">
          {data.items.map((item, i) => {
            const { Icon, disc, pill, glow } = tones[i % tones.length];
            const last = i === data.items.length - 1;
            return (
              <li key={item.title} className="relative">
                <Reveal delay={i * 0.08} className="h-full">
                  <article className={cn("relative flex h-full flex-col rounded-[28px] p-5 pt-6 transition duration-300 ease-brand hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6", glass, glow)}>
                    <span className={cn("absolute -top-5 -left-3 flex size-[68px] items-center justify-center rounded-full bg-gradient-to-br text-white shadow-[0_10px_24px_rgba(37,106,204,.28)] ring-[7px] ring-white/70", disc)}>
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <div className="min-h-[148px] pl-[66px] lg:min-h-[164px]">
                      <span className={cn("inline-block rounded-full px-3 py-1 text-[13px] font-bold", pill)}>0{i + 1}</span>
                      <h3 className="mt-2 text-[19px] leading-snug font-bold text-navy">
                        <span className="sr-only">Step {i + 1}: </span>
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-body">{item.text}</p>
                    </div>
                    <div className="mt-4 flex-1">
                      {i === 0 && <Screening />}
                      {i === 1 && <Results />}
                      {i === 2 && item.image && (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white shadow-[0_6px_18px_rgba(11,37,75,.08)]">
                          <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 1023px) 90vw, 420px" className="object-cover" />
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>

                {!last && (
                  <>
                    {/* Desktop connector sits in the 56px gap between panels. */}
                    <span aria-hidden className="pointer-events-none absolute top-[44%] -right-14 hidden h-10 w-14 -translate-y-1/2 items-center lg:flex">
                      <span className="draw-x absolute inset-x-0 top-1/2 origin-left border-t-2 border-dashed border-primary/35" />
                      <span className="relative mx-auto flex size-10 items-center justify-center rounded-full border border-white bg-white text-primary shadow-[0_6px_18px_rgba(37,106,204,.25),0_0_0_5px_rgba(37,106,204,.08)]">
                        <ArrowRight className="size-5" />
                      </span>
                    </span>
                    {/* Small-screen connector. */}
                    <span aria-hidden className="mt-4 flex flex-col items-center lg:hidden">
                      <span className="h-6 border-l-2 border-dashed border-primary/35" />
                      <span className="flex size-9 items-center justify-center rounded-full border border-white bg-white text-primary shadow-[0_6px_16px_rgba(37,106,204,.22)]">
                        <ArrowDown className="size-4" />
                      </span>
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
