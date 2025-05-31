/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Configure images
  images: {
    domains: ['localhost'],
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Configure webpack
  webpack: (config, { isServer }) => {
    // Add any webpack configuration here if needed
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
  
  // Configure logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Debug configuration
console.log('Next.js Config:', JSON.stringify({
  ...nextConfig,
  // Don't log the entire webpack config as it's too verbose
  webpack: nextConfig.webpack ? '[Function]' : undefined,
}, null, 2));

module.exports = nextConfig;
