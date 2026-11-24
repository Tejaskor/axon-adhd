import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/content/site";

/** Height of the bar (button + padding), reused as the spacer under the footer so the bar never covers its last line. */
const BAR = "h-[calc(72px+env(safe-area-inset-bottom))]";

/** Phones only (<768px): "Start Free Assessment" pinned to the bottom of the screen, above the iOS home indicator. */
export function MobileStickyCta() {
  return (
    <>
      <div aria-hidden className={`${BAR} bg-[#061A36] md:hidden`} />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-primary-150 bg-white/95 px-3 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,27,46,.12)] backdrop-blur-md md:hidden">
        <ButtonLink href={links.freeScreening} size="lg" className="w-full">
          Start Free Assessment
        </ButtonLink>
      </div>
    </>
  );
}
