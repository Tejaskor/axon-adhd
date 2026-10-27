import { contactSection } from "@/content/home";
import { AccommodationContact } from "./AccommodationSections";

/**
 * Standard contact section (blog, case studies, content pages): the shared compact contact design with the home
 * page's copy. AccommodationContact's built-in title, points, help box and form intro are identical to `contactSection`;
 * the description comes from it here, and there is no eyebrow or field placeholders, as before.
 */
export function ContactSection() {
  return <AccommodationContact eyebrow={null} description={contactSection.subtitle} placeholders={false} compact />;
}
