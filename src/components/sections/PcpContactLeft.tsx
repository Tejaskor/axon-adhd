import Image from "next/image";
import { FileText, Handshake, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const points: Array<{ label: string; Icon: LucideIcon }> = [
  { label: "Identify at-risk patients earlier", Icon: Users },
  { label: "Get clear, objective assessment reports", Icon: FileText },
  { label: "Coordinate care without adding staff burden", Icon: Handshake },
];

/** Left half of the Referral ADHD Partners contact section: left-aligned headline and intro, three icon rows, and the clinician photo in its pill shape, blended into the background. */
export function PcpContactLeft() {
  return (
    <Reveal>
      <div className="mx-auto max-w-[640px]">
        <h2 className="type-h2 text-navy text-balance">
          Better ADHD care for <br className="max-sm:hidden" />
          your patients{" "}
          <span className="relative inline-block text-primary">
            starts here
            <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[4%] -bottom-[0.2em] h-[0.2em] w-[92%]" fill="none">
              <path d="M2 10 C 70 2, 190 2, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="mt-4 max-w-[560px] text-[18px] leading-[1.6] text-pretty text-[#33465E] sm:text-[19px]">
          A trusted clinical partner helping primary care providers identify ADHD, gain diagnostic clarity, and coordinate next steps for patients.
        </p>
        <ul className="mt-5 space-y-3.5">
          {points.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-4">
              <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-[#E3EEFC] text-primary shadow-[0_6px_14px_-8px_rgba(37,120,202,.5)]">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <span className="text-[16px] font-semibold text-navy sm:text-[17px]">{label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 -ml-2 sm:-ml-4">
          <Image
            src="/images/referral-for-pcp/pcp-referral-contact-doctor-and-patient.webp"
            alt="A smiling doctor speaking with a patient in a bright clinic"
            width={1949}
            height={807}
            sizes="(max-width: 767px) 94vw, 640px"
            className="h-auto w-full mix-blend-multiply"
          />
        </div>
      </div>
    </Reveal>
  );
}
