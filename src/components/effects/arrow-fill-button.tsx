import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ArrowFillTone = "blue" | "white";

/**
 * Same look as the two header buttons.
 * `blue`  = header "Start Free ADHD Screening": #256ACC, white text, slides to #1A56A8 on hover.
 * `white` = header "Take Comprehensive ADHD Evaluation": white, navy text, 1px #256ACC border, slides to #DCEAFB on hover.
 * Label colours are !important so a page stylesheet's generic link colour can never make a button label unreadable.
 */
export const arrowFillTone: Record<ArrowFillTone, string> = {
  blue: "bg-[#256ACC] text-white! shadow-[0_6px_18px_rgba(37,120,202,.28)]",
  white: "bg-white text-navy! shadow-[0_1px_2px_rgba(15,27,46,.06)]",
};

const fillTone: Record<ArrowFillTone, string> = {
  blue: "bg-[#1A56A8]",
  white: "bg-[#DCEAFB]",
};

/** Removes arrow / chevron icons from a label so every button shows exactly one arrow: the plain one below. */
function stripArrows(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;
    const t = child.type as { displayName?: string; name?: string } | string;
    const name = typeof t === "string" ? "" : (t.displayName ?? t.name ?? "");
    if (/arrow|chevron/i.test(name)) return null;
    const props = child.props as { children?: ReactNode };
    return props.children ? cloneElement(child, undefined, stripArrows(props.children)) : child;
  });
}

/**
 * Button content: the hover colour slides in from the left (as on the header buttons), then the label with a plain arrow.
 * Parent must be `group/btn relative overflow-hidden`. `centered` is accepted for older call sites and has no effect (labels are
 * always centred); `arrow={false}` drops the arrow; `borderColor` draws a 1px inner border in that colour (white buttons always have one, #256ACC by default).
 */
export default function ArrowFillContent({ children, tone = "blue", arrow = true, borderColor }: { children: ReactNode; tone?: ArrowFillTone; centered?: boolean; arrow?: boolean; borderColor?: string }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full rounded-[50px] transition-transform duration-300 ease-brand group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0 motion-reduce:transition-none",
          fillTone[tone],
        )}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2 text-center">
        {stripArrows(children)}
        {arrow && <ArrowRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />}
      </span>
      {(tone === "white" || borderColor) && (
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 rounded-[50px]" style={{ boxShadow: `inset 0 0 0 1px ${borderColor ?? "#256ACC"}` }} />
      )}
    </>
  );
}
