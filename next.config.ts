import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://bootprices-backend.onrender.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
