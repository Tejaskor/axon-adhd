import { ClipboardCheck, ShieldCheck, UsersRound, Wallet } from "lucide-react";
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
 * Centred stack: heading and intro on top, then the plain video (no frame, border or shadow) centred
 * below, then four icon feature cards (the shared PathCard).
 */
export function AssessmentOverview({ data }: { data: AssessmentOverviewSection }) {
  const { video } = data;
  const [lead, accent] = data.title.split(data.accent);

  return (
    // Same background as "What You'll Learn from the Free Assessment" and "How we support you".
    <section className="relative overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! section-py" aria-label={data.title}>
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <div className="mx-auto max-w-[940px] text-center">
          {data.eyebrow && (
            <p className="mb-3 flex items-center justify-center gap-3 text-[12px] font-semibold tracking-[0.16em] text-primary uppercase">
              <span aria-hidden className="h-0.5 w-8 rounded-full bg-primary" />
              {data.eyebrow}
            </p>
          )}
          <h2 className="type-h2 text-navy text-balance">
            {lead}
            <span className="relative inline-block whitespace-nowrap text-primary">
              {data.accent}
              <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.22em] h-[0.2em] w-full text-primary/45" fill="none">
                <path d="M2 10 C 70 2, 190 2, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            {accent}
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.7] sm:text-[20px] text-pretty text-body">{data.subtitle}</p>
        </div>

      </div>

      {/* Plain video, centred under the text: no laptop frame, border or shadow. At most 1440px wide and never wider than the content box (no sideways overflow); 16:9 at every size. */}
      <div className="mx-auto mt-10 w-full max-w-[1372px] px-4">
        <div className="mx-auto w-full max-w-[1440px]">
          <VideoCardPlayer id={video.id} title={video.title} poster="maxres" className="[&>div]:shadow-none" />
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
