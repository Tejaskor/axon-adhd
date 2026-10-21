"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { mainNav } from "@/content/nav";
import { ctas, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

/**
 * Decorative pill outline for the CTA hover trace (.cta-trace-line in globals.css). rx = half the 54px button height.
 * Fail-safe without the stylesheet (e.g. a stale CSS bundle): width/height="0" keep it out of layout and fill="none"
 * keeps the rect from painting the SVG default black; the CSS overrides these presentation attributes.
 */
function TraceLine() {
  return (
    <svg aria-hidden="true" focusable="false" className="cta-trace-line" width="0" height="0">
      <rect width="100%" height="100%" rx="27" pathLength={100} fill="none" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Top of page: flat full-width white bar. Once scrolled: floating glass pill.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on Escape / outside click.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Return focus to the trigger when the keyboard user was inside the menu.
      if (navRef.current?.contains(document.activeElement)) navRef.current.querySelector<HTMLButtonElement>(`[aria-controls="mega-${openMenu.toLowerCase()}"]`)?.focus();
      setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => !navRef.current?.contains(e.target as Node) && setOpenMenu(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  // Reset transient UI when Next hides this route with <Activity>.
  useLayoutEffect(() => () => setOpenMenu(null), []);

  const closeAll = useCallback(() => setOpenMenu(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const isActive = (href: string) => href !== "/" && pathname.startsWith(href.replace(/\/$/, ""));

  return (
    // Both states total 96px = --header-height (globals.css), which page heroes pull up behind the header:
    // top = h-[92px] + pb-1; scrolled = pt-3 + h-20 + pb-1. Stickiness lives on the wrapper in app/layout.tsx.
    <header className={cn("pb-1 transition-[padding] duration-500 ease-brand", scrolled ? "px-4 pt-3" : "px-0 pt-0")}>
      <div
        className={cn(
          "relative mx-auto flex w-full items-center justify-between gap-3 border transition-[max-width,height,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-brand lg:gap-[clamp(10px,2.2vw,32px)]",
          scrolled
            ? "h-20 max-w-[1340px] rounded-[40px] border-white/60 bg-white/50 px-3 shadow-[0_12px_36px_rgba(15,27,46,.12),inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-xl backdrop-saturate-150 xs:px-4"
            : // Full-bleed bar; side padding keeps the content on the 1340px content column.
              "h-[92px] max-w-full rounded-t-none rounded-b-[24px] border-transparent bg-white px-[max(16px,calc((100%-1340px)/2+16px))] shadow-[0_1px_0_rgba(15,27,46,.06),0_6px_20px_rgba(15,27,46,.04)]",
        )}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image
            src={site.headerLogo.src}
            alt={site.name}
            width={site.headerLogo.width}
            height={site.headerLogo.height}
            priority
            unoptimized
            className="h-[39px] w-auto xs:h-[52px] lg:h-11"
          />
        </Link>

        {/* flex-1 + left-aligned list: links sit after the logo and the CTAs are pushed right (live-site layout).
            Items stretch to the full bar height so the pointer can travel into a mega panel without leaving its item. */}
        <nav ref={navRef} aria-label="Main" className="hidden flex-1 self-stretch lg:flex">
          <ul className="flex items-stretch gap-3 font-sans xl:gap-5">
            {mainNav.map((item) => {
              if (item.kind === "link") {
                return (
                  <li key={item.label} className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="rounded-pill px-2.5 py-1.5 text-[16px] leading-[1.2] font-normal text-ink-menu hover:text-brand aria-[current=page]:text-brand xl:px-3"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const open = openMenu === item.label;
              const panelId = `mega-${item.label.toLowerCase()}`;
              return (
                <li
                  key={item.label}
                  className="static flex items-center"
                  onMouseEnter={() => hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                  // Close when keyboard focus moves to something outside this item (e.g. tabbing past the last panel link).
                  onBlur={(e) => e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) && open && setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenMenu(open ? null : item.label)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-pill px-2.5 py-1.5 text-[16px] leading-[1.2] font-normal text-ink-menu transition-colors hover:text-brand xl:px-3",
                      (open || isActive(item.href)) && "text-brand",
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("size-[15px] shrink-0 transition-transform duration-200", open && "rotate-180")} />
                  </button>
                  {open && <MegaMenu item={item} id={panelId} onNavigate={closeAll} />}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
          <ButtonLink href={ctas.evaluation.href} variant="white" size="sm" className="cta-trace h-[54px]! rounded-[9999px]! border border-line-3 [--cta-trace-color:#3B82F6] [--cta-trace-offset:1px] text-[clamp(13px,1.02vw,16px)]! leading-[1.25] font-normal! text-navy! shadow-[0_1px_2px_rgba(15,27,46,.06)] hover:border-primary/30 xl:px-5">
            {ctas.evaluation.label}
            <TraceLine />
          </ButtonLink>
          <ButtonLink href={ctas.screening.href} size="sm" className="cta-trace h-[54px]! rounded-[9999px]! [--cta-trace-color:#BFDBFE] text-[clamp(13px,1.02vw,16px)]! leading-[1.25] font-normal! shadow-[0_6px_18px_rgba(37,106,204,.28)]! hover:shadow-[0_8px_22px_rgba(37,106,204,.34)]! xl:px-5">
            {ctas.screening.label}
            <TraceLine />
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-haspopup="dialog"
          className="rounded-[10px] p-2 text-[#1F2937] hover:bg-surface lg:hidden"
        >
          <Menu className="size-7" aria-hidden />
        </button>
      </div>
      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
