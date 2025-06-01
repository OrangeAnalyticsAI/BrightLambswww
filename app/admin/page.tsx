'use client';

import { useEffect, useState } from 'react';
import { Users, Settings, BarChart2, Activity, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setError('No session found');
          setLoading(false);
          return;
        }

        // Store user data
        setUserData(session.user);
        
        // Get profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          setError(`Error fetching profile: ${profileError.message}`);
        } else {
          setProfileData(profile);
        }

        // Fetch user count
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (countError) {
          console.error('Error fetching user count:', countError);
        } else {
          setUserCount(count);
        }
      } catch (error) {
        console.error('Error in data fetch:', error);
        setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading admin dashboard...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">
          Welcome to the admin dashboard. Manage your application from here.
        </p>
      </div>
      
      {/* Debug Information */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
        <div className="space-y-2">
          <p><strong>User ID:</strong> {userData?.id}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>User Type:</strong> {profileData?.user_type || 'Not set'}</p>
          <p><strong>Is Admin (from profile):</strong> {profileData?.user_type === 'admin' ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Users</h3>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{userCount || 0}</div>
          <p className="text-xs text-gray-500">
            Registered users
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Active Now</h3>
            <Activity className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-gray-500">
            Currently active users
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Features</h3>
            <Settings className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-gray-500">
            Active features
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Reports</h3>
            <BarChart2 className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-gray-500">
            Generated this month
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="bg-white p-6 rounded-lg shadow col-span-4">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 text-center py-8">
              Activity feed will appear here
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow col-span-3">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <a
              href="/admin/users"
              className="block p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-gray-500">
                View and manage user accounts
              </p>
            </a>
            <a
              href="/admin/settings"
              className="block p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">System Settings</h3>
              <p className="text-sm text-gray-500">
                Configure application settings
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
