export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 });

/** `$577`, `$519.30` — always 2 decimals when there are cents, matching the live site. */
export function formatPrice(value: number) {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? usd.format(rounded) : rounded.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

export function applyDiscount(price: number, rate: number) {
  const savings = Math.round(price * rate * 100) / 100;
  return { final: Math.round((price - savings) * 100) / 100, savings };
}

/** Formats an ISO date the way WordPress showed it ("October 16, 2026"). Deterministic (UTC). */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).toLowerCase();
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\*\*|\[|\]\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}
