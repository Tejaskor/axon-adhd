import { ClipboardCheck, Clock, ListChecks, Settings, type LucideIcon } from "lucide-react";
import { whyAxon } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { gear: Settings, clipboard: ClipboardCheck, clock: Clock, checklist: ListChecks };

/** Pale halo + solid gradient disc per accent. */
const tones = {
  blue: { halo: "bg-primary/[0.10]", disc: "from-primary-400 to-primary shadow-[0_12px_28px_rgba(37,120,202,.35)]" },
  green: { halo: "bg-[#22C083]/[0.12]", disc: "from-[#3FD49B] to-[#14A86C] shadow-[0_12px_28px_rgba(20,168,108,.33)]" },
  orange: { halo: "bg-[#F59E0B]/[0.12]", disc: "from-[#FFC15A] to-[#F29A12] shadow-[0_12px_28px_rgba(242,154,18,.33)]" },
  purple: { halo: "bg-[#8B5CF6]/[0.11]", disc: "from-[#B28CFA] to-[#8B5CF6] shadow-[0_12px_28px_rgba(139,92,246,.32)]" },
} as const;

/** "You deserve clarity not guesswork": four icon-led points. */
export function WhyAxon() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F5F9FF,#FFFFFF_70%)] py-16 sm:py-20" aria-labelledby="why-title">
      {/* Soft concentric light-blue arcs behind the content (CSS only). */}
      <div aria-hidden className="pointer-events-none absolute top-[-30%] left-1/2 -z-10 aspect-square w-[1500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,244,255,0)_52%,rgba(226,238,252,.7)_53%,rgba(234,244,255,0)_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-48 -z-10 size-[420px] rounded-full bg-[#EAF4FF]/70" />

      <Container>
        <Reveal className="mx-auto max-w-[860px] text-center">
          <h2 id="why-title" className="type-h2 font-extrabold text-balance text-navy">
            {whyAxon.title.lead}
            <span className="text-brand">{whyAxon.title.highlight}</span>
            {whyAxon.title.tail}
          </h2>
          <p className="type-lead mt-2 text-body">{whyAxon.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {whyAxon.points.map((p, i) => {
            const Icon = icons[p.icon];
            const tone = tones[p.tone];
            return (
              <li key={p.title}>
                <Reveal delay={i * 0.08} className="group flex flex-col items-center text-center">
                  <span className={cn("grid size-[76px] place-items-center rounded-full transition-transform duration-300 ease-brand group-hover:scale-[1.04]", tone.halo)}>
                    <span className={cn("grid size-12 place-items-center rounded-full bg-gradient-to-br text-white", tone.disc)}>
                      <Icon aria-hidden className="size-[22px]" strokeWidth={1.9} />
                    </span>
                  </span>
                  <h3 className="type-h3 mt-4 max-w-[260px] font-bold text-balance text-navy">{p.title}</h3>
                  <p className="type-body mt-3 max-w-[270px] text-pretty text-body">{p.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
