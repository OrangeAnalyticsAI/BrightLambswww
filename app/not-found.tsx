import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-4 p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h2>
        <p className="text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
