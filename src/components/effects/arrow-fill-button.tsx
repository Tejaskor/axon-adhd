import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ArrowFillTone = "blue" | "white";

/** Button-level classes: colour pair + hover text swap. `blue`: blue → white; `white`: white → blue. */
export const arrowFillTone: Record<ArrowFillTone, string> = {
  // Class names are spelled out in full (no interpolation) so Tailwind can see them. Brand blue = #256ACC.
  blue: "bg-[#256ACC] text-white shadow-[0_8px_22px_rgba(37,106,204,.32)] hover:text-[#256ACC] focus-visible:text-[#256ACC]",
  white: "bg-white text-[#256ACC] shadow-[0_8px_24px_rgba(8,28,72,.18)] hover:text-white focus-visible:text-white",
};

const circleTone: Record<ArrowFillTone, { disc: string; fill: string; icon: string }> = {
  blue: { disc: "bg-white", fill: "bg-white", icon: "text-[#256ACC]" },
  white: { disc: "bg-[#256ACC]", fill: "bg-[#256ACC]", icon: "text-white" },
};

/** Removes arrow / chevron icons from a label so every button shows exactly one arrow: the circle one below. */
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
 * Arrow-fill content. Label on the left, a thin arrow in a circle on the right. On hover / focus the circle scales up until it
 * covers the whole pill (clipped by the button's overflow-hidden), the label swaps colour and the icon stays centred in the
 * growing circle. Parent must be `group/btn relative overflow-hidden` with `transition-colors`.
 */
export default function ArrowFillContent({ children, tone = "blue", centered = false }: { children: ReactNode; tone?: ArrowFillTone; centered?: boolean }) {
  const t = circleTone[tone];
  return (
    <span className={cn("relative flex w-full items-center gap-3 sm:gap-4", centered ? "min-h-7 justify-center" : "justify-between")}>
      <span className={cn("relative z-10 inline-flex items-center gap-2", centered ? "px-9 text-center" : "text-left")}>{stripArrows(children)}</span>
      <span aria-hidden className={cn("grid size-7 shrink-0 place-items-center rounded-full", centered ? "absolute top-1/2 right-0 -translate-y-1/2" : "relative", t.disc)}>
        <span
          className={cn(
            "absolute inset-0 z-0 scale-100 rounded-full transition-transform duration-500 ease-brand group-hover/btn:scale-[40] group-focus-visible/btn:scale-[40] motion-reduce:transition-none",
            t.fill,
          )}
        />
        <ArrowRight strokeWidth={1.75} className={cn("relative z-10 size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5", t.icon)} />
      </span>
    </span>
  );
}
