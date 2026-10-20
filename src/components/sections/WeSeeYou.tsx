import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { weSeeYou } from "@/content/home";
import { ctas } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function WeSeeYou() {
  return (
    <section className="bg-primary-soft py-16 sm:py-20" aria-labelledby="see-you-title">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <Reveal>
            <Image src={weSeeYou.image.src} alt={weSeeYou.image.alt} width={weSeeYou.image.width} height={weSeeYou.image.height} sizes="(max-width: 1024px) 100vw, 592px" className="h-auto w-full rounded-xl2 shadow-soft" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="see-you-title" className="font-display text-[32px] font-extrabold text-navy sm:text-[44px]">
              {weSeeYou.title}
            </h2>
            <p className="mt-2 text-[18px] font-medium text-primary">{weSeeYou.subtitle}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {weSeeYou.affirmations.map((a) => (
                <li key={a} className="flex items-center gap-3 rounded-card bg-white px-4 py-4 shadow-card">
                  <HeartHandshake aria-hidden className="size-5 shrink-0 text-teal" />
                  <span className="text-[16px] font-medium text-ink-2">{a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink href={ctas.evaluation.href} className="whitespace-normal text-center">
                {ctas.evaluation.label}
              </ButtonLink>
              <ButtonLink href={ctas.screening.href} variant="outline">
                {ctas.screening.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
