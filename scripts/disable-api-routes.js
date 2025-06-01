const fs = require('fs');
const path = require('path');

// List of API routes to disable during build
const routesToDisable = [
  'app/api/avatar/route.js',
  'app/api/upload-default-avatars/route.js'
];

// Directory to temporarily store disabled routes
const tempDir = path.join(process.cwd(), '.temp-disabled-routes');

// Create temp directory if it doesn't exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Disable routes by moving them to the temp directory
routesToDisable.forEach(route => {
  const sourcePath = path.join(process.cwd(), route);
  const tempPath = path.join(tempDir, route.replace(/\//g, '-'));
  
  if (fs.existsSync(sourcePath)) {
    console.log(`Disabling route: ${route}`);
    fs.renameSync(sourcePath, tempPath);
  }
});

console.log('API routes disabled for build');
