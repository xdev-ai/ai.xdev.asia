import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/posts-data";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  const mod = await import("@/data/posts");
  return mod.posts.filter((post: any) => !post.draft).map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = posts.find((post) => post.slug === slug);
  if (!post) return { title: "Not found" };
  const base = "https://ai.xdev.asia";
  return {
    title: `${post.en.title} | xDev AI Blog`,
    description: post.en.summary,
    alternates: { canonical: `${base}/blog/${post.slug}/` },
    openGraph: {
      title: post.en.title,
      description: post.en.summary,
      url: `${base}/blog/${post.slug}`,
      siteName: "xDev AI",
      locale: "en_US",
      images: [{ url: new URL(post.cover, base).href, width: 1200, height: 630, alt: post.en.title }],
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogPostServer({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = getPost(slug);
  if (!post || post.draft) notFound();
  return <BlogPostClient post={post} />;
}
