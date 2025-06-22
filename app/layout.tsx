import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Logo from '@/app/components/Logo';
import PageTransitionIndicator from '@/app/components/PageTransitionIndicator';
import { Inter, Baloo_2 } from 'next/font/google';

import { ClientProviders } from '@/app/components/ClientProviders';
import { VisitLogger } from '@/components/analytics/VisitLogger';
import { SkipLink } from '@/app/components/SkipLink';

export { metadata } from './metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const baloo2 = Baloo_2({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-baloo2',
});

// Force static rendering to prevent hydration mismatch
// This helps prevent the flash of unstyled content
export const dynamic = 'force-static';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="light" // Default light theme
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, minimal-ui" key="viewport" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" key="theme-color-light" />
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" key="theme-color-dark" />
        <meta name="color-scheme" content="light dark" key="color-scheme" />
        
        {/* Safari specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bright Lambs" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-startup-image" href="/splash.png" />
      </head>
      <body className={`${inter.variable} ${baloo2.variable} font-sans antialiased bg-background text-foreground`}>
        <ClientProviders>
          <VisitLogger />
          <TooltipProvider>
            <PageTransitionIndicator />
            <Logo />
            <Navigation />
            <main className="scroll-mt-16" id="main-content">
              <SkipLink />
              {children}
            </main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
