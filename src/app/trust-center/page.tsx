import Image from "next/image";
import { CheckCircle2, FileLock2, ShieldCheck } from "lucide-react";
import { CTABand } from "@/components/sections/CTABand";
import { faqItems } from "@/components/sections/FAQAccordion";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustCenter as tc, trustVaultUrl } from "@/content/pages/trust-center";
import { complianceBadges } from "@/content/trust";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: tc.meta.title, description: tc.meta.description, path: "/trust-center/", image: tc.meta.image, absoluteTitle: true });

export default function TrustCenterPage() {
  return (
    <>
      <section className="relative -mt-[var(--header-height)] overflow-hidden bg-navy pt-[140px] pb-16 text-white sm:pb-20" aria-labelledby="page-title">
        <Image src={tc.hero.image.src} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <Container className="relative">
          <p className="mb-3 text-[13px] font-semibold tracking-[0.14em] text-[#8EB8F2] uppercase">{tc.hero.eyebrow}</p>
          <h1 id="page-title" className="font-display text-[32px] font-bold sm:text-[46px]">
            {tc.hero.title}
          </h1>
          <p className="mt-4 max-w-[760px] text-[17px] leading-relaxed text-white/85">{tc.hero.text}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href={tc.hero.ctas[0].href} variant="white" size="lg" newTab>
              {tc.hero.ctas[0].label}
            </ButtonLink>
            <ButtonLink href={tc.hero.ctas[1].href} size="lg" className="border border-white/50 bg-transparent shadow-none hover:bg-white/10">
              {tc.hero.ctas[1].label}
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {tc.hero.highlights.map((h) => (
              <li key={h.title} className="flex items-center gap-3 rounded-panel border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
                <ShieldCheck aria-hidden className="size-6 shrink-0 text-[#65C98A]" />
                <span>
                  <span className="block font-semibold">{h.title}</span>
                  <span className="text-[14px] text-white/75">{h.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="axtc-assessments" className="scroll-mt-[var(--header-offset)] py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={tc.assessments.eyebrow} title={tc.assessments.title} subtitle={tc.assessments.subtitle} />
          <ul className="grid gap-6 md:grid-cols-3">
            {tc.assessments.items.map((a) => (
              <li key={a.title} className="flex flex-col rounded-panel border border-line-2 bg-white p-6 shadow-card">
                <Badge tone={a.status === "Completed" ? "teal" : "orange"} className="self-start">
                  {a.status}
                </Badge>
                <h3 className="mt-4 text-[19px] font-bold text-navy">{a.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-body">{a.text}</p>
                <p className="mt-4 text-[13px] font-medium text-muted">{a.by}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <p className="text-[15px] font-semibold text-ink-2">{tc.assessments.alignedLead}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {tc.assessments.aligned.map((a) => (
                <li key={a}>
                  <Badge>{a}</Badge>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {complianceBadges.map((b) => (
                <li key={b.src} className="rounded-card border border-line-2 bg-white px-3 py-2">
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-10 w-auto" />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={tc.practices.eyebrow} title={tc.practices.title} subtitle={tc.practices.subtitle} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tc.practices.items.map((p) => (
              <li key={p.title} className="rounded-panel border border-line-2 bg-white p-6 shadow-card">
                <span className="mb-4 grid size-12 place-items-center rounded-[12px] bg-primary-soft text-primary">
                  <FeatureIcon name={p.icon} className="size-6" />
                </span>
                <h3 className="text-[18px] font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeading eyebrow={tc.hipaa.eyebrow} title={tc.hipaa.title} subtitle={tc.hipaa.subtitle} align="left" className="mb-6 sm:mb-6" />
              <ul className="space-y-3">
                {tc.hipaa.list.map((li) => (
                  <li key={li} className="flex gap-3 text-[16px] text-ink-2">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                    {li}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-2 gap-4">
                {tc.hipaa.facts.map((f) => (
                  <div key={f.label} className="rounded-card bg-surface px-4 py-3">
                    <dt className="text-[13px] text-muted">{f.label}</dt>
                    <dd className="text-[15px] font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className="self-start rounded-xl2 bg-primary-soft p-8">
              <FileLock2 aria-hidden className="size-10 text-primary" />
              <h3 className="mt-4 text-[22px] font-bold text-navy">{tc.hipaa.baa.title}</h3>
              <p className="mt-2 text-[16px] text-body">{tc.hipaa.baa.text}</p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={tc.hipaa.baa.ctas[0].href}>{tc.hipaa.baa.ctas[0].label}</ButtonLink>
                <ButtonLink href={tc.hipaa.baa.ctas[1].href} variant="outline">
                  {tc.hipaa.baa.ctas[1].label}
                </ButtonLink>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-navy py-16 text-white sm:py-20">
        <Container>
          <SectionHeading eyebrow={tc.residency.eyebrow} title={tc.residency.title} subtitle={tc.residency.subtitle} tone="light" />
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tc.residency.stats.map((s) => (
              <div key={s.value} className="flex flex-col-reverse rounded-panel bg-white/10 p-6 text-center">
                <dt className="mt-2 text-[15px] text-white/80">{s.text}</dt>
                <dd className="font-display text-[36px] font-extrabold text-[#8EB8F2]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={tc.reports.eyebrow} title={tc.reports.title} subtitle={tc.reports.subtitle} />
          <ul className="mx-auto grid max-w-[900px] gap-6 md:grid-cols-2">
            {tc.reports.items.map((r) => (
              <li key={r.title} className="flex flex-col rounded-panel border border-line-2 bg-white p-6 shadow-card">
                <h3 className="text-[19px] font-bold text-navy">{r.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-body">{r.text}</p>
                <ButtonLink href={trustVaultUrl} variant="outline" size="sm" className="mt-5 self-start" newTab>
                  Request access <span className="sr-only">to {r.title}</span>
                </ButtonLink>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[14px] text-muted">{tc.reports.note}</p>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20" aria-labelledby="tc-faq">
        <Container>
          <SectionHeading id="tc-faq" eyebrow={tc.faq.eyebrow} title={tc.faq.title} subtitle={tc.faq.subtitle} />
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <Accordion items={faqItems(tc.faq.items)} />
            <aside className="self-start rounded-panel bg-white p-7 shadow-card">
              <h3 className="text-[19px] font-bold text-navy">{tc.faq.aside.title}</h3>
              <p className="mt-2 text-[15px] text-body">{tc.faq.aside.text}</p>
              <ButtonLink href={tc.faq.aside.cta.href} className="mt-5">
                {tc.faq.aside.cta.label}
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </section>

      <CTABand title={tc.cta.title} subtitle={tc.cta.subtitle} primary={tc.cta.primary} secondary={tc.cta.secondary} />
      <JsonLd data={faqJsonLd(tc.faq.items)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Trust Center", path: "/trust-center/" }])} />
    </>
  );
}
