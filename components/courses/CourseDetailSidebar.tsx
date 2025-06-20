import React from 'react';
import { Course } from './types';
import {
  HomeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

interface CourseDetailSidebarProps {
  course: Course;
  activeSection: string;
  onSectionChange: (section: string) => void;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
}

export function CourseDetailSidebar({
  course,
  activeSection,
  onSectionChange,
  completedLessons,
  onLessonComplete,
}: CourseDetailSidebarProps) {
  // Mock course modules - in a real app, this would come from your database
  const modules = [
    {
      id: 'module-1',
      title: 'Introduction to Business Analysis',
      duration: '45 min',
      lessons: [
        { id: 'lesson-1', title: 'What is Business Analysis?', duration: '15 min', locked: false },
        {
          id: 'lesson-2',
          title: 'The Role of a Business Analyst',
          duration: '15 min',
          locked: false,
        },
        {
          id: 'lesson-3',
          title: 'Key Concepts and Terminologies',
          duration: '15 min',
          locked: false,
        },
      ],
    },
    {
      id: 'module-2',
      title: 'Requirements Engineering',
      duration: '1h 30min',
      locked: course.is_premium,
      lessons: [
        {
          id: 'lesson-4',
          title: 'Types of Requirements',
          duration: '20 min',
          locked: course.is_premium,
        },
        {
          id: 'lesson-5',
          title: 'Requirements Elicitation Techniques',
          duration: '25 min',
          locked: course.is_premium,
        },
        {
          id: 'lesson-6',
          title: 'Documenting Requirements',
          duration: '25 min',
          locked: course.is_premium,
        },
        {
          id: 'lesson-7',
          title: 'Requirements Validation',
          duration: '20 min',
          locked: course.is_premium,
        },
      ],
    },
  ];

  const navigation = [
    { name: 'Overview', icon: HomeIcon, section: 'overview' },
    { name: 'Curriculum', icon: BookOpenIcon, section: 'curriculum' },
    { name: 'Resources', icon: DocumentTextIcon, section: 'resources' },
    { name: 'Discussion', icon: ChatBubbleLeftRightIcon, section: 'discussion' },
  ];

  const totalLessons = modules.reduce((count, module) => count + module.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 text-sm font-medium text-gray-500">COURSE PROGRESS</h3>
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-sm text-gray-500">
            <span>{progress}% Complete</span>
            <span>
              {completedCount} of {totalLessons} lessons
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => onSectionChange(item.section)}
              className={`flex w-full items-center px-4 py-3 text-left text-sm font-medium ${
                activeSection === item.section
                  ? 'border-l-4 border-blue-700 bg-blue-50 text-blue-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  activeSection === item.section ? 'text-blue-500' : 'text-gray-400'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Course Content */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="text-sm font-medium text-gray-900">Course Content</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">
                  {moduleIndex + 1}. {module.title}
                </h4>
                <span className="text-xs text-gray-500">{module.duration}</span>
              </div>
              {module.locked && (
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <LockClosedIcon className="mr-1 h-3 w-3" />
                  <span>Premium Content</span>
                </div>
              )}
              <ul className="mt-2 space-y-2">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex items-start">
                    <button
                      onClick={() => !lesson.locked && onLessonComplete(lesson.id)}
                      disabled={lesson.locked}
                      className={`mt-1 h-4 w-4 flex-shrink-0 ${
                        completedLessons.includes(lesson.id)
                          ? 'text-green-500'
                          : lesson.locked
                            ? 'cursor-not-allowed text-gray-300'
                            : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      {completedLessons.includes(lesson.id) ? (
                        <CheckCircleIcon className="h-4 w-4" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border-2 border-gray-300" />
                      )}
                    </button>
                    <span
                      className={`ml-2 text-sm ${
                        completedLessons.includes(lesson.id)
                          ? 'font-medium text-green-600'
                          : lesson.locked
                            ? 'text-gray-400'
                            : 'text-gray-600'
                      }`}
                    >
                      {lesson.title}
                      {lesson.locked && ' (Premium)'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
