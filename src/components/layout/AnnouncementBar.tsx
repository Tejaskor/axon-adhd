import { ArrowRight, Brain } from "lucide-react";
import { announcement } from "@/content/site";

export function AnnouncementBar() {
  return (
    <div className="bg-[image:var(--announce-bg)] font-ui text-white">
      <p className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-4 py-2.5 text-center text-[12.5px] leading-[1.4] font-medium sm:gap-x-3 sm:py-[11px] min-[561px]:text-[13px] min-[561px]:leading-[1.45] lg:py-3 lg:text-[13.5px]">
        <span className="inline-flex items-center gap-2">
          <Brain aria-hidden className="size-4 shrink-0 text-white" />
          {announcement.text}
          <ArrowRight aria-hidden className="size-4 shrink-0" />
        </span>
        <a href={announcement.cta.href} className="announce-pulse inline-block rounded-[4px] font-bold whitespace-nowrap text-[#FFB547] [text-shadow:0_1px_3px_rgba(0,0,0,.15)] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          {announcement.cta.label}
        </a>
      </p>
    </div>
  );
}
