import { InnerPage, innerPageMetadata } from "@/components/sections/InnerPage";
import { adhdCarePage } from "@/content/pages/adhd-care";

export const metadata = innerPageMetadata(adhdCarePage);

export default function Page() {
  return <InnerPage page={adhdCarePage} />;
}
