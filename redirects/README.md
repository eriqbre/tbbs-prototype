# Incoming link redirects

Add legacy URLs (from other sites or the old GoDaddy site) to **`incoming.csv`**.

## CSV format

```csv
from_path,to_path
/old-page-that-404s,/liposuction-360
/another-old-path,/faqs
```

- **Paths only** — no domain. If your sheet has full URLs, we strip to the path during import.
- **Leading slash** required on both columns.
- **301 (permanent)** — used for SEO when the move is permanent.
- Lines starting with `#` are ignored.

## Validate before deploy

```bash
npm run validate:redirects
```

Flags `to_path` values that do not match a page in this app.

## How it works

`next.config.ts` loads `coreRedirects` plus every row in `incoming.csv` at build time.
