import Image from "next/image";
import { ClipboardList, Handshake, UserSearch } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { label: "Early Identification", Icon: UserSearch },
  { label: "Simple Referrals", Icon: Handshake },
  { label: "Clear Next Steps", Icon: ClipboardList },
] as const;

/**
 * Left half of the ADHD Referral for Universities contact section, laid out like the design: a big two-line headline (the last words blue
 * with a hand-drawn underline), a two-line intro, three promises on a thin arc (the middle one raised) and, tucked up under them, the
 * campus photo. The photo is softened (paler, less saturated), faded into the section background along its top and sides and cut
 * to a lens shape along the bottom, so it reads as part of the page rather than a pasted-in rectangle.
 */
export function UniversityContactLeft() {
  return (
    <Reveal>
      <div className="mx-auto max-w-[760px] text-center">
        <h2 className="type-h2 text-navy text-balance">
          <span className="block">Better support</span>
          <span className="block">
            for students{" "}
            <span className="relative inline-block text-primary">
              starts here
              <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[2%] -bottom-[0.22em] h-[0.2em] w-[96%]" fill="none">
                <path d="M2 10 C 70 2, 190 2, 298 8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-[20px] leading-[1.7] text-pretty text-[#5B6B80]">
          A trusted partner for universities to identify students who may need mental-health screening and ADHD support.
        </p>
      </div>

      <div className="relative mx-auto mt-4 max-w-[780px] sm:mt-6">
        {/* The photo sits underneath; the arc and the three promises are drawn over its pale sky. */}
        <div
          className="relative mt-32 overflow-hidden sm:mt-[3.25rem] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_34%,#000_100%),linear-gradient(to_right,transparent_0%,#000_14%,#000_86%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
          style={{ borderRadius: "0 0 50% 50% / 0 0 26% 26%" }}
        >
          <Image
            src="/images/referral-for-universities/adhd-referral-for-universities-contact-section.webp"
            alt="Four students with backpacks looking toward a university hall on a sunny campus"
            width={1774}
            height={887}
            sizes="(max-width: 767px) 94vw, 740px"
            className="aspect-[16/10] h-auto w-full object-cover object-[50%_45%] [filter:saturate(.72)_brightness(1.07)_contrast(.94)]"
          />
          {/* A pale veil that melts the sky into the section background, and a soft wash over the whole picture. */}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(228,239,252,.95)_0%,rgba(228,239,252,.55)_30%,rgba(228,239,252,.12)_62%,transparent_100%)]" />
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[#E7F0FC]/18" />
        </div>

        <div className="absolute inset-x-0 top-0">
          <svg aria-hidden viewBox="0 0 780 120" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-0 top-3 h-24 w-full">
            <path d="M140 84C270 6 510 6 640 84" stroke="#9CC3F0" strokeWidth="2" />
          </svg>
          <ul className="relative mx-auto grid max-w-[720px] grid-cols-3 items-start">
            {steps.map(({ label, Icon }, i) => (
              <li key={label} className={i === 1 ? "flex flex-col items-center text-center" : "mt-9 flex flex-col items-center text-center sm:mt-11"}>
                <span aria-hidden className="grid size-[58px] place-items-center rounded-full bg-white text-primary shadow-[0_10px_26px_-10px_rgba(37,120,202,.55)] sm:size-[66px]">
                  <Icon className="size-7 sm:size-8" strokeWidth={1.7} />
                </span>
                <span className="mt-2 max-w-[120px] text-[15px] leading-tight font-semibold text-navy sm:text-[16px]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
