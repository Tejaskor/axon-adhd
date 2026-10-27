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
          <h2 id="founder-title" className="type-h2 mb-10 text-center text-navy">
            Meet Our Founder
          </h2>
          <div className="mx-auto grid max-w-[1000px] items-center gap-8 rounded-xl2 border border-line-2 bg-white p-6 shadow-soft sm:p-10 md:grid-cols-[240px_1fr]">
            <Image src={founder.image.src} alt={founder.image.alt} width={founder.image.width} height={founder.image.height} className="mx-auto size-[200px] rounded-full object-cover ring-4 ring-primary-soft md:size-[240px]" />
            <div>
              <h3 className="type-h3 text-navy">{founder.name}</h3>
              <p className="type-body mt-1 font-medium text-primary">{founder.title}</p>
              <p className="type-body mt-4 text-body">{founder.bio}</p>
              <p className="type-body mt-4 text-body">{site.blurb}</p>
            </div>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
