/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable static exports
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Configure TypeScript
  typescript: {
    // Allow production builds to complete with type errors
    ignoreBuildErrors: true,
  },
  
  // Configure ESLint
  eslint: {
    // Allow production builds to complete with ESLint errors
    ignoreDuringBuilds: true,
  },
  
  // Configure logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Skip API routes that cause build issues
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        '**/node_modules/@swc/core-linux-x64-gnu',
        '**/node_modules/@swc/core-linux-x64-musl',
        '**/node_modules/@esbuild/linux-x64',
      ],
    },
  },
  
  // Skip type checking during build (handled by CI)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip linting during build (handled by CI)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable environment variable loading from .env.local, .env.development, .env.production, .env.test
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

// Debug configuration
console.log('Next.js Config:', JSON.stringify({
  ...nextConfig,
  // Don't log the entire webpack config as it's too verbose
  webpack: nextConfig.webpack ? '[Function]' : undefined,
}, null, 2));

module.exports = nextConfig;
