const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to Bright Lambs Setup!');
console.log('Please enter your Supabase credentials:');

rl.question('Supabase URL: ', (url) => {
  rl.question('Supabase Anon Key: ', (key) => {
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=${url}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${key}`;

    fs.writeFileSync('.env.local', envContent);
    console.log('\n✅ .env.local file created successfully!');
    console.log('\nYou can now start the development server with:');
    console.log('npm run dev');

    rl.close();
  });
});
