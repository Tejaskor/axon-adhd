import { ArrowRight } from "lucide-react";
import { announcement } from "@/content/site";

export function AnnouncementBar() {
  return (
    <div className="bg-[image:var(--announce-bg)] font-ui text-white">
      <p className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center text-[13px] sm:text-[14px]">
        <span className="inline-flex items-center gap-1.5">
          {announcement.text}
          <ArrowRight aria-hidden className="size-4" />
        </span>
        <a href={announcement.cta.href} className="font-semibold text-[#FFE7A3] underline underline-offset-4 hover:text-white">
          {announcement.cta.label}
        </a>
      </p>
    </div>
  );
}
