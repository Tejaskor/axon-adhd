import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, HandHeart } from "lucide-react";
import { symptoms } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Card accents, keyed by `tone` in content: tinted card, matching border, gradient icon disc. */
const tones: Record<string, { card: string; disc: string }> = {
  green: { card: "from-[#22C083]/[0.16] border-[#22C083]/25 hover:border-[#22C083]/55", disc: "from-[#4FE0AE] to-[#16A56E] shadow-[0_8px_20px_rgba(34,192,131,.35)]" },
  blue: { card: "from-primary/[0.14] border-primary/25 hover:border-primary/55", disc: "from-primary-400 to-primary-600 shadow-[0_8px_20px_rgba(37,120,202,.35)]" },
  orange: { card: "from-[#F59E0B]/[0.16] border-[#F59E0B]/25 hover:border-[#F59E0B]/55", disc: "from-[#FFC15A] to-[#E08200] shadow-[0_8px_20px_rgba(235,139,1,.35)]" },
  purple: { card: "from-[#8B5CF6]/[0.14] border-[#8B5CF6]/25 hover:border-[#8B5CF6]/55", disc: "from-[#A78BFA] to-[#7C3AED] shadow-[0_8px_20px_rgba(124,58,237,.32)]" },
  coral: { card: "from-[#F0616D]/[0.14] border-[#F0616D]/25 hover:border-[#F0616D]/55", disc: "from-[#FF8A8A] to-[#E5484D] shadow-[0_8px_20px_rgba(229,72,77,.32)]" },
  yellow: { card: "from-[#EAB308]/[0.18] border-[#EAB308]/30 hover:border-[#EAB308]/60", disc: "from-[#FDD835] to-[#E0A800] shadow-[0_8px_20px_rgba(224,168,0,.35)]" },
};

/** "Does this sound like you?": six wide sign cards (icon + heading left, photo fading in from the right) and a reassurance CTA. */
export function SymptomChecklist() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14" aria-labelledby="symptoms-title">
      {/* Soft light-blue curves along the bottom corners (CSS only). */}
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[460px] rounded-[45%_55%_60%_40%] bg-[radial-gradient(circle_at_60%_40%,#EAF4FF,#F4F9FF_60%,transparent_72%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-48 -z-10 size-[520px] rounded-[55%_45%_40%_60%] bg-[radial-gradient(circle_at_40%_40%,#EAF4FF,#F4F9FF_60%,transparent_72%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 -z-10 size-[300px] rounded-full border border-primary-150/70" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-[380px] rounded-full border border-primary-150/70" />

      {/* One content box for heading, grid and CTA: the header's 1340px container, with gutters only below that width. */}
      <div className="px-4 sm:px-6">
      <div className="mx-auto w-full max-w-content">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 id="symptoms-title" className="type-h2 text-balance text-navy">
            {symptoms.title.lead}
            <span className="text-brand">{symptoms.title.highlight}</span>
          </h2>
          <p className="type-lead mx-auto mt-3 max-w-[760px] text-pretty text-body">{symptoms.subtitle}</p>
        </Reveal>

        <ul className="mt-8 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {symptoms.items.map((item, i) => {
            const tone = tones[item.tone];
            return (
              <li key={item.title} className="flex">
                <Reveal delay={(i % 3) * 0.06 + Math.floor(i / 3) * 0.04} className="flex w-full">
                  <article
                    className={cn(
                      "group relative flex min-h-[132px] w-full overflow-hidden rounded-[18px] border bg-gradient-to-br via-white/80 via-55% to-white shadow-[0_6px_22px_rgba(15,27,46,.06)] transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,27,46,.11)] lg:min-h-[150px]",
                      tone.card,
                    )}
                  >
                    {/* Photo on the right, its left edge feathered into the card tint so it never sits under the copy. */}
                    <div className="absolute inset-y-0 right-0 w-[38%] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,.55)_22%,#000_48%)]">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        sizes="(max-width: 767px) 40vw, (max-width: 1023px) 20vw, 260px"
                        className="size-full object-cover object-[70%_20%] transition-transform duration-700 ease-brand group-hover:scale-[1.05]"
                      />
                    </div>

                    {/* Icon sits beside the copy from 1440px (as in the reference); on narrower cards it stacks above to keep lines long. */}
                    <div className="relative flex w-[66%] flex-col items-start justify-center gap-3 p-5 lg:p-6 xl:flex-row xl:items-center xl:justify-start xl:gap-4">
                      <span
                        aria-hidden
                        className={cn("myth-float grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white sm:size-12", tone.disc)}
                        style={{ animationDelay: `${-i * 1.1}s` } as CSSProperties}
                      >
                        <FeatureIcon name={item.icon} className="size-[22px] stroke-[1.6] sm:size-6" />
                      </span>
                      <h3 className="type-h4 min-w-0 font-bold text-navy">{item.title}</h3>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-10 text-center sm:mt-12">
          <HandHeart aria-hidden className="myth-float mx-auto size-9 text-brand" strokeWidth={1.6} />
          <p className="type-lead mt-3 font-medium text-balance text-navy lg:text-[22px]">
            {symptoms.reassurance[0]}
            <br />
            <span className="text-brand">{symptoms.reassurance[1]}</span>
          </p>
          <ButtonLink href={symptoms.cta.href} size="lg" className="mt-6 shadow-cta">
            {symptoms.cta.label}
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
