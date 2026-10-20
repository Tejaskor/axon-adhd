import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: caseStudiesPage.title, description: caseStudiesPage.description, path: "/case-studies/", image: caseStudiesPage.hero.src });

export default function CaseStudiesPage() {
  return (
    <>
      <section className="-mt-[84px] bg-gradient-to-b from-primary-soft to-white pt-[140px] pb-10">
        <Container>
          <SectionHeading as="h1" title={caseStudiesPage.title} subtitle={caseStudiesPage.subtitle} />
          <Image src={caseStudiesPage.hero.src} alt={caseStudiesPage.hero.alt} width={caseStudiesPage.hero.width} height={caseStudiesPage.hero.height} priority sizes="(max-width: 1340px) 100vw, 1100px" className="mx-auto h-auto w-full max-w-[1100px] rounded-xl2 shadow-soft" />
        </Container>
      </section>
      <section className="py-14 sm:py-16" aria-label="Case studies">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => {
              const href = `${caseStudiesPage.baseUrl}${cs.slug}/`;
              return (
                <li key={cs.slug}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-line-2 bg-white shadow-card">
                    <Image src={cs.image.src} alt="" width={cs.image.width} height={cs.image.height} sizes="(max-width: 1024px) 100vw, 420px" className="aspect-[16/9] w-full object-cover" />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex items-center gap-1.5 text-[13px] text-muted">
                        <CalendarDays aria-hidden className="size-3.5" /> Aaron Dodini | {cs.date} | {cs.time}
                      </p>
                      <h2 className="mt-3 text-[19px] leading-snug font-bold text-navy">
                        <a href={href} className="hover:text-primary">
                          {cs.title}
                        </a>
                      </h2>
                      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-body">{cs.excerpt}</p>
                      <a href={href} className="mt-4 text-[15px] font-semibold text-primary hover:text-primary-hover">
                        Read More » <span className="sr-only">about {cs.title}</span>
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
      <ContactSection />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies/" }])} />
    </>
  );
}
