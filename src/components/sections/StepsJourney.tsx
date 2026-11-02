import { Check, ChevronLeft, ChevronRight, ChevronsRight, FileCheck, MessagesSquare, Pill, Target } from "lucide-react";
import type { StepsSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const stageLabels = ["Screening", "Evaluation", "Report & Plan"];

function Bar({ pct }: { pct: number }) {
  return (
    <span className="block h-1.5 overflow-hidden rounded-full bg-primary-soft">
      <span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
    </span>
  );
}

const head = "flex items-center justify-between text-[12px] font-semibold text-muted";

/** Illustrative interface previews, one per step (aria-hidden; the real copy is the step title + text below each). */
function Preview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="space-y-3">
        <div className={head}>
          <span className="text-navy">Free screening</span>
          <span className="text-primary">Step 1 of 3</span>
        </div>
        <Bar pct={34} />
        {["Your name", "Email address"].map((l) => (
          <div key={l} className="space-y-1">
            <span className="type-small block font-semibold text-muted">{l}</span>
            <span className="block h-8 rounded-lg border border-line-3 bg-white" />
          </div>
        ))}
        <div className="space-y-1">
          <span className="type-small block font-semibold text-muted">Age range</span>
          <span className="type-small flex h-8 items-center justify-between rounded-lg border border-line-3 bg-white px-2.5 text-muted">
            Select <ChevronRight className="size-3.5 rotate-90" aria-hidden />
          </span>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="space-y-3">
        <div className={head}>
          <span className="text-navy">Comprehensive evaluation</span>
          <span className="text-primary">Question 4 of 12</span>
        </div>
        <Bar pct={33} />
        <p className="type-small font-semibold text-navy">How often do you lose track of what you were doing?</p>
        <ul className="space-y-1.5">
          {["Rarely", "Sometimes", "Often"].map((o, i) => (
            <li key={o} className={cn("type-small flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 font-semibold", i === 1 ? "border-primary bg-primary text-white shadow-[0_4px_12px_rgba(37,120,202,.3)]" : "border-line-3 bg-white text-body")}>
              <span className={cn("flex size-3.5 shrink-0 items-center justify-center rounded-full border-2", i === 1 ? "border-white" : "border-line-3")}>{i === 1 && <span className="size-1.5 rounded-full bg-white" />}</span>
              {o}
            </li>
          ))}
        </ul>
        <div className="type-small flex items-center justify-between font-semibold">
          <span className="inline-flex items-center gap-0.5 text-muted">
            <ChevronLeft className="size-3.5" aria-hidden /> Back
          </span>
          <span className="inline-flex items-center gap-0.5 text-primary">
            Next <ChevronRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    );
  }
  const items = [
    { t: "Medication", Icon: Pill },
    { t: "Therapy", Icon: MessagesSquare },
    { t: "Coaching", Icon: Target },
    { t: "Accommodations", Icon: FileCheck },
  ];
  return (
    <div className="space-y-3">
      <div className={head}>
        <span className="text-navy">Your report &amp; plan</span>
        <span className="type-small inline-flex items-center gap-1 rounded-full bg-[#E1F5E8] px-2 py-0.5 font-semibold text-[#1E9A55]">
          <Check className="size-3" strokeWidth={3} aria-hidden /> Report ready
        </span>
      </div>
      <div className="flex gap-1.5">
        {["Screening", "Evaluation"].map((s) => (
          <span key={s} className="type-small inline-flex items-center gap-1 rounded-full border border-line-3 bg-white px-2 py-0.5 font-semibold text-body">
            <Check className="size-3 text-[#1E9A55]" strokeWidth={3} aria-hidden /> {s}
          </span>
        ))}
      </div>
      <div className="space-y-1.5 rounded-lg bg-primary-soft/70 p-2.5">
        <span className="block h-1.5 w-3/4 rounded-full bg-primary/25" />
        <span className="block h-1.5 w-full rounded-full bg-primary/15" />
        <span className="block h-1.5 w-2/3 rounded-full bg-primary/15" />
      </div>
      <ul className="grid grid-cols-2 gap-1.5">
        {items.map(({ t, Icon }) => (
          <li key={t} className="type-small flex items-center gap-1.5 rounded-lg border border-line-3 bg-white px-2 py-1.5 font-semibold text-ink">
            <Icon className="size-3.5 shrink-0 text-primary" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function highlight(title: string, accent?: string) {
  if (!accent || !title.includes(accent)) return title;
  const [a, b] = title.split(accent);
  return (
    <>
      {a}
      <span className="text-primary">{accent}</span>
      {b}
    </>
  );
}

/**
 * "From Diagnosis to Thriving" journey on a frosted-glass layout. ≥1024px (and ≥740px tall): a sticky stage on a tall track where
 * the three glass panels rise into focus in turn while the progress line above them fills (pure CSS scroll-driven animation, see
 * `.journey*` in globals.css — no JS). Otherwise, without scroll-timeline support, or with reduced motion, it renders the finished
 * composition / a plain vertical sequence.
 */
export function StepsJourney({ data }: { data: StepsSection }) {
  return (
    <section id={data.id} className="scroll-mt-[var(--header-offset)] bg-[radial-gradient(60%_50%_at_16%_66%,rgba(37,120,202,.16),transparent),radial-gradient(55%_45%_at_86%_72%,rgba(84,152,219,.18),transparent),linear-gradient(180deg,#F6FAFF_0%,#EDF3FC_100%)] py-16 sm:py-20">
      <Container>
        <div className="journey">
          <div className="journey-stage">
            <SectionHeading eyebrow={data.eyebrow} title={highlight(data.title, data.accent)} subtitle={data.subtitle} className="mb-8 lg:mb-6 lg:max-w-[880px]" />

            {/* Progress: same 3-column grid as the panels so each circle sits on its panel's centre line. */}
            <div aria-hidden className="relative mb-5 hidden lg:block">
              <span className="absolute top-[17px] right-[calc((100%-2.5rem)/6)] left-[calc((100%-2.5rem)/6)] h-0.5 rounded-full bg-primary/20" />
              <span className="journey-fill absolute top-[17px] right-[calc((100%-2.5rem)/6)] left-[calc((100%-2.5rem)/6)] h-0.5 origin-left rounded-full bg-primary" />
              {[33.33, 66.66].map((x) => (
                <span key={x} className="absolute top-[7px] flex size-5 -translate-x-1/2 items-center justify-center rounded-full bg-[#F2F7FD] text-primary" style={{ left: `${x}%` }}>
                  <ChevronsRight className="size-4" />
                </span>
              ))}
              <div className="relative grid grid-cols-3 gap-5">
                {stageLabels.map((l, i) => (
                  <span key={l} className="type-small flex flex-col items-center gap-2 font-semibold text-navy">
                    <span className={cn("journey-node flex size-9 items-center justify-center rounded-full border-2 border-primary/25 bg-white text-[14px] font-bold text-primary/70", `journey-node-${i + 1}`)}>{i + 1}</span>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <ol className="grid gap-5 md:mx-auto md:max-w-[560px] lg:max-w-none lg:grid-cols-3">
              {data.items.map((step, i) => (
                <li key={step.title} className="journey-slot reveal">
                  <article className="journey-panel flex h-full flex-col rounded-[28px] border border-white/80 bg-white/65 p-4 shadow-[0_20px_50px_rgba(37,120,202,.12)] backdrop-blur-sm sm:p-5 lg:backdrop-blur-xl">
                    <div aria-hidden className="rounded-2xl border border-white bg-white/90 p-3.5 shadow-[0_6px_18px_rgba(11,37,75,.06)]">
                      <Preview index={i} />
                    </div>
                    <div className="mt-4 flex flex-1 flex-col px-1">
                      <span className="inline-flex w-fit items-center gap-2 text-[12px] font-bold tracking-[0.12em] text-primary uppercase">
                        <span className="inline-grid size-6 place-items-center rounded-full bg-primary text-[12px] tracking-normal text-white" aria-hidden>
                          {i + 1}
                        </span>
                        Step 0{i + 1}
                      </span>
                      <h3 className="type-h4 mt-2 text-navy">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="type-small mt-1.5 text-body">{step.text}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
