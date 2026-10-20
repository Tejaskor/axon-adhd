import { InnerPage, innerPageMetadata } from "@/components/sections/InnerPage";
import { universityReferralPage } from "@/content/pages/referral";

export const metadata = innerPageMetadata(universityReferralPage);

export default function Page() {
  return <InnerPage page={universityReferralPage} />;
}
