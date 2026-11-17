import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import ArrowFillContent, { arrowFillTone } from "@/components/effects/arrow-fill-button";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "outline" | "glass" | "white" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

// One design everywhere (see effects/arrow-fill-button.tsx): blue→white for primary/outline/dark, white→blue for white/glass.
const variants: Record<Variant, string> = {
  primary: arrowFillTone.blue,
  outline: arrowFillTone.blue,
  glass: arrowFillTone.white,
  white: arrowFillTone.white,
  ghost: "py-2.5 text-[15px] text-primary hover:text-primary-hover underline-offset-4 hover:underline px-0! md:text-[16px]",
  dark: arrowFillTone.blue,
};

// Padding 10px 16px, 16px text; the 28px arrow circle sets the height (48px), so every button is the same height.
const sizeClass = "min-h-11 px-4 py-2.5 text-[16px] font-semibold";
const sizes: Record<Size, string> = { sm: sizeClass, md: sizeClass, lg: sizeClass };

/**
 * The look is fixed: callers may only pass layout classes (width, margin, alignment, display). Colour, border, shadow, radius,
 * height, padding, font and hover overrides are dropped so no button can keep an old design.
 */
const LAYOUT = /^(group|w-|max-w-|min-w-|m[trblxy]?-|-m[trblxy]?-|self-|justify-self-|place-self-|shrink|grow|basis-|flex$|flex-|order-|col-|row-|hidden$|block$|inline|grid$)/;
function layoutOnly(className?: string) {
  if (!className) return "";
  return className
    .split(/\s+/)
    .filter((tok) => {
      const base = tok.slice(tok.lastIndexOf(":") + 1).replace(/^!/, "").replace(/!$/, "");
      return LAYOUT.test(base) && !/^(inline-flex|flex-col)$/.test(base) && !base.startsWith("[");
    })
    .join(" ");
}

/** Ghost (text-link) buttons keep their underline hover; every other variant gets the arrow-fill content. */
function ButtonContent({ children, variant = "primary", centered }: { children: ReactNode; variant?: Variant; centered?: boolean }) {
  if (variant === "ghost") return <>{children}</>;
  return <ArrowFillContent tone={variant === "white" || variant === "glass" ? "white" : "blue"} centered={centered}>{children}</ArrowFillContent>;
}

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-sans leading-snug whitespace-nowrap max-sm:whitespace-normal transition-colors duration-500 ease-brand focus-visible:outline-offset-4",
    variants[variant],
    variant === "ghost" ? undefined : sizes[size],
    variant === "ghost" ? className : layoutOnly(className),
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Centre the label in the button, with the arrow circle pinned to the right edge. */
  centered?: boolean;
  /** External links open in the same tab (matching the original); set to open a new one. */
  newTab?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** A link styled as a button. Internal links use next/link; external links a plain <a>. */
export function ButtonLink({ href, children, variant, size, className, newTab, centered, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        <ButtonContent variant={variant} centered={centered}>{children}</ButtonContent>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <ButtonContent variant={variant} centered={centered}>{children}</ButtonContent>
    </Link>
  );
}

type ButtonProps = { variant?: Variant; size?: Size; centered?: boolean } & ComponentProps<"button">;

export function Button({ variant, size, className, type = "button", children, centered, ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size, className }), "disabled:cursor-not-allowed disabled:opacity-60")} {...rest}>
      <ButtonContent variant={variant} centered={centered}>{children}</ButtonContent>
    </button>
  );
}
