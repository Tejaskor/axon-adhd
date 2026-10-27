import { Fragment } from "react";
import { CalendarDays, Coins, CreditCard, FileSearch, HandHeart, Laptop, LockKeyhole, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { careYouCanTrust } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  users: Users,
  coins: Coins,
  laptop: Laptop,
  shield: ShieldCheck,
  assessment: FileSearch,
  calendar: CalendarDays,
  card: CreditCard,
  lock: LockKeyhole,
  care: HandHeart,
};

/** Stat circles: gradient ring, frosted tinted fill, coloured glow and headline. */
const statTones = {
  blue: {
    ring: "bg-[linear-gradient(140deg,#5498DB,#1E64AA)]",
    fill: "bg-[radial-gradient(120%_120%_at_30%_15%,rgba(255,255,255,.96)_0%,rgba(241,247,255,.92)_50%,rgba(219,234,254,.9)_100%)]",
    glow: "shadow-[0_24px_60px_rgba(37,120,202,.20)]",
    color: "text-primary-600",
  },
  teal: {
    ring: "bg-[linear-gradient(140deg,#5EEAD4,#0D9488)]",
    fill: "bg-[radial-gradient(120%_120%_at_30%_15%,rgba(255,255,255,.96)_0%,rgba(240,253,250,.92)_50%,rgba(204,242,234,.9)_100%)]",
    glow: "shadow-[0_24px_60px_rgba(13,148,136,.20)]",
    color: "text-[#0E9F8A]",
  },
  orange: {
    ring: "bg-[linear-gradient(140deg,#FDBA74,#F97316)]",
    fill: "bg-[radial-gradient(120%_120%_at_30%_15%,rgba(255,255,255,.96)_0%,rgba(255,247,240,.92)_50%,rgba(255,228,208,.9)_100%)]",
    glow: "shadow-[0_24px_60px_rgba(249,115,22,.20)]",
    color: "text-[#F2700F]",
  },
} as const;

/** Feature icons: soft gradient disc in the item's tone. */
const featureTones = {
  blue: "bg-[radial-gradient(circle_at_30%_25%,#FFFFFF,#DCE9FD)] text-primary-600 shadow-[0_8px_20px_rgba(37,120,202,.14)]",
  teal: "bg-[radial-gradient(circle_at_30%_25%,#FFFFFF,#D3F3EC)] text-[#0E9F8A] shadow-[0_8px_20px_rgba(13,148,136,.14)]",
  orange: "bg-[radial-gradient(circle_at_30%_25%,#FFFFFF,#FFE6D3)] text-[#F2700F] shadow-[0_8px_20px_rgba(249,115,22,.14)]",
  pink: "bg-[radial-gradient(circle_at_30%_25%,#FFFFFF,#FDE0EA)] text-[#E2336B] shadow-[0_8px_20px_rgba(226,51,107,.14)]",
  purple: "bg-[radial-gradient(circle_at_30%_25%,#FFFFFF,#EBE2FE)] text-[#7C3AED] shadow-[0_8px_20px_rgba(124,58,237,.14)]",
} as const;

/** Thin connector between two circles, with a dot at each end and one midway. */
function Connector({ from, to }: { from: string; to: string }) {
  return (
    <div aria-hidden className="relative hidden h-px min-w-4 flex-1 md:block" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}>
      <span className="absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full" style={{ background: from }} />
      <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-primary-300" />
      <span className="absolute top-1/2 right-0 size-2 -translate-y-1/2 rounded-full" style={{ background: to }} />
    </div>
  );
}

