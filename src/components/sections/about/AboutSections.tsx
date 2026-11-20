import Image from "next/image";
import { Award, Building2, CheckCircle2, GraduationCap, Laptop, Layers, Mail, MapPin, Mic, Phone, PhoneCall, ShieldCheck, Star, UserRound, Users, Zap } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { aboutPage, founder } from "@/content/pages/about";
import type { CtaSection, FeaturesSection, PageHero, SplitSection } from "@/content/pages/types";
import { trustBar } from "@/content/trust";
import { TealBanner } from "@/components/sections/TealBanner";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { PathCard } from "@/components/sections/AdhdCareSections";
import { cn } from "@/lib/utils";

/*
 * About page only. Brand colours live in CSS variables set on the page root (see AboutSections), so nothing here
 * touches global styles, the header or the footer.
 *   --ab-blue #1769D2 · --ab-green #16B65B · --ab-orange #F59E0B · --ab-navy #102B50 · --ab-soft #F5F9FF
 */
const vars = "[--ab-blue:#1769D2] [--ab-green:#16B65B] [--ab-orange:#F59E0B] [--ab-navy:#102B50] [--ab-soft:#F5F9FF]";
const wrap = "mx-auto w-full max-w-[1372px] px-4";
const h2 = "type-h2 text-balance text-navy";
/** Homepage body copy: 20px / 1.7 in the site's body grey. */
const body = "text-[20px] leading-[1.7] text-pretty text-body";
/** The two section backgrounds the homepage alternates between. */
const bgA = "bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]";
const bgB = "bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)]";
/** A list row styled like the site's small cards (white, soft border and shadow). */
const row = "rounded-[20px] border border-primary-100 bg-white/70 shadow-[0_18px_40px_-24px_rgba(18,61,106,.3)] backdrop-blur-md";

