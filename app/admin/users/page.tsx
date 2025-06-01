'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import UserManagement from '@/components/admin/UserManagement';
import { Loader2, Home, Settings, ArrowLeft } from 'lucide-react';
import { UserRole } from '@/lib/admin';
import Link from 'next/link';

type User = {
  id: string;
  email: string;
  full_name: string | null;
  user_type: UserRole;
  created_at: string;
};

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Check session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setError('No session found');
          setLoading(false);
          return;
        }

        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();

        if (profileError || profile?.user_type !== 'admin') {
          setError('You do not have permission to access this page');
          setLoading(false);
          return;
        }

        // Fetch users
        const { data: users, error: usersError } = await supabase
          .from('profiles')
          .select('id, email, full_name, user_type, created_at')
          .order('created_at', { ascending: false });

        if (usersError) {
          throw usersError;
        }

        // Cast user_type to UserRole to ensure type safety
        const typedUsers = (users || []).map(user => ({
          ...user,
          user_type: user.user_type as UserRole
        }));

        setUsers(typedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading users...</span>
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      <UserManagement initialUsers={users} />
    </div>
  );
}
