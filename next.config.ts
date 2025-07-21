import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/user/:path*",
        destination: "https://www.whatsgps.com/user/:path*", // Proxy to production backend
      },
    ];
  },
};

export default nextConfig;
