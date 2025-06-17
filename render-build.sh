#!/bin/bash
set -o errexit

# Print current directory and contents for debugging
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application for production
echo "Building application..."
npm run build

# For SSR, we don't need to create an 'out' directory
# The build output will be in the .next/standalone directory
# and .next/static for static assets

# Copy static files
echo "Copying static files..."
cp -R public/* out/ 2>/dev/null || :

# Make sure the out directory has the correct permissions
chmod -R 755 out

echo "Build completed successfully!"
