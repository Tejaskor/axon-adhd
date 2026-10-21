import Image from "next/image";
import { BadgeCheck, Check } from "lucide-react";
import { founder } from "@/content/pages/about";
import { pricing } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PricingPanel } from "./PricingPanel";
import { ProcessSteps } from "./ProcessSteps";

/** Two soft panels: founder intro (left) and the interactive pricing card (right), then the 3-step strip. */
export function PricingCards() {
  const intro = pricing.founderIntro;
  return (
    <section id="pricing" className="bg-white py-16 font-inter sm:py-20 lg:py-24" aria-labelledby="pricing-title">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-4 md:grid-cols-2">
          <Reveal className="flex">
            <div className="flex w-full flex-col overflow-hidden rounded-[20px] bg-[#F6F7F9] px-5 pt-10 pb-6 sm:px-8 sm:pt-14 sm:pb-8">
              <h2 id="pricing-title" className="font-inter text-[32px] leading-[1.12] font-medium tracking-[-0.02em] text-navy sm:text-[40px]">
                <span className="text-[#1D5FC0]">{intro.titleAccent}</span>
                <br />
                {intro.titleRest}
              </h2>
              <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-ink-2 sm:text-[16px]">{intro.text}</p>
              <ButtonLink href={intro.cta.href} size="md" className="mt-6 self-start rounded-full! bg-[#1D5FC0]! px-6 font-inter! hover:bg-[#174E9E]!">
                {intro.cta.label}
              </ButtonLink>

              <div className="mt-10 grid flex-1 items-end gap-3 sm:mt-14 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                {/* Founder portrait + frosted name tag. The source photo is a small circular crop, so it is shown round rather than stretched. */}
                <figure className="relative flex aspect-[3/4] max-h-[420px] flex-col items-center overflow-hidden rounded-[16px] bg-[radial-gradient(90%_60%_at_50%_30%,#FFFFFF_0%,#E3EAF7_55%,#C9D3E3_100%)] pt-[14%] shadow-[0_10px_30px_rgba(15,27,46,.12)]">
                  <Image src={founder.image.src} alt={founder.image.alt} width={founder.image.width} height={founder.image.height} className="aspect-square h-auto w-[min(62%,190px)] rounded-full object-cover shadow-[0_12px_30px_rgba(15,27,46,.18)] ring-4 ring-white" />
                  <figcaption className="absolute inset-x-2 bottom-2 rounded-[12px] border border-white/20 bg-[#0B1B3F]/45 px-3.5 py-3 text-white backdrop-blur-md">
                    <span className="flex items-center gap-1.5 text-[14px] font-semibold">
                      {founder.name}
                      <BadgeCheck aria-label="Verified" className="size-4 fill-white text-[#1D5FC0]" />
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-white/80">{founder.title}</span>
                  </figcaption>
                </figure>
                {/* Credentials card */}
                <ul className="flex flex-col gap-2.5 self-end rounded-[16px] border border-black/[0.05] bg-white p-4 shadow-[0_1px_3px_rgba(15,27,46,.06)]">
                  {intro.credentials.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[13.5px] leading-snug text-ink-2">
                      <span aria-hidden className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#E8F2FC] text-[#1D5FC0]">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex">
            <div className="w-full">
              <PricingPanel />
            </div>
          </Reveal>
        </div>
        <ProcessSteps steps={pricing.steps} />
      </div>
    </section>
  );
}
