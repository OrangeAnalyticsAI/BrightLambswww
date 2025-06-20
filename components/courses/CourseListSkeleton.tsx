import React from 'react';

export function CourseListSkeleton() {
  return (
    <div className="lg:col-span-3">
      <div className="animate-pulse space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-1/3 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-100"></div>
        </div>

        {/* Course Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="mb-4 h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-100"></div>
                  <div className="h-4 w-5/6 rounded bg-gray-100"></div>
                  <div className="h-4 w-4/6 rounded bg-gray-100"></div>
                </div>
                <div className="mt-4 flex space-x-4">
                  <div className="h-4 w-1/3 rounded bg-gray-100"></div>
                  <div className="h-4 w-1/3 rounded bg-gray-100"></div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="h-4 w-1/4 rounded bg-gray-100"></div>
                  <div className="flex space-x-2">
                    <div className="h-5 w-5 rounded bg-gray-100"></div>
                    <div className="h-5 w-5 rounded bg-gray-100"></div>
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
