import { notFound } from "next/navigation";
import { policyPacks, findPolicyPack } from "@/data/policyPacks";
import PolicyDetailClient from "./PolicyDetailClient";

export function generateStaticParams() {
  return policyPacks.map((pack) => ({ slug: pack.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const pack = policyPacks.find((pack) => pack.slug === slug);
  const base = "https://ai.xdev.asia";
  const enTitle = pack ? pack.title["en" as keyof typeof pack.title] : undefined;
  return {
    title: enTitle ? `${enTitle} | AI-SDLC Policy Registry | xDev AI` : "Policy not found",
    description: pack ? String(pack.summary["en" as keyof typeof pack.summary] ?? "").slice(0, 158) : "AI-SDLC policy detail",
    alternates: { canonical: `${base}/policies/${slug}` },
  };
}

export default async function PolicyDetailServer({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const pack = findPolicyPack(slug);
  if (!pack) notFound();
  return <PolicyDetailClient pack={pack} />;
}
