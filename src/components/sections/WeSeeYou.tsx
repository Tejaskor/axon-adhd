import Image from "next/image";
import { ArrowRight, Heart, Lightbulb, UserRound, Users, type LucideIcon } from "lucide-react";
import { weSeeYou } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { person: UserRound, heart: Heart, people: Users, bulb: Lightbulb };

const tones = {
  green: { card: "from-[#22C083]/[0.10] border-[#22C083]/20", disc: "from-[#4FE0AE] to-[#16A56E] shadow-[0_8px_20px_rgba(34,192,131,.35)]" },
  blue: { card: "from-primary/[0.08] border-primary/20", disc: "from-primary-400 to-primary-600 shadow-[0_8px_20px_rgba(37,120,202,.35)]" },
  orange: { card: "from-[#F59E0B]/[0.10] border-[#F59E0B]/20", disc: "from-[#FFC15A] to-[#E08200] shadow-[0_8px_20px_rgba(235,139,1,.35)]" },
  purple: { card: "from-[#8B5CF6]/[0.09] border-[#8B5CF6]/20", disc: "from-[#A78BFA] to-[#7C3AED] shadow-[0_8px_20px_rgba(124,58,237,.32)]" },
} as const;

/** "We see you.": photo on the left; headline, four affirmation headings and one CTA on the right. */
export function WeSeeYou() {
  return (
    // Same background as "Choose Your Next Step" (PricingCards).
    <section className="relative isolate overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-16 sm:py-20" aria-labelledby="see-you-title">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-10 lg:gap-16">
          {/* Left: photo */}
          <Reveal className="mx-auto w-full max-w-[640px]">
            <Image
              src={weSeeYou.image.src}
              alt={weSeeYou.image.alt}
              width={weSeeYou.image.width}
              height={weSeeYou.image.height}
              sizes="(max-width: 767px) 100vw, 640px"
              className="aspect-[4/3] h-auto w-full rounded-[28px] object-cover"
            />
          </Reveal>

          {/* Right: copy, affirmation cards, CTAs */}
          <div>
            <Reveal>
              <h2 id="see-you-title" className="type-h1 font-extrabold text-navy">
                {weSeeYou.title}
                <span className="block text-brand">{weSeeYou.subtitle}</span>
              </h2>
            </Reveal>

            <ul className="mt-7 grid auto-rows-fr gap-4 sm:grid-cols-2">
              {weSeeYou.affirmations.map((a, i) => {
                const Icon = icons[a.icon];
                const tone = tones[a.tone];
                return (
                  <li key={a.title} className="flex">
                    <Reveal delay={0.05 * (i + 1)} className="flex w-full">
                      <div
                        className={cn(
                          "group flex w-full items-center gap-4 rounded-[20px] border bg-gradient-to-br via-white to-white p-5 shadow-[0_8px_26px_rgba(15,27,46,.05)] transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,27,46,.1)]",
                          tone.card,
                        )}
                      >
                        <span aria-hidden className={cn("grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white ring-4 ring-white transition-transform duration-300 ease-brand group-hover:scale-105", tone.disc)}>
                          <Icon className="size-[22px]" strokeWidth={2} />
                        </span>
                        <h3 className="type-h4 min-w-0 font-bold text-navy">{a.title}</h3>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            {/* Same treatment as the Comprehensive plan's button in PricingCards. */}
            <Reveal delay={0.1} className="mt-8">
              <ButtonLink
                href={weSeeYou.cta.href}
                size="lg"
                className="group h-14 w-full gap-2 bg-[linear-gradient(180deg,#5498DB_0%,#2578CA_55%,#1E64AA_100%)] px-5 whitespace-normal sm:px-8 shadow-[0_14px_30px_rgba(37,120,202,.38),inset_0_1px_0_rgba(255,255,255,.35)]! transition-[filter,box-shadow,background-color] duration-300 hover:shadow-[0_18px_38px_rgba(37,120,202,.48),inset_0_1px_0_rgba(255,255,255,.35)]! hover:brightness-110 xs:w-auto"
              >
                {weSeeYou.cta.label}
                <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
