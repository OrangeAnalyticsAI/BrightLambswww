'use client';

import React from 'react';
import { PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CourseActionsProps {
  courseId: string;
  isInstructor: boolean;
  onDeleteAction: () => void;
  onBackAction?: () => void;
}

export function CourseActions({ 
  courseId, 
  isInstructor, 
  onDeleteAction,
  onBackAction 
}: CourseActionsProps) {
  return (
    <div className="flex space-x-3">
      {onBackAction && (
        <button
          type="button"
          onClick={onBackAction}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
          Back
        </button>
      )}
      
      {isInstructor && (
        <>
          <Link
            href={`/courses/${courseId}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5" />
            Edit
          </Link>
          <button
            type="button"
            onClick={onDeleteAction}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="-ml-1 mr-2 h-5 w-5" />
            Delete
          </button>
        </>
      )}
      
      {!isInstructor && (
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Enroll Now
        </button>
      )}
    </div>
  );
}
