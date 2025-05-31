import React from 'react';
import Link from 'next/link';
import { BookOpenIcon, PlusIcon } from '@heroicons/react/24/outline';

interface NoCoursesFoundProps {
  searchQuery: string;
  selectedCategory: string;
  isInstructor: boolean;
}

export function NoCoursesFound({ searchQuery, selectedCategory, isInstructor }: NoCoursesFoundProps) {
  const hasSearchQuery = searchQuery.trim() !== '';
  const isFilteredCategory = selectedCategory !== 'all';

  return (
    <div className="lg:col-span-3 py-12 text-center">
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100">
        <BookOpenIcon className="h-12 w-12 text-blue-600" aria-hidden="true" />
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {hasSearchQuery 
          ? 'No courses match your search'
          : isFilteredCategory
            ? `No courses found in this category`
            : 'No courses available yet'}
      </h3>
      
      <p className="mt-2 text-sm text-gray-500">
        {hasSearchQuery
          ? `We couldn't find any courses matching "${searchQuery}".`
          : isFilteredCategory
            ? `There are no courses in the "${selectedCategory}" category yet.`
            : 'Get started by creating a new course.'}
      </p>
      
      <div className="mt-6">
        {isInstructor && !hasSearchQuery && !isFilteredCategory ? (
          <Link
            href="/courses/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Course
          </Link>
        ) : (
          <Link
            href="/courses"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View all courses
          </Link>
        )}
      </div>
    </div>
  );
}
