import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: { serverComponentsExternalPackages: ["firebase"] },
};

export default nextConfig;
