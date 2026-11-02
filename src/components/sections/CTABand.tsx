import { ArrowRight } from "lucide-react";
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
      <section className="text-center" aria-label={title}>
        {/* Full-bleed pale-blue band with soft concentric rings deepening toward the centre (CSS only). */}
        <div className="bg-[radial-gradient(circle_at_50%_50%,#C9DEF4_0_175px,#DCE8FC_176px_300px,#E4EDFD_301px_425px,#EBF2FE_426px_550px,transparent_551px),linear-gradient(90deg,#EEF4FE,#F6F9FF_50%,#EEF4FE)] py-20 sm:py-24">
          <Container>
            <h2 className="type-h2 font-bold text-navy">{title}</h2>
            {subtitle && <p className="type-lead mt-3 text-muted">{subtitle}</p>}
            <ButtonLink href={primary.href} size="lg" className="mt-7 shadow-[0_12px_28px_rgba(37,120,202,.35)] hover:shadow-[0_16px_34px_rgba(37,120,202,.42)]">
              {primary.label}
              <ArrowRight aria-hidden className="size-5" />
            </ButtonLink>
          </Container>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12 sm:py-16" aria-label={title}>
      <Container>
        <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-primary to-primary-deep px-6 py-12 text-center text-white sm:px-12 sm:py-14">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-[#38BDF8]/20 blur-3xl" />
          <h2 className="type-h2 relative">{title}</h2>
          {subtitle && <p className="type-body relative mx-auto mt-3 max-w-[640px] text-white/85">{subtitle}</p>}
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
