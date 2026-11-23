import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import ArrowFillContent, { arrowFillTone } from "@/components/effects/arrow-fill-button";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "outline" | "glass" | "white" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

// One design everywhere = the two header buttons (see effects/arrow-fill-button.tsx): primary/dark use the blue one, outline/white/glass
// the white one with the #256ACC border. Same padding (10px 16px), 50px radius, normal weight and fluid text size as the header.
const variants: Record<Variant, string> = {
  primary: arrowFillTone.blue,
  outline: arrowFillTone.white,
  glass: arrowFillTone.white,
  white: arrowFillTone.white,
  ghost: "py-2.5 text-[15px] text-primary hover:text-primary-hover underline-offset-4 hover:underline px-0! md:text-[16px]",
  dark: arrowFillTone.blue,
};

const sizeClass = "min-h-11 px-4 py-2.5 text-[clamp(14px,1.1vw,16px)] font-normal";
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
function ButtonContent({ children, variant = "primary", centered, arrow, borderColor }: { children: ReactNode; variant?: Variant; centered?: boolean; arrow?: boolean; borderColor?: string }) {
  if (variant === "ghost") return <>{children}</>;
  return <ArrowFillContent tone={variant === "primary" || variant === "dark" ? "blue" : "white"} centered={centered} arrow={arrow} borderColor={borderColor}>{children}</ArrowFillContent>;
}

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-sans leading-snug max-w-full whitespace-normal sm:shrink-0 transition-colors duration-500 ease-brand focus-visible:outline-offset-4",
    variants[variant],
    variant === "ghost" ? undefined : sizes[size],
    // Phones: every (non-text-link) button spans its container, so stacked pairs line up at one width. Desktop/tablet untouched.
    // ...and on the narrowest phones (<375px) a touch less padding and type, so the longest labels stay on one line and pairs keep one height.
    variant === "ghost" ? undefined : "max-xs:w-full max-[374px]:px-3 max-[374px]:text-[13px]",
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
  /** Set false to drop the arrow circle (label centred, fill grows from the middle). */
  arrow?: boolean;
  /** Draw a 1px inner border in this colour (e.g. white on a blue banner). */
  borderColor?: string;
  /** External links open in the same tab (matching the original); set to open a new one. */
  newTab?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** A link styled as a button. Internal links use next/link; external links a plain <a>. */
export function ButtonLink({ href, children, variant, size, className, newTab, centered, arrow, borderColor, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        <ButtonContent variant={variant} centered={centered} arrow={arrow} borderColor={borderColor}>{children}</ButtonContent>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <ButtonContent variant={variant} centered={centered} arrow={arrow} borderColor={borderColor}>{children}</ButtonContent>
    </Link>
  );
}

type ButtonProps = { variant?: Variant; size?: Size; centered?: boolean; arrow?: boolean } & ComponentProps<"button">;

export function Button({ variant, size, className, type = "button", children, centered, arrow, ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size, className }), "disabled:cursor-not-allowed disabled:opacity-60")} {...rest}>
      <ButtonContent variant={variant} centered={centered} arrow={arrow}>{children}</ButtonContent>
    </button>
  );
}
