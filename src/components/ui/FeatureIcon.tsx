import {
  Award,
  BadgeCheck,
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  Clock,
  FileCheck2,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Lock,
  MessagesSquare,
  Pill,
  Receipt,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const icons = {
  award: Award,
  badge: BadgeCheck,
  calendar: CalendarCheck,
  schedule: CalendarClock,
  clipboard: ClipboardList,
  clock: Clock,
  filecheck: FileCheck2,
  file: FileText,
  flask: FlaskConical,
  graduation: GraduationCap,
  handshake: HeartHandshake,
  heart: HeartPulse,
  lock: Lock,
  chat: MessagesSquare,
  pill: Pill,
  receipt: Receipt,
  shield: ShieldCheck,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  target: Target,
  trend: TrendingUp,
  user: UserCheck,
  users: Users,
  screening: ClipboardList,
  assessment: FileCheck2,
  care: HeartPulse,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function FeatureIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden className={className} />;
}
