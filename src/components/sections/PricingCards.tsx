import { ArrowRight, ChartNoAxesColumnIncreasing, Check, Clock3, CreditCard, FileText, Star } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { EARLY_DISCOUNT, pricing, type Plan } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatPrice } from "@/lib/utils";

const saveLabel = `SAVE ${formatPrice(EARLY_DISCOUNT)}`;

/** Per-plan accent: blue for the screening and evaluation, violet for the accommodation package. */
const accent = {
  blue: {
    text: "text-primary",
    price: "text-primary",
    tag: "bg-[#E3EEFD]/90 text-primary-600",
    check: "bg-primary-400",
    icon: "text-primary shadow-[0_10px_24px_rgba(37,120,202,.18)]",
  },
  violet: {
    text: "text-[#7C3AED]",
    price: "text-[#7C3AED]",
    tag: "bg-[#F1EAFF]/90 text-[#6D28D9]",
    check: "bg-[#A78BFA]",
    icon: "text-[#7C3AED] shadow-[0_10px_24px_rgba(124,58,237,.18)]",
  },
};

/** Emphasise the offer fragments ("within 10 minutes", "save $50", "$50 off") in bold accent colour. */
function emphasise(text: string, cls: string): ReactNode {
  const parts = text.split(/(within 10 minutes|save \$50|\$50 off)/);
  return parts.map((p, i) => (i % 2 ? <strong key={i} className={cn("font-semibold", cls)}>{p}</strong> : <Fragment key={i}>{p}</Fragment>));
}

/**
 * Icy frosted glass shared by the cards, panels and steps strip: white fading to a pale blue tint (never opaque), 20px
 * backdrop blur, luminous white border, a bright top highlight plus a faint inner rim, and a soft blue drop shadow.
 */
const glass =
  "border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,.58)_0%,rgba(228,239,250,.38)_100%)] backdrop-blur-[20px] shadow-[0_24px_60px_rgba(37,120,202,.12),inset_0_1px_0_rgba(255,255,255,.95),inset_0_0_0_1px_rgba(255,255,255,.25)]";
/** Smaller glass for inner pieces (save badge, 24-hour panel). */
const glassInner = "border border-white/80 bg-white/55 backdrop-blur-md shadow-[0_8px_20px_rgba(37,120,202,.08),inset_0_1px_0_rgba(255,255,255,.95)]";

