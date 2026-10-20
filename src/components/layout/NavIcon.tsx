import { BookOpen, ClipboardCheck, FileText, GraduationCap, HeartPulse, ScrollText, Stethoscope } from "lucide-react";
import type { MegaLink } from "@/content/nav";

const icons = {
  assessment: ClipboardCheck,
  care: HeartPulse,
  advocacy: ScrollText,
  university: GraduationCap,
  pcp: Stethoscope,
  blog: BookOpen,
  case: FileText,
} satisfies Record<MegaLink["icon"], unknown>;

export function NavIcon({ name, className }: { name: MegaLink["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden className={className} />;
}
