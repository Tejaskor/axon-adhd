import type { Block } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks } from "@/components/ui/RichText";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Shared template for Terms, Privacy and Telehealth policies. */
export function LegalPage({ title, path, blocks }: { title: string; path: string; blocks: Block[] }) {
  return (
    <>
      <section className="-mt-[var(--header-height)] bg-gradient-to-b from-primary-soft to-white pt-[140px] pb-8">
        <Container className="max-w-[900px]">
          <h1 className="font-display text-[30px] leading-tight font-bold text-navy sm:text-[42px]">{title}</h1>
        </Container>
      </section>
      <Container className="max-w-[900px] pb-20">
        <div className="prose-axon [&>p:first-child]:text-[18px]">
          <Blocks blocks={blocks} />
        </div>
      </Container>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: title, path }])} />
    </>
  );
}
