#!/usr/bin/env node
/** Verify localSrc / public image paths referenced in page content exist. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(root, "src/content/pages");
const PUBLIC = path.join(root, "public");

const missing = [];

function walk(obj, file) {
  if (!obj || typeof obj !== "object") return;
  if (typeof obj.localSrc === "string") {
    const p = path.join(PUBLIC, obj.localSrc.replace(/^\//, ""));
    if (!fs.existsSync(p)) missing.push({ file, localSrc: obj.localSrc });
  }
  if (typeof obj.src === "string" && obj.src.startsWith("/images/")) {
    const p = path.join(PUBLIC, obj.src.replace(/^\//, ""));
    if (!fs.existsSync(p)) missing.push({ file, localSrc: obj.src });
  }
  for (const v of Object.values(obj)) walk(v, file);
}

for (const f of fs.readdirSync(CONTENT_DIR)) {
  if (!f.endsWith(".json")) continue;
  const file = path.join(CONTENT_DIR, f);
  walk(JSON.parse(fs.readFileSync(file, "utf8")), f);
}

// site logo
const site = JSON.parse(fs.readFileSync(path.join(root, "src/content/site.json"), "utf8"));
if (site.logo) {
  const p = path.join(PUBLIC, site.logo.replace(/^\//, ""));
  if (!fs.existsSync(p)) missing.push({ file: "site.json", localSrc: site.logo });
}

for (const img of ["/images/1565629.png", "/images/blob-56b3a68.png", "/images/blob-6c75d85.png"]) {
  const p = path.join(PUBLIC, img.replace(/^\//, ""));
  if (!fs.existsSync(p)) missing.push({ file: "home-sections", localSrc: img });
}

console.log(JSON.stringify({ missingCount: missing.length, missing }, null, 2));
process.exit(missing.length ? 1 : 0);
