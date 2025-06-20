import type { Metadata } from 'next';
import { Inter, Baloo_2 } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Logo from '@/app/components/Logo';
import { ThemeProvider } from '@/app/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Bright Lambs - Business Analysis as a Service (BAaaS)',
  description: 'Expert business analysis solutions to help your business thrive',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

// This script runs before React hydrates the page to prevent theme flicker
const themeScript = `
  (function() {
    // Get the stored theme or use system preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine the initial theme
    let theme = 'light';
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      theme = 'dark';
    }
    
    // Apply the theme immediately
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.className} ${baloo2.className}`}>
      <head>
        {/* Prevent FOUC by setting theme before hydration */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <TooltipProvider>
            <Logo />
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
