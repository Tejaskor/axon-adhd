import { LegalPage } from "@/components/sections/LegalPage";
import { termsBlocks } from "@/content/legal/terms";
import { pageMetadata } from "@/lib/seo";

const title = "AXON ADHD Terms & Conditions";

export const metadata = pageMetadata({ title, description: "The terms that govern use of AXON ADHD screening, evaluation, telehealth and SMS services.", path: "/terms-conditions/" });

export default function Page() {
  return <LegalPage title={title} path="/terms-conditions/" blocks={termsBlocks} />;
}
