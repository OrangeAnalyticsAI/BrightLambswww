'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
          <p className="text-gray-700">{error.message}</p>
          <button
            onClick={() => reset()}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
