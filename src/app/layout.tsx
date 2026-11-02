import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";

// Manrope is the only family (headings, body, nav, buttons, footer) — see the type scale in globals.css.
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Online ADHD Testing for Adults | Diagnosis in Days | AXON", template: "%s | AXON ADHD" },
  description:
    "FDA-cleared online ADHD testing for adults. Free screening, expert evaluation, and an official diagnosis in days—not months. Start your free ADHD test today.",
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US", images: [{ url: site.ogImage, width: 1672, height: 941 }] },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#2578CA", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={manrope.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="sr-only z-[100] rounded-pill bg-primary px-5 py-3 font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        <main id="content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
