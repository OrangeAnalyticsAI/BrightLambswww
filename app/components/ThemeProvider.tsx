'use client';

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  [key: string]: any;
};

// Helper component to handle system theme changes
function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Set the theme based on system preference on initial load
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on system preference
    const handleSystemThemeChange = () => {
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      // Use optional chaining to safely access localStorage
      const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      
      // Only set to system theme if no user preference is saved
      if (!savedTheme || savedTheme === 'system') {
        setTheme(systemTheme);
      }
    };
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Initial check
    handleSystemThemeChange();
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [setTheme, mounted]);
  
  // Add data-theme attribute to html element for better CSS targeting
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.setAttribute('data-theme', resolvedTheme || 'light');
    
    // Add class to body for easy CSS targeting
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);
  
  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      enableColorScheme={true}
      storageKey="theme"
      disableTransitionOnChange
      {...props}
    >
      <ThemeWatcher />
      {children}
    </NextThemesProvider>
  );
}
