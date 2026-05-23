import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "sibche.com",
      "www.webpouya.com",
      "localhost",
      "dkstatics-public.digikala.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
