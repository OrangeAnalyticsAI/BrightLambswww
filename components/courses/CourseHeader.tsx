import React from 'react';
import Link from 'next/link';

export function CourseHeader() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Business Analysis Academy</h1>
          <nav className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/courses" className="text-blue-600 font-medium">Courses</Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
