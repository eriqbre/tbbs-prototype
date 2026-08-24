import fs from "fs";
import path from "path";
import type { Redirect } from "next/dist/lib/load-custom-routes";

const CSV_PATH = path.join(process.cwd(), "redirects", "incoming.csv");

/** Legacy / scrape URL fixes (always applied). */
export const coreRedirects: Redirect[] = [
  {
    source: "/arm-lipo-360%C2%B0-%2F-arm-lift",
    destination: "/arm-lipo-360-arm-lift",
    permanent: true,
  },
  {
    source: "/arm-lipo-360°-/arm-lift",
    destination: "/arm-lipo-360-arm-lift",
    permanent: true,
  },
  {
    source: "/arm-lipo-360°-/-arm-lift",
    destination: "/arm-lipo-360-arm-lift",
    permanent: true,
  },
  {
    source: "/female-b%26a-gallery",
    destination: "/female-ba-gallery",
    permanent: true,
  },
  {
    source: "/female-b&a-gallery",
    destination: "/female-ba-gallery",
    permanent: true,
  },
];

function normalizePath(input: string, label: string, lineNum: number): string {
  let p = input.trim();
  if (!p || p.startsWith("#")) return "";

  try {
    if (p.startsWith("http://") || p.startsWith("https://")) {
      p = new URL(p).pathname;
    }
  } catch {
    throw new Error(`Line ${lineNum}: invalid URL in ${label}: ${input}`);
  }

  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "") || "/";
  return p;
}

/** Parses redirects/incoming.csv → Next.js redirect rules (301). */
export function loadIncomingRedirectsFromCsv(): Redirect[] {
  if (!fs.existsSync(CSV_PATH)) return [];

  const raw = fs.readFileSync(CSV_PATH, "utf8");
  const lines = raw.split(/\r?\n/);
  const out: Redirect[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#")) continue;

    const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    if (cols[0]?.startsWith("from_path") && cols[1] === "to_path") continue;

    if (cols.length < 2) {
      console.warn(`[redirects] Skipping line ${i + 1}: need from_path,to_path`);
      continue;
    }

    const from = normalizePath(cols[0], "from_path", i + 1);
    const to = normalizePath(cols[1], "to_path", i + 1);
    if (!from || !to) continue;

    if (from === to) {
      console.warn(`[redirects] Skipping line ${i + 1}: same path ${from}`);
      continue;
    }
    if (seen.has(from)) {
      console.warn(`[redirects] Duplicate from_path ignored: ${from}`);
      continue;
    }
    seen.add(from);

    out.push({ source: from, destination: to, permanent: true });
  }

  return out;
}

export function getAllRedirects(): Redirect[] {
  return [...coreRedirects, ...loadIncomingRedirectsFromCsv()];
}
