import Image from "next/image";
import { InnerPage, innerPageMetadata } from "@/components/sections/InnerPage";
import { Container } from "@/components/ui/Container";
import { aboutPage, founder } from "@/content/pages/about";
import { site } from "@/content/site";

export const metadata = innerPageMetadata(aboutPage);

export default function AboutPage() {
  return (
    <InnerPage page={aboutPage}>
      <section id="Meet" className="scroll-mt-[var(--header-offset)] py-16 sm:py-20" aria-labelledby="founder-title">
        <Container>
          <h2 id="founder-title" className="mb-10 text-center font-display text-[28px] font-bold text-navy sm:text-[40px]">
            Meet Our Founder
          </h2>
          <div className="mx-auto grid max-w-[1000px] items-center gap-8 rounded-xl2 border border-line-2 bg-white p-6 shadow-soft sm:p-10 md:grid-cols-[240px_1fr]">
            <Image src={founder.image.src} alt={founder.image.alt} width={founder.image.width} height={founder.image.height} className="mx-auto size-[200px] rounded-full object-cover ring-4 ring-primary-soft md:size-[240px]" />
            <div>
              <h3 className="text-[24px] font-bold text-navy">{founder.name}</h3>
              <p className="mt-1 text-[15px] font-medium text-primary">{founder.title}</p>
              <p className="mt-4 text-[16px] leading-[1.75] text-body">{founder.bio}</p>
              <p className="mt-4 text-[16px] leading-[1.75] text-body">{site.blurb}</p>
            </div>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
