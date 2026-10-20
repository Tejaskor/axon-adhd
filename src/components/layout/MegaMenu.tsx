import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/content/nav";
import { NavIcon } from "./NavIcon";

type MegaItem = Extract<NavItem, { kind: "mega" }>;

/** Glass dropdown panel: link list on the left, featured card on the right. */
export function MegaMenu({ item, id, onNavigate }: { item: MegaItem; id: string; onNavigate: () => void }) {
  return (
    <div
      id={id}
      className="absolute top-full left-1/2 z-50 mt-3 w-[min(980px,calc(100vw-32px))] -translate-x-1/2 rounded-xl2 border border-white/70 bg-white/90 p-[22px] shadow-panel backdrop-blur-xl"
    >
      <div className="grid grid-cols-[1fr_320px] gap-6">
        <div>
          <p className="mb-3 px-3 text-[12.5px] font-semibold tracking-[0.12em] text-muted uppercase">{item.eyebrow}</p>
          <ul className="grid gap-1">
            {item.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onNavigate={onNavigate}
                  className="group flex items-start gap-4 rounded-[12px] p-3 transition-colors hover:bg-primary-soft focus-visible:bg-primary-soft"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-[#DBE8FF] to-[#EAF2FF] text-brand">
                    <NavIcon name={link.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-ink-menu group-hover:text-brand">{link.label}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">{link.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-panel border border-line-2 bg-white">
          <Image src={item.featured.image.src} alt={item.featured.image.alt} width={item.featured.image.width} height={item.featured.image.height} sizes="320px" className="h-[150px] w-full object-cover" />
          <div className="p-4">
            <h4 className="text-[16px] font-bold text-ink-menu">{item.featured.title}</h4>
            <p className="mt-1.5 text-[13.5px] leading-snug text-muted">{item.featured.text}</p>
            <Link href={item.featured.cta.href} onNavigate={onNavigate} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand hover:text-primary-hover">
              {item.featured.cta.label}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
