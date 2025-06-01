#!/bin/bash
set -o errexit

# Print current directory and contents for debugging
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building application..."
npm run build

# The static files are now in the 'out' directory
# No need for a separate export step with Next.js 14
mkdir -p out

# Copy static files
echo "Copying static files..."
cp -R public/* out/ 2>/dev/null || :

# Make sure the out directory has the correct permissions
chmod -R 755 out

echo "Build completed successfully!"
