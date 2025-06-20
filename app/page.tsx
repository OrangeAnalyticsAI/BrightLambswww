'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Test Page</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">If you can see this, the basic routing is working.</p>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Next Steps:</h2>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
          <li>Check if the navigation bar is visible</li>
          <li>Verify theme toggling works</li>
          <li>Check the browser console for errors</li>
        </ul>
      </div>
    </div>
  );
}