function PlanCard({ plan }: { plan: Plan }) {
  const a = plan.id === "package" ? accent.violet : accent.blue;
  // Flat early-payment discount on the evaluation (also applied to the package total).
  const final = plan.price - EARLY_DISCOUNT;
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex h-full w-full min-w-0 flex-col rounded-[28px] p-6 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1 xs:p-7 lg:p-8",
        // The highlight and package variants replace the shared glass outright (cn doesn't merge conflicting classes).
        plan.highlight
          ? "border-2 border-primary-300 bg-[linear-gradient(160deg,rgba(255,255,255,.7)_0%,rgba(225,237,249,.5)_100%)] shadow-[0_0_0_4px_rgba(134,182,229,.18),0_30px_80px_rgba(37,120,202,.24),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-[20px]"
          : plan.id === "package"
            ? "border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,.62)_0%,rgba(243,236,255,.45)_100%)] shadow-[0_24px_60px_rgba(124,58,237,.11),inset_0_1px_0_rgba(255,255,255,.95),inset_0_0_0_1px_rgba(255,255,255,.25)] backdrop-blur-[20px]"
            : glass,
      )}
    >
      {/* Reflections and soft light, clipped to the card (the badge above stays unclipped). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white/55 to-transparent" />
        {plan.id === "screening" && <div className="absolute top-[38%] -right-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(182,211,240,.6),transparent_70%)]" />}
        {plan.id === "package" && <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(167,139,250,.20),transparent_55%)]" />}
      </div>

      {plan.highlight && plan.badge && (
        <span className="absolute -top-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#5498DB_0%,#2578CA_55%,#1E64AA_100%)] px-5 py-2 text-[12.5px] font-semibold whitespace-nowrap text-white uppercase shadow-[0_10px_24px_rgba(37,120,202,.40)]">
          <Star aria-hidden className="size-3.5 fill-current" /> {plan.badge.label}
        </span>
      )}

      <div className="relative flex items-start gap-4">
        <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-full border border-white/80 bg-white/80 backdrop-blur", a.icon)}>
          <FeatureIcon name={plan.icon} className="size-8 stroke-[1.5]" />
        </span>
        <div className="min-w-0 pt-0.5">
          {!plan.highlight && plan.badge && (
            <span className={cn("mb-2 inline-block rounded-full px-2.5 py-1 text-[11.5px] font-semibold", a.tag, plan.id === "screening" && "uppercase")}>{plan.badge.label}</span>
          )}
          <h3 id={`plan-${plan.id}`} className="text-[21px] leading-[1.2] font-bold text-navy lg:text-[22px]">
            {plan.name}
          </h3>
          <p className="mt-2 text-[14px] leading-snug text-[#4B5B73]">{plan.discounted ? plan.summary : plan.description}</p>
        </div>
      </div>

      {plan.discounted ? (
        <>
          <div className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[22px] font-semibold text-[#8A94A6] line-through" aria-label={`Regular price ${formatPrice(plan.price)}`}>
              {formatPrice(plan.price)}
            </span>
            <span className={cn("text-[34px] leading-none font-extrabold tracking-[-0.02em] lg:text-[38px] xl:text-[42px]", a.price)}>{formatPrice(final)}</span>
            <span className={cn("rounded-2xl px-3.5 py-1.5 text-center leading-tight", glassInner, a.text)}>
              <span className="block text-[14px] font-bold">{saveLabel}</span>
            </span>
          </div>
          {plan.breakdown && (
            <p className="relative mt-3 text-[13.5px] leading-snug text-[#4B5B73]">
              {plan.breakdown}
              <span className="mt-1 block font-bold text-navy">Total: {formatPrice(final)}</span>
            </p>
          )}
          <p className={cn("relative mt-5 flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-2", glassInner)}>
            <Clock3 aria-hidden className={cn("size-7 shrink-0 stroke-[1.75]", a.text)} />
            <span>{emphasise(plan.description, a.text)}</span>
          </p>
        </>
      ) : (
        <p className={cn("relative mt-6 w-fit rounded-2xl px-5 py-3 text-[46px] leading-none font-extrabold tracking-[-0.02em] text-navy", glassInner)}>{formatPrice(plan.price)}</p>
      )}

      <hr className="relative my-5 border-[#1A3A6B]/[0.08]" />
      {plan.lead && (
        <p className="relative mb-3 flex items-center gap-2 text-[13.5px] font-bold text-navy">
          <Check aria-hidden className={cn("size-4", a.text)} strokeWidth={2.5} />
          {plan.lead}
        </p>
      )}
      <ul className={cn("relative flex-1", plan.discounted ? "space-y-2.5" : "space-y-4")}>
        {plan.features.map((f) => (
          <li key={f} className={cn("flex gap-3 text-ink-2", plan.id === "package" ? "text-[13px]" : "text-[14px]")}>
            <span aria-hidden className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white shadow-[0_2px_6px_rgba(37,120,202,.25)]", a.check)}>
              <Check className="size-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={plan.cta.href}
        newTab
        size="lg"
        variant={plan.id === "package" ? "outline" : "primary"}
        className={cn(
          "group relative mt-7 h-14 w-full gap-2 whitespace-normal transition-[filter,box-shadow,background-color] duration-300",
          plan.id === "package"
            ? "border-2 border-[#8B5CF6]! bg-white/60! text-[#6D28D9]! hover:bg-[#F3EEFF]!"
            : "bg-[linear-gradient(180deg,#5498DB_0%,#2578CA_55%,#1E64AA_100%)] shadow-[0_14px_30px_rgba(37,120,202,.38),inset_0_1px_0_rgba(255,255,255,.35)]! hover:shadow-[0_18px_38px_rgba(37,120,202,.48),inset_0_1px_0_rgba(255,255,255,.35)]! hover:brightness-110",
        )}
      >
        {plan.cta.label.replace(/\s*→$/, "")}
        <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
      </ButtonLink>

      {plan.footnote && <p className="relative mt-3 text-center text-[12.5px] text-[#5B6B84]">{plan.footnote.replace(/\s*•\s*/g, " · ")}</p>}
    </article>
  );
}

