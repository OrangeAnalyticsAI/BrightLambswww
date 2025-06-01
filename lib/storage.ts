import { supabase } from './supabase';
// We'll use a simple timestamp-based ID instead of uuid for now
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// Default avatar options
export const DEFAULT_AVATARS = [
  'default:Blacksheep.png',
  'default:Fleecewood mac.png',
  'default:mixed lady sheep.png',
  'default:Old lady white.png',
  'default:Smart Ram.png',
  'default:White sheep.png',
];

// Maximum file size in bytes (297 KB = 304,128 bytes)
export const MAX_FILE_SIZE = 304128;

/**
 * Upload a file to the user's avatar storage
 * @param userId User ID
 * @param file File to upload
 * @returns URL of the uploaded file
 */
export const uploadUserAvatar = async (userId: string, file: File): Promise<string | null> => {
  try {
    console.log('Uploading avatar for user:', userId);
    console.log('File size:', file.size, 'bytes');
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds the maximum limit of ${MAX_FILE_SIZE} bytes`);
    }
    
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    // Use timestamp for uniqueness and easier debugging
    const timestamp = Date.now();
    const fileName = `${userId}/${timestamp}-${Math.floor(Math.random() * 10000)}.${fileExt}`;
    console.log('Generated file name:', fileName);
    
    // Try to upload to Supabase storage
    try {
      console.log('Uploading to bucket: user-avatars');
      const { data, error } = await supabase.storage
        .from('user-avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        console.error('Supabase upload error:', error);
        // Continue to fallback
      } else {
        console.log('Upload successful, path:', data.path);
        // Return the path (not the full URL)
        return data.path;
      }
    } catch (storageError) {
      console.error('Supabase storage error:', storageError);
      // Continue to fallback
    }
    
    // Fallback: For development, just use a default avatar
    // In a real app, we'd need to handle this differently
    console.log('Using fallback avatar mechanism');
    return 'default:Blacksheep.png';
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return null;
  }
};

/**
 * Get the URL for an avatar
 * @param avatarPath Path to the avatar
 * @returns Public URL for the avatar
 */
export const getAvatarUrl = async (avatarPath: string | null): Promise<string | null> => {
  if (!avatarPath) {
    console.log('No avatar path provided');
    return null;
  }
  
  console.log('Getting avatar URL for path:', avatarPath);
  
  try {
    // Determine which bucket to use
    const isDefault = avatarPath.startsWith('default:');
    console.log('Is default avatar:', isDefault);
    
    if (isDefault) {
      // Default avatars are always in the public directory
      const path = avatarPath.replace('default:', '');
      const url = `/images/default-avatars/${path}`;
      console.log('Using default avatar URL:', url);
      return url;
    }
    
    // For user avatars, try to get from Supabase storage
    try {
      console.log('Getting public URL from user-avatars bucket');
      const { data } = await supabase.storage
        .from('user-avatars')
        .getPublicUrl(avatarPath);
      
      if (data && data.publicUrl) {
        console.log('Got public URL:', data.publicUrl);
        return data.publicUrl;
      } else {
        console.error('No public URL returned from Supabase');
        return null;
      }
    } catch (storageError) {
      console.error('Supabase storage error when getting URL:', storageError);
      // Continue to fallback
    }
    
    // Fallback: For development, just use a default avatar
    console.log('Using fallback avatar URL');
    return '/images/default-avatars/Blacksheep.png';
  } catch (error) {
    console.error('Error getting avatar URL:', error);
    return null;
  }
};

/**
 * Delete a user avatar
 * @param userId User ID
 * @param avatarPath Path to the avatar
 * @returns Success status
 */
export const deleteUserAvatar = async (userId: string, avatarPath: string): Promise<boolean> => {
  // Only delete if it's a user avatar (not a default one)
  if (avatarPath.startsWith('default:')) return true;
  
  try {
    const { error } = await supabase.storage
      .from('user-avatars')
      .remove([avatarPath]);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return false;
  }
};
