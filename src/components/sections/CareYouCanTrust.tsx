import { Award, CalendarClock, ClipboardList, CreditCard, LockKeyhole, ShieldCheck, type LucideIcon } from "lucide-react";
import { careYouCanTrust } from "@/content/home";
import { PathCard } from "@/components/sections/AdhdCareSections";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<(typeof careYouCanTrust.features)[number]["icon"], LucideIcon> = {
  shield: ShieldCheck,
  award: Award,
  calendar: CalendarClock,
  card: CreditCard,
  lock: LockKeyhole,
  clipboard: ClipboardList,
};

/**
 * "Care you can trust": centered heading ("trust" in AXON blue), three one-line blue stats, and six PathCards,
 * the same card, heading style and gradient background used by the About, ADHD Care and Assessment pages.
 */
export function CareYouCanTrust() {
  const [lead] = careYouCanTrust.title.split(/\s+trust$/i);
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)] section-py" aria-labelledby="trust-title">
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2 id="trust-title" className="type-h2 text-balance text-navy">
            {lead} <span className="text-primary">trust</span>
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-pretty text-body sm:text-[20px]">{careYouCanTrust.subtitle}</p>
        </Reveal>

        {/* Three columns from tablet up; the stat font scales with the viewport so each headline stays on one line. */}
        <dl className="mx-auto mt-10 grid max-w-[1180px] gap-8 text-center md:grid-cols-3 md:gap-4 lg:mt-12">
          {careYouCanTrust.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col-reverse">
              <dt className="mt-3 text-[16px] leading-snug text-body sm:text-[18px]">{s.text}</dt>
              <dd className="font-display text-[clamp(22px,2.6vw,38px)] leading-tight font-semibold whitespace-nowrap text-primary">
                {"prefix" in s && <>{s.prefix} </>}
                {s.value}
                {s.suffix} {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {careYouCanTrust.features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <li key={f.title} className="flex">
                <Reveal delay={i * 0.06} className="flex w-full">
                  <PathCard inline tone={f.tone} icon={<Icon className="size-6" strokeWidth={1.9} />} title={f.title} text={f.text} />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
