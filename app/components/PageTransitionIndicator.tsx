'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function PageTransitionIndicator() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Set a timeout to handle cases where navigation completes without triggering the complete event
    const timer = setTimeout(() => setIsLoading(false), 1000);

    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      'bg-white dark:bg-gray-900',
      'transition-opacity duration-300'
    )}>
      <div className="relative h-1 w-full max-w-md overflow-hidden">
        <div 
          className={cn(
            'h-full w-full transition-all duration-300 ease-out',
            'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
            'dark:from-blue-400 dark:via-purple-400 dark:to-pink-400'
          )}
          style={{
            backgroundSize: '200% 100%',
            animation: 'gradient 2s ease infinite',
          }}
        />
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
