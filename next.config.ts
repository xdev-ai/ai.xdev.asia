import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  serverExternalPackages: ["firebase"],
};

export default nextConfig;
