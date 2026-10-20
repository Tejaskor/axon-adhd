import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Cta } from "@/content/types";

/**
 * Call-to-action band ("Ready to feel more in control?", "Haven't Started Yet?", …).
 * `plain` is the understated centered variant used on the home page.
 */
export function CTABand({ title, subtitle, primary, secondary, variant = "band" }: { title: string; subtitle?: string; primary: Cta; secondary?: Cta; variant?: "band" | "plain" }) {
  if (variant === "plain") {
    return (
      <section className="py-14 text-center sm:py-16" aria-label={title}>
        <Container>
          <h2 className="font-display text-[26px] font-bold text-navy sm:text-[34px]">{title}</h2>
          {subtitle && <p className="mt-2 text-[16px] text-muted">{subtitle}</p>}
          <ButtonLink href={primary.href} className="mt-6 shadow-cta">
            {primary.label}
          </ButtonLink>
        </Container>
      </section>
    );
  }
  return (
    <section className="py-12 sm:py-16" aria-label={title}>
      <Container>
        <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-primary to-primary-deep px-6 py-12 text-center text-white sm:px-12 sm:py-14">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-[#38BDF8]/20 blur-3xl" />
          <h2 className="relative font-display text-[26px] leading-tight font-bold sm:text-[36px]">{title}</h2>
          {subtitle && <p className="relative mx-auto mt-3 max-w-[640px] text-[17px] text-white/85">{subtitle}</p>}
          <div className="relative mt-8 flex flex-col justify-center gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href={primary.href} variant="white" size="lg" className="whitespace-normal text-center">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} size="lg" className="border border-white/60 bg-transparent shadow-none hover:bg-white/10">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
