import React, { useState } from 'react';
import Link from 'next/link';
import {
  PencilIcon,
  TrashIcon,
  ClockIcon,
  UserIcon,
  BookmarkIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Course } from './types';

interface CourseCardProps {
  course: Course;
  isInstructor: boolean;
  onCourseDeleted: () => void;
}

export function CourseCard({ course, isInstructor, onCourseDeleted }: CourseCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      const { error } = await supabase.from('courses').delete().eq('id', course.id);

      if (error) throw error;

      toast.success('Course deleted successfully');
      onCourseDeleted();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    } finally {
      setIsDeleting(false);
    }
  };

  // Generate random rating for demo purposes
  const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5
  const reviewCount = Math.floor(Math.random() * 100) + 10;

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-50 pt-[56.25%]">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
            <BookmarkIcon className="h-12 w-12 text-white opacity-30" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center rounded-md bg-yellow-100 px-2 py-1">
              <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
              <span className="text-xs font-medium text-yellow-800">{rating}.0</span>
            </div>
            <span className="text-xs text-white/80">({reviewCount} reviews)</span>
          </div>
        </div>

        {course.is_premium && (
          <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-900 shadow-md">
            Premium
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <UserIcon className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">Instructor</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <ClockIcon className="mr-1 h-3.5 w-3.5" />
              <span>5h 30m</span>
            </div>
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-gray-900">
            {course.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">{course.description}</p>

          {course.categories && course.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {course.categories.slice(0, 3).map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-700"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div>
              {course.is_premium ? (
                <span className="text-lg font-bold text-gray-900">$49.99</span>
              ) : (
                <span className="text-lg font-bold text-green-600">Free</span>
              )}
            </div>

            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enroll Now
            </Link>
          </div>

          {isInstructor && (
            <div className="mt-3 flex justify-end space-x-2 border-t border-gray-100 pt-3">
              <Link
                href={`/courses/${course.id}/edit`}
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                onClick={(e) => e.stopPropagation()}
                title="Edit course"
              >
                <PencilIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                title="Delete course"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
