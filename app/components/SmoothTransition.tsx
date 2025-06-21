'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function SmoothTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          } 
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          transition: { 
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1]
          } 
        }}
        className="min-h-screen w-full overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
