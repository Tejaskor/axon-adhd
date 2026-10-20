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

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on Escape / outside click.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
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
    <header className="sticky top-0 z-40 px-4 pt-3 pb-2 transition-[padding] duration-300 ease-brand" data-scrolled={scrolled || undefined}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-content items-center justify-between gap-4 rounded-xl2 border px-4 transition-all duration-300 ease-brand sm:px-6",
          scrolled ? "border-white/70 bg-white/90 py-2 shadow-header backdrop-blur-xl" : "border-transparent bg-white/70 py-3 backdrop-blur-md",
        )}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image
            src={site.logo.src}
            alt={site.name}
            width={site.logo.width}
            height={site.logo.height}
            priority
            sizes="(max-width: 480px) 102px, 136px"
            className={cn("w-auto transition-[height] duration-300", scrolled ? "h-9" : "h-11")}
          />
        </Link>

        <nav ref={navRef} aria-label="Main" className="relative hidden lg:block">
          <ul className="flex items-center gap-1 font-sans">
            {mainNav.map((item) => {
              if (item.kind === "link") {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="rounded-pill px-4 py-2 text-[clamp(13px,1.02vw,16px)] font-medium text-ink-menu hover:text-brand aria-[current=page]:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const open = openMenu === item.label;
              const panelId = `mega-${item.label.toLowerCase()}`;
              return (
                <li key={item.label} className="static" onMouseEnter={() => hoverOpen(item.label)} onMouseLeave={hoverClose}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenMenu(open ? null : item.label)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-pill px-4 py-2 text-[clamp(13px,1.02vw,16px)] font-medium text-ink-menu transition-colors hover:text-brand",
                      (open || isActive(item.href)) && "text-brand",
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
                  </button>
                  {open && <MegaMenu item={item} id={panelId} onNavigate={closeAll} />}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <ButtonLink href={ctas.evaluation.href} variant="outline" size="sm" className="font-ui text-[13.5px]">
            {ctas.evaluation.label}
          </ButtonLink>
          <ButtonLink href={ctas.screening.href} size="sm" className="font-ui text-[13.5px] shadow-cta">
            {ctas.screening.label}
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
