'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../providers';

export default function TestAuthPage() {
  const { session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('TestAuth - Session:', session);
    console.log('TestAuth - Loading:', loading);
  }, [session, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading session...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Test
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {session ? 'You are authenticated!' : 'You are not authenticated.'}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-md bg-gray-100 p-4">
            <h3 className="text-sm font-medium text-gray-900">Session Data</h3>
            <pre className="mt-1 text-xs text-gray-600 overflow-auto max-h-60">
              {JSON.stringify(session, null, 2) || 'No session data'}
            </pre>
          </div>

          <div className="flex justify-center mt-6">
            <a
              href={session ? '/auth/signout' : '/auth'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {session ? 'Sign Out' : 'Sign In'}
            </a>
          </div>
          
          {session && (
            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/bleat/new')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Try accessing protected route: /bleat/new
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
