# LagSync Website

Official marketing site for **LagSync**, a browser extension that reduces Bluetooth audio delay for video playback.

**Live:** [lagsync.com](https://lagsync.com)

## Portfolio Summary (Short Version)

I designed and built a high-performance Astro website for LagSync with a conversion-focused landing page, interactive screenshot lightbox, browser-aware download routing, structured SEO metadata, and automated update signals via sitemap + RSS.

## Screenshots

![LagSync Marquee](/public/images/marquee.png)
![LagSync Promo Tile](/public/images/Promotile.png)
![LagSync Screenshot 1](/public/images/Screenshot1.png)
![LagSync Screenshot 2](/public/images/Screenshot2.png)
![LagSync Screenshot 3](/public/images/Screenshot3.png)
![LagSync Screenshot 4](/public/images/Screenshot4.png)

## Key Features

- Conversion-first landing page with hero, browser download CTAs, feature sections, and trust messaging.
- Interactive screenshot gallery with lightbox, keyboard navigation, and responsive layout.
- Browser-aware marquee click target (Firefox/Chromium/Safari behavior routing).
- Dedicated pages for docs, fixes, releases, help, privacy, terms, and donation flow.

## Important Techniques Used

- **Astro component architecture** for modular sections (`Hero`, `Features`, `Screenshots`, `Footer`, etc.).
- **Centralized config** (`src/config.ts`) for site metadata, browser links, versioning, and screenshot data.
- **Tailwind CSS v4 + custom CSS** for responsive UI, full-bleed marquee behavior, and consistent theming.
- **Client-side progressive enhancement** for gallery controls and CTA behavior without overcomplicating the stack.
- **SEO and social metadata** through canonical tags, Open Graph/Twitter tags, and optional JSON-LD (`dateModified`).
- **Content freshness signals** with custom `sitemap.xml` (`<lastmod>` values), `rss.xml`, and static header hints.

## Tech Stack

- [Astro](https://astro.build)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript (Astro pages/components and route handlers)
- GitHub Pages-compatible static deployment

## Local Development

```sh
npm install
npm run dev
```

Runs on `http://localhost:4321`.

## Build

```sh
npm run build
```

Build output: `./dist/`

> Note: this repo requires **Node >= 22.12.0**.

## Project Structure

```text
src/
  components/      # Reusable UI blocks (hero, features, gallery, footer)
  layouts/         # Shared page layout + metadata handling
  pages/           # Route files (landing, docs, releases, legal pages, RSS, sitemap)
  styles/          # Global styles
public/
  images/          # Marketing and product screenshots
```

## License

All rights reserved.
