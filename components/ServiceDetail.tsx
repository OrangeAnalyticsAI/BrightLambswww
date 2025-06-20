'use client';

import Image from 'next/image';
import React, { ReactNode, ReactElement, useMemo, Children, isValidElement, cloneElement } from 'react';
import { useTheme } from 'next-themes';

export interface SectionProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  isDark?: boolean;
}

interface ServiceDetailProps {
  title: string;
  description: string;
  content: ReactElement[];
  imageUrl: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  showBackButtonRight?: boolean;
  prevService?: {
    title: string;
    href: string;
  };
  nextService?: {
    title: string;
    href: string;
  };
  children?: React.ReactNode;
}

// Recursive function to add dark mode classes to all text elements
const addDarkModeClasses = (element: ReactElement): ReactElement => {
  if (!isValidElement<any>(element)) return element;

  // Skip if it's a custom component (not a DOM element)
  if (typeof element.type === 'function') return element;

  // Clone the element with its props
  const newProps: Record<string, any> = { ...element.props };

  // Handle className - don't modify existing classes, just ensure dark: variants are present
  const baseClasses = newProps.className ? String(newProps.className).split(' ') : [];
  
  // If there are no text color classes, add default ones
  const hasTextColor = baseClasses.some((cls: string) => 
    cls.startsWith('text-') && !cls.startsWith('text-opacity-')
  );
  
  const textElements = ['p', 'span', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'a'];
  if (!hasTextColor && typeof element.type === 'string' && textElements.includes(element.type)) {
    baseClasses.push('text-gray-700', 'dark:text-gray-200');
  }

  // Apply the classes if we modified them
  if (baseClasses.length > 0) {
    // Remove duplicates by converting to Set and back to array
    const uniqueClasses = Array.from(new Set(baseClasses));
    newProps.className = uniqueClasses.join(' ');
  } else {
    delete newProps.className;
  }

  // Process children recursively
  if (newProps.children) {
    newProps.children = Children.map(newProps.children, (child) => {
      if (isValidElement(child)) {
        return addDarkModeClasses(child);
      }
      return child;
    });
  }

  return cloneElement(element, newProps);
};

export default function ServiceDetail({
  title,
  content,
  description,
  imageUrl = '/placeholder-service.jpg',
  icon,
  showBackButton = false,
  showBackButtonRight = false,
  prevService,
  nextService,
  children,
}: ServiceDetailProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Process content with dark mode classes
  const processedContent = useMemo(() => {
    if (!Array.isArray(content)) return [];
    
    return content.map((section, index) => {
      if (!isValidElement(section)) return section;

      // Process the section with dark mode classes
      const processedSection = addDarkModeClasses(section);

      // Return the processed section in a wrapper div
      return (
        <div key={index} className="mb-8">
          {processedSection}
        </div>
      );
    });
  }, [content]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative">
          <div className="bg-indigo-700 px-6 pb-8 pt-12 sm:px-12">
            <h1 className="text-center text-4xl font-bold text-white">{title}</h1>
            <p className="mx-auto mt-4 max-w-4xl text-center text-lg text-white dark:text-gray-200">
              {description}
            </p>
            
            {/* Navigation Buttons */}
            <div className="relative -mx-6 mt-6 flex w-[calc(100%+3rem)] justify-between sm:-mx-12 sm:w-[calc(100%+6rem)]">
              {/* Left side buttons */}
              <div>
                {showBackButton ? (
                  <a
                    href="/services"
                    className="ml-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 sm:ml-12"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Services Overview
                  </a>
                ) : prevService ? (
                  <a
                    href={prevService.href}
                    className="ml-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 sm:ml-12"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    {prevService.title}
                  </a>
                ) : <div className="ml-6 sm:ml-12" />}
                

              </div>

              {/* Right side buttons */}
              <div className="flex items-center">
                {nextService && (
                  <a
                    href={nextService.href}
                    className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                  >
                    {nextService.title}
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
                {/* Invisible spacer to force space between buttons */}
                <div className="w-2 sm:w-4 h-1 bg-indigo-700 mx-1 sm:mx-2" aria-hidden="true"></div>
                {showBackButtonRight && (
                  <a
                    href="/services"
                    className="mr-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 sm:mr-12"
                  >
                    Back to Services Overview
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-12 sm:px-12">
            <div className="relative">
              {/* Main content container */}
              <div className="relative">
                {/* Desktop image - floats right */}
                <div className="hidden lg:block float-right ml-8 mb-6 w-1/2 max-w-2xl">
                  <div className="rounded-lg p-4 transition-colors duration-300 bg-gray-100 dark:bg-gray-700">
                    <div
                      className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-600 transition-colors duration-300"
                    >
                      <Image
                        src={imageUrl}
                        alt={title}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content that wraps around the image */}
                <div className="prose max-w-4xl lg:prose-lg text-gray-700 dark:prose-invert dark:text-gray-200">
                  {/* Add dark mode styles for all prose elements */}
                  <style jsx global>{`
                    .prose :where(p, li, h1, h2, h3, h4, h5, h6, strong, em):not(:where([class~='not-prose'] *)) {
                      color: inherit;
                    }
                    .dark .prose :where(p, li, h1, h2, h3, h4, h5, h6, strong, em):not(:where([class~='not-prose'] *)) {
                      color: #e5e7eb; /* gray-200 */
                    }
                  `}</style>
                  {processedContent}
                </div>
                
                {/* Clear fix for the float */}
                <div className="clear-both" />
              </div>

              {/* Mobile image - only shown on mobile */}
              <div className="mt-8 lg:hidden">
                <div className="rounded-lg p-4 transition-colors duration-300 bg-gray-100 dark:bg-gray-700">
                  <div
                    className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-600 transition-colors duration-300"
                  >
                    <Image
                      src={imageUrl}
                      alt={title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {prevService && (
                <a
                  href={prevService.href}
                  className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  {prevService.title}
                </a>
              )}
              
              {nextService && (
                <a
                  href={nextService.href}
                  className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  {nextService.title}
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
