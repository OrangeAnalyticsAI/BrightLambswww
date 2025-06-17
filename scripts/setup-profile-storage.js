// Script to set up profile storage in Supabase
// Run with: node scripts/setup-profile-storage.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  try {
    console.log('Setting up profile storage...');

    // 1. Create storage buckets if they don't exist
    console.log('Creating storage buckets...');
    
    // Create default avatars bucket (public)
    const { data: defaultBucket, error: defaultBucketError } = await supabase.storage.createBucket(
      'default_avatars', 
      { public: true }
    );
    
    if (defaultBucketError && !defaultBucketError.message.includes('already exists')) {
      throw defaultBucketError;
    }
    
    console.log('Default avatars bucket created or already exists');
    
    // Create user avatars bucket (private)
    const { data: userBucket, error: userBucketError } = await supabase.storage.createBucket(
      'user_avatars', 
      { public: false }
    );
    
    if (userBucketError && !userBucketError.message.includes('already exists')) {
      throw userBucketError;
    }
    
    console.log('User avatars bucket created or already exists');

    // 2. Set up storage policies
    console.log('Setting up storage policies...');
    
    // Run the migration SQL directly
    const { error: policyError } = await supabase.rpc('pg_execute', {
      query: `
        -- Set up security policies for default avatars (public read access)
        CREATE POLICY IF NOT EXISTS "Default Avatars Public Access"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'default_avatars');

        -- Set up security policies for user avatars
        -- Users can view their own avatars
        CREATE POLICY IF NOT EXISTS "Users Can View Own Avatars"
        ON storage.objects
        FOR SELECT
        TO authenticated
        USING (
          bucket_id = 'user_avatars' 
          AND (storage.foldername(name))[1] = auth.uid()::text
        );

        -- Users can upload their own avatars
        CREATE POLICY IF NOT EXISTS "Users Can Upload Own Avatars"
        ON storage.objects
        FOR INSERT
        TO authenticated
        WITH CHECK (
          bucket_id = 'user_avatars' 
          AND (storage.foldername(name))[1] = auth.uid()::text
        );

        -- Users can update their own avatars
        CREATE POLICY IF NOT EXISTS "Users Can Update Own Avatars"
        ON storage.objects
        FOR UPDATE
        TO authenticated
        USING (
          bucket_id = 'user_avatars' 
          AND (storage.foldername(name))[1] = auth.uid()::text
        );

        -- Users can delete their own avatars
        CREATE POLICY IF NOT EXISTS "Users Can Delete Own Avatars"
        ON storage.objects
        FOR DELETE
        TO authenticated
        USING (
          bucket_id = 'user_avatars' 
          AND (storage.foldername(name))[1] = auth.uid()::text
        );
      `
    });
    
    if (policyError) {
      console.warn('Warning: Policies may have partially succeeded:', policyError.message);
    } else {
      console.log('Storage policies set up successfully');
    }

    // 3. Upload default avatars
    console.log('Uploading default avatars...');
    
    const defaultAvatarsDir = path.join(__dirname, '..', 'public', 'images', 'default-avatars');
    const files = fs.readdirSync(defaultAvatarsDir);
    
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const filePath = path.join(defaultAvatarsDir, file);
        const fileContent = fs.readFileSync(filePath);
        
        console.log(`Uploading ${file}...`);
        
        const { error: uploadError } = await supabase.storage
          .from('default_avatars')
          .upload(file, fileContent, {
            contentType: file.endsWith('.png') ? 'image/png' : 'image/jpeg',
            upsert: true
          });
        
        if (uploadError) {
          console.warn(`Warning: Failed to upload ${file}:`, uploadError.message);
        } else {
          console.log(`${file} uploaded successfully`);
        }
      }
    }

    console.log('Setup complete!');
  } catch (error) {
    console.error('Error setting up profile storage:', error);
    process.exit(1);
  }
}

main();
