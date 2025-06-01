import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const toggleCategory = (categoryId: string) => {
    // Directly set the category, the parent component will handle the toggle logic
    setSelectedCategory(categoryId);
  };

  const toggleFilter = (filter: string) => {
    // Create a new array with the updated filter state
    const updatedFilters = selectedCategories.includes(filter)
      ? selectedCategories.filter(f => f !== filter)
      : [...selectedCategories, filter];
    
    // Call the parent's setter with the new array
    setSelectedCategories(updatedFilters);
  };

  return (
    <>
      {/* Mobile filter dialog */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
          Filters
        </button>
      </div>

      <div className={`fixed inset-0 z-50 overflow-y-auto lg:static lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileFiltersOpen(false)}></div>
        
        <div className="relative bg-white shadow-xl h-full w-full max-w-xs ml-auto lg:shadow-none lg:bg-transparent lg:max-w-none lg:w-56 lg:flex-shrink-0 lg:static lg:block">
          <div className="h-full overflow-y-auto py-6 px-4 sm:px-6 lg:px-0 lg:py-4 lg:pr-2 lg:pl-2">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-500"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-8">
              {isInstructor && (
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Instructor Tools</h3>
                  <Link 
                    href="/courses/new"
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Course
                  </Link>
                </div>
              )}

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Search</h3>
                <form onSubmit={handleSearch} className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Search courses..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-150 ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="free-courses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategories.includes('free')}
                      onChange={() => toggleFilter('free')}
                    />
                    <label htmlFor="free-courses" className="ml-3 text-sm text-gray-600">
                      Free Courses
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="premium-courses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategories.includes('premium')}
                      onChange={() => toggleFilter('premium')}
                    />
                    <label htmlFor="premium-courses" className="ml-3 text-sm text-gray-600">
                      Premium Courses
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
