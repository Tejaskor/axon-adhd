import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gettingHelp } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Icon disc tints, in step order (teal, blue, teal) — as in the reference. */
const discTone = ["bg-[#E6F6F4] text-[#0E8F86]", "bg-[#E8F1FC] text-[#1D5FC0]", "bg-[#E6F6F4] text-[#0E8F86]"];

/** White band: underlined heading, numbered step track with arrows, then photo cards with an icon beside the title. */
export function GettingHelpSimple() {
  const steps = gettingHelp.steps;
  return (
    <section className="bg-white py-16 font-inter sm:py-20 lg:py-24" aria-labelledby="help-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="help-title" className="font-inter text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-navy sm:text-[40px] lg:text-[52px]">
            {gettingHelp.title}
          </h2>
          <span aria-hidden className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#2BB5A8]" />
          <p className="mt-4 text-[16px] text-body sm:text-[20px]">{gettingHelp.subtitle}</p>
        </div>

        {/* Step track (desktop/tablet): numbers aligned over each card's centre, joined by arrows. */}
        <div aria-hidden className="mx-auto mt-10 hidden max-w-[1320px] grid-cols-3 gap-6 md:grid lg:gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="relative flex flex-col items-center">
              <span className="grid size-16 place-items-center rounded-full bg-[#EAF3FD] font-inter text-[28px] font-bold text-navy shadow-[0_0_0_6px_rgba(234,243,253,.5)]">{i + 1}</span>
              <span className="mt-1.5 text-[14px] font-medium text-navy">Step</span>
              {i < steps.length - 1 && (
                <span className="absolute top-8 left-[calc(50%+48px)] flex w-[calc(100%-96px+24px)] items-center lg:w-[calc(100%-96px+32px)]">
                  <span className="h-0.5 flex-1 bg-[#7FB2EA]" />
                  <ArrowRight className="-ml-2 size-5 text-[#5C9BE0]" strokeWidth={2} />
                </span>
              )}
            </div>
          ))}
        </div>

        <ol className="mx-auto mt-10 grid max-w-[560px] gap-6 md:mt-6 md:max-w-[1320px] md:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="flex">
              <Reveal delay={i * 0.08} className="flex w-full">
                <article className="group flex w-full flex-col rounded-[22px] border border-black/[0.04] bg-white p-2.5 shadow-[0_10px_40px_rgba(15,27,46,.08)] transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,27,46,.12)]">
                  <div className="relative overflow-hidden rounded-[16px]">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      width={step.image.width}
                      height={step.image.height}
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                    />
                    {/* Mobile has no step track, so number the photo instead. */}
                    <span aria-hidden className="absolute top-3 left-3 grid size-10 place-items-center rounded-full bg-white/90 text-[16px] font-bold text-navy shadow-md backdrop-blur md:hidden">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 items-start gap-4 px-4 pt-6 pb-5 sm:gap-5 sm:px-5">
                    <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-full sm:size-[72px]", discTone[i % discTone.length])}>
                      <FeatureIcon name={step.icon} className="size-8 stroke-[1.5]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-inter text-[20px] leading-[1.25] font-bold text-navy sm:text-[22px]">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-body sm:text-[16px]">{step.text}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-12 max-w-[720px] text-center">
          <p className="text-[17px] text-ink-2">{gettingHelp.note}</p>
          <ButtonLink href={gettingHelp.cta.href} size="lg" className="mt-6 font-inter! shadow-cta">
            {gettingHelp.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
