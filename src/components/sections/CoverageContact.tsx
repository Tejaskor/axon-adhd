"use client";

import { Check, ChevronDown, ShieldCheck, X } from "lucide-react";
import { useId, useState } from "react";
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
  const hit = mapStates.find((s) => s.name === selected);
  const status = availableStates.includes(selected) ? "yes" : unavailableStates.includes(selected) ? "no" : "none";

  // The chosen state is drawn last so its outline sits above its neighbours.
  const drawOrder = hit ? [...mapStates.filter((s) => s.name !== hit.name), hit] : mapStates;

  return (
    <div className="relative flex h-full flex-col rounded-[28px] bg-transparent p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h2 className="text-[16px] font-semibold text-navy">Where we can see you online</h2>
        <p className="flex gap-4 text-[13px] text-[#5B6B84]" aria-hidden>
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2.5 rounded-[3px] bg-[#256ACC]" />
            Available
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2.5 rounded-[3px] bg-[#D5DEEB]" />
            Not yet
          </span>
        </p>
      </div>

      <div className="relative flex flex-1 flex-col justify-center py-3">
        <svg viewBox="0 0 975 610" role="img" aria-label="Map of the United States showing the states where AXON offers online ADHD evaluations. Select a state to check availability." className="h-auto w-full">
          <g>
            {drawOrder.map((st) => {
              const on = availableStates.includes(st.name);
              const sel = selected === st.name;
              return (
                <path
                  key={st.name}
                  d={st.d}
                  onClick={() => setSelected(st.name)}
                  className={cn(
                    "cursor-pointer transition-[fill] duration-300",
                    sel
                      ? cn("stroke-white stroke-[1.5]", on ? "fill-[#0D7C66]" : "fill-[#6B7C95]")
                      : cn("stroke-white stroke-[1.2]", on ? "fill-[#256ACC] hover:fill-[#4B87E0]" : "fill-[#D5DEEB] hover:fill-[#7FA9E8]"),
                  )}
                >
                  <title>{st.name}</title>
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

        {/* Floating credential chip, hanging over the card's left edge as on the live page. */}
        <div className="absolute top-[34%] left-0 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 py-2.5 pr-5 pl-2.5 shadow-[0_14px_36px_rgba(37,120,202,.18)] backdrop-blur-md sm:-left-9">
          <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#E7F7F1] text-[#0D7C66]">
            <ShieldCheck className="size-5" strokeWidth={1.9} />
          </span>
          <span>
            <span className="block text-[15px] leading-tight font-semibold text-navy">PSYPACT authorized</span>
            <span className="block text-[13px] leading-snug text-[#5B6B84]">+ licensed in VA and NY</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/90 bg-white/75 p-4 shadow-[0_10px_30px_rgba(37,120,202,.08)] sm:p-5">
        <label htmlFor={`${uid}-state`} className="text-[16px] font-semibold text-navy">
          Where will you be for your Zoom visit?
        </label>
        <div className="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <select
              id={`${uid}-state`}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className={cn("h-12 w-full cursor-pointer appearance-none rounded-xl border border-[#D5DCE6] bg-white pr-11 pl-4 text-[16px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", selected ? "text-navy" : "text-[#4B5B73]")}
            >
              <option value="">Select your state</option>
              {stateOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-navy" strokeWidth={2.2} />
          </div>
          <ButtonLink href={links.comprehensive} hidden={status === "no"} className="sm:shrink-0">
            Book $577
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
  "[&_input:not([type=tel])]:rounded-xl [&_textarea]:rounded-xl [&_input:not([type=tel])]:border-[#D5DCE6] [&_textarea]:border-[#D5DCE6] [&_input]:py-2.5 [&_textarea]:min-h-[120px]",
  "[&_form>button[type=submit]]:w-full sm:[&_form>button[type=submit]]:w-auto [&_form>button[type=submit]]:justify-self-center",
  "[&_form>p:last-child]:text-center [&_form>p:last-child]:text-[14px] [&_form>p:last-child]:text-[#4B5B73]",
].join(" ");

/** Homepage "Where Axon ADHD provides care" + "Contact Us": a glass coverage card with the state map beside the contact form card. */
export function CoverageContact() {
  return (
    <section id="contact" className="scroll-mt-[var(--header-offset)] bg-[linear-gradient(140deg,#dfeaf4_13.61%,hsla(0,0%,100%,0.2)_45.13%)]! section-py" aria-labelledby="contact-title">
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.12fr_1fr] lg:gap-8">
          <Reveal className="h-full">
            <StateCoverage />
          </Reveal>
          <Reveal delay={0.1}>
            <div className={cn(glassCard, "p-6 sm:p-8", formSkin)}>
              <h2 id="contact-title" className="type-h2 text-navy">
                Contact Us
              </h2>
              <p className="mt-3 mb-6 text-[16px] leading-relaxed text-[#4B5B73]">We&apos;d love to hear from you. Please fill out the form and we&apos;ll get back to you as soon as possible.</p>
              <ContactForm placeholders />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
