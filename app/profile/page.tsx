'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getProfile, updateProfile, type ProfileUpdate } from '@/lib/auth';
import { Loader2, User, Mail, Briefcase, Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { toast } from 'sonner';
import ProfileImageUploader from '@/components/profile/ProfileImageUploader';

// Import types from Supabase
import { Database } from '@/types/supabase';

// Use the Profile type directly from the Database type definition
type BaseProfile = Database['public']['Tables']['profiles']['Row'];

// Extend the Profile type to ensure it includes all fields we need
type Profile = BaseProfile & {
  job_title: string | null;
  mailing_list_opt_in: boolean;
  user_type?: 'user' | 'contributor' | 'admin';
};

// ProfileData is now just an alias for Profile
type ProfileData = Profile;

// Form data type that matches the profile fields we're editing
type FormData = {
  full_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  mailing_list_opt_in: boolean;
  [key: string]: string | null | boolean | undefined;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<FormData>({
    full_name: null,
    avatar_url: null,
    job_title: null,
    mailing_list_opt_in: false // Initialize as false instead of null
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Check if user is logged in
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/auth');
          return;
        }

        // Get user profile
        const { data, error } = await getProfile(session.user.id);
        
        if (error) throw error;
        
        if (data) {
          // Cast the data to Profile type with all required fields
          const profileData = {
            ...data,
            user_type: (data as any).user_type || 'user',
            job_title: (data as any).job_title || null,
            mailing_list_opt_in: (data as any).mailing_list_opt_in || false
          } as Profile;
          
          setProfile(profileData);
          setFormData({
            full_name: profileData.full_name,
            avatar_url: profileData.avatar_url,
            job_title: profileData.job_title,
            mailing_list_opt_in: profileData.mailing_list_opt_in,
          });
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    console.log(`Field ${name} changed to:`, type === 'checkbox' ? (e.target as HTMLInputElement).checked : value);
    
    setFormData(prev => {
      // Create a properly typed form data object
      const newFormData: FormData = {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      };
      return newFormData;
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;
    
    console.log('Saving profile with form data:', formData);
    console.log('Avatar URL before save:', formData.avatar_url);
    
    try {
      setSaving(true);
      
      // Create update object with all the fields we want to update
      const updateData: ProfileUpdate = {
        full_name: formData.full_name || null,
        avatar_url: formData.avatar_url || null,
        job_title: formData.job_title || null,
        mailing_list_opt_in: formData.mailing_list_opt_in
      };
      
      console.log('Update data being sent to API:', updateData);
      
      const { error } = await updateProfile(profile.id, updateData);
      
      if (error) throw error;
      
      // Update local state
      setProfile(prev => {
        if (!prev) return null;
        const updatedProfile = { ...prev, ...updateData };
        console.log('Updated profile state:', updatedProfile);
        return updatedProfile;
      });
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-800">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSaveProfile}>
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  {profile && (
                    <ProfileImageUploader
                      userId={profile.id}
                      currentAvatarPath={formData.avatar_url}
                      onAvatarChangeAction={(path) => {
                        console.log('Avatar changed in edit mode to:', path);
                        setFormData(prev => {
                          // Create a properly typed form data object
                          const newFormData: FormData = {
                            ...prev,
                            avatar_url: path
                          };
                          console.log('Updated form data:', newFormData);
                          return newFormData;
                        });
                      }}
                      isEditMode={true}
                    />
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      value={formData.full_name || ''}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profile?.email || ''}
                      disabled
                      className="bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md cursor-not-allowed"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                {/* Job Title */}
                <div>
                  <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="job_title"
                      id="job_title"
                      value={formData.job_title || ''}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                {/* Mailing List Opt-in */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="mailing_list_opt_in"
                      name="mailing_list_opt_in"
                      type="checkbox"
                      checked={formData.mailing_list_opt_in || false}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="mailing_list_opt_in" className="font-medium text-gray-700">
                      Subscribe to mailing list
                    </label>
                    <p className="text-gray-500">
                      Receive updates about new courses, features, and promotions
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                {profile && (
                  <>
                    <ProfileImageUploader
                      userId={profile.id}
                      currentAvatarPath={profile.avatar_url}
                      onAvatarChangeAction={(path) => {
                        // This is view-only mode, so we don't update here
                        // User needs to click Edit to make changes
                      }}
                      isEditMode={false}
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{profile.full_name || 'No name provided'}</h2>
                      <p className="text-sm text-gray-500">{(profile as any).user_type ? ((profile as any).user_type.charAt(0).toUpperCase() + (profile as any).user_type.slice(1)) : 'User'}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Profile Details */}
              <div className="border-t border-gray-200 pt-6">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Email Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {profile?.email}
                    </dd>
                  </div>
                  
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Job Title
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {profile?.job_title || 'Not specified'}
                    </dd>
                  </div>
                  
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Mailing List
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {profile?.mailing_list_opt_in ? 'Subscribed' : 'Not subscribed'}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Edit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
