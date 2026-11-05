import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import type { StepsSection } from "@/content/pages/types";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Per-step colours, in order: blue, purple, green, orange — number disc, card tint and duration pill. */
const tones = [
  {
    disc: "bg-[linear-gradient(135deg,#307EFC,#0048F0)] shadow-[0_10px_24px_rgba(0,72,240,.35)]",
    card: "bg-[linear-gradient(180deg,#E6F0FE_0%,#DAE8FD_100%)] shadow-[0_24px_50px_-18px_rgba(0,72,240,.28)]",
    pill: "bg-[#EAF3FE] text-[#0A2BC8]",
  },
  {
    disc: "bg-[linear-gradient(135deg,#9648E4,#7230C0)] shadow-[0_10px_24px_rgba(114,48,192,.35)]",
    card: "bg-[linear-gradient(180deg,#F1E8FC_0%,#E9DDFA_100%)] shadow-[0_24px_50px_-18px_rgba(114,48,192,.26)]",
    pill: "bg-[#F8F4FE] text-[#6C42A2]",
  },
  {
    disc: "bg-[linear-gradient(135deg,#19B861,#009042)] shadow-[0_10px_24px_rgba(0,144,66,.35)]",
    card: "bg-[linear-gradient(180deg,#E7F8EE_0%,#DCF3E4_100%)] shadow-[0_24px_50px_-18px_rgba(0,144,66,.26)]",
    pill: "bg-[#F2FEF5] text-[#067E3C]",
  },
  {
    disc: "bg-[linear-gradient(135deg,#FF9A2E,#FC7E06)] shadow-[0_10px_24px_rgba(252,126,6,.35)]",
    card: "bg-[linear-gradient(180deg,#FFEEE2_0%,#FFE5D3_100%)] shadow-[0_24px_50px_-18px_rgba(252,126,6,.26)]",
    pill: "bg-[#FEF6F0] text-[#CC4E06]",
  },
] as const;

function highlight(title: string, accent?: string) {
  if (!accent || !title.includes(accent)) return title;
  const [a, b] = title.split(accent);
  return (
    <>
      {a}
      <span className="relative inline-block text-[#0A4FF0]">
        {accent}
        <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[4%] -bottom-[0.2em] h-[0.2em] w-[92%]" fill="none">
          <path d="M2 10 C 70 3, 190 3, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      {b}
    </>
  );
}

/**
 * "Your ADHD Assessment Journey": centred pill + heading + intro, then numbered steps joined by a thin gradient line
 * (≥1024px), each a tinted card with a title, description, picture and a duration pill. Stacks to one column on phones.
 */
export function StepsJourney({ data }: { data: StepsSection }) {
  const titleId = `${data.id ?? "journey"}-title`;
  return (
    <section
      id={data.id}
      className="relative isolate scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)]! py-16 sm:py-20 lg:py-24"
      aria-labelledby={titleId}
    >
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <div className="mx-auto max-w-[1100px] text-center">
          {data.eyebrow && (
            <p className="inline-flex items-center gap-2.5 rounded-full bg-[#E9F1FE] px-5 py-2 text-[15px] font-semibold text-navy sm:text-[17px]">
              <CalendarDays aria-hidden className="size-5 text-primary" strokeWidth={1.75} />
              {data.eyebrow}
            </p>
          )}
          <h2 id={titleId} className={cn("type-section font-display leading-[1.15] tracking-[-0.02em] text-balance text-navy", data.eyebrow && "mt-4")}>
            {highlight(data.title, data.accent)}
          </h2>
          {data.subtitle && <p className="type-body mx-auto mt-4 max-w-[900px] text-pretty text-[#2B3A4F]">{data.subtitle}</p>}
        </div>

        <div className="relative mt-12 sm:mt-14">
          {/* Thin line through the number discs' centres (the four columns' centres sit at 12.5% and 87.5%). */}
          <span aria-hidden className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 rounded-full bg-[linear-gradient(90deg,#307EFC,#9648E4_36%,#19B861_66%,#FC8406)] opacity-45 lg:block" />
          <ol className="grid mx-auto max-w-[560px] gap-x-4 gap-y-12 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-1.5">
            {data.items.map((step, i) => {
              const t = tones[i % tones.length];
              return (
                <li key={step.title} className="flex">
                  <Reveal delay={i * 0.08} className="flex w-full flex-col items-center">
                    <span aria-hidden className={cn("relative z-10 -mb-6 grid size-12 shrink-0 place-items-center rounded-full text-[22px] font-bold text-white ring-4 ring-white/70", t.disc)}>
                      {i + 1}
                    </span>
                    <article className={cn("flex w-full flex-1 flex-col items-center rounded-[28px] border border-white/70 px-5 pt-11 pb-6 text-center sm:px-6", t.card)}>
                      <div className="flex-1">
                        <h3 className="text-[clamp(20px,1.7vw,26px)] leading-tight font-bold text-balance text-navy">
                          <span className="sr-only">Step {i + 1}: </span>
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-pretty text-[#2B3A4F] sm:text-[16px]">{step.text}</p>
                      </div>
                      {step.image && (
                        <div className="mt-5 w-full overflow-hidden rounded-[18px] shadow-[0_10px_26px_-12px_rgba(11,37,75,.35)]">
                          <Image
                            src={step.image.src}
                            alt={step.image.alt}
                            width={step.image.width}
                            height={step.image.height}
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw"
                            className="h-auto w-full"
                          />
                        </div>
                      )}
                      {step.duration && (
                        <p className={cn("mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[16px] font-bold sm:text-[17px]", t.pill)}>
                          <Clock aria-hidden className="size-5" strokeWidth={2} />
                          {step.duration}
                        </p>
                      )}
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
