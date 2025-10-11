import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  // ✅ This line allows build even if ESLint errors exist
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
