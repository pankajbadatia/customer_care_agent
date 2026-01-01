const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    externalDir: true, // 👈 REQUIRED for shared-ui
  },

  env: {
    NEXT_PUBLIC_APP_NAME: 'Customer Support AI Control Plane – Admin',
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  },

  // 👈 ADD THIS: Webpack alias (fallback for SSR/build)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared-ui': path.resolve(__dirname, '../shared-ui'),
    };
    return config;
  },

  // 👈 ADD THIS: Turbopack alias (dev server)
  turbopack: {
    resolveAlias: {
      '@shared-ui': path.resolve(__dirname, '../shared-ui'),
    },
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${
          process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
        }/:path*`,
      },
    ];
  },

  compress: true,
};

module.exports = nextConfig;
