import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "outline" | "glass" | "white" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-[0_6px_16px_rgba(37,120,202,.25)]",
  outline: "border border-primary text-primary bg-white hover:bg-primary hover:text-white",
  glass: "border border-white/30 bg-white/[0.14] text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_10px_30px_rgba(6,26,54,.22)] hover:bg-white/[0.22]",
  white: "bg-white text-primary hover:bg-primary-soft",
  ghost: "text-primary hover:text-primary-hover underline-offset-4 hover:underline px-0!",
  dark: "bg-navy text-white hover:bg-navy-2",
};

// min-h (not h) so a label that has to wrap on narrow screens grows instead of clipping. Labels stay on one line from
// sm (768px); below it they may wrap, otherwise long CTAs ("Take Comprehensive ADHD Evaluation") outgrow phone widths.
// Text is 15px on mobile, 16px from md (1024px), matching the live site's CTAs.
const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 py-2 text-[14px] md:text-[15px]",
  md: "min-h-12 px-6 py-2.5 text-[15px] md:text-[16px]",
  lg: "min-h-[50px] px-6 py-3 text-[15px] sm:px-8 md:text-[16px]",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-sans font-normal leading-snug text-center whitespace-nowrap max-sm:whitespace-normal transition-colors duration-200 ease-brand focus-visible:outline-offset-4",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** External links open in the same tab (matching the original); set to open a new one. */
  newTab?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** A link styled as a button. Internal links use next/link; external links a plain <a>. */
export function ButtonLink({ href, children, variant, size, className, newTab, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = { variant?: Variant; size?: Size } & ComponentProps<"button">;

export function Button({ variant, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={cn(buttonClasses({ variant, size }), "disabled:cursor-not-allowed disabled:opacity-60", className)} {...rest} />;
}
