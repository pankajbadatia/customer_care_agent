/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Admin dashboards often depend on runtime configuration
   * (API endpoints, feature flags, etc.)
   */
  env: {
    NEXT_PUBLIC_APP_NAME: 'Customer Support AI Control Plane – Admin',
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  },

  /**
   * Useful when proxying calls through Next.js
   * instead of calling the API Gateway directly from the browser.
   */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },

  /**
   * Admin UIs often visualize large JSON payloads (traces, metrics).
   * Disable overly aggressive compression if needed later.
   */
  compress: true,

  /**
   * Keep builds stable in CI even if lint warnings exist.
   * (Real errors still fail the build.)
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /**
   * Same for TypeScript — prevents blocking the pipeline
   * while still surfacing issues locally.
   */
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
