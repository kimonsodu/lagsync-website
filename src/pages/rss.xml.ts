import type { APIRoute } from 'astro';

const SITE = 'https://lagsync.com';

const items = [
  {
    title: 'LagSync 1.01 Released',
    link: `${SITE}/releases#v101`,
    pubDate: 'Mon, 06 Apr 2026 00:00:00 GMT',
    description:
      'Fixes and improvements: Twitch/HUD visibility, capability-based pipeline selection, Firefox Kick compatibility, canvas stability, TypeScript refactor, and Prime Video compatibility.'
  },
  {
    title: 'LagSync 1.0 Released',
    link: `${SITE}/releases#v10`,
    pubDate: 'Fri, 03 Apr 2026 00:00:00 GMT',
    description: 'Initial release with core lag sync features via MSE and offset controls.'
  }
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0">\n` +
    `<channel>\n` +
    `  <title>LagSync Releases</title>\n` +
    `  <link>${SITE}/releases</link>\n` +
    `  <description>Release and changelog updates for LagSync.</description>\n` +
    `  <language>en-us</language>\n` +
      `  <lastBuildDate>Sat, 11 Apr 2026 00:00:00 GMT</lastBuildDate>\n` +
    items
      .map(
        (item) =>
          `  <item><title>${item.title}</title><link>${item.link}</link><guid>${item.link}</guid><pubDate>${item.pubDate}</pubDate><description>${item.description}</description></item>`
      )
      .join('\n') +
    `\n</channel>\n` +
    `</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
};
