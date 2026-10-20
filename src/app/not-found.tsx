import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctas } from "@/content/site";

export default function NotFound() {
  return (
    <section className="-mt-[84px] bg-gradient-to-b from-primary-soft to-white pt-[160px] pb-24 text-center">
      <Container className="max-w-[720px]">
        <p className="font-display text-[96px] leading-none font-extrabold text-primary/20 sm:text-[140px]">404</p>
        <h1 className="mt-2 font-display text-[28px] font-bold text-navy sm:text-[40px]">Lost focus? It happens.</h1>
        <p className="mt-4 text-[17px] text-body">The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 xs:flex-row">
          <ButtonLink href="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href={ctas.screening.href} variant="outline" size="lg">
            {ctas.screening.label}
          </ButtonLink>
        </div>
        <p className="mt-8 text-[15px] text-muted">
          Looking for something specific? Try the{" "}
          <Link href="/sitemap/" className="font-medium text-primary underline">
            site map
          </Link>{" "}
          or our{" "}
          <Link href="/adhd-faqs/" className="font-medium text-primary underline">
            FAQs
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
