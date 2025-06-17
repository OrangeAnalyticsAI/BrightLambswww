// Script to create storage buckets in Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read from temporary env file
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.temp'), 'utf8');
const envVars = {};

// Parse env file
envFile.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  }
});

// Get Supabase credentials
const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.temp file');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function createBuckets() {
  try {
    console.log('Creating default-avatars bucket...');
    const { data: defaultBucket, error: defaultBucketError } = await supabase.storage.createBucket('default-avatars', {
      public: true,
      fileSizeLimit: 304128 // 297 KB = 304,128 bytes
    });
    
    if (defaultBucketError) {
      if (defaultBucketError.message.includes('already exists')) {
        console.log('default-avatars bucket already exists');
      } else {
        console.error('Error creating default-avatars bucket:', defaultBucketError);
      }
    } else {
      console.log('default-avatars bucket created successfully');
    }
    
    console.log('Creating user-avatars bucket...');
    const { data: userBucket, error: userBucketError } = await supabase.storage.createBucket('user-avatars', {
      public: false,
      fileSizeLimit: 304128 // 297 KB = 304,128 bytes
    });
    
    if (userBucketError) {
      if (userBucketError.message.includes('already exists')) {
        console.log('user-avatars bucket already exists');
      } else {
        console.error('Error creating user-avatars bucket:', userBucketError);
      }
    } else {
      console.log('user-avatars bucket created successfully');
    }
    
    console.log('Buckets created or already exist. You will need to set up the following storage policies in the Supabase dashboard:');
    console.log('1. Allow public read access to default-avatars bucket');
    console.log('2. Allow authenticated users to view their own avatars in user-avatars bucket');
    console.log('3. Allow authenticated users to upload their own avatars to user-avatars bucket');
    console.log('4. Allow authenticated users to update their own avatars in user-avatars bucket');
    console.log('5. Allow authenticated users to delete their own avatars in user-avatars bucket');
    
    // Upload default avatars
    console.log('\nUploading default avatars...');
    const defaultAvatarsDir = path.join(__dirname, '..', 'public', 'images', 'default-avatars');
    
    try {
      const files = fs.readdirSync(defaultAvatarsDir);
      
      for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          const filePath = path.join(defaultAvatarsDir, file);
          const fileContent = fs.readFileSync(filePath);
          
          console.log(`Uploading ${file}...`);
          const { data, error } = await supabase.storage
            .from('default-avatars')
            .upload(file, fileContent, {
              cacheControl: '3600',
              upsert: true,
              contentType: file.endsWith('.png') ? 'image/png' : 'image/jpeg'
            });
          
          if (error) {
            console.error(`Error uploading ${file}:`, error);
          } else {
            console.log(`${file} uploaded successfully`);
          }
        }
      }
    } catch (error) {
      console.error('Error reading default avatars directory:', error);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

createBuckets().then(() => {
  console.log('Done!');
  // Clean up temporary env file
  fs.unlinkSync(path.join(__dirname, '..', '.env.temp'));
});
