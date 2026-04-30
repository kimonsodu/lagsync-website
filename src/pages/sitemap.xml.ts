import type { APIRoute } from 'astro';

const SITE = 'https://lagsync.com';

const routes: Array<{ path: string; lastmod: string }> = [
  { path: '/', lastmod: '2026-04-28' },
  { path: '/documentation/', lastmod: '2026-04-07' },
  { path: '/help/', lastmod: '2026-04-28' },
  { path: '/releases/', lastmod: '2026-04-28' },
  { path: '/donate/', lastmod: '2026-04-06' },
  { path: '/privacy/', lastmod: '2026-04-03' },
  { path: '/terms/', lastmod: '2026-04-03' },
  { path: '/thank-you/', lastmod: '2026-04-03' },
  { path: '/fix/', lastmod: '2026-04-03' },
  { path: '/fix/youtube/', lastmod: '2026-04-07' },
  { path: '/fix/netflix/', lastmod: '2026-04-07' },
  { path: '/fix/twitch/', lastmod: '2026-04-07' },
  { path: '/fix/prime-video/', lastmod: '2026-04-10' },
  { path: '/rss.xml', lastmod: '2026-04-28' }
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes
      .map((route) => {
        const loc = `${SITE}${route.path}`;
        return `  <url><loc>${loc}</loc><lastmod>${route.lastmod}</lastmod></url>`;
      })
      .join('\n') +
    `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
