'use client';

import { useTheme } from 'next-themes';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {children}
    </div>
  );
}
