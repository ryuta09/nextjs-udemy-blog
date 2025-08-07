import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'dsyknfeugikvpakkhhlh.supabase.co'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // デフォルトは1mb
    },
  },
};

export default nextConfig;
