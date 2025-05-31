import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
}

interface CourseSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isInstructor: boolean;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  onSearch: () => void;
}

export function CourseSidebar({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  isInstructor,
  selectedCategories,
  setSelectedCategories,
  onSearch,
}: CourseSidebarProps) {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <aside className="lg:col-span-1 space-y-6">
      {isInstructor && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Instructor Tools</h3>
          <Link 
            href="/courses/new"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Course
          </Link>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-3">Search Courses</h3>
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search courses..."
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-3">Filters</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={selectedCategories.includes('free')}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, 'free']);
                } else {
                  setSelectedCategories(selectedCategories.filter(c => c !== 'free'));
                }
              }}
            />
            <span className="ml-2 text-sm text-gray-700">Free Courses</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={selectedCategories.includes('premium')}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, 'premium']);
                } else {
                  setSelectedCategories(selectedCategories.filter(c => c !== 'premium'));
                }
              }}
            />
            <span className="ml-2 text-sm text-gray-700">Premium Courses</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
