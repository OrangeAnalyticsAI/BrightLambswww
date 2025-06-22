'use client';

import { useEffect, useRef } from 'react';

export function SkipLink() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
        setTimeout(() => main.removeAttribute('tabindex'), 1000);
      }
    };

    const link = linkRef.current;
    if (link) {
      link.addEventListener('click', handleClick);
      return () => {
        link.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <a
      ref={linkRef}
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:dark:bg-gray-900 focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
