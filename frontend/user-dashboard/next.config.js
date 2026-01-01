/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 👈 Turbopack root (silences lockfile warning)
  experimental: {
    turbopack: {
      root: __dirname
    }
  },

  env: {
    NEXT_PUBLIC_APP_NAME: 'Customer Support Portal',
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },

  compress: true,
};

module.exports = nextConfig;
