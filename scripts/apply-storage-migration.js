// Script to apply the storage migration directly to Supabase
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

async function applyMigration() {
  try {
    console.log('Applying storage migration...');
    
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20250601_create_profile_storage.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute the SQL directly
    const { error } = await supabase.rpc('pg_execute', {
      query: migrationSQL
    }).catch(err => {
      // Try alternative approach if pg_execute is not available
      return supabase.from('_exec_sql').rpc('exec', { sql: migrationSQL });
    });
    
    if (error) {
      console.error('Error applying migration:', error);
      
      // If the above methods fail, try executing the SQL statements one by one
      console.log('Trying alternative approach...');
      
      // Create buckets manually using the Storage API
      console.log('Creating default_avatars bucket...');
      const { error: defaultBucketError } = await supabase.storage.createBucket('default_avatars', {
        public: true
      });
      
      if (defaultBucketError && !defaultBucketError.message.includes('already exists')) {
        console.error('Error creating default_avatars bucket:', defaultBucketError);
      } else {
        console.log('default_avatars bucket created or already exists');
      }
      
      console.log('Creating user_avatars bucket...');
      const { error: userBucketError } = await supabase.storage.createBucket('user_avatars', {
        public: false
      });
      
      if (userBucketError && !userBucketError.message.includes('already exists')) {
        console.error('Error creating user_avatars bucket:', userBucketError);
      } else {
        console.log('user_avatars bucket created or already exists');
      }
      
      console.log('Note: Storage policies need to be set up manually in the Supabase dashboard.');
      console.log('Please go to Storage > Policies and set up the following policies:');
      console.log('1. Allow public read access to default_avatars bucket');
      console.log('2. Allow authenticated users to view their own avatars in user_avatars bucket');
      console.log('3. Allow authenticated users to upload their own avatars to user_avatars bucket');
      console.log('4. Allow authenticated users to update their own avatars in user_avatars bucket');
      console.log('5. Allow authenticated users to delete their own avatars in user_avatars bucket');
    } else {
      console.log('Migration applied successfully!');
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

applyMigration();
