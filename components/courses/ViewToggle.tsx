import React from 'react';

type ViewMode = 'courses' | 'lessons';

interface ViewToggleProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="mb-6">
      <div className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => onViewChange('courses')}
          className={`
            px-6 py-2 text-sm font-medium rounded-full mr-2 
            ${activeView === 'courses' 
              ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transition-all duration-200
          `}
        >
          Courses
        </button>
        <button
          type="button"
          onClick={() => onViewChange('lessons')}
          className={`
            px-6 py-2 text-sm font-medium rounded-full 
            ${activeView === 'lessons' 
              ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transition-all duration-200
          `}
        >
          Lessons
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
