/**
 * Shared content types. Long-form text uses a tiny inline syntax:
 * `**bold**` and `[label](href)`; see `components/ui/RichText.tsx`.
 */

export type Block =
  | { type: "p" | "h2" | "h3" | "h4" | "q"; text: string }
  | { type: "ul" | "ol"; items: string[] };

export type Faq = { q: string; a: Block[] };

export type FaqTab = { id: string; label: string; items: Faq[] };

export type Cta = { label: string; href: string };

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type Feature = { title: string; text: string; icon?: string };
