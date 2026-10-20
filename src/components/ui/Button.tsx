import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "outline" | "white" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-[0_6px_16px_rgba(37,106,204,.25)]",
  outline: "border border-primary text-primary bg-white hover:bg-primary hover:text-white",
  white: "bg-white text-primary hover:bg-primary-soft",
  ghost: "text-primary hover:text-primary-hover underline-offset-4 hover:underline px-0!",
  dark: "bg-navy text-white hover:bg-navy-2",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-[16px]",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-sans font-medium whitespace-nowrap transition-colors duration-200 ease-brand focus-visible:outline-offset-4",
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
