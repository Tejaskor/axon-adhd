import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

/** Numbered horizontal step strip (stacks on mobile). */
export function ProcessSteps({ steps }: { steps: Array<{ title: string; text: string }> }) {
  return (
    <ol className="mt-14 flex flex-col items-stretch gap-4 rounded-xl2 border border-line-2 bg-white p-6 shadow-card md:flex-row md:items-center md:p-8">
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          {i > 0 && <ArrowRight aria-hidden className="mx-auto size-5 shrink-0 rotate-90 text-primary/60 md:rotate-0" />}
          <li className="flex flex-1 items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display text-[16px] font-bold text-white" aria-hidden>
              {i + 1}
            </span>
            <div>
              <h4 className="text-[16px] font-bold text-navy">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h4>
              <p className="mt-1 text-[14px] leading-snug text-body">{step.text}</p>
            </div>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
