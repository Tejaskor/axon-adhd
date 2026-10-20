import { Check, Clock3 } from "lucide-react";
import { EARLY_DISCOUNT, pricing, type Plan } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { applyDiscount, cn, formatPrice } from "@/lib/utils";
import { ProcessSteps } from "./ProcessSteps";

function Price({ plan }: { plan: Plan }) {
  if (!plan.discounted) return <p className="font-display text-[44px] leading-none font-extrabold text-navy">{formatPrice(plan.price)}</p>;
  const { final, savings } = applyDiscount(plan.price, EARLY_DISCOUNT);
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[20px] font-semibold text-muted-2 line-through" aria-label={`Regular price ${formatPrice(plan.price)}`}>
          {formatPrice(plan.price)}
        </span>
        <span className="font-display text-[44px] leading-none font-extrabold text-navy">{formatPrice(final)}</span>
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-semibold">
        <span className="rounded-pill bg-teal px-2.5 py-0.5 text-white">SAVE {Math.round(EARLY_DISCOUNT * 100)}%</span>
        <span className="text-teal">(Save {formatPrice(savings)})</span>
      </p>
      {plan.breakdown && <p className="mt-2 text-[13px] text-muted">{plan.breakdown}</p>}
    </div>
  );
}

export function PricingCards() {
  return (
    <section id="pricing" className="bg-gradient-to-b from-white via-primary-soft/60 to-white py-16 sm:py-20" aria-labelledby="pricing-title">
      <Container>
        <SectionHeading id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.intro} />
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <article
              key={plan.id}
              aria-labelledby={`plan-${plan.id}`}
              className={cn(
                "relative flex flex-col rounded-xl2 border bg-white p-7 sm:p-8",
                plan.highlight ? "border-primary shadow-[0_20px_50px_rgba(37,106,204,.18)] ring-1 ring-primary md:-my-3" : "border-line-2 shadow-card",
              )}
            >
              {plan.badge && (
                <Badge tone={plan.badge.tone} className="mb-4 self-start">
                  {plan.badge.tone === "primary" ? "★" : plan.badge.tone === "teal" ? "✓" : "◆"} {plan.badge.label}
                </Badge>
              )}
              <h3 id={`plan-${plan.id}`} className="text-[20px] font-bold text-navy">
                {plan.name}
              </h3>
              <div className="mt-4">
                <Price plan={plan} />
              </div>
              {plan.discounted ? (
                <p className="mt-4 flex gap-2 rounded-[10px] bg-orange-soft px-3 py-2.5 text-[13.5px] leading-snug text-ink-2">
                  <Clock3 aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" />
                  {plan.description}
                </p>
              ) : (
                <p className="mt-4 text-[15px] text-body">{plan.description}</p>
              )}
              {plan.lead && <p className="mt-5 text-[14px] font-semibold text-teal">✓ {plan.lead}</p>}
              <ul className={cn("flex-1 space-y-2.5", plan.lead ? "mt-3" : "mt-6")}>
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[15px] text-ink-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink href={plan.cta.href} variant={plan.highlight ? "primary" : "outline"} className={cn("mt-7 w-full whitespace-normal text-center", plan.highlight && "shadow-cta")}>
                {plan.cta.label}
              </ButtonLink>
              {plan.footnote && <p className="mt-3 text-center text-[12.5px] text-muted">{plan.footnote}</p>}
            </article>
          ))}
        </div>
        <ProcessSteps steps={pricing.steps} />
      </Container>
    </section>
  );
}
