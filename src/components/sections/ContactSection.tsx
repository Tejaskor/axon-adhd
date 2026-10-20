import { CheckCircle2, Mail } from "lucide-react";
import { contactSection } from "@/content/home";
import { site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-[var(--header-offset)] py-16 sm:py-20" aria-labelledby="contact-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[28px] leading-tight font-bold text-navy sm:text-[40px]">{contactSection.title}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-body">{contactSection.subtitle}</p>
            <ul className="mt-8 space-y-4">
              {contactSection.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-teal" />
                  <h3 className="text-[18px] font-semibold text-ink-2">{b}</h3>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-panel bg-primary-soft p-6">
              <p className="text-[16px] font-semibold text-navy">{contactSection.assistance}</p>
              <a href={`mailto:${site.supportEmail}`} className="mt-2 inline-flex items-center gap-2 text-[17px] font-semibold text-primary hover:text-primary-hover">
                <Mail aria-hidden className="size-5" /> {site.supportEmail}
              </a>
              <p className="mt-2 text-[14px] text-muted">{contactSection.responseTime}</p>
            </div>
          </div>
          <div className="rounded-xl2 border border-line-2 bg-white p-6 shadow-soft sm:p-10">
            <h2 id="contact-title" className="font-display text-[26px] font-bold text-navy sm:text-[30px]">
              {contactSection.formTitle}
            </h2>
            <p className="mt-2 mb-7 text-[15px] text-body">{contactSection.formIntro}</p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
