import Link from 'next/link';
import { Settings, Users, Home } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Admin</h2>
              <nav className="space-y-2">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link 
                  href="/admin" 
                  className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/admin/users" 
                  className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
