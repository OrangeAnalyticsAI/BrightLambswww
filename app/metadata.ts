import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bright Lambs - Business Analysis as a Service (BAaaS)',
  description: 'Expert business analysis solutions to help your business thrive',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  // Additional mobile-specific meta tags
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-navbutton-color': '#111827',
    'msapplication-TileColor': '#111827',
  },
  manifest: '/manifest.json',
};
