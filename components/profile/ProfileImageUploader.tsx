'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { User, Upload, Check, X, Camera } from 'lucide-react';
import { DEFAULT_AVATARS, uploadUserAvatar, getAvatarUrl } from '@/lib/storage';
import { toast } from 'sonner';

interface ProfileImageUploaderProps {
  userId: string;
  currentAvatarPath: string | null;
  onAvatarChangeAction: (path: string | null) => void;
  isEditMode?: boolean;
}

export default function ProfileImageUploader({
  userId,
  currentAvatarPath,
  onAvatarChangeAction,
  isEditMode = false,
}: ProfileImageUploaderProps) {
  console.log('ProfileImageUploader rendered with currentAvatarPath:', currentAvatarPath);
  const [isUploading, setIsUploading] = useState(false);
  const [showDefaultOptions, setShowDefaultOptions] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      setIsUploading(true);
      const path = await uploadUserAvatar(userId, file);

      if (path) {
        onAvatarChangeAction(path);
        toast.success('Profile image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(null);
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Select a default avatar
  const selectDefaultAvatar = (avatarPath: string) => {
    onAvatarChangeAction(avatarPath);
    setShowDefaultOptions(false);
    toast.success('Default avatar selected');
  };

  // Toggle default avatar options
  const toggleDefaultOptions = () => {
    setShowDefaultOptions(!showDefaultOptions);
  };

  // Cancel preview
  const cancelPreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      {/* Current Avatar Display */}
      <div className="group relative h-32 w-32 overflow-hidden rounded-full border border-gray-300 bg-gray-100">
        {previewUrl ? (
          // Preview of selected image
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
        ) : currentAvatarPath ? (
          // Current avatar
          <div className="h-full w-full">
            {currentAvatarPath.startsWith('default:') ? (
              // Default avatar from our list
              <Image
                src={`/images/default-avatars/${currentAvatarPath.replace('default:', '')}`}
                alt="Avatar"
                fill
                className="object-cover"
              />
            ) : (
              // User uploaded avatar - use a regular img tag to avoid Next.js Image optimization issues
              <div className="relative h-full w-full">
                <img
                  src={`/api/avatar?path=${encodeURIComponent(currentAvatarPath)}`}
                  alt="Avatar"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    console.error('Avatar image failed to load:', e);
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          // No avatar placeholder
          <div className="flex h-full items-center justify-center bg-gray-200">
            <User className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {/* Overlay with options - only shown in edit mode */}
        {isEditMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={triggerFileUpload}
                className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
                title="Upload custom image"
              >
                <Upload className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={toggleDefaultOptions}
                className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
                title="Choose default avatar"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* File Input (hidden) - only included in edit mode */}
      {isEditMode && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
        />
      )}

      {/* Loading Indicator */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-75">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
        </div>
      )}

      {/* Preview Controls */}
      {previewUrl && (
        <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2">
          <button
            type="button"
            onClick={cancelPreview}
            className="rounded-full border border-red-200 bg-white p-1 text-red-500 hover:bg-red-50"
            title="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Default Avatar Options - only shown in edit mode */}
      {isEditMode && showDefaultOptions && (
        <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 transform rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <div className="flex max-h-60 max-w-xs flex-wrap gap-2 overflow-y-auto pr-1">
            {DEFAULT_AVATARS.map((avatar, index) => (
              <button
                key={index}
                onClick={() => selectDefaultAvatar(avatar)}
                className="h-16 w-16 overflow-hidden rounded-full border-2 transition-colors hover:border-indigo-500 focus:border-indigo-500 focus:outline-none"
              >
                <Image
                  src={`/images/default-avatars/${avatar.replace('default:', '')}`}
                  alt={`Avatar option ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleDefaultOptions}
            className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
