import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type ButtonAnimatedProps = {
  href: string;
  children: ReactNode;
  /** Resting background colour. */
  bg: string;
  /** Background that slides in on hover / keyboard focus. */
  activeBg: string;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children" | "style">;

/**
 * Pill link whose active colour slides in from the left over the default colour on hover / focus-visible.
 * Padding and radius follow the site-wide button spec (10px 16px, 50px).
 */
export default function ButtonAnimated({ href, children, bg, activeBg, className, ...rest }: ButtonAnimatedProps) {
  const classes = cn(
    "group/ba relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-[50px] bg-[var(--ba-bg)] px-4 py-2.5 text-center font-sans leading-snug font-normal whitespace-nowrap",
    "transition-colors duration-300 ease-brand focus-visible:outline-offset-4",
    className,
  );
  const style = { "--ba-bg": bg, "--ba-active": activeBg } as CSSProperties;
  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full rounded-[50px] bg-[var(--ba-active)] transition-transform duration-300 ease-brand group-hover/ba:translate-x-0 group-focus-visible/ba:translate-x-0 motion-reduce:transition-none"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} style={style} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={style} {...rest}>
      {inner}
    </Link>
  );
}
