import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldClasses } from "./Input";

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea"> & { invalid?: boolean }>(function Textarea({ className, invalid, id, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      id={id}
      rows={4}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : undefined}
      className={cn(fieldClasses, "min-h-[120px] resize-y", className)}
      {...rest}
    />
  );
});
