#!/usr/bin/env node
/**
 * Validates redirects/incoming.csv paths against static routes in the app.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(root, "src/content/pages");
const routes = JSON.parse(fs.readFileSync(path.join(root, "src/content/routes.json"), "utf8"));
const csvPath = path.join(root, "redirects/incoming.csv");

const PATH_ALIASES = {
  "/arm-lipo-360-arm-lift": "arm-lipo-360----arm-lift",
  "/female-ba-gallery": "female-b-a-gallery",
};

function resolvePath(pathname) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized === "/") return "home";
  if (PATH_ALIASES[normalized]) return PATH_ALIASES[normalized];
  if (routes[normalized]) return routes[normalized];
  try {
    const decoded = decodeURIComponent(normalized);
    if (PATH_ALIASES[decoded]) return PATH_ALIASES[decoded];
    if (routes[decoded]) return routes[decoded];
  } catch {
    /* ignore */
  }
  const guess = normalized
    .replace(/^\//, "")
    .replace(/[^\w\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  if (fs.existsSync(path.join(CONTENT, `${guess}.json`))) return guess;
  return null;
}

function parseCsv() {
  if (!fs.existsSync(csvPath)) return [];
  const lines = fs.readFileSync(csvPath, "utf8").split(/\r?\n/);
  const rows = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#") || line.startsWith("from_path")) continue;
    const [from, to] = line.split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
    if (from && to) rows.push({ from, to, line: i + 1 });
  }
  return rows;
}

const rows = parseCsv();
const badDest = [];
for (const { from, to, line } of rows) {
  const destPath = to.startsWith("http") ? to : to.startsWith("/") ? to : `/${to}`;
  if (destPath.startsWith("http")) continue;
  if (!resolvePath(destPath.split("?")[0].split("#")[0])) {
    badDest.push({ line, to: destPath });
  }
}

console.log(JSON.stringify({ redirectCount: rows.length, badDestinations: badDest }, null, 2));
process.exit(badDest.length ? 1 : 0);
