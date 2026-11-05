"use client";

import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { availableStates, mapStates, stateOptions, unavailableStates } from "@/content/us-map";
import { cn } from "@/lib/utils";

/**
 * Interactive US map + searchable state dropdown. The map shapes, the listbox and the availability message all read the
 * same `selected` state, so picking a state in one place updates the others.
 */
export function StateChecker({ bookHref }: { bookHref: string }) {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typed = useRef({ text: "", timer: 0 });
  const uid = useId();

  const hit = mapStates.find((s) => s.name === selected);
  const status = availableStates.includes(selected) ? "yes" : unavailableStates.includes(selected) ? "no" : "none";

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.querySelector("[data-dd]")?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDown);
    return () => document.removeEventListener("click", onDown);
  }, [open]);

  // Keep the active option in view (centered when the list first opens).
  const centerNext = useRef(false);
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const el = list?.children[active] as HTMLElement | undefined;
    if (!list || !el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (centerNext.current) {
      list.scrollTop = Math.max(0, top - (list.clientHeight - el.offsetHeight) / 2);
      centerNext.current = false;
    } else if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [active, open]);

  const openList = () => {
    const i = stateOptions.indexOf(selected);
    centerNext.current = true;
    setActive(i < 0 ? 0 : i);
    setOpen(true);
    requestAnimationFrame(() => listRef.current?.focus({ preventScroll: true }));
  };
  const closeList = (focusButton: boolean) => {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus({ preventScroll: true });
  };
  const choose = (name: string) => {
    setSelected(name);
    closeList(true);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    const k = e.key;
    if (k === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(stateOptions.length - 1, a + 1));
    } else if (k === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (k === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (k === "End") {
      e.preventDefault();
      setActive(stateOptions.length - 1);
    } else if (k === "Enter" || k === " ") {
      e.preventDefault();
      choose(stateOptions[active]);
    } else if (k === "Escape") {
      e.preventDefault();
      closeList(true);
    } else if (k === "Tab") {
      closeList(false);
    } else if (k.length === 1 && /\S/.test(k)) {
      const t = typed.current;
      t.text += k.toLowerCase();
      window.clearTimeout(t.timer);
      t.timer = window.setTimeout(() => (t.text = ""), 700);
      const i = stateOptions.findIndex((o) => o.toLowerCase().startsWith(t.text));
      if (i >= 0) setActive(i);
    }
  };

  return (
    <div className="axn-mapcard" id="axn-checker" ref={rootRef}>
      <div className="axn-mapcard__top">
        <p className="axn-mapcard__title">Where we can see you online</p>
        <p className="axn-mapcard__key">
          <span>
            <i className="is-on" />
            Available
          </span>
          <span>
            <i className="is-off" />
            Not yet
          </span>
        </p>
      </div>

      <svg
        className="axn-map"
        viewBox="0 0 975 610"
        role="img"
        aria-label="Map of the United States showing the 43 states and DC where AXON offers online ADHD evaluations"
      >
        <g className="axn-map__states">
          {mapStates.map((s) => (
            <path
              key={s.name}
              className={cn("axn-st", availableStates.includes(s.name) && "is-yes", selected === s.name && "is-sel")}
              style={{ animationDelay: `${s.delay.toFixed(3)}s` }}
              d={s.d}
              onClick={() => setSelected(s.name)}
            >
              <title>{s.name}</title>
            </path>
          ))}
        </g>
        <g className={cn("axn-pin", hit && "is-on")}>
          <circle className="axn-pin__pulse" cx={hit?.cx ?? 0} cy={hit?.cy ?? 0} r="9" fill="none" stroke="#0B254B" strokeWidth="3" />
          <circle cx={hit?.cx ?? 0} cy={hit?.cy ?? 0} r="6" fill="#FFFFFF" stroke="#0D7C66" strokeWidth="3" />
        </g>
      </svg>

      <div className="axn-checker">
        <div className="axn-checker__row">
          <div className="axn-checker__field axn-dd" data-dd>
            <label id={`${uid}-label`} htmlFor={`${uid}-btn`}>
              Where will you be for your Zoom visit?
            </label>
            <button
              ref={buttonRef}
              type="button"
              className="axn-dd__btn"
              id={`${uid}-btn`}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-labelledby={`${uid}-label ${uid}-btn`}
              onClick={() => (open ? closeList(true) : openList())}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  if (!open) openList();
                }
              }}
            >
              <span className={cn("axn-dd__val", !selected && "is-placeholder")}>{selected || "Select your state"}</span>
              <ChevronDown size={18} strokeWidth={2.4} aria-hidden="true" />
            </button>
            <ul
              ref={listRef}
              className="axn-dd__list"
              role="listbox"
              tabIndex={-1}
              aria-labelledby={`${uid}-label`}
              aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
              hidden={!open}
              onKeyDown={onListKey}
            >
              {stateOptions.map((name, i) => (
                <li
                  key={name}
                  id={`${uid}-opt-${i}`}
                  role="option"
                  aria-selected={selected === name}
                  className={cn(active === i && "is-active")}
                  onClick={() => choose(name)}
                  onMouseMove={() => active !== i && setActive(i)}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <a className="axn-btn" id="axn-checker-book" href={bookHref} hidden={status === "no"}>
            Book $577
            <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </a>
        </div>

        <p key={`${status}-${selected}`} className={cn("axn-checker__msg is-pop", `axn-checker__msg--${status}`)} role="status">
          {status === "yes" && (
            <>
              <span className="axn-checker__ic">
                <Check size={14} strokeWidth={3} color="#0D7C66" aria-hidden="true" />
              </span>
              <span>
                <strong>Yes, you can book from {selected}.</strong> Everything happens online.
              </span>
            </>
          )}
          {status === "no" && (
            <>
              <span className="axn-checker__ic">!</span>
              <span>
                <strong>We can&apos;t test patients in {selected} yet.</strong> Email info@axonadhd.com and we&apos;ll talk through other options.
              </span>
            </>
          )}
          {status === "none" && "Select your state, or tap it on the map, to check availability."}
        </p>
      </div>
    </div>
  );
}
