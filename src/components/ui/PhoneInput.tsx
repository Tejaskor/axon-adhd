"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

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

/**
 * One bordered field: a flag + chevron country picker (a transparent native <select> over it keeps the full,
 * accessible option list), the dial code as a prefix, then the national number input. Defaults to 🇺🇸 +1.
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { className, invalid, id, countryCode, onCountryCodeChange, ...rest },
  ref,
) {
  // Tracked by name because several countries share a dial code (US and Canada are both +1).
  const [name, setName] = useState<string>(() => countries.find((c) => c.code === countryCode)?.name ?? countries[0].name);
  const selected = countries.find((c) => c.name === name && c.code === countryCode) ?? countries.find((c) => c.code === countryCode) ?? countries[0];

  return (
    <div
      className={cn(
        "flex rounded-lg border bg-white transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        invalid ? "border-danger" : "border-[#D1D5DB]",
        className,
      )}
    >
      <div className="relative flex shrink-0 items-center gap-1.5 border-r border-[#D1D5DB] px-3">
        <span aria-hidden className="text-[20px] leading-none">
          {selected.flag}
        </span>
        <ChevronDown aria-hidden className="size-3.5 text-muted-2" strokeWidth={2} />
        <label htmlFor={`${id}-country`} className="sr-only">
          Country code
        </label>
        <select
          id={`${id}-country`}
          value={`${selected.name}|${selected.code}`}
          onChange={(e) => {
            const [nextName, nextCode] = e.target.value.split("|");
            setName(nextName);
            onCountryCodeChange(nextCode);
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {countries.map((c) => (
            <option key={c.name} value={`${c.name}|${c.code}`}>
              {c.flag} {c.name} ({c.code})
            </option>
          ))}
        </select>
      </div>
      <span aria-hidden className="self-center pl-3 text-[15px] text-ink-2">
        {selected.code}
      </span>
      <input
        ref={ref}
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className="min-w-0 flex-1 rounded-r-lg bg-transparent px-2 py-2.5 text-[15px] text-ink-2 placeholder:text-muted-2 focus:outline-none"
        {...rest}
      />
    </div>
  );
});
