# Tampa Bay Body Sculpting — Website Prototype

Next.js recreation of [tampabaybodysculpting.com](https://tampabaybodysculpting.com), built from a full-site scrape of every page listed in the public sitemap.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4

## Pages

All sitemap routes are implemented, including hub pages (Liposuction, Breasts, Women, Men, Resources), procedure pages, galleries, financing, travel, recovery guides, and FAQs.

Special original URLs are redirected to clean paths:

- `/arm-lipo-360°-/arm-lift` → `/arm-lipo-360-arm-lift`
- `/female-b&a-gallery` → `/female-ba-gallery`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3010](http://localhost:3010).

```bash
npm run build
npm start
```

## Content

Page copy lives in `src/content/pages/*.json` (extracted from the live site). Shared navigation/contact config is in `src/content/site.json`. Downloaded media assets are in `public/images/`.

Raw scrape artifacts used during import are kept under `scrape/` for reference.

## Branch experiences

| Branch | Purpose |
|--------|---------|
| `cursor/clone-tampabaybodysculpting-a801` | Faithful visual clone of the live GoDaddy site |
| `cursor/premium-conversion-redesign-a801` | Same content; premium conversion UI — see `docs/PREMIUM-EXPERIENCE.md` |
