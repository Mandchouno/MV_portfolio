import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/MV_portfolio",
  assetPrefix: "/MV_portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
