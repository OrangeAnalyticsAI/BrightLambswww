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

# Export static site
echo "Exporting static site..."
npm run export

# Create necessary directories
mkdir -p out

# Copy static files
echo "Copying static files..."
cp -R public/* out/ 2>/dev/null || :

# Make sure the out directory has the correct permissions
chmod -R 755 out

echo "Build completed successfully!"
