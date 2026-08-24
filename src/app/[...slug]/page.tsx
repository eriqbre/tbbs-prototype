import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { PremiumPageView } from "@/components/experience/PremiumPageView";
import { SITE_EXPERIENCE } from "@/lib/experience";
import {
  getAllStaticParams,
  getPageBySlug,
  resolvePathToSlug,
} from "@/lib/content";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`;
  const pageSlug = resolvePathToSlug(pathname);
  const page = pageSlug ? getPageBySlug(pageSlug) : null;
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      images: page.ogImage ? [page.ogImage] : undefined,
    },
  };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`;
  const pageSlug = resolvePathToSlug(pathname);
  const page = pageSlug ? getPageBySlug(pageSlug) : null;
  if (!page || page.slug === "home") notFound();
  if (SITE_EXPERIENCE === "premium") {
    return <PremiumPageView page={page} />;
  }
  return <PageView page={page} />;
}
