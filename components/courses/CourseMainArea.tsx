import React from 'react';
import Link from 'next/link';
import { Course } from './types';
import { CourseCard } from './CourseCard';
import { CourseListSkeleton } from './CourseListSkeleton';
import { NoCoursesFound } from './NoCoursesFound';

interface CourseMainAreaProps {
  loading: boolean;
  courses: Course[];
  userProfile: any;
  isInstructor: boolean;
  searchQuery: string;
  selectedCategory: string;
  onCourseDeleted: () => void;
}

export function CourseMainArea({
  loading,
  courses,
  userProfile,
  isInstructor,
  searchQuery,
  selectedCategory,
  onCourseDeleted,
}: CourseMainAreaProps) {
  if (loading) {
    return <CourseListSkeleton />;
  }

  if (courses.length === 0) {
    return (
      <NoCoursesFound 
        searchQuery={searchQuery} 
        selectedCategory={selectedCategory} 
        isInstructor={isInstructor} 
      />
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedCategory === 'all' 
            ? 'All Courses' 
            : `Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}`
          }
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            isInstructor={isInstructor}
            onCourseDeleted={onCourseDeleted}
          />
        ))}
      </div>
    </div>
  );
}
