import type { PageHero } from "@/content/pages/types";
import { AdhdCareHero } from "./AdhdCareSections";
import { NetworkRing } from "./PageSections";

/** ADHD Referral for Universities hero: the ADHD Care page's hero (same layout, type, background, buttons and trust row) with the partner network on the right. */
export function UniversityReferralHero({ data }: { data: PageHero }) {
  return <AdhdCareHero data={data} visual={<NetworkRing data={data} compact />} />;
}
