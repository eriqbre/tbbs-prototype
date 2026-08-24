#!/usr/bin/env node
/**
 * HTTP audit: GET every canonical route (+ redirect sources) and extract same-origin links.
 */

const base = process.env.AUDIT_BASE || "http://127.0.0.1:3012";

async function fetchStatus(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    return { status: res.status, location: res.headers.get("location") };
  } catch (e) {
    return { status: 0, error: String(e) };
  }
}

async function fetchHtml(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return { ok: false, status: res.status, html: "" };
  return { ok: true, status: res.status, html: await res.text() };
}

function extractHtmlHrefs(html) {
  const hrefs = new Set();
  const re = /href="(\/[^"#?]*(?:[^"]*)?)"/g;
  let m;
  while ((m = re.exec(html))) {
    let h = m[1];
    if (h.startsWith("/_next") || h.startsWith("/images")) continue;
    hrefs.add(h.split("#")[0].split("?")[0] || h);
  }
  return [...hrefs];
}

const canonical = [
  "/",
  "/adult-circumcision",
  "/arm-lipo-360-arm-lift",
  "/arm-lipo-360%C2%B0-%2F-arm-lift",
  "/female-b%26a-gallery",
  "/female-ba-gallery",
  "/female-b&a-gallery",
  "/brazilian-butt-lift-bbl",
  "/breast-augmentation",
  "/breast-implant-exchange",
  "/breast-lift",
  "/breast-reduction",
  "/breast-rejuvenation",
  "/breast-revision",
  "/breast-surgery-gallery",
  "/breasts",
  "/faqs",
  "/female-chin-liposuction",
  "/feminine-waist-contouring",
  "/financing-options",
  "/labiaplasty",
  "/liposuction",
  "/liposuction-360",
  "/male-abdominal-sculpting",
  "/male-chest-reduction",
  "/male-chin-liposuction",
  "/male-liposuction-360-1",
  "/male-surgery-gallery",
  "/male-tummy-tuck-1",
  "/men",
  "/mommy-makeover",
  "/out-of-town-patient-guide",
  "/recovery-guides",
  "/resources",
  "/thigh-liposuction",
  "/travel-information",
  "/tummy-tuck",
  "/women",
];

const pageFailures = [];
const linkFailures = [];
const discovered = new Set();

for (const p of canonical) {
  const url = `${base}${p}`;
  const { ok, status, html } = await fetchHtml(url);
  if (!ok && status !== 200) {
    pageFailures.push({ path: p, status });
    continue;
  }
  for (const h of extractHtmlHrefs(html)) discovered.add(h);
}

for (const h of discovered) {
  if (!h || h === "/") continue;
  const { status, location, error } = await fetchStatus(`${base}${h}`);
  if (status === 404 || status === 0) {
    linkFailures.push({ href: h, status, error, location });
  }
}

console.log(
  JSON.stringify(
    {
      base,
      pagesChecked: canonical.length,
      pageFailures,
      discoveredLinkCount: discovered.size,
      linkFailures,
    },
    null,
    2
  )
);

process.exit(pageFailures.length + linkFailures.length > 0 ? 1 : 0);
