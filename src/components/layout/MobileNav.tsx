"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { mainNav } from "@/content/nav";
import { ctas, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { NavIcon } from "./NavIcon";

/**
 * Full-screen menu on phones, 440px slide-over drawer from 768px, for < 1181px. Native <dialog>.showModal() provides the
 * focus trap, ESC-to-close and inert background; submenus are accordions.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const base = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Next keeps hidden routes mounted (<Activity>); reset transient state when hidden.
  useLayoutEffect(() => () => onClose(), [onClose]);

  return (
    <dialog
      ref={ref}
      aria-label="Main menu"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-none bg-white p-0 text-ink shadow-panel backdrop:bg-navy/40 backdrop:backdrop-blur-sm open:animate-[slide-in_.3s_var(--ease)] sm:w-[440px] sm:max-w-[100vw]"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E3EAF4] px-4 sm:px-5">
          <Link href="/" onNavigate={onClose} aria-label={`${site.name} home`}>
            <Image src={site.headerLogo.src} alt={site.name} width={site.headerLogo.width} height={site.headerLogo.height} unoptimized className="h-9 w-auto sm:h-10" />
          </Link>
          <button type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 grid size-11 place-items-center rounded-full text-[#256ACC] transition-colors hover:bg-primary-soft">
            <X className="size-7" aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 py-2 sm:px-5">
          <ul className="divide-y divide-[#E3EAF4]">
            {mainNav.map((item) =>
              item.kind === "link" ? (
                <li key={item.label}>
                  <Link href={item.href} onNavigate={onClose} className="flex min-h-14 items-center px-1 py-3 text-[18px] font-semibold text-navy transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={expanded === item.label}
                    aria-controls={`${base}-${item.label}`}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="flex min-h-14 w-full items-center justify-between px-1 py-3 text-left text-[18px] font-semibold text-navy transition-colors hover:text-primary"
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("size-5 shrink-0 text-[#256ACC] transition-transform", expanded === item.label && "rotate-180")} />
                  </button>
                  <ul id={`${base}-${item.label}`} hidden={expanded !== item.label} className="mb-3 space-y-1">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} onNavigate={onClose} className="flex items-start gap-3 rounded-[12px] bg-[#F5F9FF] px-3 py-3 transition-colors hover:bg-primary-soft">
                          <NavIcon name={link.icon} className="mt-0.5 size-5 shrink-0 text-brand" />
                          <span>
                            <span className="block text-[16px] leading-snug font-semibold text-navy">{link.label}</span>
                            <span className="mt-0.5 block text-[14px] leading-snug text-body">{link.description}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="grid shrink-0 gap-3 [&>a:first-child]:bg-transparent border-t border-[#E3EAF4] bg-white p-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:p-5">
          <ButtonLink href={ctas.evaluation.href} variant="outline" className="w-full whitespace-normal text-center">
            {ctas.evaluation.label}
          </ButtonLink>
          <ButtonLink href={ctas.screening.href} className="w-full">
            {ctas.screening.label}
          </ButtonLink>
        </div>
      </div>
    </dialog>
  );
}
