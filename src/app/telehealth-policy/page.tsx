import { LegalPage } from "@/components/sections/LegalPage";
import { telehealthBlocks } from "@/content/legal/telehealth";
import { pageMetadata } from "@/lib/seo";

const title = "Telehealth Policy and Informed Consent";

export const metadata = pageMetadata({ title, description: "How AXON delivers behavioral health services remotely, including benefits, risks, confidentiality and your consent.", path: "/telehealth-policy/" });

export default function Page() {
  return <LegalPage title={title} path="/telehealth-policy/" blocks={telehealthBlocks} />;
}
