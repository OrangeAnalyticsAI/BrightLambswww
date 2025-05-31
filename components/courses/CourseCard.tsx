import React, { useState } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon, ClockIcon, UserIcon, BookmarkIcon } from '@heroicons/react/24/outline';
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', course.id);

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        {course.thumbnail_url ? (
          <img 
            src={course.thumbnail_url} 
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
            <BookmarkIcon className="h-16 w-16 text-white opacity-50" />
          </div>
        )}
        
        {course.is_premium && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2.5 py-0.5 rounded">
            Premium
          </span>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {course.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>5h 30m</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              <span>Beginner</span>
            </div>
          </div>
          
          {course.categories && course.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {course.categories.slice(0, 3).map((category, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Link 
            href={`/courses/${course.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View Course →
          </Link>
          
          {isInstructor && (
            <div className="flex space-x-2">
              <Link 
                href={`/courses/${course.id}/edit`}
                className="text-gray-500 hover:text-blue-600"
                onClick={(e) => e.stopPropagation()}
              >
                <PencilIcon className="h-5 w-5" />
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-gray-500 hover:text-red-600 disabled:opacity-50"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
