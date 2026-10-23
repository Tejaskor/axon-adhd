import { cn } from "@/lib/utils";
import { FeatureIcon, type IconName } from "./FeatureIcon";

/** Brand tints for glass cards — green, blue, orange — cycled by index. */
const tones = [
  { card: "from-[#22C083]/[0.12] to-white border-[#22C083]/30 hover:border-[#22C083]/60", disc: "from-[#4FE0AE] to-[#16A56E]", glow: "shadow-[0_10px_30px_rgba(34,192,131,.35)]" },
  { card: "from-[#2578CA]/[0.12] to-white border-[#2578CA]/30 hover:border-[#2578CA]/60", disc: "from-[#4C9BEF] to-[#1D63B8]", glow: "shadow-[0_10px_30px_rgba(37,120,202,.35)]" },
  { card: "from-[#EB8B01]/[0.12] to-white border-[#EB8B01]/30 hover:border-[#EB8B01]/60", disc: "from-[#FFC15A] to-[#E08200]", glow: "shadow-[0_10px_30px_rgba(235,139,1,.35)]" },
];

type GlassCardProps = { index: number; icon?: IconName; title?: string; text?: string };

/**
 * Horizontal glass card (About "Our Mission" style): tinted frosted panel, glowing icon disc, copy on the right.
 * With a `title` it renders title + text; without one, `text` is the card's single statement.
 */
export function GlassCard({ index, icon, title, text }: GlassCardProps) {
  const tone = tones[index % tones.length];
  return (
    <div
      className={cn(
        "group flex w-full items-center gap-4 rounded-[20px] border bg-gradient-to-br p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_14px_36px_rgba(6,26,54,.07)] backdrop-blur-xl transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_22px_44px_rgba(6,26,54,.12)] sm:gap-6 sm:p-7 lg:gap-4 lg:p-5 xl:p-6",
        tone.card,
      )}
    >
      {icon && (
        <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-full border border-white/50 bg-gradient-to-br transition-transform duration-300 ease-brand group-hover:scale-105 sm:size-[88px] lg:size-[72px]", tone.disc, tone.glow)}>
          <FeatureIcon name={icon} className="size-8 stroke-[1.5] text-white sm:size-11 lg:size-9" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        {title ? (
          <>
            <h3 className="font-inter text-[19px] leading-snug font-semibold text-navy sm:text-[22px] lg:text-[19px] xl:text-[20px]">{title}</h3>
            {text && <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px] lg:text-[14px]">{text}</p>}
          </>
        ) : (
          <p className="font-inter text-[17px] leading-snug font-semibold text-navy sm:text-[19px] lg:text-[18px] xl:text-[19px]">{text}</p>
        )}
      </div>
    </div>
  );
}
