import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary text-white",
  teal: "bg-teal-soft text-teal",
  orange: "bg-orange-soft text-orange",
  soft: "bg-primary-soft text-primary",
} as const;

export function Badge({ children, tone = "soft", className }: { children: ReactNode; tone?: keyof typeof tones; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-[12px] font-semibold tracking-wide", tones[tone], className)}>{children}</span>;
}
