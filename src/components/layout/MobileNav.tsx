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
 * Slide-over drawer for < 1181px. Native <dialog>.showModal() provides the
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
      className="ml-auto h-dvh max-h-dvh w-[min(88vw,380px)] max-w-none bg-white p-0 shadow-panel backdrop:bg-navy/40 backdrop:backdrop-blur-sm open:animate-[slide-in_.3s_var(--ease)]"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line-2 px-5 py-4">
          <Link href="/" onNavigate={onClose} aria-label={`${site.name} home`}>
            <Image src={site.headerLogo.src} alt={site.name} width={site.headerLogo.width} height={site.headerLogo.height} unoptimized className="h-9 w-auto" />
          </Link>
          <button type="button" onClick={onClose} aria-label="Close menu" className="rounded-full p-2 text-ink hover:bg-surface">
            <X className="size-6" aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {mainNav.map((item) =>
              item.kind === "link" ? (
                <li key={item.label}>
                  <Link href={item.href} onNavigate={onClose} className="block rounded-[10px] px-3 py-3 text-[16px] font-semibold text-ink-menu hover:bg-primary-soft">
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
                    className="flex w-full items-center justify-between rounded-[10px] px-3 py-3 text-[16px] font-semibold text-ink-menu hover:bg-primary-soft"
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("size-5 transition-transform", expanded === item.label && "rotate-180")} />
                  </button>
                  <ul id={`${base}-${item.label}`} hidden={expanded !== item.label} className="mt-1 mb-2 space-y-1 pl-2">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} onNavigate={onClose} className="flex items-start gap-3 rounded-[10px] px-3 py-2.5 hover:bg-primary-soft">
                          <NavIcon name={link.icon} className="mt-0.5 size-5 shrink-0 text-brand" />
                          <span>
                            <span className="block text-[15px] font-medium text-ink-menu">{link.label}</span>
                            <span className="block text-[13px] text-muted">{link.description}</span>
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
        <div className="grid gap-3 border-t border-line-2 p-5">
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
