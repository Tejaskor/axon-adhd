import { InnerPage, innerPageMetadata } from "@/components/sections/InnerPage";
import { accommodationPage } from "@/content/pages/accommodation";

export const metadata = innerPageMetadata(accommodationPage);

export default function Page() {
  return <InnerPage page={accommodationPage} />;
}
