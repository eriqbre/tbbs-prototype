#!/usr/bin/env node
/**
 * Audits internal links in content + components against resolvePathToSlug rules.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(root, "src/content/pages");
const routes = JSON.parse(fs.readFileSync(path.join(root, "src/content/routes.json"), "utf8"));

const PATH_ALIASES = {
  "/arm-lipo-360°-/-arm-lift": "arm-lipo-360----arm-lift",
  "/arm-lipo-360°-/arm-lift": "arm-lipo-360----arm-lift",
  "/arm-lipo-360-arm-lift": "arm-lipo-360----arm-lift",
  "/female-b&a-gallery": "female-b-a-gallery",
  "/female-ba-gallery": "female-b-a-gallery",
};

function resolvePathToSlug(pathname) {
  const normalized =
    pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized === "/") return "home";

  if (PATH_ALIASES[normalized]) return PATH_ALIASES[normalized];

  const fromRoutes = routes[normalized];
  if (fromRoutes) return fromRoutes;

  try {
    const decoded = decodeURIComponent(normalized);
    if (PATH_ALIASES[decoded]) return PATH_ALIASES[decoded];
    const fromDecoded = routes[decoded];
    if (fromDecoded) return fromDecoded;
  } catch {
    /* ignore */
  }

  const guess = normalized
    .replace(/^\//, "")
    .replace(/[^\w\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  if (fs.existsSync(path.join(CONTENT_DIR, `${guess}.json`))) return guess;

  return null;
}

function walkJsonFiles(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkJsonFiles(p));
    else if (ent.name.endsWith(".json")) out.push(p);
  }
  return out;
}

function extractHrefs(obj, refs = []) {
  if (obj && typeof obj === "object") {
    if (typeof obj.href === "string") refs.push(obj.href);
    for (const v of Object.values(obj)) extractHrefs(v, refs);
  }
  return refs;
}

function extractFromSource(filePath, content) {
  const hrefs = [];
  const re = /href=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(content))) hrefs.push(m[1]);
  return hrefs.map((h) => ({ href: h, file: path.relative(root, filePath) }));
}

const allHrefs = new Map(); // href -> Set sources

function record(href, source) {
  if (!allHrefs.has(href)) allHrefs.set(href, new Set());
  allHrefs.get(href).add(source);
}

for (const file of walkJsonFiles(path.join(root, "src/content"))) {
  const rel = path.relative(root, file);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const href of extractHrefs(data)) record(href, rel);
}

for (const file of walkJsonFiles(path.join(root, "src"))) {
  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
  const rel = path.relative(root, file);
  const content = fs.readFileSync(file, "utf8");
  for (const { href } of extractFromSource(file, content)) record(href, rel);
}

const broken = [];
const placeholders = [];
const external = [];
const okInternal = [];

for (const [href, sources] of allHrefs) {
  if (href === "#" || href === "") {
    placeholders.push({ href, sources: [...sources] });
    continue;
  }
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  ) {
    external.push({ href, sources: [...sources] });
    continue;
  }
  if (!href.startsWith("/")) {
    broken.push({ href, reason: "not-root-relative", sources: [...sources] });
    continue;
  }
  const slug = resolvePathToSlug(href.split("?")[0].split("#")[0]);
  if (!slug) {
    broken.push({ href, reason: "no matching page", sources: [...sources] });
  } else {
    okInternal.push({ href, slug, sources: [...sources] });
  }
}

// Public routes that must respond (canonical paths)
const canonicalPaths = new Set(["/"]);
for (const slug of fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".json") && f !== "manifest.json")
  .map((f) => f.replace(/\.json$/, ""))) {
  if (slug === "home") continue;
  if (slug === "arm-lipo-360----arm-lift") canonicalPaths.add("/arm-lipo-360-arm-lift");
  else if (slug === "female-b-a-gallery") canonicalPaths.add("/female-ba-gallery");
  else {
    const page = JSON.parse(
      fs.readFileSync(path.join(CONTENT_DIR, `${slug}.json`), "utf8")
    );
    if (page.path && page.path !== "/") canonicalPaths.add(page.path.split("?")[0]);
  }
}

console.log(JSON.stringify({ broken, placeholders, stats: {
  totalUnique: allHrefs.size,
  broken: broken.length,
  placeholders: placeholders.length,
  external: external.length,
  okInternal: okInternal.length,
  canonicalPaths: canonicalPaths.size,
}, canonicalPaths: [...canonicalPaths].sort() }, null, 2));

process.exit(broken.length > 0 ? 1 : 0);
