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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${baloo2.variable} font-sans antialiased`}>
        <ClientProviders>
          <VisitLogger />
          <TooltipProvider>
            <PageTransitionIndicator />
            <Logo />
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
