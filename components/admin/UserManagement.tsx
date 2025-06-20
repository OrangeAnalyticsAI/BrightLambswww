'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

import { UserRole } from '@/lib/admin';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  user_type: UserRole;
  created_at: string;
}

export default function UserManagement({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const supabase = createClient();

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      setLoading((prev) => ({ ...prev, [`role-${userId}`]: true }));

      // Direct update to the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({ user_type: newRole })
        .eq('id', userId);

      if (error) throw error;

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, user_type: newRole } : user)));

      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    } finally {
      setLoading((prev) => ({ ...prev, [`role-${userId}`]: false }));
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, [`delete-${userId}`]: true }));

      // Delete the user profile
      const { error: profileError } = await supabase.from('profiles').delete().eq('id', userId);

      if (profileError) throw profileError;

      // Remove from local state
      setUsers(users.filter((user) => user.id !== userId));

      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setLoading((prev) => ({ ...prev, [`delete-${userId}`]: false }));
    }
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.full_name || 'N/A'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-bold leading-5 
                    ${
                      user.user_type === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : user.user_type === 'contributor'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-2">
                    <select
                      value={user.user_type}
                      onChange={(e) => updateUserRole(user.id, e.target.value as any)}
                      disabled={loading[`role-${user.id}`]}
                      className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="user">User</option>
                      <option value="contributor">Contributor</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => deleteUser(user.id)}
                      disabled={loading[`delete-${user.id}`]}
                      className="inline-flex items-center rounded border border-transparent bg-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      {loading[`delete-${user.id}`] ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