/** "Care you can trust": headline, three glass stat circles joined by connectors, and a glass panel of six features. */
export function CareYouCanTrust() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F6FAFF_0%,#EDF4FE_55%,#F5F9FF_100%)] py-14 sm:py-20" aria-labelledby="trust-title">
      {/* Soft glass sheens behind the content. */}
      <div aria-hidden className="pointer-events-none absolute -top-56 -left-64 -z-10 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(201,222,244,.75),transparent_68%)]" />
      <div aria-hidden className="pointer-events-none absolute -top-72 -right-56 -z-10 size-[720px] rounded-full border border-white/80 bg-[linear-gradient(200deg,rgba(255,255,255,.7),rgba(219,234,254,.35))]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-64 left-1/3 -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(219,234,254,.8),transparent_70%)]" />

      <Container>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 id="trust-title" className="type-h1 font-extrabold text-navy">
            {careYouCanTrust.title}
          </h2>
          <p className="type-body mt-3 text-pretty text-body">{careYouCanTrust.subtitle}</p>
        </Reveal>

        <div className="relative mx-auto mt-10 flex max-w-[1060px] flex-col items-center gap-6 md:mt-12 md:flex-row md:gap-0">
          {careYouCanTrust.stats.map((s, i) => {
            const Icon = icons[s.icon];
            const tone = statTones[s.tone];
            return (
              <Fragment key={s.label}>
                {i === 1 && <Connector from="#86B6E5" to="#5EEAD4" />}
                {i === 2 && <Connector from="#5EEAD4" to="#FDBA74" />}
                <Reveal delay={i * 0.08} className="relative w-full max-w-[250px] shrink-0 md:w-[27%] md:max-w-[285px]">
                  {/* Outer arcs sweep from the side circles down to the section edges. */}
                  {i === 0 && (
                    <span aria-hidden className="pointer-events-none absolute top-1/2 right-full hidden h-[420px] w-[min(38vw,560px)] rounded-tl-[100%] border-t border-l border-primary-200/80 md:block">
                      <span className="absolute -top-1 -right-1 size-2 rounded-full bg-primary-300" />
                    </span>
                  )}
                  {i === careYouCanTrust.stats.length - 1 && (
                    <span aria-hidden className="pointer-events-none absolute top-1/2 left-full hidden h-[420px] w-[min(38vw,560px)] rounded-tr-[100%] border-t border-r border-primary-200/80 md:block">
                      <span className="absolute -top-1 -left-1 size-2 rounded-full bg-[#F9B48A]" />
                    </span>
                  )}
                  <div className={cn("aspect-square rounded-full p-[1.5px]", tone.ring, tone.glow)}>
                    <div className={cn("relative grid size-full place-items-center overflow-hidden rounded-full px-6 text-center backdrop-blur-xl lg:px-8", tone.fill)}>
                      <span aria-hidden className="pointer-events-none absolute inset-x-[18%] top-[4%] h-[34%] rounded-full bg-gradient-to-b from-white/90 to-transparent blur-md" />
                      <div className="relative">
                        <Icon aria-hidden className={cn("mx-auto size-9 lg:size-10", tone.color)} strokeWidth={1.75} />
                        <p className={cn("mt-2 font-display text-[clamp(34px,3.8vw,50px)] leading-none font-extrabold tracking-[-0.02em]", tone.color)}>
                          <CountUp value={s.value.count} />
                          {s.value.suffix}
                        </p>
                        <p className="mt-2 text-[clamp(18px,1.7vw,23px)] leading-tight font-bold text-navy">{s.label}</p>
                        <p className="type-small mx-auto mt-1.5 max-w-[190px] text-pretty text-body">{s.text}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </Fragment>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-10 lg:mt-12">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-[28px] border border-white/90 bg-white/55 px-4 py-8 shadow-[0_24px_60px_rgba(37,120,202,.10),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl sm:grid-cols-3 sm:px-8 lg:grid-cols-6 lg:gap-x-0 lg:px-4 lg:py-10">
            {careYouCanTrust.features.map((f, i) => {
              const Icon = icons[f.icon];
              return (
                <li key={f.title} className={cn("flex flex-col items-center px-2 text-center lg:px-4", i > 0 && "lg:border-l lg:border-primary-150")}>
                  <span aria-hidden className={cn("grid size-16 place-items-center rounded-full lg:size-[72px]", featureTones[f.tone])}>
                    <Icon className="size-7 lg:size-8" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-[16px] leading-snug font-bold text-balance text-navy lg:text-[clamp(15px,1.25vw,19px)]">{f.title}</h3>
                  <p className="type-small mt-2 text-balance text-body">{f.text}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