/** Step accents: blue for the first two, violet for the third (matching the reference). */
const steps = [
  { icon: FileText, tone: "text-primary" },
  { icon: CreditCard, tone: "text-primary" },
  { icon: ChartNoAxesColumnIncreasing, tone: "text-[#7C3AED]" },
];

/** "Choose Your Next Step": two-tone heading, three glass plan cards (middle highlighted), then the 3-step strip. */
export function PricingCards() {
  return (
    <section id="pricing" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#EEF5FC_0%,#E1ECF8_50%,#ECF3FB_100%)] py-16 sm:py-20 lg:py-24" aria-labelledby="pricing-title">
      {/*
        Layered lighting: large white reflective shapes (top corners, lower left), blurred blue light pools, and an
        ambient glow centred behind the cards so the glass has colour to frost.
      */}
      <div aria-hidden className="pointer-events-none absolute -top-48 -left-56 -z-10 h-[560px] w-[760px] rotate-[-18deg] rounded-[50%] bg-[linear-gradient(160deg,rgba(255,255,255,.85),rgba(255,255,255,.15))] blur-[2px]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-48 -z-10 h-[520px] w-[700px] rotate-[22deg] rounded-[50%] border border-white/70 bg-[linear-gradient(200deg,rgba(255,255,255,.8),rgba(220,234,248,.2))]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-56 -left-40 -z-10 h-[520px] w-[720px] rotate-[12deg] rounded-[50%] bg-[linear-gradient(20deg,rgba(255,255,255,.7),rgba(220,234,248,.1))]" />
      <div aria-hidden className="pointer-events-none absolute top-[10%] left-[8%] -z-10 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(134,182,229,.55),transparent_68%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute top-[30%] right-[4%] -z-10 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,.28),transparent_70%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute top-[28%] left-1/2 -z-10 h-[620px] w-[min(1200px,100%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(84,152,219,.32),transparent_65%)] blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 id="pricing-title" className="font-display text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-navy">
            Choose Your <span className="bg-[linear-gradient(90deg,#2578CA,#5498DB)] bg-clip-text text-transparent">Next Step</span>
          </h2>
          <p className="type-lead mx-auto mt-4 max-w-[760px] text-pretty text-[#4B5B73]">{emphasise(pricing.intro, "text-primary")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[560px] items-stretch gap-10 md:max-w-none md:grid-cols-3 md:gap-5 lg:gap-7">
          {pricing.plans.map((plan, i) => (
            // The highlighted card starts a little higher on desktop, as in the reference.
            <Reveal key={plan.id} delay={i * 0.08} className={cn("flex min-w-0", plan.highlight && "md:-mt-2")}>
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <ol className={cn("mt-10 flex flex-col gap-4 rounded-[28px] p-6 md:flex-row md:items-center md:gap-3 md:px-8 lg:mt-12", glass)}>
          {pricing.steps.map((step, i) => {
            const { icon: Icon, tone } = steps[i];
            return (
              <Fragment key={step.title}>
                {i > 0 && <ArrowRight aria-hidden className="mx-auto size-5 shrink-0 rotate-90 text-[#6B7A90] md:mx-1 md:rotate-0" />}
                <li className="flex flex-1 items-center gap-3 lg:gap-4">
                  <span aria-hidden className={cn("grid size-11 shrink-0 place-items-center rounded-full border border-white/80 bg-primary-100/80 text-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_6px_16px_rgba(37,120,202,.12)] font-bold lg:size-12", tone)}>
                    {i + 1}
                  </span>
                  <span aria-hidden className={cn("grid size-14 shrink-0 place-items-center rounded-full border border-white/80 bg-white/80 shadow-[0_8px_20px_rgba(37,120,202,.12)]", tone)}>
                    <Icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-bold text-navy">{step.title}</h3>
                    <p className="mt-1 text-[14px] leading-snug text-[#4B5B73]">{emphasise(step.text, "text-primary")}</p>
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
