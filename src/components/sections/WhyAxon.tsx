import { whyAxon } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyAxon() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="why-title">
      <Container>
        <SectionHeading id="why-title" title={whyAxon.title} subtitle={whyAxon.subtitle} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyAxon.points.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.06} className="h-full rounded-panel border border-line-2 bg-white p-6 text-center shadow-card">
                <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary-soft text-primary">
                  <FeatureIcon name={p.icon} className="size-7" />
                </span>
                <h3 className="text-[18px] font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
