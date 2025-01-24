import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "www.rajondey.com",
      "development-admin.rajondey.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
