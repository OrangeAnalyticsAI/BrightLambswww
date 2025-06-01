import { SupabaseClient } from '@supabase/supabase-js';
import { createClient as createClientComponent } from './supabase/client';
import { createClient as createServerComponent } from './supabase/server';
import { Database } from '@/types/supabase';

export type UserRole = 'user' | 'contributor' | 'admin';

type Profile = Database['public']['Tables']['profiles']['Row'];

// Server-side version
export async function getUserRole(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<UserRole> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', userId)
    .single();
    
  return (profile?.user_type as UserRole) || 'user';
}

// Client-side version
export async function getCurrentUserRole(): Promise<UserRole | null> {
  try {
    console.log('Getting current user role...');
    const supabase = createClientComponent();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    
    if (!user) {
      console.log('No user found');
      return null;
    }
    
    console.log('User found, getting role for user ID:', user.id);
    const role = await getUserRole(supabase, user.id);
    console.log('Retrieved user role:', role);
    return role;
  } catch (error) {
    console.error('Error in getCurrentUserRole:', error);
    return null;
  }
}

// Role hierarchy
const roleHierarchy: Record<UserRole, number> = {
  'user': 0,
  'contributor': 1,
  'admin': 2
};

// Check if user has at least the required role
export function hasMinimumRole(userRole: UserRole | null, requiredRole: UserRole): boolean {
  if (!userRole) return false;
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Server-side role check
export async function isAdmin(
  supabase: SupabaseClient<Database, 'public', any>,
  userId: string
): Promise<boolean> {
  const role = await getUserRole(supabase, userId);
  return hasMinimumRole(role, 'admin');
}

// Client-side role check helpers
export const checkRole = {
  isAdmin: async () => {
    try {
      console.log('Starting admin check...');
      const role = await getCurrentUserRole();
      console.log('Current user role:', role);
      const isAdmin = hasMinimumRole(role, 'admin');
      console.log('hasMinimumRole result:', isAdmin);
      return isAdmin;
    } catch (error) {
      console.error('Error in isAdmin check:', error);
      return false;
    }
  },
  isContributor: async () => {
    const role = await getCurrentUserRole();
    return hasMinimumRole(role, 'contributor');
  },
  isUser: async () => {
    const role = await getCurrentUserRole();
    return hasMinimumRole(role, 'user');
  }
};

// Backward compatibility
export const isAtLeastUser = checkRole.isUser;
