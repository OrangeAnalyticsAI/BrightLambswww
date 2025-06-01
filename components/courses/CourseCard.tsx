import React, { useState } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon, ClockIcon, UserIcon, BookmarkIcon, StarIcon } from '@heroicons/react/24/outline';
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

  // Generate random rating for demo purposes
  const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5
  const reviewCount = Math.floor(Math.random() * 100) + 10;

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-blue-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pt-[56.25%] bg-gray-50">
        {course.thumbnail_url ? (
          <img 
            src={course.thumbnail_url} 
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <BookmarkIcon className="h-12 w-12 text-white opacity-30" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-md">
              <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-xs font-medium text-yellow-800">{rating}.0</span>
            </div>
            <span className="text-xs text-white/80">({reviewCount} reviews)</span>
          </div>
        </div>
        
        {course.is_premium && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            Premium
          </span>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">Instructor</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <ClockIcon className="h-3.5 w-3.5 mr-1" />
              <span>5h 30m</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
          
          {course.categories && course.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {course.categories.slice(0, 3).map((category, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
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
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Enroll Now
            </Link>
          </div>
          
          {isInstructor && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
              <Link 
                href={`/courses/${course.id}/edit`}
                className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                onClick={(e) => e.stopPropagation()}
                title="Edit course"
              >
                <PencilIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
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
