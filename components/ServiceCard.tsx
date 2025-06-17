'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Service = {
  title: string;
  description: string;
  slug: string;
};

export function ServiceCard({ service }: { service: Service }) {
  const [showInitialShimmer, setShowInitialShimmer] = useState(true);
  const [showHoverShimmer, setShowHoverShimmer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Run initial shimmer animation once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialShimmer(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleHoverStart = () => {
    setIsHovered(true);
    setShowHoverShimmer(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setShowHoverShimmer(false);
  };

  const renderShimmer = (isHoverShimmer = false) => (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ duration: 0.3 }}
      key={isHoverShimmer ? 'hover' : 'initial'}
    >
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            105deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 25%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.5) 75%,
            rgba(255, 255, 255, 0) 100%
          )`,
          filter: 'blur(8px)'
        }}
        initial={{ 
          x: '-100%', 
          y: '-100%',
          rotate: '-20deg',
          scale: 1.5
        }}
        animate={{
          x: '200%',
          y: '200%',
          transition: {
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        onAnimationComplete={() => {
          if (isHoverShimmer) {
            setShowHoverShimmer(false);
          } else {
            setShowInitialShimmer(false);
          }
        }}
      >
        <div className="absolute inset-0 bg-pink-100/30 mix-blend-overlay" />
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <Link href={`/services/${service.slug}`}>
        <div 
          className={`relative h-full backdrop-blur-lg rounded-2xl p-6 border-2 overflow-hidden transition-all duration-300 shadow-lg dark:shadow-[0_4px_20px_0_rgba(0,0,0,0.5)] ${
            isHovered 
              ? 'bg-gradient-to-br from-pink-50/90 to-pink-100/90 dark:from-pink-900/30 dark:to-pink-900/40 border-pink-300 dark:border-pink-800/70 scale-[1.02]' 
              : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700/70'
          }`}
        >
          {/* Initial Shimmer Effect */}
          <AnimatePresence>
            {showInitialShimmer && renderShimmer(false)}
          </AnimatePresence>
          
          {/* Hover Shimmer Effect */}
          <AnimatePresence>
            {showHoverShimmer && renderShimmer(true)}
          </AnimatePresence>
          
          {/* Content */}
          <div className="relative z-0">
            <motion.h3 
              className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                isHovered ? 'text-pink-600 dark:text-pink-400' : 'text-gray-900 dark:text-white'
              }`}
            >
              {service.title}
            </motion.h3>
            <motion.p 
              className={`transition-colors duration-300 ${
                isHovered ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {service.description}
            </motion.p>
            
            <div 
              className={`mt-4 flex items-center transition-colors duration-300 ${
                isHovered ? 'text-pink-600 dark:text-pink-400' : 'text-pink-500 dark:text-pink-500/70'
              }`}
            >
              <span className="mr-2">Learn more</span>
              <motion.svg 
                className="w-4 h-4"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
