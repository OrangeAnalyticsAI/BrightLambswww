'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 animate-gradient-rotate opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <button className="relative p-2 rounded-md bg-transparent focus:outline-none">
          <div className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 animate-gradient-rotate opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative flex items-center justify-center w-10 h-10 rounded-md bg-transparent text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-900/50 focus:outline-none transition-all duration-200"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
