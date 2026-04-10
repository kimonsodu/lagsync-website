# LagSync Website

The official website for **LagSync** — a free browser extension that fixes Bluetooth audio delay on any website with sub-millisecond precision.

**Live at [lagsync.com](https://lagsync.com)**

## Tech Stack

- [Astro](https://astro.build) — Static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — Styling
- GitHub Pages — Hosting

## Development

```sh
npm install
npm run dev
```

Runs at `localhost:4321`.

## Build

```sh
npm run build
```

Static output goes to `./dist/`.

## SEO Update Signals

This project now includes the following update visibility signals:

- `sitemap.xml` with explicit `<lastmod>` dates.
- Structured data (`WebPage` JSON-LD `dateModified`) on guide pages.
- Visible `Last updated` labels on guide pages.
- `rss.xml` feed for release/changelog updates.
- `public/_headers` with `Last-Modified` headers for hosts that support static header files.

### Manual Indexing Steps

1. Open Google Search Console URL Inspection for the updated URL.
2. Click **Request Indexing** for urgent recrawls.

Optional sitemap ping command:

```bash
curl "https://www.google.com/ping?sitemap=https://lagsync.com/sitemap.xml"
```

## License

All rights reserved.
