import Image from "next/image";
import { Check } from "lucide-react";
import type { FeaturesSection, PageHero, SplitSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Arrow, IconChip, h2, lead, primaryBtn, wrap } from "./AccommodationSections";
import { TrustBar } from "./TrustBar";

/**
 * ADHD Care page sections. All copy, images and link targets come from the page's content definition,
 * so only presentation changes. Tokens and helpers are shared with the Accommodation page.
 */

/* ------------------------------------------------ Hero */

export function AdhdCareHero({ data }: { data: PageHero }) {
  return (
    <section aria-labelledby="page-title" className="relative -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(135deg,#F3F8FE_0%,#E8F2FC_55%,#F7FAFF_100%)] pt-[calc(var(--header-height)+32px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-height)+44px)] lg:pb-24">
      <div aria-hidden className="absolute top-0 right-0 hidden h-full w-[46%] bg-[radial-gradient(circle_at_60%_40%,rgba(134,182,229,.28),transparent_68%)] md:block" />
      <div className={cn(wrap, "relative grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-16")}>
        <div>
          {data.eyebrow && <p className="mb-4 text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">{data.eyebrow}</p>}
          <h1 id="page-title" className="font-display text-[clamp(32px,4.6vw,54px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance text-[#123D6A]">
            {data.title}
          </h1>
          {data.text.map((t) => (
            <p key={t} className="type-lead mt-6 max-w-[620px] text-pretty text-[#33465E]">
              {t}
            </p>
          ))}
          {data.ctas.length > 0 && (
            <div className="mt-9 flex flex-col items-start gap-3.5">
              {data.ctas.map((cta, i) => (
                <ButtonLink
                  key={cta.label}
                  href={cta.href}
                  size="lg"
                  variant={i === 0 ? "primary" : "outline"}
                  className={cn("group", i === 0 ? primaryBtn : "border-primary! text-primary! hover:bg-primary! hover:text-white!")}
                >
                  {cta.label}
                  <Arrow />
                </ButtonLink>
              ))}
            </div>
          )}
          {data.note && <p className="type-small mt-3 text-[#5B6B80]">{data.note}</p>}
          {data.trust && <TrustBar className="mt-10 items-center gap-x-5 gap-y-4 lg:flex-nowrap [&>li]:shrink-0 max-lg:[&>li[aria-hidden]]:hidden [&_a]:-my-2 [&_a]:-ml-1.5 [&_a_img]:h-[64px] lg:[&_a_img]:h-[68px]" />}
        </div>
        <Reveal delay={0.1}>
          <div className="relative">
            <div aria-hidden className="absolute -right-3 -bottom-3 size-full rounded-[30px] bg-primary/12" />
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              priority
              sizes="(max-width: 1023px) 100vw, 600px"
              className="relative h-auto w-full rounded-[28px] shadow-[0_28px_64px_rgba(18,61,106,.20)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Care and support services */

/** Centred heading above a single soft panel that holds all the items as columns. */
export function AdhdCareServices({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2 id="services-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-12 grid gap-8 rounded-[28px] border border-primary-100 bg-[#F3F8FE] p-7 sm:grid-cols-2 sm:p-10 lg:grid-cols-4 lg:gap-0 lg:p-0">
            {data.items.map((item) => (
              <li key={item.title} className="lg:px-8 lg:py-10 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-primary-100">
                <div className="group">
                  <IconChip className="size-16 rounded-full bg-white shadow-[0_8px_20px_rgba(37,120,202,.12)]">{item.icon && <FeatureIcon name={item.icon} className="size-7" />}</IconChip>
                  <h3 className="type-h4 mt-5 text-[#123D6A]">{item.title}</h3>
                  {item.text && <p className="type-body mt-2 text-[#536985]">{item.text}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ "The ADHD brain is specialized" */

const tileTones = ["bg-[#E3EFFC] text-primary", "bg-[#DDF7EF] text-[#12998A]", "bg-[#FFE8EC] text-[#E5484D]", "bg-[#EEE9FF] text-[#6D4AE0]"];

export function AdhdCareSpecialized({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-[#EAF0F7] py-16 sm:py-20 lg:py-24" aria-labelledby="specialized-title">
      <div className={cn(wrap, "grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16")}>
        <Reveal className="lg:sticky lg:top-[var(--header-offset)]">
          <h2 id="specialized-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={cn(lead, "mt-5")}>{data.subtitle}</p>}
          {data.image && <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1023px) 100vw, 600px" className="mt-8 h-auto w-full rounded-[26px] shadow-[0_22px_50px_rgba(18,61,106,.16)]" />}
        </Reveal>
        <ul className="space-y-4">
          {data.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.06}>
                <div className="group flex items-start gap-5 rounded-[22px] bg-white p-6 shadow-[0_8px_24px_rgba(18,61,106,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(37,120,202,.15)] sm:p-7">
                  <span aria-hidden className={cn("grid size-14 shrink-0 place-items-center rounded-2xl", tileTones[i % tileTones.length])}>
                    {item.icon && <FeatureIcon name={item.icon} className="size-7" />}
                  </span>
                  <div>
                    <h3 className="type-h4 text-[#123D6A]">{item.title}</h3>
                    {item.text && <p className="type-body mt-1.5 text-[#536985]">{item.text}</p>}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------ "Your Path to Long-Term Success" */

export function AdhdCarePath({ data }: { data: FeaturesSection }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="path-title">
      <div className={wrap}>
        <Reveal className="grid items-end gap-4 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <h2 id="path-title" className={h2}>
            {data.title}
          </h2>
          {data.subtitle && <p className={lead}>{data.subtitle}</p>}
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={i * 0.06} className="flex w-full">
                <div className="group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-primary-100 bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF5FD_100%)] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,120,202,.15)]">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary-300" />
                  <IconChip className="size-14 rounded-2xl bg-white shadow-[0_6px_16px_rgba(37,120,202,.12)]">{item.icon && <FeatureIcon name={item.icon} className="size-7" />}</IconChip>
                  <h3 className="type-h4 mt-5 text-[#123D6A]">{item.title}</h3>
                  {item.text && <p className="type-body mt-2 text-[#536985]">{item.text}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------ "Practical Tools for Everyday Success" */

export function AdhdCareTools({ data }: { data: SplitSection }) {
  return (
    <section className="bg-[#E8F2FC] py-16 sm:py-20 lg:py-24" aria-labelledby="tools-title">
      <div className={cn(wrap, "grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr] lg:gap-16")}>
        <Reveal>
          <h2 id="tools-title" className={h2}>
            {data.title}
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className={cn(lead, "mt-5")}>
              {p}
            </p>
          ))}
          {data.list && (
            <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {data.list.map((li) => (
                <li key={li} className="type-body flex items-start gap-3.5 text-[#15243A]">
                  <span aria-hidden className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          {data.image && <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1023px) 100vw, 640px" className="aspect-[4/3] w-full rounded-[26px] object-cover shadow-[0_26px_58px_rgba(18,61,106,.18)]" />}
        </Reveal>
      </div>
    </section>
  );
}
