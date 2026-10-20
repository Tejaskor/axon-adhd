import { CheckCircle2 } from "lucide-react";
import { symptoms } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SymptomChecklist() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="symptoms-title">
      <Container>
        <SectionHeading id="symptoms-title" title={symptoms.title} subtitle={symptoms.subtitle} />
        <ul className="mx-auto grid max-w-[1000px] gap-4 sm:grid-cols-2 md:grid-cols-3">
          {symptoms.items.map((item, i) => (
            <li key={item}>
              <Reveal delay={i * 0.05} className="flex h-full items-center gap-3 rounded-card border border-line-2 bg-white px-5 py-5 shadow-card">
                <CheckCircle2 aria-hidden className="size-6 shrink-0 text-teal" />
                <span className="text-[16px] font-medium text-ink-2 sm:text-[17px]">{item}</span>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <p className="font-display text-[20px] leading-snug font-bold text-navy sm:text-[24px]">
            {symptoms.reassurance[0]}
            <br />
            <span className="text-primary">{symptoms.reassurance[1]}</span>
          </p>
          <p className="mt-6 text-[15px] font-semibold tracking-wide text-muted uppercase">{symptoms.ctaLead}</p>
          <ButtonLink href={symptoms.cta.href} size="lg" className="mt-3 shadow-cta">
            {symptoms.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
