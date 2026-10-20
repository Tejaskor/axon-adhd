import { InnerPage, innerPageMetadata } from "@/components/sections/InnerPage";
import { comprehensiveAssessmentPage } from "@/content/pages/comprehensive-assessment";

export const metadata = innerPageMetadata(comprehensiveAssessmentPage);

export default function Page() {
  return <InnerPage page={comprehensiveAssessmentPage} />;
}
