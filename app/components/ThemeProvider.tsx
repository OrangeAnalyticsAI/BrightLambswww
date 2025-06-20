'use client';

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  [key: string]: any;
};

// Helper component to handle system theme changes
function ThemeWatcher() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme changes and system preference
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    // Remove all theme classes first
    root.classList.remove('light', 'dark');

    // Add the current theme class
    if (resolvedTheme) {
      root.classList.add(resolvedTheme);
      root.setAttribute('data-theme', resolvedTheme);
    }

    // Handle system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(systemTheme);
        root.setAttribute('data-theme', systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Initial setup
    handleSystemThemeChange();

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, resolvedTheme, mounted]);

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="theme"
      disableTransitionOnChange
      themes={['light', 'dark', 'system']}
      {...props}
    >
      <ThemeWatcher />
      {children}
    </NextThemesProvider>
  );
}
