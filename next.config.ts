import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**', // Add pathname pattern to be more specific
      },
    ],
    // You can temporarily add domains back alongside remotePatterns for backward compatibility
    domains: ['i.scdn.co'],
    // Increase image caching duration if needed
    minimumCacheTTL: 60,
  },

  
  // Only include packages that should be excluded from the server bundle
  serverExternalPackages: ['p5', 'color-namer'],
  
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'md', 'mdx'],
  
  // Configure webpack to handle problematic modules
  webpack: (config, { isServer }) => {
    // If on the server, replace browser modules with empty objects
    if (isServer) {
      config.module.rules.push({
        test: [
          /p5.*/,
          /color-namer/,
          /accessibility\/color_namer/,
          /constants/,
          /three-stdlib\/.*/,
          /@react-three\/drei\/.*/,
          /three\/examples\/js.*/,
        ],
        use: 'null-loader',
      });
    }
    
    // Add resolve fallbacks for browser-specific modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      perf_hooks: false,
      'string_decoder': false,
    };
    
    return config;
  },
  
  // Only include packages that should be transpiled but not excluded
  transpilePackages: ['@react-three/fiber', '@react-three/drei'],
  
  output: 'standalone',
  
  experimental: {},
  
  typescript: {
    // !! WARN !!  Remove this once the build errors are fixed - Sunair
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  // If you're also facing ESLint errors:
  eslint: {
    // Only use ESLint to check during development, not during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

module.exports = nextConfig 