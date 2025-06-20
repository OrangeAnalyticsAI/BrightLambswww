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
  onResetFilters,
}: NoCoursesFoundProps) {
  const hasSearchQuery = searchQuery.trim() !== '';
  const isFilteredCategory = selectedCategory !== 'all';

  return (
    <div className="col-span-full rounded-xl border border-gray-100 bg-white p-8 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <BookOpenIcon className="h-10 w-10 text-blue-600" aria-hidden="true" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        {hasSearchQuery
          ? 'No courses found'
          : isFilteredCategory
            ? `No courses in this category`
            : 'No courses available yet'}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-base text-gray-600">
        {hasSearchQuery
          ? `We couldn't find any courses matching "${searchQuery}". Try different keywords or reset your filters.`
          : isFilteredCategory
            ? `There are no courses in the "${selectedCategory}" category yet.`
            : isInstructor
              ? 'Get started by creating your first course.'
              : 'Check back later for new courses.'}
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {(hasSearchQuery || isFilteredCategory) && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" />
            Reset all filters
          </button>
        )}

        {isInstructor && !hasSearchQuery && !isFilteredCategory ? (
          <Link
            href="/courses/new"
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Create Course
          </Link>
        ) : (
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Browse all courses
          </Link>
        )}
      </div>
    </div>
  );
}
