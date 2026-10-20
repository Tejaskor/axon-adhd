import { LegalPage } from "@/components/sections/LegalPage";
import { privacyBlocks } from "@/content/legal/privacy";
import { pageMetadata } from "@/lib/seo";

const title = "AXON ADHD Privacy Policy";

export const metadata = pageMetadata({ title, description: "How AXON ADHD collects, uses, protects and shares personal and health information, including HIPAA-protected PHI.", path: "/axon-adhd-privacy-policy/" });

export default function Page() {
  return <LegalPage title={title} path="/axon-adhd-privacy-policy/" blocks={privacyBlocks} />;
}
