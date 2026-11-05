"use client";

import { useEffect } from "react";
import { bookingLinkPrefix } from "@/content/online-evaluation";

const KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "gad_campaignid",
  "msclkid",
  "fbclid",
  "utm_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

/**
 * Carries the ad click ID and campaign tags from this page's URL onto every booking link. Tags found on the page URL
 * override the default utm_* values on the buttons; an organic visit keeps the defaults.
 */
export function BookingLinkTagger() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = KEYS.flatMap((k) => {
      const v = params.get(k);
      return v ? [[k, v] as const] : [];
    });
    if (!found.length) return;
    document.querySelectorAll<HTMLAnchorElement>(`.axn a[href^="${bookingLinkPrefix}"], #axn-faq a[href^="${bookingLinkPrefix}"], .axn-lp-header a[href^="${bookingLinkPrefix}"]`).forEach((a) => {
      const u = new URL(a.href);
      found.forEach(([k, v]) => u.searchParams.set(k, v));
      a.href = u.toString();
    });
  }, []);
  return null;
}
