import React from 'react';
import { Course } from './types';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface CourseContentProps {
  course: Course;
  activeSection: string;
  isInstructor: boolean;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
}

export function CourseContent({ 
  course, 
  activeSection, 
  isInstructor, 
  completedLessons, 
  onLessonComplete 
}: CourseContentProps) {
  // In a real app, you would fetch the actual course content
  // This is a simplified version with mock data
  const courseContent = {
    overview: {
      title: 'Course Overview',
      description: course.description,
      content: (
        <div className="prose max-w-none">
          <h3>What you'll learn</h3>
          <ul>
            <li>Key business analysis concepts and techniques</li>
            <li>How to gather and document requirements</li>
            <li>Process modeling and analysis</li>
            <li>Stakeholder management</li>
            <li>Agile methodologies for business analysts</li>
          </ul>
          
          <h3>Requirements</h3>
          <ul>
            <li>No prior experience required</li>
            <li>Basic understanding of business processes is helpful but not required</li>
          </ul>
          
          <h3>Description</h3>
          <p>{course.description}</p>
          
          <h3>Who this course is for</h3>
          <ul>
            <li>Aspiring business analysts</li>
            <li>Product managers</li>
            <li>Project managers</li>
            <li>Anyone interested in business analysis</li>
          </ul>
        </div>
      ),
    },
    curriculum: {
      title: 'Course Curriculum',
      modules: [
        {
          id: 'module-1',
          title: 'Introduction to Business Analysis',
          description: 'Learn the fundamentals of business analysis',
          duration: '45 min',
          lessons: [
            { id: 'lesson-1', title: 'What is Business Analysis?', duration: '15 min', locked: false },
            { id: 'lesson-2', title: 'The Role of a Business Analyst', duration: '15 min', locked: false },
            { id: 'lesson-3', title: 'Key Concepts and Terminologies', duration: '15 min', locked: false },
          ],
        },
        {
          id: 'module-2',
          title: 'Requirements Engineering',
          description: 'Master the art of gathering and documenting requirements',
          duration: '1h 30min',
          locked: !course.is_premium,
          lessons: [
            { id: 'lesson-4', title: 'Types of Requirements', duration: '20 min', locked: !course.is_premium },
            { id: 'lesson-5', title: 'Requirements Elicitation Techniques', duration: '25 min', locked: !course.is_premium },
            { id: 'lesson-6', title: 'Documenting Requirements', duration: '25 min', locked: !course.is_premium },
            { id: 'lesson-7', title: 'Requirements Validation', duration: '20 min', locked: !course.is_premium },
          ],
        },
      ],
    },
    resources: {
      title: 'Course Resources',
      content: (
        <div className="space-y-4">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Downloadable Resources</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Additional materials to support your learning</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Course Slides</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="#" className="text-blue-600 hover:text-blue-800">Download PDF</a>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Case Studies</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {course.is_premium ? (
                      <a href="#" className="text-blue-600 hover:text-blue-800">Download ZIP</a>
                    ) : (
                      <span className="text-gray-400">Available for premium members</span>
                    )}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Templates</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href="#" className="text-blue-600 hover:text-blue-800">Download Templates</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ),
    },
  };

  const renderContent = () => {
    if (activeSection === 'overview') {
      return courseContent.overview.content;
    } else if (activeSection === 'curriculum') {
      return (
        <div className="space-y-8">
          {courseContent.curriculum.modules.map((module) => (
            <div key={module.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{module.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{module.description}</p>
                </div>
                {module.locked && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Premium
                  </span>
                )}
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => !lesson.locked && onLessonComplete(lesson.id)}
                          disabled={lesson.locked}
                          className={`flex-shrink-0 h-5 w-5 ${
                            completedLessons.includes(lesson.id)
                              ? 'text-green-500'
                              : lesson.locked
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-300 hover:text-gray-400'
                          }`}
                        >
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : lesson.locked ? (
                            <LockClosedIcon className="h-4 w-4" />
                          ) : (
                            <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                          )}
                        </button>
                        <div className="ml-3 flex-1">
                          <p className={`text-sm font-medium ${
                            lesson.locked ? 'text-gray-400' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                            {lesson.locked && ' (Premium)'}
                          </p>
                          <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                        {!lesson.locked && (
                          <button className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Start
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (activeSection === 'resources') {
      return courseContent.resources.content;
    } else if (activeSection === 'discussion') {
      return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Course Discussion</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Ask questions and discuss with other students</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No discussions yet</h3>
              <p className="mt-1 text-sm text-gray-500">Be the first to start a discussion!</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {activeSection === 'overview' && courseContent.overview.title}
          {activeSection === 'curriculum' && courseContent.curriculum.title}
          {activeSection === 'resources' && courseContent.resources.title}
          {activeSection === 'discussion' && 'Discussion'}
        </h2>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        {renderContent()}
      </div>
    </div>
  );
}
