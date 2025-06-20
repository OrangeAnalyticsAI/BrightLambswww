'use client';

import { useEffect } from 'react';

const useClickTracking = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Get element details
      const elementInfo = {
        tag: target.tagName.toLowerCase(),
        id: target.id || 'no-id',
        className: target.className || 'no-class',
        text: target.textContent?.trim().substring(0, 50) || 'no-text',
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date().toISOString(),
        path: getSelector(target),
      };

      console.log('Element clicked:', elementInfo);
    };

    // Add click event listener to the document
    document.addEventListener('click', handleClick);

    // Clean up
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

// Helper function to get a CSS selector for the element
function getSelector(element: HTMLElement): string {
  if (element.id) return `#${element.id}`;
  if (element.className && typeof element.className === 'string') {
    return `.${element.className.split(' ').filter(Boolean).join('.')}`;
  }
  return element.tagName.toLowerCase();
}

export { useClickTracking };
