import { careYouCanTrust } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareYouCanTrust() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="trust-title">
      <Container>
        <SectionHeading id="trust-title" title={careYouCanTrust.title} subtitle={careYouCanTrust.subtitle} />
        <dl className="mx-auto mb-12 grid max-w-[960px] gap-4 sm:grid-cols-3">
          {careYouCanTrust.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-panel bg-white p-6 text-center shadow-card">
              <dt className="mt-2 text-[14px] text-muted">{s.lead}</dt>
              <dd className="text-[34px] leading-none font-extrabold text-primary">
                {s.prefix && <span className="mr-1.5 text-[18px] font-bold text-navy">{s.prefix}</span>}
                {s.value}
                <span className="text-[26px]">{s.suffix}</span>
                <span className="ml-1.5 text-[18px] font-bold text-navy">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {careYouCanTrust.features.map((f, i) => (
            <li key={f.title}>
              <Reveal delay={i * 0.05} className="flex h-full gap-4 rounded-panel border border-line-2 bg-white p-6 shadow-card">
                <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-teal-soft text-teal">
                  <FeatureIcon name={f.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-navy">{f.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-body">{f.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
