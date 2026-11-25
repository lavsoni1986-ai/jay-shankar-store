import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/manifest.webmanifest",
        destination: "/manifest.json",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
