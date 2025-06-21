'use client';

import { useTheme } from 'next-themes';
import SmoothTransition from './SmoothTransition';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-[calc(100vh-64px)] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <SmoothTransition>
        {children}
      </SmoothTransition>
    </div>
  );
}
