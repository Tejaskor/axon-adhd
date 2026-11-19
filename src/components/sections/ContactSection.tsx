import { contactSection } from "@/content/home";
import { AccommodationContact } from "./AccommodationSections";
import { PcpContactLeft } from "./PcpContactLeft";
import { UniversityContactLeft } from "./UniversityContactLeft";

/**
 * Standard contact section (blog, case studies, content pages): the shared compact contact design with the home
 * page's copy. AccommodationContact's built-in title, points, help box and form intro are identical to `contactSection`;
 * the description comes from it here, and there is no eyebrow.
 */
export function ContactSection({ variant }: { variant?: "university" | "pcp" } = {}) {
  return <AccommodationContact eyebrow={null} description={contactSection.subtitle} compact left={variant === "university" ? <UniversityContactLeft /> : variant === "pcp" ? <PcpContactLeft /> : undefined} />;
}
