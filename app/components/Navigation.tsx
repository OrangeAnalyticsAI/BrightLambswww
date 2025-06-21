'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

// CSS as a template literal to be injected into a style tag
const gradientAnimationStyles = `
  @keyframes gradient-rotate {
    0% {
      --angle: 0deg;
      background-image: 
        conic-gradient(from var(--angle), 
          #f9a8d4, #f472b6, #ec4899, #d946ef, #a855f7, #8b5cf6, #6366f1, #3b82f6, #60a5fa, #93c5fd, #bfdbfe, #93c5fd, #60a5fa, #3b82f6, #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f472b6, #f9a8d4);
    }
    100% {
      --angle: 360deg;
      background-image: 
        conic-gradient(from var(--angle), 
          #f9a8d4, #f472b6, #ec4899, #d946ef, #a855f7, #8b5cf6, #6366f1, #3b82f6, #60a5fa, #93c5fd, #bfdbfe, #93c5fd, #60a5fa, #3b82f6, #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f472b6, #f9a8d4);
    }
  }
  .animate-gradient-rotate {
    --angle: 0deg;
    background: 
      conic-gradient(from var(--angle), 
        #f9a8d4, #f472b6, #ec4899, #d946ef, #a855f7, #8b5cf6, #6366f1, #3b82f6, #60a5fa, #93c5fd, #bfdbfe, #93c5fd, #60a5fa, #3b82f6, #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f472b6, #f9a8d4);
    background-size: 200% 200%;
    background-position: center;
    animation: gradient-rotate 4s linear infinite;
    border-radius: 0.5rem;
    background-clip: padding-box, border-box;
    background-origin: border-box;
    padding: 8px;
  }
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
`;

const navLinks = [
  { name: 'Services', href: '/', external: false },
  { name: 'About', href: '/about', external: false },
  { name: 'BA Academy', href: 'https://baa.ac', external: true },
  { name: 'Client Portal', href: '/client-portal', external: false },
];

export default function Navigation() {
  // Inject styles on client-side only
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Check if the style element already exists
      if (!document.getElementById('gradient-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'gradient-animation-styles';
        style.textContent = gradientAnimationStyles;
        document.head.appendChild(style);
      }
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white py-2 shadow-sm dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center pt-1">
            <span className="ml-24 mt-1 font-baloo2 text-2xl font-bold tracking-tight [text-shadow:0.5px_0.5px_0.5px_rgba(0,0,0,0.1)] dark:[text-shadow:0.5px_0.5px_0.5px_rgba(255,255,255,0.1)]">
              <span className="text-pink-700 dark:text-pink-400">Bright</span>{' '}
              <span className="text-orange-500 dark:text-orange-400">Lambs</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex md:items-center md:space-x-2">
              <ThemeToggle />
                            {navLinks.map((link) =>
                link.external ? (
                  <div className="group relative" key={link.href}>
                    <div className="absolute -inset-0.5 overflow-hidden rounded-lg">
                      <div className="animate-gradient-rotate absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </div>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center rounded-md bg-transparent px-3 py-1 text-base font-medium text-gray-900 transition-all duration-300 hover:bg-pink-100 hover:shadow-sm dark:text-white dark:hover:bg-pink-900"
                    >
                      {link.name}
                    </a>
                  </div>
                ) : (
                  <div
                    className={`group relative ${pathname === link.href ? 'active-nav' : ''}`}
                    key={link.href}
                  >
                    <div
                      className={`absolute -inset-0.5 overflow-hidden rounded-lg ${
                        pathname === link.href ||
                        (link.href === '/' && pathname?.startsWith('/services'))
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      } transition-opacity duration-300`}
                    >
                      <div
                        className={`absolute inset-0 ${
                          pathname === link.href ||
                          (link.href === '/' && pathname?.startsWith('/services'))
                            ? 'bg-pink-200 dark:bg-pink-900/30'
                            : 'animate-gradient-rotate bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500'
                        }`}
                      ></div>
                    </div>
                    <Link
                      href={link.href}
                      className={`relative flex items-center rounded-md px-3 py-1 text-base font-medium transition-all duration-300 ${
                        pathname &&
                        (pathname === link.href ||
                          (link.href === '/' &&
                            (pathname === '/' ||
                              pathname === '' ||
                              pathname.startsWith('/services'))) ||
                          (link.href === '/services' && pathname.startsWith('/services')))
                          ? 'rounded-md bg-pink-100 text-gray-900 dark:bg-pink-900 dark:text-white'
                          : 'rounded-md text-gray-700 transition-colors duration-200 hover:bg-pink-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-pink-900 dark:hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                )
              )}
              <div className="group relative ml-2">
                <div className="absolute -inset-0.5 overflow-hidden rounded-lg">
                  <div className="animate-gradient-rotate absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <Link
                  href="/contact"
                  className="relative inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-base font-medium text-gray-900 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-900 dark:text-white dark:hover:from-blue-900/30 dark:hover:to-blue-900/30"
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 pb-3 pr-4 pt-2 text-right">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-base font-medium ${
                    pathname === link.href ||
                    (link.href === '/' && pathname?.startsWith('/services'))
                      ? 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
