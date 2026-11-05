import type { ReactNode } from "react";
import type { Block } from "@/content/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks, Inline } from "@/components/ui/RichText";
import { breadcrumbJsonLd } from "@/lib/seo";
import { slugify } from "@/lib/utils";

/** Light-blue page ground shared by the legal pages and the site map. */
export const legalBg = "bg-[#E7F1FD]";

/** Centered page header: title, optional intro lines, then a divider (legal pages and the site map). */
export function PageIntro({ title, path, width = "max-w-[1340px]", children }: { title: string; path: string; width?: string; children?: ReactNode }) {
  return (
    <section className={`-mt-[var(--header-height)] ${legalBg} px-4 pt-[124px] sm:pt-[132px]`}>
      <div className={`mx-auto w-full ${width} border-b border-[#CFDDEE] pb-8 text-center sm:pb-10`}>
        <h1 className="font-display text-[28px] leading-tight font-bold tracking-[-0.02em] text-balance text-[#111827] sm:text-[34px] lg:text-[38px]">{title}</h1>
        {children}
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: title, path }])} />
    </section>
  );
}

/** Policy text inside a section card: site font, gray copy, bold black sub-headings, blue list markers. */
const sectionProse = [
  "font-sans text-[15px] leading-[1.75] text-[#4B5563] break-words sm:text-[16px]",
  "[&_p]:my-2.5 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  "[&_h3]:mt-5 [&_h3]:mb-1.5 [&_h3]:font-sans [&_h3]:text-[15.5px] [&_h3]:font-bold [&_h3]:text-[#111827] sm:[&_h3]:text-[16.5px]",
  "[&_h4]:mt-4 [&_h4]:mb-1 [&_h4]:font-sans [&_h4]:text-[15px] [&_h4]:font-bold [&_h4]:text-[#111827] sm:[&_h4]:text-[16px]",
  "[&_ul]:my-2.5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:marker:text-primary",
  "[&_ol]:my-2.5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_ol]:marker:font-semibold [&_ol]:marker:text-primary",
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-hover",
  "[&_strong]:font-semibold [&_strong]:text-[#111827]",
].join(" ");

type Section = { title: string; id: string; blocks: Block[] };

/**
 * Shared template for Terms, Privacy and Telehealth policies: centered header (title, lead paragraph and the effective-date
 * line), then each numbered section in its own white card. Everything before the first numbered heading is the introduction.
 */
export function LegalPage({ title, path, blocks }: { title: string; path: string; blocks: Block[] }) {
  const firstSection = blocks.findIndex((b) => b.type === "h2");
  const intro = firstSection === -1 ? [] : blocks.slice(0, firstSection);
  const [lead, ...meta] = intro;

  const sections: Section[] = [];
  for (const b of firstSection === -1 ? blocks : blocks.slice(firstSection)) {
    if (b.type === "h2" && "text" in b) sections.push({ title: b.text, id: slugify(b.text), blocks: [] });
    else sections.at(-1)?.blocks.push(b);
  }

  return (
    <>
      <PageIntro title={title} path={path}>
        {lead && "text" in lead && (
          <p className="mx-auto mt-4 max-w-[640px] font-sans text-[16px] leading-[1.7] text-pretty text-[#4B5563] sm:text-[17px]">
            <Inline text={lead.text} />
          </p>
        )}
        {meta.map((m, i) =>
          "text" in m ? (
            <p key={i} className="mx-auto mt-3 max-w-[760px] font-sans text-[13px] leading-relaxed text-[#6B7280] sm:text-[14px]">
              <Inline text={m.text} />
            </p>
          ) : null,
        )}
      </PageIntro>

      <div className={`${legalBg} px-4 pt-8 pb-16 sm:pt-10 sm:pb-20`}>
        <div className="mx-auto w-full max-w-[1340px] space-y-3.5 sm:space-y-4">
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="rounded-[14px] bg-white px-5 py-6 shadow-[0_2px_10px_rgba(15,27,46,.05)] sm:px-7 sm:py-7">
              <h2 id={`${s.id}-title`} className="flex items-start gap-2.5 font-sans text-[17px] leading-snug font-bold text-[#163E78] sm:text-[18px]">
                <span aria-hidden className="mt-[0.5em] size-[7px] shrink-0 rounded-full bg-primary" />
                <span>
                  <Inline text={s.title} />
                </span>
              </h2>
              <div className={`mt-3.5 ml-[3px] border-l-2 border-[#D7E2F0] pl-4 sm:pl-5 ${sectionProse}`}>
                <Blocks blocks={s.blocks} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
