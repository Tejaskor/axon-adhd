"use client";

import { Check, Lock } from "lucide-react";
import { useState } from "react";
import { EARLY_DISCOUNT, pricing } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { applyDiscount, cn, formatPrice } from "@/lib/utils";

const pct = Math.round(EARLY_DISCOUNT * 100);

/** Right-hand pricing card: discount toggle, plan tabs, price breakdown, included care and CTA. */
export function PricingPanel() {
  const [planId, setPlanId] = useState("evaluation");
  const [early, setEarly] = useState(true);
  const plan = pricing.plans.find((p) => p.id === planId) ?? pricing.plans[1];
  const free = plan.price === 0;
  const { final, savings } = applyDiscount(plan.price, EARLY_DISCOUNT);
  const dueToday = plan.discounted && early ? final : plan.price;

  return (
    <div className="flex flex-col rounded-[20px] bg-[#F6F7F9] p-4 sm:p-6">
      <p className="px-1 text-[12px] font-medium tracking-[0.14em] text-[#2578CA] uppercase">{pricing.eyebrow}</p>
      <h3 className="mt-1 px-1 font-inter text-[20px] font-semibold text-navy">{pricing.title}</h3>

      {/* Discount toggle (segmented) */}
      <div role="radiogroup" aria-label="Payment timing" className="mt-4 grid grid-cols-2 gap-1 rounded-full border border-black/[0.06] bg-white p-1">
        {pricing.discountOptions.map((label, i) => {
          const on = i === 0 ? early : !early;
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={free}
              onClick={() => setEarly(i === 0)}
              className={cn(
                "h-9 rounded-full px-2 text-[12.5px] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[13px]",
                on && !free ? "bg-[#E8F2FC] font-medium text-navy" : "text-muted hover:text-navy",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Plan tabs */}
      <div role="radiogroup" aria-label="Plan" className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
        {pricing.plans.map((p) => {
          const on = p.id === planId;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPlanId(p.id)}
              className={cn(
                "min-h-9 rounded-full border px-2 py-1.5 text-[12px] leading-tight transition-colors duration-200 sm:text-[13px]",
                on ? "border-[#1D5FC0] bg-[#1D5FC0] font-medium text-white" : "border-black/[0.06] bg-white text-ink-2 hover:border-[#1D5FC0]/40",
              )}
            >
              {p.tab}
            </button>
          );
        })}
      </div>

      {/* Price box */}
      <div className="mt-3 rounded-[14px] bg-white p-4 shadow-[0_1px_2px_rgba(15,27,46,.04)]" aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] text-[#7FA6CF] line-through" aria-hidden={!plan.discounted || !early}>
            {plan.discounted && early ? formatPrice(plan.price) : " "}
          </p>
          {plan.discounted && early && (
            <span className="rounded-full border border-[#2578CA]/30 bg-[#E8F2FC] px-2.5 py-0.5 text-[12px] font-medium text-[#1D5FC0]">Save {formatPrice(savings)}</span>
          )}
          {free && <span className="rounded-full border border-teal/30 bg-teal-soft px-2.5 py-0.5 text-[12px] font-medium text-teal">No payment required</span>}
        </div>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="font-inter text-[40px] leading-none font-bold tracking-[-0.02em] text-[#1D5FC0] sm:text-[44px]">{free ? "Free" : formatPrice(dueToday)}</span>
        </p>
        <p className="mt-2 text-[13.5px] text-ink-2">{plan.name}</p>

        {!free && (
          <dl className="mt-3 space-y-1.5 text-[13.5px]">
            {plan.breakdown ? (
              <div className="flex justify-between gap-3 text-ink-2">
                <dt>{plan.breakdown.replace(/\s*=.*$/, "")}</dt>
                <dd>{formatPrice(plan.price)}</dd>
              </div>
            ) : (
              <div className="flex justify-between gap-3 text-ink-2">
                <dt>{plan.name}</dt>
                <dd>{formatPrice(plan.price)}</dd>
              </div>
            )}
            {plan.discounted && early && (
              <div className="flex justify-between gap-3 text-[#1D5FC0]">
                <dt>{pct}% off — paid within 24 hours</dt>
                <dd>-{formatPrice(savings)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-3 border-t border-black/10 pt-2 font-medium text-navy">
              <dt>Due today</dt>
              <dd>{formatPrice(dueToday)}</dd>
            </div>
          </dl>
        )}
      </div>

      {/* Included care */}
      <p className="mt-5 px-1 text-[12px] tracking-[0.06em] text-muted uppercase">Included care</p>
      <ul className="mt-2.5 space-y-2 px-1">
        {plan.lead && <li className="text-[13.5px] font-medium text-teal">{plan.lead}</li>}
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-ink-2">
            <span aria-hidden className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#E8F2FC] text-[#1D5FC0]">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <hr className="my-5 border-black/10" />

      <p className="px-1 text-[12px] tracking-[0.06em] text-muted uppercase">Flexibility &amp; transparency</p>
      <ul className="mt-2.5 space-y-1.5 px-1">
        {pricing.assurances.map((a) => (
          <li key={a} className="flex items-center gap-2.5 text-[14px] text-ink-2">
            <span aria-hidden className="size-1 rounded-full bg-ink-2" />
            {a}
          </li>
        ))}
      </ul>

      <ButtonLink href={plan.cta.href} className="mt-6 h-12 w-full rounded-full! bg-[#1D5FC0]! font-inter! whitespace-normal hover:bg-[#174E9E]!">
        {plan.cta.label.replace(/\s*→$/, "")}
      </ButtonLink>

      <p className="mt-4 px-1 text-[11.5px] leading-relaxed text-muted">{pricing.intro}</p>
      <p className="mt-3 flex items-center justify-center gap-2 text-[13px] text-ink-2">
        <Lock aria-hidden className="size-3.5 text-navy" />
        {pricing.secureNote}
      </p>
    </div>
  );
}
