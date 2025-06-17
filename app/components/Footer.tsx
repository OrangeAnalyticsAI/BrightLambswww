import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 border-t border-gray-700 dark:border-gray-800">
      <div className="container mx-auto px-6">
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link href="/gdpr" className="hover:text-white transition-colors">GDPR</Link>
          <span>•</span>
          <Link href="/anti-slavery" className="hover:text-white transition-colors">Anti-slavery Policy</Link>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Bright Lambs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
