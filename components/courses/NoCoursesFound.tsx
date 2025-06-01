import React from 'react';
import Link from 'next/link';
import { BookOpenIcon, PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface NoCoursesFoundProps {
  searchQuery: string;
  selectedCategory: string;
  isInstructor: boolean;
  onResetFilters?: () => void;
}

export function NoCoursesFound({ 
  searchQuery, 
  selectedCategory, 
  isInstructor, 
  onResetFilters 
}: NoCoursesFoundProps) {
  const hasSearchQuery = searchQuery.trim() !== '';
  const isFilteredCategory = selectedCategory !== 'all';

  return (
    <div className="col-span-full py-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm p-8">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50">
        <BookOpenIcon className="h-10 w-10 text-blue-600" aria-hidden="true" />
      </div>
      
      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        {hasSearchQuery 
          ? 'No courses found'
          : isFilteredCategory
            ? `No courses in this category`
            : 'No courses available yet'}
      </h3>
      
      <p className="mt-2 text-base text-gray-600 max-w-md mx-auto">
        {hasSearchQuery
          ? `We couldn't find any courses matching "${searchQuery}". Try different keywords or reset your filters.`
          : isFilteredCategory
            ? `There are no courses in the "${selectedCategory}" category yet.`
            : isInstructor 
              ? 'Get started by creating your first course.'
              : 'Check back later for new courses.'}
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        {(hasSearchQuery || isFilteredCategory) && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" />
            Reset all filters
          </button>
        )}
        
        {isInstructor && !hasSearchQuery && !isFilteredCategory ? (
          <Link
            href="/courses/new"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Create Course
          </Link>
        ) : (
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Browse all courses
          </Link>
        )}
      </div>
    </div>
  );
}
