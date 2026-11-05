import { ClipboardCheck, Clock, ListChecks, Settings, type LucideIcon } from "lucide-react";
import { whyAxon } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { h2, lead } from "./AccommodationSections";
import { PathCard } from "./AdhdCareSections";

const icons: Record<string, LucideIcon> = { gear: Settings, clipboard: ClipboardCheck, clock: Clock, checklist: ListChecks };

/** "You deserve clarity not guesswork": same design as the ADHD Care page's "Your Path to Long-Term Success". */
export function WhyAxon() {
  return (
    <section className="bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] py-16 sm:py-20 lg:py-24" aria-labelledby="why-title">
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2 id="why-title" className={cn(h2, "text-[#0F2F55]")}>
            {whyAxon.title.lead}
            <span className="bg-[linear-gradient(90deg,#2578CA_0%,#3C8BD9_100%)] bg-clip-text text-transparent">{whyAxon.title.highlight}</span>
            {whyAxon.title.tail}
          </h2>
          <p className={cn(lead, "mx-auto mt-4 text-[#5B6B80]")}>{whyAxon.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {whyAxon.points.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <li key={p.title} className="flex">
                <Reveal delay={i * 0.06} className="flex w-full">
                  <PathCard tone={p.tone} icon={<Icon className="size-7" strokeWidth={1.9} />} title={p.title} text={p.text} />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
