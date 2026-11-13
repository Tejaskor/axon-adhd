"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export type FaqItem = {
  q: string;
  a: ReactNode;
};

export function AxtcFaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <div className="axtc-faq__list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            className={`axtc-q ${isOpen ? "axtc-q--open" : ""}`}
            data-axtc-r
          >
            <button
              type="button"
              className="axtc-q__btn"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`axtc-faq-panel-${index}`}
              id={`axtc-faq-trigger-${index}`}
            >
              <span className="axtc-q__title">{item.q}</span>
              <span className="axtc-q__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              id={`axtc-faq-panel-${index}`}
              role="region"
              aria-labelledby={`axtc-faq-trigger-${index}`}
              className="axtc-q__content"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="axtc-q__inner">
                <div className="axtc-q__body">
                  <div className="axtc-q__text">{item.a}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