/** Renders `text`, colouring each listed phrase in AXON blue. */
function Accent({ text, words }: { text: string; words: string[] }) {
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return (
    <>
      {text.split(re).map((part, i) =>
        words.includes(part) ? (
          <span key={i} className="text-primary">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function Checks({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-6 space-y-3">
      {items.map((t) => (
        <li key={t} data-fx-item className="flex items-start gap-3 text-[18px] leading-snug font-medium text-navy sm:text-[19px]">
          <CheckCircle2 aria-hidden className="mt-0.5 size-[22px] shrink-0 fill-[var(--ab-green)] text-white" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Hero({ data }: { data: PageHero }) {
  const [lead, accent] = data.title.split(/(?=That’s)/);
  const [helpedBold, helpedRest] = trustBar.helped.split(/(?<=Helped) /);
  return (
    <section
      className="relative isolate -mt-[var(--header-height)] overflow-hidden bg-[#E8F2FF] pt-[130px] pb-[90px] sm:pt-[150px] sm:pb-[110px]"
      aria-labelledby="page-title"
    >
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-2 lg:gap-12")}>
        <Reveal>
          <h1 id="page-title" className="type-h1 text-navy max-w-[960px]">
            {lead.trim()}{" "}
            {accent && (
              <span className="box-decoration-clone bg-[linear-gradient(#A9CBF8,#A9CBF8)] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-1.5 font-bold text-primary">{accent.trim()}
              </span>
            )}
          </h1>
          {data.text.map((t) => (
            <p key={t} className="mt-6 max-w-[780px] text-[20px] leading-[1.7] text-pretty text-[#242A3C]">
              {t}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
            <div className="flex items-center gap-3">
              <Image src={trustBar.google.src} alt={trustBar.google.alt} width={44} height={44} className="size-10 sm:size-11" />
              <div>
                <span className="flex gap-0.5 text-[var(--ab-orange)]" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-[18px] fill-current" />
                  ))}
                </span>
                <p className="mt-0.5 text-[15px] font-semibold text-[#0F1B33]">
                  {trustBar.rating} <span className="font-normal text-[#5B6B80]">{trustBar.reviews}</span>
                  <span className="sr-only"> on Google</span>
                </p>
              </div>
            </div>
            <span aria-hidden className="hidden h-12 w-px bg-[#D3DCE8] sm:block" />
            <div className="flex items-center gap-4">
              <span className="flex -space-x-3">
                {trustBar.avatars.map((a) => (
                  <Image key={a.src} src={a.src} alt="" width={48} height={48} className="size-11 rounded-full border-2 border-white object-cover shadow-sm sm:size-12" />
                ))}
              </span>
              <p className="text-[15px] leading-snug sm:text-[17px]">
                <span className="block font-bold text-[#0F1B33]">{helpedBold}</span>
                <span className="block text-[#4A5568]">{helpedRest}</span>
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
          <video
            src="/images/about/Aboutgif.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={data.image.alt}
            className="block aspect-video h-auto w-full object-cover mix-blend-multiply [filter:brightness(1.12)_contrast(1.08)] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,#000_55%,transparent_100%)]"
          />
        </Reveal>
      </div>
    </section>
  );
}

const cardTones = ["blue", "orange", "green"] as const;

function Mission({ data }: { data: FeaturesSection }) {
  return (
    <section className={cn("relative isolate overflow-hidden section-py", bgA)} aria-labelledby="mission-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2 id="mission-title" className={h2}>
            <Accent text={data.title} words={["Clarity"]} />
          </h2>
          {data.subtitle && <p className={cn(body, "mt-4")}>{data.subtitle}</p>}
        </Reveal>
        <ul className="mx-auto mt-12 grid max-w-[1100px] gap-5 sm:grid-cols-3 lg:mt-14 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={i * 0.06} className="flex w-full">
                <PathCard tone={cardTones[i % 3]} center icon={item.icon ? <FeatureIcon name={item.icon} className="size-7" /> : null} title={item.title} text={item.text} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


/** "Why We Chose the Name AXON ADHD": pill + heading + intro + five icon rows, beside the neuron clip on a soft orb. */
function AxonName({ data }: { data: SplitSection }) {
  const para = data.paragraphs?.[0] ?? "";
  return (
    <section className={cn("relative isolate overflow-hidden section-py", bgB)} aria-labelledby="axon-title">
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-8")}>
        <Reveal>
          <h2 id="axon-title" className={h2}>
            {data.eyebrow} <span className="text-primary">{data.title}</span>
          </h2>
          {para && <p className={cn(body, "mt-5 max-w-[900px]")}>{para}</p>}
          <ul className="mt-7 max-w-[900px] list-disc space-y-3 pl-6 marker:text-navy">
            {data.features?.map((f) => (
              <li key={f.title} data-fx-item className="pl-2 text-[18px] leading-[1.6] text-navy sm:text-[19px]">
                {f.text ?? f.title}
              </li>
            ))}
          </ul>
        </Reveal>
        {data.image && (
          <Reveal delay={0.1} className="mx-auto w-full max-w-[260px] sm:max-w-[300px]">
            <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} unoptimized className="block h-auto w-full rounded-[26px]" />
          </Reveal>
        )}
      </div>
    </section>
  );
}

const transformPoints = [
  { icon: ShieldCheck, text: "Secure & Private Care" },
  { icon: Laptop, text: "Virtual & Accessible" },
  { icon: Users, text: "Connected Care Teams" },
] as const;

/** "Transforming ADHD Care with Science and Compassion": the heading centred on top, then two equal columns: the photo (stretched to the text column's height) and the paragraphs, check list and three icon cards. */
function Transforming({ data }: { data: SplitSection }) {
  const accent = "Science and Compassion";
  const [lead] = data.title.split(accent);
  return (
    <section className={cn("relative isolate overflow-hidden section-py", bgB)} aria-labelledby="ab-transforming">
      <div className={wrap}>
        <Reveal className="mx-auto mb-10 max-w-[900px] text-center lg:mb-14">
          <h2 id="ab-transforming" className={h2}>
            {lead}
            <span className="text-primary">{accent}</span>
          </h2>
        </Reveal>
        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
          <Reveal className="min-w-0">
            {data.image && <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 767px) 92vw, 620px" className="h-auto w-full rounded-[24px]" />}
            <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {transformPoints.map((c) => (
                <li key={c.text} data-fx-item className={cn(row, "flex items-center gap-3 px-4 py-3")}>
                  <c.icon aria-hidden className="size-8 shrink-0 text-primary" strokeWidth={1.6} />
                  <span className="text-[16px] leading-snug font-semibold text-navy">{c.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="flex min-w-0 flex-col justify-center">
            <div className="space-y-4">
              {data.paragraphs?.map((p) => (
                <p key={p} className={body}>
                  {p}
                </p>
              ))}
            </div>
            <Checks items={data.list} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Text + media row. `accent` words in the title turn AXON blue; media sits left unless `mediaRight`. With `topHeading` the heading is centred above two equal columns and the media is drawn a little larger. */
function MediaRow({ data, accent, mediaRight, bg, topHeading, fillMedia, children }: { data: SplitSection; accent: string[]; mediaRight?: boolean; bg: string; topHeading?: boolean; /** With `topHeading`: the image stretches to the height of the text column (cropped to fit) instead of being centred at its own size. */ fillMedia?: boolean; children?: ReactNode }) {
  const id = `ab-${data.title.slice(0, 16).replace(/\W+/g, "-").toLowerCase()}`;
  const heading = (
    <h2 id={id} className={h2}>
      <Accent text={data.title} words={accent} />
    </h2>
  );
  return (
    <section className={cn("relative isolate overflow-hidden section-py", bg)} aria-labelledby={id}>
      <div className={wrap}>
        {topHeading && <Reveal className="mx-auto mb-10 max-w-[900px] text-center lg:mb-14">{heading}</Reveal>}
        <div className={cn("grid gap-10 md:grid-cols-2", topHeading ? "items-stretch lg:gap-20" : "items-center lg:gap-16")}>
          <Reveal className={cn("min-w-0", mediaRight && "md:order-2", topHeading && !fillMedia && "flex items-center justify-center lg:scale-[1.1]", fillMedia && "relative aspect-[16/10] overflow-hidden rounded-[24px] md:aspect-auto md:min-h-[320px]")}>
            {children ??
              (data.video ? (
                <video src={data.video} autoPlay muted loop playsInline preload="none" aria-hidden className="block h-auto w-full rounded-[24px]" />
              ) : (
                data.image &&
                (fillMedia ? (
                  <Image src={data.image.src} alt={data.image.alt} fill sizes="(max-width: 767px) 92vw, 620px" className="object-cover object-center" />
                ) : (
                  <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 90vw, 620px" className="h-auto w-full rounded-[24px]" />
                ))
              ))}
          </Reveal>
          <Reveal delay={0.08} className={cn("min-w-0", topHeading && "flex flex-col justify-center")}>
            {!topHeading && heading}
            {data.paragraphs?.map((p) => (
              <p key={p} className={cn(body, !topHeading && "mt-4", topHeading && "mt-4 first:mt-0")}>
                {p}
              </p>
            ))}
            <Checks items={data.list} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * The "Seamless Solutions" picture, drawn in HTML/CSS (no image file): a "Book Appointment" card, a profile + August calendar panel and an "Available Time Slot" list.
 * It is laid out on the 718 × 422 canvas of the original picture; every measurement is in those pixels, converted to cqw so it scales as one piece.
 */
const q = (px: number) => `${(px / 718) * 100}cqw`;
const place = (x: number, y: number, w?: number, h?: number): React.CSSProperties => ({ position: "absolute", left: q(x), top: q(y), width: w === undefined ? undefined : q(w), height: h === undefined ? undefined : q(h) });
const calRows = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, 1, 2, 3, 4],
];
const slots = [
  ["07:00 AM", "07:30 AM"],
  ["08:00 AM", "08:30 AM"],
  ["09:00 AM", "09:30 AM"],
  ["10:00 AM", "10:30 AM"],
  ["11:00 AM", "11:30 AM"],
  ["12:00 PM", "12:30 PM"],
  ["01:00 PM"],
];
const taken = new Set(["09:30 AM", "11:00 AM"]);
const gbar = (w: number, c = "#D5DAE1") => <span className="block rounded-full" style={{ width: q(w), height: q(4), background: c }} />;

function BookingVisual() {
  const shadow = "shadow-[0_1.6cqw_4cqw_-1.4cqw_rgba(30,58,107,.3)]";
  return (
    <div className="w-full [container-type:inline-size]">
      <div role="img" aria-label="Book Appointment card with a calendar and available time slots" className="relative w-full" style={{ aspectRatio: "718 / 422" }}>
        {/* Main window */}
        <span aria-hidden className={cn("absolute rounded-[1.8cqw] bg-white", shadow)} style={place(30, 47, 577, 316)} />

        {/* Profile panel */}
        <span aria-hidden className="absolute rounded-[1.2cqw] bg-[#F5F7FB]" style={place(40, 122, 138, 77)} />
        <span aria-hidden className="absolute overflow-hidden rounded-full bg-[#F4A5B5]" style={place(87, 131, 44, 44)}>
          <span className="absolute rounded-full bg-[#2D2A32]" style={place(11, 8, 22, 24)} />
          <span className="absolute rounded-t-full bg-[#2D2A32]" style={place(4, 32, 36, 20)} />
        </span>
        <span className="absolute flex gap-[1cqw]" style={place(66, 184)}>
          {gbar(36)}
          {gbar(48)}
        </span>
        {[Mail, Building2, UserRound, Phone, MapPin].map((Icon, k) => (
          <span key={k} className="absolute flex items-center gap-[1.4cqw]" style={place(46, 211 + k * 19.5)}>
            <Icon style={{ width: q(8), height: q(8) }} className="text-[#7D8794]" strokeWidth={1.8} />
            <span className="flex flex-col gap-[0.5cqw]">
              {gbar(k === 0 || k === 4 ? 112 : 40 + k * 8)}
              {k === 4 && gbar(80)}
            </span>
          </span>
        ))}

        {/* Calendar */}
        <span aria-hidden className="absolute rounded-[1.2cqw] bg-[#EEF1F6]" style={place(190, 122, 250, 230)} />
        <span className="absolute font-bold text-[#2A3140]" style={{ ...place(201, 136), fontSize: q(13.5) }}>
          02 August 2025
        </span>
        <span aria-hidden className="absolute text-[#8A93A1]" style={{ ...place(398, 137), fontSize: q(11) }}>
          ‹
        </span>
        <span aria-hidden className="absolute font-bold text-[#2A3140]" style={{ ...place(420, 136), fontSize: q(13) }}>
          ›
        </span>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, k) => (
          <span key={d} className="absolute text-center text-[#6B7380]" style={{ ...place(201 + k * 33.2, 176, 33, 12), fontSize: q(8) }}>
            {d}
          </span>
        ))}
        {calRows.map((row, r) =>
          row.map((n, c) => {
            const grey = (r === 0 && n === 1) || (r === 4 && n < 20);
            const sel = n === 10 && r === 1;
            const mark = r === 0 && n === 2;
            return (
              <span
                key={`${r}-${c}`}
                className={cn("absolute grid place-items-center border", sel ? "border-[#1D5BC6] bg-[#1D5BC6] font-bold text-white" : grey ? "border-[#E6E9EE] bg-[#E3E6EB] text-[#B3B9C3]" : "border-[#E6E9EE] bg-white text-[#3A4250]")}
                style={{ ...place(201 + c * 32.6, 195 + r * 31.5, 32.6, 31.5), fontSize: q(8.5) }}
              >
                {mark ? (
                  <span className="grid place-items-center rounded-full bg-[#DDE8FB]" style={{ width: q(14), height: q(14) }}>
                    {n}
                  </span>
                ) : (
                  n
                )}
              </span>
            );
          }),
        )}

        {/* "Book Appointment" card */}
        <span aria-hidden className={cn("absolute rounded-[1.8cqw] bg-white", shadow)} style={place(20, 20, 261, 87)} />
        <span aria-hidden className="absolute grid place-items-center rounded-full bg-[#CFF3EE] text-[#14B8A6]" style={place(33, 33, 24, 24)}>
          <PhoneCall style={{ width: q(12), height: q(12) }} strokeWidth={2} />
        </span>
        <span className="absolute font-bold whitespace-nowrap text-[#2A3140]" style={{ ...place(34, 63), fontSize: q(13) }}>
          Book Appointment
        </span>
        <span className="absolute whitespace-nowrap text-[#8A93A1]" style={{ ...place(34, 82), fontSize: q(8.5) }}>
          Please select date first and time slot for that day
        </span>

        {/* Available time slots */}
        <span aria-hidden className={cn("absolute rounded-[1.4cqw] bg-white", shadow)} style={place(434, 110, 190, 261)} />
        <span className="absolute whitespace-nowrap text-[#4A5260]" style={{ ...place(446, 120), fontSize: q(9.5) }}>
          Available Time Slot:
        </span>
        {slots.map((row, r) =>
          row.map((t, c) => {
            const sel = t === "08:00 AM";
            const off = taken.has(t);
            return (
              <span
                key={t}
                className={cn("absolute grid place-items-center rounded-[0.6cqw] border", sel ? "border-[#5B8FE0] bg-[#EAF2FF] text-[#1D5BC6]" : off ? "border-[#E6E9EE] bg-[#E7E9ED] text-[#B3B9C3]" : "border-[#DDE2E9] bg-white text-[#3A4250]")}
                style={{ ...place(446 + c * 86, 137 + r * 33, 79, 25), fontSize: q(9) }}
              >
                {t}
              </span>
            );
          }),
        )}
      </div>
    </div>
  );
}

const connectPoints = [
  { icon: ShieldCheck, text: "HIPAA-Compliant & Secure" },
  { icon: Layers, text: "Seamless Collaboration" },
  { icon: Zap, text: "Right Data, Right Time" },
] as const;

/** "Connecting Patients, Clinics & Universities Through AXON": the video beside the accented heading, intro and three icon points. */
function Connecting({ data }: { data: SplitSection }) {
  const accent = "Through AXON";
  const [lead] = data.title.split(accent);
  return (
    <section className={cn("relative isolate overflow-hidden section-py", bgA)} aria-labelledby="ab-connecting">
      <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12")}>
        <Reveal className="min-w-0">
          {data.image ? (
            <Image src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} sizes="(max-width: 1024px) 90vw, 620px" className="h-auto w-full rounded-[24px]" />
          ) : (
            data.video && <video src={data.video} autoPlay muted loop playsInline preload="none" aria-hidden className="block h-auto w-full rounded-[24px]" />
          )}
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <h2 id="ab-connecting" className={h2}>
            {lead}
            <span className="text-primary">{accent}</span>
          </h2>
          {data.paragraphs?.map((p) => (
            <p key={p} className={cn(body, "mt-6")}>
              {p}
            </p>
          ))}
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {connectPoints.map((c) => (
              <li key={c.text} data-fx-item className={cn(row, "flex items-center gap-3 px-4 py-3")}>
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#E3EEFC] text-primary">
                  <c.icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="text-[16px] leading-snug font-semibold text-navy">{c.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChoose({ data }: { data: FeaturesSection }) {
  return (
    <section className={cn("relative isolate overflow-hidden section-py", bgA)} aria-labelledby="why-title">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2 id="why-title" className={h2}>
            <Accent text={data.title} words={["AXON ADHD"]} />
          </h2>
          {data.subtitle && <p className={cn(body, "mt-4")}>{data.subtitle}</p>}
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-14 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={i * 0.06} className="flex w-full">
                <PathCard tone={cardTones[i % 3]} icon={item.icon ? <FeatureIcon name={item.icon} className="size-7" /> : null} title={item.title} text={item.text} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const founderStats = [
  { icon: GraduationCap, value: "PhD", label: "Catholic University of America", tone: "bg-[#DCEBFB] text-primary" },
  { icon: Users, value: "Member", label: "ADHD Expert Consortium", tone: "bg-[#FDEEE0] text-[#EA6A12]" },
  { icon: Laptop, value: "43 + DC", label: "States covered online", tone: "bg-[#DDF6EC] text-[#16A34A]" },
] as const;

/** The founder's biography, shortened to two paragraphs that fit the quote card. */
const founderBio = [
  "Dr. Aaron Dodini is a licensed clinical psychologist and marriage and family therapist who founded Dodini Behavioral Health in 2001. Drawing from his clinical expertise and personal family experience, he founded AXON Digital Health & Diagnosis (AXON ADHD) to make ADHD evaluations faster, more affordable, and more accurate through innovative digital tools.",
  "Through AXON, he connects behavioral health, primary care, and higher education, helping individuals, healthcare providers, and universities move from confusion to clarity and achieve meaningful results.",
];

/** "Meet Our Founder": the photo on an offset blue backing with an experience badge and a speaker bar; beside it the name, title, bio card, three credential cards and a licence line. */
function Founder() {
  const card = "rounded-[28px] border border-[#CFE0F7] bg-[#EAF2FD] shadow-[0_18px_44px_-22px_rgba(18,61,106,.28)]";
  return (
    <section id="Meet" className={cn("relative isolate scroll-mt-[var(--header-offset)] overflow-hidden section-py", bgB)} aria-labelledby="founder-title">
      <div className={cn(wrap, "grid items-center gap-14 lg:grid-cols-[1fr_2fr] lg:gap-24")}>
        {/* Photo column: backing, photo, badge and speaker bar are placed in percentages of the photo. */}
        <Reveal className="mx-auto w-full max-w-[460px] min-w-0 px-3 sm:px-0 lg:max-w-none">
          <div className="relative">
            <span aria-hidden className="absolute -top-[9%] right-[-8%] bottom-[10%] left-[10%] -z-10 rounded-[40px] bg-[#CFE2FB]" />
            <div className="aspect-[5/6] w-full overflow-hidden rounded-[28px] shadow-[0_30px_60px_-28px_rgba(18,61,106,.5)]">
              {/* Slightly enlarged so the source file's untidy bottom edge falls outside the frame. */}
              <Image
                src="/images/referral-for-universities/dodini-portrait.webp"
                alt={founder.image.alt}
                width={980}
                height={950}
                sizes="(max-width: 1023px) 92vw, 460px"
                className="size-full origin-[30%_0%] scale-[1.08] object-cover object-[32%_20%]"
              />
            </div>
            <div className="absolute -top-[4%] right-[-4%] flex items-center gap-3 rounded-[20px] border border-white/70 bg-white/55 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(18,61,106,.4),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl backdrop-saturate-150 sm:right-[-15%] sm:gap-4 sm:px-5">
              <Award aria-hidden className="size-9 shrink-0 text-primary" strokeWidth={1.6} />
              <span aria-hidden className="h-9 w-px bg-[#D4DEEB]" />
              <p className="leading-tight">
                <span className="block text-[20px] font-bold text-navy sm:text-[22px]">25+ years</span>
                <span className="block text-[14px] text-body">of clinical practice</span>
              </p>
            </div>
            <div className="absolute inset-x-[5%] bottom-1 flex items-center gap-3 rounded-[20px] border border-white/30 bg-[#0B3C9E]/75 px-3.5 py-3 text-white shadow-[0_18px_36px_-16px_rgba(10,50,140,.6),inset_0_1px_0_rgba(255,255,255,.35)] backdrop-blur-xl backdrop-saturate-150 sm:gap-4 sm:px-4 sm:py-3.5">
              <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15">
                <Mic className="size-5" strokeWidth={1.8} />
              </span>
              <span aria-hidden className="h-9 w-px bg-white/30" />
              <p className="text-[15px] leading-snug">
                <strong className="font-bold">Speaker,</strong> International Conference on ADHD 2025
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <h2 id="founder-title" className="type-h1 text-navy">
            {founder.name}, PhD
          </h2>
          <p className="mt-2 text-[18px] leading-snug font-semibold text-primary sm:text-[22px]">Licensed Clinical Psychologist · Founder, AXON ADHD</p>

          <blockquote className={cn(card, "mt-7 flex items-start gap-5 p-5 sm:gap-6 sm:px-8 sm:py-7")}>
            <div className="space-y-3 text-[16px] leading-[1.65] font-medium text-navy italic sm:text-[17px]">
              {founderBio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </blockquote>

          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {founderStats.map((c) => (
              <li key={c.value} className={cn(card, "flex items-center gap-3 p-3.5")}>
                <span aria-hidden className={cn("grid size-16 shrink-0 place-items-center rounded-[18px]", c.tone)}>
                  <c.icon className="size-8" strokeWidth={1.6} />
                </span>
                <span aria-hidden className="h-14 w-px shrink-0 bg-[#D4DEEB]" />
                <p className="min-w-0 leading-tight">
                  <span className="block text-[20px] font-bold text-navy sm:text-[22px]">{c.value}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-body">{c.label}</span>
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-start gap-3 text-[17px] leading-snug text-navy sm:text-[18px]">
            <CheckCircle2 aria-hidden className="mt-0.5 size-7 shrink-0 text-[#16A34A]" strokeWidth={1.8} />
            Licensed in Virginia and New York, and authorized to provide telepsychology in PSYPACT participating states.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Whole About page body, in the order of the reference design. */
export function AboutSections() {
  const s = aboutPage.sections;
  const hero = s.find((x): x is PageHero => x.type === "hero")!;
  const features = s.filter((x): x is FeaturesSection => x.type === "features");
  const splits = s.filter((x): x is SplitSection => x.type === "split");
  const cta = s.find((x): x is CtaSection => x.type === "cta")!;
  const [axon, connecting, transforming, barriers, seamless] = splits;

  return (
    <div className={cn(vars, "bg-white")}>
      <Hero data={hero} />
      <Mission data={features[0]} />
      <AxonName data={axon} />
      <Connecting data={connecting} />
      <TealBanner data={{ ...cta, accent: "Confidence" }} tone="blue" />
      <Transforming data={transforming} />
      <WhyChoose data={features[1]} />
      <MediaRow data={barriers} accent={["Collaborative Care"]} bg={bgB} topHeading fillMedia />
      <MediaRow data={seamless} accent={["Clinicians", "Clients"]} mediaRight topHeading bg={bgA}>
        <BookingVisual />
      </MediaRow>
      <Founder />
    </div>
  );
}
