"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { NavItem } from "@/content/nav";
import { cn } from "@/lib/utils";
import { NavIcon } from "./NavIcon";

type MegaItem = Extract<NavItem, { kind: "mega" }>;

/**
 * White mega panel positioned against the header bar (Header.tsx) and centred on it, capped at 1320px with
 * 16px side margins so it never stretches across the full-bleed top-of-page bar; in the floating pill (≤1340px)
 * it sits just inside the pill's edges. Link list on the left (two sub-columns), featured card on the right.
 */
export function MegaMenu({ item, id, onNavigate }: { item: MegaItem; id: string; onNavigate: () => void }) {
  // Hovering or focusing a link that carries its own preview swaps the right-hand card; leaving the list returns to the default.
  const [active, setActive] = useState<number | null>(null);
  // Every menu uses one stacked column of links (each item directly under the previous) and the wider preview card, like Services.
  const stacked = true;
  const featured = (active !== null ? item.links[active]?.featured : undefined) ?? item.featured;
  return (
    <div id={id} className="absolute inset-x-0 top-full z-50 mx-auto w-[min(1320px,calc(100%-32px))] rounded-[20px] border border-white/70 bg-white p-[22px] shadow-panel">
      <div className={cn("grid min-h-[258px] gap-[26px]", stacked ? "grid-cols-[1fr_380px]" : "grid-cols-[1fr_320px]")}>
        <div>
          <p className="mb-1 px-1.5 text-[12px] font-bold tracking-[0.09em] text-muted uppercase">{item.eyebrow}</p>
          <ul className={cn("grid content-start gap-x-[18px] gap-y-1.5", stacked ? "grid-cols-1" : "grid-flow-col grid-cols-2 grid-rows-2")} onMouseLeave={() => setActive(null)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setActive(null)}>
            {item.links.map((link, i) => (
              <li key={link.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <Link
                  href={link.href}
                  onNavigate={onNavigate}
                  className="group flex items-start gap-[13px] rounded-[14px] px-3 py-2.5 transition-colors hover:bg-[rgba(37,120,202,.08)] focus-visible:bg-[rgba(37,120,202,.08)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-[rgba(37,120,202,.12)] text-brand shadow-[inset_0_0_0_1px_rgba(37,120,202,.1)] transition-[transform,background-color] duration-200 ease-brand group-hover:scale-[1.06] group-hover:bg-[rgba(37,120,202,.2)]">
                    <NavIcon name={link.icon} className="size-5" />
                  </span>
                  <span className="pt-px">
                    <span className="block text-[16px] leading-[1.25] font-bold text-ink-menu group-hover:text-brand">{link.label}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[14px] leading-[1.4] text-muted">{link.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-full flex-col overflow-hidden rounded-panel border border-white/75 bg-white/60 shadow-[0_12px_28px_rgba(15,27,46,.1)]">
          <div className="relative h-[180px] w-full shrink-0 overflow-hidden bg-white">
            {/* A soft, blurred copy fills any space the whole picture leaves, so nothing is cropped. */}
            <Image key={`bg-${featured.image.src}`} src={featured.image.src} alt="" aria-hidden width={featured.image.width} height={featured.image.height} sizes="380px" className="absolute inset-0 size-full scale-125 object-cover opacity-40 blur-xl" />
            <Image key={featured.image.src} src={featured.image.src} alt={featured.image.alt} width={featured.image.width} height={featured.image.height} sizes="380px" className="relative size-full object-contain" />
          </div>
          <div className="flex flex-1 flex-col px-[15px] pt-[13px] pb-[15px]">
            <p className="mb-[5px] text-[16px] leading-[1.25] font-bold text-ink-menu">{featured.title}</p>
            <p className="mb-3 line-clamp-3 text-[14px] leading-[1.5] text-muted">{featured.text}</p>
            <Link href={featured.cta.href} onNavigate={onNavigate} className="group/feat mt-auto inline-flex items-center gap-1.5 text-[16px] font-bold text-brand hover:text-primary-hover">
              {featured.cta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 ease-brand group-hover/feat:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
