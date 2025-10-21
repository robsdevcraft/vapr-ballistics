import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Disable standalone for monorepo to avoid symlink issues on Windows
  output: undefined,

  // Point to monorepo root for file tracing
  outputFileTracingRoot: path.join(__dirname, "../../"),

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
