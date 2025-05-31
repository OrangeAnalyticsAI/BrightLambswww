/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Remove standalone output for now to simplify the build
  // output: 'standalone',
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Configure images
  images: {
    domains: ['localhost'],
  },
  
  // Configure webpack
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
  
  // Environment variables
  env: {
    // Add any environment variables you need at build time
  },
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Configure TypeScript
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  
  // Configure ESLint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

// For debugging
console.log('Next.js Config:', JSON.stringify(nextConfig, null, 2));

module.exports = nextConfig;
