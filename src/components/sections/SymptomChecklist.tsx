import { Target } from "lucide-react";
import { symptoms } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

/** Same look as the About "Our Mission" band: white ground, Inter navy heading, green/blue/orange glass cards. */
export function SymptomChecklist() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFFFFF] py-16 font-inter sm:py-20 lg:py-24" aria-labelledby="symptoms-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 id="symptoms-title" className="font-inter text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance text-navy sm:text-[40px] lg:text-[52px]">
            {symptoms.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[900px] text-[16px] leading-[1.75] text-pretty text-body sm:text-[18px]">{symptoms.subtitle}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[640px] gap-5 sm:mt-12 sm:max-w-none sm:grid-cols-2 lg:max-w-[1320px] lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {symptoms.items.map((item, i) => (
            <li key={item} className="flex">
              <Reveal delay={Math.min(i, 6) * 0.08} className="flex w-full">
                <GlassCard index={i} icon={symptoms.icons[i]} text={item} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center sm:mt-14">
          <p className="text-[22px] leading-snug font-bold text-balance text-navy sm:text-[28px]">
            {symptoms.reassurance[0]}
            <br />
            <span className="text-[#2578CA]">{symptoms.reassurance[1]}</span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6">
            <span aria-hidden className="h-px w-6 bg-gradient-to-r from-transparent to-[#2578CA]/40 sm:w-20" />
            <p className="inline-flex items-center gap-2.5 rounded-full border border-[#2578CA]/25 bg-[#2578CA]/[0.07] px-4 py-2.5 text-[13px] font-medium tracking-[0.14em] whitespace-nowrap text-[#2578CA] uppercase sm:tracking-[0.2em] shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_6px_18px_rgba(37,120,202,.08)] backdrop-blur-md sm:px-6 sm:text-[15px]">
              <Target aria-hidden className="size-[18px]" strokeWidth={2} />
              {symptoms.ctaLead}
            </p>
            <span aria-hidden className="h-px w-6 bg-gradient-to-l from-transparent to-[#2578CA]/40 sm:w-20" />
          </div>
          <ButtonLink href={symptoms.cta.href} size="lg" className="mt-6 font-inter! shadow-cta">
            {symptoms.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
