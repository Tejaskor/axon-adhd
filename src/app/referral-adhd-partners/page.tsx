import { InnerPage, innerPageMetadata } from "@/components/sections/InnerPage";
import { pcpReferralPage } from "@/content/pages/referral";

export const metadata = innerPageMetadata(pcpReferralPage);

export default function Page() {
  return <InnerPage page={pcpReferralPage} />;
}
