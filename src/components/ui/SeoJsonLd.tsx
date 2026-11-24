import { webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/** Keyword-carrying WebPage schema for a page listed in content/seo.ts (renders nothing otherwise). */
export function SeoJsonLd({ path }: { path: string }) {
  const data = webPageJsonLd(path);
  return data ? <JsonLd data={data} /> : null;
}
