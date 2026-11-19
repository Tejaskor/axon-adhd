"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide scroll animations (animation only: nothing is added to the layout, and nothing moves permanently).
 *
 *  1. Entrance reveals: every `.reveal` block (the site's existing Reveal wrapper) and every section heading outside one eases up and fades in
 *     once, when it scrolls into view. Blocks that enter together (a row of cards, a list) are staggered. A long ease-out curve gives the
 *     smooth, soft landing.
 *  2. Gentle parallax: large in-flow photographs drift a few pixels against the scroll.
 *
 * Content that is already on screen at load is left alone (no flash), and with reduced motion, or before this script runs, everything is
 * simply visible. The styles live under `[data-fx]` / `[data-parallax]` in globals.css.
 */
const STAGGER_MS = 90;
const MAX_STAGGER = 6;
const PARALLAX_PX = 16;

const REVEAL_SELECTOR = ".reveal, main section h2";
const PARALLAX_SKIP = ".marquee, ol, [aria-roledescription='carousel'], .myth-diagram, .qb-stage, [data-no-parallax], header, footer, nav";

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

    const prepare = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.dataset.fx) return;
        // An h2 inside a Reveal (or any block already revealing) rides with its parent.
        if (el.tagName === "H2" && el.closest(".reveal")) return;
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
        io.observe(el);
      });
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
      startTimer = window.setTimeout(() => {
        prepare(document);
        collectImages();
        tick();
        mo.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });
      }, 900);
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
