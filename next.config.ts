import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "development-admin.rajondey.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "development-admin.rajondey.com",
      },
    ],
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
      {
        source: "/(.+)\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/resources/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/hire",
        destination: "/start",
        permanent: true,
      },
      {
        source: "/hire/:path*",
        destination: "/start",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/start",
        permanent: true,
      },
      {
        source: "/audit",
        destination: "/start",
        permanent: true,
      },
      {
        source: "/estimate",
        destination: "/start?step=scope",
        permanent: true,
      },
      {
        source: "/order",
        destination: "/start?step=scope",
        permanent: true,
      },
      {
        source: "/order/:path*",
        destination: "/start?step=scope",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/work/marketing-agency-site",
        destination: "/work/agency-headless-phase-one",
        permanent: true,
      },
      {
        source: "/learn",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/learn/:path*",
        destination: "/blog",
        permanent: true,
      },
    ];
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      };
    }

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
