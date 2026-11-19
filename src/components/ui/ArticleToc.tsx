"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

/**
 * "Table of Contents" box of a blog article, styled like the original WordPress (Elementor) widget: numbered list of the
 * article's H2 headings, one line per item with an ellipsis, and the item of the section being read turns bold.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;
    const update = () => {
      // The last heading that has scrolled past the header line is the one being read.
      const line = 140;
      let current: string | null = null;
      for (const h of headings) if (h.getBoundingClientRect().top <= line) current = h.id;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  if (!items.length) return null;
  return (
    <nav aria-labelledby="toc-title" className="overflow-hidden rounded-[6px] border border-[#E8EDF5] bg-white">
      <h2 id="toc-title" className="m-0 p-5 text-[18px] leading-[1.3] font-bold text-[#0A0A0A] lg:text-[22px]">
        Table of Contents
      </h2>
      <ol className="m-0 list-none p-5 pt-0">
        {items.map((item, i) => (
          <li key={item.id} className="mb-[0.5em] last:mb-0">
            <a
              href={`#${item.id}`}
              title={item.text}
              aria-current={active === item.id ? "location" : undefined}
              className={`flex items-center text-[16px] leading-[1.5] text-[#0A0A0A] transition-colors hover:text-[#10458D] lg:text-[18px] ${active === item.id ? "font-bold" : "font-normal"}`}
            >
              <span aria-hidden className="mr-2 shrink-0">
                {i + 1}.
              </span>
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
