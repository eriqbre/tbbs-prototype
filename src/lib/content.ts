import fs from "fs";
import path from "path";
import routes from "@/content/routes.json";

export type ContentBlock =
  | { type: "p"; text: string; links?: { href: string; text: string }[] }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type ContentSection = {
  type: "section";
  heading: string | null;
  level: number | null;
  blocks: ContentBlock[];
};

export type PageContent = {
  path: string;
  slug: string;
  title: string;
  description: string;
  ogImage?: string;
  h1: string;
  hero?: { src: string; alt: string; localSrc?: string } | null;
  sections: ContentSection[];
  cards: { title: string; description: string; href: string }[];
  ctas: { href: string; text: string }[];
  testimonials: string[];
  images: { src: string; alt: string; localSrc?: string }[];
  faqs?: { q: string; a: string }[];
  routeKey?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/pages");

const PATH_ALIASES: Record<string, string> = {
  "/arm-lipo-360°-/-arm-lift": "arm-lipo-360----arm-lift",
  "/arm-lipo-360°-/arm-lift": "arm-lipo-360----arm-lift",
  "/arm-lipo-360-arm-lift": "arm-lipo-360----arm-lift",
  "/female-b&a-gallery": "female-b-a-gallery",
  "/female-ba-gallery": "female-b-a-gallery",
};

export function getAllPageSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json") && f !== "manifest.json")
    .map((f) => f.replace(/\.json$/, ""))
    .filter((s) => s !== "home");
}

export function getPageBySlug(slug: string): PageContent | null {
  const file = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as PageContent;
}

export function getHomePage(): PageContent {
  return getPageBySlug("home") as PageContent;
}

export function resolvePathToSlug(pathname: string): string | null {
  const normalized = pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized === "/") return "home";

  if (PATH_ALIASES[normalized]) return PATH_ALIASES[normalized];

  const fromRoutes = (routes as Record<string, string>)[normalized];
  if (fromRoutes) return fromRoutes;

  // encoded variants
  try {
    const decoded = decodeURIComponent(normalized);
    if (PATH_ALIASES[decoded]) return PATH_ALIASES[decoded];
    const fromDecoded = (routes as Record<string, string>)[decoded];
    if (fromDecoded) return fromDecoded;
  } catch {
    /* ignore */
  }

  const guess = normalized.replace(/^\//, "").replace(/[^\w\-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  if (fs.existsSync(path.join(CONTENT_DIR, `${guess}.json`))) return guess;

  return null;
}

export function getAllStaticParams(): { slug: string[] }[] {
  const pages = getAllPageSlugs();
  const params: { slug: string[] }[] = [];

  for (const slug of pages) {
    const page = getPageBySlug(slug);
    if (!page) continue;
    let p = page.path;
    if (p === "/") continue;
    try {
      p = decodeURIComponent(p);
    } catch {
      /* keep */
    }
    // Prefer clean public paths for special pages
    if (slug === "arm-lipo-360----arm-lift") {
      params.push({ slug: ["arm-lipo-360-arm-lift"] });
      continue;
    }
    if (slug === "female-b-a-gallery") {
      params.push({ slug: ["female-ba-gallery"] });
      continue;
    }
    const segments = p.replace(/^\//, "").split("/").filter(Boolean);
    params.push({ slug: segments });
  }

  return params;
}

export function imageSrc(image?: { src?: string; localSrc?: string } | null): string | undefined {
  if (!image) return undefined;
  return image.localSrc || image.src;
}
