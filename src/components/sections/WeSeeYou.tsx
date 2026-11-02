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

/** "We see you.": photo on the left; headline, four affirmation headings and CTAs on the right. */
export function WeSeeYou() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F7FAFF,#FFFFFF)] py-16 sm:py-20" aria-labelledby="see-you-title">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 -z-10 size-[320px] rounded-full bg-[#EAF4FF]/70" />
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-10 lg:gap-16">
          {/* Left: photo */}
          <Reveal className="relative mx-auto w-full max-w-[640px] sm:px-6">
            {/* Soft blob behind the photo, dotted grid and a green squiggle, as in the reference (CSS/SVG only). */}
            <div aria-hidden className="pointer-events-none absolute -inset-x-2 -inset-y-8 -z-10 rounded-[42%_58%_46%_54%/55%_42%_58%_45%] bg-[#E3EFFC]" />
            <div aria-hidden className="pointer-events-none absolute bottom-[18%] -left-4 -z-10 hidden h-28 w-16 bg-[radial-gradient(#B6D3F0_1.5px,transparent_1.6px)] [background-size:12px_12px] sm:block" />
            <svg aria-hidden viewBox="0 0 200 120" fill="none" className="pointer-events-none absolute -bottom-10 -left-6 -z-10 hidden w-44 sm:block">
              <path d="M2 30c30-10 46 10 58 40s36 46 70 38c20-5 30-14 46-10" stroke="#7FD3AE" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <div className="relative">
              <Image
                src={weSeeYou.image.src}
                alt={weSeeYou.image.alt}
                width={weSeeYou.image.width}
                height={weSeeYou.image.height}
                sizes="(max-width: 767px) 100vw, 600px"
                className="aspect-[4/3] h-auto w-full rounded-[28px] object-cover shadow-[0_24px_60px_rgba(15,27,46,.14)]"
              />
            </div>
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

            <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:grid lg:grid-cols-2">
              {weSeeYou.ctas.map((cta, i) => (
                <ButtonLink key={cta.href} href={cta.href} size="lg" variant={i === 0 ? "primary" : "outline"} className={cn("whitespace-normal lg:px-5", i === 0 && "shadow-cta")}>
                  {cta.label}
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
