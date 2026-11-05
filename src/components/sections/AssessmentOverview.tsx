import { Check, ClipboardCheck, ShieldCheck, UsersRound, Wallet } from "lucide-react";
import type { AssessmentOverviewSection } from "@/content/pages/types";
import { Reveal } from "@/components/ui/Reveal";
import { PathCard, pathTones } from "./AdhdCareSections";
import { VideoCardPlayer } from "./AssessmentVideo";

const icons = {
  clinician: UsersRound,
  shield: ShieldCheck,
  insurance: Wallet,
  document: ClipboardCheck,
} as const;

/** Card accents in reading order (blue, green, orange, purple), as on the home page's "clarity" cards. */
const cardTones: Array<keyof typeof pathTones> = ["blue", "green", "orange", "purple"];

/**
 * Copy on the left (heading, intro, three check points in a column) and the video on the right inside a laptop drawn
 * in CSS (screen bezel, camera, hinge and base), then four icon feature cards (the shared PathCard). The columns are
 * centred on each other from lg and stack on smaller screens.
 */
export function AssessmentOverview({ data }: { data: AssessmentOverviewSection }) {
  const { video } = data;
  const [lead, accent] = data.title.split(data.accent);

  return (
    // Same background as "What You'll Learn from the Free Assessment" and "How we support you".
    <section className="relative overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-14 sm:py-16 lg:py-20" aria-label={data.title}>
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            {data.eyebrow && (
              <p className="mb-3 flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] text-primary uppercase">
                <span aria-hidden className="h-0.5 w-8 rounded-full bg-primary" />
                {data.eyebrow}
              </p>
            )}
            <h2 className="type-section font-display leading-[1.12] tracking-[-0.02em] text-balance text-navy">
              {lead}
              <span className="relative inline-block whitespace-nowrap text-primary">
                {data.accent}
                <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.22em] h-[0.2em] w-full text-primary/45" fill="none">
                  <path d="M2 10 C 70 2, 190 2, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              {accent}
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-pretty text-body sm:text-[18px]">{data.subtitle}</p>
            <ul className="mt-6 space-y-3.5">
              {data.checks.map((c) => (
                <li key={c} className="flex items-center gap-3.5 text-[16px] font-semibold text-ink sm:text-[18px]">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-white shadow-[0_6px_16px_-6px_rgba(37,120,202,.6)]">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Laptop drawn in CSS: dark bezel with camera dot around the 16:9 player, hinge strip and a tapered base. */}
          <div className="mx-auto w-full max-w-[680px] lg:max-w-none">
            <div className="rounded-t-[18px] border border-[#2A3242] bg-[linear-gradient(180deg,#1B2233_0%,#0F1522_100%)] px-[3.2%] pt-[3.6%] pb-[3.2%] shadow-[0_30px_60px_-24px_rgba(11,37,75,.55)] sm:rounded-t-[22px]">
              <span aria-hidden className="mx-auto mb-[1.8%] block size-1.5 rounded-full bg-[#3A4358]" />
              <VideoCardPlayer id={video.id} title={video.title} poster="maxres" className="[&>div]:rounded-[8px] [&>div]:shadow-none" />
            </div>
            <div aria-hidden className="relative mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-[18px] bg-[linear-gradient(180deg,#D9DEE7_0%,#AEB6C4_100%)] shadow-[0_18px_30px_-12px_rgba(11,37,75,.45)] sm:h-4">
              <span className="absolute inset-x-[40%] top-0 h-1.5 rounded-b-full bg-[#8E97A8]/70" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-[1372px] px-4 lg:mt-14">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {data.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.06} className="flex w-full">
                  <PathCard tone={cardTones[i % cardTones.length]} icon={<Icon className="size-7" strokeWidth={1.9} aria-hidden />} title={item.title} text={item.text} />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
