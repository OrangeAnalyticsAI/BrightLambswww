import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-gray-800 py-8 text-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/privacy-policy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms-of-service" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/gdpr" className="transition-colors hover:text-white">
            GDPR
          </Link>
          <span>•</span>
          <Link href="/anti-slavery" className="transition-colors hover:text-white">
            Anti-slavery Policy
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Bright Lambs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
