// This is a temporary script to test Supabase connection and a simple read operation.

// Adjust the path if your supabase client is located elsewhere.
const { supabase } = require('./lib/supabase');

async function testSupabaseRead() {
  console.log('Attempting to connect to Supabase and read from "profiles" table...');

  try {
    // Ensure environment variables are loaded for the script
    // If you run this outside of Next.js context, .env might not be loaded automatically.
    // For Next.js, process.env should be populated.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase URL or Anon Key is not defined in process.env.');
      console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      console.error(
        'Please ensure your .env.development or .env.local file is correctly set up and accessible by this script.'
      );
      console.error(
        'You might need to use a library like dotenv if running this script directly with Node.js outside of Next.js, e.g., `node -r dotenv/config test_supabase_connection.js` after installing dotenv (`npm install dotenv`).'
      );
      return;
    }

    console.log(`Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);

    const { data, error } = await supabase
      .from('profiles') // Using the 'profiles' table
      .select('*') // Select all columns
      .limit(1); // Limit to 1 record for a quick test

    if (error) {
      console.error('Error fetching data from Supabase:', error.message);
      if (error.details) console.error('Details:', error.details);
      if (error.hint) console.error('Hint:', error.hint);
      return;
    }

    if (data && data.length > 0) {
      console.log('Successfully fetched data:');
      console.log(data);
    } else if (data) {
      console.log('Query successful, but no data found in "profiles" table or the table is empty.');
    } else {
      console.log('Query executed, but no data object was returned. This might indicate an issue.');
    }
  } catch (e) {
    console.error('An unexpected error occurred during the test:', e);
  }
}

testSupabaseRead();
