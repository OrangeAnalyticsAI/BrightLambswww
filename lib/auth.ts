import { supabase } from './supabase';
import { toast } from 'sonner';
import { Database } from '@/types/supabase';

type SignUpData = {
  email: string;
  password: string;
  fullName?: string;
  options?: {
    emailRedirectTo?: string;
    data?: Record<string, any>;
  };
};

type SignInData = {
  email: string;
  password: string;
  options?: {
    redirectTo?: string;
  };
};

type Profile = Database['public']['Tables']['profiles']['Row'];
// Explicitly define ProfileUpdate to include all fields we need
export type ProfileUpdate = {
  full_name?: string | null;
  avatar_url?: string | null;
  job_title?: string | null;
  mailing_list_opt_in?: boolean;
  updated_at?: string | null;
  user_type?: 'user' | 'contributor' | 'admin';
};
// Explicitly define ProfileInsert to include all fields we need
export type ProfileInsert = {
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  job_title?: string | null;
  mailing_list_opt_in?: boolean;
  updated_at?: string | null;
  user_type?: 'user' | 'contributor' | 'admin';
};

type AuthResponse = {
  data: {
    user: any | null;
    session: any | null;
  } | null;
  error: Error | null;
};

type ProfileResponse = {
  data: Profile | null;
  error: Error | null;
};

interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
}

export const signUp = async ({ email, password, fullName, options = {} }: SignUpData) => {
  try {
    // First, sign up the user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        ...options,
        data: {
          ...options?.data,
          full_name: fullName,
        },
        emailRedirectTo: options?.emailRedirectTo || `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) throw signUpError;

    // If we have a user but no session, it means email confirmation is required
    if (authData.user && !authData.session) {
      // Create a profile for the user
      const { error: profileError } = await createProfile(
        authData.user.id,
        email,
        fullName
      );

      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Don't fail the signup if profile creation fails, just log it
      }

      toast.success('Check your email for the confirmation link!');
      return { data: null, error: null };
    }

    return { data: authData, error: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    toast.error(error.message || 'Failed to sign up');
    return { data: null, error };
  }
};

export const signIn = async ({ email, password, options }: SignInData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // Handle redirect after successful sign in
    if (data?.session && options?.redirectTo) {
      window.location.href = options.redirectTo;
      return { data: null, error: null }; // Return early since we're redirecting
    }

    if (error) throw error;

    // After successful sign in, ensure the user has a profile
    if (data.user) {
      const { data: profile, error: profileError } = await getProfile(data.user.id);
      
      if (profileError || !profile) {
        console.log('No profile found, creating one...');
        // Create a profile if one doesn't exist
        await createProfile(
          data.user.id,
          data.user.email!,
          data.user.user_metadata?.full_name
        );
      }
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Sign in error:', error);
    
    // Provide more user-friendly error messages
    let errorMessage = 'Failed to sign in';
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'Invalid email or password';
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Please confirm your email before signing in';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    toast.error(errorMessage);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { error };
  }
};

export const getProfile = async (userId: string): Promise<ProfileResponse> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Get profile error:', error);
    return { data: null, error };
  }
};

export const updateProfile = async (
  userId: string,
  updates: ProfileUpdate
): Promise<ProfileResponse> => {
  try {
    // Use raw SQL query to bypass schema cache issues
    const { data, error } = await supabase.rpc(
      'update_profile_fields',
      {
        p_user_id: userId,
        p_full_name: updates.full_name,
        p_avatar_url: updates.avatar_url,
        p_job_title: updates.job_title,
        p_mailing_list_opt_in: updates.mailing_list_opt_in === true,
        p_updated_at: new Date().toISOString()
      }
    );

    if (error) throw error;
    
    // Return the updated profile
    return { data, error: null };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return { data: null, error };
  }
};

export const createProfile = async (userId: string, email: string, fullName?: string): Promise<ProfileResponse> => {
  try {
    // Use ProfileInsert type for creating new profiles
    const profileData: ProfileInsert = {
      email,
      full_name: fullName || null,
      avatar_url: null,
      job_title: null,
      mailing_list_opt_in: false,
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Create profile error:', error);
    return { data: null, error };
  }
};
