import { ArrowRight, Check, Clock3, FileText, Lock, Star, UserRound } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { EARLY_DISCOUNT, pricing, type Plan } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { applyDiscount, cn, formatPrice } from "@/lib/utils";

const pct = Math.round(EARLY_DISCOUNT * 100);

/** Per-plan accent: blue for the first two, violet for the accommodation package. */
const accent = {
  blue: { text: "text-[#1A6FE8]", soft: "bg-[#E8F1FD]", check: "bg-[#1A6FE8]", tag: "bg-[#E8F1FD] text-[#1A6FE8]" },
  violet: { text: "text-[#5B21B6]", soft: "bg-[#F1ECFD]", check: "bg-[#7C5CE0]", tag: "bg-[#F1ECFD] text-[#5B21B6]" },
};

/** Emphasise "within 24 hours" / "10% off" fragments in blue. */
function emphasise(text: string, cls: string): ReactNode {
  const parts = text.split(/(within 24 hours|10% off)/);
  return parts.map((p, i) => (i % 2 ? <strong key={i} className={cn("font-semibold", cls)}>{p}</strong> : <Fragment key={i}>{p}</Fragment>));
}

function PlanCard({ plan }: { plan: Plan }) {
  const a = plan.id === "package" ? accent.violet : accent.blue;
  const { final, savings } = applyDiscount(plan.price, EARLY_DISCOUNT);
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex h-full w-full min-w-0 flex-col rounded-[22px] bg-white p-5 xs:p-6 sm:p-8",
        plan.highlight ? "border-2 border-[#1A6FE8] shadow-[0_24px_60px_rgba(26,111,232,.16)]" : "border border-black/[0.05] shadow-[0_12px_40px_rgba(15,27,46,.07)]",
      )}
    >
      {plan.highlight && plan.badge && (
        <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#1A6FE8] px-5 py-2 text-[13px] font-semibold whitespace-nowrap text-white uppercase shadow-[0_8px_20px_rgba(26,111,232,.35)]">
          <Star aria-hidden className="size-3.5 fill-current" /> {plan.badge.label}
        </span>
      )}

      <div className="flex items-start gap-4">
        <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-full", a.soft, a.text)}>
          <FeatureIcon name={plan.icon} className="size-8 stroke-[1.5]" />
        </span>
        <div className="min-w-0 pt-1">
          {!plan.highlight && plan.badge && (
            <span className={cn("mb-1.5 inline-block rounded-full px-2.5 py-1 text-[12px] font-semibold", a.tag, plan.id === "screening" && "uppercase")}>{plan.badge.label}</span>
          )}
          <h3 id={`plan-${plan.id}`} className="text-[21px] leading-[1.25] font-bold text-navy sm:text-[22px]">
            {plan.name}
          </h3>
        </div>
      </div>

      {plan.discounted ? (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[24px] font-semibold text-muted-2 line-through" aria-label={`Regular price ${formatPrice(plan.price)}`}>
              {formatPrice(plan.price)}
            </span>
            <span className={cn("text-[38px] leading-none font-extrabold tracking-[-0.02em] sm:text-[40px]", a.text)}>{formatPrice(final)}</span>
            <span className={cn("rounded-[10px] px-3 py-1.5 text-center leading-tight", a.soft, a.text)}>
              <span className="block text-[14px] font-bold">SAVE {pct}%</span>
              <span className="block text-[11px] opacity-80">(Save {formatPrice(savings)})</span>
            </span>
          </div>
          <p className={cn("mt-4 flex gap-3 rounded-[12px] px-4 py-3 text-[14px] leading-snug text-ink-2", a.soft)}>
            <Clock3 aria-hidden className={cn("mt-0.5 size-6 shrink-0 stroke-[1.75]", a.text)} />
            <span>{emphasise(plan.description, a.text)}</span>
          </p>
        </>
      ) : (
        <>
          <p className="mt-5 text-[44px] leading-none font-extrabold text-navy">{formatPrice(plan.price)}</p>
          <p className="mt-3 text-[15px] text-body">{plan.description}</p>
        </>
      )}

      <hr className="my-5 border-black/[0.07]" />
      {plan.lead && <p className="mb-3 text-[15px] font-bold text-navy">{plan.lead}</p>}
      <ul className="flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-[15px] leading-snug text-ink-2">
            <span aria-hidden className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white", a.check)}>
              <Check className="size-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={plan.cta.href}
        variant={plan.id === "package" ? "outline" : "primary"}
        className={cn(
          "group mt-7 h-14 w-full gap-2 text-[16px] font-semibold whitespace-normal",
          plan.id === "package" ? "border-2 border-[#5B21B6]! bg-white! text-[#5B21B6]! hover:bg-[#F1ECFD]!" : "bg-[#1A6FE8]! shadow-[0_10px_24px_rgba(26,111,232,.3)]! hover:bg-[#155BC2]!",
        )}
      >
        {plan.cta.label.replace(/\s*→$/, "")}
        <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
      </ButtonLink>

      {plan.id === "screening" && <p className="mt-3 text-center text-[13px] text-muted">{plan.footnote}</p>}
      {plan.highlight && (
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12.5px] text-ink-2">
          {[
            [Lock, "Secure & confidential"],
            [UserRound, "Clinician-led"],
            [FileText, "Superbills provided"],
          ].map(([Icon, label]) => (
            <Fragment key={label as string}>
              
              <li className="flex items-center gap-1.5">
                {(() => { const I = Icon as typeof Lock; return <I aria-hidden className="size-3.5" />; })()}
                {label as string}
              </li>
            </Fragment>
          ))}
        </ul>
      )}
    </article>
  );
}

/** "Choose Your Next Step": eyebrow + two-tone heading, three plan cards (middle highlighted), then the 3-step strip. */
export function PricingCards() {
  return (
    <section id="pricing" className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F9FF_100%)] py-16 font-inter sm:py-20 lg:py-24" aria-labelledby="pricing-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="flex items-center justify-center gap-4 text-[15px] font-bold tracking-[0.12em] text-[#1A6FE8] uppercase sm:text-[17px]">
            <span aria-hidden className="h-px w-10 bg-[#1A6FE8]/60 sm:w-14" />
            {pricing.eyebrow}
            <span aria-hidden className="h-px w-10 bg-[#1A6FE8]/60 sm:w-14" />
          </p>
          <h2 id="pricing-title" className="mt-2 font-inter text-[32px] leading-[1.15] font-extrabold tracking-[-0.02em] text-navy sm:text-[44px] lg:text-[52px]">
            Choose Your <span className="text-[#1A6FE8]">Next Step</span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-body sm:text-[18px]">{emphasise(pricing.intro, "text-[#1A6FE8]")}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[560px] items-stretch gap-8 md:max-w-[1440px] md:grid-cols-3 md:gap-5 lg:gap-6">
          {pricing.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="flex min-w-0">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <ol className="mt-8 flex flex-col gap-5 rounded-[22px] border border-black/[0.05] bg-white p-6 shadow-[0_10px_36px_rgba(15,27,46,.06)] md:flex-row md:items-center md:gap-3 md:px-8">
          {pricing.steps.map((step, i) => (
            <Fragment key={step.title}>
              {i > 0 && <ArrowRight aria-hidden className="mx-auto size-6 shrink-0 rotate-90 text-[#1A6FE8] md:mx-2 md:rotate-0" />}
              <li className="flex flex-1 items-center gap-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#E3EEFC] text-[28px] font-bold text-[#1A6FE8]" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-body">{emphasise(step.text, "text-[#1A6FE8]")}</p>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
