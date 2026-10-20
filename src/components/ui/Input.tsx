import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldClasses =
  "w-full rounded-[10px] border border-line-3 bg-white px-4 py-3 text-[15px] text-ink-2 placeholder:text-muted-2 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none aria-[invalid=true]:border-danger";

type FieldProps = { label: string; id: string; error?: string; required?: boolean; children: ReactNode; className?: string };

/** Label + control + error message, wired with aria-describedby. */
export function Field({ label, id, error, required, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[14px] font-medium text-ink-2">
        {label}
        {required && (
          <span className="text-danger" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input"> & { invalid?: boolean }>(function Input({ className, invalid, id, ...rest }, ref) {
  return <input ref={ref} id={id} aria-invalid={invalid || undefined} aria-describedby={invalid ? `${id}-error` : undefined} className={cn(fieldClasses, className)} {...rest} />;
});
