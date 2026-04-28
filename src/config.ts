/**
 * Site-wide configuration and constants
 * Centralized management of version, metadata, and repeated content
 */

export const SITE = {
  title: 'LagSync - Perfect Bluetooth Audio Sync for Every Browser',
  description: 'Fix Bluetooth audio delay with LagSync — a lightweight browser extension for Chrome, Firefox, Edge, and Brave that restores lip-sync quickly.',
  image: '/images/marquee.png',
  url: 'https://lagsync.com',
};

export const VERSION = '1.2.1';

export const BROWSERS = [
  {
    name: 'Chrome',
    icon: '/browsers/chrome.svg',
    note: `v${VERSION} — Live`,
    link: 'https://chromewebstore.google.com/detail/lagsync-bluetooth-audio-f/ijhhkocgkagcfkoinilkjdcadljdjmaf',
  },
  {
    name: 'Firefox',
    icon: '/browsers/firefox.svg',
    note: `v${VERSION} — Live`,
    link: 'https://addons.mozilla.org/en-US/firefox/addon/lagsync-bluetooth-audio-fix/',
  },
  {
    name: 'Edge',
    icon: '/browsers/edge.svg',
    note: `v${VERSION} — Live`,
    link: 'https://microsoftedge.microsoft.com/addons/detail/lagsync-bluetooth-audio/ocigopodjjobggdnklngfaceeedlkbol',
  },
  {
    name: 'Safari',
    icon: '/browsers/safari.svg',
    note: 'Coming Soon',
    link: '#',
  },
  {
    name: 'Brave',
    icon: '/browsers/brave.svg',
    note: `v${VERSION} — Live`,
    link: 'https://chromewebstore.google.com/detail/lagsync-bluetooth-audio-f/ijhhkocgkagcfkoinilkjdcadljdjmaf',
  },
];

export const SCREENSHOTS = [
  {
    src: '/images/marquee.png',
    alt: 'LagSync browser extension marquee banner showcasing the extension across multiple browsers',
    caption: 'Marquee banner',
    type: 'marquee',
  },
  {
    src: '/images/Promotile.png',
    alt: 'LagSync promotional tile - Install the extension now from the web store',
    caption: 'Promotional tile — Install now',
    type: 'promo',
  },
  {
    src: '/images/Screenshot1.png',
    alt: 'LagSync YouTube integration with perfect lip-sync settings optimized for streaming sites',
    caption: 'Perfect lip-sync — settings optimized for streaming sites',
  },
  {
    src: '/images/Screenshot2.png',
    alt: 'LagSync audio codec presets including aptX, AAC, SBC, and High quality options',
    caption: 'Smart headset presets — aptX · AAC · SBC · High',
  },
  {
    src: '/images/Screenshot3.png',
    alt: 'LagSync privacy policy - local processing, no tracking, no ads',
    caption: 'Privacy-first — local processing, no tracking, no ads',
  },
  {
    src: '/images/Screenshot4.png',
    alt: 'LagSync universal compatibility - sync audio on any website',
    caption: 'Universal compatibility — sync audio on any website',
  },
];
