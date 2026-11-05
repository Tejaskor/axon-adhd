"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, Star, Users } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { reviews } from "@/content/trust";
import { cn } from "@/lib/utils";
import { GoogleIcon, ReviewDate } from "./Testimonials";

/** Bolds the brand name wherever it appears in the stat label. */
function Label({ text }: { text: string }) {
  return (
    <>
      {text.split(/(AXON)/).map((part, i) => (part === "AXON" ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

/**
 * One row: the partner-count card, then the first three Google reviews as white cards (two on tablets, one on phones).
 * Reviews come from the site's trust data; `stat` is the page's own figure.
 */
export function ReviewStrip({ stat }: { stat: { value: string; label: string } }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = reviews.slice(0, 3);
  const num = stat.value.replace(/\+$/, "");
  const plus = stat.value.endsWith("+");

  return (
    <section className="bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] pt-6 sm:pt-8" aria-label="Partner and review highlights">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[0.9fr_1fr_1fr_1fr] lg:gap-4">
          <div className="flex flex-col justify-center rounded-[24px] border border-white bg-[linear-gradient(160deg,rgba(232,243,254,.95),rgba(214,232,251,.85))] p-6 text-center shadow-[0_18px_44px_-26px_rgba(20,90,200,.45)] sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
            <Users aria-hidden className="mx-auto size-11 fill-[#1F6FE0] text-[#1F6FE0] lg:mx-0" strokeWidth={1.5} />
            <p className="mt-1 font-display text-[clamp(44px,4vw,60px)] leading-none font-extrabold tracking-[-0.02em] text-[#0A52E0]">
              {num}
              {plus && <span className="ml-1.5 text-[0.7em]">+</span>}
            </p>
            <p className="mt-3 text-[16px] leading-snug text-[#0B1F4D]">
              <Label text={stat.label} />
            </p>
          </div>

          {shown.map((r, i) => (
            <article
              key={r.name}
              className={cn("flex flex-col rounded-[24px] bg-white p-5 shadow-[0_18px_44px_-26px_rgba(20,90,200,.45)]", i === 2 && "max-lg:hidden")}
            >
              <header className="flex items-center gap-3.5">
                <Image src={r.avatar} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[17px] font-bold text-[#0B1F4D]">{r.name}</p>
                  <ReviewDate iso={r.date} />
                </div>
                <GoogleIcon className="size-7 shrink-0 self-start" />
              </header>
              <div className="mt-1 flex items-center gap-1 pl-[70px] text-[#FBBC04] max-sm:pl-0">
                {Array.from({ length: r.rating }, (_, s) => (
                  <Star key={s} aria-hidden className="size-[18px] fill-current" strokeWidth={0} />
                ))}
                <BadgeCheck aria-label="Verified review" className="ml-1 size-5 fill-[#2A7BEA] text-white" />
              </div>
              <p className={cn("mt-3 text-[16px] leading-snug text-[#1F2A3C]", open !== i && "line-clamp-3")}>“{r.text}”</p>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="mt-auto inline-flex w-fit items-center gap-1.5 pt-3 text-[16px] font-bold text-[#1A5FE0] hover:underline"
              >
                {open === i ? "Show less" : "Read more"}
                {open !== i && <ArrowRight aria-hidden className="size-4" strokeWidth={2.5} />}
              </button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
