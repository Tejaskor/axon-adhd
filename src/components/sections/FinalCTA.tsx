import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing CTA: one rounded card on the "Real People. Real Relief." background, copy on a dark teal-to-blue gradient on the left and
 * the photo filling the right (stacked below it under md).
 */
export function FinalCTA() {
  return (
    // Same background as "Real People. Real Relief." (Testimonials).
    <section className="bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] py-16 sm:py-20" aria-labelledby="final-cta-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid overflow-hidden rounded-[20px] shadow-[0_30px_70px_-30px_rgba(10,37,86,.45)] md:grid-cols-[55fr_45fr]">
          <div className="flex flex-col bg-[linear-gradient(135deg,#043943_0%,#0A4589_45%,#0D4AA1_80%)] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-16">
            {/* The hyphenated word never splits at its hyphen; the accent always starts its own line. */}
            <h2 id="final-cta-title" className="text-[clamp(28px,3vw,42px)] leading-[1.3] font-semibold tracking-[-0.01em]">
              {finalCta.title.split(/(\S+-\S+)/).map((part, i) =>
                part.includes("-") ? (
                  <span key={i} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}{" "}
              <span className="block">{finalCta.titleAccent}</span>
            </h2>
            <p className="type-body mt-6 max-w-[480px] leading-[1.7] text-pretty text-white/90">{finalCta.text}</p>

            <div className="mt-10 md:mt-auto md:pt-12">
              <p className="type-body font-semibold text-white">{finalCta.lead}</p>
              <div className="mt-5 flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:gap-4">
                {[finalCta.primary, finalCta.secondary].map((cta) => (
                  <ButtonLink
                    key={cta.href}
                    href={cta.href}
                    variant="white"
                    className="group rounded-[50px]! text-primary-600 shadow-[0_10px_24px_rgba(3,12,32,.25)] hover:bg-primary-soft max-sm:px-4! max-sm:text-[14px]!"
                  >
                    {cta.label}
                    <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[380px] sm:min-h-[480px] md:min-h-[460px]">
            <Image src={finalCta.image.src} alt={finalCta.image.alt} fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover object-[60%_15%] md:object-[60%_center]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
