import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Three service cards: title + tagline, looping clip, description, "Learn More" (live layout). */
export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="services-title">
      <Container>
        <SectionHeading id="services-title" title={services.title} subtitle={services.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {services.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-panel border border-line-2 bg-white p-5 text-center shadow-card transition-shadow hover:shadow-soft sm:p-6">
                <h3 className="text-[20px] font-bold text-navy sm:text-[22px]">{item.title}</h3>
                <p className="mt-1 text-[15px] font-medium text-muted">{item.tagline}</p>
                <div className="mt-4 overflow-hidden rounded-card bg-navy">
                  <video className="aspect-[16/10] h-auto w-full object-cover" src={item.video} autoPlay muted loop playsInline preload="none" aria-hidden />
                </div>
                <p className="mt-4 flex-1 text-[16px] leading-relaxed text-body">{item.text}</p>
                <Link href={item.href} className="mt-4 inline-flex items-center justify-center gap-1.5 text-[15px] font-semibold text-primary hover:text-primary-hover">
                  Learn More <span className="sr-only">about {item.title}</span>
                  <ArrowRight aria-hidden className="size-4 -rotate-45 transition-transform group-hover:rotate-0" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
