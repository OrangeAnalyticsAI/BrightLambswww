'use client';

import { useClickTracking } from '@/hooks/useClickTracking';

export function ClickTracker({ children }: { children: React.ReactNode }) {
  useClickTracking();
  return <>{children}</>;
}
