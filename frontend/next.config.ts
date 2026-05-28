const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sibche.com",
      },
      {
        protocol: "https",
        hostname: "www.webpouya.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
      },
      {
        protocol: "https",
        hostname: "www.digikala.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};
export default nextConfig;
