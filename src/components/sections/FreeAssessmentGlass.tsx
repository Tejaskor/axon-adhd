import Image from "next/image";
import { ChartColumn, ChevronRight, Clock, Compass, FileText, Sparkles, Zap } from "lucide-react";
import type { ComponentType } from "react";
import type { SplitSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const glass = "border border-white/80 bg-white/70 backdrop-blur-sm shadow-[0_18px_44px_rgba(37,120,202,.12)] lg:backdrop-blur-xl";

/** Benefit-row accents, in item order: blue · teal · amber. */
const rowTones = [
  { Icon: FileText, chip: "bg-[#E3EEFF] text-primary" },
  { Icon: ChartColumn, chip: "bg-[#D9F4EC] text-[#0F9F7E]" },
  { Icon: Compass, chip: "bg-[#FFEBCF] text-[#E58A12]" },
] as const;
const detailIcons: ComponentType<{ className?: string }>[] = [Clock, FileText, Zap];

/**
 * Frosted-glass "What You'll Learn from the Free Assessment": copy + three benefit rows on the left, the supplied
 * assessment preview image and quick facts on the right. On phones the wrappers use `contents` so the order
 * becomes copy → preview → benefits → details.
 */
export function FreeAssessmentGlass({ data }: { data: SplitSection }) {
  const [lead, tail] = data.accent && data.title.includes(data.accent) ? data.title.split(data.accent) : [data.title, ""];
  return (
    <section id={data.id} className="scroll-mt-[var(--header-offset)] bg-[radial-gradient(55%_60%_at_12%_30%,rgba(37,120,202,.14),transparent),radial-gradient(50%_55%_at_92%_70%,rgba(84,152,219,.18),transparent),linear-gradient(180deg,#F6FAFF_0%,#EAF2FD_100%)] py-12 sm:py-16">
      <Container>
        <div className="rounded-[28px] border border-white/80 bg-white/45 p-5 shadow-[0_30px_80px_rgba(37,120,202,.14)] backdrop-blur-sm sm:rounded-[36px] sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <div className="contents lg:flex lg:flex-col">
              <div className="order-1">
                {data.eyebrow && (
                  <p className="inline-flex items-center gap-2 rounded-full border border-white bg-white/75 px-3.5 py-1.5 text-[12px] font-bold tracking-[0.12em] text-primary uppercase shadow-[0_4px_14px_rgba(37,120,202,.10)]">
                    <Sparkles className="size-3.5" aria-hidden />
                    {data.eyebrow}
                  </p>
                )}
                <h2 className="type-h2 mt-5 text-balance text-navy">
                  {lead}
                  {data.accent && <span className="text-primary">{data.accent}</span>}
                  {tail}
                </h2>
                <div className="type-body mt-5 max-w-[560px] space-y-4 text-body">
                  {data.paragraphs?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>

              <ul className="order-3 mt-1 grid gap-3 lg:mt-7">
                {data.features?.map((f, i) => {
                  const { Icon, chip } = rowTones[i % rowTones.length];
                  return (
                    <li key={f.title}>
                      <Reveal delay={i * 0.06}>
                        <div className={cn("group flex items-center gap-4 rounded-[22px] px-4 py-3.5 transition duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(37,120,202,.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0", glass)}>
                          <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-full", chip)}>
                            <Icon className="size-6" aria-hidden />
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="type-h4 text-navy">{f.title}</h3>
                            <p className="type-small mt-0.5 text-body">{f.text}</p>
                          </div>
                          <span aria-hidden className={cn("flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5", chip)}>
                            <ChevronRight className="size-5" />
                          </span>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="contents lg:block">
              <div className="order-2 sm:mx-auto sm:max-w-[560px] lg:max-w-none">
                {data.image && (
                  <Reveal>
                    {/* The artwork is transparent and carries its own shadows, so no frame is added around it. */}
                    <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1023px) 92vw, 640px" className="h-auto w-full object-contain" />
                  </Reveal>
                )}
              </div>

              {data.details && (
                <div className={cn("order-4 rounded-[24px] px-5 py-4 sm:mx-auto sm:max-w-[560px] lg:mt-6 lg:max-w-none", glass)}>
                  <p className="text-[12px] font-bold tracking-[0.14em] text-muted uppercase">Quick and easy</p>
                  <ul className="mt-3 grid gap-4 sm:grid-cols-3 sm:gap-0">
                    {data.details.map((d, i) => {
                      const Icon = detailIcons[i % detailIcons.length];
                      return (
                        <li key={d.title} className="flex items-center gap-3 sm:px-4 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-line-3">
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white bg-white/80 text-primary shadow-[0_4px_12px_rgba(37,120,202,.12)]">
                            <Icon className="size-5" aria-hidden />
                          </span>
                          <span>
                            <span className="type-body block font-bold text-navy">{d.title}</span>
                            <span className="type-small block text-body">{d.text}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
