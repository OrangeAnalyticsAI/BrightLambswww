'use client';

import Image from 'next/image';
import React, { ReactNode, ReactElement, Children, isValidElement, cloneElement } from 'react';
import { useTheme } from 'next-themes';

interface SectionProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

interface ServiceDetailProps {
  title: string;
  content: ReactElement<SectionProps>[];
  headerContent?: ReactNode;
  imageUrl?: string;
}

// Recursive function to add dark mode classes to all text elements
const addDarkModeClasses = (element: ReactElement, isDark: boolean): ReactElement => {
  if (!isValidElement<any>(element)) return element;

  // Skip if it's a custom component (not a DOM element)
  if (typeof element.type === 'function') return element;

  // Clone the element with its props
  const newProps: Record<string, any> = { ...element.props };

  // Handle className
  const baseClasses = newProps.className ? String(newProps.className).split(' ') : [];

  // Remove any existing text color classes
  const filteredClasses = baseClasses.filter(
    (cls: string) => !cls.startsWith('text-') || cls === 'text-white' || cls === 'text-black'
  );

  // Add appropriate text color class if this is a text element
  const textElements = ['p', 'span', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'a'];
  if (typeof element.type === 'string' && textElements.includes(element.type)) {
    filteredClasses.push(isDark ? 'text-gray-200' : 'text-gray-700');
  }

  // Apply the filtered classes
  if (filteredClasses.length > 0) {
    newProps.className = filteredClasses.join(' ');
  } else {
    delete newProps.className;
  }

  // Process children recursively
  if (newProps.children) {
    newProps.children = Children.map(newProps.children, (child) => {
      if (isValidElement(child)) {
        return addDarkModeClasses(child, isDark);
      }
      return child;
    });
  }

  return cloneElement(element, newProps);
};

export default function ServiceDetail({
  title,
  content,
  headerContent,
  imageUrl = '/placeholder-service.jpg',
}: ServiceDetailProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Process content with dark mode classes
  const processedContent = content.map((section, index) => {
    if (!isValidElement(section)) return section;

    // Clone the section with dark mode classes applied to all nested elements
    const processedSection = addDarkModeClasses(section, isDark);

    return (
      <div key={index} className="mb-8">
        {processedSection}
      </div>
    );
  });

  return (
    <div
      className={`min-h-screen px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-gray-100'}`}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`overflow-hidden rounded-2xl shadow-xl transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="bg-indigo-700 px-6 py-12 sm:px-12">
            <h1 className="text-center text-4xl font-bold text-white">{title}</h1>
            {headerContent}
          </div>

          <div className="px-6 py-12 sm:px-12">
            <div className="flex flex-col gap-12 lg:flex-row">
              <div className="lg:w-2/3">{processedContent}</div>

              <div className="lg:w-1/3">
                <div
                  className={`h-full rounded-lg p-4 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <div
                    className={`aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg transition-colors duration-300 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}
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
                  <div
                    className={`mt-4 text-center text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    [Image description or caption]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
