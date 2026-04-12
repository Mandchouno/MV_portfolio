import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/MV_portfolio",
  assetPrefix: "/MV_portfolio",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === "production" ? "/MV_portfolio" : "",
  },
};

export default nextConfig;
