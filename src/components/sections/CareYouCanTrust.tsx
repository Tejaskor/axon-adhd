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

/** "Care you can trust": headline, three glass stat circles, and a glass panel of six features. */
export function CareYouCanTrust() {
  return (
    // Same background as "We see you." (WeSeeYou) and "Choose Your Next Step".
    <section className="relative isolate overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-14 sm:py-20" aria-labelledby="trust-title">
      <Container>
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 id="trust-title" className="type-h2 text-navy">
            {careYouCanTrust.title}
          </h2>
          <p className="type-body mt-3 text-pretty text-body">{careYouCanTrust.subtitle}</p>
        </Reveal>

        <div className="relative mx-auto mt-10 flex max-w-[1060px] flex-col items-center gap-6 md:mt-12 md:flex-row md:justify-center md:gap-[clamp(40px,8vw,120px)]">
          {careYouCanTrust.stats.map((s, i) => {
            const Icon = icons[s.icon];
            const tone = statTones[s.tone];
            return (
              <Reveal key={s.label} delay={i * 0.08} className="relative w-full max-w-[190px] shrink-0 md:w-[20%] md:max-w-[215px]">
                <div className={cn("aspect-square rounded-full p-[1.5px]", tone.ring, tone.glow)}>
                  <div className={cn("relative grid size-full place-items-center overflow-hidden rounded-full px-4 text-center backdrop-blur-xl lg:px-6", tone.fill)}>
                    <span aria-hidden className="pointer-events-none absolute inset-x-[18%] top-[4%] h-[34%] rounded-full bg-gradient-to-b from-white/90 to-transparent blur-md" />
                    <div className="relative">
                      <Icon aria-hidden className={cn("mx-auto size-7 lg:size-8", tone.color)} strokeWidth={1.75} />
                      <p className={cn("mt-2 font-display text-[clamp(26px,2.7vw,38px)] leading-none font-extrabold tracking-[-0.02em]", tone.color)}>
                        <CountUp value={s.value.count} />
                        {s.value.suffix}
                      </p>
                      <p className="mt-2 text-[clamp(15px,1.3vw,18px)] leading-tight font-bold text-navy">{s.label}</p>
                      <p className="type-small mx-auto mt-1.5 max-w-[150px] text-pretty text-body">{s.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
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
