import Image from "next/image";
import { Star } from "lucide-react";
import { site } from "@/content/site";
import { trustBar } from "@/content/trust";

/** Hairline divider between trust items (desktop row only; hidden once items stack on phones). */
function Separator() {
  return <li aria-hidden className="hidden h-14 w-px shrink-0 bg-line-3 sm:block" />;
}

/** Google rating · adults helped · Psychology Today badge — one aligned row from 768px, stacked on phones (live layout). */
export function TrustBar() {
  return (
    <ul aria-label="Why people trust AXON ADHD" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5 lg:gap-x-7">
      <li className="flex items-center gap-3">
        <Image src={trustBar.google.src} alt={trustBar.google.alt} width={40} height={40} className="size-9 lg:size-10" />
        <span className="flex flex-col gap-1">
          <span className="flex gap-1 text-orange-star" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-[18px] fill-current" />
            ))}
          </span>
          <span className="text-[15px] font-semibold text-ink-2">
            {trustBar.rating} <span className="font-normal text-muted">{trustBar.reviews}</span>
            <span className="sr-only"> on Google</span>
          </span>
        </span>
      </li>
      <Separator />
      <li className="flex flex-col items-center gap-1.5">
        <span className="flex -space-x-2.5">
          {trustBar.avatars.map((a) => (
            <Image key={a.src} src={a.src} alt="" width={38} height={38} className="size-[38px] rounded-full border-2 border-white object-cover shadow-soft" />
          ))}
        </span>
        <span className="max-w-[140px] text-center text-[12.5px] leading-[1.35] font-semibold text-ink-2">{trustBar.helped}</span>
      </li>
      <Separator />
      <li>
        {/* The badge artwork includes its own pill + whitespace, so it is sized by height and pulled in vertically. */}
        <a href={site.psychologyTodayUrl} target="_blank" rel="noopener noreferrer" className="-my-3 block">
          <Image src={trustBar.psychologyToday.src} alt={trustBar.psychologyToday.alt} width={200} height={96} className="h-[76px] w-auto lg:h-[88px]" />
        </a>
      </li>
    </ul>
  );
}
