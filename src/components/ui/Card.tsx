import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("rounded-card border border-line-2 bg-white p-6 shadow-card sm:p-8", className)} {...rest} />;
}
