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
    // Return a placeholder or null to avoid rendering on the server and causing a hydration mismatch.
    // A div with the same dimensions as the button can prevent layout shift.
    return <div className="h-8 w-8 p-1" />;
  }

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 overflow-hidden rounded-lg">
        <div className="animate-gradient-rotate absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative flex items-center justify-center rounded-md bg-transparent p-1 text-gray-700 transition-all duration-200 hover:bg-pink-100 focus:outline-none dark:text-gray-200 dark:hover:bg-pink-900"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
}
