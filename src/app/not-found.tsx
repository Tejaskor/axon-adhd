import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headset, House, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

const NAVY = "text-[#0A2A5E]";

/** Paper plane with its dashed flight path, tucked above the last "4". */
function PaperPlane({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 170 90" fill="none" className={className}>
      <path d="M4 66C30 78 62 74 100 50" stroke="#1F5FBF" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 8" />
      <path d="M104 40L150 8 134 56 118 44 106 62 104 40Z" stroke="#1F5FBF" strokeWidth="3" strokeLinejoin="round" />
      <path d="M104 40L134 56M106 62l12-18" stroke="#1F5FBF" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section
      className="-mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] pt-[calc(var(--header-height)+32px)] pb-12 sm:pb-16 lg:pt-[calc(var(--header-height)+48px)]"
      aria-labelledby="not-found-title"
    >
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6">
          <div>
            <div className="relative w-fit">
              <PaperPlane className="absolute -top-3 -right-16 hidden h-16 w-auto sm:block lg:-top-6 lg:-right-24 lg:h-20" />
              <p aria-hidden className={`text-[clamp(112px,26vw,260px)] leading-[0.85] font-extrabold tracking-[-0.04em] ${NAVY}`}>
                404
              </p>
            </div>
            <h1 id="not-found-title" className={`mt-3 text-[clamp(30px,5vw,52px)] leading-[1.15] font-bold tracking-[-0.02em] ${NAVY}`}>
              <span className="sr-only">404: </span>Oops! Page Not Found
            </h1>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.7] text-[#1F2D4A] sm:text-[20px]">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-10">
              <Link
                href="/"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#015EA7] px-8 text-[16px] font-semibold text-white shadow-[0_12px_26px_-10px_rgba(1,94,167,.6)] transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#015EA7]"
              >
                <House aria-hidden className="size-5" />
                Go Back Home
                <ArrowRight aria-hidden className="size-5" />
              </Link>
              <Link
                href="/adult-adhd-assessment/"
                className={`group inline-flex items-center gap-3 text-[16px] font-semibold sm:text-[18px] ${NAVY} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#015EA7]`}
              >
                <span className="border-b-2 border-[#0A2A5E] pb-1">Browse Our Services</span>
                <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Transparent PNG-style cut-out: the illustration sits directly on the page gradient. */}
          <Image
            src="/images/not-found/axon-adhd-404-confused-brain-mascot.webp"
            alt="Worried cartoon brain holding a 404 sign beside a potted plant, with a question mark above"
            width={672}
            height={515}
            priority
            sizes="(max-width: 1180px) 90vw, 600px"
            style={{
              // Soft-fade the cut edges so the blob and floor shadow melt into the page gradient.
              maskImage: "linear-gradient(to right, transparent 0, #000 5%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 4%, #000 90%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 5%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 4%, #000 90%, transparent 100%)",
              WebkitMaskComposite: "source-in",
            }}
            className="mx-auto h-auto w-full max-w-[420px] sm:max-w-[520px] lg:ml-auto lg:max-w-[640px]"
          />
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 rounded-[28px] bg-[#E0EDFE] px-5 py-6 sm:mt-14 sm:flex-row sm:items-center sm:gap-6 sm:px-8 lg:px-12">
          <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-[#074D97] text-white sm:size-16">
            <Headset className="size-7 sm:size-8" strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className={`text-[20px] leading-tight font-bold sm:text-[24px] ${NAVY}`}>Need Help?</h2>
            <p className="mt-1 text-[15px] leading-snug text-[#1F2D4A] sm:text-[17px]">If you think something is missing, feel free to contact our support team.</p>
          </div>
          <span aria-hidden className="hidden h-14 w-px shrink-0 bg-[#9BB3D4] lg:block" />
          <Link
            href="/#contact"
            className="inline-flex h-14 w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#043C83] px-8 text-[16px] font-semibold text-white transition-[filter] hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#043C83] sm:w-auto"
          >
            <Mail aria-hidden className="size-5" />
            Contact Us
            <ArrowRight aria-hidden className="size-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
