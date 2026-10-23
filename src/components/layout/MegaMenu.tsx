import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/content/nav";
import { NavIcon } from "./NavIcon";

type MegaItem = Extract<NavItem, { kind: "mega" }>;

/**
 * White mega panel positioned against the header bar (Header.tsx) and centred on it, capped at 1320px with
 * 16px side margins so it never stretches across the full-bleed top-of-page bar; in the floating pill (≤1340px)
 * it sits just inside the pill's edges. Link list on the left (two sub-columns), featured card on the right.
 */
export function MegaMenu({ item, id, onNavigate }: { item: MegaItem; id: string; onNavigate: () => void }) {
  return (
    <div id={id} className="absolute inset-x-0 top-full z-50 mx-auto w-[min(1320px,calc(100%-32px))] rounded-[20px] border border-white/70 bg-white p-[22px] shadow-panel">
      <div className="grid min-h-[258px] grid-cols-[1fr_320px] gap-[26px]">
        <div>
          <p className="mb-1 px-1.5 text-[12px] font-bold tracking-[0.09em] text-muted uppercase">{item.eyebrow}</p>
          <ul className="grid grid-flow-col grid-cols-2 grid-rows-2 content-start gap-x-[18px] gap-y-1.5">
            {item.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onNavigate={onNavigate}
                  className="group flex items-start gap-[13px] rounded-[14px] px-3 py-2.5 transition-colors hover:bg-[rgba(59,130,246,.08)] focus-visible:bg-[rgba(59,130,246,.08)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-[rgba(59,130,246,.12)] text-brand shadow-[inset_0_0_0_1px_rgba(59,130,246,.1)] transition-[transform,background-color] duration-200 ease-brand group-hover:scale-[1.06] group-hover:bg-[rgba(59,130,246,.2)]">
                    <NavIcon name={link.icon} className="size-5" />
                  </span>
                  <span className="pt-px">
                    <span className="block text-[14.5px] leading-[1.25] font-bold text-ink-menu group-hover:text-brand">{link.label}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-[1.4] text-muted">{link.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-full flex-col overflow-hidden rounded-panel border border-white/75 bg-white/60 shadow-[0_12px_28px_rgba(15,27,46,.1)]">
          <Image src={item.featured.image.src} alt={item.featured.image.alt} width={item.featured.image.width} height={item.featured.image.height} sizes="320px" className="h-28 w-full shrink-0 object-cover" />
          <div className="flex flex-1 flex-col px-[15px] pt-[13px] pb-[15px]">
            <p className="mb-[5px] text-[15px] leading-[1.25] font-bold text-ink-menu">{item.featured.title}</p>
            <p className="mb-3 line-clamp-3 text-[12.5px] leading-[1.5] text-muted">{item.featured.text}</p>
            <Link href={item.featured.cta.href} onNavigate={onNavigate} className="group/feat mt-auto inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand hover:text-primary-hover">
              {item.featured.cta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 ease-brand group-hover/feat:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
