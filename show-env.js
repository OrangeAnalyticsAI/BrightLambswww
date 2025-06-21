const fs = require('fs');
const path = require('path');

// Path to your .env.development file
const envPath = path.join(__dirname, '.env.development');

console.log('Reading from:', envPath);
console.log('----------------------');

try {
  // Read the .env.development file
  const envFile = fs.readFileSync(envPath, 'utf8');
  
  // Parse the file content
  const envVars = {};
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      envVars[key] = value;
    }
  });
  
  // Display the variables
  console.log('Environment Variables from .env.development:');
  console.log('----------------------------------------');
  
  let found = false;
  for (const key in envVars) {
    if (key.includes('SUPABASE') || key.includes('NEXT_PUBLIC')) {
      found = true;
      const displayValue = key.includes('KEY') ? '***MASKED***' : envVars[key];
      console.log(`${key}=${displayValue}`);
    }
  }
  
  if (!found) {
    console.log('No Supabase or Next.js environment variables found in .env.development');
    console.log('File contents:');
    console.log(envFile);
  }
  
} catch (error) {
  console.error('Error reading .env.development file:');
  console.error(error.message);
  console.log('\nMake sure you run this script from your project root directory');
}
