import Image from "next/image";
import { mythBuster } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Live layout: two light columns divided by a vertical rule — the emotional question vs. what ADHD actually is. */
export function ADHDMythBuster() {
  return (
    <section className="overflow-hidden py-16 sm:py-20" aria-labelledby="myth-title">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line-3">
          <Reveal className="md:pr-10 lg:pr-14">
            <h2 className="text-center font-display text-[26px] leading-tight font-bold text-navy sm:text-[32px]">{mythBuster.question}</h2>
            <Image src={mythBuster.feelings.src} alt={mythBuster.feelings.alt} width={mythBuster.feelings.width} height={mythBuster.feelings.height} className="mx-auto mt-4 h-auto w-full max-w-[320px]" />
            <Image src={mythBuster.image.src} alt={mythBuster.image.alt} width={mythBuster.image.width} height={mythBuster.image.height} sizes="(max-width: 1024px) 100vw, 620px" className="mt-6 h-auto w-full rounded-xl2" />
          </Reveal>
          <Reveal delay={0.1} className="md:pl-10 lg:pl-14">
            <h2 id="myth-title" className="text-center font-display text-[26px] leading-tight font-bold text-navy sm:text-[32px]">
              {mythBuster.title}
            </h2>
            <p className="mt-2 text-center text-[16px] text-muted">{mythBuster.subtitle}</p>
            <Image src={mythBuster.diagram.src} alt={mythBuster.diagram.alt} width={mythBuster.diagram.width} height={mythBuster.diagram.height} sizes="(max-width: 1024px) 100vw, 520px" className="mx-auto mt-6 h-auto w-full max-w-[420px]" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {mythBuster.myths.map((myth) => (
                <li key={myth} className="flex items-center gap-2 rounded-card bg-surface px-3 py-3">
                  <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-primary" />
                  <h3 className="text-[14.5px] font-semibold text-ink-2">{myth}</h3>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex gap-3 rounded-card bg-surface px-5 py-4 text-[15px] leading-relaxed text-ink-2">
              <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-orange" />
              <span>{mythBuster.definition}</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
