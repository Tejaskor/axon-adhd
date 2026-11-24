"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide scroll animations (animation only: nothing is added to the layout, and nothing moves permanently).
 *
 *  1. Entrance reveals: every `.reveal` block (the site's existing Reveal wrapper) and every section heading outside one eases up and fades in
 *     once, when it scrolls into view. Blocks that enter together (a row of cards, a list) are staggered. A long ease-out curve gives the
 *     smooth, soft landing.
 *  1b. Cards that share a row enter from their own side (left card from the left, right card from the right, the middle ones rise); a single
 *     card or a stacked mobile column just rises. Photographs below the fold fade and settle (scale 1.06 → 1) as they scroll in.
 *  2. Gentle parallax: large in-flow photographs drift a few pixels against the scroll.
 *
 * Content that is already on screen at load is left alone (no flash), and with reduced motion, or before this script runs, everything is
 * simply visible. The styles live under `[data-fx]` / `[data-parallax]` in globals.css.
 */
const STAGGER_MS = 90;
const MAX_STAGGER = 6;
const PARALLAX_PX = 16;

const REVEAL_SELECTOR = ".reveal, main section h2, [data-fx-item]";
const PARALLAX_SKIP = "[data-no-fx], .marquee, ol, [aria-roledescription='carousel'], .myth-diagram, .qb-stage, [data-no-parallax], header, footer, nav";

export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const vh = () => window.innerHeight;

    /* ---------- Entrance reveals ---------- */
    const done: number[] = [];
    let batch: HTMLElement[] = [];
    let flush = 0;
    const show = () => {
      flush = 0;
      const items = batch;
      batch = [];
      // Stagger by on-screen position (top to bottom, then left to right) so a row of cards cascades.
      items.sort((a, b) => {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        return Math.abs(ra.top - rb.top) > 24 ? ra.top - rb.top : ra.left - rb.left;
      });
      items.forEach((el, i) => {
        const own = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0; // Reveal's delay prop, as a percent (0.1s → "10%")
        el.style.setProperty("--fx-delay", `${Math.min(i, MAX_STAGGER) * STAGGER_MS + own * 6}ms`);
        el.dataset.fx = "in";
        // Once it has landed, drop the entrance styles so the element's own hover/transition rules apply again.
        done.push(window.setTimeout(() => (el.dataset.fx = "seen"), Math.min(i, MAX_STAGGER) * STAGGER_MS + own * 6 + 1300));
      });
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          batch.push(e.target as HTMLElement);
        }
        if (batch.length && !flush) flush = window.setTimeout(show, 30);
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.06 },
    );

    /* ---------- Directional cards + image reveals ---------- */
    const isCard = (el: HTMLElement, r: DOMRect) => el.tagName !== "H2" && r.width >= 180 && r.width <= 640 && r.height >= 100;
    const markDirections = (items: HTMLElement[]) => {
      if (window.innerWidth < 640) return; // stacked column: every card simply rises
      const rows = new Map<number, HTMLElement[]>();
      for (const el of items) {
        const r = el.getBoundingClientRect();
        if (!isCard(el, r)) continue;
        const key = Math.round((r.top + window.scrollY) / 24);
        rows.set(key, [...(rows.get(key) ?? []), el]);
      }
      rows.forEach((row) => {
        if (row.length < 2) return;
        row.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        row[0].dataset.fxDir = "l";
        row[row.length - 1].dataset.fxDir = "r";
      });
    };
    const ioImg = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          ioImg.unobserve(e.target);
          const img = e.target as HTMLElement;
          img.dataset.fxImg = "in";
          done.push(window.setTimeout(() => (img.dataset.fxImg = "seen"), 1400));
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    const prepareImages = (root: ParentNode) => {
      root.querySelectorAll<HTMLImageElement>("main img").forEach((img) => {
        if (img.dataset.fxImg || img.dataset.fx || img.closest(PARALLAX_SKIP) || img.closest("[data-fx='hidden'], [data-fx='in']")) return;
        const r = img.getBoundingClientRect();
        if (r.width < 240 || r.height < 120 || r.bottom <= 0 || r.top < vh()) return; // small icons, and anything already on screen, are left alone
        if (getComputedStyle(img).position === "fixed") return;
        img.dataset.fxImg = "hidden";
        ioImg.observe(img);
      });
    };
    // Cards with no transition of their own get a gentle lift on hover (cards that already define hover styles are left as they are).
    const markLiftable = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".reveal, [data-fx-item]").forEach((el) => {
        if (el.dataset.card) return;
        const r = el.getBoundingClientRect();
        if (!isCard(el, r)) return;
        const cs = getComputedStyle(el);
        if (cs.transitionDuration !== "0s" || (cs.borderTopWidth === "0px" && cs.boxShadow === "none" && cs.backgroundColor === "rgba(0, 0, 0, 0)")) return;
        el.dataset.card = "lift";
      });
    };

    const prepare = (root: ParentNode) => {
      const fresh: HTMLElement[] = [];
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.dataset.fx) return;
        if (el.closest("[data-no-fx]")) return; // sections that run their own entrance (e.g. the journey heading)
        // An h2 inside a Reveal (or any block already revealing) rides with its parent.
        if (el.tagName === "H2" && el.closest(".reveal")) return;
        // Opt-in list items stagger one by one; the rest of their column still rides with its own Reveal.
        const r = el.getBoundingClientRect();
        if (r.height === 0 || (r.top < vh() && r.bottom > 0)) {
          el.dataset.fx = "seen"; // on screen already: no hide, no flash
          return;
        }
        if (r.bottom <= 0) {
          el.dataset.fx = "seen"; // above the viewport (e.g. restored scroll position)
          return;
        }
        el.dataset.fx = "hidden";
        fresh.push(el);
        io.observe(el);
      });
      markDirections(fresh);
      prepareImages(root);
      markLiftable(root);
    };

    /* ---------- Parallax ---------- */
    let imgs: HTMLImageElement[] = [];
    const collectImages = () => {
      imgs = Array.from(document.querySelectorAll<HTMLImageElement>("main img")).filter((img) => {
        if (img.closest(PARALLAX_SKIP) || img.dataset.parallax === "off") return false;
        if (img.width < 460) return false;
        const pos = getComputedStyle(img).position;
        return pos === "static" || pos === "relative";
      });
      imgs.forEach((img) => (img.dataset.parallax = "on"));
    };
    let ticking = false;
    const tick = () => {
      ticking = false;
      const h = vh();
      for (const img of imgs) {
        const r = img.getBoundingClientRect();
        if (r.bottom < -80 || r.top > h + 80) continue;
        const p = (r.top + r.height / 2 - h / 2) / (h / 2 + r.height / 2); // -1 (below) → 1 (above)
        const clamped = Math.max(-1, Math.min(1, p));
        img.style.translate = `0 ${(clamped * PARALLAX_PX).toFixed(1)}px`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };

    // Start only once the page has fully hydrated: touching server-rendered markup earlier would make React report a mismatch.
    let startTimer = 0;
    const start = () => {
      const run = () => {
        prepare(document);
        collectImages();
        tick();
        mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });
      };
      // After the 900ms grace period, wait for an idle moment too, so a slow device still busy hydrating is never touched mid-hydration.
      startTimer = window.setTimeout(() => ("requestIdleCallback" in window ? window.requestIdleCallback(run, { timeout: 3000 }) : run()), 900);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Content that mounts later (client components, route changes) gets the same treatment.
    let scan = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(scan);
      scan = window.setTimeout(() => {
        prepare(document);
        collectImages();
      }, 120);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      ioImg.disconnect();
      mo.disconnect();
      window.clearTimeout(flush);
      window.clearTimeout(startTimer);
      window.removeEventListener("load", start);
      done.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(scan);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      imgs.forEach((img) => {
        img.style.translate = "";
        delete img.dataset.parallax;
      });
    };
  }, [pathname]);

  return null;
}
