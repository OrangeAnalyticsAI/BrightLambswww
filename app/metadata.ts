import type { Metadata, Viewport } from 'next';

// Define viewport settings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  title: 'Bright Lambs - Business Analysis as a Service (BAaaS)',
  description: 'Expert business analysis solutions to help your business thrive',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://brightlambs.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  
  // Additional mobile-specific meta tags
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Bright Lambs',
    'application-name': 'Bright Lambs',
    'msapplication-TileColor': '#111827',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-tap-highlight': 'no',
    'format-detection': 'telephone=no'
  },
};

// Add this to your root layout.tsx head section:
/*
  <head>
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
    <meta name="color-scheme" content="light dark" />
  </head>
*/
