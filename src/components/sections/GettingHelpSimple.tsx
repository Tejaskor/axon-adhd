import Image from "next/image";
import { gettingHelp } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GettingHelpSimple() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="help-title">
      <Container>
        <SectionHeading id="help-title" title={gettingHelp.title} subtitle={gettingHelp.subtitle} />
        <ol className="grid gap-6 md:grid-cols-3">
          {gettingHelp.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08} className="h-full overflow-hidden rounded-panel border border-line-2 bg-white shadow-card">
                <div className="relative">
                  <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} sizes="(max-width: 1024px) 100vw, 420px" className="aspect-[3/2] w-full object-cover" />
                  <span className="absolute top-4 left-4 grid size-10 place-items-center rounded-full bg-primary font-display text-[16px] font-bold text-white shadow-cta" aria-hidden>
                    {i + 1}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[20px] font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-[16px] text-body">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-12 max-w-[720px] text-center">
          <p className="text-[17px] text-ink-2">{gettingHelp.note}</p>
          <ButtonLink href={gettingHelp.cta.href} size="lg" className="mt-6 shadow-cta">
            {gettingHelp.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
