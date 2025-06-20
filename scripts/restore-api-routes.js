const fs = require('fs');
const path = require('path');

// Directory where disabled routes are temporarily stored
const tempDir = path.join(process.cwd(), '.temp-disabled-routes');

// Restore routes by moving them back from the temp directory
fs.readdirSync(tempDir).forEach((file) => {
  const routeName = file
    .replace(/-/g, '/')
    .replace('app/api/', 'app/api/')
    .replace('route.js', 'route.js');
  const targetPath = path.join(process.cwd(), routeName);
  const sourcePath = path.join(tempDir, file);

  // Create directory if it doesn't exist
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Restoring route: ${routeName}`);
  fs.renameSync(sourcePath, targetPath);
});

// Remove temp directory
if (fs.existsSync(tempDir)) {
  fs.rmdirSync(tempDir, { recursive: true });
}

console.log('API routes restored');
