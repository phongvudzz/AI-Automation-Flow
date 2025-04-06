import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    domains: ["cdn.dribbble.com"],
  },
};

export default nextConfig;
