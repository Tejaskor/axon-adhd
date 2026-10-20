import Image from "next/image";
import { Star } from "lucide-react";
import { site } from "@/content/site";
import { trustBar } from "@/content/trust";

export function TrustBar() {
  return (
    <ul aria-label="Why people trust AXON ADHD" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
      <li className="flex items-center gap-2.5">
        <Image src={trustBar.google.src} alt={trustBar.google.alt} width={22} height={22} />
        <span className="flex text-orange-star" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </span>
        <span className="text-[14px] font-semibold text-ink-2">
          {trustBar.rating} <span className="font-normal text-muted">{trustBar.reviews}</span>
          <span className="sr-only"> on Google</span>
        </span>
      </li>
      <li className="flex items-center gap-3">
        <span className="flex -space-x-2.5">
          {trustBar.avatars.map((a) => (
            <Image key={a.src} src={a.src} alt="" width={38} height={38} className="size-[38px] rounded-full border-2 border-white object-cover" />
          ))}
        </span>
        <span className="text-[14px] font-semibold text-ink-2">{trustBar.helped}</span>
      </li>
      <li>
        <a href={site.psychologyTodayUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Image src={trustBar.psychologyToday.src} alt={trustBar.psychologyToday.alt} width={200} height={96} className="h-10 w-auto" />
        </a>
      </li>
    </ul>
  );
}
