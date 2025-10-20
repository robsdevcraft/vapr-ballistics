import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Disable standalone for monorepo (Windows symlink issues)
  // output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // Set workspace root for monorepo
  outputFileTracingRoot: path.join(__dirname, '../../'),
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
