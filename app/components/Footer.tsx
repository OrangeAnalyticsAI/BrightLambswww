import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Business Analysis Academy</h3>
            <p className="text-gray-400">Empowering the next generation of business analysts</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-pink-300 transition-colors">About Us</Link>
            <Link href="/courses" className="hover:text-pink-300 transition-colors">Courses</Link>
            <Link href="/contact" className="hover:text-pink-300 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-pink-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Business Analysis Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
