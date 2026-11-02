"use client";

import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldClasses } from "./Input";

export const countries = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
] as const;

type PhoneInputProps = ComponentProps<"input"> & {
  invalid?: boolean;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
};

/** Country-code selector (defaults to 🇺🇸 +1) + national number input. */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { className, invalid, id, countryCode, onCountryCodeChange, ...rest },
  ref,
) {
  const value = `${countries.find((c) => c.code === countryCode)?.name ?? "United States"}|${countryCode}`;
  return (
    <div className={cn("flex rounded-[10px] focus-within:ring-2 focus-within:ring-primary/20", className)}>
      <label htmlFor={`${id}-country`} className="sr-only">
        Country code
      </label>
      <select
        id={`${id}-country`}
        value={value}
        onChange={(e) => onCountryCodeChange(e.target.value.split("|")[1])}
        className="w-[96px] shrink-0 rounded-l-[10px] border border-r-0 border-line-3 bg-surface-2 px-2 text-[15px] text-ink-2 focus:outline-none"
      >
        {countries.map((c) => (
          <option key={c.name} value={`${c.name}|${c.code}`}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>
      <input
        ref={ref}
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={cn(fieldClasses, "min-w-0 rounded-l-none focus:ring-0")}
        {...rest}
      />
    </div>
  );
});
