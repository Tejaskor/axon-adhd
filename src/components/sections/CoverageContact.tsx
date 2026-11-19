"use client";

import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { availableStates, mapStates, stateOptions, unavailableStates } from "@/content/us-map";
import { links } from "@/content/site";
import { cn } from "@/lib/utils";

const glassCard = "rounded-[28px] border border-white/80 bg-white/70 shadow-[0_24px_60px_rgba(37,120,202,.12),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl";

/** "Where we can see you online" card: blue = available, grey = not yet. The map and the state dropdown share one `selected` state, so each updates the other. */
function StateCoverage() {
  const [selected, setSelected] = useState("");
  const uid = useId();
  const mapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ddRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const ddListRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", timer: 0 });
  const [tip, setTip] = useState<{ name: string; x: number; y: number } | null>(null);
  const hit = mapStates.find((s) => s.name === selected);
  const status = availableStates.includes(selected) ? "yes" : unavailableStates.includes(selected) ? "no" : "none";

  // Close the dropdown on an outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ddRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the active option inside the 3-row window.
  useEffect(() => {
    if (!open) return;
    const list = ddListRef.current;
    const el = list?.children[active] as HTMLElement | undefined;
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
  }, [active, open]);

  const openList = () => {
    const i = stateOptions.indexOf(selected);
    setActive(i < 0 ? 0 : i);
    setOpen(true);
    requestAnimationFrame(() => ddListRef.current?.focus({ preventScroll: true }));
  };
  const closeList = (focusButton: boolean) => {
    setOpen(false);
    if (focusButton) btnRef.current?.focus({ preventScroll: true });
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
    } else if (k === "Tab") closeList(false);
    else if (k.length === 1 && /\S/.test(k)) {
      const t = typed.current;
      t.text += k.toLowerCase();
      window.clearTimeout(t.timer);
      t.timer = window.setTimeout(() => (t.text = ""), 700);
      const i = stateOptions.findIndex((o) => o.toLowerCase().startsWith(t.text));
      if (i >= 0) setActive(i);
    }
  };

  // The chosen state is drawn last so its outline sits above its neighbours.
  const drawOrder = hit ? [...mapStates.filter((s) => s.name !== hit.name), hit] : mapStates;

  return (
    <div className="relative flex h-full flex-col rounded-[28px] bg-transparent p-5 sm:p-7">
      <p className="flex justify-end gap-4 text-[13px] text-[#5B6B84]" aria-hidden>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-2.5 rounded-[3px] bg-[#256ACC]" />
          Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-2.5 rounded-[3px] bg-[#D5DEEB]" />
          Not yet
        </span>
      </p>

      <div ref={mapRef} className="relative flex flex-1 flex-col justify-center py-3">
        <svg viewBox="0 0 975 610" role="img" aria-label="Map of the United States showing the states where AXON offers online ADHD evaluations. Select a state to check availability." className="mx-auto h-auto w-full lg:max-w-[560px]">
          <g>
            {drawOrder.map((st) => {
              const on = availableStates.includes(st.name);
              const sel = selected === st.name;
              return (
                <path
                  key={st.name}
                  d={st.d}
                  aria-label={st.name}
                  onClick={() => setSelected(st.name)}
                  onMouseMove={(e) => {
                    const box = mapRef.current?.getBoundingClientRect();
                    if (box) setTip({ name: st.name, x: e.clientX - box.left, y: e.clientY - box.top });
                  }}
                  onMouseLeave={() => setTip(null)}
                  className={cn(
                    "cursor-pointer transition-[fill] duration-300",
                    sel
                      ? cn("stroke-white stroke-[1.5]", on ? "fill-[#0D7C66]" : "fill-[#6B7C95]")
                      : cn("stroke-white stroke-[1.2]", on ? "fill-[#256ACC] hover:fill-[#4B87E0]" : "fill-[#D5DEEB] hover:fill-[#7FA9E8]"),
                  )}
                >
                </path>
              );
            })}
          </g>
          {hit && (
            <g aria-hidden pointerEvents="none">
              <circle cx={hit.cx} cy={hit.cy} r="12" fill="none" stroke="#0B254B" strokeWidth="3" opacity=".35" />
              <circle cx={hit.cx} cy={hit.cy} r="6" fill="#FFFFFF" stroke="#0D7C66" strokeWidth="3" />
            </g>
          )}
        </svg>

        {/* Hover tooltip: the state under the pointer. */}
        {tip && (
          <div role="presentation" className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-[140%] rounded-lg bg-navy px-2.5 py-1 text-[13px] font-semibold whitespace-nowrap text-white shadow-[0_8px_20px_rgba(11,37,75,.35)]" style={{ left: tip.x, top: tip.y }}>
            {tip.name}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/90 bg-white/75 p-4 shadow-[0_10px_30px_rgba(37,120,202,.08)] sm:p-5">
        <label id={`${uid}-label`} htmlFor={`${uid}-state`} className="text-[16px] font-semibold text-navy">
          Where will you be for your Zoom visit?
        </label>
        <div className="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div ref={ddRef} className="relative flex-1">
            <button
              ref={btnRef}
              type="button"
              id={`${uid}-state`}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-labelledby={`${uid}-label ${uid}-state`}
              onClick={() => (open ? closeList(true) : openList())}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  if (!open) openList();
                }
              }}
              className={cn("flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border border-[#D1D1D6] bg-white pr-4 pl-4 text-left text-[16px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", selected ? "text-navy" : "text-[#4B5B73]")}
            >
              <span>{selected || "Select your state"}</span>
              <ChevronDown aria-hidden className={cn("size-5 shrink-0 text-navy transition-transform duration-200", open && "rotate-180")} strokeWidth={2.2} />
            </button>
            {/* Opens downward and shows 3 rows (3 × 44px); the rest scroll. */}
            <ul
              ref={ddListRef}
              role="listbox"
              tabIndex={-1}
              aria-labelledby={`${uid}-label`}
              aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
              hidden={!open}
              onKeyDown={onListKey}
              className="absolute inset-x-0 top-full z-40 mt-1.5 max-h-[132px] overflow-y-scroll rounded-xl border border-[#D1D1D6] bg-white shadow-[0_16px_36px_rgba(11,37,75,.16)] outline-none [scrollbar-color:#B5C2D6_transparent] [scrollbar-width:thin]"
            >
              {stateOptions.map((name, i) => (
                <li
                  key={name}
                  id={`${uid}-opt-${i}`}
                  role="option"
                  aria-selected={selected === name}
                  onClick={() => choose(name)}
                  onMouseMove={() => active !== i && setActive(i)}
                  className={cn("flex h-11 cursor-pointer items-center px-4 text-[16px] text-navy", active === i && "bg-[#EEF3F9]", selected === name && "font-semibold text-[#256ACC]")}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <ButtonLink href={links.comprehensive} hidden={status === "no"} className="sm:shrink-0">
            Book Evaluation
          </ButtonLink>
        </div>
        <p key={`${status}-${selected}`} role="status" className="mt-3 flex items-start gap-2 text-[14px] leading-snug text-[#5B6B84]">
          {status === "yes" && (
            <>
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#0D7C66]" strokeWidth={3} />
              <span>
                <strong className="font-semibold text-[#0B7A45]">Available.</strong> Yes, you can book from {selected}. Everything happens online.
              </span>
            </>
          )}
          {status === "no" && (
            <>
              <X aria-hidden className="mt-0.5 size-4 shrink-0 text-[#C62828]" strokeWidth={3} />
              <span>
                <strong className="font-semibold text-[#C62828]">Not Available.</strong> We can&apos;t test patients in {selected} yet. Email info@axonadhd.com and we&apos;ll talk through other options.
              </span>
            </>
          )}
          {status === "none" && "Select your state, or tap it on the map, to check availability."}
        </p>
      </div>
    </div>
  );
}

const formSkin = [
  "[&_form]:gap-4 [&_label]:text-[14px] [&_label]:font-semibold [&_label]:text-navy",
  "[&_input:not([type=tel])]:rounded-[16px] [&_textarea]:rounded-[16px] [&_input:not([type=tel])]:border-[#D1D1D6] [&_textarea]:border-[#D1D1D6] [&_input]:py-2.5 [&_textarea]:min-h-[120px]",
  "[&_form>button[type=submit]]:w-full [&_form>button[type=submit]]:justify-self-stretch",
  "[&_form>p:last-child]:text-center [&_form>p:last-child]:text-[14px] [&_form>p:last-child]:text-[#4B5B73]",
].join(" ");

/** Homepage "Where Axon ADHD provides care" + "Contact Us": a glass coverage card with the state map beside the contact form card. */
export function CoverageContact() {
  return (
    <section id="contact" className="scroll-mt-[var(--header-offset)] bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)]! section-py" aria-labelledby="coverage-title">
      <Container>
        <Reveal className="mx-auto mb-10 max-w-[900px] text-center sm:mb-12">
          <h2 id="coverage-title" className="type-h2 text-navy text-balance">
            Contact <span className="text-[#2578CA]">Us</span>
          </h2>
        </Reveal>
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.12fr_1fr] lg:gap-8">
          <Reveal className="h-full">
            <StateCoverage />
          </Reveal>
          <Reveal delay={0.1}>
            <div className={cn(glassCard, "p-6 sm:p-8", formSkin)}>
              <p className="mb-6 text-[16px] leading-relaxed text-[#4B5B73]">We&apos;d love to hear from you. Please fill out the form and we&apos;ll get back to you as soon as possible.</p>
              <ContactForm placeholders submitArrow={false} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
