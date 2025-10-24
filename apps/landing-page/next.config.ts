import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for deployment to vaprballistics.com
  output: "export",
  
  // Monorepo support
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Disable server-side features for static export
  trailingSlash: true,
  
  // TypeScript config
  typescript: {
    // Type checking is handled by our CI pipeline
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
