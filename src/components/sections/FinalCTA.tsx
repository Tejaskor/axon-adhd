import Image from "next/image";
import { finalCta } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="overflow-hidden bg-navy py-16 text-white sm:py-20" aria-labelledby="final-cta-title">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 id="final-cta-title" className="font-display text-[28px] leading-tight font-bold sm:text-[40px]">
              {finalCta.title}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-white/85 sm:text-[17px]">{finalCta.text}</p>
            <p className="mt-5 text-[17px] font-semibold">{finalCta.lead}</p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink href={finalCta.primary.href} variant="white" size="lg">
                {finalCta.primary.label}
              </ButtonLink>
              <ButtonLink href={finalCta.secondary.href} size="lg" className="border border-white/50 bg-transparent shadow-none hover:bg-white/10">
                {finalCta.secondary.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-[460px]">
            <Image src={finalCta.image.src} alt={finalCta.image.alt} width={finalCta.image.width} height={finalCta.image.height} sizes="(max-width: 1024px) 90vw, 460px" className="h-auto w-full rounded-xl2" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
