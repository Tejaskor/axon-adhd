import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { journeyToClarity } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** "Your Journey to Clarity": light-gray band with six numbered photo cards (3 × 2 on desktop) and two CTAs. */
export function GettingHelpSimple() {
  const { steps } = journeyToClarity;
  return (
    <section className="bg-[#F6F7F9] py-16 sm:py-20" aria-labelledby="journey-title">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 id="journey-title" className="type-h2 text-navy">
            {journeyToClarity.title}
          </h2>
          <p className="type-body mt-2 text-muted">{journeyToClarity.subtitle}</p>
        </Reveal>

        <ol className="mx-auto mt-10 grid max-w-[520px] gap-4 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:gap-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex">
              <Reveal delay={(i % 3) * 0.06} className="flex w-full">
                <article className="group flex w-full flex-col rounded-[14px] bg-white p-2.5 shadow-[0_4px_20px_rgba(15,27,46,.05)] transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(15,27,46,.1)]">
                  <div className="relative overflow-hidden rounded-[10px] bg-primary-soft">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      width={step.image.width}
                      height={step.image.height}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px"
                      className="aspect-[1672/941] h-auto w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                    />
                    {/* Soft light-blue curves framing the photo, as in the reference. */}
                    <svg aria-hidden viewBox="0 0 400 225" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
                      <path d="M0 0 H70 C30 30 8 80 0 130 Z" fill="#EAF4FF" fillOpacity="0.85" />
                      <path d="M0 225 V196 C90 214 190 222 290 206 C340 198 372 186 400 170 V225 Z" fill="#FFFFFF" />
                      <path d="M0 196 C90 214 190 222 290 206 C340 198 372 186 400 170" fill="none" stroke="#D8E8FB" strokeWidth="2" />
                    </svg>
                    <span
                      aria-hidden
                      className="absolute top-3 left-3 grid size-9 place-items-center rounded-full bg-[linear-gradient(145deg,#2578CA,#19528C)] font-display text-[17px] font-bold text-white shadow-[0_4px_12px_rgba(25,82,140,.35)] ring-2 ring-white sm:size-10 sm:text-[18px]"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col items-center px-3 pt-5 pb-4 text-center">
                    <h3 className="type-h4 text-ink uppercase">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="type-small mt-2.5 max-w-[300px] text-muted">{step.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center sm:mt-12">
          <div className="flex flex-col items-center justify-center gap-3 xs:flex-row xs:flex-wrap">
            {journeyToClarity.ctas.map((cta, i) => (
              <ButtonLink key={cta.href} href={cta.href} variant={i === 0 ? "primary" : "outline"}>
                {cta.label}
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            ))}
          </div>
          <p className="type-small mt-4 text-muted">{journeyToClarity.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
