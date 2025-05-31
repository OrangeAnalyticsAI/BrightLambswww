import React from 'react';

export function CourseListSkeleton() {
  return (
    <div className="lg:col-span-3">
      <div className="animate-pulse space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-100 rounded w-1/4"></div>
        </div>
        
        {/* Course Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                  <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                  <div className="flex space-x-2">
                    <div className="h-5 w-5 bg-gray-100 rounded"></div>
                    <div className="h-5 w-5 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
