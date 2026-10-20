import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = { as?: T; narrow?: boolean } & ComponentProps<T>;

/** Centers content at the original site's 1340px content width. */
export function Container<T extends ElementType = "div">({ as, narrow, className, ...rest }: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cn("container-content", narrow && "max-w-[1100px]", className)} {...rest} />;
}
