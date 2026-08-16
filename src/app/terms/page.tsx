import type { Metadata } from "next";
import LegalContent from "./LegalContent";

const LEGAL_META: Record<string, { title: string; description: string }> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "Privacy policy of the xDev AI public website: static site, no user accounts, no sessions, anonymized analytics, and contact at duy@xdev.asia.",
  },
  terms: {
    title: "Terms of Use",
    description:
      "Terms of use for the xDev AI public website: license of published materials, acceptable use, disclaimers, and contact at duy@xdev.asia.",
  },
};

export const metadata: Metadata = {
  title: `${LEGAL_META["terms"].title} | xDev AI — Governed AI Delivery`,
  description: LEGAL_META["terms"].description,
};

export default function LegalPage() {
  return <LegalContent legalPage="terms" />;
}
