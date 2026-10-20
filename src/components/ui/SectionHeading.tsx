import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", as: Tag = "h2", tone = "dark", className, id }: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={cn("mb-10 sm:mb-12", align === "center" ? "mx-auto max-w-[820px] text-center" : "max-w-[720px]", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-[13px] font-semibold tracking-[0.14em] uppercase", light ? "text-white/80" : "text-primary")}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display text-[26px] leading-[1.2] font-bold tracking-[-0.5px] sm:text-[32px] md:text-[36px] lg:text-[40px]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Tag>
      {subtitle && <p className={cn("mt-4 text-[16px] leading-relaxed sm:text-[18px]", light ? "text-white/85" : "text-body")}>{subtitle}</p>}
    </div>
  );
}
